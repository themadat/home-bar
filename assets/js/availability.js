// Classic-script function declarations; shared state is initialized in app.js.
function spiritTags(cocktail) {
      const badges = [];
      if (isAllSpirit(cocktail)) badges.push('All Spirit');
      if (isSpiritForward(cocktail)) badges.push('Spirit Forward');
      if (!badges.length) return '';
      return `<div class="spirit-tags">${badges.map((label) => `<span class="spirit-tag">${escapeHtml(label)}</span>`).join('')}</div>`;
    }

function sourceRecipeClassification(source, cocktail) {
      const names = cloneRecipeLines(source.ingredientNames);
      const classifications = names.map(inferBottleClassification);
      const baseLiquor = Array.isArray(source.baseLiquor) && source.baseLiquor.length
        ? cloneRecipeLines(source.baseLiquor)
        : unique(classifications.filter(Boolean).map((item) => item.base).filter((base) => base !== 'Flavorings'));
      const inferredLiqueurs = names.flatMap((name, index) => {
        const classification = classifications[index];
        return classification?.base === 'Liqueurs'
          ? [{name, subtype: classification.subtype || 'Other, Specialty', flavor: '', genericOnly: false}]
          : [];
      });
      return {
        baseLiquor: baseLiquor.length ? baseLiquor : cocktail.baseLiquor,
        liqueurs: Array.isArray(source.liqueurs) ? source.liqueurs.filter((liqueur) => !/falernum|pur[eé]e/i.test(liqueur.name)).map((liqueur) => ({...liqueur})) : inferredLiqueurs
      };
    }

function pantryRecipeVariant(cocktail, source) {
      const classification = sourceRecipeClassification(source, cocktail);
      return {
        ...cocktail,
        ingredients: cloneRecipeLines(source.ingredients),
        ingredientNames: cloneRecipeLines(source.ingredientNames),
        ingredientBottles: cloneRecipeLines(source.ingredientBottles),
        baseLiquor: classification.baseLiquor,
        liqueurs: classification.liqueurs
      };
    }

function pantryRecipeVariants(cocktail) {
      return [
        cocktail,
        ...(cocktail.lnlSource?.available === false ? [] : (cocktail.lnlSource ? [pantryRecipeVariant(cocktail, cocktail.lnlSource)] : [])),
        ...(cocktail.diffordsSource?.available === false ? [] : (cocktail.diffordsSource ? [pantryRecipeVariant(cocktail, cocktail.diffordsSource)] : [])),
        ...(cocktail.liquorSource?.available === false ? [] : (cocktail.liquorSource ? [pantryRecipeVariant(cocktail, cocktail.liquorSource)] : [])),
        ...(cocktail.classicSource?.available === false ? [] : (cocktail.classicSource ? [pantryRecipeVariant(cocktail, cocktail.classicSource)] : []))
      ];
    }

function pantrySpecificVariantsByIngredient() {
      const variants = new Map();
      COCKTAILS.forEach((cocktail) => {
        pantryRecipeVariants(cocktail).forEach((recipe) => {
          nonAlcoholicIngredientParts(recipe).forEach(({generic, specific}) => {
            if (!specific) return;
            if (!variants.has(generic)) variants.set(generic, new Set());
            variants.get(generic).add(specific);
          });
        });
      });
      return new Map(Array.from(variants, ([name, values]) => [name, Array.from(values).sort((a, b) => a.localeCompare(b))]));
    }

function pantryIngredientInfo(name, specificVariants) {
      const specifics = specificVariants.get(name) || [];
      const sections = [];
      if (specifics.length) sections.push(`Recipe-specific forms: ${specifics.join(', ')}.`);
      if (INGREDIENT_INFO[name]) sections.push(INGREDIENT_INFO[name]);
      specifics.forEach((specific) => {
        const specificInfo = INGREDIENT_INFO[`${name} [${specific}]`] || INGREDIENT_INFO[specific];
        if (specificInfo && !sections.includes(specificInfo)) sections.push(`${specific}: ${specificInfo}`);
      });
      return sections.join('\n\n');
    }

