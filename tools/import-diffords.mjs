#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX_PATH = path.join(ROOT, 'index.html');
const LNL_PATH = path.join(ROOT, 'letters-liquor-data.js');
const OVERRIDES_PATH = path.join(ROOT, 'tools', 'diffords-overrides.json');
const OUTPUT_PATH = path.join(ROOT, 'diffords-data.js');
const REPORT_PATH = path.join(ROOT, 'build', 'diffords-import-report.json');
const CACHE_DIR = path.join(ROOT, '.cache', 'diffords');
const BASE_URL = 'https://www.diffordsguide.com';
const USER_AGENT = 'HomeBarDiffordsImporter/1.0 (+personal cocktail catalog)';
const REQUEST_DELAY_MS = 250;

const args = new Set(process.argv.slice(2));
const refresh = args.has('--refresh');
const dryRun = args.has('--dry-run');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeHtml(value) {
  const named = {
    amp: '&', apos: "'", copy: '(c)', deg: ' degrees ', frasl: '/', frac12: '1/2', frac13: '1/3', frac14: '1/4',
    frac23: '2/3', frac34: '3/4', hellip: '...', laquo: '"', lsquo: "'", mdash: '-', middot: '-',
    nbsp: ' ', ndash: '-', quot: '"', raquo: '"', reg: '(R)', rsquo: "'", trade: '(TM)'
  };
  return String(value || '')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&([a-z][a-z0-9]+);/gi, (entity, name) => named[name.toLowerCase()] ?? entity);
}

