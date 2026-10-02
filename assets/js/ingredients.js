// Classic-script function declarations; shared state is initialized in app.js.
function canonicalLiqueurSubtype(name, subtype) {
          if (/chart(?:reuse|ruse)|benedictine|fernet|cynar/i.test(String(name).normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) return 'Herb, Other';
          if (LIQUEUR_BAR_SUBTYPES.includes(subtype)) return subtype;
          const fruitSubtype = fruitLiqueurSubtypeForName(name);
          if (subtype === 'Fruits liqueurs' || subtype === 'Fruit Liqueur') return fruitSubtype || 'Fruit, Other';
          if (!subtype && fruitSubtype) return fruitSubtype;
          if (subtype !== 'Anise liqueurs' && subtype !== 'Herbs and Anise liqueurs') return subtype;
          const bottleName = String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
          if (bottleName === 'b b' || bottleName.startsWith('b b ') || bottleName.includes('b and b')) return 'Herb, Brandy';
          if (['mint', 'creme de menthe'].some((token) => bottleName.includes(token))) return 'Herb, Mint';
          if (subtype === 'Anise liqueurs' || ['anise', 'absinthe', 'pernod', 'sambuca', 'galliano'].some((token) => bottleName.includes(token))) return 'Herb, Anise';
          return 'Herb, Other';
        }

function refreshBundledCocktailSources(cocktail) {
      const classicSource = CLASSIC_SOURCE_BY_ID.get(cocktail?.id);
      if (classicSource) cocktail = {...cocktail, classicSource};
      const source = LETTERS_LIQUOR_SOURCE_BY_ID.get(cocktail?.id);
      if (!source) return cocktail;
      const refreshed = {...cocktail, lnlSource: source};
      if (cocktail.id !== 'lnl-whiskey-ginger') return refreshed;
      return {
        ...refreshed,
        ingredients: source.ingredients.slice(), ingredientNames: source.ingredientNames.slice(),
        ingredientCount: source.ingredients.length, method: source.method.slice(), garnish: source.garnish
      };
    }

function titleCaseDiffordsIngredient(value) {
	      return String(value || '').toLocaleLowerCase('en-US').replace(/(^|[\s([{/&-])([a-zà-öø-ÿ])/g, (match, prefix, letter) => `${prefix}${letter.toLocaleUpperCase('en-US')}`);
	    }

function titleCaseDiffordsIngredientLine(value) {
	      const line = String(value || '');
	      const ingredientName = parseIngredientLine(line).name;
	      const nameIndex = line.lastIndexOf(ingredientName);
	      return nameIndex < 0
	        ? titleCaseDiffordsIngredient(line)
	        : `${line.slice(0, nameIndex)}${titleCaseDiffordsIngredient(ingredientName)}`;
	    }

function normalizeSpecialtyLiqueurIngredients(cocktail) {
      if (!cocktail || !Array.isArray(cocktail.ingredientNames)) return cocktail;
      if (!Array.isArray(cocktail.liqueurs)) cocktail.liqueurs = [];
      const hadSyrupOrPureeLiqueur = cocktail.liqueurs.some((item) => /falernum|pur[eé]e/i.test(item.name));
      cocktail.liqueurs = cocktail.liqueurs.filter((item) => !/falernum|pur[eé]e/i.test(item.name));
      const ingredientText = [
        ...cocktail.ingredientNames,
        ...(Array.isArray(cocktail.ingredients) ? cocktail.ingredients : []),
        ...(Array.isArray(cocktail.ingredientBottles) ? cocktail.ingredientBottles : []),
        ...cocktail.liqueurs.map((liqueur) => liqueur.name || '')
      ].join(' ');
      SPECIALTY_LIQUEUR_INGREDIENTS.forEach((specialty) => {
        const existing = cocktail.liqueurs.find((liqueur) => specialty.pattern.test(String(liqueur.name || '')));
        const specialtyName = specialty.name === 'Chartreuse'
          ? (/(?:green[\s,]+chart(?:reuse|ruse)|chart(?:reuse|ruse)[\s,]+green)/i.test(ingredientText) ? 'Chartreuse, Green'
            : /(?:yellow[\s,]+chart(?:reuse|ruse)|chart(?:reuse|ruse)[\s,]+yellow)/i.test(ingredientText) ? 'Chartreuse, Yellow'
            : specialty.name)
          : specialty.name;
        if (existing) {
          existing.name = specialtyName;
          existing.subtype = canonicalLiqueurSubtype(specialtyName, 'Other, Specialty');
          return;
        }
        if (specialty.pattern.test(ingredientText)) {
          cocktail.liqueurs.push({name: specialtyName, subtype: canonicalLiqueurSubtype(specialtyName, 'Other, Specialty'), flavor: specialty.flavor});
        }
      });
      if (hadSyrupOrPureeLiqueur && !cocktail.liqueurs.length) cocktail.baseLiquor = (cocktail.baseLiquor || []).filter((base) => base !== 'Liqueurs');
      return cocktail;
    }

function sanitizeFriendRatings(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
      return Object.fromEntries(Object.entries(value).flatMap(([cocktailId, entries]) => {
        if (!cocktailId) return [];
        const sourceEntries = Array.isArray(entries)
          ? entries
          : (entries && typeof entries === 'object' ? Object.entries(entries).map(([name, rating]) => ({name, rating})) : []);
        const byName = new Map();
        sourceEntries.forEach((entry) => {
          const name = typeof entry?.name === 'string' ? entry.name.trim() : '';
          const rating = sanitizeFriendRatingValue(entry?.rating);
          if (name && rating) byName.set(bottleSearchText(name), {name, rating});
        });
        const cleanEntries = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
        return cleanEntries.length ? [[cocktailId, cleanEntries]] : [];
      }));
    }

function sanitizeCocktailGuides(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
      return Object.fromEntries(Object.entries(value).flatMap(([cocktailId, guide]) => {
        if (!cocktailId || !guide || typeof guide !== 'object' || Array.isArray(guide)) return [];
        const cleanGuide = {};
        ['strength', 'taste'].forEach((key) => {
          const number = Number(guide[key]);
          if (Number.isFinite(number)) cleanGuide[key] = Math.max(0, Math.min(10, Math.round(number)));
        });
        return Object.keys(cleanGuide).length ? [[cocktailId, cleanGuide]] : [];
      }));
    }

function setFiltersVisible(visible) {
      document.body.classList.toggle('filters-visible', visible);
      $('#filterSummaryToggle').setAttribute('aria-expanded', String(visible));
      $('#filterSummaryToggle').setAttribute('aria-label', `${visible ? 'Hide' : 'Show'} detailed cocktail filters`);
      setMobileAdvancedFiltersExpanded(visible && window.matchMedia('(max-width: 760px)').matches);
      if (!visible) {
        $('#genreMoreMenu').hidden = true;
        $('#genreMoreButton').setAttribute('aria-expanded', 'false');
      }
      if (typeof updateStickyTop === 'function') updateStickyTop();
    }

function parseCocktailAlternateNames(value, primaryName = '') {
          const values = Array.isArray(value) ? value : String(value || '').split(/[,;\n]+/);
          const primaryKey = norm(primaryName);
          const seen = new Set();
          return values.map((name) => String(name || '').trim()).filter((name) => {
            const key = norm(name);
            if (!key || key === primaryKey || seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        }

function cocktailDisplayName(cocktail) {
          const aliases = cocktailAlternateNames(cocktail);
          return `${cocktail.name}${aliases.length ? ` (${aliases.join(', ')})` : ''}`;
        }

function cocktailNameMarkup(cocktail) {
          const aliases = cocktailAlternateNames(cocktail);
          return `${escapeHtml(cocktail.name)}${aliases.length ? `<span class="cocktail-alternate-names">(${escapeHtml(aliases.join(', '))})</span>` : ''}`;
        }

function normalizeCocktailAlternateNames(cocktail) {
          if (!cocktail || typeof cocktail !== 'object') return cocktail;
          cocktail.alternateNames = parseCocktailAlternateNames(cocktail.alternateNames, cocktail.name);
          return cocktail;
        }

function uniqueCocktailId(name, excludeId = '') {
          const base = slugify(name);
          let id = base, n = 2;
          while (COCKTAILS.some((c) => c.id === id && c.id !== excludeId)) { id = `${base}-${n}`; n++; }
          return id;
        }

function parseIngredientLine(line) {
          const trimmed = line.trim();
          if (/^(?:(?:1\s+)?absinthe\s+rinse|(?:a\s+)?rinse(?:\s+of)?\s+absinthe)$/i.test(trimmed)) return {line: trimmed, name: 'Absinthe'};
	      const match = trimmed.match(/^(?:[\d.\/⁄½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]+(?:\s+[\d\/⁄½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]+)?(?:\s*-\s*[\d.\/⁄½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]+)?\s*(?:oz|ml|cl|dash(?:es)?|drops?|tsp|tbsp|bar\s*spoons?|cups?|parts?|pieces?|pinch(?:es)?|fresh|dried|swaths?|grinds?|cubes?|wedges?|slices?|sprigs?|leaves?|chunks?|scoops?)?|(?:a\s+)?(?:few\s+drops|pinch|splash|top\s+up(?:\s+with)?)(?:\s+of)?)\s+(.+)$/i);
          return { line: trimmed, name: (match ? match[1] : trimmed).trim() };
        }

function addSubtype(tags, cocktail, base, subtype) {
          if (cocktail.baseLiquor.includes(base)) tags.push({base, subtype, value: subtypeValue(base, subtype)});
        }

function baseSubtypeTags(cocktail) {
          const text = norm([...cocktail.ingredientNames, ...cocktail.ingredients.map((line) => String(line).replace(/\[[^\]]*\]/g, ''))].join(' '));
          const tags = [];
          const add = (base, subtype) => addSubtype(tags, cocktail, base, subtype);
          if (cocktail.baseLiquor.includes('Liqueurs')) cocktail.liqueurs.forEach((liqueur) => add('Liqueurs', canonicalLiqueurSubtype(liqueur.name, liqueur.subtype)));
          if (cocktail.baseLiquor.includes('Vodka')) add('Vodka', textHas(text, 'vanilla vodka') || textHas(text, 'vodka citron') || textHas(text, 'flavored vodka') ? 'Flavored/Infused' : 'Plain');
          if (cocktail.baseLiquor.includes('Rum')) {
            let matched = false;
            [['Overproof','overproof'],['Dark','blackstrap'],['Dark','demerara'],['White','cachaca'],['White','aguardiente'],['White','rhum agricole'],['White','martinique rum'],['White','martinique rhum'],['Dark','jamaican dark'],['Gold','gold rum'],['Dark','dark rum'],['Dark','rum dark smokey'],['Spiced','spiced rum'],['Aged/Vintage','aged rum'],['Aged/Vintage','vintage rum'],['Aged/Vintage','rum white aged'],['White','white rum']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Rum', subtype); matched = true; }
            });
            if (!matched && textHas(text, 'rum')) add('Rum', 'White');
          }
          if (cocktail.baseLiquor.includes('Gin')) {
            if (textHas(text, 'old tom gin')) add('Gin', 'Old Tom Gin');
            else if (textHas(text, 'genever') || textHas(text, 'jenever')) add('Gin', 'Genever (Jenever)');
            else if (textHas(text, 'contemporary gin') || textHas(text, 'new western gin')) add('Gin', 'Contemporary/New Western');
            else add('Gin', 'London Dry');
          }
          if (cocktail.baseLiquor.includes('Whiskey') && cocktail.id !== 'lnl-whiskey-ginger') {
            let matched = false;
            const isIslay = textHas(text, 'scotch islay') || textHas(text, 'islay scotch') || textHas(text, 'lagavulin');
            const isOrkneyScotch = textHas(text, 'highland park') || textHas(text, 'orkney');
            const isSkyeScotch = textHas(text, 'talisker') || textHas(text, 'skye');
            const isIslandScotch = isOrkneyScotch || isSkyeScotch || textHas(text, 'scotch island') || textHas(text, 'island scotch');
            const isHighlandsScotch = textHas(text, 'scotch highlands') || textHas(text, 'highland scotch');
            const isLowlandsScotch = textHas(text, 'scotch lowlands') || textHas(text, 'lowland scotch');
            const isCampbeltownScotch = textHas(text, 'scotch campbeltown') || textHas(text, 'campbeltown scotch');
            const isSpeysideScotch = textHas(text, 'scotch speyside') || textHas(text, 'speyside scotch');
            const isBlendedScotch = textHas(text, 'scotch blended') || textHas(text, 'blended scotch');
            const isSingleMaltScotch = textHas(text, 'scotch single malt') || textHas(text, 'single malt scotch');
            if (isIslay) { add('Whiskey', 'Scotch, Islay (Smokey)'); matched = true; }
            else if (isOrkneyScotch) { add('Whiskey', 'Scotch, Islands (Orkney)'); matched = true; }
            else if (isIslandScotch) { add('Whiskey', 'Scotch, Islands (Skye)'); matched = true; }
            else if (isHighlandsScotch) { add('Whiskey', 'Scotch, Highlands'); matched = true; }
            else if (isLowlandsScotch) { add('Whiskey', 'Scotch, Lowlands'); matched = true; }
            else if (isCampbeltownScotch) { add('Whiskey', 'Scotch, Campbeltown'); matched = true; }
            else if (isSpeysideScotch) { add('Whiskey', 'Scotch, Speyside'); matched = true; }
            else if (isBlendedScotch) { add('Whiskey', 'Scotch, Blended'); matched = true; }
            else if (isSingleMaltScotch) { add('Whiskey', 'Scotch, Single Malt'); matched = true; }
            [['Japanese','japanese whiskey'],['Japanese','japanese whisky'],['Irish','irish whiskey'],['Irish','irish whisky'],['Canadian','canadian whiskey'],['Canadian','canadian whisky'],['American','american whiskey'],['American','american whisky'],['American','tennessee'],['Bourbon','bourbon'],['Rye','rye whiskey'],['Rye','rye whisky']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Whiskey', subtype); matched = true; }
            });
            if (textHas(text, 'scotch') && !isIslay && !isIslandScotch && !isHighlandsScotch && !isLowlandsScotch && !isCampbeltownScotch && !isSpeysideScotch && !isBlendedScotch && !isSingleMaltScotch) { add('Whiskey', 'Scotch, Blended'); matched = true; }
            if (!matched && (textHas(text, 'whiskey') || textHas(text, 'whisky'))) add('Whiskey', 'American');
          }
          if (cocktail.baseLiquor.includes('Tequila')) {
            let matched = false;
            [['Mezcal','mezcal'],['Extra Añejo (Ultra Aged)','extra anejo'],['Añejo (Aged)','anejo'],['Reposado (Rested)','reposado'],['Joven (Gold/Oro)','joven'],['Joven (Gold/Oro)','gold tequila'],['Blanco (Silver/Plata)','blanco'],['Blanco (Silver/Plata)','silver tequila']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Tequila', subtype); matched = true; }
            });
            if (textHas(text, 'tequila') && !matched) add('Tequila', 'Blanco (Silver/Plata)');
          }
          if (cocktail.baseLiquor.includes('Brandy')) {
            let matched = false;
            [['Cognac','cognac'],['Armagnac','armagnac'],['Calvados','calvados'],['Pisco','pisco'],['Brandy de Jerez','jerez'],['Grappa','grappa'],['Fruit Brandies (Eau-de-Vie)','apricot brandy'],['Fruit Brandies (Eau-de-Vie)','cherry brandy'],['Fruit Brandies (Eau-de-Vie)','peach brandy'],['Fruit Brandies (Eau-de-Vie)','fruit brandy'],['Fruit Brandies (Eau-de-Vie)','eau de vie']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Brandy', subtype); matched = true; }
            });
          }
          if (cocktail.baseLiquor.includes('Wine')) {
            let matched = false;
            [['Sparkling','champagne'],['Sparkling','prosecco'],['Sparkling','sparkling wine'],['Red','red wine'],['White','white wine'],['Rosé','rose wine'],['Rosé','rose'],['Dessert/Fortified Wine','port wine'],['Dessert/Fortified Wine','sherry'],['Dessert/Fortified Wine','fortified wine'],['Dessert/Fortified Wine','dessert wine']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Wine', subtype); matched = true; }
            });
            if (!matched) add('Wine', 'White');
          }
          if (cocktail.baseLiquor.includes('Vermouth')) {
            const isBittersweetVermouth = textHas(text, 'bittersweet vermouth') || textHas(text, 'vermouth bittersweet') || textHas(text, 'punt e mes');
            const isExtraDryVermouth = textHas(text, 'extra dry vermouth') || textHas(text, 'vermouth extra dry');
            if (isExtraDryVermouth) add('Vermouth', 'Vermouth, Extra Dry');
            else if (textHas(text, 'dry vermouth') || textHas(text, 'french vermouth') || textHas(text, 'vermouth dry french')) add('Vermouth', 'Vermouth, Dry (French)');
            if (isBittersweetVermouth) add('Vermouth', 'Vermouth, Bittersweet');
            else if (textHas(text, 'sweet vermouth') || textHas(text, 'sweet red vermouth') || textHas(text, 'rosso vermouth') || textHas(text, 'italian vermouth') || textHas(text, 'vermouth sweet italian rosso')) add('Vermouth', 'Vermouth, Sweet (Italian/Rosso)');
            if (textHas(text, 'bianco vermouth') || textHas(text, 'blanc vermouth') || textHas(text, 'vermouth bianco blanc')) add('Vermouth', 'Vermouth, Bianco (Blanc)');
            if (textHas(text, 'rose vermouth') || textHas(text, 'vermouth rose')) add('Vermouth', 'Vermouth, Rosé');
            if (textHas(text, 'amber vermouth') || textHas(text, 'ambrato vermouth') || textHas(text, 'vermouth ambrato amber')) add('Vermouth', 'Vermouth, Ambrato (Amber)');
          }
          if (cocktail.baseLiquor.includes('Beer')) {
            let matched = false;
            [['Ales','ale'],['Lagers','lager'],['Cider/Mead','cider'],['Cider/Mead','mead'],['Specialty/Sour','sour'],['Specialty/Sour','specialty']].forEach(([subtype, needle]) => {
              if (textHas(text, needle)) { add('Beer', subtype); matched = true; }
            });
            if (!matched) add('Beer', 'Ales');
          }
          const seen = new Set();
          return tags.filter((tag) => seen.has(tag.value) ? false : seen.add(tag.value));
        }

function orderedSelectedBases() {
          return [...BASE_ORDER.filter((base) => state.bases.has(base)), ...Array.from(state.bases).filter((base) => !BASE_ORDER.includes(base)).sort()];
        }

function baseSubtypeOptions() {
          const liqueurSubtypes = unique(COCKTAILS.flatMap((cocktail) => cocktail.liqueurs.map((liqueur) => canonicalLiqueurSubtype(liqueur.name, liqueur.subtype)))).sort();
          return orderedSelectedBases().flatMap((base) => {
            const subtypes = base === 'Liqueurs' ? liqueurSubtypes : (BASE_SUBTYPES[base] || []);
            return subtypes.map((subtype) => ({base, subtype, value: subtypeValue(base, subtype)}));
          });
        }

function syncSubtypeFilters() {
          const allowed = new Set(baseSubtypeOptions().map((option) => option.value));
          state.subtypes.forEach((value) => { if (!allowed.has(value)) state.subtypes.delete(value); });
        }

function liqueurTypeLabel(subtype) {
          return LIQUEUR_SUBTYPE_LABELS[subtype] || String(subtype || 'Liqueur').replace(/\s*liqueurs$/i, ' Liqueur');
        }

function specialtyIngredientLabel(name) {
          const key = norm(name);
          if (/chart(?:reuse|ruse)/.test(key)) return `Herb, Other Liqueur [Chartreuse (${key.includes('yellow') ? 'Yellow' : 'Green'})]`;
          if (key.includes('benedictine')) return 'Herb, Other Liqueur [Bénédictine D.O.M.]';
          if (key.includes('cynar')) return 'Herb, Other Liqueur [Cynar (Amaro, Italian)]';
          if (key.includes('falernum')) return 'Sweet Spiced Syrup [Falernum (Caribbean)]';
          if (key.includes('puree')) return titleWords(key).replace(/Puree/g, 'Purée');
          if (/fernet/.test(key)) return 'Herb, Other Liqueur [Fernet (Amaro, Italian)]';
          if (key.includes('cachaca')) return 'Sugarcane, Other Spirit [Cachaça (Brazilian)]';
          if (key === 'absinthe rinse') return 'Absinthe';
          if (key === 'white peach puree') return 'White Peach Purée';
          return '';
        }

function liqueurIngredientLabel(liqueur) {
          if (specialtyIngredientLabel(liqueur.name)) return specialtyIngredientLabel(liqueur.name);
          const subtype = canonicalLiqueurSubtype(liqueur.name, liqueur.subtype);
          const fruitType = subtype.startsWith('Fruit, ') ? subtype.slice('Fruit, '.length) : '';
          const base = fruitType ? `${fruitType} Liqueur` : liqueurTypeLabel(subtype);
          const lead = !fruitType && FLAVOR_LED_LIQUEUR_SUBTYPES.has(subtype) ? titleWords(String(liqueur.flavor || '').split(',')[0]) : '';
          const label = subtype === 'Nuts liqueurs' && norm(lead) === 'almond'
            ? 'Almond Liqueur'
            : `${lead && !norm(base).startsWith(norm(lead)) ? `${lead} ` : ''}${base}`;
          const genericNames = [label, base, lead ? `${lead} Liqueur` : ''].map(norm);
          return genericNames.includes(norm(liqueur.name)) ? liqueur.name : `${label} [${liqueur.name}]`;
        }

function normalizedIngredientIdentity(value) {
          return norm(value).replace(/\bcocoa\b/g, 'cacao').replace(/\bliqueurs\b/g, 'liqueur');
        }

function ingredientNamesOverlap(left, right) {
          const leftName = normalizedIngredientIdentity(left);
          const rightName = normalizedIngredientIdentity(right);
          if (/\bpuree\b/.test(leftName) !== /\bpuree\b/.test(rightName)) return false;
          return leftName === rightName || leftName.includes(rightName) || rightName.includes(leftName);
        }

function displayIngredientName(name, cocktail) {
          if (specialtyIngredientLabel(name)) return specialtyIngredientLabel(name);
          if (INGREDIENT_LABEL_OVERRIDES[name]) return INGREDIENT_LABEL_OVERRIDES[name];
          const normalized = norm(name);
          if (normalized === 'basil' || normalized === 'basil leaves') return 'Basil Leaves';
          if (normalized === 'cold brew') return 'Coffee [Cold Brew]';
          if (normalized === 'cream of coconut') return 'Coconut Cream';
          if (normalized === 'demerara sugar') return 'Sugar, Demerara';
          if (normalized === 'egg white and yolk') return 'Egg';
          if (normalized === 'egg white pasteurized' || normalized === 'egg white pasteurised') return 'Egg White';
          if (normalized === 'evaporated milk') return 'Milk, Evaporated';
          if (normalized === 'heavy cream') return 'Cream [Heavy]';
          if (normalized === 'heavy double cream') return 'Cream [Heavy/Double]';
          if (normalized === 'hot filter coffee') return 'Coffee';
          if (normalized === 'lemon fresh') return 'Lemon';
          if (normalized === 'lemon peel') return 'Lemon [Peel]';
          if (normalized === 'lemon wheel') return 'Lemon [Wheel]';
          if (normalized === 'lime fresh') return 'Lime';
          if (normalized === 'mint') return 'Mint Leaves';
          if (normalized === 'orange wheel') return 'Orange';
          if (normalized === 'sparking lemonade' || normalized === 'sparkling lemonade') return 'Lemonade, Sparkling';
          if (normalized === 'splash water') return 'Water';
          if (normalized.startsWith('top up with soda') && normalized.endsWith('water')) return 'Soda Water';
          if (normalized === 'vanilla sugar') return 'Sugar, Vanilla';
          if (normalized === 'sugar syrup 2 1' || normalized === 'rich sugar syrup') return 'Sugar Syrup [Rich]';
          if (normalized === 'lime juice juice') return 'Lime Juice';
          if (normalized === 'simple syrup' || normalized === 'sugar syrup') return 'Sugar Syrup';
          if (normalized.includes('espresso') && !normalized.includes('liqueur')) return 'Coffee [Espresso]';
          if (normalized === 'pinch of salt') return 'Salt';
          if (normalized === 'donn s mix') return "Donn's Mix";
          const liqueur = cocktail.liqueurs.find((item) => ingredientNamesOverlap(name, item.name));
          if (liqueur) return liqueurIngredientLabel(liqueur);
          const rumMatch = String(name || '').trim().match(/^(.+?)\s+Rum$/i);
          return rumMatch ? `Rum, ${titleWords(rumMatch[1])}` : name;
        }

function splitSpecificIngredientLabel(value) {
          const text = String(value || '').trim();
          const match = text.match(/^(.*?)\s+\[([^\]]+)\]$/);
          return match ? {generic: match[1].trim(), specific: match[2].trim()} : {generic: text, specific: ''};
        }

