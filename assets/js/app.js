// Shared state and startup, in the original execution order. Load feature scripts first.

const TABLE_SORT_ICONS = { default: __ARROW_UP_AND_DOWN_SQUARE_FILL, ascending: __ARROW_UP_SQUARE_FILL, descending: __ARROW_DOWN_APP_FILL };
    
        const penicillinRecipe = COCKTAILS.find((cocktail) => cocktail.id === 'penicillin');
        if (penicillinRecipe) {
          penicillinRecipe.ingredients = ['60 ml Scotch, Blended', '7.5 ml Scotch, Islay (Smokey) [Lagavulin 16y]', '22.5 ml Fresh lemon juice', '22.5 ml Honey syrup', '2-3 quarter size sliced fresh ginger'];
          penicillinRecipe.ingredientNames = ['Scotch, Blended', 'Scotch, Islay (Smokey)', 'Lemon Juice', 'Honey Syrup', 'Ginger'];
        }
        const ibaTikiRecipe = COCKTAILS.find((cocktail) => cocktail.id === 'iba-tiki');
        if (ibaTikiRecipe) {
          ibaTikiRecipe.ingredients = ['30 ml Rum, White [Aged] [Ron Profundo Havana Club]', '30 ml Rum, Dark [Smokey] [Ron Smoky Havana Club]', '15 ml Almond Liqueur [Amaretto]', '5 ml Hazelnut Liqueur [Frangelico]', '1/24 oz Cherry Liqueur [Maraschino]', '30 ml Passion Fruit Puree', '90 ml Pineapple Juice [Fresh]', '30 ml Lime Juice [Fresh]', '1 piece Gengibre Slice'];
          ibaTikiRecipe.ingredientNames = ['Rum, White', 'Rum, Dark', 'Amaretto', 'Frangelico', 'Maraschino Liqueur', 'Passion Fruit Puree', 'Pineapple Juice', 'Lime Juice', 'Gengibre Slice'];
          ibaTikiRecipe.ingredientBottles = ['Ron Profundo Havana Club', 'Ron Smoky Havana Club', 'Amaretto', 'Frangelico', 'Maraschino', 'Fresh', 'Fresh', 'Fresh', ''];
          ibaTikiRecipe.ingredientCount = ibaTikiRecipe.ingredients.length;
        }
        const grandMargaritaRecipe = COCKTAILS.find((cocktail) => cocktail.id === 'grand-margarita');
        if (grandMargaritaRecipe) grandMargaritaRecipe.alternateNames = ['Cadillac Margarita'];
        const lemonDropRecipe = COCKTAILS.find((cocktail) => cocktail.id === 'lemon-drop-martini');
        if (lemonDropRecipe) {
          lemonDropRecipe.notes.push(
            'Classic Lemon Drop\n\n- 2 oz vodka\n- 3/4 oz fresh lemon juice\n- 1/2 oz simple syrup\n- 1/2 oz Cointreau or triple sec\n- Optional: sugar rim\n- Lemon twist\n\nShake with ice until very cold, then double-strain into a chilled coupe or martini glass.'
          );
        }
        COCKTAILS.unshift({"id":"amaretto-martini","name":"Amaretto Martini","type":"Custom","originalType":"Custom","status":"Custom","url":"https://thefestivefoodies.com/amaretto-martini/#recipe","image":"https://thefestivefoodies.com/wp-content/uploads/2024/05/amaretto-martini-1-500x500.jpeg","glassware":"Martini cocktail glass","baseLiquor":["Vodka","Liqueurs"],"ingredientCount":4,"makeTime":4,"dateAdded":2026,"dateRemoved":null,"addedRemoved":"Added 2026","ingredients":["2 oz Amaretto","1 oz Vodka","1/2 oz Lemon Juice [Fresh]","1/2 oz Simple Syrup"],"ingredientNames":["Amaretto","Vodka","Lemon Juice","Simple Syrup"],"method":["Shake with ice for 20 seconds.","Strain and serve neat. Serve over fresh ice if preferred."],"garnish":"Lemon twist, maraschino cherry, or orange.","notes":["Non-alcoholic variation: use sparkling water in place of the spirits.","Recipe provided by user from The Festive Foodies."],"liqueurs":[{"name":"Amaretto","subtype":"Nuts liqueurs","flavor":"almond"}],"sourceNote":"Custom cocktail recipe provided by user from The Festive Foodies."});
        COCKTAILS.unshift({
          id: 'alaska-diffords', name: 'Alaska', type: 'Custom', originalType: 'Custom', status: 'Custom',
          url: 'https://www.diffordsguide.com/cocktails/recipe/20866/alaska-diffords-recipe', image: '', glassware: 'Nick & Nora glass',
          baseLiquor: ['Gin', 'Liqueurs'], ingredientCount: 7, makeTime: 4, dateAdded: 2026, dateRemoved: null, addedRemoved: 'Difford’s Guide · 2023',
          ingredients: ['1 disc Orange Zest [Swath]', '50 ml Gin, Old Tom [Hayman’s Old Tom Gin]', '15 ml Chartreuse, Yellow [Yellow Chartreuse or Génépy Liqueur]', '2 dashes Bitter, Orange [Angostura Orange Bitters]', '2 drops Saline Solution [20%]', '1 dash Herb, Anise Liqueur [La Fée Parisienne Absinthe]', '7.5 ml Water [Chilled; omit if using wet ice]'],
          ingredientNames: ['Orange', 'Old Tom Gin', 'Yellow Chartreuse', 'Orange Bitters', 'Saline Solution', 'Absinthe', 'Water'],
          method: ['Pre-chill a Nick & Nora glass and prepare an orange zest twist.', 'Express the oils from a coin-size orange zest disc into a mixing glass and drop it in.', 'Add the remaining ingredients and regal stir with ice.', 'Strain into the chilled glass.'],
          garnish: 'Express an orange zest twist over the cocktail and use as garnish.',
          notes: ['Difford’s variation on the classic Alaska, with absinthe and a regal stir.'],
          liqueurs: [{name: 'Chartreuse, Yellow', subtype: 'Other, Specialty', flavor: 'honeyed alpine herbs and florals'}, {name: 'Absinthe', subtype: 'Anise liqueurs', flavor: 'anise and herbs'}],
          sourceNote: 'Recipe by Simon Difford, August 2023.',
          diffordsSource: {
            sourceName: 'Alaska (Difford’s recipe)', url: 'https://www.diffordsguide.com/cocktails/recipe/20866/alaska-diffords-recipe', available: true,
            ingredients: ['1 disc Orange Zest [Swath]', '50 ml Gin, Old Tom [Hayman’s Old Tom Gin]', '15 ml Chartreuse, Yellow [Yellow Chartreuse or Génépy Liqueur]', '2 dashes Bitter, Orange [Angostura Orange Bitters]', '2 drops Saline Solution [20%]', '1 dash Herb, Anise Liqueur [La Fée Parisienne Absinthe]', '7.5 ml Water [Chilled; omit if using wet ice]'],
            ingredientNames: ['Orange', 'Old Tom Gin', 'Yellow Chartreuse', 'Orange Bitters', 'Saline Solution', 'Absinthe', 'Water'], ingredientBottles: [],
            method: ['Pre-chill a Nick & Nora glass and prepare an orange zest twist.', 'Express the oils from a coin-size orange zest disc into a mixing glass and drop it in.', 'Add the remaining ingredients and regal stir with ice.', 'Strain into the chilled glass.'],
            garnish: 'Express an orange zest twist over the cocktail and use as garnish.', glassware: 'Nick & Nora glass',
            liqueurs: [{name: 'Chartreuse, Yellow', subtype: 'Other, Specialty', flavor: 'honeyed alpine herbs and florals'}, {name: 'Absinthe', subtype: 'Anise liqueurs', flavor: 'anise and herbs'}],
            discerningDrinkers: {count: 24}, notes: {review: 'A classic Alaska with a dash of absinthe and a regal stir.', variant: '', history: 'Recipe by Simon Difford in August 2023.'}
          },
          liquorSource: {
            sourceName: 'Alaska', url: 'https://www.liquor.com/recipes/alaska/', available: true,
            ingredients: ['1.5 oz Gin', '0.5 oz Chartreuse, Yellow', '1 dash Bitter, Orange'],
            ingredientNames: ['Gin', 'Yellow Chartreuse', 'Orange Bitters'], ingredientBottles: [],
            method: ['Add the gin, yellow Chartreuse, and orange bitters to a mixing glass with ice and stir until well-chilled.', 'Strain into a chilled coupe or Nick & Nora glass.'],
            garnish: 'Express the oil of a lemon twist over the drink, then garnish with the twist.', glassware: 'Coupe or Nick & Nora glass',
            liqueurs: [{name: 'Chartreuse, Yellow', subtype: 'Other, Specialty', flavor: 'honeyed alpine herbs and florals'}]
          }
        });
        const BASE_ORDER = ['Vodka','Gin','Tequila','Whiskey','Rum','Vermouth','Brandy','Liqueurs','Wine','Beer','Other'];
        const BAR_BASE_ORDER = ['Whiskey', ...BASE_ORDER.filter((base) => !['Other','Whiskey','Wine','Beer'].includes(base)), 'Flavorings', 'Wine', 'Beer'];
        const DEFAULT_TYPES = ['The Unforgettables','Contemporary Classics','New Era Drinks','Legacy','Custom','In the Wild'];
        const BASE_SUBTYPES = {
          Vodka: ['Plain','Flavored/Infused'],
          Gin: ['London Dry','Old Tom Gin','Genever (Jenever)','Contemporary/New Western'],
          Tequila: ['Blanco (Silver/Plata)','Mezcal','Joven (Gold/Oro)','Reposado (Rested)','Añejo (Aged)','Extra Añejo (Ultra Aged)'],
          Whiskey: ['Scotch, Highlands','Scotch, Lowlands','Scotch, Campbeltown','Scotch, Speyside','Scotch, Islands (Orkney)','Scotch, Islands (Skye)','Scotch, Islay (Smokey)','Scotch, Blended','Scotch, Single Malt','Japanese','Irish','Canadian','American','Bourbon','Rye'],
          Rum: ['White','Gold','Dark','Spiced','Overproof','Aged/Vintage'],
          Vermouth: ['Vermouth, Sweet (Italian/Rosso)','Vermouth, Dry (French)','Vermouth, Extra Dry','Vermouth, Bittersweet','Vermouth, Rosé','Vermouth, Bianco (Blanc)','Vermouth, Ambrato (Amber)'],
          Brandy: ['Cognac','Armagnac','Calvados','Pisco','Brandy de Jerez','Fruit Brandies (Eau-de-Vie)','Grappa','Other Brandy'],
          Wine: ['Red','White','Rosé','Sparkling','Aromatized/Aperitif','Dessert/Fortified Wine'],
          Beer: ['Ales','Lagers','Cider/Mead','Specialty/Sour'],
          Flavorings: ['Bitter, Aromatic','Bitter, Orange','Bitter, Other','Juice, Pineapple','Syrup, Sugar','Syrup, Honey','Syrup, Grenadine','Syrup, Agave Nectar','Syrup, Orgeat','Syrup, Demerara','Syrup, Other']
        };
        const BASE_DISPLAY_LABELS = { Whiskey: 'Whisk(e)y' };
        const RECOMMENDED_BOTTLES = [
          {id:'titos-vodka', type:'Vodka', name:'Tito’s Handmade Vodka', url:'https://www.totalwine.com/spirits/vodka/vodka/titos-handmade-vodka/p/96260750', base:'Vodka', subtype:'Plain', comparable:['Plain'], order:0},
          {id:'beefeater-gin', type:'Gin', name:'Beefeater London Dry Gin', url:'https://www.totalwine.com/spirits/gin/beefeater-london-dry-gin/p/3639750', base:'Gin', subtype:'London Dry', comparable:['London Dry'], order:1},
          {id:'haymans-old-tom', type:'Old Tom Gin', name:'Hayman’s Old Tom Gin', url:'https://www.totalwine.com/spirits/gin/haymans-old-tom-gin/p/106921750', base:'Gin', subtype:'Old Tom Gin', comparable:['Old Tom Gin'], order:12},
          {id:'wild-turkey-101', type:'Bourbon', name:'Wild Turkey 101 Bourbon', url:'https://www.totalwine.com/spirits/bourbon/wild-turkey-101-bourbon/p/1862750', base:'Whiskey', subtype:'Bourbon', comparable:['Bourbon'], order:2},
          {id:'olmeca-altos-plata', type:'Blanco Tequila', name:'Olmeca Altos Plata Tequila', url:'https://www.totalwine.com/spirits/tequila/blancosilver/olmeca-altos-platatequila/p/131597750', base:'Tequila', subtype:'Blanco (Silver/Plata)', comparable:['Blanco (Silver/Plata)'], order:3},
          {id:'planteray-3-stars', type:'White Rum', name:'Planteray 3 Stars White Rum', url:'https://www.totalwine.com/spirits/rum/silver-rum/planteray-3-stars-white-rum/p/2126247061', base:'Rum', subtype:'White', comparable:['White'], order:4},
          {id:'appleton-signature', type:'Aged Jamaican Rum', name:'Appleton Estate Signature Blend', url:'https://www.totalwine.com/spirits/rum/aged-rum/appleton-estate-signature-blend/p/8799750', base:'Rum', subtype:'Aged/Vintage', comparable:['Aged/Vintage','Dark'], order:6},
          {id:'jameson-irish', type:'Irish Whiskey', name:'Jameson Irish Whiskey', url:'https://www.totalwine.com/spirits/irish-whiskey/jameson-irish-whiskey/p/2812750', base:'Whiskey', subtype:'Irish', comparable:['Irish'], order:7},
          {id:'ferrand-1840', type:'Cognac', name:'Ferrand 1840 Original Formula Cognac', url:'https://www.totalwine.com/spirits/brandy-cognac/cognac/ferrand-1840-orig-formula-cognac/p/2126276330', base:'Brandy', subtype:'Cognac', comparable:['Cognac'], price:48, country:'France', taste:'Fruit, Honey', order:8},
          {id:'banhez-mezcal', type:'Mezcal', name:'Banhez Espadín & Barril Mezcal', url:'https://www.totalwine.com/spirits/mezcal/banhez-espadin-barril-mezcal/p/192982750', base:'Tequila', subtype:'Mezcal', comparable:['Mezcal'], order:9},
          {id:'dolin-dry-vermouth', type:'Vermouth, Dry (French)', name:'Dolin Vermouth de Chambery Dry', url:'https://www.totalwine.com/spirits/amaro-aperitif-vermouth/vermouth/dry/dolin-vermouth-de-chambery-dry/p/106922750', base:'Vermouth', subtype:'Vermouth, Dry (French)', comparable:['Vermouth, Dry (French)'], order:10},
          {id:'cocchi-sweet-vermouth', type:'Vermouth, Sweet (Italian/Rosso)', name:'Cocchi Vermouth di Torino', url:'https://www.totalwine.com/spirits/amaro-aperitif-vermouth/vermouth/sweet/cocchi-vermouth-di-torino/p/116922750', base:'Vermouth', subtype:'Vermouth, Sweet (Italian/Rosso)', comparable:['Vermouth, Sweet (Italian/Rosso)'], order:11},
          {id:'monkey-shoulder', type:'Scotch, Blended', name:'Monkey Shoulder Blended Malt Scotch Whisky', url:'https://www.totalwine.com/spirits/scotch/blended-scotch/monkey-shoulder-blended-malt-scotch-whisky/p/127093750', base:'Whiskey', subtype:'Scotch, Blended', comparable:['Scotch, Blended'], price:33, location:'Aisle 07, Right, Bay 25, Shelf 01', order:0}
        ];
        const NEAT_POUR_CATALOG = [
          {
            aliases: ['Lagavulin 16', 'Lagavulin 16y', 'Lagavulin 16 Year', 'Lagavulin 16 Year Single Malt Scotch'],
            tastes: ['Smoke', 'Peat', 'Sherry', 'Sea Salt', 'Burnt Orange']
          },
          {
            aliases: ['Ardbeg', 'Ardbeg Uigeadail', 'Uigeadail'],
            tastes: ['Chocolate', 'Caramel', 'Smoke', 'Rich Fruit', 'Honey'],
            notes: {
              overview: 'A marriage of Ardbeg from bourbon barrel and sherry butt which gives a sweet and smokey finish to this malt bottled at cask strength. Uigeadail is the name of the loch from which all Ardbeg water flows.',
              nose: 'Chocolate-covered caramel and barley sugar with smoky leather, raisins and linseed oil.',
              palate: 'Chewy and oily with rich fruit-cake sweetness leading to honey and barbecue smoke.',
              finish: 'Long, dry and sweet with honey and treacle.'
            }
          },
          {
            aliases: ['Highland Park', 'Highland Park 12', 'Highland Park 18'],
            tastes: ['Heather Honey', 'Dried Fruit', 'Winter Spice', 'Seville Orange', 'Gentle Smoke'],
            notes: {
              overview: 'From Orkney, Scotland, Highland Park is aged in seasoned oak casks for a rich, full flavor with heather honey, dried fruits, winter spices, Seville oranges, and a gentle smoky finish.',
              nose: 'Heather honey, dried fruit, winter spices, and Seville orange.',
              palate: 'Rich and full, with seasoned oak, honeyed fruit, citrus, and warming spice.',
              finish: 'A gentle smoke with lingering orange and spice.'
            }
          }
        ];
        const BASE_INFO = {
          Vodka: 'A neutral spirit usually distilled from grains or potatoes.',
          Gin: 'A neutral grain spirit that is redistilled with botanicals, primarily juniper berries.',
          Tequila: 'Made specifically from the blue agave plant in Mexico.',
          Whiskey: 'Distilled from fermented grain mash, like corn, barley, or rye, and aged in oak barrels. Styles include Bourbon, Scotch, and Irish whiskey.',
          Rum: 'Distilled from sugarcane juice, sugarcane syrup, or molasses. Rum styles vary by raw material, still type, aging, blending, added spice, and proof; color alone does not reliably indicate age or richness.',
          Vermouth: 'A fortified, aromatized wine flavored with botanicals and commonly used in martinis, Manhattans, and spritzes.',
          Brandy: 'Distilled from fermented fruit juices, typically grapes.\n\nLabel terms on Cognac\n\n- VS: youngest spirit aged at least 2 years\n- VSOP: at least 4 years\n- XO: at least 10 years',
          Liqueurs: 'Liqueurs are sweet, flavorful distilled spirits mixed with fruits, herbs, spices, or creams.',
          Wine: 'Fermented from grapes or other fruits. Key varieties include red, white, rose, and sparkling wine.',
          Beer: 'Fermented from cereal grains, like barley or wheat, and flavored with hops. Common styles include ales, lagers, and stouts.',
          Flavorings: 'Cocktail bitters, syrups, and sweeteners kept as prepared bottles in the bar.',
          Other: 'A base that does not fit the standard spirit, wine, or beer families.'
        };
        const VERMOUTH_INFO_ROWS = [
          {type:'Dry (French)', flavor:'Crisp, herbal, lightly bitter, low sweetness', color:'Pale straw', uses:'Martini, Bamboo, cooking'},
          {type:'Sweet (Italian/Rosso)', flavor:'Rich, sweet, spicy, vanilla, caramel', color:'Reddish-brown', uses:'Manhattan, Negroni, Boulevardier'},
          {type:'Bittersweet', flavor:'Balanced sweetness with pronounced bitter herbs, citrus peel, gentian, and spice', color:'Amber to deep red', uses:'Variations (can be sweet vermouth plus bitter aromatics)'},
          {type:'Bianco (Blanc)', flavor:'Sweeter than dry, lighter than rosso, floral and vanilla notes', color:'Pale gold', uses:'Served over ice, spritzes, lighter cocktails'},
          {type:'Rosé', flavor:'Fruity, floral, balanced sweetness', color:'Pink', uses:'Spritzes, modern cocktails'},
          {type:'Extra Dry', flavor:'Very dry, minimal sweetness', color:'Pale', uses:'Very dry Martinis'},
          {type:'Ambrato (Amber)', flavor:'Herbal with honey, dried fruit, and spice', color:'Amber', uses:'Sipping or specialty cocktails'}
        ];
        const RUM_INFO_ROWS = [
          {type:'White', flavor:'Light, clean, grassy to softly sweet', production:'Usually unaged or lightly aged and charcoal-filtered', uses:'Daiquiri, Mojito, Cuba Libre'},
          {type:'Gold', flavor:'Rounded vanilla, caramel, and gentle oak', production:'Barrel-aged or blended for a golden color', uses:'Rum Punch, Mai Tai, mixed highballs'},
          {type:'Dark', flavor:'Rich molasses, caramel, baking spice, and deeper roast', production:'Longer aging, heavier distillate, or dark blending components', uses:'Dark ’n’ Stormy, Jungle Bird, tropical drinks'},
          {type:'Aged / Vintage', flavor:'Complex oak, dried fruit, vanilla, spice, and spirit character', production:'Age-stated, vintage-dated, or deliberately mature blends', uses:'Spirit-forward cocktails or sipping'},
          {type:'Overproof', flavor:'Concentrated, intense, often funky or fiery', production:'Bottled above standard proof, commonly over 50% ABV', uses:'Floats, punches, tiki drinks; measure carefully'},
          {type:'Spiced', flavor:'Sweet spice such as vanilla, cinnamon, clove, or nutmeg', production:'Rum flavored after distillation, often sweetened', uses:'Cola highballs, punches, simple mixed drinks'}
        ];
        const GIN_INFO_ROWS = [
          {type:'London Dry', flavor:'Juniper-forward, crisp, dry, often citrusy', production:'Natural botanicals added during distillation; no flavoring after', uses:'Martini, Negroni, Gin & Tonic'},
          {type:'Old Tom', flavor:'Rounder, softer, and slightly sweeter than London Dry', production:'Traditional sweetened style; sometimes lightly barrel-aged', uses:'Martinez, Tom Collins, Alaska'},
          {type:'Genever', flavor:'Malty, rich, juniper-accented, whiskey-like', production:'Built on malt wine with juniper and other botanicals', uses:'Improved Holland Gin Cocktail, vintage recipes'},
          {type:'Contemporary / New Western', flavor:'Floral, citrus, spice, or other botanicals may lead', production:'Modern gin with less emphasis on dominant juniper', uses:'Modern Martinis, highballs, botanical cocktails'}
        ];
        const TEQUILA_INFO_ROWS = [
          {type:'Blanco', flavor:'Bright agave, citrus, pepper, and minerals', production:'Unaged or rested no more than about 60 days', uses:'Margarita, Paloma, Ranch Water'},
          {type:'Joven / Gold', flavor:'Softer and often sweeter than blanco', production:'Usually blanco blended with aged tequila or colorants', uses:'Mixed drinks and highballs'},
          {type:'Reposado', flavor:'Agave balanced with vanilla, caramel, and gentle oak', production:'Oak-aged 2–12 months', uses:'Premium Margaritas, El Diablo, sipping'},
          {type:'Añejo', flavor:'Rich oak, spice, chocolate, and dried fruit', production:'Oak-aged 1–3 years', uses:'Spirit-forward cocktails and sipping'},
          {type:'Extra Añejo', flavor:'Deep oak, caramel, dark fruit, and baking spice', production:'Oak-aged at least 3 years', uses:'Primarily sipping; restrained cocktail use'},
          {type:'Mezcal', flavor:'Roasted agave, earth, minerals, fruit, and smoke', production:'Agave hearts are traditionally roasted before fermentation', uses:'Oaxaca Old Fashioned, Naked & Famous, smoky riffs'}
        ];
        const BRANDY_INFO_ROWS = [
          {type:'Cognac', flavor:'Elegant grape, orchard fruit, vanilla, and oak', production:'Protected French grape brandy; double-distilled', uses:'Sidecar, Sazerac, Vieux Carré'},
          {type:'Armagnac', flavor:'Rustic fruit, prune, spice, and fuller texture', production:'Protected French grape brandy; commonly single-distilled', uses:'Brandy cocktails and sipping'},
          {type:'Calvados', flavor:'Apple and pear with spice and oak', production:'Normandy cider brandy', uses:'Jack Rose variations, autumn cocktails'},
          {type:'Pisco', flavor:'Fresh grape, floral, citrus, and pepper', production:'Peruvian or Chilean grape brandy, generally unaged', uses:'Pisco Sour, Chilcano'},
          {type:'Brandy de Jerez', flavor:'Dried fruit, caramel, walnut, and sherry', production:'Spanish brandy matured through a solera system', uses:'Rich stirred drinks and sipping'},
          {type:'Fruit Brandy / Eau-de-Vie', flavor:'Dry, aromatic expression of the source fruit', production:'Usually clear, unaged fruit distillate', uses:'Specialty classics and fruit-forward drinks'},
          {type:'Grappa', flavor:'Grape skin, herbs, pepper, and earthy fruit', production:'Italian pomace spirit distilled from winemaking remains', uses:'Mostly sipping; occasional specialty cocktails'},
          {type:'Other Brandy', flavor:'Varies from light grape fruit to rich oak and caramel', production:'Brandy outside the named protected or fruit categories', uses:'Brandy classics, punches, and cooking'}
        ];
        const WHISKEY_INFO_ROWS = [
          {type:'Bourbon', flavor:'Vanilla, caramel, sweet corn, and oak', production:'U.S.; at least 51% corn, new charred oak', uses:'Old Fashioned, Whiskey Sour, Boulevardier'},
          {type:'Rye', flavor:'Dry, peppery, herbal, and spicy', production:'U.S.; at least 51% rye', uses:'Manhattan, Sazerac, Vieux Carré'},
          {type:'American', flavor:'Varies from mellow corn sweetness to robust oak', production:'U.S. whiskey outside the dedicated bourbon and rye groups', uses:'Highballs and American whiskey classics'},
          {type:'Scotch — Islay', flavor:'Peat smoke, brine, iodine, and maritime malt', production:'Malt whisky from Islay', uses:'Penicillin float, Rob Roy variations'},
          {type:'Scotch — Highlands', flavor:'Fruit, heather, malt, spice, and variable smoke', production:'Broad Highland regional family', uses:'Rob Roy, Blood and Sand, sipping'},
          {type:'Scotch — Lowlands', flavor:'Light, grassy, floral, and citrus-led', production:'Lowland regional malt style', uses:'Delicate Scotch cocktails and highballs'},
          {type:'Scotch — Campbeltown', flavor:'Briny, oily, fruity, malty, and gently smoky', production:'Campbeltown regional malt style', uses:'Spirit-forward Scotch drinks'},
          {type:'Scotch — Speyside', flavor:'Apple, pear, honey, vanilla, and sherry', production:'Speyside regional malt style', uses:'Approachable Scotch cocktails and sipping'},
          {type:'Scotch — Islands', flavor:'Maritime malt with smoke, pepper, honey, or dried fruit', production:'Island malts including Skye and Orkney', uses:'Smoky cocktails and sipping'},
          {type:'Scotch — Blended', flavor:'Balanced grain, malt, fruit, and restrained smoke', production:'Blend of malt and grain whiskies', uses:'Penicillin, highballs, broad cocktail use'},
          {type:'Scotch — Single Malt', flavor:'Distillery-specific, from fruity to richly peated', production:'100% malted barley from one distillery', uses:'Sipping and character-forward cocktails'},
          {type:'Irish', flavor:'Smooth, fruity, honeyed, and lightly spicy', production:'Irish whiskey, often triple-distilled', uses:'Irish Coffee, Tipperary, highballs'},
          {type:'Canadian / Japanese', flavor:'Canadian is often light and rye-accented; Japanese is delicate and precise', production:'Distinct national traditions influenced by blending and Scotch', uses:'Highballs, light stirred drinks, sipping'}
        ];
        const WINE_INFO_ROWS = [
          {type:'Red', flavor:'Red fruit, dark fruit, tannin, spice, and earth', production:'Dark grapes fermented with their skins', uses:'Sangria, New York Sour, wine punches'},
          {type:'White', flavor:'Crisp citrus and orchard fruit to rich, creamy styles', production:'Usually fermented without grape-skin contact', uses:'Spritzes, cobblers, punches, low-ABV drinks'},
          {type:'Rosé', flavor:'Light red fruit, citrus, floral notes, and fresh acidity', production:'Brief contact with red grape skins', uses:'Spritzes and light summer cocktails'},
          {type:'Sparkling', flavor:'Bright acidity with bubbles; dry to sweet', production:'Secondary fermentation captures carbon dioxide', uses:'Champagne Cocktail, Bellini, French 75'},
          {type:'Aromatized / Aperitif', flavor:'Botanical, citrus, floral, bitter, or quinine-accented', production:'Wine infused or flavored with botanicals', uses:'Vesper, Corpse Reviver No. 2, aperitif drinks'},
          {type:'Dessert / Fortified', flavor:'Rich dried fruit, nuts, oxidation, or concentrated sweetness', production:'Sweet wine or wine fortified with grape spirit', uses:'Adonis, Bamboo, cobblers, flips'}
        ];
        const BEER_INFO_ROWS = [
          {type:'Ales', flavor:'Fruity, malty, full-bodied, and sometimes hoppy', production:'Warm-fermented with top-fermenting yeast', uses:'Shandies, beer cocktails, flips'},
          {type:'Lagers', flavor:'Crisp, clean, light malt, and restrained fruit', production:'Cold-fermented with bottom-fermenting yeast', uses:'Michelada, Radler, light highballs'},
          {type:'Cider / Mead', flavor:'Apple-led cider or floral honey-led mead', production:'Fermented fruit juice or honey', uses:'Mulls, punches, seasonal cocktails'},
          {type:'Specialty / Sour', flavor:'Tart, funky, fruity, spiced, smoked, or otherwise distinctive', production:'Mixed fermentation or nonstandard ingredients and methods', uses:'Creative beer cocktails and culinary pairings'}
        ];
        const FLAVORING_INFO_ROWS = [
          {type:'Aromatic Bitters', flavor:'Concentrated warm spice, roots, bark, and herbs', production:'High-proof botanical extraction used by the dash', uses:'Old Fashioned, Manhattan, Champagne Cocktail'},
          {type:'Orange Bitters', flavor:'Orange peel, dry citrus, spice, and herbs', production:'Concentrated citrus-led botanical extraction', uses:'Martini, Alaska, Bijou'},
          {type:'Other Bitters', flavor:'Specialty profiles such as peach, chocolate, celery, or mole', production:'Concentrated flavoring bitters outside core families', uses:'Recipe-specific accents and aromatic layering'},
          {type:'Juices', flavor:'Fresh or prepared fruit acidity and sweetness', production:'Pressed, squeezed, or packaged fruit juice', uses:'Sours, tropical drinks, punches'},
          {type:'Syrups / Sweeteners', flavor:'Sugar-based sweetness with optional fruit, nuts, spice, or herbs', production:'Sugar dissolved with water and flavoring ingredients', uses:'Balance acidity, texture, and flavor'}
        ];
        const LIQUEUR_INFO_ROWS = [
          {type:'Fruit', flavor:'Orange, cherry, berry, apricot, peach, passion fruit, and more', production:'Sweetened spirit flavored with fruit, peel, or juice', uses:'Sidecar, Margarita, Aviation, tropical drinks'},
          {type:'Herbal', flavor:'Botanical, alpine, bitter, floral, minty, or medicinal', production:'Herbs, roots, flowers, bark, and spices infused or distilled', uses:'Last Word, Alaska, Bijou, after-dinner drinks'},
          {type:'Anise', flavor:'Licorice, fennel, herbs, and warming spice', production:'Anise-led botanical spirit, often strongly flavored', uses:'Rinses, dashes, tiki drinks, Sazerac'},
          {type:'Nut', flavor:'Almond, hazelnut, walnut, or other roasted nuts', production:'Sweetened spirit flavored with nuts or kernels', uses:'Amaretto Sour, dessert and tropical drinks'},
          {type:'Coffee / Chocolate', flavor:'Roasted coffee, cacao, cocoa, vanilla, and sweetness', production:'Coffee beans or cacao infused into a sweetened spirit base', uses:'Espresso Martini, Alexander, dessert drinks'},
          {type:'Cream', flavor:'Rich dairy, vanilla, chocolate, coffee, or whiskey', production:'Liqueur emulsified with dairy or cream-like ingredients', uses:'White Russian, B-52, creamy dessert drinks'},
          {type:'Floral', flavor:'Violet, elderflower, rose, and perfumed botanicals', production:'Flowers infused or distilled into sweetened spirit', uses:'Aviation and aromatic modern cocktails'},
          {type:'Bitter / Amaro', flavor:'Bittersweet citrus, roots, herbs, bark, and spice', production:'Sweetened botanical bitter ranging from aperitivo to digestivo', uses:'Negroni family, spritzes, amaro cocktails'},
          {type:'Whiskey / Brandy Based', flavor:'Base-spirit character softened with herbs, fruit, honey, or sugar', production:'Whiskey or brandy blended into a sweetened liqueur', uses:'Rusty Nail, B&B, after-dinner drinks'},
          {type:'Specialty', flavor:'Distinctive proprietary profiles that cross ordinary families', production:'Brand-specific blends of botanicals and flavorings', uses:'Recipe-specific modifiers and signature cocktails'}
        ];
        const BASE_INFO_TABLES = {
          Vermouth: {
            ariaLabel: 'Vermouth styles',
            headings: ['Type', 'Flavor Profile', 'Color', 'Common Uses'],
            rows: VERMOUTH_INFO_ROWS.map((row) => [row.type, row.flavor, row.color, row.uses])
          },
          Rum: {
            ariaLabel: 'Rum styles',
            headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: RUM_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Gin: {
            ariaLabel: 'Gin styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: GIN_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Tequila: {
            ariaLabel: 'Tequila and agave styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: TEQUILA_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Brandy: {
            ariaLabel: 'Brandy styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: BRANDY_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Whiskey: {
            ariaLabel: 'Whiskey styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: WHISKEY_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Wine: {
            ariaLabel: 'Wine styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: WINE_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Beer: {
            ariaLabel: 'Beer, cider, and mead styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: BEER_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Flavorings: {
            ariaLabel: 'Cocktail flavoring styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: FLAVORING_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          },
          Liqueurs: {
            ariaLabel: 'Liqueur styles', headings: ['Type', 'Flavor Profile', 'Production', 'Common Uses'],
            rows: LIQUEUR_INFO_ROWS.map((row) => [row.type, row.flavor, row.production, row.uses])
          }
        };
        const SUBTYPE_INFO = {
          'Vodka::Plain': 'Clean, neutral, and clear. Distilled to high purity, it is highly versatile and the standard base for most cocktails.',
          'Vodka::Flavored/Infused': 'Enhanced with natural or artificial ingredients. Flavored vodkas use added flavorings, while infused vodkas are steeped with real fruits, herbs, or spices.',
          'Gin::London Dry': 'The iconic bright, clean, and crisp gin style where juniper and citrus lead. Botanicals must be natural and added during distillation.',
          'Gin::Old Tom Gin': 'A slightly sweeter style, sometimes with added sugar or brief barrel aging. It works well in vintage cocktails like the Martinez or Bee\'s Knees.',
          'Gin::Genever (Jenever)': 'The Dutch and Belgian ancestor of modern gin. Its malt wine base gives it a rich, malty profile closer to light whiskey than typical gin.',
          'Gin::Contemporary/New Western': 'A modern gin category where floral, spice, or citrus botanicals often take center stage instead of strict juniper dominance.',
          'Tequila::Blanco (Silver/Plata)': 'Unaged or aged up to 60 days, with the boldest blue agave flavor and bright, crisp, citrusy, peppery notes.',
          'Tequila::Joven (Gold/Oro)': 'Usually an unaged Blanco blended with aged tequila or caramel colorants, making it slightly sweeter, smoother, and richer.',
          'Tequila::Reposado (Rested)': 'Aged in oak for 2 to 12 months, balancing raw agave with subtle vanilla, caramel, and baking spice notes.',
          'Tequila::Añejo (Aged)': 'Aged in oak for 1 to 3 years, producing a dark, rich spirit with chocolate, spice, and deep oak notes.',
          'Tequila::Extra Añejo (Ultra Aged)': 'Aged at least 3 years in oak barrels, with the darkest color, highest complexity, and smoothest mouthfeel.',
          'Tequila::Mezcal': 'An agave spirit traditionally roasted before distillation, often bringing earthy, mineral, and smoky flavors.',
          'Whiskey::Bourbon': 'Made in the U.S. with at least 51% corn and aged in new charred oak barrels. Known for vanilla, caramel, and oak.',
          'Whiskey::Rye': 'Made with at least 51% rye in the mash bill. It delivers a spicier, drier, and more peppery profile than bourbon.',
          'Whiskey::American': 'American whiskey outside the dedicated Bourbon and Rye categories, including Tennessee whiskey and other regional grain styles.',
          'Whiskey::Scotch, Islay (Smokey)': 'An Islay Scotch with an assertive smoky, peaty, and maritime profile. Used when a cocktail specifically needs smoke rather than a general Scotch character.',
          'Whiskey::Scotch, Highlands': 'A broad Highland style ranging from light and floral to rich and full-bodied, often with fruit, heather, malt, spice, and gentle smoke.',
          'Whiskey::Scotch, Lowlands': 'Typically light, grassy, floral, and citrus-led, with a clean profile and little peat.',
          'Whiskey::Scotch, Campbeltown': 'A distinctive maritime style often combining brine, oil, orchard fruit, malt, and restrained smoke.',
          'Whiskey::Scotch, Speyside': 'Usually fruit-forward and elegant, with common notes of apple, pear, honey, vanilla, and sherry.',
          'Whiskey::Scotch, Islands (Skye)': 'An Island single malt from Skye, typically balancing maritime smoke, pepper, malt sweetness, and coastal character. Talisker 10 is the classic example.',
          'Whiskey::Scotch, Islands (Orkney)': 'An Island single malt from Orkney, Scotland, often combining heather honey, dried fruit, winter spice, citrus, seasoned oak, and gentle smoke. Highland Park is the classic example.',
          'Whiskey::Scotch, Blended': 'A combination of multiple malt and grain whiskies from different distilleries for a smoother, more consistent profile.',
          'Whiskey::Scotch, Single Malt': 'Made entirely from malted barley at one distillery using traditional copper pot stills. Ranges from fruity to smoky and peaty.',
          'Whiskey::Irish': 'Triple-distilled and traditionally made from malted and unmalted barley, then aged at least three years for a smooth, balanced taste.',
          'Whiskey::Canadian': 'Generally lighter and smoother, typically made from a blend of corn and rye grains.',
          'Whiskey::Japanese': 'Inspired by Scotch whisky and often made with malted barley, prized for delicate, balanced, sometimes floral character.',
          'Rum::White': 'Clear and light-bodied with a subtle, sweet taste. Often filtered to remove color and ideal for Mojitos and Daiquiris.',
          'Rum::Gold': 'Aged in wooden casks for a golden hue and smoother flavor with vanilla and oak notes.',
          'Rum::Dark': 'Aged longer in heavily charred barrels, with rich molasses, caramel, and spice notes.',
          'Rum::Spiced': 'Infused with natural spices like cinnamon, clove, and nutmeg.',
          'Rum::Overproof': 'Unaged or blended rum with alcohol content usually exceeding 50% ABV.',
          'Rum::Aged/Vintage': 'Specially aged for years to develop deeper complexity.',
          'Brandy::Cognac': 'A protected, double-distilled grape brandy from the Cognac region of France.\n\nLabel terms on Cognac\n\n- VS: youngest spirit aged at least 2 years\n- VSOP: at least 4 years\n- XO: at least 10 years',
          'Brandy::Armagnac': 'A French grape brandy, usually single-distilled in a column still, with deep and rustic fruit flavors.',
          'Brandy::Calvados': 'A French brandy distilled from apple and pear cider.',
          'Brandy::Pisco': 'A clear, unaged or rested grape brandy produced in Peru and Chile.',
          'Brandy::Brandy de Jerez': 'A Spanish brandy aged in sherry casks using the dynamic solera system.',
          'Brandy::Fruit Brandies (Eau-de-Vie)': 'Unaged distillates made from fruits like cherries, plums, and apples.',
          'Brandy::Grappa': 'An Italian pomace brandy distilled from leftover grape skins, seeds, and stems.',
          'Brandy::Other Brandy': 'A general grape or fruit brandy that does not belong to one of the protected regional categories.',
          'Vermouth::Vermouth, Sweet (Italian/Rosso)': 'Rich, sweet, spicy, with vanilla and caramel notes. Reddish-brown. Common in the Manhattan, Negroni, and Boulevardier.',
          'Vermouth::Vermouth, Dry (French)': 'Crisp, herbal, lightly bitter, and low in sweetness. Pale straw. Common in the Martini, Bamboo, and cooking.',
          'Vermouth::Vermouth, Extra Dry': 'Very dry with minimal sweetness. Pale. Used for very dry Martinis.',
          'Vermouth::Vermouth, Bittersweet': 'Balanced sweetness with pronounced bitter herbs, citrus peel, gentian, and spice. Amber to deep red. Use sweet vermouth plus aromatic bitters as a practical substitute; start with 1–2 dashes per ounce and adjust to taste.',
          'Vermouth::Vermouth, Rosé': 'Fruity and floral with balanced sweetness. Pink. Common in spritzes and modern cocktails.',
          'Vermouth::Vermouth, Bianco (Blanc)': 'Sweeter than dry and lighter than rosso, with floral and vanilla notes. Pale gold. Served over ice or used in spritzes and lighter cocktails.',
          'Vermouth::Vermouth, Ambrato (Amber)': 'Herbal with honey, dried fruit, and spice. Amber. Suited to sipping and specialty cocktails.',
          'Wine::Red': 'Made from dark-colored grapes fermented with their skins, giving red wines color, structure, and tannins.',
          'Wine::White': 'Produced from green or yellow grapes, typically without skin contact. Ranges from crisp and dry to rich and creamy.',
          'Wine::Rosé': 'Made with brief red grape skin contact, creating a pink hue and a light red-fruit profile.',
          'Wine::Sparkling': 'Traps carbon dioxide during fermentation for effervescence, including Champagne and Prosecco.',
          'Wine::Aromatized/Aperitif': 'A wine-based aperitif flavored with botanicals, fruit, or quinine. Refrigerate after opening.',
          'Wine::Dessert/Fortified Wine': 'Typically sweet, rich wines such as Port or Sherry that are often fortified with extra alcohol.',
          'Flavorings::Bitter, Aromatic': 'Aromatic cocktail bitters built around warming spice, roots, bark, and herbs, including Angostura and Peychaud\'s.',
          'Flavorings::Bitter, Orange': 'Citrus-led bitters that add concentrated orange peel, spice, and dryness.',
          'Flavorings::Bitter, Other': 'A specialty cocktail bitter outside the aromatic and orange families.',
          'Flavorings::Juice, Pineapple': 'Prepared pineapple juice kept refrigerated for cocktail mixing.',
          'Flavorings::Syrup, Sugar': 'A bottled simple or sugar syrup used to balance acidity and alcohol in cocktails.',
          'Flavorings::Syrup, Honey': 'A prepared honey syrup that blends smoothly into cold drinks.',
          'Flavorings::Syrup, Grenadine': 'A pomegranate-based red syrup used for sweetness, fruit, and color.',
          'Flavorings::Syrup, Agave Nectar': 'Agave nectar or syrup used as a sweetener, especially in agave-spirit cocktails.',
          'Flavorings::Syrup, Orgeat': 'An almond-based syrup, often with orange flower or rose water, used in tropical cocktails such as the Mai Tai.',
          'Flavorings::Syrup, Demerara': 'A rich sugar syrup made with Demerara sugar, with deeper molasses and caramel notes than simple syrup.',
          'Flavorings::Syrup, Other': 'A prepared cocktail syrup outside the named sugar, honey, grenadine, agave, orgeat, and Demerara categories.',
          'Beer::Ales': 'Fermented warmer with top-fermenting yeast, generally creating fuller, fruitier, more complex flavors.',
          'Beer::Lagers': 'Cold-fermented with bottom-fermenting yeast, typically crisp, clean, and smooth.',
          'Beer::Cider/Mead': 'Hard cider is fermented from apples, while mead is fermented from honey.',
          'Beer::Specialty/Sour': 'Unique or mixed-fermentation beers that break traditional ale and lager molds.'
        };
        const FRUIT_LIQUEUR_SUBTYPES = ['Fruit, Apricot','Fruit, Blackcurrant','Fruit, Blackberry','Fruit, Cherry','Fruit, Orange','Fruit, Passion Fruit','Fruit, Peach','Fruit, Raspberry','Fruit, Other'];
        const FRUIT_LIQUEUR_MATCHERS = [
          ['Fruit, Orange', ['cointreau','triple sec','curacao','grand marnier','orange liqueur']],
          ['Fruit, Cherry', ['maraschino','sangue morlacco','cherry liqueur','cherry brandy','kirsch']],
          ['Fruit, Apricot', ['apricot liqueur','apricot brandy']],
          ['Fruit, Blackcurrant', ['blackcurrant','cassis']],
          ['Fruit, Blackberry', ['blackberry','creme de mure']],
          ['Fruit, Passion Fruit', ['passion fruit','passoa']],
          ['Fruit, Peach', ['peach liqueur','peach brandy','peach schnapps']],
          ['Fruit, Raspberry', ['raspberry liqueur','chambord']],
          ['Fruit, Other', ['sour apple liqueur','apple liqueur','apple schnapps','apple pucker']]
        ];
        const fruitLiqueurSubtypeForName = (name) => {
          const text = String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
          if (/\b(?:puree|juice|syrup)\b/.test(text)) return '';
          return FRUIT_LIQUEUR_MATCHERS.find(([, tokens]) => tokens.some((token) => text.includes(token)))?.[0] || '';
        };
        const LIQUEUR_SUBTYPE_LABELS = {
          'Anise liqueurs': 'Anise Liqueur',
          'Bitter liqueurs': 'Bitter Liqueur',
          'Chocolate liqueurs': 'Chocolate Liqueur',
          'Coffee liqueurs': 'Coffee Liqueur',
          'Cream liqueurs': 'Cream Liqueur',
          'Floral liqueurs': 'Floral Liqueur',
          'Fruits liqueurs': 'Fruit Liqueur',
          'Fruit, Apricot': 'Fruit, Apricot Liqueur',
          'Fruit, Blackcurrant': 'Fruit, Blackcurrant Liqueur',
          'Fruit, Blackberry': 'Fruit, Blackberry Liqueur',
          'Fruit, Cherry': 'Fruit, Cherry Liqueur',
          'Fruit, Orange': 'Fruit, Orange Liqueur',
          'Fruit, Passion Fruit': 'Fruit, Passion Fruit Liqueur',
          'Fruit, Peach': 'Fruit, Peach Liqueur',
          'Fruit, Raspberry': 'Fruit, Raspberry Liqueur',
          'Fruit, Other': 'Fruit, Other Liqueur',
          'Herbs and Anise liqueurs': 'Herb and Anise Liqueur',
          'Herb, Brandy': 'Herb, Brandy Liqueur',
          'Herb, Anise': 'Herb, Anise Liqueur',
          'Herb, Mint': 'Herb, Mint Liqueur',
          'Herb, Other': 'Herb, Other Liqueur',
          'Nuts liqueurs': 'Nut Liqueur',
          'Other, Specialty': 'Other, Specialty Liqueur',
          'Whisk(e)y liqueurs': 'Whiskey Liqueur'
        };
        const LIQUEUR_BAR_SUBTYPES = [...FRUIT_LIQUEUR_SUBTYPES, 'Herb, Brandy', 'Herb, Anise', 'Herb, Mint', 'Herb, Other', 'Other, Specialty'];
        
        const FLAVOR_LED_LIQUEUR_SUBTYPES = new Set(['Chocolate liqueurs','Coffee liqueurs','Floral liqueurs','Nuts liqueurs']);
        const SUPERFINE_SUGAR = 'Sugar [Superfine]';
        const WHITE_SUGAR_INFO = 'White, preferably cane: cane sugar comes only from sugar cane, rather than sugar beets or a cane/beet blend. Taste and sweetness are essentially identical and the sugars can be used interchangeably, but cane sugar is slightly purer, caramelizes better, and contains fewer impurities.';
        const ORANGE_LIQUEUR_INFO = 'Triple sec is a category; Cointreau is a premium 40% ABV triple sec. Grand Marnier blends orange liqueur with Cognac, adding oak, vanilla, and richness.\n\nCointreau ↔ triple sec: substitute 1:1. Lower-proof triple sec may taste sweeter and less intensely orange; reduce other syrup to taste.\n\nCointreau → Grand Marnier: substitute 1:1 for a richer, heavier, less crisp drink.\n\nGrand Marnier → Cointreau: substitute 1:1 for a brighter, cleaner drink without Cognac richness.';
        const INGREDIENT_INFO = {
          'Cointreau': ORANGE_LIQUEUR_INFO,
          'Triple Sec': ORANGE_LIQUEUR_INFO,
          'Grand Marnier': ORANGE_LIQUEUR_INFO,
          'Honey Syrup': 'Mix 2 parts honey with 1 part warm water. A 2:1 honey-to-water ratio is the best all-purpose cocktail ratio.',
          'Lemonade, Sparkling': 'Mix together:\n\n- 2 oz lemon juice\n- 1–1½ oz simple syrup\n- 6–8 oz sparkling water',
          'Lime Cordial': 'Mix together:\n\n- 1 oz fresh lime juice\n- ½–¾ oz simple syrup',
          'Sugar Syrup [Rich]': 'Use a 2:1 sugar-to-water ratio. To enrich standard sugar syrup, add granulated sugar equal to the amount of sugar syrup and dissolve completely.',
          'Vermouth, Bittersweet': 'Use sweet vermouth plus aromatic bitters as a practical substitute. Start with 1–2 dashes of bitters per ounce of sweet vermouth and adjust to taste.',
          "Donn's Mix": "*Donn’s Mix: 2 parts of fresh yellow grapefruit and 1 part of cinnamon syrup\n\n- 1 cinnamon stick, crushed\n- 1/3 cup sugar\n- 1/3 cup water\n- Fresh grapefruit juice (2/3 Cups)\n\nCreate an infused simple syrup by heating cinnamon sticks, sugar and water. Bring to a boil, stirring until sugar is dissolved. Simmer for 2 minutes, then remove from heat and let sit for at least 2 hours before straining into a clean glass bottle. To finish making the mix, add 1 part of the syrup to 2 parts fresh grapefruit juice. Cover and keep refrigerated for up to 2 weeks.",
          'Seasoning To Taste': 'For the Vampiro: add salt and a few drops of hot pepper sauce to taste. Some versions also include Worcestershire sauce.',
          'Sugar [Powdered]': WHITE_SUGAR_INFO,
          'Sugar [White Cane]': WHITE_SUGAR_INFO,
          [SUPERFINE_SUGAR]: WHITE_SUGAR_INFO
        };
        const INGREDIENT_LABEL_OVERRIDES = {
          'Basil': 'Basil Leaves',
          'Champagne': 'Sparkling Wine [Champagne]',
          'Cold Brew': 'Coffee [Cold Brew]',
          'Cream of Coconut': 'Coconut Cream',
          'Cream Of Coconut': 'Coconut Cream',
          'Demerara Sugar': 'Sugar, Demerara',
          'Egg (White And Yolk)': 'Egg',
          'Egg White (Pasteurized)': 'Egg White',
          'Egg White (Pasteurised)': 'Egg White',
          'Espresso': 'Coffee [Espresso]',
          'Evaporated Milk': 'Milk, Evaporated',
          'Fernet-Branca': 'Herb, Other Liqueur [Fernet (Amaro, Italian)]',
          'Fresh Lemon Juice': 'Lemon Juice [Fresh]',
          'Fresh Squeezed Lemon Juice': 'Lemon Juice [Fresh]',
          'Heavy Cream': 'Cream [Heavy]',
          'Heavy/Double Cream': 'Cream [Heavy/Double]',
          'Hot Filter Coffee': 'Coffee',
          'Lemon (Fresh)': 'Lemon',
          'Lemon Peel': 'Lemon [Peel]',
          'Lemon Wheel': 'Lemon [Wheel]',
          'Lemon Juice [Fresh]': 'Lemon Juice [Fresh]',
          'Fresh Lime Juice': 'Lime Juice',
          'Fresh Lime': 'Lime Juice',
          'Lime (Fresh)': 'Lime',
          'Lillet Blanc': 'White Aromatized Wine [Lillet Blanc]',
          'Dry Gin': 'Gin, London Dry',
          'London Dry Gin': 'Gin, London Dry',
          'Mint': 'Mint Leaves',
          'Old Tom Gin': 'Old Tom Gin',
          'Orange Wheel': 'Orange',
          'Pinch Of Salt': 'Salt',
          'Pinch of Salt': 'Salt',
          'Powdered Sugar': 'Sugar [Powdered]',
          'Prosecco': 'Sparkling Wine [Prosecco]',
          'Simple Syrup': 'Sugar Syrup',
          'Sparking Lemonade': 'Lemonade, Sparkling',
          'Sparkling Lemonade': 'Lemonade, Sparkling',
          'Splash Water': 'Water',
          'Sugar Syrup (2:1)': 'Sugar Syrup [Rich]',
          'Sugar Syrup [2:1]': 'Sugar Syrup [Rich]',
          'Sugar Cube': 'Sugar',
          'Superfine Sugar': SUPERFINE_SUGAR,
          'Top Up With Soda Water': 'Soda Water',
          'Top Up With Soda (Club Soda) Water': 'Soda Water',
          'Vanilla Sugar': 'Sugar, Vanilla',
          'Sweet Vermouth Cinzano Rosso': 'Vermouth, Sweet (Italian/Rosso) [Cinzano Rosso]',
          'Sweet Red Vermouth': 'Vermouth, Sweet (Italian/Rosso)',
          'Sweet Vermouth': 'Vermouth, Sweet (Italian/Rosso)',
          'Italian Vermouth': 'Vermouth, Sweet (Italian/Rosso)',
          'Dry Vermouth': 'Vermouth, Dry (French)',
          'French Vermouth': 'Vermouth, Dry (French)',
          'Extra Dry Vermouth': 'Vermouth, Extra Dry',
          'Vermouth Extra Dry': 'Vermouth, Extra Dry',
          'Bittersweet Vermouth': 'Vermouth, Bittersweet',
          'Rosé Vermouth': 'Vermouth, Rosé',
          'Rose Vermouth': 'Vermouth, Rosé',
          'Bianco Vermouth': 'Vermouth, Bianco (Blanc)',
          'Blanc Vermouth': 'Vermouth, Bianco (Blanc)',
          'Ambrato Vermouth': 'Vermouth, Ambrato (Amber)',
          'Amber Vermouth': 'Vermouth, Ambrato (Amber)',
          'Vanilla Vodka': 'Flavored Vodka [Vanilla Vodka]',
          'Vodka Citron': 'Flavored Vodka [Vodka Citron]',
          'White Cane Sugar': SUPERFINE_SUGAR
        };
        const INGREDIENT_LINE_LABELS = {
          'Bitter Campari': 'Bitter Liqueur [Campari]',
          'Cherry Brandy Luxardo': 'Cherry Liqueur [Luxardo Cherry Brandy]',
          'Curacao': 'Orange Liqueur [Curacao]',
          'Donn’s Mix*': "Donn's Mix",
          'Fernet Branca': 'Herb, Other Liqueur [Fernet (Amaro, Italian)]',
          'Licor Amaretto': 'Almond Liqueur [Amaretto]',
          'Licor Frangelico': 'Hazelnut Nut Liqueur [Frangelico]',
          'Maraschino Luxardo': 'Cherry Liqueur [Luxardo Maraschino]',
          'Orange Curacao': 'Orange Liqueur [Orange Curacao]'
        };
    const SEED_CUSTOM_COCKTAILS = [
      {
        id: 'a-good-man', name: 'A Good Man', type: 'In the Wild', originalType: 'In the Wild',
        status: 'Custom', url: '', image: '', glassware: 'Rocks glass',
        baseLiquor: ['Brandy', 'Liqueurs'], ingredientCount: 3, makeTime: 3,
        dateAdded: 2026, dateRemoved: null,
        ingredients: ['1.5 oz Cognac [Gilles Brisson Cognac VS]', '0.75 oz Amaretto [Disaronno Amaretto]', '0.5 oz Frangelico'],
        ingredientNames: ['Cognac', 'Amaretto', 'Frangelico'],
        ingredientBottles: ['Gilles Brisson Cognac VS', 'Disaronno Amaretto', 'Frangelico'],
        method: ['Stir with ice for about 20–25 seconds, then strain over a large cube in a rocks glass.', 'Optionally express an orange peel over the drink; discard it or leave it in.'],
        garnish: 'Optional expressed orange peel; discard or leave in.',
        notes: [
          'Spirit-forward after-dinner drink. A softer, nuttier cousin of a French Connection.',
          'For a more dessert-like version: 1½ oz Cognac / ¾ oz Amaretto / ¾ oz Frangelico.',
          'For a drier, more sophisticated version: 2 oz Cognac / ½ oz Amaretto / ½ oz Frangelico.',
          'Discovered at The Valley Inn in Timonium, MD.'
        ],
        liqueurs: [
          {name: 'Amaretto', subtype: 'Nuts liqueurs', flavor: 'almond'},
          {name: 'Frangelico', subtype: 'Nuts liqueurs', flavor: 'hazelnut'}
        ],
        sourceNote: 'Discovered at The Valley Inn in Timonium, MD.'
      },
      {
        id: 'cookies-and-cream', name: 'Cookies and Cream', type: 'In the Wild', originalType: 'In the Wild',
        status: 'Custom', url: '', image: '', glassware: 'Unknown',
        baseLiquor: ['Whiskey', 'Liqueurs'], ingredientCount: 6, makeTime: 5,
        dateAdded: 2026, dateRemoved: null,
        ingredients: ['Monkey Shoulder', 'Licor 43', 'Cold Brew', 'Demerara', 'Orange', 'Clarified Oreo Milk'],
        ingredientNames: ['Monkey Shoulder', 'Licor 43', 'Cold Brew', 'Demerara', 'Orange', 'Clarified Oreo Milk'],
        method: [], garnish: '', notes: [], liqueurs: [],
        sourceNote: 'Logged in the field — details pending.'
      },
      {
        id: 'too-much-too-soon', name: 'Too Much, Too Soon', type: 'In the Wild', originalType: 'In the Wild',
        status: 'Custom', url: '', image: '', glassware: 'Unknown',
        baseLiquor: ['Whiskey', 'Brandy', 'Liqueurs', 'Wine'], ingredientCount: 6, makeTime: 5,
        dateAdded: 2026, dateRemoved: null,
        ingredients: ['Rye Whiskey', 'Apple Brandy', 'Cognac', 'Amaro Ciociaro', 'Madeira', 'Brown Sugar'],
        ingredientNames: ['Rye Whiskey', 'Apple Brandy', 'Cognac', 'Amaro Ciociaro', 'Madeira', 'Brown Sugar'],
        method: [], garnish: '', notes: ['A Barrel Aged cocktail.'], liqueurs: [],
        sourceNote: 'Had at Barley Swine (Austin, TX) — details pending.'
      }
    ];
    // Include the new bundled custom recipe even when a saved custom collection already exists.
    COCKTAILS.push(SEED_CUSTOM_COCKTAILS.find((cocktail) => cocktail.id === 'a-good-man'));
	    const LETTERS_LIQUOR_DATA = Array.isArray(window.LETTERS_LIQUOR_DATA) ? window.LETTERS_LIQUOR_DATA : [];
	    const cloneRecipeLines = (values) => Array.isArray(values) ? values.map((value) => String(value)) : [];
	    const LETTERS_LIQUOR_ASSET_ROOT = 'assets/letters-liquor';
	    const LETTERS_LIQUOR_THE_TITLES = new Set([9, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32]);
	    const lettersLiquorTitleSlug = (value) => String(value || '')
	      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
	      .replace(/&/g, ' AND ')
	      .replace(/[^a-z0-9]+/gi, '-')
	      .replace(/^-|-$/g, '')
	      .toUpperCase();
	    const lettersLiquorRecipeUrl = (entry) => {
	      const number = Number(entry.sourceNumber);
	      const title = `${LETTERS_LIQUOR_THE_TITLES.has(number) ? 'THE-' : ''}${lettersLiquorTitleSlug(entry.name)}`;
	      const time = String(entry.time || '').trim().replace(/\s+/g, '-');
	      const canonicalTime = number <= 4 ? time.replace(/^[a-z]+/i, (word) => word.toUpperCase()) : time;
	      return `https://lettersandliquor.com/${number}-${title}-${canonicalTime}`;
	    };
	    const lettersLiquorArtwork = (sourceNumber) => {
	      const number = String(sourceNumber).padStart(2, '0');
	      const root = `${LETTERS_LIQUOR_ASSET_ROOT}/cocktails/${number}`;
	      return {drink: `${root}-drink.jpg?v=${BUILD_VERSION}`, tabletop: `${root}-tabletop.jpg?v=${BUILD_VERSION}`, lettering: `${root}-lettering.jpg?v=${BUILD_VERSION}`};
	    };
	    const cloneLettersLiquorNotes = (notes) => ({
	      story: String(notes?.story || ''),
	      drink: String(notes?.drink || ''),
	      lettering: String(notes?.lettering || '')
	    });
	    const lettersLiquorEra = (sourceNumber) => {
	      if (sourceNumber <= 5) return 'Archaic';
	      if (sourceNumber <= 10) return 'Baroque';
	      if (sourceNumber <= 23) return 'Classic';
	      if (sourceNumber <= 28) return 'Prohibition';
	      if (sourceNumber <= 36) return 'War Years';
	      if (sourceNumber <= 42) return 'Dark Ages';
	      return 'Revival';
	    };
    const lettersLiquorSource = (entry) => ({
	      key: 'lnl', label: 'Letters & Liquor', era: lettersLiquorEra(entry.sourceNumber), time: entry.time, sourceNumber: entry.sourceNumber,
	      url: lettersLiquorRecipeUrl(entry),
	      ingredients: cloneRecipeLines(entry.ingredients),
	      ingredientNames: entry.custom?.ingredientNames?.slice() || cloneRecipeLines(entry.ingredients).map((line) => parseIngredientLine(line).name),
	      ingredientBottles: cloneRecipeLines(entry.custom?.ingredientBottles),
	      method: cloneRecipeLines(entry.method), garnish: String(entry.garnish || ''), glassware: String(entry.custom?.glassware || ''),
	      liqueurs: (entry.custom?.liqueurs || []).map((liqueur) => ({...liqueur})),
	      tags: cloneRecipeLines(entry.tags), notes: cloneLettersLiquorNotes(entry.notes), artwork: lettersLiquorArtwork(entry.sourceNumber), available: entry.ingredients.length > 0
    });
    const LETTERS_LIQUOR_CUSTOM_COCKTAILS = [];
    LETTERS_LIQUOR_DATA.forEach((entry) => {
      const source = lettersLiquorSource(entry);
      const existing = COCKTAILS.find((cocktail) => cocktail.id === entry.targetId);
      if (existing) {
        existing.lnlSource = source;
        return;
      }
      if (!entry.custom) return;
      const cocktail = {
        id: entry.targetId, name: entry.name, type: 'Custom', originalType: 'Custom', status: 'Custom',
        url: '', links: [], image: '', glassware: entry.custom.glassware || 'Unknown',
        baseLiquor: entry.custom.baseLiquor?.slice() || [], ingredientCount: source.ingredients.length, makeTime: Math.max(2, Math.min(8, source.method.length + 2)),
        dateAdded: 2026, dateRemoved: null, addedRemoved: `Letters & Liquor · ${entry.time}`,
        ingredients: source.ingredients.slice(), ingredientNames: source.ingredientNames.slice(), method: source.method.slice(),
        garnish: source.garnish, notes: [], liqueurs: (entry.custom.liqueurs || []).map((liqueur) => ({...liqueur})),
        sourceNote: `Letters & Liquor | ${entry.time}`, lnlSource: source
      };
      LETTERS_LIQUOR_CUSTOM_COCKTAILS.push(cocktail);
      COCKTAILS.push(cocktail);
    });
    const LETTERS_LIQUOR_SOURCE_BY_ID = new Map(LETTERS_LIQUOR_DATA.map((entry) => [entry.targetId, lettersLiquorSource(entry)]));
    
	    const DIFFORDS_DATA = Array.isArray(window.DIFFORDS_DATA) ? window.DIFFORDS_DATA : [];

const cloneDiffordsNotes = (notes) => ({
	      review: String(notes?.review || ''),
	      variant: String(notes?.variant || ''),
	      history: String(notes?.history || '')
	    });
	    DIFFORDS_DATA.forEach((entry) => {
	      const cocktail = COCKTAILS.find((item) => item.id === entry.id);
	      if (!cocktail) return;
	      cocktail.diffordsSource = {
	        ...entry,
	        ingredients: cloneRecipeLines(entry.ingredients).map(titleCaseDiffordsIngredientLine),
	        ingredientNames: cloneRecipeLines(entry.ingredientNames).map(titleCaseDiffordsIngredient),
	        ingredientBottles: cloneRecipeLines(entry.ingredientBottles).map(titleCaseDiffordsIngredient),
	        method: cloneRecipeLines(entry.method),
	        tags: cloneRecipeLines(entry.tags),
	        guide: {...(entry.guide || {})},
	        nutrition: {...(entry.nutrition || {})},
	        discerningDrinkers: entry.discerningDrinkers ? {...entry.discerningDrinkers} : null,
	        notes: cloneDiffordsNotes(entry.notes)
	      };
	      const facts = cocktail.diffordsSource.nutrition;
	      const hasFacts = [facts.calories, facts.standardDrinks, facts.abv, facts.proof, facts.pureAlcoholGrams]
	        .some((value) => value !== null && value !== undefined && value !== '');
	      if (!cocktail.nutrition && hasFacts) cocktail.nutrition = {...facts};
	    });
    SEED_CUSTOM_COCKTAILS.push(...LETTERS_LIQUOR_CUSTOM_COCKTAILS);
    const SPECIALTY_LIQUEUR_INGREDIENTS = [
      {pattern: /fernet/i, name: 'Fernet-Branca', flavor: 'herbs'},
      {pattern: /cynar/i, name: 'Cynar', flavor: 'herbs'},
      {pattern: /b[eé]n[eé]dictine/i, name: 'Bénédictine', flavor: 'herbs'},
      {pattern: /chart(?:reuse|ruse)/i, name: 'Chartreuse', flavor: 'herbal botanicals'},
      {pattern: /licor\s*43/i, name: 'Licor 43', flavor: 'vanilla, citrus, spice'},
      {pattern: /(?:dolin\s+)?gen[eé]p[yi]\s+(?:le\s+)?chamois/i, name: 'Dolin Genepy Le Chamois', flavor: 'alpine herbs, floral notes, gentle sweetness'}
    ];
    
    COCKTAILS.forEach(normalizeSpecialtyLiqueurIngredients);
    const BOOKMARK_SEED_IDS = ['boulevardier','bramble','brandy-crusta','casino','chartreuse-swizzle','french-connection','hanky-panky','manhattan','martinez','new-york-sour','paradise','remember-the-maine','stinger','tipperary','trinidad-sour','vesper','vieux-carre'];
    const GENRE_FILTERS = [
      {id: 'sour', label: 'Sour'},
      {id: 'bitter', label: 'Bitter'},
      {id: 'tropical', label: 'Tropical'},
      {id: 'dessert', label: 'Dessert'},
      {id: 'herbal', label: 'Herbal'},
      {id: 'sparkling', label: 'Sparkling'},
      {id: 'lowAbv', label: 'Low ABV'},
      {id: 'nonAlcoholic', label: 'Non-Alcoholic'}
    ];
    const MORE_STAT_FILTERS = [
      {id: 'custom', label: 'Custom'},
      {id: 'current', label: 'Current'},
      {id: 'legacy', label: 'Legacy'}
    ];
    const MORE_QUICK_FILTERS = [
      {id: 'allSpirit', label: 'All Spirit'},
      {id: 'spiritForward', label: 'Spirit Forward'}
    ];
    const LNL_ERA_FILTERS = [
      {id: 'lnlEraArchaic', label: 'Archaic', era: 'Archaic'},
      {id: 'lnlEraBaroque', label: 'Baroque', era: 'Baroque'},
      {id: 'lnlEraClassic', label: 'Classic Age', era: 'Classic'},
      {id: 'lnlEraProhibition', label: 'Prohibition', era: 'Prohibition'},
      {id: 'lnlEraWarYears', label: 'War Years', era: 'War Years'},
      {id: 'lnlEraDarkAges', label: 'Dark Ages', era: 'Dark Ages'},
      {id: 'lnlEraRevival', label: 'Revival', era: 'Revival'}
    ];
	    const LNL_ERA_HASHTAG_KEYS = new Set([
	      'archaic', 'baroque', 'classic', 'classic age', 'classicage', 'prohibition',
	      'war years', 'waryears', 'dark ages', 'darkages', 'renaissance', 'revival'
	    ]);
	    const LETTERS_LIQUOR_TITLE_IMAGE = `${LETTERS_LIQUOR_ASSET_ROOT}/0_Title_Cocktail_Lettering_Square_1600_c.jpg`;
	    const LETTERS_LIQUOR_GALLERY = [
	      {era: 'Archaic', label: 'Archaic Age', lettering: '1_Era_Archaic_Lettering_WhiteBorder_1600_c.jpg', tabletop: '1_Era_Archaic_Tabletop_1600_c.jpg'},
	      {era: 'Baroque', label: 'Baroque Age', lettering: '6_Era_Baroque_Lettering_WhiteBorder_1600_c.jpg', tabletop: '6_Era_Baroque_Tabletop_1600_c.jpg'},
	      {era: 'Classic', label: 'Classic Age', lettering: '11_Era_Classic_Lettering_WhiteBorder_1600_c.jpg', tabletop: '11_Era_Classic_Tabletop_1600_c.jpg'},
	      {era: 'Prohibition', label: 'Prohibition', lettering: '24_Era_Prohibition_Lettering_WhiteBorder_1600_c.jpg', tabletop: '24_Era_Prohibition_Tabletop_1600_c.jpg'},
	      {era: 'War Years', label: 'War Years', lettering: '29_Era_WarYears_Lettering_WhiteBorder_1600_c.jpg', tabletop: '29_Era_WarYears_Tabletop_1600_c.jpg'},
	      {era: 'Dark Ages', label: 'Dark Ages', lettering: '37_Era_DarkAges_Lettering_WhiteBorder_1600_c.jpg', tabletop: '37_Era_DarkAges_Tabletop_1600_c.jpg'},
	      {era: 'Revival', label: 'Revival', lettering: '43_Revival_Lettering_WhiteBorder_1600_c.jpg', tabletop: '43_Revival_Tabletop_1600_c.jpg'}
	    ].map((entry) => ({
	      ...entry,
	      lettering: `${LETTERS_LIQUOR_ASSET_ROOT}/${entry.lettering}`,
	      tabletop: `${LETTERS_LIQUOR_ASSET_ROOT}/${entry.tabletop}`
	    }));
    const IBA_TYPE_FILTERS = [
      {id: 'ibaUnforgettable', label: 'Unforgettable', type: 'The Unforgettables'},
      {id: 'ibaContemporary', label: 'Contemporary', type: 'Contemporary Classics'},
      {id: 'ibaNewEra', label: 'New Era', type: 'New Era Drinks'}
    ];
    const TITLE_QUICK_FILTERS = [
      {id: 'hof', label: 'HOF'},
      {id: 'toTry', label: 'Try'}
    ];
    const DIFFORDS_GUIDE_FILTERS = [
      {id: 'diffordsWeak', label: 'Weak', guideKey: 'strength', threshold: 3, comparison: 'max'},
      {id: 'diffordsStrong', label: 'Strong', guideKey: 'strength', threshold: 8, comparison: 'min'},
      {id: 'diffordsSweet', label: 'Sweet', guideKey: 'taste', threshold: 3, comparison: 'max'},
      {id: 'diffordsDrySour', label: 'Dry/Sour', guideKey: 'taste', threshold: 8, comparison: 'min'}
    ];
    const MORE_SOURCE_FILTERS = [
	      {id: 'lnl', label: 'L&L'},
      {id: 'iba', label: 'IBA'},
      ...IBA_TYPE_FILTERS.map((filter) => ({...filter, className: `iba-type-${filter.id === 'ibaUnforgettable' ? 'unforget' : filter.id === 'ibaContemporary' ? 'classic' : 'new-era'}`})),
      {id: 'diffords', label: "Difford's", className: 'source-diffords'},
      {id: 'liquor', label: 'Liquor.com', className: 'source-liquor'},
      ...DIFFORDS_GUIDE_FILTERS.map((filter) => ({...filter, className: 'source-diffords'}))
    ];
    const ALL_MORE_QUICK_FILTERS = [...MORE_SOURCE_FILTERS, ...MORE_QUICK_FILTERS];
    const ALL_QUICK_FILTERS = [...TITLE_QUICK_FILTERS, ...ALL_MORE_QUICK_FILTERS];
    const LNL_FILTER_IDS = new Set(['lnl', ...LNL_ERA_FILTERS.map((filter) => filter.id)]);
    const IBA_TYPE_FILTER_IDS = new Set(IBA_TYPE_FILTERS.map((filter) => filter.id));
    const GENRE_FILTER_IDS = new Set(GENRE_FILTERS.map((filter) => filter.id));
    const QUICK_FILTER_LABEL_MAP = new Map([
      ['toTry', 'Try'], ['favs', 'Favs'], ['myBar', 'My Bar'], ['lnl', 'L&L'], ['iba', 'IBA'], ['diffords', "Difford's"], ['liquor', 'Liquor.com'],
      ...TITLE_QUICK_FILTERS.map((filter) => [filter.id, filter.label]),
      ...DIFFORDS_GUIDE_FILTERS.map((filter) => [filter.id, filter.label]),
      ...LNL_ERA_FILTERS.map((filter) => [filter.id, filter.label]),
      ...IBA_TYPE_FILTERS.map((filter) => [filter.id, filter.label]),
      ...MORE_QUICK_FILTERS.map((filter) => [filter.id, filter.label]),
      ...GENRE_FILTERS.map((filter) => [filter.id, filter.label])
    ]);
    const STAT_FILTER_LABEL_MAP = new Map([
      ['neat', 'Neat'], ['custom', 'Custom'],
      ...MORE_STAT_FILTERS.map((filter) => [filter.id, filter.label])
    ]);
    const storedBookmarks = localStorage.getItem('cocktailBookmarks');
    const BAR_SUBTYPE_MIGRATIONS = {
      'Blended Scotch': 'Scotch, Blended',
      'Single Malt Scotch': 'Scotch, Single Malt',
      'Tennessee': 'American',
      'Islay Scotch': 'Scotch, Islay (Smokey)',
      'Island Scotch': 'Scotch, Islands (Skye)',
      'Scotch, Islands': 'Scotch, Islands (Skye)',
      'Scotch, Island (Skye)': 'Scotch, Islands (Skye)',
      'Scotch, Island (Orkney)': 'Scotch, Islands (Orkney)',
      'Scotch, Islay (Smoky)': 'Scotch, Islay (Smokey)'
    };
    const VERMOUTH_SUBTYPE_MIGRATIONS = {
      'Sweet (Rosso/Red)': 'Vermouth, Sweet (Italian/Rosso)',
      'Sweet (Italian/Rosso)': 'Vermouth, Sweet (Italian/Rosso)',
      'Sweet': 'Vermouth, Sweet (Italian/Rosso)',
      'Dry': 'Vermouth, Dry (French)',
      'Dry (French)': 'Vermouth, Dry (French)',
      'Extra Dry': 'Vermouth, Extra Dry',
      'Bittersweet': 'Vermouth, Bittersweet',
      'Rosé': 'Vermouth, Rosé',
      'Rose': 'Vermouth, Rosé',
      'Bianco (Blanc)': 'Vermouth, Bianco (Blanc)',
      'Amber (Ambrato)': 'Vermouth, Ambrato (Amber)',
      'Ambrato (Amber)': 'Vermouth, Ambrato (Amber)'
    };
    const bottleSearchText = (value) => String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
    const normalizeBottleBase = (base) => base === 'Bitters' ? 'Flavorings' : base;
    const FLAVORING_SUBTYPE_MIGRATIONS = {
      'Aromatic': 'Bitter, Aromatic',
      'Orange': 'Bitter, Orange',
      'Other': 'Bitter, Other',
      'Syrup': 'Syrup, Sugar'
    };
    const flavoringSubtypeForName = (name) => {
      const text = bottleSearchText(name);
      if (!text) return '';
      if (text.includes('falernum') || text === 'sweet spiced syrup') return 'Syrup, Other';
      if (text.includes('pineapple juice')) return 'Juice, Pineapple';
      if (text.includes('orange bitter')) return 'Bitter, Orange';
      if (['angostura','peychaud','aromatic bitter'].some((term) => text.includes(term))) return 'Bitter, Aromatic';
      if (text.includes('bitter')) return 'Bitter, Other';
      if (text.includes('honey syrup')) return 'Syrup, Honey';
      if (text.includes('grenadine')) return 'Syrup, Grenadine';
      if (text.includes('agave nectar') || text.includes('agave syrup')) return 'Syrup, Agave Nectar';
      if (text.includes('orgeat')) return 'Syrup, Orgeat';
      if (text.includes('demerara syrup') || text === 'demerara') return 'Syrup, Demerara';
      if (['simple syrup','sugar syrup'].includes(text) || text.startsWith('sugar syrup ') || text.includes('rich sugar syrup')) return 'Syrup, Sugar';
      if (text.includes('syrup')) return 'Syrup, Other';
      return '';
    };
    const normalizeBottleSubtype = (base, subtype, name = '') => {
      const normalizedBase = normalizeBottleBase(base);
      if (normalizedBase === 'Whiskey') return BAR_SUBTYPE_MIGRATIONS[subtype] || subtype;
      if (normalizedBase === 'Vermouth') return VERMOUTH_SUBTYPE_MIGRATIONS[subtype] || subtype;
      if (normalizedBase === 'Flavorings') {
        if (BASE_SUBTYPES.Flavorings.includes(subtype)) {
          if (subtype === 'Syrup, Other') return flavoringSubtypeForName(name) || subtype;
          return subtype;
        }
        const migrated = FLAVORING_SUBTYPE_MIGRATIONS[subtype] || '';
        if (migrated && !['Bitter, Other','Syrup, Sugar'].includes(migrated)) return migrated;
        return flavoringSubtypeForName(name) || migrated || subtype;
      }
      if (normalizedBase !== 'Liqueurs') return subtype;
      return canonicalLiqueurSubtype(name, subtype);
    };
    const normalizePantryIngredientName = (name) => {
      const genericName = String(name || '').trim().replace(/\s+\[[^\]]+\]$/, '').trim();
      const key = bottleSearchText(genericName);
      if (key === 'white peach puree') return 'White Peach Purée';
      if (key === 'pinch of salt') return 'Salt';
      if (key === 'donn s mix') return "Donn's Mix";
      if (key === 'basil') return 'Basil Leaves';
      if (['cold brew','espresso','hot filter coffee'].includes(key)) return 'Coffee';
      if (key === 'demerara sugar') return 'Sugar, Demerara';
      if (key === 'egg white and yolk') return 'Egg';
      if (['egg white pasteurized','egg white pasteurised'].includes(key)) return 'Egg White';
      if (key === 'cream of coconut') return 'Coconut Cream';
      if (key === 'evaporated milk') return 'Milk, Evaporated';
      if (['heavy cream','heavy double cream'].includes(key)) return 'Cream';
      if (['lemon fresh','lemon peel','lemon wheel'].includes(key)) return 'Lemon';
      if (key === 'lime fresh') return 'Lime';
      if (key === 'mint') return 'Mint Leaves';
      if (key === 'gengibre slice') return 'Ginger';
      if (key === 'orange wheel') return 'Orange';
      if (['sparking lemonade','sparkling lemonade'].includes(key)) return 'Lemonade, Sparkling';
      if (key === 'splash water') return 'Water';
      if (key.startsWith('top up with soda') && key.endsWith('water')) return 'Soda Water';
      if (key === 'vanilla sugar') return 'Sugar, Vanilla';
      if (['superfine sugar','super fine sugar','sugar superfine','sugar super fine','white cane sugar','sugar white cane','sugar white cane superfine'].includes(key)) return 'Sugar';
      return genericName;
    };
    const normalizeBottlePrice = (value) => {
      if (value === '' || value === null || value === undefined || (typeof value === 'string' && !value.trim())) return '';
      const price = Number(value);
      return Number.isFinite(price) && price >= 0 ? Math.round(price * 100) / 100 : '';
    };
    const normalizeBottleAbv = (value) => {
      if (value === '' || value === null || value === undefined) return '';
      const abv = Number(String(value).replace('%', '').trim());
      return Number.isFinite(abv) && abv >= 0 && abv <= 100 ? Math.round(abv * 10) / 10 : '';
    };
    const normalizeBottleStorage = (value) => ['bar','freezer','fridge'].includes(value) ? value : '';
    const normalizeExpirationMonths = (value) => {
      if (value === '' || value === null || value === undefined) return '';
      const months = Number(value);
      return Number.isFinite(months) && months > 0 ? Math.round(months * 4) / 4 : '';
    };
    const defaultBottleStorage = (base, subtype, name = '') => {
      const text = bottleSearchText(name);
      if (base === 'Vodka' || base === 'Gin') return 'freezer';
      if (base === 'Vermouth') return 'fridge';
      if (base === 'Wine' && (subtype === 'Aromatized/Aperitif' || subtype === 'Dessert/Fortified Wine' || ['sherry','port','madeira','lillet','dubonnet','wine aperitif'].some((term) => text.includes(term)))) return 'fridge';
      if (base === 'Flavorings' && ['Juice, Pineapple','Syrup, Sugar','Syrup, Honey','Syrup, Grenadine','Syrup, Orgeat','Syrup, Demerara'].includes(subtype)) return 'fridge';
      return 'bar';
    };
    const defaultExpirationMonths = (base, subtype, name = '') => {
      if (base === 'Vermouth') return 3;
      if (base === 'Liqueurs' && subtype === 'Cream liqueurs') return 24;
      if (base === 'Flavorings' && subtype === 'Juice, Pineapple') return 0.5;
      if (base === 'Flavorings' && subtype === 'Syrup, Honey') return 1;
      if (base === 'Flavorings' && subtype === 'Syrup, Orgeat') return 3;
      if (base === 'Flavorings' && ['Syrup, Sugar','Syrup, Grenadine','Syrup, Demerara'].includes(subtype)) return 12;
      return '';
    };
    const defaultBottleAbv = (base, subtype, value) => {
      const saved = normalizeBottleAbv(value);
      return saved === '' && base === 'Flavorings' && String(subtype || '').startsWith('Syrup,') ? 0 : saved;
    };
    const fixedFlavoringTaste = (base, subtype) => {
      if (base !== 'Flavorings') return '';
      if (String(subtype || '').startsWith('Syrup,')) return 'Sweet';
      if (String(subtype || '').startsWith('Bitter,')) return 'Bitter';
      return '';
    };
    const defaultBottleTaste = (base, subtype, value = '') => fixedFlavoringTaste(base, subtype) || (typeof value === 'string' ? value.trim() : '');
    const canonicalFlavoringBottleName = (name, subtype) => subtype === 'Syrup, Sugar' ? 'Sugar Syrup' : normalizePantryIngredientName(name);
    const bottleHas375mlOption = (_name, value = false) => value === true;
    const migrateBottleHas375mlOption = (name, value) => typeof value === 'boolean'
      ? value
      : bottleSearchText(name).includes('monkey 47');
    const migrateBarItem = (item) => {
      if (!item || typeof item !== 'object') return item;
      if (item.recommended === true && bottleSearchText(item.name) === 'st remy xo french brandy') {
        const replacement = RECOMMENDED_BOTTLES.find((bottle) => bottle.id === 'ferrand-1840');
        item = {
          ...item,
          name: replacement.name,
          base: replacement.base,
          subtype: replacement.subtype,
          price: replacement.price,
          totalWineLocation: '',
          totalWineUrl: replacement.url,
          country: replacement.country,
          abv: '',
          taste: replacement.taste
        };
      }
      if (item.kind === 'ingredient') {
        const ingredientName = normalizePantryIngredientName(item.name);
        const flavoringSubtype = flavoringSubtypeForName(ingredientName);
        if (!flavoringSubtype || flavoringSubtype.startsWith('Bitter,')) return {...item, name: ingredientName};
        return {
          ...item, kind: 'spirit', name: canonicalFlavoringBottleName(ingredientName, flavoringSubtype), base: 'Flavorings', subtype: flavoringSubtype, purpose: 'mixing', useInCocktails: false,
          notes: '', favorite: false, shoppingList: false, recommended: false, price: '', totalWineLocation: '', totalWineUrl: '',
          country: '', abv: 0, taste: defaultBottleTaste('Flavorings', flavoringSubtype), storage: defaultBottleStorage('Flavorings', flavoringSubtype, ingredientName), expirationMonths: defaultExpirationMonths('Flavorings', flavoringSubtype, ingredientName), has375ml: false
        };
      }
      const base = normalizeBottleBase(item.base);
      const subtype = normalizeBottleSubtype(base, item.subtype, item.name);
      const recommendation = RECOMMENDED_BOTTLES.find((bottle) => String(bottle.name).trim().toLowerCase() === String(item.name || '').trim().toLowerCase());
      const savedPrice = normalizeBottlePrice(item.price);
      const savedLocation = typeof item.totalWineLocation === 'string' ? item.totalWineLocation : '';
      const savedUrl = typeof item.totalWineUrl === 'string' ? item.totalWineUrl : '';
      const savedCountry = typeof item.country === 'string' ? item.country.trim() : '';
      const savedTaste = typeof item.taste === 'string' ? item.taste.trim() : '';
      const savedStorage = normalizeBottleStorage(item.storage);
      const standardStorage = defaultBottleStorage(base, subtype, item.name);
      const savedExpiration = normalizeExpirationMonths(item.expirationMonths);
      const standardExpiration = defaultExpirationMonths(base, subtype, item.name);
      return {
        ...item,
        base,
        subtype,
        purpose: item.purpose === 'sipping' ? 'sipping' : 'mixing',
        useInCocktails: item.useInCocktails === true,
        notes: typeof item.notes === 'string' ? item.notes : '',
        favorite: item.favorite === true,
        shoppingList: item.shoppingList === true,
	        recommended: item.recommended === true,
	        recommendationSourceId: typeof item.recommendationSourceId === 'string' ? item.recommendationSourceId : '',
        price: savedPrice === '' ? normalizeBottlePrice(recommendation?.price) : savedPrice,
        price375: normalizeBottlePrice(item.price375),
        totalWineLocation: savedLocation || recommendation?.location || '',
        totalWineUrl: savedUrl || recommendation?.url || '',
        country: savedCountry,
        abv: defaultBottleAbv(base, subtype, item.abv),
        taste: defaultBottleTaste(base, subtype, savedTaste),
        storage: base === 'Flavorings' && standardStorage === 'fridge' ? standardStorage : savedStorage || standardStorage,
        expirationMonths: base === 'Flavorings' && standardExpiration !== '' ? standardExpiration : savedExpiration || standardExpiration,
        has375ml: migrateBottleHas375mlOption(item.name, item.has375ml)
      };
    };
    const isFutureBarBottle = (bottle) => state.futureBarPreview === true && bottle.shoppingList === true;
    const bottleAllowsCocktailUse = (bottle) => bottle.purpose !== 'sipping' || bottle.useInCocktails === true;
    const isMixingBottle = (bottle) => bottle.kind !== 'ingredient'
      && ((bottle.shoppingList !== true && bottle.recommended !== true) || isFutureBarBottle(bottle))
      && bottleAllowsCocktailUse(bottle);
    const cocktailLookupBottle = (bottle) => {
      if (!bottle || bottle.kind === 'ingredient' || !bottleAllowsCocktailUse(bottle)) return null;
      if (bottle.recommended === true) return {...bottle, recommended: false, shoppingList: false};
      return isMixingBottle(bottle) ? bottle : null;
    };
    const sanitizeFriendRatingValue = (value) => {
      const rating = Math.round(Number(value) * 2) / 2;
      return Number.isFinite(rating) && rating >= 0.5 && rating <= 5 ? rating : 0;
    };

let storedFriendRatings = {};
    try { storedFriendRatings = sanitizeFriendRatings(JSON.parse(localStorage.getItem('cocktailFriendRatings') || '{}')); }
    catch (error) { storedFriendRatings = {}; }
    let storedCocktailGuides = {};
    try { storedCocktailGuides = sanitizeCocktailGuides(JSON.parse(localStorage.getItem('cocktailGuides') || '{}')); }
    catch (error) { storedCocktailGuides = {}; }
    const storedBar = JSON.parse(localStorage.getItem('cocktailBar') || '[]');
    const migratedBar = storedBar.map(migrateBarItem);
    const storedArchive = JSON.parse(localStorage.getItem('cocktailArchive') || '[]');
    const migratedArchive = storedArchive.map(migrateBarItem);
    const store = {
      customTypes: JSON.parse(localStorage.getItem('cocktailCustomTypes') || '[]'),
      assignments: JSON.parse(localStorage.getItem('cocktailTypeAssignments') || '{}'),
      notes: JSON.parse(localStorage.getItem('cocktailUserNotes') || '{}'),
      ratings: JSON.parse(localStorage.getItem('cocktailRatings') || '{}'),
      guides: storedCocktailGuides,
      friendRatings: storedFriendRatings,
      ratingView: localStorage.getItem('cocktailRatingView') === 'friends' ? 'friends' : 'mine',
      friendRatingsUnlocked: localStorage.getItem('cocktailFriendRatingsUnlocked') === 'true' || Object.keys(storedFriendRatings).length > 0 || DIFFORDS_DATA.some((entry) => entry.discerningDrinkers?.rating),
      bookmarks: storedBookmarks ? sanitizeBookmarks(JSON.parse(storedBookmarks)) : Object.fromEntries(BOOKMARK_SEED_IDS.map((id) => [id, true])),
      bar: migratedBar,
      archivedBar: migratedArchive,
      favoriteGenreFilters: JSON.parse(localStorage.getItem('cocktailFavoriteGenreFilters') || '[]').filter((id) => GENRE_FILTER_IDS.has(id)),
      customCocktails: JSON.parse(localStorage.getItem('cocktailCustomCocktails') || JSON.stringify(SEED_CUSTOM_COCKTAILS)),
      appNotes: localStorage.getItem('cocktailAppNotes') || '',
      glassware: JSON.parse(localStorage.getItem('cocktailGlassware') || '[]')
    };
    if (JSON.stringify(storedBar) !== JSON.stringify(migratedBar)) localStorage.setItem('cocktailBar', JSON.stringify(migratedBar));
    if (JSON.stringify(storedArchive) !== JSON.stringify(migratedArchive)) localStorage.setItem('cocktailArchive', JSON.stringify(migratedArchive));
    store.customCocktails = store.customCocktails.map(refreshBundledLettersLiquorCocktail);
    store.customCocktails.forEach(normalizeSpecialtyLiqueurIngredients);
    store.customCocktails.forEach((cocktail) => {
      const existingIndex = COCKTAILS.findIndex((item) => item.id === cocktail.id);
      if (existingIndex === -1) COCKTAILS.push(cocktail);
      else COCKTAILS[existingIndex] = {
        ...COCKTAILS[existingIndex], ...cocktail,
        lnlSource: COCKTAILS[existingIndex].lnlSource || cocktail.lnlSource,
        diffordsSource: COCKTAILS[existingIndex].diffordsSource || cocktail.diffordsSource,
        liquorSource: COCKTAILS[existingIndex].liquorSource || cocktail.liquorSource
      };
    });
        const state = {
          shoppingView: 'buy', shoppingCategory: 'all', shoppingPriceDescending: false,
          q: '', ingredientQ: '', sort: 'name', sortDirection: 'default', pantrySort: 'alpha', statFilter: 'all', expanded: new Set(), barExpandedBottle: '', barExpandedRecommendation: '', neatExpandedBottle: '', bottleUsageId: '', bottleUsageOverride: null, pendingRemoveBottleId: '',
	          futureBarPreview: false,
	          barRecommendationView: 'owned',
	          barGroupBySubtype: true,
	          barQ: '',
	          glasswareQ: '', glasswareSort: 'source', glasswareSortDirection: 'default', glasswareCondensed: false,
          barDraftDetails: {price: '', totalWineLocation: '', totalWineUrl: '', country: '', abv: '', taste: '', storage: '', expirationMonths: '', notes: '', fixedTaste: '', previewFields: []},
          collapsed: { type: true, base: true, glass: true, garnish: true, ingredient: true },
          servings: {}, recipeSource: {}, recipeSingle: new Set(),
          rating: { mode: 'any', value: 3, min: 2, max: 4 },
          types: new Set(), bases: new Set(), subtypes: new Set(), glasses: new Set(), garnishes: new Set(), ingredients: new Set(), quick: new Set()
        };
    const groceryBarBottles = () => store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.shoppingList === true);
    const neatPourBottles = () => store.bar.filter((bottle) => bottle.kind !== 'ingredient' && bottle.shoppingList !== true && bottle.purpose === 'sipping');
    const isCustomCocktail = (cocktail) => cocktail.status === 'Custom' || Object.prototype.hasOwnProperty.call(store.assignments, cocktail.id);
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const appHeader = $('header');
    const quickFilterBar = $('#topbarQuickFilterSlot');
    appHeader.after(quickFilterBar);
    quickFilterBar.after($('#genreMoreMenu'));
    const syncStickyHeaderHeight = () => {
      const headerHeight = appHeader.offsetHeight;
      document.documentElement.style.setProperty('--sticky-header-height', `${headerHeight}px`);
      document.documentElement.style.setProperty('--sticky-top', `${headerHeight + quickFilterBar.offsetHeight}px`);
    };
    const stickyHeaderObserver = new ResizeObserver(syncStickyHeaderHeight);
    stickyHeaderObserver.observe(appHeader);
    stickyHeaderObserver.observe(quickFilterBar);
    syncStickyHeaderHeight();
	    $('#lettersLiquorGalleryButton').innerHTML = __PHOTO;
    
    $('#filterSummaryToggle').addEventListener('click', () => {
      setFiltersVisible(!document.body.classList.contains('filters-visible'));
    });
    setFiltersVisible(false);
    [
      ['#resetFilters', 'C', 'Control+Alt+Shift+C'],
      ['#updateAppButton', 'R', 'Control+Alt+Shift+R'],
      ['#githubSyncButton', 'S', 'Control+Alt+Shift+S'],
      ['#addCocktailButton', 'A', 'Control+Alt+Shift+A'],
      ['#settingsButton', ',', 'Control+Alt+Shift+,'],
      ['#versionPill', 'V', 'Control+Alt+Shift+V'],
      ['#notesButton', 'N', 'Control+Alt+Shift+N'],
      ['#glasswareAddToggle', 'A', 'Control+Alt+Shift+A'],
      ['#glasswareExpandButton', 'E', 'Control+Alt+Shift+E'],
      ['#glasswareCondenseButton', 'C', 'Control+Alt+Shift+C'],
      ['#glasswareModalClose', 'Esc', 'Escape'],
	      ['#lnlGalleryClose', 'Esc', 'Escape'],
      ['#githubSyncNow', 'S', 'Control+Alt+Shift+S'],
      ['#cocktailFormSave', 'S', 'Control+Alt+Shift+S'],
      ['#cocktailFormClose', 'Esc', 'Escape'],
      ['#shoppingListModalClose', 'Esc', 'Escape'],
      ['#shoppingListBarButton', 'B', 'Control+Alt+Shift+B'],
      ['#archiveModalClose', 'Esc', 'Escape'],
      ['#removeBottleModalClose', 'Esc', 'Escape'],
      ['#versionModalClose', 'Esc', 'Control+Alt+Shift+Escape'],
      ['#githubSyncModalClose', 'Esc', 'Control+Alt+Shift+Escape'],
      ['#barRecommendationsToggle', 'V', 'Control+Alt+Shift+V'],
      ['#barShoppingListButton', 'G', 'Control+Alt+Shift+G'],
      ['#barModalClose', 'Esc', 'Escape'],
      ['[data-pantry-sort="alpha"]', 'A', 'Control+Alt+Shift+A'],
      ['[data-pantry-sort="usage"]', '1', 'Control+Alt+Shift+1']
    ].forEach(([selector, hint, keys]) => {
      const control = $(selector);
      control.dataset.shortcut = hint;
      control.setAttribute('aria-keyshortcuts', keys);
    });
    $('#updateAppButton').title = 'Update — check for updates and force refresh (Control+Option+Shift+R)';
    $('#lettersLiquorGalleryButton').title = 'Letters & Liquor gallery (G)';
    $('#glasswareButton').title = 'Drinkware (D)';
    $('#manageBarButton').title = 'Manage My Bar (B)';
    $('#archiveButton').title = 'Archive (E)';
    $('#shoppingListButton').title = 'Shopping List (P)';
    $('#addCocktailButton').title = 'Add cocktail (Control+Option+Shift+A)';
    $('#settingsButton').title = 'Settings (Control+Option+Shift+,)';
    $('#githubSyncButton').title = 'GitHub Sync (Control+Option+Shift+S)';
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    const norm = (value) => String(value ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
        
        const cocktailAlternateNames = (cocktail) => parseCocktailAlternateNames(cocktail?.alternateNames, cocktail?.name);

const classToken = (value) => norm(value).replace(/\s+/g, '-') || 'other';
        const slugify = (value) => norm(value).replace(/\s+/g, '-') || 'cocktail';

const escapeRegExp = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const titleWords = (value) => String(value || '').split(/\s+/).filter(Boolean).map((word) => {
          const lower = word.toLowerCase();
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        }).join(' ');
        const displayGlass = (glass) => titleWords(String(glass || '').replace(/\s+glass$/i, '').trim());
        const displayBaseLabel = (base) => BASE_DISPLAY_LABELS[base] || base;
        const textHas = (text, phrase) => text.includes(norm(phrase));
        const subtypeValue = (base, subtype) => `${base}::${subtype}`;
        const subtypeInfo = (base, subtype) => SUBTYPE_INFO[subtypeValue(base, subtype)] || (base === 'Liqueurs' ? `${liqueurTypeLabel(subtype)} is a sweetened spirit category grouped by its primary flavor family.` : '');
        const subtypeLabel = (base, subtype) => base === 'Liqueurs' ? liqueurTypeLabel(subtype).replace(/\s+Liqueur$/i, '') : subtype;
        const GARNISH_LABEL_OVERRIDES = {
          [norm('1/2 passion fruit')]: 'Passion Fruit',
          [norm('a red chili pepper')]: 'Red Chili Pepper',
          [norm('Few dashes of Amargo bitters on top as an aromatic garnish')]: 'Amargo Bitters',
          [norm('Few dashes of Amago bitters on top as an aromatic garnish')]: 'Amargo Bitters'
        };

const VULGAR_FRACTIONS = new Map([
	          ['1/2', '½'], ['1/3', '⅓'], ['2/3', '⅔'], ['1/4', '¼'], ['3/4', '¾'],
	          ['1/5', '⅕'], ['2/5', '⅖'], ['3/5', '⅗'], ['4/5', '⅘'], ['1/6', '⅙'],
	          ['5/6', '⅚'], ['1/8', '⅛'], ['3/8', '⅜'], ['5/8', '⅝'], ['7/8', '⅞']
	        ]);
	        const VULGAR_FRACTION_VALUES = new Map(Array.from(VULGAR_FRACTIONS, ([fraction, glyph]) => {
	          const [numerator, denominator] = fraction.split('/').map(Number);
	          return [glyph, numerator / denominator];
	        }));
	        const VULGAR_FRACTION_CHARS = Array.from(VULGAR_FRACTION_VALUES.keys()).join('');
	        const AMOUNT_VALUE_PATTERN = `(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:\\s+(?:\\d+[\\/⁄]\\d+|[${VULGAR_FRACTION_CHARS}]))?|\\d+[\\/⁄]\\d+|[${VULGAR_FRACTION_CHARS}]`;
	        const AMOUNT_PATTERN = `(${AMOUNT_VALUE_PATTERN})`;

const saveCustom = () => {
	      localStorage.setItem('cocktailCustomTypes', JSON.stringify(store.customTypes));
	      localStorage.setItem('cocktailTypeAssignments', JSON.stringify(store.assignments));
	      localStorage.setItem('cocktailUserNotes', JSON.stringify(store.notes));
	      localStorage.setItem('cocktailRatings', JSON.stringify(store.ratings));
	      localStorage.setItem('cocktailGuides', JSON.stringify(store.guides));
	      localStorage.setItem('cocktailFriendRatings', JSON.stringify(store.friendRatings));
	      localStorage.setItem('cocktailRatingView', store.ratingView);
	      localStorage.setItem('cocktailFriendRatingsUnlocked', String(store.friendRatingsUnlocked));
	      localStorage.setItem('cocktailBookmarks', JSON.stringify(store.bookmarks));
	      localStorage.setItem('cocktailBar', JSON.stringify(store.bar));
	      localStorage.setItem('cocktailArchive', JSON.stringify(store.archivedBar));
	      localStorage.setItem('cocktailFavoriteGenreFilters', JSON.stringify(store.favoriteGenreFilters));
	      localStorage.setItem('cocktailCustomCocktails', JSON.stringify(store.customCocktails));
	      localStorage.setItem('cocktailAppNotes', store.appNotes);
	      localStorage.setItem('cocktailGlassware', JSON.stringify(store.glassware));
	      if (typeof updateGitHubSyncButton === 'function') updateGitHubSyncButton();
	    };
    const displayType = (cocktail) => store.assignments[cocktail.id] || cocktail.type;

const COCKTAIL_RAW_SECTION_ALIASES = new Map([
      ['name', 'name'], ['title', 'name'], ['cocktail', 'name'],
      ['aka', 'aka'], ['also known as', 'aka'], ['alternate names', 'aka'],
      ['glass', 'glass'], ['glassware', 'glass'], ['prepare', 'prepare'], ['preparation', 'prepare'],
      ['ingredients', 'ingredients'], ['ingredient', 'ingredients'],
      ['how to make', 'how to make'], ['method', 'how to make'], ['instructions', 'how to make'], ['directions', 'how to make'],
      ['garnish', 'garnish'], ['review', 'review'], ['notes', 'review'], ['note', 'review'],
      ['history', 'history'], ['source', 'source'], ['source link', 'source'], ['links', 'source'],
      ['nutrition', 'nutrition'], ['nutrition facts', 'nutrition'], ['alcohol', 'alcohol content'], ['alcohol content', 'alcohol content'],
      ['strength and taste', 'strength and taste'], ['strength taste', 'strength and taste'], ['strength taste guide', 'strength and taste']
    ]);

const getMyRating = (cocktail) => Number(store.ratings[cocktail.id]) || 0;
    const DIFFORDS_FRIEND_NAME = 'Discerning Drinkers';

const getRating = (cocktail) => store.ratingView === 'friends' ? getFriendAverage(cocktail) : getMyRating(cocktail);

let friendRatingCocktailId = '';
    let editingFriendRatingName = '';

$('#shoppingListButton').innerHTML = __SHOPPING_LIST;
$('#shoppingAllToggle').innerHTML = __SHOPPING_ALL + 'All';
$('#shoppingSpiritsToggle').innerHTML = __SHOPPING_SPIRITS + 'Liquor &amp; Liqueurs';
$('#shoppingLiquorToggle').innerHTML = __SHOPPING_LIQUOR + 'Liquor Only';
    $('#barShoppingListButton').innerHTML = __BAG_FILL;
    $('#archiveButton').innerHTML = __ARCHIVEBOX_FILL;
    $('#notesButton').innerHTML = __LIST_CLIPBOARD_FILL;
    $('#glasswareButton').innerHTML = __WINEGLASS_FILL;
    $('#glasswareAddToggle').innerHTML = __PLUS_SQUARE_FILL;
    $('#glasswareExpandButton').innerHTML = __RECTANGLE_EXPAND_VERTICAL;
    $('#glasswareCondenseButton').innerHTML = __RECTANGLE_COMPRESS_VERTICAL;
    $('#barRecommendIcon').innerHTML = __LIGHTBULB_MAX_FILL;
    $('#barBottle375Icon').innerHTML = __ALIGN_VERTICAL_BOTTOM_FILL;

const unique = (items) => Array.from(new Set(items.filter(Boolean)));
    const TAG_FILTER_PREFIX = 'tag:';

const tagFilterId = (tag) => `${TAG_FILTER_PREFIX}${encodeURIComponent(tag)}`;
    const isTagFilterId = (id) => String(id || '').startsWith(TAG_FILTER_PREFIX);

const sourceNotesMarkup = (cocktail) => `${lettersLiquorNotesMarkup(cocktail)}${diffordsNotesMarkup(cocktail)}`;
    
    const ALL_SPIRIT_EXCLUDE_TOKENS = ['juice','soda','water','syrup','sugar','cordial','cream','milk','egg','puree','ginger','ginger ale','ginger beer','mint','basil','cola','coffee','cold brew','espresso','cloves','pepper','salt','seasoning','sauce','vanilla extract','olive brine','agave nectar','pineapple','tomato','donn','grenadine','orgeat','falernum','honey','fresh lime','fresh ginger','lemon wheel','orange wheel','lime','lemon'];
    const SPIRIT_FORWARD_EXCLUDE_TOKENS = ['juice','soda','cordial','cream','milk','egg','puree','ginger','ginger ale','ginger beer','mint','basil','cola','coffee','cold brew','espresso','cloves','pepper','seasoning','sauce','vanilla extract','agave nectar','pineapple','tomato','donn','orgeat','falernum','honey','fresh lime','fresh ginger','lemon wheel','orange wheel','lime','lemon'];
    const isAllAlcoholic = (names, excludeTokens) => names.length > 0 && names.every((name) => {
      const n = norm(name);
      return !excludeTokens.some((token) => n.includes(token));
    });
    const isAllSpirit = (cocktail) => isAllAlcoholic(cocktail.ingredientNames || [], ALL_SPIRIT_EXCLUDE_TOKENS);
    const isSpiritForward = (cocktail) => isAllAlcoholic(cocktail.ingredientNames || [], SPIRIT_FORWARD_EXCLUDE_TOKENS);
    
    const isNonAlcoholicIngredientName = (name) => {
      const n = norm(name);
      return ALL_SPIRIT_EXCLUDE_TOKENS.some((token) => n.includes(token));
    };
    const nonAlcoholicIngredientParts = (cocktail) => cocktail.ingredientNames
        .flatMap((rawName, index) => {
          const classification = inferBottleClassification(rawName);
          const include = (!classification || classification.base === 'Flavorings')
            && !cocktail.liqueurs.some((liqueur) => norm(liqueur.name) === norm(rawName))
            && (isNonAlcoholicIngredientName(rawName) || /falernum/i.test(rawName));
          if (!include) return [];
          const parts = ingredientDisplayParts(cocktail, index);
          return [{
            generic: normalizePantryIngredientName(parts.generic),
            specific: normalizeIngredientSpecific(parts.specific)
          }];
        })
        .filter((parts) => parts.generic);
    const nonAlcoholicIngredientTags = (cocktail) => unique(nonAlcoholicIngredientParts(cocktail).map((parts) => parts.generic));

const pantryIngredientTags = (cocktail) => unique(
      pantryRecipeVariants(cocktail)
        .flatMap(nonAlcoholicIngredientTags)
        .filter(Boolean)
    );
    const cocktailIngredientFilterTags = (cocktail) => unique(
      pantryRecipeVariants(cocktail).flatMap(ingredientTags)
    );

const NAMED_BOTTLE_EQUIVALENTS = [
      ['Orange Liqueur', 'Cointreau', 'Triple Sec', 'Orange Curaçao', 'Orange Curacao', 'Dry Curaçao', 'Dry Curacao', 'Grand Marnier'],
      ['Amaretto', 'Disaronno'],
      ['Maraschino Liqueur', 'Maraschino Luxardo', 'Luxardo Maraschino'],
      ['Cherry Brandy', 'Cherry Liqueur'],
      ['Peach Schnapps', 'Peach Liqueur'],
      ['Sour Apple Liqueur', 'Apple Liqueur', 'Apple Schnapps', 'Apple Pucker', 'DeKuyper Apple Pucker']
    ];

const BITTERSWEET_VERMOUTH = 'Vermouth, Bittersweet';
    const SWEET_VERMOUTH = 'Vermouth, Sweet (Italian/Rosso)';
    const barHasAngosturaBitters = () => store.bar.some((bottle) => bottleMatchesNamedBottle(bottle, 'Flavorings', 'Angostura Bitters'));
    
    const bottleMatchesFlavoring = (bottle, ingredientName) => {
      if (/falernum|sweet spiced syrup/.test(norm(ingredientName))) return isMixingBottle(bottle) && norm(bottle.name).includes('falernum');
      const subtype = flavoringSubtypeForName(ingredientName);
      const matchesSubtype = Boolean(subtype) && isMixingBottle(bottle) && bottle.base === 'Flavorings' && bottle.subtype === subtype;
      if (!matchesSubtype || norm(ingredientName) !== 'sugar syrup rich') return matchesSubtype;
      const richBottle = /(?:\brich\b|2\s*:\s*1)/i.test(String(bottle.name || ''));
      const hasGranulatedSugar = store.bar.some((item) => item.kind === 'ingredient' && norm(normalizePantryIngredientName(item.name)) === 'sugar');
      return richBottle || hasGranulatedSugar;
    };

let BASE_DOC_FREQ = getCounts(COCKTAILS, (cocktail) => cocktail.baseLiquor);
	    let INGREDIENT_DOC_FREQ = getCounts(COCKTAILS, ingredientTags);
	    
	    const RELATED_BASE_WEIGHT = 10;

const RECIPE_SOURCE_OPTIONS = [
	      {key: 'iba', label: 'IBA'},
	      {key: 'lnl', label: 'L&L'},
	      {key: 'diffords', label: "Difford's"},
	      {key: 'liquor', label: 'Liquor.com'}
	    ];

const RECIPE_SOURCE_SYMBOL_PATHS = {
	      diffords: 'M23.8232 4.26758L23.8232 19.5605C23.8232 22.3193 22.3145 23.8232 19.5264 23.8232L4.29199 23.8232C1.50879 23.8232 0 22.3291 0 19.5605L0 4.26758C0 1.49902 1.50879 0 4.29199 0L19.5264 0C22.3145 0 23.8232 1.50391 23.8232 4.26758ZM8.68652 5.95703C7.65625 5.95703 7.12891 6.55762 7.12891 7.6123L7.12891 16.0889C7.12891 17.1533 7.65137 17.7539 8.68652 17.7539L11.9922 17.7539C15.6299 17.7539 17.7002 15.6396 17.7002 11.8359C17.7002 8.07129 15.6543 5.95703 11.9922 5.95703ZM14.7412 11.8555C14.7412 14.375 13.6621 15.5615 11.5576 15.5615L9.92676 15.5615L9.92676 8.14941L11.5576 8.14941C13.6523 8.14941 14.7412 9.39941 14.7412 11.8555Z',
	      iba: 'M23.8232 4.26758L23.8232 19.5605C23.8232 22.3193 22.3145 23.8232 19.5264 23.8232L4.29199 23.8232C1.50879 23.8232 0 22.3291 0 19.5605L0 4.26758C0 1.49902 1.50879 0 4.29199 0L19.5264 0C22.3145 0 23.8232 1.50391 23.8232 4.26758ZM10.4248 7.49023L10.4248 16.2207C10.4248 17.2754 10.9766 17.9395 11.9678 17.9395C12.9639 17.9395 13.5254 17.29 13.5254 16.2207L13.5254 7.49023C13.5254 6.41113 12.9639 5.76172 11.9678 5.76172C10.9766 5.76172 10.4248 6.42578 10.4248 7.49023Z',
	      lnl: 'M23.8232 4.26758L23.8232 19.5605C23.8232 22.3193 22.3145 23.8232 19.5264 23.8232L4.29199 23.8232C1.50879 23.8232 0 22.3291 0 19.5605L0 4.26758C0 1.49902 1.50879 0 4.29199 0L19.5264 0C22.3145 0 23.8232 1.50391 23.8232 4.26758ZM8.06152 7.48535L8.06152 16.0303C8.06152 17.0947 8.61328 17.7539 9.60449 17.7539L15.2539 17.7539C16.0498 17.7539 16.5576 17.2998 16.5576 16.5186C16.5576 15.7568 16.0449 15.3076 15.2539 15.3076L11.167 15.3076L11.167 7.48535C11.167 6.41602 10.6006 5.76172 9.60449 5.76172C8.6084 5.76172 8.06152 6.4209 8.06152 7.48535Z',
	      other: 'M23.8232 4.26758L23.8232 19.5605C23.8232 22.3193 22.3145 23.8232 19.5264 23.8232L4.29199 23.8232C1.50879 23.8232 0 22.3291 0 19.5605L0 4.26758C0 1.49902 1.50879 0 4.29199 0L19.5264 0C22.3145 0 23.8232 1.50391 23.8232 4.26758ZM6.21094 11.8555C6.21094 15.6152 8.61816 18.0273 11.9727 18.0273C15.3271 18.0273 17.7393 15.6152 17.7393 11.8555C17.7393 8.09082 15.3271 5.67871 11.9727 5.67871C8.61816 5.67871 6.21094 8.09082 6.21094 11.8555ZM14.8389 11.8555C14.8389 14.2578 13.6719 15.708 11.9727 15.708C10.2783 15.708 9.10645 14.2578 9.10645 11.8555C9.10645 9.44336 10.2783 8.00293 11.9727 8.00293C13.6719 8.00293 14.8389 9.44336 14.8389 11.8555Z'
	    };

const FEATURES = [
	          'Search across name, type, base liquor, glassware, garnish, and ingredients',
	          'Filter by base liquor, garnish, ingredients, glassware, type, and rating, with sortable table columns',
	          'Star ratings from 0.5 to 5 in half-star steps, sortable and filterable above, below, or within a range',
	          'My Bar — track the spirits and ingredients you own, see what\'s Ready to Make, One Item Away, and your Neat Pours',
	          'Glassware — log the glasses you own, with type, brand, size, count, cost, and a product link',
	          'Shopping List, auto-built from what My Bar is missing, with a Future Bar preview toggle',
	          'GitHub Sync — back up and sync your data, with Download Latest available to restore the GitHub copy directly',
	          'Import and export a full JSON backup of your notes, ratings, and custom types',
	          'Custom cocktail types and per-cocktail type reassignment',
	          'Add your own cocktails, from a quick "In the Wild" log to a fully detailed recipe',
	          'Editable notes per cocktail, plus a standalone Notes page for freeform jotting',
	          'Adjustable servings with automatically scaled ingredient amounts',
	          'Related Cocktails — parent/child/cousin ingredient relationships plus broader similar-drink matches',
	          'Prioritize cocktails in a "To Try" list from 1–3, or leave them unranked',
	          'Expand and compare multiple cocktail recipes at the same time',
	          'Quick filter chips for Neat, Custom, To Try, Favs, and My Bar, plus All Spirit / Spirit Forward / HOF genre filters',
	          'Installable as a home screen app'
	        ];
	        const WISHLIST = [];
	        const RESOURCES = [
	          { label: 'GitHub — Home Bar Repository', url: 'https://github.com/themadat/home-bar' },
	          { label: 'IBA — All Official Cocktails', url: 'https://iba-world.com/cocktails/all-cocktails/' },
	          { label: 'Aaronson — Cocktails', url: 'https://aaronson.org/cocktails/' },
	          { label: 'Aaronson — I Drank Every Cocktail', url: 'https://aaronson.org/blog/i-drank-every-cocktail' }
	        ];

let glasswareEditingId = null;

const INSTALL_INSTRUCTIONS = {
	          iphone: [
	            'Open this page in Safari.',
	            'Tap the Share icon (square with an arrow pointing up) in the toolbar.',
	            'Scroll down and tap "Add to Home Screen".',
	            'Tap "Add" in the top-right corner.'
	          ],
	          ipad: [
	            'Open this page in Safari.',
	            'Tap the Share icon (square with an arrow pointing up) in the toolbar.',
	            'Tap "Add to Home Screen".',
	            'Tap "Add".'
	          ],
	          mac: [
	            'Open this page in Safari (macOS Sonoma or later).',
	            'Click the Share icon (square with an arrow pointing up) in the toolbar, or open the File menu.',
	            'Choose "Add to Dock".',
	            'Click "Add".'
	          ]
	        };

let cocktailIngredientCatalogCache = [];
	        let cocktailBottleCatalogCache = [];
	        let cocktailIngredientAliasCache = new Map();
	        let cocktailIngredientSpecificCache = new Map();
	        let cocktailAutoBases = new Set();

const GITHUB_SYNC_SETTINGS_KEY = 'cocktailGitHubSyncSettings';
	        const GITHUB_SYNC_TOKEN_KEY = 'cocktailGitHubSyncToken';
	        const GITHUB_SYNC_META_KEY = 'cocktailGitHubSyncMeta';
	        const HOME_BAR_STORAGE_KEYS = [
	          'cocktailCustomTypes', 'cocktailTypeAssignments', 'cocktailUserNotes', 'cocktailRatings', 'cocktailGuides', 'cocktailFriendRatings', 'cocktailRatingView',
	          'cocktailBookmarks', 'cocktailBar', 'cocktailArchive', 'cocktailFavoriteGenreFilters',
	          'cocktailCustomCocktails', 'cocktailAppNotes', 'cocktailGlassware'
	        ];

const GITHUB_SYNC_ICONS = {
	          setup: __LINK_ICLOUD_FILL,
	          clean: __CHECKMARK_ICLOUD_FILL,
	          upload: __ICLOUD_AND_ARROW_UP_FILL,
	          download: __ICLOUD_AND_ARROW_DOWN_FILL,
	          checking: __ARROW_TRIANGLEHEAD_2_CLOCKWISE_ROTATE_90_ICLOUD_FILL,
	          conflict: __EXCLAMATIONMARK_ICLOUD_FILL,
	          error: __XMARK_ICLOUD_FILL,
	          offline: __ICLOUD_SLASH_FILL
	        };
	        $('#importDataIcon').innerHTML = __SQUARE_AND_ARROW_DOWN;
	        $('#exportDataIcon').innerHTML = __SQUARE_AND_ARROW_UP;
	        $('#githubSyncNowIcon').innerHTML = __ARROW_TRIANGLEHEAD_2_CLOCKWISE_ROTATE_90;
	        $('#githubDownloadLatestIcon').innerHTML = __ICLOUD_AND_ARROW_DOWN_FILL;
	        const GITHUB_SYNC_CHECK_INTERVAL = 5 * 60 * 1000;
	        let githubSyncModalMode = 'sync';
	        let githubSyncBusy = false;
            let githubSyncOperation = '';
	        let githubSyncAutoCloseTimer = 0;
	        let githubSyncAutoCloseInterval = 0;
	        const githubSyncRuntime = {checking: false, remoteSha: '', remoteHash: '', remoteData: null, checkedAt: '', error: '', offline: false};

// Cloud status presentation mirrors app-template; reconciliation stays local to Home Bar.
        
        const TEMPLATE_CLOUD_STATES = {"upToDate": {"symbol": "checkmark.icloud", "kind": "success", "title": "Up to Date", "message": "This device is fully synchronized with GitHub.", "animation": "none"}, "syncing": {"symbol": "arrow.trianglehead.2.clockwise.rotate.90.icloud", "kind": "info", "title": "Syncing\u2026", "message": "Comparing this device with GitHub.", "animation": "rotate"}, "uploading": {"symbol": "icloud.and.arrow.up", "kind": "info", "title": "Uploading\u2026", "message": "Sending this device\u2019s data to GitHub.", "animation": "none"}, "downloading": {"symbol": "icloud.and.arrow.down", "kind": "info", "title": "Downloading\u2026", "message": "Retrieving the GitHub copy for this device.", "animation": "none"}, "pending": {"symbol": "icloud.dashed", "kind": "neutral", "title": "Waiting to Sync", "message": "Changes are queued for the next sync.", "animation": "none"}, "offline": {"symbol": "icloud.slash", "kind": "neutral", "title": "Offline", "message": "Reconnect before syncing. Local data remains available.", "animation": "none"}, "warning": {"symbol": "exclamationmark.icloud", "kind": "warning", "title": "Sync Needs Attention", "message": "Review the sync connection or choose which copy to use.", "animation": "none"}, "failed": {"symbol": "xmark.icloud", "kind": "danger", "title": "Sync Failed", "message": "The sync attempt failed. Retry or review the connection.", "animation": "none"}, "authenticationRequired": {"symbol": "key.icloud", "kind": "warning", "title": "Sign In Required", "message": "Enter or renew the GitHub access token in Settings.", "animation": "none"}};

const SYNC_CHANGE_DESCRIPTORS = [
	          ['bar', 'My Bar'], ['archivedBar', 'Archive'], ['glassware', 'Drinkware'],
	          ['customCocktails', 'Custom Cocktails'], ['notes', 'Cocktail Notes'], ['guides', 'Strength & Taste Guides'], ['ratings', 'My Ratings'], ['friendRatings', 'Friend Ratings'], ['ratingView', 'Rating View'],
	          ['bookmarks', 'Try Priorities'], ['typeAssignments', 'Type Assignments'],
	          ['customTypes', 'Custom Types'], ['favoriteGenreFilters', 'Favorite Filters'], ['appNotes', 'App Notes']
	        ];

let tryPriorityPress = null;
    let suppressTryPriorityClick = {id: '', until: 0};
    let friendRatingPress = null;
    let suppressFriendRatingClick = {id: '', until: 0};
    
    document.addEventListener('pointerdown', (event) => {
      const button = event.target.closest('[data-bookmark-id]');
      if (!button || event.button > 0) return;
      cancelTryPriorityPress();
      const press = {button, id: button.dataset.bookmarkId, x: event.clientX, y: event.clientY, timer: 0};
      press.timer = setTimeout(() => {
        suppressTryPriorityClick = {id: press.id, until: Date.now() + 800};
        showTryPriorityPopover(press.button);
        tryPriorityPress = null;
      }, 500);
      tryPriorityPress = press;
    });
    document.addEventListener('pointermove', (event) => {
      if (!tryPriorityPress) return;
      if (Math.hypot(event.clientX - tryPriorityPress.x, event.clientY - tryPriorityPress.y) > 10) cancelTryPriorityPress();
    });
    document.addEventListener('pointerup', cancelTryPriorityPress);
    document.addEventListener('pointercancel', cancelTryPriorityPress);
    document.addEventListener('contextmenu', (event) => {
      if (event.target.closest('[data-bookmark-id]')) event.preventDefault();
    });
    
    document.addEventListener('pointerdown', (event) => {
      const stars = event.target.closest('.stars[data-rating-id]');
      if (!stars || stars.classList.contains('readonly') || event.button > 0) return;
      cancelFriendRatingPress();
      const press = {id: stars.dataset.ratingId, x: event.clientX, y: event.clientY, timer: 0};
      press.timer = setTimeout(() => {
        suppressFriendRatingClick = {id: press.id, until: Date.now() + 900};
        openFriendRatings(press.id);
        friendRatingPress = null;
      }, 650);
      friendRatingPress = press;
    });
    document.addEventListener('pointermove', (event) => {
      if (!friendRatingPress) return;
      if (Math.hypot(event.clientX - friendRatingPress.x, event.clientY - friendRatingPress.y) > 8) cancelFriendRatingPress();
    });
    document.addEventListener('pointerup', cancelFriendRatingPress);
    document.addEventListener('pointercancel', cancelFriendRatingPress);
    document.addEventListener('contextmenu', (event) => {
      const stars = event.target.closest('.stars[data-rating-id]');
      if (!stars || stars.classList.contains('readonly')) return;
      event.preventDefault();
      suppressFriendRatingClick = {id: stars.dataset.ratingId, until: Date.now() + 900};
      openFriendRatings(stars.dataset.ratingId);
    });
    document.addEventListener('click', (event) => {
      const cocktailLinkButton = event.target.closest('[data-cocktail-links]');
      if (cocktailLinkButton) {
        event.preventDefault();
        event.stopPropagation();
        const isOpen = cocktailLinkButton.getAttribute('aria-expanded') === 'true';
        hideCocktailLinkPopover();
        if (!isOpen) showCocktailLinkPopover(cocktailLinkButton);
        return;
      }
      if (!event.target.closest('#cocktailLinkPopover')) hideCocktailLinkPopover();
      const tryPriorityOption = event.target.closest('[data-set-try-priority]');
      if (tryPriorityOption) {
        const id = $('#tryPriorityPopover').dataset.bookmarkId;
        setTryPriority(id, tryPriorityOption.dataset.setTryPriority);
        hideTryPriorityPopover();
        saveCustom();
        render();
        return;
      }
      if (!event.target.closest('#tryPriorityPopover') && !event.target.closest('[data-bookmark-id]')) hideTryPriorityPopover();
      const sortButton = event.target.closest('[data-table-sort]');
      if (sortButton) {
        cycleTableSort(sortButton.dataset.tableSort);
        renderTable();
        scheduleColumnWidthUpdate();
        return;
      }
      const statButton = event.target.closest('[data-stat-filter]');
      if (statButton) {
        const selected = statButton.dataset.statFilter;
        state.statFilter = selected === state.statFilter && selected !== 'all' ? 'all' : selected;
        if (statButton.closest('#genreMoreMenu')) {
          $('#genreMoreMenu').hidden = true;
          $('#genreMoreButton').setAttribute('aria-expanded', 'false');
        }
        render();
        const target = state.statFilter === 'neat' ? $('#neatPoursSection') : $('.table-wrap');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const infoButton = event.target.closest('[data-info]');
      if (infoButton) {
        event.preventDefault();
        event.stopPropagation();
        if (infoButton.getAttribute('aria-expanded') === 'true') hideInfoPopover();
        else showInfoPopover(infoButton);
        return;
      }
      if (event.target.closest('#infoPopover')) return;
      hideInfoPopover();
      if (!event.target.closest('#genreMoreMenu') && !event.target.closest('#genreMoreButton')) {
        $('#genreMoreMenu').hidden = true;
        $('#genreMoreButton').setAttribute('aria-expanded', 'false');
      }
      const genreMoreButton = event.target.closest('#genreMoreButton');
      if (genreMoreButton) {
        const willOpen = $('#genreMoreMenu').hidden;
        $('#genreMoreMenu').hidden = !willOpen;
        genreMoreButton.setAttribute('aria-expanded', String(willOpen));
        return;
      }
      const genreMoreClose = event.target.closest('#genreMoreClose');
      if (genreMoreClose) {
        $('#genreMoreMenu').hidden = true;
        $('#genreMoreButton').setAttribute('aria-expanded', 'false');
        $('#genreMoreButton').focus();
        return;
      }
      const favoriteGenre = event.target.closest('[data-favorite-genre]');
      if (favoriteGenre) {
        const id = favoriteGenre.dataset.favoriteGenre;
        if (store.favoriteGenreFilters.includes(id)) store.favoriteGenreFilters = store.favoriteGenreFilters.filter((item) => item !== id);
        else store.favoriteGenreFilters.push(id);
        saveCustom();
        render();
        return;
      }
      const recipeSourceButton = event.target.closest('[data-recipe-source]');
      if (recipeSourceButton) {
        state.recipeSource[recipeSourceButton.dataset.cocktailId] = recipeSourceButton.dataset.recipeSource;
        state.recipeSingle.add(recipeSourceButton.dataset.cocktailId);
        renderTable();
        return;
      }
      const recipeCompareButton = event.target.closest('[data-compare-recipes]');
      if (recipeCompareButton) {
        toggleSet(state.recipeSingle, recipeCompareButton.dataset.compareRecipes);
        renderTable();
        return;
      }
      const servingButton = event.target.closest('[data-serving-step]');
      if (servingButton) {
        const id = servingButton.dataset.cocktailId;
        const step = Number(servingButton.dataset.servingStep) || 0;
        state.servings[id] = Math.max(1, Math.min(99, servingCount(id) + step));
        renderTable();
        if (!$('#cocktailNotesOverlay').hidden && $('#cocktailNotesTextarea').dataset.noteId === id) {
          const notesCocktail = COCKTAILS.find((c) => c.id === id);
          if (notesCocktail) renderCocktailNotesIngredients(notesCocktail);
        }
        return;
      }
      const detailIngredient = event.target.closest('[data-detail-ingredient]');
      if (detailIngredient) {
        resetFilterState();
        state.ingredients.add(detailIngredient.dataset.detailIngredient);
        state.collapsed.ingredient = false;
        state.expanded.clear();
        render();
        $('.table-wrap')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      const collapseToggle = event.target.closest('[data-collapse-toggle]');
      if (collapseToggle) {
        const section = collapseToggle.dataset.collapseToggle;
        state.collapsed[section] = !state.collapsed[section];
        updateCollapsibleSections();
        return;
      }
      const pillButton = event.target.closest('.pill');
      if (pillButton) {
            const value = pillButton.dataset.value;
            if (pillButton.classList.contains('type')) toggleSet(state.types, value);
            if (pillButton.classList.contains('base') && !pillButton.classList.contains('subtype')) {
              toggleSet(state.bases, value);
              syncSubtypeFilters();
            }
            if (pillButton.classList.contains('subtype')) toggleSet(state.subtypes, value);
            if (pillButton.classList.contains('glass')) toggleSet(state.glasses, value);
            if (pillButton.classList.contains('garnish')) toggleSet(state.garnishes, value);
            if (pillButton.classList.contains('ingredient')) toggleSet(state.ingredients, value);
        render();
        return;
      }
      const quickChip = event.target.closest('[data-quick]');
      if (quickChip) {
        const quickId = quickChip.dataset.quick;
	        const insideLettersLiquorGallery = Boolean(quickChip.closest('#lnlGalleryOverlay'));
        if (quickId === 'myBar') state.bottleUsageId = '';
        if (!state.quick.has(quickId) && LNL_FILTER_IDS.has(quickId)) LNL_FILTER_IDS.forEach((id) => state.quick.delete(id));
        if (!state.quick.has(quickId) && IBA_TYPE_FILTER_IDS.has(quickId)) IBA_TYPE_FILTER_IDS.forEach((id) => state.quick.delete(id));
        toggleSet(state.quick, quickId);
        if (quickChip.closest('#genreMoreMenu')) {
          $('#genreMoreMenu').hidden = true;
          $('#genreMoreButton').setAttribute('aria-expanded', 'false');
        }
	        if (insideLettersLiquorGallery) closeLettersLiquorGallery();
        render();
	        if (insideLettersLiquorGallery) $('#cocktailListSection')?.scrollIntoView({behavior: 'smooth', block: 'start'});
        return;
      }
      const bookmarkButton = event.target.closest('[data-bookmark-id]');
      if (bookmarkButton) {
        const id = bookmarkButton.dataset.bookmarkId;
        if (suppressTryPriorityClick.id === id && Date.now() < suppressTryPriorityClick.until) {
          suppressTryPriorityClick = {id: '', until: 0};
          return;
        }
        hideTryPriorityPopover();
        cycleTryPriority(id);
        saveCustom();
        render();
        return;
      }
      const recommendedBottle = event.target.closest('[data-add-recommended]');
      if (recommendedBottle) {
        addRecommendedBottle(recommendedBottle.dataset.addRecommended);
        return;
      }
      const recommendedShoppingBottle = event.target.closest('[data-toggle-recommended-shopping]');
      if (recommendedShoppingBottle) {
        toggleRecommendedShopping(recommendedShoppingBottle.dataset.toggleRecommendedShopping);
        return;
      }
      const recommendationCocktails = event.target.closest('[data-filter-recommendation-cocktails]');
      if (recommendationCocktails) {
        showRecommendationCocktails(recommendationCocktails.dataset.filterRecommendationCocktails);
        return;
      }
      const shoppingRecommendationCocktails = event.target.closest('[data-shopping-recommendation-cocktails]');
      if (shoppingRecommendationCocktails) {
        showShoppingRecommendationCocktails(shoppingRecommendationCocktails.dataset.shoppingRecommendationCocktails);
        return;
      }
      const favoriteRecommendation = event.target.closest('[data-favorite-recommendation]');
      if (favoriteRecommendation) {
        toggleRecommendationFavorite(favoriteRecommendation.dataset.favoriteRecommendation);
        return;
      }
      const smallRecommendation = event.target.closest('[data-recommendation-small-size]');
      if (smallRecommendation) {
        toggleRecommendationSmallSize(smallRecommendation.dataset.recommendationSmallSize);
        return;
      }
      const bottleCocktails = event.target.closest('[data-filter-bottle-cocktails]');
      if (bottleCocktails) {
        showBottleCocktails(bottleCocktails.dataset.filterBottleCocktails);
        return;
      }
      const shoppingBottleCocktails = event.target.closest('[data-shopping-bottle-cocktails]');
      if (shoppingBottleCocktails) {
        const bottle = store.bar.find((item) => item.id === shoppingBottleCocktails.dataset.shoppingBottleCocktails);
        showShoppingBottleCocktails(bottle);
        return;
      }
      const shoppingBottle = event.target.closest('[data-toggle-bottle-shopping]');
      if (shoppingBottle) {
        toggleBottleShopping(shoppingBottle.dataset.toggleBottleShopping);
        return;
      }
      const favoriteBottle = event.target.closest('[data-favorite-bottle]');
      if (favoriteBottle) {
        toggleBottleFavorite(favoriteBottle.dataset.favoriteBottle);
        return;
      }
      const smallSizeBottle = event.target.closest('[data-bottle-small-size]');
      if (smallSizeBottle) {
        toggleBottleSmallSize(smallSizeBottle.dataset.bottleSmallSize);
        return;
      }
      const neatBottleDetails = event.target.closest('[data-toggle-neat-details]');
      if (neatBottleDetails) {
        const bottleId = neatBottleDetails.dataset.toggleNeatDetails;
        state.neatExpandedBottle = state.neatExpandedBottle === bottleId ? '' : bottleId;
        renderNeatPours();
        return;
      }
      const neatBottleRow = event.target.closest('[data-neat-bottle-row]');
      if (neatBottleRow && !event.target.closest('button, a, input, textarea, select, label')) {
        const bottleId = neatBottleRow.dataset.neatBottleRow;
        state.neatExpandedBottle = state.neatExpandedBottle === bottleId ? '' : bottleId;
        renderNeatPours();
        return;
      }
      const removeBottle = event.target.closest('[data-remove-bottle]');
      if (removeBottle) {
        requestRemoveBottle(removeBottle.dataset.removeBottle);
        return;
      }
      const editBottle = event.target.closest('[data-edit-bottle]');
      if (editBottle) {
        startEditBottle(editBottle.dataset.editBottle);
        return;
      }
      const editRecommendation = event.target.closest('[data-edit-recommendation]');
      if (editRecommendation) {
        startEditRecommendation(editRecommendation.dataset.editRecommendation);
        return;
      }
      const bottleDetails = event.target.closest('[data-toggle-bottle-details]');
      if (bottleDetails) {
        const bottleId = bottleDetails.dataset.toggleBottleDetails;
        state.barExpandedBottle = state.barExpandedBottle === bottleId ? '' : bottleId;
        renderBarList();
        return;
      }
      const barTagName = event.target.closest('.bar-tag-name');
      if (barTagName && barTagName.dataset.bottleId) {
        startEditBottle(barTagName.dataset.bottleId);
        return;
      }
      const recommendationRow = event.target.closest('[data-recommendation-row]');
      if (recommendationRow && !event.target.closest('button, a, input, textarea, select, label, [contenteditable="true"]')) {
        const recommendationId = recommendationRow.dataset.recommendationRow;
        if (state.barExpandedRecommendation === recommendationId) {
          state.barExpandedRecommendation = '';
          renderBarList();
        } else startEditRecommendation(recommendationId);
        return;
      }
      const bottleRow = event.target.closest('[data-bottle-row]');
      if (bottleRow && !event.target.closest('button, a, input, textarea, select, label, [contenteditable="true"]')) {
        const bottleId = bottleRow.dataset.bottleRow;
        state.barExpandedBottle = state.barExpandedBottle === bottleId ? '' : bottleId;
        state.barExpandedRecommendation = '';
        renderBarList();
        return;
      }
      const jumpCocktailBtn = event.target.closest('[data-jump-cocktail]');
      if (jumpCocktailBtn) {
        closeBarModal();
        jumpToCocktail(jumpCocktailBtn.dataset.jumpCocktail);
        return;
      }
      const remove = event.target.closest('[data-remove-type]');
      if (remove) {
        const type = remove.dataset.removeType;
        store.customTypes = store.customTypes.filter((item) => item !== type);
        Object.keys(store.assignments).forEach((id) => { if (store.assignments[id] === type) delete store.assignments[id]; });
        state.types.delete(type);
        saveCustom();
        render();
        return;
      }
      const starEl = event.target.closest('.star');
      if (starEl) {
        const starsWrap = starEl.closest('.stars');
        if (starsWrap && !starsWrap.classList.contains('readonly')) {
          const id = starsWrap.dataset.ratingId;
          if (suppressFriendRatingClick.id === id && Date.now() < suppressFriendRatingClick.until) {
            suppressFriendRatingClick = {id: '', until: 0};
            return;
          }
          if (store.ratingView === 'friends') {
            openFriendRatings(id);
            return;
          }
          const idx = Number(starEl.dataset.starIndex);
          const rect = starEl.getBoundingClientRect();
          const isHalf = (event.clientX - rect.left) < rect.width / 2;
          const newValue = isHalf ? idx - 0.5 : idx;
          const current = getMyRating({id});
          if (current === newValue) delete store.ratings[id];
          else store.ratings[id] = newValue;
          saveCustom();
          renderTable();
        }
        return;
      }
      const relatedButton = event.target.closest('[data-related-id]');
      if (relatedButton) {
        jumpToCocktail(relatedButton.dataset.relatedId);
        return;
      }
      const notePopout = event.target.closest('[data-popout-note]');
      if (notePopout) {
        openCocktailNotes(COCKTAILS.find((cocktail) => cocktail.id === notePopout.dataset.popoutNote));
        return;
      }
      const editButton = event.target.closest('[data-edit-cocktail-id]');
      if (editButton) {
        const target = COCKTAILS.find((c) => c.id === editButton.dataset.editCocktailId);
        if (target) openCocktailForm(target);
        return;
      }
      const row = event.target.closest('.summary-row');
      if (row) {
        toggleCocktailExpansion(row.dataset.id);
        renderTable();
      }
    });
    let shortcutHintsActive = false;
    // Native title tooltips cannot be resized; provide a readable shared hint.
    const hoverHint = document.createElement('div');
    hoverHint.className = 'hover-hint'; hoverHint.hidden = true; hoverHint.setAttribute('role', 'tooltip');
    document.body.appendChild(hoverHint);
    let hintTarget = null;
    let hintTitle = '';

document.addEventListener('pointerover', (event) => { if (event.pointerType === 'mouse') showHoverHint(event); });
    document.addEventListener('pointerout', (event) => { if (hintTarget && !hintTarget.contains(event.relatedTarget)) hideHoverHint(); });
    document.addEventListener('focusin', showHoverHint);
    document.addEventListener('focusout', hideHoverHint);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') hideHoverHint(); });
    document.addEventListener('scroll', hideHoverHint, true);
    document.addEventListener('click', hideHoverHint);

document.addEventListener('keydown', (event) => {
      refreshShortcutHints(shortcutModifiersHeld(event));
      if (runKeyboardShortcut(event)) return;
      const active = document.activeElement;
      const isEditable = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT' || active.isContentEditable);
      if (!event.repeat && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey && !isEditable && !anyModalOpen()) {
        const singleKeyControls = {
          g: $('#lettersLiquorGalleryButton'),
          d: $('#glasswareButton'),
          b: $('#manageBarButton'),
          e: $('#archiveButton'),
          p: $('#shoppingListButton')
        };
        const control = singleKeyControls[event.key.toLowerCase()];
        if (control && !control.disabled) {
          event.preventDefault();
          control.click();
          return;
        }
      }
      if (!event.ctrlKey && !event.metaKey && !event.altKey && event.key === '/') {
        if (!isEditable) {
          const glasswareOpen = !$('#glasswareModalOverlay').hidden;
          if (glasswareOpen) {
            event.preventDefault();
            const glasswareSearchInput = $('#glasswareSearch');
            glasswareSearchInput.focus();
            glasswareSearchInput.select();
          } else if (!anyModalOpen()) {
            event.preventDefault();
            const searchInput = $('#searchInput');
            searchInput.focus();
            searchInput.select();
          }
        }
      }
      if (event.key === 'Escape') {
	        hideInfoPopover(); hideTryPriorityPopover(); hideCocktailLinkPopover(); closeVersionModal(); closeNotesModal(); closeFriendRatings(); closeCocktailNotes(); closeGlasswareModal(); closeLettersLiquorGallery(); closeGitHubSyncModal(); closeShoppingListModal(); closeArchiveModal(); closeRemoveBottleModal(); closeCocktailForm(); closeBarModal(); closeInstallModal();
        $('#genreMoreMenu').hidden = true;
        $('#genreMoreButton').setAttribute('aria-expanded', 'false');
        refreshShortcutHints(shortcutModifiersHeld(event));
      }
      const row = event.target.closest && event.target.closest('.summary-row');
      if (row && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        toggleCocktailExpansion(row.dataset.id);
        renderTable();
      }
    });
    document.addEventListener('keyup', (event) => refreshShortcutHints(shortcutModifiersHeld(event)));
    window.addEventListener('blur', () => refreshShortcutHints(false));
    document.addEventListener('change', (event) => {
      const assign = event.target.closest('[data-assign-type]');
      if (assign) {
        const id = assign.dataset.assignType;
        if (assign.value) store.assignments[id] = assign.value;
        else delete store.assignments[id];
        saveCustom();
        render();
      }
    });
    $('#searchInput').addEventListener('input', (event) => { state.q = event.target.value; renderTable(); });
    $('#ingredientSearch').addEventListener('input', (event) => {
      state.ingredientQ = event.target.value;
      state.collapsed.ingredient = false;
      renderPills();
    });
	    $('#mobileAdvancedFiltersToggle').addEventListener('click', (event) => {
	      setMobileAdvancedFiltersExpanded(event.currentTarget.getAttribute('aria-expanded') !== 'true');
	    });
	    
	    $('#ratingModeSelect').addEventListener('change', (event) => {
	      state.rating.mode = event.target.value;
	      updateRatingFilterVisibility();
	      renderTable();
	    });
	    $('#ratingValueInput').addEventListener('input', (event) => { state.rating.value = Number(event.target.value) || 0; renderTable(); });
	    $('#ratingMinInput').addEventListener('input', (event) => { state.rating.min = Number(event.target.value) || 0; renderTable(); });
	    $('#ratingMaxInput').addEventListener('input', (event) => { state.rating.max = Number(event.target.value) || 0; renderTable(); });

$('#importData').addEventListener('click', () => $('#importFile').click());
	    $('#importFile').addEventListener('change', (event) => importUserDataFile(event.target.files[0]));
	    $('#exportData').addEventListener('click', exportUserData);
	    $('#resetFilters').addEventListener('click', resetSortAndFilters);
	    $('#versionPill').addEventListener('click', openVersionModal);
	    $('#versionModalClose').addEventListener('click', closeVersionModal);
	    $('#versionModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#versionModalOverlay')) closeVersionModal();
	    });
	    $('#notesButton').addEventListener('click', openNotesModal);
	    $('#notesModalClose').addEventListener('click', closeNotesModal);
	    $('#notesModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#notesModalOverlay')) closeNotesModal();
	    });
	    $('#ratingAudienceToggle').addEventListener('click', () => setRatingView(store.ratingView === 'friends' ? 'mine' : 'friends'));
	    $('#friendRatingsClose').addEventListener('click', closeFriendRatings);
	    $('#friendRatingsOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#friendRatingsOverlay')) closeFriendRatings();
	    });
	    $('#friendRatingForm').addEventListener('submit', saveFriendRating);
	    $$('.rating-view-option').forEach((button) => button.addEventListener('click', () => setRatingView(button.dataset.ratingView)));
	    $('#friendRatingList').addEventListener('click', (event) => {
	      const edit = event.target.closest('[data-edit-friend-rating]');
	      if (edit) {
	        const entry = (store.friendRatings[friendRatingCocktailId] || []).find((item) => item.name === edit.dataset.editFriendRating);
	        if (entry) {
	          editingFriendRatingName = entry.name;
	          $('#friendRatingName').value = entry.name;
	          $('#friendRatingValue').value = entry.rating;
	          $('#friendRatingName').focus();
	        }
	        return;
	      }
	      const remove = event.target.closest('[data-remove-friend-rating]');
	      if (remove) removeFriendRating(remove.dataset.removeFriendRating);
	    });
	    $('#cocktailNotesClose').addEventListener('click', closeCocktailNotes);
	    $('#cocktailNotesOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#cocktailNotesOverlay')) closeCocktailNotes();
	    });
	    $('#notesTextarea').addEventListener('input', () => {
	      store.appNotes = $('#notesTextarea').value;
	      saveCustom();
	    });
	    $('#jumpToNeatPours').addEventListener('click', () => $('#neatPoursSection').scrollIntoView({behavior: 'smooth', block: 'start'}));
	    $('#jumpToCocktails').addEventListener('click', () => {
	      const target = $('#myBarReadyHeader').hidden ? $('#cocktailListSection') : $('#myBarReadyHeader');
	      target.scrollIntoView({behavior: 'smooth', block: 'start'});
	    });
	    $('#glasswareButton').addEventListener('click', openGlasswareModal);
	    $('#glasswareModalClose').addEventListener('click', closeGlasswareModal);
	    $('#glasswareExpandButton').addEventListener('click', () => setGlasswareDensity(false));
	    $('#glasswareCondenseButton').addEventListener('click', () => setGlasswareDensity(true));
	    $('#glasswareModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#glasswareModalOverlay')) closeGlasswareModal();
	    });
	    $('#glasswareForm').addEventListener('submit', submitGlasswareForm);
	    $('#glasswareAddToggle').addEventListener('click', () => {
	      const form = $('#glasswareForm');
	      form.hidden = !form.hidden;
	      if (!form.hidden) requestAnimationFrame(() => $('#glasswareType').focus());
	    });
	    $('#glasswareFormCancel').addEventListener('click', () => {
	      resetGlasswareForm();
	      $('#glasswareForm').hidden = true;
	    });
	    $('#glasswareList').addEventListener('click', (event) => {
	      const editBtn = event.target.closest('[data-edit-glass]');
	      if (editBtn) { beginEditGlass(editBtn.dataset.editGlass); return; }
	      const saveBtn = event.target.closest('[data-save-glass]');
	      if (saveBtn) { saveEditGlass(saveBtn.dataset.saveGlass); return; }
	      const cancelBtn = event.target.closest('[data-cancel-glass-edit]');
	      if (cancelBtn) { cancelEditGlass(); return; }
	      const deleteBtn = event.target.closest('[data-delete-glass]');
	      if (deleteBtn) { deleteGlass(deleteBtn.dataset.deleteGlass); return; }
	      if (event.target.closest('a')) return;
	      const row = event.target.closest('tr[data-glass-id]');
	      if (row) beginEditGlass(row.dataset.glassId);
	    });
	    $('#glasswareList').addEventListener('keydown', (event) => {
	      if (!event.target.classList.contains('glassware-edit-input')) return;
	      if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); saveEditGlass(glasswareEditingId); }
	      else if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); cancelEditGlass(); }
	    });
	    $('#glasswareSearch').addEventListener('input', (event) => {
	      state.glasswareQ = event.target.value;
	      renderGlasswareList();
	    });
	    $('.glassware-table thead').addEventListener('click', (event) => {
	      const sortButton = event.target.closest('[data-glassware-sort]');
	      if (!sortButton) return;
	      cycleGlasswareSort(sortButton.dataset.glasswareSort);
	      renderGlasswareList();
	    });
	    
	    window.addEventListener('offline', refreshGitHubNetworkState);
	    window.addEventListener('online', refreshGitHubNetworkState);
	    $('#githubSyncButton').addEventListener('click', () => {
          if (!githubSyncBusy && !githubSyncRuntime.checking) openGitHubSyncModal('sync');
        });
	    $('#settingsButton').addEventListener('click', () => openGitHubSyncModal('settings'));
	    $('.settings-tabs').addEventListener('click', (event) => {
	      const tab = event.target.closest('[data-settings-tab]');
	      if (tab) setSettingsTab(tab.dataset.settingsTab);
	    });
	    $('.settings-tabs').addEventListener('keydown', (event) => {
	      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
	      const tabs = $$('[data-settings-tab]');
	      const currentIndex = tabs.indexOf(event.target.closest('[data-settings-tab]'));
	      if (currentIndex < 0) return;
	      event.preventDefault();
	      const nextIndex = event.key === 'Home' ? 0
	        : event.key === 'End' ? tabs.length - 1
	          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
	      setSettingsTab(tabs[nextIndex].dataset.settingsTab, true);
	    });
	    $('#lettersLiquorGalleryButton').addEventListener('click', openLettersLiquorGallery);
	    $('#lnlGalleryClose').addEventListener('click', closeLettersLiquorGallery);
	    $('#lnlGalleryOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#lnlGalleryOverlay')) closeLettersLiquorGallery();
	    });
	    $('#githubSyncModalClose').addEventListener('click', closeGitHubSyncModal);
	    $('#githubSyncModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#githubSyncModalOverlay')) closeGitHubSyncModal();
	    });
	    $('#githubSyncForm').addEventListener('submit', (event) => {
	      event.preventDefault();
	      synchronizeGitHubData();
	    });
	    $('#githubSyncForm').addEventListener('pointerdown', cancelSyncAutoClose);
	    $('#githubSyncForm').addEventListener('input', cancelSyncAutoClose);
	    $('#githubSyncSaveSettings').addEventListener('click', saveGitHubSyncSettingsOnly);
	    $('#githubSyncSeeChanges').addEventListener('click', showGitHubSyncChanges);
	    $('#githubSyncChangesClose').addEventListener('click', () => { $('#githubSyncChangesPanel').hidden = true; });
	    $('#githubDownloadLatest').addEventListener('click', downloadLatestGitHubData);
	    $('#githubSyncForget').addEventListener('click', forgetGitHubSync);
	    $('#githubSyncCloseAction').addEventListener('click', closeGitHubSyncModal);
	    $('#shoppingListButton').addEventListener('click', openShoppingListModal);
    [['shoppingBuyToggle', 'shoppingView', 'buy'], ['shoppingHaveToggle', 'shoppingView', 'have'], ['shoppingAllToggle', 'shoppingCategory', 'all'], ['shoppingSpiritsToggle', 'shoppingCategory', 'spirits'], ['shoppingLiquorToggle', 'shoppingCategory', 'liquor']].forEach(([id, key, value]) => {
      $('#' + id).addEventListener('click', () => { state[key] = value; renderShoppingList(); });
    });
    $('#shoppingPriceSort').addEventListener('click', () => { state.shoppingPriceDescending = !state.shoppingPriceDescending; renderShoppingList(); });
	    $('#shoppingListModalClose').addEventListener('click', closeShoppingListModal);
	    $('#shoppingListBarButton').addEventListener('click', () => {
	      closeShoppingListModal();
	      openBarModal();
	    });
	    $('#shoppingListModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#shoppingListModalOverlay')) closeShoppingListModal();
	    });
	    $('#archiveButton').addEventListener('click', openArchiveModal);
	    $('#archiveModalClose').addEventListener('click', closeArchiveModal);
	    $('#archiveModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#archiveModalOverlay')) closeArchiveModal();
	    });
	    $('#archiveItems').addEventListener('click', (event) => {
	      const restore = event.target.closest('[data-restore-bottle]');
	      if (restore) { restoreArchivedBottle(restore.dataset.restoreBottle); return; }
	      const deleteArchived = event.target.closest('[data-delete-archived-bottle]');
	      if (deleteArchived) deleteArchivedBottle(deleteArchived.dataset.deleteArchivedBottle);
	    });
	    $('#removeBottleModalClose').addEventListener('click', closeRemoveBottleModal);
	    $('#removeBottleCancel').addEventListener('click', closeRemoveBottleModal);
	    $('#removeBottleModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#removeBottleModalOverlay')) closeRemoveBottleModal();
	    });
	    $('#removeBottleArchive').addEventListener('click', () => {
	      const bottleId = state.pendingRemoveBottleId;
	      closeRemoveBottleModal();
	      if (bottleId) archiveBottle(bottleId);
	    });
	    $('#removeBottleDelete').addEventListener('click', () => {
	      const bottleId = state.pendingRemoveBottleId;
	      closeRemoveBottleModal();
	      if (bottleId) deleteBottlePermanently(bottleId);
	    });
	    $('#installAppButton').addEventListener('click', openInstallModal);
	    $('#installModalClose').addEventListener('click', closeInstallModal);
	    $('#installModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#installModalOverlay')) closeInstallModal();
	    });
	    $('.install-tabs').addEventListener('click', (event) => {
	      const tab = event.target.closest('.install-tab');
	      if (tab) renderInstallInstructions(tab.dataset.installPlatform);
	    });
	    $('#addCocktailButton').addEventListener('click', () => openCocktailForm());
	    $('#cocktailFormClose').addEventListener('click', closeCocktailForm);
	    $('#cocktailFormModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#cocktailFormModalOverlay')) closeCocktailForm();
	    });
	    $('#cocktailFormAddIngredient').addEventListener('click', () => addCocktailIngredientRow({}, true));
	    $('#cocktailFormGuide').addEventListener('input', (event) => {
	      const field = event.target.closest('[data-cocktail-form-guide]');
	      if (!field) return;
	      field.classList.remove('unrated');
	      const value = Math.max(0, Math.min(10, Math.round(Number(field.value))));
	      const scale = $(`[data-cocktail-form-guide-scale="${field.dataset.cocktailFormGuide}"]`, $('#cocktailFormGuide'));
	      Array.from(scale.children).forEach((tick, number) => tick.classList.toggle('active', number === value));
	    });
	    $('#cocktailFormGuide').addEventListener('click', (event) => {
	      if (!event.target.closest('[data-clear-cocktail-form-guide]')) return;
	      $$('[data-cocktail-form-guide]', $('#cocktailFormGuide')).forEach((field) => {
	        field.value = 5;
	        field.classList.add('unrated');
	      });
	      $$('[data-cocktail-form-guide-scale] span', $('#cocktailFormGuide')).forEach((tick) => tick.classList.remove('active'));
	    });
	    $('#cocktailFormRawInfo').addEventListener('input', (event) => {
	      event.currentTarget.dataset.smartAddFields = '';
	      renderCocktailRawPreview();
	    });
    $('#cocktailFormRawInfo').addEventListener('paste', (event) => {
      const pastedText = event.clipboardData?.getData('text/plain');
      if (!pastedText) return;
      event.preventDefault();
      event.currentTarget.value = pastedText;
      applyCocktailRawPaste(pastedText);
    });
	    $('#cocktailFormAddLink').addEventListener('click', () => addCocktailLinkRow({}, true));
	    $('#cocktailFormLinkRows').addEventListener('input', (event) => {
	      const row = event.target.closest('.cocktail-link-row');
	      if (!row) return;
	      if (event.target.matches('[data-cocktail-link-label]')) {
	        row.dataset.autoLinkLabel = 'false';
	        return;
	      }
	      if (!event.target.matches('[data-cocktail-link-url]')) return;
	      const labelInput = $('[data-cocktail-link-label]', row);
	      if (labelInput.value.trim() && row.dataset.autoLinkLabel !== 'true') return;
	      const inferred = cocktailLinkLabelFromUrl(event.target.value);
	      labelInput.value = inferred;
	      row.dataset.autoLinkLabel = String(Boolean(inferred));
	    });
	    $('#cocktailFormLinkRows').addEventListener('click', (event) => {
	      const removeButton = event.target.closest('[data-remove-cocktail-link]');
	      if (!removeButton) return;
	      removeButton.closest('.cocktail-link-row')?.remove();
	      if (!$('#cocktailFormLinkRows .cocktail-link-row')) addCocktailLinkRow();
	    });
	    $('#cocktailFormIngredientRows').addEventListener('click', (event) => {
	      const removeButton = event.target.closest('[data-remove-cocktail-ingredient]');
	      if (!removeButton) return;
	      removeButton.closest('.cocktail-ingredient-row')?.remove();
	      if (!$('#cocktailFormIngredientRows .cocktail-ingredient-row')) addCocktailIngredientRow();
	      updateCocktailIngredientSuggestions();
	      syncCocktailBasesFromIngredients();
	    });
	    $('#cocktailFormIngredientRows').addEventListener('input', (event) => {
	      if (!event.target.matches('[data-cocktail-ingredient-name], [data-cocktail-ingredient-specific]')) return;
	      event.target.setCustomValidity('');
	      if (event.target.matches('[data-cocktail-ingredient-name]')) {
	        const enteredValue = event.target.value;
	        const specificInput = $('[data-cocktail-ingredient-specific]', event.target.closest('.cocktail-ingredient-row'));
	        const suggestedSpecific = suggestedCocktailBottle(enteredValue);
	        if (suggestedSpecific && !specificInput.value.trim()) specificInput.value = suggestedSpecific;
	      }
	      syncCocktailBasesFromIngredients();
	    });
	    $('#cocktailFormIngredientRows').addEventListener('focusout', (event) => {
	      if (!event.target.matches('[data-cocktail-ingredient-amount]')) return;
	      event.target.value = normalizeCocktailIngredientAmount(event.target.value);
	    });
	    $('#cocktailFormIngredientRows').addEventListener('change', (event) => {
	      if (!event.target.matches('[data-cocktail-ingredient-name], [data-cocktail-ingredient-specific]')) return;
	      if (event.target.matches('[data-cocktail-ingredient-name]')) {
	        const enteredValue = event.target.value;
	        event.target.value = canonicalCocktailIngredientName(enteredValue);
	        const specificInput = $('[data-cocktail-ingredient-specific]', event.target.closest('.cocktail-ingredient-row'));
	        if (!specificInput.value.trim()) specificInput.value = suggestedCocktailBottle(enteredValue);
	      }
	      updateCocktailIngredientSuggestions();
	      syncCocktailBasesFromIngredients();
	    });
	    $('#cocktailForm').addEventListener('submit', submitCocktailForm);
	    $('#manageBarButton').addEventListener('click', openBarModal);
	    $('#barFuturePreview').addEventListener('change', (event) => {
	      state.futureBarPreview = event.target.checked;
	      state.bottleUsageId = '';
	      refreshBarModal();
	      render();
	    });
	    $('#neatPoursGrid').addEventListener('keydown', (event) => {
	      const row = event.target.closest('[data-neat-bottle-row]');
	      if (!row || event.target !== row || (event.key !== 'Enter' && event.key !== ' ')) return;
	      event.preventDefault();
	      const bottleId = row.dataset.neatBottleRow;
	      state.neatExpandedBottle = state.neatExpandedBottle === bottleId ? '' : bottleId;
	      renderNeatPours();
	    });
	    $('#barSummaryResults').addEventListener('click', () => {
	      closeBarModal();
	      state.bottleUsageId = '';
	      state.quick.add('myBar');
	      render();
	    });
	    $('#barSubtypeGroupToggle').addEventListener('click', () => {
	      state.barGroupBySubtype = !state.barGroupBySubtype;
	      state.barExpandedBottle = '';
	      state.barExpandedRecommendation = '';
	      renderBarList();
	    });
	    $('#barRecommendationsToggle').addEventListener('click', () => {
	      const recommendationViews = ['all', 'owned', 'recommended'];
	      const currentIndex = recommendationViews.indexOf(state.barRecommendationView);
	      state.barRecommendationView = recommendationViews[(currentIndex + 1) % recommendationViews.length];
	      state.barExpandedBottle = '';
	      state.barExpandedRecommendation = '';
	      renderBarList();
	    });
	    $('#barBottleSearch').addEventListener('input', (event) => {
	      state.barQ = event.target.value;
	      state.barExpandedBottle = '';
	      state.barExpandedRecommendation = '';
	      renderBarList();
	    });
	    $('#barShoppingListButton').addEventListener('click', () => {
	      closeBarModal();
	      openShoppingListModal();
	    });
	    $('#barModalClose').addEventListener('click', closeBarModal);
	    $('#barModalOverlay').addEventListener('click', (event) => {
	      if (event.target === $('#barModalOverlay')) closeBarModal();
	    });
	    $('.pantry-sort').addEventListener('click', (event) => {
	      const button = event.target.closest('[data-pantry-sort]');
	      if (!button) return;
	      state.pantrySort = button.dataset.pantrySort;
	      renderIngredientChecklist();
	    });
	    $('#barBottleBase').addEventListener('change', () => { updateBarSubtypeSelect(); renderBarDraftDetails(); });
	    $('#barBottleSubtype').addEventListener('change', renderBarDraftDetails);
	    $('#barBottleNeat').addEventListener('change', (event) => updateBarAddPurposeControls(event.target));
	    $('#barBottleCocktailUse').addEventListener('change', (event) => updateBarAddPurposeControls(event.target));
	    $('#barBottleRecommended').addEventListener('change', updateBarRecommendationControls);
	    $('#barBottleHas375ml').addEventListener('change', (event) => {
	      state.barDraftDetails.has375ml = event.target.checked;
	      renderBarDraftDetails();
	    });
	    $('#barBottleName').addEventListener('input', (event) => {
	      selectBottleClassification(event.target.value);
	      if (!event.target.value.trim()) state.barDraftDetails = emptyBarDraftDetails();
	      renderBarDraftDetails();
	    });
	    $('#barBottleName').addEventListener('paste', (event) => {
	      const pastedText = event.clipboardData?.getData('text/plain');
	      if (!pastedText) return;
	      const parsed = parseBottlePaste(pastedText);
	      if (!parsed.name) return;
	      event.preventDefault();
	      const match = store.bar.find((bottle) => bottle.kind !== 'ingredient' && bottle.recommended !== true && norm(bottle.name) === norm(parsed.name));
	      if (match) {
	        state.barExpandedBottle = match.id;
	        state.barExpandedRecommendation = '';
	        applyParsedBottleUpdate(match, parsed);
	        resetBarBottleForm(false);
	        return;
	      }
	      $('#barBottleName').value = parsed.name;
	      const nextDetails = {...state.barDraftDetails};
	      ['price', 'totalWineLocation', 'totalWineUrl', 'country', 'abv', 'taste'].forEach((field) => {
	        if (parsed[field] !== '' && parsed[field] !== undefined) nextDetails[field] = parsed[field];
	      });
	      if (parsed.has375ml) nextDetails.has375ml = true;
	      nextDetails.previewFields = parsed.previewFields;
	      state.barDraftDetails = nextDetails;
	      selectBottleClassification(parsed.name);
	      renderBarDraftDetails();
	    });
	    $('#barAddForm').addEventListener('submit', submitBarForm);
	    $('#barBottleList').addEventListener('paste', (event) => {
	      const pasteField = event.target.closest('[data-bottle-paste], [data-bottle-name]');
	      if (!pasteField) return;
	      const pastedText = event.clipboardData?.getData('text/plain');
	      const parsed = pastedText ? parseBottlePaste(pastedText) : null;
	      const bottleId = pasteField.dataset.bottlePaste || pasteField.dataset.bottleName;
	      const bottle = store.bar.find((item) => item.id === bottleId && item.kind !== 'ingredient');
	      if (!parsed?.name || !bottle) return;
	      event.preventDefault();
	      applyParsedBottleUpdate(bottle, parsed);
	    });
	    $('#barBottleList').addEventListener('change', (event) => {
	      const recommendationPurpose = event.target.closest('[data-recommendation-purpose]');
	      if (recommendationPurpose) {
	        setRecommendationPurpose(recommendationPurpose.dataset.recommendationPurpose, recommendationPurpose.checked);
	        return;
	      }
	      const recommendationCocktailUse = event.target.closest('[data-recommendation-cocktail-use]');
	      if (recommendationCocktailUse) {
	        setRecommendationCocktailUse(recommendationCocktailUse.dataset.recommendationCocktailUse, recommendationCocktailUse.checked);
	        return;
	      }
	      const bottleName = event.target.closest('[data-bottle-name]');
	      if (bottleName) {
	        const bottle = store.bar.find((item) => item.id === bottleName.dataset.bottleName);
	        if (!String(bottleName.value || '').trim()) bottleName.value = bottle?.name || '';
	        else updateInlineBottleName(bottleName.dataset.bottleName, bottleName.value);
	        return;
	      }
	      const bottleBase = event.target.closest('[data-bottle-base]');
	      if (bottleBase) {
	        updateInlineBottleClassification(bottleBase.dataset.bottleBase, bottleBase.value);
	        return;
	      }
	      const bottleSubtype = event.target.closest('[data-bottle-subtype]');
	      if (bottleSubtype) {
	        const bottle = store.bar.find((item) => item.id === bottleSubtype.dataset.bottleSubtype);
	        if (bottle) updateInlineBottleClassification(bottle.id, bottle.base, bottleSubtype.value);
	        return;
	      }
	      const storage = event.target.closest('[data-bottle-storage]');
	      if (storage) {
	        const bottle = store.bar.find((item) => item.id === storage.dataset.bottleStorage);
	        if (bottle) { bottle.storage = normalizeBottleStorage(storage.value) || 'bar'; saveCustom(); renderBarList(); }
	        return;
	      }
	      const expiration = event.target.closest('[data-bottle-expiration]');
	      if (expiration) {
	        renderBarList();
	        return;
	      }
	      const purpose = event.target.closest('[data-bottle-purpose]');
	      if (purpose) {
	        setBottlePurpose(purpose.dataset.bottlePurpose, purpose.checked);
	        return;
	      }
	      const cocktailUse = event.target.closest('[data-bottle-cocktail-use]');
	      if (cocktailUse) setBottleCocktailUse(cocktailUse.dataset.bottleCocktailUse, cocktailUse.checked);
	    });
	    $('#barIngredientChecklist').addEventListener('change', (event) => {
	      const toggle = event.target.closest('[data-ingredient-toggle]');
	      if (!toggle) return;
	      toggleBarIngredient(toggle.dataset.ingredientToggle, toggle.checked);
	    });
	    $('#barIngredientChecklist').addEventListener('click', (event) => {
	      const ingredient = event.target.closest('[data-pantry-ingredient]');
	      if (!ingredient) return;
	      showPantryIngredientCocktails(ingredient.dataset.pantryIngredient);
	    });
	    document.addEventListener('input', (event) => {
	      const bottlePrice = event.target.closest && event.target.closest('[data-bottle-price], [data-bottle-price375]');
	      if (bottlePrice) {
	        const bottle = store.bar.find((item) => item.id === (bottlePrice.dataset.bottlePrice || bottlePrice.dataset.bottlePrice375));
	        if (bottle) { bottle[bottlePrice.hasAttribute('data-bottle-price375') ? 'price375' : 'price'] = normalizeBottlePrice(bottlePrice.value); saveCustom(); syncBottleCompletenessIndicator(bottle); }
	        return;
	      }
	      const bottleLocation = event.target.closest && event.target.closest('[data-bottle-location]');
	      if (bottleLocation) {
	        const bottle = store.bar.find((item) => item.id === bottleLocation.dataset.bottleLocation);
	        if (bottle) { bottle.totalWineLocation = bottleLocation.value; saveCustom(); syncBottleCompletenessIndicator(bottle); }
	        return;
	      }
	      const bottleUrl = event.target.closest && event.target.closest('[data-bottle-url]');
	      if (bottleUrl) {
	        const bottle = store.bar.find((item) => item.id === bottleUrl.dataset.bottleUrl);
	        if (bottle) { bottle.totalWineUrl = bottleUrl.value.trim(); saveCustom(); }
	        return;
	      }
	      const bottleCountry = event.target.closest && event.target.closest('[data-bottle-country]');
	      if (bottleCountry) {
	        const bottle = store.bar.find((item) => item.id === bottleCountry.dataset.bottleCountry);
	        if (bottle) { bottle.country = bottleCountry.value.trim(); saveCustom(); syncBottleCompletenessIndicator(bottle); }
	        return;
	      }
	      const bottleAbv = event.target.closest && event.target.closest('[data-bottle-abv]');
	      if (bottleAbv) {
	        const bottle = store.bar.find((item) => item.id === bottleAbv.dataset.bottleAbv);
	        if (bottle) { bottle.abv = normalizeBottleAbv(bottleAbv.value); saveCustom(); syncBottleCompletenessIndicator(bottle); }
	        return;
	      }
	      const bottleTaste = event.target.closest && event.target.closest('[data-bottle-taste]');
	      if (bottleTaste) {
	        const bottle = store.bar.find((item) => item.id === bottleTaste.dataset.bottleTaste);
	        if (bottle) { bottle.taste = defaultBottleTaste(bottle.base, bottle.subtype, bottleTaste.value); bottleTaste.value = bottle.taste; saveCustom(); syncBottleCompletenessIndicator(bottle); renderNeatPours(); }
	        return;
	      }
	      const bottleExpiration = event.target.closest && event.target.closest('[data-bottle-expiration]');
	      if (bottleExpiration) {
	        const bottle = store.bar.find((item) => item.id === bottleExpiration.dataset.bottleExpiration);
	        if (bottle) { bottle.expirationMonths = normalizeExpirationMonths(bottleExpiration.value); saveCustom(); }
	        return;
	      }
	      const bottleNote = event.target.closest && event.target.closest('[data-bottle-note]');
	      if (bottleNote) {
	        const bottle = store.bar.find((item) => item.id === bottleNote.dataset.bottleNote);
	        if (bottle) { bottle.notes = bottleNote.value; saveCustom(); }
	        return;
	      }
	      const guide = event.target.closest && event.target.closest('[data-guide-id]');
	      if (guide) {
	        const id = guide.dataset.guideId;
	        const key = guide.dataset.guideKey;
	        const value = Math.max(0, Math.min(10, Math.round(Number(guide.value))));
	        store.guides[id] = {...(store.guides[id] || {}), [key]: value};
	        $$('[data-guide-id]').forEach((field) => {
	          if (field.dataset.guideId === id && field.dataset.guideKey === key) {
	            field.value = value;
	            field.classList.remove('unrated');
	          }
	        });
	        $$('[data-guide-scale]').forEach((scale) => {
	          if (scale.dataset.guideScale !== `${id}:${key}`) return;
	          Array.from(scale.children).forEach((tick, number) => tick.classList.toggle('active', number === value));
	        });
	        saveCustom();
	        return;
	      }
	      const note = event.target.closest && event.target.closest('[data-note-id]');
	      if (!note) return;
	      const id = note.dataset.noteId;
	      const value = note.value.trim();
	      if (value) store.notes[id] = value;
	      else delete store.notes[id];
	      $$('[data-note-id]').forEach((field) => {
	        if (field !== note && field.dataset.noteId === id) field.value = note.value;
	      });
	      saveCustom();
	    });
    const FIXED_COL_WIDTH = { photo: 42, availability: 10, recipe: 91, try: 56, rating: 94, ing: 66, time: 76, serving: 88 };
    const PRIORITY_COLS = ['cocktail', 'base', 'garnish', 'glass'];
    const PRIORITY_FLOOR = { cocktail: 180, base: 90, garnish: 89, glass: 120 };
    const PRIORITY_GROW_WEIGHT = { cocktail: 30, base: 20, garnish: 16, glass: 12 };