function namedBottleAliases(name) {
      const normalized = norm(name);
      if (normalized === 'chartreuse' || normalized === 'chartruse') return ['chartreuse', 'chartruse'];
      if (['green chartreuse', 'green chartruse', 'chartreuse green', 'chartruse green'].includes(normalized)) {
        return ['green chartreuse', 'green chartruse', 'chartreuse green', 'chartruse green'];
      }
      if (['yellow chartreuse', 'yellow chartruse', 'chartreuse yellow', 'chartruse yellow'].includes(normalized)) {
        return ['yellow chartreuse', 'yellow chartruse', 'chartreuse yellow', 'chartruse yellow'];
      }
      if (normalized === 'angostura bitters') return ['angostura bitters', 'angostura'];
      if (normalized === 'peychaud s bitters' || normalized === 'peychaud bitters') {
        return ['peychaud s bitters', 'peychaud bitters', 'peychaud'];
      }
      if (normalized === 'aromatic bitters') {
        return ['aromatic bitters', 'angostura bitters', 'angostura', 'peychaud s bitters', 'peychaud bitters'];
      }
      const group = NAMED_BOTTLE_EQUIVALENTS.find((items) => items.some((item) => norm(item) === normalized));
      return unique([name, ...(group || [])]).map(norm).filter(Boolean);
    }

function chartreuseBottleColor(name) {
      const normalized = norm(name);
      if (normalized.includes('genepy') && normalized.includes('chamois')) return 'green';
      if (normalized.includes('genepi') && normalized.includes('chamois')) return 'green';
      if (!normalized.includes('chartreuse') && !normalized.includes('chartruse')) return '';
      if (normalized.includes('yellow')) return 'yellow';
      if (normalized.includes('green')) return 'green';
      return 'generic';
    }

function bottleMatchesNamedBottle(bottle, base, requiredName) {
      if (!isMixingBottle(bottle) || bottle.base !== base) return false;
      const bottleName = norm(bottle.name);
      if (!bottleName) return false;
      const requiredChartreuseColor = chartreuseBottleColor(requiredName);
      if (requiredChartreuseColor) {
        const bottleChartreuseColor = chartreuseBottleColor(bottle.name);
        if (!bottleChartreuseColor) return false;
        if (requiredChartreuseColor === 'yellow') return bottleChartreuseColor === 'yellow';
        if (requiredChartreuseColor === 'green') return bottleChartreuseColor === 'green' || bottleChartreuseColor === 'generic';
        return true;
      }
      return namedBottleAliases(requiredName).some((alias) =>
        bottleName === alias || bottleName.includes(alias) || (bottleName.length >= 6 && alias.includes(bottleName))
      );
    }

function bottleMatchesLiqueurRequirement(bottle, liqueur) {
      if (!isMixingBottle(bottle) || bottle.base !== 'Liqueurs') return false;
      if (!liqueur.genericOnly) return bottleMatchesNamedBottle(bottle, 'Liqueurs', liqueur.name);
      return canonicalLiqueurSubtype(bottle.name, bottle.subtype) === canonicalLiqueurSubtype(liqueur.name, liqueur.subtype);
    }

function barHasBottleSubtype(base, subtype) {
      if (store.bar.some((bottle) => isMixingBottle(bottle) && bottle.base === base && bottle.subtype === subtype)) return true;
      return base === 'Vermouth'
        && subtype === BITTERSWEET_VERMOUTH
        && store.bar.some((bottle) => isMixingBottle(bottle) && bottle.base === 'Vermouth' && bottle.subtype === SWEET_VERMOUTH)
        && barHasAngosturaBitters();
    }

function cocktailUsesBottle(cocktail, bottle) {
      if (!isMixingBottle(bottle)) return false;
      if (bottle.base === 'Liqueurs') {
	        return cocktail.liqueurs.some((liqueur) => bottleMatchesLiqueurRequirement(bottle, liqueur))
	          || (isBandBBottle(bottle) && cocktail.liqueurs.some((liqueur) => norm(liqueur.name) === 'benedictine') && recipeAllowsBandBSubstitute(cocktail));
      }
      if (bottle.base === 'Flavorings') {
        const supportsBittersweetVermouth = bottleMatchesNamedBottle(bottle, 'Flavorings', 'Angostura Bitters')
          && barHasBottleSubtype('Vermouth', SWEET_VERMOUTH)
          && baseSubtypeTags(cocktail).some((tag) => tag.base === 'Vermouth' && tag.subtype === BITTERSWEET_VERMOUTH);
          return supportsBittersweetVermouth
          || bittersRequirements(cocktail).some((name) => bottleMatchesBittersRequirement(bottle, name))
          || nonAlcoholicIngredientTags(cocktail).some((name) => bottleMatchesFlavoring(bottle, name));
      }
      if (!cocktail.baseLiquor.includes(bottle.base)) return false;
      const requiredSubtypes = baseSubtypeTags(cocktail).filter((tag) => tag.base === bottle.base);
      if (bottle.base === 'Vermouth'
        && bottle.subtype === SWEET_VERMOUTH
        && barHasAngosturaBitters()
        && requiredSubtypes.some((tag) => tag.subtype === BITTERSWEET_VERMOUTH)) return true;
      return !requiredSubtypes.length || requiredSubtypes.some((tag) => tag.subtype === bottle.subtype);
    }