function normalizeIngredientSpecific(value) {
          const specific = String(value || '').trim();
          return norm(specific) === '2 1' ? 'Rich' : specific;
        }

function displayedBittersRequirement(sourceLine) {
          const text = norm(sourceLine);
          if (!/\bbitters?\b/.test(text)) return null;
          if (text.includes('angostura')) return {generic: 'Bitter, Aromatic', specific: 'Angostura'};
          if (text.includes('peychaud')) return {generic: 'Bitter, Aromatic', specific: "Peychaud's"};
          if (text.includes('orange bitter')) return {generic: 'Bitter, Orange', specific: ''};
          if (text.includes('peach bitter')) return {generic: 'Bitter, Other', specific: 'Peach'};
          if (text.includes('amargo bitter') || text.includes('amago bitter')) return {generic: 'Bitter, Other', specific: 'Amargo'};
          return {generic: 'Bitter, Aromatic', specific: ''};
        }

function ingredientDisplayParts(cocktail, index) {
          const rawName = cocktail.ingredientNames[index] || parseIngredientLine(cocktail.ingredients[index] || '').name;
          const sourceLine = String(cocktail.ingredients[index] || '');
          const specialtyLabel = specialtyIngredientLabel(/chart(?:reuse|ruse)/i.test(rawName) ? `${rawName} ${sourceLine}` : rawName);
          if (specialtyLabel) return splitSpecificIngredientLabel(specialtyLabel);
          const explicitSpecific = String(cocktail.ingredientBottles?.[index] || '').trim();
          if (explicitSpecific) {
            const displayed = splitSpecificIngredientLabel(displayIngredientName(rawName, cocktail));
            const sourceBrackets = Array.from(sourceLine.matchAll(/\[([^\]]+)\]/g), (match) => match[1].trim());
            const qualifier = sourceBrackets.length > 1 ? sourceBrackets[0] : '';
            const generic = qualifier ? `${displayed.generic || rawName} [${qualifier}]` : (displayed.generic || rawName);
            return {generic, specific: normalizeIngredientSpecific(explicitSpecific)};
          }
          const normalized = norm(rawName);
          const bittersRequirement = displayedBittersRequirement(sourceLine);
          if (bittersRequirement && (normalized === 'bitters' || normalized.endsWith(' bitters'))) return bittersRequirement;
          const liqueur = cocktail.liqueurs.find((item) => ingredientNamesOverlap(rawName, item.name));
          if (liqueur) return splitSpecificIngredientLabel(liqueurIngredientLabel(liqueur));
          const displayed = splitSpecificIngredientLabel(displayIngredientName(rawName, cocktail));
          if (normalized === 'gin' && /\b(?:london\s+)?dry gin\b/i.test(sourceLine)) displayed.generic = 'Gin, London Dry';
          const sourceBracket = sourceLine.match(/\[([^\]]+)\]/);
          if (!displayed.specific && sourceBracket) displayed.specific = normalizeIngredientSpecific(sourceBracket[1]);
          else displayed.specific = normalizeIngredientSpecific(displayed.specific);
          if (!displayed.specific && (/\bsugar cubes?\b/i.test(sourceLine) || normalized === 'sugar cube')) displayed.specific = 'Sugar Cube';
          return displayed;
        }