function plainText(value) {
  return decodeHtml(String(value || '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|li|blockquote|h[1-6]|div)>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, ''))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function nameKey(value) {
  return String(value || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(?:cocktail|the)\b/g, ' ')
    .replace(/\b(?:number|no\.?|nr\.?)\s*(\d+)\b/g, ' $1 ')
    .replace(/#/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim().replace(/\s+/g, ' ');
}

function slug(value) {
  return nameKey(value).replace(/\s+/g, '-');
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function parseIndexCocktails(indexText) {
  const cocktailLine = indexText.split('\n').find((line) => line.trimStart().startsWith('const COCKTAILS = '));
  if (!cocktailLine) throw new Error('Could not find the COCKTAILS dataset in index.html.');
  const builtIn = JSON.parse(cocktailLine.slice(cocktailLine.indexOf('['), cocktailLine.lastIndexOf('];') + 1));

  const unshiftMatch = indexText.match(/COCKTAILS\.unshift\((\{"id":"amaretto-martini"[^\n]+\})\);/);
  if (unshiftMatch) builtIn.push(JSON.parse(unshiftMatch[1]));

  const seedMatch = indexText.match(/const SEED_CUSTOM_COCKTAILS = (\[[\s\S]*?\n\s*\]);/);
  if (seedMatch) {
    const seedCocktails = vm.runInNewContext(`(${seedMatch[1]})`, Object.create(null));
    builtIn.push(...seedCocktails);
  }
  return builtIn;
}

async function parseLettersLiquorCocktails() {
  const source = await fs.readFile(LNL_PATH, 'utf8');
  const sandbox = {window: {LETTERS_LIQUOR_NOTES: {}}};
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, {filename: LNL_PATH});
  return sandbox.window.LETTERS_LIQUOR_DATA
    .filter((entry) => entry.custom)
    .map((entry) => ({
      id: entry.targetId,
      name: entry.name,
      alternateNames: entry.custom?.alternateNames || [],
      ingredients: entry.ingredients || [],
      ingredientNames: entry.custom?.ingredientNames || []
    }));
}

async function loadOverrides() {
  try { return JSON.parse(await fs.readFile(OVERRIDES_PATH, 'utf8')); }
  catch (error) {
    if (error.code === 'ENOENT') return {};
    throw error;
  }
}

async function loadCocktails() {
  const indexText = await fs.readFile(INDEX_PATH, 'utf8');
  const combined = [...parseIndexCocktails(indexText), ...await parseLettersLiquorCocktails()];
  const byId = new Map();
  combined.forEach((cocktail) => {
    if (!cocktail?.id || !cocktail?.name) return;
    const existing = byId.get(cocktail.id) || {};
    byId.set(cocktail.id, {...existing, ...cocktail});
  });
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name, undefined, {sensitivity: 'base'}));
}

async function cachedFetch(url, cacheKey) {
  await fs.mkdir(CACHE_DIR, {recursive: true});
  const cachePath = path.join(CACHE_DIR, `${cacheKey}.html`);
  if (!refresh) {
    try { return await fs.readFile(cachePath, 'utf8'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  const response = await fetch(url, {headers: {'User-Agent': USER_AGENT, Accept: 'text/html'}});
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`);
  const text = await response.text();
  await fs.writeFile(cachePath, text);
  await sleep(REQUEST_DELAY_MS);
  return text;
}

function searchResults(html) {
  const results = [];
  const pattern = /<h3\b[^>]*class="[^"]*link-box__title[^"]*"[^>]*>\s*<a\b[^>]*href="(\/cocktails\/recipe\/\d+\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(pattern)) {
    const name = plainText(match[2]);
    if (name) results.push({name, url: new URL(match[1], BASE_URL).href});
  }
  const byUrl = new Map(results.map((result) => [result.url, result]));
  return [...byUrl.values()];
}

function cocktailNames(cocktail) {
  const aliases = Array.isArray(cocktail.alternateNames)
    ? cocktail.alternateNames
    : String(cocktail.alternateNames || '').split(/[;,]/);
  return unique([cocktail.name, ...aliases.map((name) => String(name).trim())]);
}

function chooseMatch(cocktail, results) {
  const localKeys = new Set(cocktailNames(cocktail).map(nameKey));
  const exact = results.filter((result) => localKeys.has(nameKey(result.name)));
  if (exact.length === 1) return {status: 'matched', match: exact[0], candidates: exact};
  if (exact.length > 1) return {status: 'ambiguous', candidates: exact};

  const close = results.filter((result) => {
    const resultKey = nameKey(result.name);
    return [...localKeys].some((key) => resultKey.startsWith(`${key} `) || key.startsWith(`${resultKey} `));
  });
  return close.length ? {status: 'ambiguous', candidates: close.slice(0, 8)} : {status: 'unmatched', candidates: results.slice(0, 8)};
}

function jsonLdRecipe(html) {
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const value = JSON.parse(match[1]);
      const values = Array.isArray(value) ? value : [value];
      const recipe = values.find((entry) => entry?.['@type'] === 'Recipe');
      if (recipe) return recipe;
    } catch (error) {
      // Ignore unrelated malformed structured data blocks.
    }
  }
  throw new Error('Recipe JSON-LD was not found.');
}

function metaImage(html, property) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const key = tag.match(/(?:property|name)=["']([^"']+)["']/i)?.[1];
    if (key?.toLowerCase() !== property.toLowerCase()) continue;
    return decodeHtml(tag.match(/content=["']([^"']+)["']/i)?.[1] || '').trim();
  }
  return '';
}

function recipeHeaderImage(html) {
  const gallery = html.match(/<div\b[^>]*class=["'][^"']*\blegacy-gallery\b[^"']*["'][^>]*>\s*<img\b[^>]*src=["']([^"']+)["']/i);
  return decodeHtml(gallery?.[1] || '').trim();
}

function ingredientAmounts(html) {
  const table = html.match(/<table\b[^>]*class="[^"]*legacy-ingredients-table[^"]*"[^>]*>([\s\S]*?)<\/table>/i)?.[1] || '';
  return [...table.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].flatMap((row) => {
    const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)];
    if (cells.length < 2) return [];
    return [plainText(cells[0][1]).replace(/\bfl\s+oz\b/gi, 'oz').replace(/\s+/g, ' ').trim()];
  });
}

function splitIngredient(value) {
  const text = decodeHtml(value).trim();
  const match = text.match(/^(?:\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)\s*(?:ml|cl|fl\s*oz|oz|tsp|tbsp|bar\s*spoons?|dash(?:es)?|drops?|parts?|fresh|dried|swaths?|grinds?|pinch(?:es)?|cubes?|wedges?|slices?|sprigs?|leaves?|chunks?|scoops?)\s+(.+)$/i);
  return (match ? match[1] : text).trim();
}

function fallbackImperialIngredient(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d+(?:\.\d+)?)\s*ml\s+(.+)$/i);
  if (!match) return text.replace(/\bfl\s+oz\b/gi, 'oz');
  const ounces = Number(match[1]) / 29.5735;
  const quarters = Math.round(ounces * 4) / 4;
  const whole = Math.floor(quarters);
  const fraction = Math.round((quarters - whole) * 4);
  const fractionText = ['', '1/4', '1/2', '3/4'][fraction] || '';
  const amount = [whole || '', fractionText].filter(String).join(' ') || '1/4';
  return `${amount} oz ${match[2]}`;
}

function normalizeIngredientName(value) {
  const name = splitIngredient(value)
    .replace(/\s*\([^)]*recommended[^)]*\)/gi, '')
    .replace(/\s+/g, ' ').trim();
  const key = nameKey(name);
  const exact = new Map([
    ['rosso sweet vermouth', 'Vermouth, Sweet (Italian/Rosso)'],
    ['rosso rouge sweet vermouth di torino', 'Vermouth, Sweet (Italian/Rosso)'],
    ['dry vermouth', 'Vermouth, Dry (French)'],
    ['extra dry vermouth', 'Vermouth, Extra Dry'],
    ['soda club soda water', 'Soda Water'],
    ['sugar cane syrup rich 2 sugar to 1 water', 'Sugar Syrup'],
    ['sugar syrup', 'Sugar Syrup'],
    ['freshly squeezed lemon juice', 'Lemon Juice [Fresh]'],
    ['freshly squeezed lime juice', 'Lime Juice [Fresh]'],
    ['lemon juice freshly squeezed', 'Lemon Juice [Fresh]'],
    ['lime juice freshly squeezed', 'Lime Juice [Fresh]']
  ]);
  if (exact.has(key)) return exact.get(key);
  if (/\bred bitter liqueur\b/i.test(name)) return 'Bitter Liqueur [Campari]';
  return name
    .replace(/^London dry gin$/i, 'Gin, London Dry')
    .replace(/^White rum$/i, 'Rum, White')
    .replace(/^Gold rum$/i, 'Rum, Gold')
    .replace(/^Dark rum$/i, 'Rum, Dark');
}

function sectionText(html, anchor) {
  const anchorPattern = new RegExp(`(?:^|\\s)id=["']${anchor}["']`, 'i');
  const hit = anchorPattern.exec(html);
  if (!hit) return '';
  const start = html.lastIndexOf('<', hit.index);
  const anchors = ['anchor-review', 'anchor-variant', 'anchor-history', 'anchor-nutrition', 'anchor-alcohol-content', 'anchor-comments'];
  const nextPositions = anchors
    .filter((name) => name !== anchor)
    .map((name) => {
      const match = new RegExp(`(?:^|\\s)id=["']${name}["']`, 'i').exec(html.slice(hit.index + 1));
      if (!match) return -1;
      const anchorPosition = hit.index + 1 + match.index;
      return html.lastIndexOf('<', anchorPosition);
    })
    .filter((position) => position > hit.index);
  const end = nextPositions.length ? Math.min(...nextPositions) : html.length;
  return plainText(html.slice(start, end))
    .replace(/^(?:Review|Variations?\/similar cocktails|Variant|History|Nutrition|Alcohol content):?\s*/i, '')
    .replace(/\n(?:View readers' comments|More cocktails with similar)[\s\S]*$/i, '')
    .trim();
}

function guideValues(html) {
  const strength = Number(html.match(/alt="Strength\s+(\d+)\/10"/i)?.[1]);
  const taste = Number(html.match(/alt="Sweet to sour\s+(\d+)\/10"/i)?.[1]);
  return {
    ...(Number.isFinite(strength) ? {strength} : {}),
    ...(Number.isFinite(taste) ? {taste} : {})
  };
}

function nutritionValues(html, recipe) {
  const text = plainText(html.slice(Math.max(0, html.search(/id="anchor-nutrition"/i))));
  const number = (pattern) => {
    const value = Number(text.match(pattern)?.[1]);
    return Number.isFinite(value) ? value : null;
  };
  const calories = Number(String(recipe.nutrition?.calories || '').match(/\d+(?:\.\d+)?/)?.[0]);
  return {
    calories: Number.isFinite(calories) ? calories : number(/contains\s+(\d+(?:\.\d+)?)\s+calories/i),
    standardDrinks: number(/(\d+(?:\.\d+)?)\s+standard drinks?/i),
    abv: number(/(\d+(?:\.\d+)?)%\s+alc\.\/vol\./i),
    proof: number(/\((\d+(?:\.\d+)?)\s*degrees?\s+proof\)/i),
    pureAlcoholGrams: number(/(\d+(?:\.\d+)?)\s+grams? of pure alcohol/i)
  };
}

function discerningDrinkersRating(html) {
  const label = /Discerning Drinkers\s*\(([\d,]+)\s+ratings?\)/i.exec(html);
  if (!label) return null;
  const ratingStart = html.indexOf('<div class="rating">', label.index + label[0].length);
  if (ratingStart === -1) return null;
  const icons = [...html.slice(ratingStart, ratingStart + 4000).matchAll(/#svg-icon-star(?:-(half|empty))?/gi)].slice(0, 5);
  if (icons.length !== 5) return null;
  const rating = icons.reduce((total, icon) => total + (icon[1]?.toLowerCase() === 'empty' ? 0 : icon[1]?.toLowerCase() === 'half' ? 0.5 : 1), 0);
  const ratingCount = Number(label[1].replace(/,/g, ''));
  return rating > 0 ? {rating, ratingCount: Number.isFinite(ratingCount) ? ratingCount : 0} : null;
}

function extractRecipe(html, localCocktail, match) {
  const recipe = jsonLdRecipe(html);
  const genericNames = (recipe.recipeIngredient || []).map(normalizeIngredientName);
  const amounts = ingredientAmounts(html);
  const ingredients = genericNames.map((name, index) => amounts.length === genericNames.length
    ? `${amounts[index]} ${name}`
    : fallbackImperialIngredient(recipe.recipeIngredient[index]));
  const instructions = (recipe.recipeInstructions || []).map((step) => ({
    name: String(step?.name || ''),
    text: plainText(step?.text || step)
  })).filter((step) => step.text);
  const garnishSteps = instructions.filter((step) => /garnish/i.test(step.name) || /^garnish\b/i.test(step.text));
  const garnish = garnishSteps.length
    ? garnishSteps.at(-1).text.replace(/^garnish(?: with| of)?\s*/i, '').replace(/\.$/, '')
    : '';
  const method = instructions
    .filter((step) => !garnishSteps.includes(step) || /^prepare garnish/i.test(step.text))
    .map((step) => step.text);
  const guide = guideValues(html);
  const nutrition = nutritionValues(html, recipe);
  const discerningDrinkers = discerningDrinkersRating(html);
  const notes = {
    review: sectionText(html, 'anchor-review'),
    variant: sectionText(html, 'anchor-variant'),
    history: sectionText(html, 'anchor-history')
  };
  const glassware = plainText(html.match(/<h3\b[^>]*>Glass:<\/h3>\s*<p>([\s\S]*?)<\/p>/i)?.[1] || '');
  return {
    id: localCocktail.id,
    sourceName: String(recipe.name || match.name),
    url: String(recipe.url || match.url),
    image: recipeHeaderImage(html) || metaImage(html, 'og:image') || String(recipe.image?.url || ''),
    key: 'diffords',
    label: "Difford's",
    available: ingredients.length > 0,
    glassware,
    ingredients,
    ingredientNames: genericNames,
    ingredientBottles: genericNames.map(() => ''),
    method,
    garnish,
    guide,
    nutrition,
    discerningDrinkers,
    notes
  };
}

function coverage(recipe) {
  return {
    ingredients: recipe.ingredients.length > 0,
    method: recipe.method.length > 0,
    strength: recipe.guide.strength !== undefined,
    taste: recipe.guide.taste !== undefined,
    review: Boolean(recipe.notes.review),
    variant: Boolean(recipe.notes.variant),
    history: Boolean(recipe.notes.history),
    discerningDrinkers: Boolean(recipe.discerningDrinkers?.rating),
    nutrition: recipe.nutrition.calories !== null,
    alcoholContent: [recipe.nutrition.standardDrinks, recipe.nutrition.abv, recipe.nutrition.proof, recipe.nutrition.pureAlcoholGrams].some((value) => value !== null)
  };
}

async function discover(cocktail, overrides) {
  const overrideUrl = overrides[cocktail.id];
  if (overrideUrl) {
    return {
      status: 'matched',
      match: {name: cocktail.name, url: overrideUrl},
      candidates: [],
      overridden: true
    };
  }
  const names = cocktailNames(cocktail);
  const allResults = [];
  for (const name of names) {
    const cacheKey = `search-${slug(name) || slug(cocktail.id)}`;
    const html = await cachedFetch(`${BASE_URL}/cocktails/search?s=1&k=${encodeURIComponent(name)}`, cacheKey);
    allResults.push(...searchResults(html));
    const decision = chooseMatch(cocktail, allResults);
    if (decision.status === 'matched') return decision;
  }
  const byUrl = new Map(allResults.map((result) => [result.url, result]));
  return chooseMatch(cocktail, [...byUrl.values()]);
}

async function main() {
  const cocktails = await loadCocktails();
  const overrides = await loadOverrides();
  const imported = [];
  const reportItems = [];
  console.log(`Difford's import: checking ${cocktails.length} cocktails${refresh ? ' (refreshing cache)' : ''}.`);

  for (let index = 0; index < cocktails.length; index += 1) {
    const cocktail = cocktails[index];
    process.stdout.write(`[${String(index + 1).padStart(String(cocktails.length).length, ' ')}/${cocktails.length}] ${cocktail.name} ... `);
    try {
      const decision = await discover(cocktail, overrides);
      if (decision.status !== 'matched') {
        reportItems.push({id: cocktail.id, name: cocktail.name, status: decision.status, candidates: decision.candidates});
        console.log(decision.status);
        continue;
      }
      const match = decision.match;
      const pageId = match.url.match(/\/recipe\/(\d+)\//)?.[1] || slug(match.name);
      const html = await cachedFetch(match.url, `recipe-${pageId}`);
      const recipe = extractRecipe(html, cocktail, match);
      imported.push(recipe);
      reportItems.push({id: cocktail.id, name: cocktail.name, status: 'imported', sourceName: recipe.sourceName, url: recipe.url, overridden: Boolean(decision.overridden), coverage: coverage(recipe)});
      console.log(`imported as ${recipe.sourceName}`);
    } catch (error) {
      reportItems.push({id: cocktail.id, name: cocktail.name, status: 'error', error: error.message});
      console.log(`error: ${error.message}`);
    }
  }

  const statuses = reportItems.reduce((counts, item) => ({...counts, [item.status]: (counts[item.status] || 0) + 1}), {});
  const fieldCoverage = Object.keys(imported[0] ? coverage(imported[0]) : {}).reduce((result, field) => ({
    ...result,
    [field]: imported.filter((recipe) => coverage(recipe)[field]).length
  }), {});
  const report = {
    generatedAt: new Date().toISOString(),
    source: BASE_URL,
    totalCocktails: cocktails.length,
    statuses,
    fieldCoverage,
    items: reportItems
  };

  await fs.mkdir(path.dirname(REPORT_PATH), {recursive: true});
  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  if (!dryRun) {
    const output = `// Generated by tools/import-diffords.mjs. Review build/diffords-import-report.json.\nwindow.DIFFORDS_DATA = ${JSON.stringify(imported, null, 2)};\n`;
    await fs.writeFile(OUTPUT_PATH, output);
  }
  console.log(`\nImported ${imported.length}/${cocktails.length}. Report: ${path.relative(ROOT, REPORT_PATH)}`);
  if (!dryRun) console.log(`Data: ${path.relative(ROOT, OUTPUT_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
