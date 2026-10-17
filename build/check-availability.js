// Minimal inventory and recipe fixtures for the real availability helpers.
const RECOMMENDED_BOTTLES = [];
const NAMED_BOTTLE_EQUIVALENTS = [];
const COCKTAILS = [];
const ALL_SPIRIT_EXCLUDE_TOKENS = ['juice', 'syrup', 'water'];
const state = {futureBarPreview: false};
const store = {bar: []};
const gin = {name: 'London Dry Gin', base: 'Gin', subtype: 'London Dry'};
const absinthe = {name: 'Absinthe', base: 'Liqueurs', subtype: 'Herb, Anise'};
const unrelated = {name: 'Amaretto', base: 'Liqueurs', subtype: 'Nut, Almond'};
const bitters = {name: 'Angostura Bitters', base: 'Flavorings', subtype: 'Bitter, Aromatic'};

function requireAvailability(condition, message) {
    if (!condition) throw new Error(message);
}

for (const rinse of ['1 Absinthe Rinse', 'Absinthe Rinse', 'Rinse of Absinthe']) {
    for (const includeBitters of [false, true]) {
        const ingredients = ['2 oz Gin', rinse, ...(includeBitters ? ['1 dash Angostura Bitters'] : [])];
        const recipe = {
            id: 'rinse-test', name: 'Rinse Test', baseLiquor: ['Gin', 'Liqueurs'],
            ingredients, ingredientNames: ingredients.map((line) => parseIngredientLine(line).name),
            liqueurs: [{name: 'Absinthe', subtype: 'Herb, Anise'}],
            lnlSource: {ingredients, ingredientNames: ingredients.map((line) => parseIngredientLine(line).name), liqueurs: []}
        };
        store.bar = [gin, unrelated, ...(includeBitters ? [bitters] : [])];
        const available = barAvailability(recipe);
        requireAvailability(available.state === 'missing', 'Missing rinse was accepted: ' + rinse);
        requireAvailability(available.missing.some((item) => item.name === 'Absinthe'), 'Missing rinse was not identified');
        const variant = pantryRecipeVariant(recipe, recipe.lnlSource);
        requireAvailability(ingredientMissingFromBar(variant, 1), 'Rinse line was not marked missing');
        store.bar.push(absinthe);
        requireAvailability(canMakeFromBar(recipe), 'Owned rinse did not make recipe available');
        requireAvailability(!ingredientMissingFromBar(variant, 1), 'Owned rinse still marked missing');
        store.bar[store.bar.length - 1] = {...absinthe, shoppingList: true};
        requireAvailability(!canMakeFromBar(recipe), 'Out-of-stock rinse was accepted');
        const explicit = sourceRecipeClassification({...recipe.lnlSource, liqueurs: recipe.liqueurs}, recipe);
        requireAvailability(explicit.liqueurs.length === 1, 'Explicit rinse requirement was duplicated');
        requireAvailability(recipe.lnlSource.liqueurs.length === 0, 'Source metadata was mutated');
    }
}
const chartreuse = sourceRecipeClassification({ingredients: ['1 dash Yellow Chartreuse'], ingredientNames: ['Yellow Chartreuse'], liqueurs: [{name: 'Chartreuse, Yellow', subtype: 'Herb, Other'}]}, {baseLiquor: ['Liqueurs']});
requireAvailability(chartreuse.liqueurs.length === 1, 'A named liqueur alias was duplicated');
print('AVAILABILITY OK required rinses, named ingredients, source variants, and out-of-stock bottles');