function ingredientTags(cocktail) {
          return unique(cocktail.ingredientNames.flatMap((name, index) => {
            const parts = ingredientDisplayParts(cocktail, index);
            return [parts.generic, parts.specific].filter(Boolean);
          }));
        }

function ingredientLineCandidates(cocktail) {
	          return [
	            ...Object.entries(INGREDIENT_LINE_LABELS).map(([alias, label]) => ({alias, label})),
	            ...Object.entries(INGREDIENT_LABEL_OVERRIDES).map(([alias, label]) => ({alias, label})),
	            ...(cocktail.ingredientBottles || []).map((specific, index) => ({alias: specific, label: `${cocktail.ingredientNames[index]} [${specific}]`})),
	            ...cocktail.liqueurs.map((liqueur) => ({alias: liqueur.name, label: liqueurIngredientLabel(liqueur)}))
	          ].filter((item) => item.alias && item.label).sort((a,b) => b.alias.length - a.alias.length);
	        }

function greatestCommonDivisor(a, b) {
	          return b ? greatestCommonDivisor(b, a % b) : Math.abs(a);
	        }

function mixedFraction(value, denominator) {
	          const rounded = Math.round(value * denominator);
	          const whole = Math.floor(rounded / denominator);
	          let numerator = rounded % denominator;
	          if (!numerator) return String(whole);
	          const divisor = greatestCommonDivisor(numerator, denominator);
	          numerator = numerator / divisor;
	          const reducedDenominator = denominator / divisor;
	          const fraction = VULGAR_FRACTIONS.get(`${numerator}/${reducedDenominator}`) || `${numerator}⁄${reducedDenominator}`;
	          return whole ? `${whole} ${fraction}` : fraction;
	        }