function activeBottleUsage() {
      if (!state.bottleUsageId) return null;
      if (state.bottleUsageOverride && state.bottleUsageOverride.id === state.bottleUsageId) return state.bottleUsageOverride;
      return cocktailLookupBottle(store.bar.find((bottle) => bottle.id === state.bottleUsageId));
    }

function isBandBBottle(bottle) {
      if (!isMixingBottle(bottle) || bottle.base !== 'Liqueurs') return false;
      const bottleName = norm(bottle.name);
      return bottleName === 'b b' || bottleName.startsWith('b b ') || bottleName.includes('b and b');
    }

function isSmallBenedictineLine(line) {
      const ounces = ingredientVolumeOunces(line, 1);
      return norm(line).includes('benedictine') && ounces > 0 && ounces <= 0.25;
    }

function recipeAllowsBandBSubstitute(cocktail) {
      return cocktail.ingredients.some(isSmallBenedictineLine);
    }

function bittersRequirements(cocktail) {
      return unique(cocktail.ingredients.flatMap((line) => {
        const text = norm(line);
        if (!text.includes('bitter')) return [];
        if (text.includes('bittersweet') && text.includes('vermouth')) return [];
        if (text.includes('angostura')) return ['Angostura Bitters'];
        if (text.includes('peychaud')) return ["Peychaud's Bitters"];
        if (text.includes('orange bitter')) return ['Orange Bitters'];
        if (text.includes('peach bitter')) return ['Peach Bitters'];
        if (text.includes('amargo bitter') || text.includes('amago bitter')) return ['Amargo Bitters'];
        return ['Aromatic Bitters'];
      }));
    }

function bittersSubtype(name) {
      const normalized = norm(name);
      if (normalized.includes('orange')) return 'Bitter, Orange';
      if (normalized.includes('angostura') || normalized.includes('peychaud') || normalized.includes('aromatic')) return 'Bitter, Aromatic';
      return 'Bitter, Other';
    }

function bottleMatchesBittersRequirement(bottle, requirementName) {
      if (!isMixingBottle(bottle) || bottle.base !== 'Flavorings') return false;
      const normalizedRequirement = norm(requirementName);
      const genericRequirement = normalizedRequirement === 'aromatic bitters' || normalizedRequirement === 'orange bitters';
      if (!genericRequirement) return bottleMatchesNamedBottle(bottle, 'Flavorings', requirementName);
      const requiredSubtype = bittersSubtype(requirementName);
      return bottle.subtype === requiredSubtype || flavoringSubtypeForName(bottle.name) === requiredSubtype;
    }

function cocktailDependencyForIngredient(cocktail, index) {
      const ingredientName = cocktail.ingredientNames[index] || parseIngredientLine(cocktail.ingredients[index] || '').name;
      const ingredientKey = norm(ingredientName);
      if (!ingredientKey) return null;
      return COCKTAILS.find((candidate) => candidate.id !== cocktail.id
        && unique([candidate.name, ...cocktailAlternateNames(candidate)]).some((name) => norm(name) === ingredientKey)) || null;
    }

function cocktailDependencies(cocktail) {
      return unique(cocktail.ingredientNames.map((_, index) => cocktailDependencyForIngredient(cocktail, index)).filter(Boolean));
    }