let resizeTimer = null;
    
    window.addEventListener('resize', () => { updateStickyTop(); scheduleColumnWidthUpdate(); });
    let observedTableWidth = Math.round($('.table-wrap').clientWidth);
    const tableWrapResizeObserver = new ResizeObserver((entries) => {
      const nextWidth = Math.round(entries[0]?.contentRect.width || 0);
      if (!nextWidth || nextWidth === observedTableWidth) return;
      observedTableWidth = nextWidth;
      scheduleColumnWidthUpdate();
    });
    const quickFilterWidthObserver = new ResizeObserver(fitResponsiveQuickFilters);
    quickFilterWidthObserver.observe($('#quickFilterScroll'));
    document.fonts.ready.then(fitResponsiveQuickFilters);
    tableWrapResizeObserver.observe($('.table-wrap'));
	    render();
	    applyColumnWidths();
	    setTimeout(() => checkGitHubSyncStatus(), 500);
	    setInterval(() => checkGitHubSyncStatus(), GITHUB_SYNC_CHECK_INTERVAL);
	    document.addEventListener('visibilitychange', () => {
	      if (document.visibilityState === 'visible') checkGitHubSyncStatus();
	    });
    // Header controls and release notices use device preferences, not the cloud data payload.
    (() => {
      
      
      const labels = {
        updateAppButton: 'Update',
        settingsButton: 'Settings', lettersLiquorGalleryButton: 'Gallery', notesButton: 'Notes',
        glasswareButton: 'Drinkware', manageBarButton: 'My Bar', archiveButton: 'Archive',
        shoppingListButton: 'Shopping', addCocktailButton: 'Add'
      };
      const singleKeyLabels = {
        lettersLiquorGalleryButton: 'G', glasswareButton: 'D', manageBarButton: 'B',
        archiveButton: 'E', shoppingListButton: 'P'
      };
      Object.entries(labels).forEach(([id, text]) => {
        const button = $('#' + id);
        button.classList.add('header-action');
        const icon = document.createElement('span');
        icon.className = 'button-icon';
        icon.setAttribute('aria-hidden', 'true');
        while (button.firstChild) icon.appendChild(button.firstChild);
        const label = document.createElement('span');
        label.className = 'button-label';
        const shortcut = singleKeyLabels[id];
        const shortcutIndex = shortcut ? text.toLowerCase().indexOf(shortcut.toLowerCase()) : -1;
        if (shortcutIndex >= 0) {
          label.append(document.createTextNode(text.slice(0, shortcutIndex)));
          const underlined = document.createElement('u');
          underlined.textContent = text[shortcutIndex];
          label.append(underlined, document.createTextNode(text.slice(shortcutIndex + 1)));
          button.setAttribute('aria-keyshortcuts', shortcut);
        } else {
          label.textContent = text;
        }
        button.append(icon, label);
      });
      updateStickyTop();

      const DURATION_KEY = 'homeBarWhatsNewDismissSeconds';
      const SEEN_KEY = 'homeBarSeenReleaseVersion';
      const banner = $('#whatsNewBanner');
      const durationInput = $('#whatsNewDismissSeconds');
      const updateButton = $('#updateAppButton');
      let releaseTimer = 0;
      let statusTimer = 0;
      let checking = false;
      let checkingBackground = false;
      let duration = 20;
      let seen = false;
      try {
        const stored = Number(localStorage.getItem(DURATION_KEY));
        if (Number.isInteger(stored) && stored >= 1 && stored <= 300) duration = stored;
        seen = localStorage.getItem(SEEN_KEY) === BUILD_VERSION;
      } catch { /* Preferences may be unavailable in a restricted browser. */ }
      durationInput.value = duration;
      $('#whatsNewVersion').textContent = 'v' + BUILD_VERSION;
      $('#whatsNewTitle').textContent = CURRENT_RELEASE.title;
      $('#whatsNewSummary').textContent = CURRENT_RELEASE.summary;
      $('#versionModalCurrentRelease').textContent = 'What’s New · ' + BUILD_VERSION;
      $('#versionModalCurrentChanges').replaceChildren(...CURRENT_RELEASE.changes.map((change) => {
        const item = document.createElement('li');
        item.textContent = change;
        return item;
      }));

      function showStatus(message) {
        clearTimeout(statusTimer);
        const status = $('#appUpdateStatus');
        status.textContent = message;
        status.hidden = false;
        statusTimer = setTimeout(() => { status.hidden = true; }, 8000);
      }
      function dismissRelease() {
        // Let keyboard users finish with the notice before auto-dismissal.
        if (banner.contains(document.activeElement)) {
          releaseTimer = setTimeout(dismissRelease, 1000);
          return;
        }
        clearTimeout(releaseTimer);
        seen = true;
        banner.hidden = true;
        try { localStorage.setItem(SEEN_KEY, BUILD_VERSION); } catch { /* Dismiss for this session. */ }
      }
      function renderRelease() {
        clearTimeout(releaseTimer);
        banner.hidden = seen;
        if (seen) return;
        banner.classList.remove('is-counting-down');
        banner.style.setProperty('--whats-new-duration', (duration * 1000) + 'ms');
        void banner.offsetWidth;
        banner.classList.add('is-counting-down');
        releaseTimer = setTimeout(dismissRelease, duration * 1000);
      }
      $('#whatsNewDismiss').addEventListener('click', () => {
        $('#versionPill').focus();
        dismissRelease();
      });
      $('#whatsNewDetails').addEventListener('click', () => {
        openVersionModal();
        $('#versionModalClose').focus();
        dismissRelease();
      });
      durationInput.addEventListener('change', () => {
        if (!durationInput.reportValidity()) return;
        const next = Number(durationInput.value);
        try {
          localStorage.setItem(DURATION_KEY, String(next));
          duration = next;
          renderRelease();
        } catch {
          durationInput.value = duration;
          showStatus('This browser could not save the What’s New setting.');
        }
      });

      function versionIsNewer(candidate) {
        const incoming = candidate.split('.').map(Number);
        const current = BUILD_VERSION.split('.').map(Number);
        for (let i = 0; i < 4; i++) {
          if (incoming[i] !== current[i]) return incoming[i] > current[i];
        }
        return false;
      }
      async function readAvailableRelease() {
        if (!/^https?:$/.test(location.protocol)) throw new Error('Open Home Bar through its website or local server to update.');
        if (navigator.onLine === false) throw new Error('Connect to the internet to update. Your local data is safe.');
        const target = new URL(location.href);
        target.searchParams.set('force-refresh', String(Date.now()));
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        try {
          const response = await fetch(target.href, {cache: 'no-store', signal: controller.signal});
          if (!response.ok) throw new Error('Could not check for updates. Please try again.');
          const html = await response.text();
          const version = html.match(/const BUILD_VERSION = '(\d+\.\d+\.\d+\.\d+)';/)?.[1];
          const document = new DOMParser().parseFromString(html, 'text/html');
          if (!version || document.title.trim() !== 'Home Bar') throw new Error('The server did not return Home Bar. Update was paused.');
          return {version, target};
        } finally { clearTimeout(timeout); }
      }
      function markAvailable(version) {
        const available = versionIsNewer(version);
        updateButton.dataset.updateAvailable = String(available);
        $('.button-icon', updateButton).innerHTML = available ? UPDATE_READY_ICON : UPDATE_APP_ICON;
        updateButton.title = (available ? 'Update available — install v' + version + ' and refresh' : 'Check for updates and force refresh') + ' (Control+Option+Shift+R)';
        updateButton.setAttribute('aria-label', available ? 'Update — new version available' : 'Update — check for updates and force refresh');
      }
      async function refreshApp() {
        if (checking) return;
        checking = true;
        updateButton.disabled = true;
        updateButton.setAttribute('aria-busy', 'true');
        let navigating = false;
        try {
          if (navigator.onLine === false) throw new Error('Connect to the internet to update. Your local data is safe.');
          try { saveCustom(); }
          catch { throw new Error('Your changes could not be saved. Update was paused to keep them safe.'); }
          const release = await readAvailableRelease();
          markAvailable(release.version);
          // Home Bar has no service worker. A fresh navigation bypasses the old HTML
          // URL; build-versioned script URLs load the deployed data files.
          location.replace(release.target.href);
          navigating = true;
        } catch (error) {
          showStatus(error.name === 'AbortError' ? 'The update check timed out. Please try again.' : error.message);
        } finally {
          if (!navigating) {
            checking = false;
            updateButton.disabled = false;
            updateButton.removeAttribute('aria-busy');
          }
        }
      }
      async function checkAvailableUpdate() {
        if (checking || checkingBackground || document.visibilityState === 'hidden') return;
        checkingBackground = true;
        try { markAvailable((await readAvailableRelease()).version); }
        catch { /* Background checks never interrupt the user. */ }
        finally { checkingBackground = false; }
      }
      updateButton.addEventListener('click', refreshApp);
      window.addEventListener('online', checkAvailableUpdate);
      renderRelease();
      // Check once per visit and periodically; new releases are indicated in the header.
      setTimeout(checkAvailableUpdate, 1000);
      setInterval(checkAvailableUpdate, 5 * 60 * 1000);
    })();