function parseRecipeAmount(value) {
	          const text = String(value || '').trim();
	          const mixedVulgar = text.match(new RegExp(`^(\\d+(?:\\.\\d+)?)\\s*([${VULGAR_FRACTION_CHARS}])$`));
	          if (mixedVulgar) return Number(mixedVulgar[1]) + VULGAR_FRACTION_VALUES.get(mixedVulgar[2]);
	          if (VULGAR_FRACTION_VALUES.has(text)) return VULGAR_FRACTION_VALUES.get(text);
	          const mixed = text.match(/^(\d+(?:\.\d+)?)\s+(\d+)[\/⁄](\d+)$/);
	          if (mixed) return Number(mixed[1]) + (Number(mixed[2]) / Number(mixed[3]));
	          const fraction = text.match(/^(\d+)[\/⁄](\d+)$/);
	          if (fraction) return Number(fraction[1]) / Number(fraction[2]);
	          return Number(text) || 0;
	        }

function servingCount(id) {
	          return Math.max(1, Math.min(99, Number(state.servings[id]) || 1));
	        }

function spoonOunces(amount, unit) {
	          return /^(?:tablespoons?|tbsp)$/i.test(unit) ? amount / 2 : amount / 6;
	        }

function imperialSpoonVolume(amount, unit, servings) {
	          return `${mixedFraction(spoonOunces(amount, unit) * servings, 12)} oz`;
	        }

function nearestImperialFraction(ounces) {
	          const quarter = Math.max(0.25, Math.round(ounces * 4) / 4);
	          const third = Math.max(1 / 3, Math.round(ounces * 3) / 3);
	          const useThird = Math.abs(ounces - third) < Math.abs(ounces - quarter);
	          return {value: useThird ? third : quarter, denominator: useThird ? 3 : 4};
	        }

function normalizeCocktailIngredientAmount(value) {
	          const text = String(value || '').trim();
	          if (!text) return '';
	          const numeric = text.match(new RegExp(`^(${AMOUNT_VALUE_PATTERN})(?:\\s+(.+))?$`, 'i'));
	          if (!numeric) return titleWords(text);
	          const parsed = parseRecipeAmount(numeric[1]);
	          if (!(parsed > 0)) return text;
	          const rounded = nearestImperialFraction(parsed);
	          const amount = mixedFraction(rounded.value, rounded.denominator);
	          const unit = String(numeric[2] || 'oz').trim();
	          return `${amount} ${/^fl\s*oz$|^ounces?$|^oz$/i.test(unit) ? 'oz' : unit}`;
	        }

function imperialExistingOunces(amount, servings) {
	          const scaled = amount * servings;
	          if (scaled > 0 && scaled < 0.25) return `${mixedFraction(scaled, 24)} oz`;
	          const rounded = nearestImperialFraction(amount * servings);
	          return `${mixedFraction(rounded.value, rounded.denominator)} oz`;
	        }

function roundedImperialFluid(ml) {
	          return nearestImperialFraction(ml / 29.5735);
	        }

function imperialVolume(ml) {
	          const rounded = roundedImperialFluid(ml);
	          return `${mixedFraction(rounded.value, rounded.denominator)} oz`;
	        }

function imperialWeight(grams) {
	          const ounces = grams / 28.3495;
	          const rounded = Math.max(0.25, Math.round(ounces * 4) / 4);
	          return `${mixedFraction(rounded, 4)} oz`;
	        }