function missingRequirementsFor(cocktail, seen = new Set()) {
      if (seen.has(cocktail.id)) return [];
      const nextSeen = new Set(seen).add(cocktail.id);
      const dependencies = cocktailDependencies(cocktail);
      if (dependencies.length && dependencies.length === cocktail.ingredientNames.length) {
        return [...new Map(dependencies.flatMap((dependency) => missingRequirementsFor(dependency, nextSeen)).map((item) => [item.key, item])).values()];
      }
      if (!cocktail.baseLiquor.length) return [{type: 'spirit', base: '', subtype: '', key: 'spirit::none'}];
      const missing = dependencies.flatMap((dependency) => missingRequirementsFor(dependency, nextSeen));
      const dependencyNames = new Set(dependencies.flatMap((dependency) => [dependency.name, ...cocktailAlternateNames(dependency)]).map(norm));
      const tags = baseSubtypeTags(cocktail);
      const requiredBitters = bittersRequirements(cocktail);
      cocktail.baseLiquor.forEach((base) => {
        if (base === 'Liqueurs' && (cocktail.liqueurs.length || requiredBitters.length)) return;
        const requiredSubtypes = unique(tags.filter((tag) => tag.base === base).map((tag) => tag.subtype));
        if (!requiredSubtypes.length) {
          if (!store.bar.some((bottle) => isMixingBottle(bottle) && bottle.base === base)) {
            missing.push({type: 'spirit', base, subtype: '', key: `spirit:${base}:`});
          }
        } else {
          requiredSubtypes.forEach((subtype) => {
            if (!barHasBottleSubtype(base, subtype)) {
              missing.push({type: 'spirit', base, subtype, key: `spirit:${base}:${subtype}`});
            }
          });
        }
      });
      cocktail.liqueurs.forEach((liqueur) => {
	        const hasNamedBottle = store.bar.some((bottle) => bottleMatchesLiqueurRequirement(bottle, liqueur));
        if (!hasNamedBottle) {
          missing.push({
            type: 'spirit', base: 'Liqueurs', subtype: canonicalLiqueurSubtype(liqueur.name, liqueur.subtype), name: liqueur.name,
            allowBandB: norm(liqueur.name).includes('benedictine') && recipeAllowsBandBSubstitute(cocktail),
            key: `bottle:Liqueurs:${norm(liqueur.name)}`
          });
        }
      });
      requiredBitters.forEach((name) => {
        if (!store.bar.some((bottle) => bottleMatchesBittersRequirement(bottle, name))) {
          missing.push({type: 'spirit', base: 'Flavorings', subtype: bittersSubtype(name), name, key: `bottle:Flavorings:${norm(name)}`});
        }
      });
      nonAlcoholicIngredientTags(cocktail).forEach((name) => {
        if (dependencyNames.has(norm(name))) return;
        const flavoringSubtype = flavoringSubtypeForName(name);
        const available = flavoringSubtype
          ? store.bar.some((bottle) => bottleMatchesFlavoring(bottle, name))
          : store.bar.some((bottle) => bottle.kind === 'ingredient' && bottle.name === name);
        if (!available) {
          missing.push({type: 'ingredient', name, key: `ingredient:${name}`});
        }
      });
      return [...new Map(missing.map((item) => [item.key, item])).values()];
    }

function barSubstituteForRequirement(requirement) {
      if (requirement.type !== 'spirit' || requirement.base !== 'Liqueurs' || !requirement.name) return '';
      const requiredName = norm(requirement.name);
      if (requiredName.includes('benedictine') && requirement.allowBandB && store.bar.some(isBandBBottle)) return 'B&B';
      const substituteName = requiredName === 'aperol'
        ? 'Campari'
        : (chartreuseBottleColor(requirement.name) === 'yellow' ? 'Green Chartreuse' : '');
      if (!substituteName) return '';
      const substituteRequirement = {name: substituteName, subtype: requirement.subtype, genericOnly: false};
      return store.bar.some((bottle) => bottleMatchesLiqueurRequirement(bottle, substituteRequirement)) ? substituteName : '';
    }

function singleRecipeBarAvailability(cocktail) {
      const missing = missingRequirementsFor(cocktail);
      if (!missing.length) return {state: 'exact', missing, substitutions: []};
      const substitutions = missing.map((requirement) => ({requirement, substitute: barSubstituteForRequirement(requirement)}));
      return {
        state: substitutions.every((entry) => entry.substitute) ? 'substitute' : 'missing',
        missing,
        substitutions
      };
    }

function barAvailability(cocktail) {
      const variants = pantryRecipeVariants(cocktail).map(singleRecipeBarAvailability);
      return variants.find((availability) => availability.state === 'exact')
        || variants.find((availability) => availability.state === 'substitute')
        || variants[0]
        || {state: 'missing', missing: [], substitutions: []};
    }