function convertMetricMeasurements(text) {
	          const servings = arguments.length > 1 ? Math.max(1, Number(arguments[1]) || 1) : 1;
	          const amount = AMOUNT_PATTERN;
	          return String(text || '')
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*(?:fl\\s*)?oz\\b`, 'ig'), (_, qty) => imperialExistingOunces(parseRecipeAmount(qty), servings))
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*ml\\b`, 'ig'), (_, qty) => imperialVolume(parseRecipeAmount(qty) * servings))
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*cl\\b`, 'ig'), (_, qty) => imperialVolume(parseRecipeAmount(qty) * 10 * servings))
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*g(?:rams?)?\\b`, 'ig'), (_, qty) => imperialWeight(parseRecipeAmount(qty) * servings))
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*(teaspoons?|tsp|tablespoons?|tbsp|bar\\s*spoons?)\\b`, 'ig'), (_, qty, unit) => imperialSpoonVolume(parseRecipeAmount(qty), unit, servings));
	        }

function ingredientVolumeOunces(line, servings = 1) {
	          const amount = AMOUNT_PATTERN;
	          const count = Math.max(1, Number(servings) || 1);
	          let total = 0;
	          String(line || '')
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*(?:fl\\s*)?oz\\b`, 'ig'), (_, qty) => { total += parseRecipeAmount(qty) * count; return ''; })
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*ml\\b`, 'ig'), (_, qty) => { total += roundedImperialFluid(parseRecipeAmount(qty) * count).value; return ''; })
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*cl\\b`, 'ig'), (_, qty) => { total += roundedImperialFluid(parseRecipeAmount(qty) * 10 * count).value; return ''; })
	            .replace(new RegExp(`(?<![\\w.])${amount}\\s*(teaspoons?|tsp|tablespoons?|tbsp|bar\\s*spoons?)\\b`, 'ig'), (_, qty, unit) => { total += spoonOunces(parseRecipeAmount(qty), unit) * count; return ''; });
	          return total;
	        }

function totalIngredientVolume(cocktail, servings = 1) {
	          return cocktail.ingredients.reduce((sum, line) => sum + ingredientVolumeOunces(line, servings), 0);
	        }

function formatTotalVolume(ounces) {
	          if (ounces <= 0) return 'n/a';
	          const rounded = nearestImperialFraction(ounces);
	          return `${mixedFraction(rounded.value, rounded.denominator)} oz`;
	        }

function formatIngredientLine(line, cocktail, servings = 1) {
	          if (/^(?:1\s+)?absinthe\s+rinse$/i.test(String(line || '').trim())) return 'Rinse Absinthe';
	          if (/^(?:(?:a|1)\s+)?splash(?:\s+of)?\s+water$/i.test(String(line || '').trim())) return 'Splash Water';
	          if (/^top\s+up(?:\s+with)?\s+(?:top\s+up(?:\s+with)?\s+)?soda(?:\s+\(club\s+soda\))?\s+water$/i.test(String(line || '').trim())) return 'Top Up Soda Water';
	          const sugarCube = String(line || '').match(/\b(\d+(?:\.\d+)?|\d+\/\d+|a|an|one)\s+sugar cubes?\b/i);
	          if (sugarCube) {
	            const quantity = /^(?:a|an|one)$/i.test(sugarCube[1]) ? 1 : parseRecipeAmount(sugarCube[1]);
	            return `${mixedFraction(quantity * Math.max(1, Number(servings) || 1), 4)} tsp Sugar [Sugar Cube]`;
	          }
	          const converted = convertMetricMeasurements(line, servings);
	          const hit = ingredientLineCandidates(cocktail).find((item) => norm(converted).includes(norm(item.alias)));
	          if (!hit) return `${converted}${isSmallBenedictineLine(line) ? '*' : ''}`;
	          if (norm(converted).includes(norm(hit.label))) return `${converted}${isSmallBenedictineLine(line) ? '*' : ''}`;
	          const normalizedConverted = converted.normalize('NFC');
	          const normalizedAlias = hit.alias.normalize('NFC');
	          const replaced = normalizedConverted.replace(new RegExp(escapeRegExp(normalizedAlias), 'i'), hit.label);
	          const formatted = norm(normalizedAlias) === norm(hit.label)
	            ? normalizedConverted
	            : (replaced === normalizedConverted ? `${normalizedConverted} [${hit.label}]` : replaced);
	          return `${formatted}${isSmallBenedictineLine(line) ? '*' : ''}`;
	        }

function ingredientAmountMarkup(amount) {
	          const text = String(amount || '').trim();
	          const slashMatch = text.match(/^(?:(\d+)\s+)?(\d+)[\/⁄](\d+)$/);
	          const vulgarMatch = text.match(new RegExp(`^(?:(\\d+)\\s+)?([${VULGAR_FRACTION_CHARS}])$`));
	          if (!slashMatch && !vulgarMatch) return escapeHtml(text);
	          const whole = slashMatch ? (slashMatch[1] || '') : (vulgarMatch[1] || '');
	          const fraction = slashMatch
	            ? (VULGAR_FRACTIONS.get(`${slashMatch[2]}/${slashMatch[3]}`) || `${slashMatch[2]}⁄${slashMatch[3]}`)
	            : vulgarMatch[2];
	          return `<span class="ingredient-fraction-align"><span class="ingredient-fraction-whole">${escapeHtml(whole)}</span><span class="ingredient-fraction-glyph${!whole && parseRecipeAmount(text) < 1 / 8 ? ' ingredient-fraction-small' : ''}">${escapeHtml(fraction)}</span></span>`;
	        }

function ingredientLineMarkup(line, genericName = '', specificName = '', infoButton = '', substituteName = '') {
	          if (/^(?:(?:1\s+)?absinthe\s+rinse|(?:a\s+)?rinse(?:\s+of)?\s+absinthe)$/i.test(String(line || '').trim())) return `<span class="ingredient-measure ingredient-measure-compact ingredient-measure-label-only"><span class="ingredient-amount"></span><span class="ingredient-unit ingredient-unit-compact">Rinse</span></span><span class="ingredient-name-group"><button type="button" class="ingredient-name" data-detail-ingredient="Absinthe">Absinthe</button>${infoButton}</span>`;
	          const text = String(line || '').trim().replace(/\bLime Juice Juice\b/gi, 'Lime Juice');
	          const standardMatch = text.match(new RegExp(`^${AMOUNT_PATTERN}\\s+(oz|tsp|tbsp|teaspoons?|tablespoons?|dash(?:es)?|drops?|bar\\s*spoons?|pieces?|pinch(?:es)?|fresh|dried|swaths?|grinds?|cubes?|wedges?|slices?|sprigs?|leaves?|chunks?|scoops?)\\s+(.+)$`, 'i'));
	          const amountOnlyMatch = text.match(new RegExp(`^${AMOUNT_PATTERN}\\s+(.+)$`, 'i'));
	          const dashOnlyMatch = text.match(/^(?:a\s+)?dash(?:es)?(?:\s+of)?\s+(.+)$/i);
	          const fewDropsMatch = text.match(/^(?:a\s+)?few\s+drops(?:\s+of)?\s+(.+)$/i);
	          const dropsMatch = text.match(/^drops?(?:\s+of)?\s+(.+)$/i);
	          const labelOnlyMatch = text.match(/^(?:a\s+)?(pinch(?:es)?|splash)(?:\s+of)?\s+(.+)$/i);
	          const topUpMatch = text.match(/^top\s+up(?:\s+with)?\s+(.+)$/i);
	          const match = standardMatch || amountOnlyMatch || dashOnlyMatch || fewDropsMatch || dropsMatch || labelOnlyMatch || topUpMatch;
	          const amount = standardMatch ? standardMatch[1] : (amountOnlyMatch ? amountOnlyMatch[1] : (dashOnlyMatch ? '1' : ''));
	          const unit = standardMatch ? standardMatch[2] : (dashOnlyMatch ? 'dash' : (fewDropsMatch ? 'few drops' : (dropsMatch ? 'drops' : (labelOnlyMatch ? labelOnlyMatch[1] : (topUpMatch ? 'top up' : '')))));
	          const parsedNameWithMeasure = standardMatch ? standardMatch[3] : (amountOnlyMatch ? amountOnlyMatch[2] : (labelOnlyMatch ? labelOnlyMatch[2] : (topUpMatch ? topUpMatch[1] : (match ? match[1] : text))));
	          const originalMeasureMatch = parsedNameWithMeasure.match(/^\(([^)]+)\)\s+(.+)$/);
	          const parsedName = originalMeasureMatch ? originalMeasureMatch[2] : parsedNameWithMeasure;
	          const displayName = genericName || parsedName;
	          const isCompact = /^(?:dash(?:es)?|drops?|few drops|tsp|teaspoons?|pieces?|pinch(?:es)?|splash|top up|fresh|dried|swaths?|grinds?|cubes?|wedges?|slices?|sprigs?|leaves?|chunks?|scoops?)$/i.test(unit);
	          const displayUnit = isCompact ? (amount ? unit.toLowerCase() : titleWords(unit)) : unit;
	          const amountClass = amount && !/\s/.test(amount) && (/[\/⁄]/.test(amount) || VULGAR_FRACTION_VALUES.has(amount)) ? ' ingredient-amount-fraction' : '';
	          const specificMarkup = specificName
	            ? `<span class="ingredient-specific-wrap"><span class="ingredient-bracket">&nbsp;[</span><button type="button" class="ingredient-specific-name" data-detail-ingredient="${escapeHtml(specificName)}" title="Show cocktails using ${escapeHtml(specificName)}">${escapeHtml(specificName)}</button><span class="ingredient-bracket">]</span></span>`
	            : '';
	          const substituteMarkup = substituteName ? `<span class="ingredient-substitute" title="Use ${escapeHtml(substituteName)} as a substitute">&lt;${escapeHtml(substituteName)}&gt;</span>` : '';
	          const nameMarkup = `<span class="ingredient-name-group">${substituteMarkup}<button type="button" class="ingredient-name" data-detail-ingredient="${escapeHtml(displayName)}" title="Show cocktails using ${escapeHtml(displayName)}">${escapeHtml(displayName)}</button>${specificMarkup}${infoButton}</span>`;
	          const measureLayoutClass = isCompact ? (amount ? ' ingredient-measure-numbered' : ' ingredient-measure-label-only') : '';
	          return `<span class="ingredient-measure${isCompact ? ' ingredient-measure-compact' : ''}${measureLayoutClass}"><span class="ingredient-amount${amountClass}">${ingredientAmountMarkup(amount)}</span><span class="ingredient-unit${isCompact ? ' ingredient-unit-compact' : ''}">${escapeHtml(displayUnit)}</span></span>${nameMarkup}`;
	        }