function canMakeFromBar(cocktail) {
      return barAvailability(cocktail).state !== 'missing';
    }

function ingredientSubstituteFromBar(cocktail, index, missing = missingRequirementsFor(cocktail)) {
      const sourceLine = String(cocktail.ingredients[index] || '');
      const rawName = cocktail.ingredientNames[index] || parseIngredientLine(sourceLine).name;
      const parts = ingredientDisplayParts(cocktail, index);
      const normalizedNames = unique([rawName, parts.generic, parts.specific, sourceLine]).map(norm).filter(Boolean);
      const lineChartreuseColor = normalizedNames.map(chartreuseBottleColor).find((color) => color && color !== 'generic');
      const liqueur = cocktail.liqueurs.find((item) => ingredientNamesOverlap(rawName, item.name) && normalizedNames.some((candidate) => candidate === norm(item.name)
        || candidate.includes(norm(item.name))
        || norm(item.name).includes(candidate))
        || (lineChartreuseColor && chartreuseBottleColor(item.name) === lineChartreuseColor));
      if (!liqueur) return '';
      const requirement = missing.find((item) => item.base === 'Liqueurs' && norm(item.name) === norm(liqueur.name));
      return requirement ? barSubstituteForRequirement(requirement) : '';
    }

function ingredientMissingFromBar(cocktail, index, missing = missingRequirementsFor(cocktail)) {
      const sourceLine = String(cocktail.ingredients[index] || '');
      const rawName = cocktail.ingredientNames[index] || parseIngredientLine(sourceLine).name;
      const parts = ingredientDisplayParts(cocktail, index);
      const normalizedNames = unique([rawName, parts.generic, parts.specific]).map(norm).filter(Boolean);
      const matchesName = (name) => normalizedNames.includes(norm(name));
      const dependency = cocktailDependencyForIngredient(cocktail, index);
      if (dependency) return missingRequirementsFor(dependency).length > 0;
      const liqueur = cocktail.liqueurs.find((item) => ingredientNamesOverlap(rawName, item.name) && normalizedNames.some((candidate) => candidate === norm(item.name)
        || candidate.includes(norm(item.name))
        || norm(item.name).includes(candidate)));
      if (liqueur) {
        return missing.some((item) => item.base === 'Liqueurs' && norm(item.name) === norm(liqueur.name));
      }
      const missingPantryIngredient = missing.some((item) => {
        if (item.type !== 'ingredient') return false;
        const itemParts = splitSpecificIngredientLabel(item.name);
        return matchesName(item.name)
          || (normalizedNames.includes(norm(itemParts.generic)) && (!itemParts.specific || normalizedNames.includes(norm(itemParts.specific))));
      });
      if (missingPantryIngredient) return true;
      const lineBitters = bittersRequirements({ingredients: [sourceLine]});
      if (lineBitters.length) {
        return lineBitters.some((name) => missing.some((item) => item.base === 'Flavorings' && norm(item.name) === norm(name)));
      }
      const classification = [parts.specific, parts.generic, rawName, sourceLine]
        .map(inferBottleClassification)
        .find((item) => item && cocktail.baseLiquor.includes(item.base));
      if (!classification) return false;
      const lineCocktail = {
        ...cocktail,
        baseLiquor: [classification.base],
        ingredients: [sourceLine],
        ingredientNames: [rawName],
        liqueurs: []
      };
      const lineSubtypes = baseSubtypeTags(lineCocktail)
        .filter((tag) => tag.base === classification.base)
        .map((tag) => tag.subtype);
      if (lineSubtypes.length) {
        return lineSubtypes.some((subtype) => missing.some((item) => item.base === classification.base && item.subtype === subtype));
      }
      return missing.some((item) => item.base === classification.base && !item.subtype);
    }

function genreText(cocktail) {
      return norm([
        ...cocktailTags(cocktail),
        ...cocktail.ingredientNames,
        ...ingredientTags(cocktail),
        ...cocktail.ingredients,
        ...cocktail.liqueurs.flatMap((liqueur) => [liqueur.name, liqueur.subtype, liqueur.flavor])
      ].join(' '));
    }

function genreHasAny(text, tokens) {
      return tokens.some((token) => text.includes(norm(token)));
    }

function matchesGenre(cocktail, genreId) {
      const text = genreText(cocktail);
      if (genreId === 'sour') {
        const citrus = genreHasAny(text, ['lemon juice', 'lime juice', 'grapefruit juice']);
        const sweet = cocktail.liqueurs.length > 0 || genreHasAny(text, ['sugar', 'syrup', 'honey', 'agave nectar', 'grenadine', 'orgeat']);
        return citrus && sweet;
      }
      if (genreId === 'bitter') {
        return genreHasAny(text, ['bitters', 'campari', 'aperol', 'amaro', 'fernet', 'cynar']);
      }
      if (genreId === 'tropical') {
        return genreHasAny(text, ['pineapple', 'passion fruit', 'orgeat', 'falernum', 'coconut', 'mango', 'guava']);
      }
      if (genreId === 'dessert') {
        return genreHasAny(text, ['cream', 'coffee', 'espresso', 'cacao', 'chocolate', 'egg yolk', 'baileys', 'amaretto', 'frangelico', 'nut liqueur']);
      }
      if (genreId === 'herbal') {
        return genreHasAny(text, ['chartreuse', 'benedictine', 'bénédictine', 'absinthe', 'amaro', 'fernet', 'cynar', 'galliano', 'pernod', 'herb and anise', 'anise liqueur']);
      }
      if (genreId === 'sparkling') {
        return genreHasAny(text, ['sparkling wine', 'champagne', 'prosecco', 'soda water', 'ginger ale', 'ginger beer', 'tonic water', 'grapefruit soda']);
      }
      if (genreId === 'lowAbv') {
        const fullStrengthBases = new Set(['Vodka', 'Gin', 'Tequila', 'Whiskey', 'Rum', 'Brandy']);
        return cocktail.baseLiquor.some((base) => ['Wine', 'Vermouth', 'Beer'].includes(base))
          && !cocktail.baseLiquor.some((base) => fullStrengthBases.has(base));
      }
      if (genreId === 'nonAlcoholic') {
        const alcoholTokens = ['vodka', 'gin', 'tequila', 'whiskey', 'whisky', 'rum', 'brandy', 'cognac', 'liqueur', 'vermouth', 'wine', 'champagne', 'prosecco', 'beer', 'cachaca', 'cachaça', 'pisco', 'mezcal', 'absinthe', 'amaro'];
        return cocktail.baseLiquor.length === 0 && cocktail.liqueurs.length === 0 && !genreHasAny(text, alcoholTokens);
      }
      return true;
    }