function formatMethodLine(line) {
	          return convertMetricMeasurements(line)
	            .replace(/1\s*tsp\s+sugar\s*\[1\s*tsp\s+sugar\s*\[Sugar Cube\]\]/ig, '1 tsp sugar [Sugar Cube]')
	            .replace(/\bthe sugar cube\b(?!\])/ig, '1 tsp sugar [Sugar Cube]')
	            .replace(/\bsugar cube\b(?!\])/ig, '1 tsp sugar [Sugar Cube]');
	        }

function cleanGarnishLabel(value) {
          const text = String(value || '').trim();
	          if (!text) return 'NONE';
          return text
            .replace(/\boptionally\s+garnish(?:\s+with)?\s+/ig, '')
            .replace(/\bgarnish(?:\s+optionally)?\s+with\s+/ig, '')
            .replace(/\bgarnish\s+/ig, '')
            .replace(/\s+/g, ' ')
            .replace(/^[\s,.;:-]+|[\s,.;:-]+$/g, '');
        }

function displayGarnishLabel(value) {
          const clean = cleanGarnishLabel(value);
          return GARNISH_LABEL_OVERRIDES[norm(clean)] || titleWords(clean);
        }

function garnishTags(cocktail) {
	          const text = norm(cocktail.garnish);
	          if (!text) return ['NONE'];
          const tags = [];
          [
            ['Lemon', 'lemon'],
            ['Orange', 'orange'],
            ['Lime', 'lime'],
            ['Cherry', 'cherry'],
            ['Mint', 'mint'],
            ['Nutmeg', 'nutmeg'],
            ['Olive', 'olive'],
            ['Celery', 'celery'],
            ['Pineapple', 'pineapple'],
            ['Grapefruit', 'grapefruit'],
            ['Grapes', 'grape'],
            ['Raspberries', 'raspberr'],
            ['Blackberries', 'blackberr'],
            ['Cucumber', 'cucumber'],
            ['Rosemary', 'rosemary'],
            ['Coffee Beans', 'coffee bean'],
            ['Passion Fruit', 'passion fruit'],
            ['Red Chili Pepper', 'red chili pepper']
          ].forEach(([label, needle]) => {
            if (text.includes(needle)) tags.push(label);
          });
          if (textHas(text, 'amargo bitters') || textHas(text, 'amago bitters')) tags.push('Amargo Bitters');
          if (textHas(text, 'sugar') && (textHas(text, 'rim') || textHas(text, 'edge') || textHas(text, 'dip') || textHas(text, 'adhere'))) tags.push('Rim: Sugar');
          if (textHas(text, 'salt') && (textHas(text, 'rim') || textHas(text, 'edge') || textHas(text, 'dip'))) tags.push('Rim: Salt');
	          return unique(tags.length ? tags : [displayGarnishLabel(cocktail.garnish)]);
	        }

function rowGarnish(cocktail) {
	          return garnishTags(cocktail).join(', ');
	        }

function compactTypeInfo(cocktail) {
      const candidates = [cocktail.type, cocktail.originalType, displayType(cocktail)].map(norm);
      const types = [
        {match: ['legacy'], label: 'Legacy', className: 'legacy'},
        {match: ['contemporary classics', 'classic'], label: 'Classic', className: 'classic'},
        {match: ['new era drinks', 'new era'], label: 'New Era', className: 'new-era'},
        {match: ['the unforgettables', 'unforgettables', 'unforget'], label: 'Unforgettable', className: 'unforget'},
        {match: ['custom'], label: 'Custom', className: 'custom'},
        {match: ['in the wild', 'wild'], label: 'Wild', className: 'wild'}
      ];
      return types.find((type) => type.match.some((value) => candidates.includes(value)))
        || {label: displayType(cocktail), className: 'other'};
    }

function compactTypeTag(cocktail, includeStatus = false) {
      const type = compactTypeInfo(cocktail);
      const status = includeStatus ? statusLabel(cocktail) : '';
      const statusMarkup = status ? `<span class="table-type-status">${escapeHtml(status)}</span>` : '';
      const title = `${displayType(cocktail)}${status ? ` · ${status}` : ''}`;
	  const label = includeStatus
	    ? escapeHtml(displayType(cocktail))
	    : `<span class="table-type-label-short">${escapeHtml(type.label)}</span><span class="table-type-label-full">${escapeHtml(displayType(cocktail))}</span>`;
	  return `<span class="table-type-tag table-type-${type.className}" title="${escapeHtml(title)}">${label}${statusMarkup}</span>`;
    }

function cocktailServingStyle(cocktail) {
      const method = Array.isArray(cocktail?.method) ? cocktail.method.join(' ') : '';
      if (!method.trim()) return '';
      const text = norm(method);
      if (/\b(?:serve|served|serving) neat\b|\bwithout ice\b/.test(text)) return 'Neat';
      const servedOnIce = [
        /\bon the rocks\b/,
        /\b(?:build|built|pour|poured|strain|strained|serve|served)\b[^.]{0,70}\b(?:over|onto)\b[^.]{0,28}\bice\b/,
        /\b(?:glass|cup|mug)\b[^.]{0,45}\b(?:filled|full)\b[^.]{0,22}\bice\b/,
        /\bfill\b[^.]{0,38}\b(?:glass|cup|mug)\b[^.]{0,24}\bice\b/,
        /\badd\b[^.]{0,24}\b(?:fresh|crushed|pebble|cubed)?\s*ice\b[^.]{0,30}\b(?:glass|drink|serve)\b/
      ].some((pattern) => pattern.test(text));
      return servedOnIce ? 'Ice' : 'Neat';
    }

function servingStyleTag(cocktail) {
      const style = cocktailServingStyle(cocktail);
      return style ? `<span class="serving-style-tag is-${style.toLowerCase()}" title="Finished drink is served ${style === 'Ice' ? 'on ice' : 'without ice'}">${style}</span>` : '';
    }

function cocktailGuideValue(cocktailId, key) {
      const savedGuide = store.guides[cocktailId] || {};
      const hasSavedValue = Object.prototype.hasOwnProperty.call(savedGuide, key);
      const importedGuide = COCKTAILS.find((cocktail) => cocktail.id === cocktailId)?.diffordsSource?.guide || {};
      const raw = hasSavedValue ? savedGuide[key] : importedGuide[key];
      if (raw === undefined || raw === null || raw === '') return null;
      const value = Number(raw);
      return Number.isFinite(value) ? Math.max(0, Math.min(10, value)) : null;
    }

function cocktailGuideScale(value) {
      return Array.from({length: 11}, (_, number) => `<span class="${number === value ? 'active' : ''}">${number}</span>`).join('');
    }

function cocktailGuideMarkup(cocktail) {
      const strength = cocktailGuideValue(cocktail.id, 'strength');
      const taste = cocktailGuideValue(cocktail.id, 'taste');
      const control = (key, value, labels, ariaLabel) => `
        <label class="cocktail-guide-control">
          <span class="cocktail-guide-axis"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></span>
          <input class="cocktail-guide-range${value === null ? ' unrated' : ''}" type="range" min="0" max="10" step="1" value="${value ?? 5}" data-guide-id="${escapeHtml(cocktail.id)}" data-guide-key="${key}" aria-label="${escapeHtml(ariaLabel)}">
          <span class="cocktail-guide-scale" data-guide-scale="${escapeHtml(cocktail.id)}:${key}">${cocktailGuideScale(value)}</span>
        </label>`;
      const displayName = cocktailDisplayName(cocktail);
      return `<div class="cocktail-guide"><div class="cocktail-guide-grid">${control('strength', strength, ['No alcohol', 'Medium', 'Boozy'], `${displayName} strength`)}${control('taste', taste, ['Sweet', 'Medium', 'Dry/Sour'], `${displayName} taste`)}</div></div>`;
    }

function renderCocktailFormGuide(cocktail = null) {
      const values = cocktail ? {...(cocktail.diffordsSource?.guide || {}), ...(store.guides[cocktail.id] || {})} : {};
      const control = (key, value, labels) => {
        const rated = value !== undefined && value !== null && value !== '';
        const normalized = rated ? Math.max(0, Math.min(10, Number(value))) : null;
        return `<label class="cocktail-guide-control"><span class="cocktail-guide-axis"><span>${labels[0]}</span><span>${labels[1]}</span><span>${labels[2]}</span></span><input class="cocktail-guide-range${rated ? '' : ' unrated'}" type="range" min="0" max="10" step="1" value="${normalized ?? 5}" data-cocktail-form-guide="${key}" aria-label="Cocktail ${key}"><span class="cocktail-guide-scale" data-cocktail-form-guide-scale="${key}">${cocktailGuideScale(normalized)}</span></label>`;
      };
      $('#cocktailFormGuide').innerHTML = `<div class="cocktail-guide"><div class="cocktail-guide-grid">${control('strength', values.strength, ['No alcohol', 'Medium', 'Boozy'])}${control('taste', values.taste, ['Sweet', 'Medium', 'Dry/Sour'])}</div></div><button class="button cocktail-form-guide-clear" type="button" data-clear-cocktail-form-guide>Clear ratings</button>`;
    }

function cocktailFormGuideEntries() {
      const guide = {};
      $$('[data-cocktail-form-guide]').forEach((field) => {
        if (!field.classList.contains('unrated')) guide[field.dataset.cocktailFormGuide] = Math.max(0, Math.min(10, Math.round(Number(field.value))));
      });
      return guide;
    }

function parseCocktailRawInfo(value) {
      const raw = String(value || '').trim();
      if (!raw) return null;
      const clean = raw.replace(/\*\*/g, '');
      const numberFrom = (pattern) => {
        const match = clean.match(pattern);
        return match ? Number(match[1]) : null;
      };
      return {
        raw,
        calories: numberFrom(/(\d+(?:\.\d+)?)\s*calories?\b/i),
        standardDrinks: numberFrom(/(\d+(?:\.\d+)?)\s*standard drinks?\b/i),
        abv: numberFrom(/(\d+(?:\.\d+)?)%\s*(?:alc\.?\s*\/\s*vol\.?|abv)\b/i),
        proof: numberFrom(/(\d+(?:\.\d+)?)\s*°?\s*proof\b/i),
        pureAlcoholGrams: numberFrom(/(\d+(?:\.\d+)?)\s*grams?\s+of\s+pure alcohol\b/i)
      };
    }

function cocktailFactsItemsMarkup(facts) {
      if (!facts) return '';
      const items = [
        [facts.calories, 'calories'],
        [facts.standardDrinks, 'standard drinks'],
        [facts.abv, '% ABV'],
        [facts.proof, 'proof'],
        [facts.pureAlcoholGrams, 'g pure alcohol']
      ];
      return items.filter(([value]) => value !== null && value !== undefined && value !== '').map(([value, label]) => `<span class="cocktail-fact"><strong>${escapeHtml(value)}</strong> ${escapeHtml(label)}</span>`).join('');
    }

function cocktailStatsMarkup(facts) {
      if (!facts) return '';
      const stat = (value, suffix) => value === null || value === undefined || value === '' ? '' : `<span class="cocktail-fact-stat"><strong>${escapeHtml(value)}</strong>${escapeHtml(suffix)}</span>`;
      const stack = (...items) => {
        const content = items.filter(Boolean).join('');
        return content ? `<span class="cocktail-fact-stack">${content}</span>` : '';
      };
      const calories = stack(stat(facts.calories, ' Calories'));
      const drinks = stack(stat(facts.standardDrinks, ' Drinks'), stat(facts.pureAlcoholGrams, ' g Alcohol'));
      const alcohol = stack(stat(facts.abv, '% ABV'), stat(facts.proof, ' Proof'));
      const content = `${calories}${drinks}${alcohol}`;
      return content ? `<div class="cocktail-facts-stacked" aria-label="Nutrition and alcohol information">${content}</div>` : '';
    }

function cocktailGuideWithFactsMarkup(cocktail) {
      const facts = cocktailStatsMarkup(cocktail?.nutrition);
      return facts ? `<div class="cocktail-guide-with-facts">${facts}${cocktailGuideMarkup(cocktail)}</div>` : cocktailGuideMarkup(cocktail);
    }

function cocktailDataFlagsMarkup(cocktail) {
      const nutrition = cocktail?.nutrition || {};
      const flags = [];
      if (nutrition.calories !== null && nutrition.calories !== undefined && nutrition.calories !== '') flags.push(['C', 'Calories', 'calories']);
      if ([nutrition.standardDrinks, nutrition.abv, nutrition.proof, nutrition.pureAlcoholGrams].some((value) => value !== null && value !== undefined && value !== '')) flags.push(['A', 'Alcohol', 'alcohol']);
      if (cocktailGuideValue(cocktail.id, 'strength') !== null) flags.push(['S', 'Strength', 'strength']);
      if (cocktailGuideValue(cocktail.id, 'taste') !== null) flags.push(['T', 'Taste', 'taste']);
      if (!flags.length) return '';
      const labels = flags.map(([, label]) => label);
      return `<span class="cocktail-data-flags" aria-label="Includes ${escapeHtml(labels.join(', '))}" title="Includes: ${escapeHtml(labels.join(', '))}">${flags.map(([letter, label, className]) => `<span class="cocktail-data-flag ${className}" title="${escapeHtml(label)}" aria-hidden="true">${letter}</span>`).join('')}</span>`;
    }

function cocktailRawInfoValue(cocktail) {
      const facts = cocktail?.nutrition;
      if (!facts) return '';
      if (facts.raw) return facts.raw;
      return [
        facts.calories != null ? `${facts.calories} calories` : '',
        facts.standardDrinks != null ? `${facts.standardDrinks} standard drinks` : '',
        facts.abv != null ? `${facts.abv}% alc./vol.` : '',
        facts.proof != null ? `${facts.proof}° proof` : '',
        facts.pureAlcoholGrams != null ? `${facts.pureAlcoholGrams} grams of pure alcohol` : ''
      ].filter(Boolean).join('\n');
    }

function renderCocktailRawPreview() {
      const field = $('#cocktailFormRawInfo');
      const filled = String(field.dataset.smartAddFields || '').split('|').filter(Boolean);
      const summary = filled.map((label) => `<span class="cocktail-fact"><strong>✓</strong> ${escapeHtml(label)}</span>`).join('');
      $('#cocktailFormRawPreview').innerHTML = summary + cocktailFactsItemsMarkup(parseCocktailRawInfo(field.value));
    }