function isMatch(cocktail, ignoreMyBar = false) {
          const type = displayType(cocktail);
          const hay = norm([cocktail.name, cocktail.classicSource?.sourceName, ...cocktailAlternateNames(cocktail), type, cocktail.originalType, cocktail.glassware, displayGlass(cocktail.glassware), cocktail.status, cocktail.addedRemoved, cocktail.garnish, ...cocktailTags(cocktail), ...garnishTags(cocktail), ...cocktail.baseLiquor, ...cocktail.baseLiquor.map(displayBaseLabel), ...baseSubtypeTags(cocktail).map((tag) => tag.subtype), ...ingredientTags(cocktail), ...cocktail.ingredientNames, ...cocktail.ingredients].join(' '));
          if (state.statFilter === 'neat') return false;
          if (state.statFilter === 'current' && cocktail.status !== 'Current IBA') return false;
          if (state.statFilter === 'legacy' && cocktail.status !== 'Former IBA') return false;
          if (state.statFilter === 'custom' && !isCustomCocktail(cocktail)) return false;
          if (state.q && !hay.includes(norm(state.q))) return false;
          if (state.types.size && !state.types.has(type)) return false;
          if (state.bases.size && !cocktail.baseLiquor.some((base) => state.bases.has(base))) return false;
          if (state.subtypes.size && !baseSubtypeTags(cocktail).some((tag) => state.subtypes.has(tag.value))) return false;
          if (state.glasses.size && !state.glasses.has(cocktail.glassware)) return false;
          if (state.garnishes.size && !Array.from(state.garnishes).every((garnish) => garnishTags(cocktail).includes(garnish))) return false;
          if (state.ingredients.size && !Array.from(state.ingredients).every((ingredient) => {
            const selected = normalizedIngredientIdentity(ingredient);
            return cocktailIngredientFilterTags(cocktail).some((tag) => normalizedIngredientIdentity(tag) === selected);
          })) return false;
          const bottleUsage = activeBottleUsage();
          if (state.bottleUsageId && (!bottleUsage || !cocktailUsesBottle(cocktail, bottleUsage))) return false;
          const rating = getRating(cocktail);
          const rf = state.rating;
          if (rf.mode === 'above' && !(rating > rf.value)) return false;
          if (rf.mode === 'below' && !(rating < rf.value)) return false;
          if (rf.mode === 'within' && !(rating >= rf.min && rating <= rf.max)) return false;
          if (state.quick.has('allSpirit') && !isAllSpirit(cocktail)) return false;
          if (state.quick.has('spiritForward') && !isSpiritForward(cocktail)) return false;
          if (state.quick.has('toTry') && !store.bookmarks[cocktail.id]) return false;
          if (state.quick.has('hof') && !(rating >= 5)) return false;
          if (state.quick.has('favs') && !(rating >= 4)) return false;
          if (state.quick.has('lnl') && !cocktail.lnlSource) return false;
          if (state.quick.has('iba') && !['Current IBA', 'Former IBA'].includes(cocktail.status)) return false;
          if (state.quick.has('diffords') && !cocktail.diffordsSource) return false;
          if (state.quick.has('liquor') && !cocktail.liquorSource) return false;
          if (state.quick.has('classic') && !cocktail.classicSource) return false;
          if (DIFFORDS_GUIDE_FILTERS.some((filter) => {
            if (!state.quick.has(filter.id)) return false;
            const value = Number(cocktail.diffordsSource?.guide?.[filter.guideKey]);
            if (!Number.isFinite(value)) return true;
            return filter.comparison === 'max' ? value > filter.threshold : value < filter.threshold;
          })) return false;
          const selectedEra = LNL_ERA_FILTERS.find((filter) => state.quick.has(filter.id));
          if (selectedEra && cocktail.lnlSource?.era !== selectedEra.era) return false;
          const selectedIbaType = IBA_TYPE_FILTERS.find((filter) => state.quick.has(filter.id));
          if (selectedIbaType && !(cocktail.status === 'Current IBA' && type === selectedIbaType.type)) return false;
          const selectedTags = Array.from(state.quick).filter(isTagFilterId).map(tagFromFilterId).map(norm);
          const currentTags = new Set(cocktailTags(cocktail).map(norm));
          if (selectedTags.some((tag) => !currentTags.has(tag))) return false;
          if (!ignoreMyBar && state.quick.has('myBar') && !canMakeFromBar(cocktail)) return false;
          if (GENRE_FILTERS.some((filter) => state.quick.has(filter.id) && !matchesGenre(cocktail, filter.id))) return false;
          return true;
        }

function tableSortValue(cocktail, key) {
      if (key === 'name') return cocktail.name;
      if (key === 'try') return trySortRank(cocktail.id);
      if (key === 'rating') return getRating(cocktail);
      if (key === 'base') return cocktail.baseLiquor.map(displayBaseLabel).join(', ');
      if (key === 'garnish') return rowGarnish(cocktail);
      if (key === 'ingredients') return cocktail.ingredientCount;
      if (key === 'time') return cocktail.makeTime;
      if (key === 'glass') return displayGlass(cocktail.glassware);
      if (key === 'serving') return cocktailServingStyle(cocktail);
      if (key === 'type') return displayType(cocktail);
      if (key === 'status') return statusLabel(cocktail);
      return '';
    }

function compareSortValues(getValue, a, b, key) {
      const av = getValue(a, key);
      const bv = getValue(b, key);
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv), undefined, {numeric: true, sensitivity: 'base'});
    }

function compareTableSortValues(a, b, key) {
      return compareSortValues(tableSortValue, a, b, key);
    }

function filteredCocktails() {
      const rows = COCKTAILS.map((cocktail, sourceIndex) => ({cocktail, sourceIndex})).filter((row) => isMatch(row.cocktail));
      rows.sort((a, b) => {
        if (state.sortDirection === 'default') return a.cocktail.name.localeCompare(b.cocktail.name, undefined, {numeric: true, sensitivity: 'base'}) || a.sourceIndex - b.sourceIndex;
        const direction = state.sortDirection === 'descending' ? -1 : 1;
        const compared = compareTableSortValues(a.cocktail, b.cocktail, state.sort);
        if (compared) return compared * direction;
        return a.cocktail.name.localeCompare(b.cocktail.name) || a.sourceIndex - b.sourceIndex;
      });
      return rows.map((row) => row.cocktail);
    }