function stripMarkdownLinks(value) {
      return String(value || '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    }

function cleanRawPasteText(value) {
      return stripMarkdownLinks(value).replace(/\*\*/g, '').replace(/\*/g, '').trim();
    }

function normalizeMethodStep(value) {
      return cleanRawPasteText(value).replace(/^(?:[-•▪‣]\s*|\d+[.)]\s*)/, '').replace(/^((?:[A-Z]{2,}\.?\s*)+)/, (match) => {
        const lower = match.trim().toLowerCase();
        return `${lower.charAt(0).toUpperCase()}${lower.slice(1)} `;
      });
    }

function cocktailRawSectionKey(value) {
      const label = cleanRawPasteText(String(value || '').replace(/^#{1,6}\s*/, ''))
        .replace(/:$/, '').replace(/&/g, 'and').replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
      return COCKTAIL_RAW_SECTION_ALIASES.get(label) || '';
    }

function parseCocktailRawSections(raw) {
      const sections = {};
      const preamble = [];
      let currentKey = '';
      String(raw || '').split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        const withoutHeading = trimmed.replace(/^#{1,6}\s*/, '');
        const bold = withoutHeading.match(/^\*\*([^*]+?)\*\*\s*:?[ \t]*(.*)$/);
        const cleaned = cleanRawPasteText(withoutHeading);
        const plain = cleaned.match(/^([^:]{2,48}):\s*(.*)$/);
        const label = bold ? bold[1] : plain ? plain[1] : cleaned;
        const key = cocktailRawSectionKey(label);
        if (key) {
          currentKey = key;
          if (!sections[currentKey]) sections[currentKey] = [];
          const remainder = bold ? bold[2] : plain ? plain[2] : '';
          if (remainder) sections[currentKey].push(remainder);
          return;
        }
        if (currentKey) sections[currentKey].push(line);
        else if (trimmed) preamble.push(line);
      });
      Object.keys(sections).forEach((key) => { sections[key] = sections[key].join('\n').trim(); });
      sections._preamble = preamble.join('\n').trim();
      return sections;
    }

function extractCocktailRawGlass(sections) {
      const prepareMatch = (sections.prepare || '').match(/\[([^\]]+)\]/);
      if (prepareMatch) return prepareMatch[1].trim();
      const glassText = sections.glass || '';
      const glassMatch = glassText.match(/\[([^\]]+)\]/);
      if (glassMatch) return glassMatch[1].replace(/\s*\d+(?:\.\d+)?\s*(?:oz|ml).*$/i, '').trim();
      return cleanRawPasteText(glassText.split(/\r?\n/)[0] || '').replace(/^(?:[-•▪‣]\s*)/, '').replace(/\s*[-–—,]?\s*\d+(?:\.\d+)?\s*(?:oz|ml).*$/i, '').trim();
    }

function applyCocktailFormGlass(rawGlassName) {
      if (!rawGlassName) return;
      const target = norm(rawGlassName);
      const existing = $$('#cocktailFormGlass option').find((option) => norm(option.value) === target || norm(option.textContent) === target);
      const value = existing ? existing.value : `${rawGlassName.charAt(0).toUpperCase()}${rawGlassName.slice(1).toLowerCase()}`;
      populateCocktailFormGlassware(value);
    }

function setCocktailFormGuideValue(key, value) {
      if (value === null || value === undefined || !Number.isFinite(value)) return;
      const field = $(`[data-cocktail-form-guide="${key}"]`);
      if (!field) return;
      field.value = Math.max(0, Math.min(10, Math.round(value)));
      field.dispatchEvent(new Event('input', {bubbles: true}));
    }

function applyCocktailRawPaste(raw) {
      const text = String(raw || '');
      if (!text.trim()) return;
      const sections = parseCocktailRawSections(text);
      const filled = [];
      const unitWords = 'fl\\s*oz|oz|ounces?|ml|cl|dash(?:es)?|drops?|tsp|tbsp|bar\\s*spoons?|cups?|parts?|pinch(?:es)?';
      const ingredientLineRe = new RegExp(`^((?:${AMOUNT_VALUE_PATTERN})\\s*(?:${unitWords})|(?:a\\s+)?(?:splash|dash|pinch)(?:\\s+of)?|few\\s+drops(?:\\s+of)?|top\\s+with)\\s+(.+)$`, 'i');
      const ingredientAmountOnlyRe = new RegExp(`^(${AMOUNT_VALUE_PATTERN})\\s+(.+)$`, 'i');
      const parsedIngredients = (sections['ingredients'] || '').split(/\r?\n/)
        .map((line) => cleanRawPasteText(line).replace(/^(?:[-•▪‣]\s*|\d+[.)]\s*)/, '').trim())
        .filter(Boolean)
        .map((line) => {
          const match = line.match(ingredientLineRe) || line.match(ingredientAmountOnlyRe);
          if (!match) return null;
          const rawName = stripMarkdownLinks(match[2]).replace(/^of\s+/i, '').replace(/\s*[[(]?optional[\])]?[ \t]*$/i, '').replace(/\s+/g, ' ').trim();
          const parts = splitSpecificIngredientLabel(rawName);
          const name = canonicalCocktailIngredientName(parts.generic);
          const specific = parts.specific || suggestedCocktailBottle(parts.generic);
          return name ? {amount: normalizeCocktailIngredientAmount(match[1]), name, specific} : null;
        })
        .filter(Boolean);
      if (parsedIngredients.length) {
        $('#cocktailFormIngredientRows').innerHTML = '';
        parsedIngredients.forEach((entry) => addCocktailIngredientRow(entry, false, false));
        updateCocktailIngredientSuggestions();
        syncCocktailBasesFromIngredients();
        filled.push(`${parsedIngredients.length} ingredients`);
      }
      const explicitName = cleanRawPasteText(sections.name || '').split(/\r?\n/)[0].trim();
      const preambleName = cleanRawPasteText(sections._preamble || '').split(/\r?\n/).find((line) => line.trim() && !/^https?:\/\//i.test(line.trim()))?.trim() || '';
      const parsedName = explicitName || (!$('#cocktailFormName').value.trim() && preambleName.length <= 80 ? preambleName : '');
      if (parsedName) {
        $('#cocktailFormName').value = parsedName;
        filled.push('name');
      }
      const parsedGlass = extractCocktailRawGlass(sections);
      if (parsedGlass) {
        applyCocktailFormGlass(parsedGlass);
        filled.push('glassware');
      }
      const methodLines = (sections['how to make'] || '').split(/\r?\n/).map(normalizeMethodStep).filter(Boolean);
      if (methodLines.length) {
        $('#cocktailFormMethod').value = methodLines.join('\n');
        filled.push('method');
      }
      const garnish = cleanRawPasteText(sections['garnish'] || '');
      if (garnish) {
        $('#cocktailFormGarnish').value = garnish.replace(/^(?:[-•▪‣]\s*)/, '');
        filled.push('garnish');
      }
      const aka = cleanRawPasteText(sections['aka'] || '');
      if (aka) {
        $('#cocktailFormAlternateNames').value = aka;
        filled.push('other names');
      }
      const strengthMatch = text.match(/Strength\s+(\d+(?:\.\d+)?)\s*\/\s*10/i);
      if (strengthMatch) {
        setCocktailFormGuideValue('strength', Number(strengthMatch[1]));
        filled.push('strength');
      }
      const tasteMatch = text.match(/(?:Sweet\s+to\s+(?:dry\/?sour|sour)|Taste)\s+(\d+(?:\.\d+)?)\s*\/\s*10/i);
      if (tasteMatch) {
        setCocktailFormGuideValue('taste', Number(tasteMatch[1]));
        filled.push('taste');
      }
      const review = cleanRawPasteText((sections['review'] || '').split(/\[View readers/i)[0]);
      if (review) {
        $('#cocktailFormNotes').value = review;
        filled.push('notes');
      }
      const sourceUrlMatch = text.match(/https?:\/\/[^\s)\]]+/i);
      const historyMatch = (sections['history'] || '').match(/\[([^\]]*)\]\(([^)]+)\)/);
      const rawLinks = [];
      if (sourceUrlMatch) rawLinks.push({url: sourceUrlMatch[0]});
      if (historyMatch) rawLinks.push({label: 'History', url: historyMatch[2]});
      if (rawLinks.length) {
        $('#cocktailFormLinkRows').innerHTML = '';
        rawLinks.forEach((link) => addCocktailLinkRow(link, false));
        filled.push(rawLinks.length === 1 ? 'link' : 'links');
      }
      const nutrition = parseCocktailRawInfo(text);
      if (nutrition && [nutrition.calories, nutrition.standardDrinks, nutrition.abv, nutrition.proof, nutrition.pureAlcoholGrams].some((value) => value !== null && value !== undefined)) filled.push('nutrition/alcohol');
      $('#cocktailFormRawInfo').dataset.smartAddFields = unique(filled).join('|');
      renderCocktailRawPreview();
    }

function cocktailLinks(cocktail) {
      const links = [];
      const seen = new Set();
      const add = (entry, fallbackLabel = '') => {
        const url = typeof entry === 'string' ? entry.trim() : String(entry?.url || '').trim();
        if (!url || seen.has(url)) return;
        const explicitLabel = typeof entry === 'object' ? String(entry?.label || '').trim() : '';
        seen.add(url);
        links.push({label: explicitLabel || fallbackLabel || `Link ${links.length + 1}`, url});
      };
      if (Array.isArray(cocktail?.links)) {
        cocktail.links.forEach((entry, index) => add(entry, index === 0 ? (cocktail.status || 'Source') : `Link ${index + 1}`));
      }
      add(cocktail?.url, cocktail?.status || 'Source');
      add(cocktail?.diffordsSource?.url, "Difford's Guide");
      add(cocktail?.liquorSource?.url, 'Liquor.com');
      return links;
    }
