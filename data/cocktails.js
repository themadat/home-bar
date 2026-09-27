// Bundled cocktail records. Search by id; avoid reading the whole dataset.
const COCKTAILS = [
  {
    "id": "alexander",
    "name": "Alexander",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/alexander/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-alexander-669491364f7f2.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "30 ml Cognac",
      "30 ml Crème de Cacao (Brown)",
      "30 ml Fresh Cream"
    ],
    "ingredientNames": [
      "Cognac",
      "Crème de Cacao",
      "Cream"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker filled with ice cubes.",
      "Shake and strain into a chilled cocktail glass."
    ],
    "garnish": "Sprinkle fresh ground nutmeg on top.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Crème de Cacao",
        "subtype": "Chocolate liqueurs",
        "flavor": "chocolate"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "americano",
    "name": "Americano",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/americano/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-americano-669490fe3cb42.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "30 ml Bitter Campari",
      "30 ml Sweet Red Vermouth",
      "A splash of Soda Water"
    ],
    "ingredientNames": [
      "Campari",
      "Sweet Red Vermouth",
      "Soda Water"
    ],
    "method": [
      "Mix the ingredients directly in an old fashioned glass filled with ice cubes.",
      "Add a splash of Soda Water. Stir gently."
    ],
    "garnish": "Garnish with half orange slice and a lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "angel-face",
    "name": "Angel Face",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/angel-face/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-angel-face-669490fe6df67.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "30 ml Gin",
      "30 ml Apricot Brandy",
      "30 ml Calvados"
    ],
    "ingredientNames": [
      "Gin",
      "Apricot Brandy",
      "Calvados"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker filled with ice cubes.",
      "Shake and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Apricot Brandy",
        "subtype": "Fruits liqueurs",
        "flavor": "apricot"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "aviation",
    "name": "Aviation",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/aviation/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-aviation-66949102296a4.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "45 ml Gin",
      "15 ml Maraschino Luxardo",
      "15 ml Lemon Juice [Fresh]",
      "1 Bar Spoon Crème de Violette"
    ],
    "ingredientNames": [
      "Gin",
      "Maraschino Liqueur",
      "Lemon Juice",
      "Crème De Violette"
    ],
    "method": [
      "Add all ingredients into a cocktail shaker.",
      "Shake with cracked ice and strain into a chilled cocktail glass."
    ],
    "garnish": "Optional Maraschino Cherry.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      },
      {
        "name": "Crème de Violette",
        "subtype": "Floral liqueurs",
        "flavor": "violet"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "bees-knees",
    "name": "Bee’s Knees",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/bees-knees/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-bees-knees-6695d397e26c1.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "52.5 ml Dry Gin",
      "2 teaspoons Honey Syrup",
      "22.5 ml Lemon Juice [Fresh]",
      "22.5 ml Fresh Orange Juice"
    ],
    "ingredientNames": [
      "Gin",
      "Honey Syrup",
      "Lemon Juice",
      "Orange Juice"
    ],
    "method": [
      "Stir honey with lemon and orange juices until it dissolves, add gin and shake with ice. Strain into a chilled cocktail glass."
    ],
    "garnish": "Optionally garnish with a lemon or orange zest.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "bellini",
    "name": "Bellini",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/bellini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-bellini-6695cda4217da.webp",
    "glassware": "Flute glass",
    "baseLiquor": [
      "Wine"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "100 ml Prosecco",
      "50 ml White Peach Puree"
    ],
    "ingredientNames": [
      "Prosecco",
      "White Peach Puree"
    ],
    "method": [
      "Pour peach puree into the mixing glass with ice, add the Prosecco wine.",
      "Stir gently and pour in a chilled flute glass."
    ],
    "garnish": "",
    "notes": [
      "Puccini – Fresh Mandarin Orange Juice; Rossini – Fresh Strawberry Puree; Tintoretto – Fresh Pomegranate Juice."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "between-the-sheets",
    "name": "Between the Sheets",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/between-the-sheets/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-between-the-sheets-669491023d7af.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum",
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "30 ml White Rum",
      "30 ml Cognac",
      "30 ml Triple Sec",
      "20 ml Lemon Juice [Fresh]"
    ],
    "ingredientNames": [
      "White Rum",
      "Cognac",
      "Triple Sec",
      "Lemon Juice"
    ],
    "method": [
      "Add all ingredients into a cocktail shaker.",
      "Shake with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "black-russian",
    "name": "Black Russian",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/black-russian/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-black-russian-6695cda4183dc.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "50 ml Vodka",
      "20 ml Coffee Liqueur"
    ],
    "ingredientNames": [
      "Vodka",
      "Coffee Liqueur"
    ],
    "method": [
      "Pour the ingredients into the old fashioned glass filled with ice cubes.",
      "Stir gently. strain ingredients into old fashioned glass filled with ice."
    ],
    "garnish": "",
    "notes": [
      "WHITE RUSSIAN – Float fresh cream on the top and stir in slowly."
    ],
    "liqueurs": [
      {
        "name": "Coffee Liqueur",
        "subtype": "Coffee liqueurs",
        "flavor": "coffee"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "bloody-mary",
    "name": "Bloody Mary",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/bloody-mary/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-bloody-mary-6695cda72fe0f.webp",
    "glassware": "Rocks glass",
    "baseLiquor": [
      "Vodka"
    ],
    "ingredientCount": 5,
    "makeTime": 3,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml Vodka",
      "90 ml Tomato Juice",
      "15 ml Lemon Juice [Fresh]",
      "2 dashes Worcestershire Sauce",
      "Tabasco, Celery Salt, Pepper (Up to taste)"
    ],
    "ingredientNames": [
      "Vodka",
      "Tomato Juice",
      "Lemon Juice",
      "Worcestershire Sauce",
      "Hot Sauce and Seasoning"
    ],
    "method": [
      "Stir gently all the ingredients in a mixing glass with ice, pour into rocks glass."
    ],
    "garnish": "Celery, lemon wedge (Optional).",
    "notes": [
      "If requested served with ice, pour into highball glass."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "boulevardier",
    "name": "Boulevardier",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/boulevardier/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-boulevardier-6694910552acd.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Whiskey",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml Bourbon or Rye Whiskey",
      "30 ml Bitter Campari",
      "30 ml Sweet Red Vermouth"
    ],
    "ingredientNames": [
      "Bourbon or Rye Whiskey",
      "Campari",
      "Sweet Red Vermouth"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes.",
      "Stir well. Strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with a orange zest, optionally a lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "bramble",
    "name": "Bramble",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/bramble/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-bramble-6695d398036e1.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "50 ml Gin",
      "25 ml Lemon Juice [Fresh]",
      "12.5 ml Sugar Syrup",
      "15 ml Crème de Mûre"
    ],
    "ingredientNames": [
      "Gin",
      "Lemon Juice",
      "Sugar Syrup",
      "Crème de Mûre"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker except the Crème de Mûre, shake well with ice, strain into chilled old fashioned glass filled with crushed ice, then pour the blackberry liqueur (Crème de Mûre) over the top of the drink, in a circular motion."
    ],
    "garnish": "Garnish optionally with a lemon slice and blackberries.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Crème de Mûre",
        "subtype": "Fruits liqueurs",
        "flavor": "blackberry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "brandy-crusta",
    "name": "Brandy Crusta",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/brandy-crusta/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-brandy-crusta-6694910571bcb.webp",
    "glassware": "Slim cocktail glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 6,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "52.5 ml Brandy",
      "7.5 ml Maraschino Luxardo",
      "1 Bar Spoon Curacao",
      "15 ml Lemon Juice [Fresh]",
      "1 Bar Spoon Simple Syrup",
      "2 Dashes Aromatic Bitters"
    ],
    "ingredientNames": [
      "Brandy",
      "Maraschino Liqueur",
      "Orange Curaçao",
      "Lemon Juice",
      "Simple Syrup",
      "Bitters"
    ],
    "method": [
      "Mix together all ingredients with ice cubes in a mixing",
      "glass and strain into a prepared slim cocktail glass."
    ],
    "garnish": "Rub a slice of orange (or lemon) around the rim of the glass and dip it in pulverized white sugar, so that the sugar will adhere to the edge of the glass. Carefully curling place the orange/lemon peel around the inside of the glass.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      },
      {
        "name": "Orange Curaçao",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "caipirinha",
    "name": "Caipirinha",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/caipirinha/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-caipirinha-6695cda74b13a.webp",
    "glassware": "Double old fashioned glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 5,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "60 ml Cachaça",
      "1 Lime cut into small wedges",
      "4 Teaspoons White Cane Sugar"
    ],
    "ingredientNames": [
      "Cachaça",
      "Lime",
      "White Cane Sugar"
    ],
    "method": [
      "Place lime and sugar into a double old fashioned glass and muddle gently.",
      "Fill the glass with cracked ice and add Cachaça. Stir gently to involve ingredients."
    ],
    "garnish": "",
    "notes": [
      "Caipiroska – Instead of Cachaça use Vodka; Caipirissima – Instead of Cachaça use Rum. Caipirão – Instead of Cachaça use Licor Beirão."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "canchanchara",
    "name": "Canchanchara",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/canchanchara/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-canchanchara-6695d39b24d7e.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 4,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "60 ml Cuban Aguardiente",
      "15 ml Fresh Lime Juice",
      "15 ml Raw Honey",
      "50 ml Water"
    ],
    "ingredientNames": [
      "Cuban Aguardiente",
      "Lime Juice",
      "Honey Syrup",
      "Water"
    ],
    "method": [
      "Mix honey with water and lime juice and spread the mixture on the bottom and sides of the glass.",
      "Add cracked ice, and then the rum.",
      "End by energetically stirring from bottom to top."
    ],
    "garnish": "Garnish with a lime wedge.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "cardinale",
    "name": "Cardinale",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/cardinale/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-cardinale-6695cdaa5f0d8.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "40 ml Gin",
      "20 ml Dry Vermouth",
      "10 ml Bitter Campari"
    ],
    "ingredientNames": [
      "Gin",
      "Dry Vermouth",
      "Campari"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes. Stir well.",
      "Strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with a lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "casino",
    "name": "Casino",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/casino/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-casino-6694910882cd6.webp",
    "glassware": "Rocks glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "40 ml Old Tom Gin",
      "10 ml Maraschino Luxardo",
      "10 ml Lemon Juice [Fresh]",
      "2 Dashes Orange Bitters"
    ],
    "ingredientNames": [
      "Old Tom Gin",
      "Maraschino Liqueur",
      "Lemon Juice",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into cocktails shaker, shake well with ice, strain",
      "into chilled rocks glass with ice."
    ],
    "garnish": "Garnish with a lemon zest and a maraschino cherry.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "champagne-cocktail",
    "name": "Champagne Cocktail",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/champagne-cocktail/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-champagne-cocktail-6695cdaa71bb2.webp",
    "glassware": "Large Champagne glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 3,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "90 ml Chilled Champagne",
      "10 ml Cognac",
      "2 dashes Angostura bitters",
      "Few drops of Grand Marnier (optional)",
      "1 sugar cube"
    ],
    "ingredientNames": [
      "Champagne",
      "Cognac",
      "Bitters",
      "Grand Marnier",
      "Sugar Cube"
    ],
    "method": [
      "Place the sugar cube with 2 dashes of bitters in a large Champagne glass, add the cognac.",
      "Pour gently chilled Champagne."
    ],
    "garnish": "Garnish with orange zest and maraschino cherry.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Grand Marnier",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "chartreuse-swizzle",
    "name": "Chartreuse Swizzle",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/chartreuse-swizzle/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-chartreuse-swizzle-6695d39b326e0.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "45 ml Green Chartreuse",
      "30 ml Fresh Pineapple Juice",
      "22.5 ml Fresh Lime Juice",
      "15 ml Falernum"
    ],
    "ingredientNames": [
      "Chartreuse",
      "Pineapple Juice",
      "Lime Juice",
      "Falernum"
    ],
    "method": [
      "Pour all ingredients into a tall glass, add pebble ice.",
      "With the help of a swizzle stick (or cocktail spoon) mix vigorously, complete by filling the glass with more pebble ice."
    ],
    "garnish": "Garnish with mint leaves and grated nutmeg.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Chartreuse",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "herbal botanicals"
      },
      {
        "name": "Falernum",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "lime, almond, ginger, clove"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "clover-club",
    "name": "Clover Club",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/clover-club/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-clover-club-66949108a3e54.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml Gin",
      "15 ml Raspberry Syrup",
      "15 ml Lemon Juice [Fresh]",
      "Few Drops of Egg White"
    ],
    "ingredientNames": [
      "Gin",
      "Sugar Syrup",
      "Lemon Juice",
      "Egg White"
    ],
    "method": [
      "Pour all ingredients into cocktails shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "Fresh raspberries.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "corpse-reviver-2",
    "name": "Corpse Reviver #2",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/corpse-reviver-2/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-corpse-reviver-2-6695cdad6da15.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "30 ml Gin",
      "30 ml Cointreau",
      "30 ml Lillet Blanc",
      "30 ml Lemon Juice [Fresh]",
      "1 dash Absinthe"
    ],
    "ingredientNames": [
      "Gin",
      "Cointreau",
      "Lillet Blanc",
      "Lemon Juice",
      "Absinthe"
    ],
    "method": [
      "Pour all ingredients into shaker with ice.",
      "Shake well and strain in chilled cocktail glass."
    ],
    "garnish": "Garnish with an orange zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cointreau",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      },
      {
        "name": "Absinthe",
        "subtype": "Anise liqueurs",
        "flavor": "anise, wormwood"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "cosmopolitan",
    "name": "Cosmopolitan",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/cosmopolitan/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-cosmopolitan-6695cdae389dc.webp",
    "glassware": "Large cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "40 ml Vodka Citron",
      "15 ml Cointreau",
      "15 ml Fresh Lime Juice",
      "30 ml Cranberry Juice"
    ],
    "ingredientNames": [
      "Vodka Citron",
      "Cointreau",
      "Lime Juice",
      "Cranberry Juice"
    ],
    "method": [
      "Add all ingredients into cocktail shaker filled with ice.",
      "Shake well and strain into large cocktail glass."
    ],
    "garnish": "Garnish with lemon twist.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cointreau",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "cuba-libre",
    "name": "Cuba Libre",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/cuba-libre/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-cuba-libre-6695cdb0a6f80.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "50 ml White Rum",
      "120 ml Cola",
      "10 ml Fresh Lime Juice"
    ],
    "ingredientNames": [
      "White Rum",
      "Cola",
      "Lime Juice"
    ],
    "method": [
      "Build all ingredients in a highball glass filled with ice."
    ],
    "garnish": "Garnish with lime wedge.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "daiquiri",
    "name": "Daiquiri",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/daiquiri/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-daiquiri-6694910c5866e.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "60 ml White Cuban Ron",
      "20 ml Fresh Lime Juice",
      "2 Bar Spoons Superfine Sugar"
    ],
    "ingredientNames": [
      "White Rum",
      "Lime Juice",
      "Superfine Sugar"
    ],
    "method": [
      "In a cocktail shaker add all ingredients. Stir well to dissolve the sugar.",
      "Add ice and shake. Strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "dark-n-stormy",
    "name": "Dark ‘n’ Stormy",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/dark-n-stormy/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-dark-n-stormy-6695d39e2bd94.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 2,
    "makeTime": 5,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "60 ml Goslings Rum",
      "100 ml Ginger Beer"
    ],
    "ingredientNames": [
      "Dark Rum",
      "Ginger Beer"
    ],
    "method": [
      "In a highball glass filled with ice pour the ginger beer and top floating with the Rum."
    ],
    "garnish": "Garnish with a lime wedge or slice.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "dons-special-daiquiri",
    "name": "Don’s Special Daiquiri",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/dons-special-daiquiri/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-dons-special-daiquiri-6695d39e89fd7.webp",
    "glassware": "Footed copo glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 5,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "30 ml Gold Jamaican Rum",
      "15 ml Cuban Rum",
      "15 ml Passion Fruit Syrup",
      "15 ml Fresh lime juice",
      "15 ml Honey Syrup"
    ],
    "ingredientNames": [
      "Jamaican Rum",
      "Rum",
      "Sugar Syrup",
      "Lime Juice",
      "Honey Syrup"
    ],
    "method": [
      "Blend for a few seconds in a milkshake mixer with crushed ice and pour into a footed copo glass.",
      "Fill the glass with more crushed ice."
    ],
    "garnish": "Garnish with 1/2 passion fruit",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "dry-martini",
    "name": "Dry Martini",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/dry-martini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-dry-martini-6694910fb500c.webp",
    "glassware": "Martini cocktail glass",
    "baseLiquor": [
      "Gin",
      "Vermouth"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "60 ml Gin",
      "10 ml Dry Vermouth"
    ],
    "ingredientNames": [
      "Gin",
      "Dry Vermouth"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes. Stir well. Strain into chilled martini cocktail glass."
    ],
    "garnish": "Squeeze oil from lemon peel onto the drink, or garnish with a green olives if requested.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "espresso-martini",
    "name": "Espresso Martini",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/espresso-martini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-espresso-martini-6695d3a172fd3.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "50 ml Vodka",
      "30 ml Kahlúa",
      "10 ml Sugar Syrup",
      "1 oz Espresso [strong]"
    ],
    "ingredientNames": [
      "Vodka",
      "Coffee Liqueur",
      "Sugar Syrup",
      "Espresso"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "3 coffee beans",
    "notes": [],
    "liqueurs": [
      {
        "name": "Coffee Liqueur",
        "subtype": "Coffee liqueurs",
        "flavor": "coffee"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "fernandito",
    "name": "Fernandito",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/fernandito/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-fernandito-6695d3a1a3586.webp",
    "glassware": "Double old fashioned glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "50 ml Fernet Branca",
      "Fill up with Cola"
    ],
    "ingredientNames": [
      "Fernet-Branca",
      "Cola"
    ],
    "method": [
      "Pour the Fernet Branca into a double old fashioned glass with ice, fill the glass up with Cola. Gently stir."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Fernet-Branca",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "french-75",
    "name": "French 75",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/french-75/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-french-75-6695cdb175e06.webp",
    "glassware": "Champagne flute",
    "baseLiquor": [
      "Gin",
      "Wine"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "30 ml Gin",
      "15 ml Lemon Juice [Fresh]",
      "15 ml Sugar Syrup",
      "60 ml Champagne"
    ],
    "ingredientNames": [
      "Gin",
      "Lemon Juice",
      "Sugar Syrup",
      "Champagne"
    ],
    "method": [
      "Pour all the ingredients, except Champagne, into a shaker.",
      "Shake well and strain into a Champagne flute.",
      "Top up with Champagne.",
      "Stir gently."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "french-connection",
    "name": "French Connection",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/french-connection/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-french-connection-6695cdb3cc15f.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "35 ml Cognac",
      "35 ml Amaretto"
    ],
    "ingredientNames": [
      "Cognac",
      "Amaretto"
    ],
    "method": [
      "Pour all ingredients directly into old fashioned glass filled with ice cubes.",
      "Stir gently."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Amaretto",
        "subtype": "Nuts liqueurs",
        "flavor": "almond"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "french-martini",
    "name": "French Martini",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/french-martini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-french-martini-6695d3a4acf5f.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "45 ml Vodka",
      "15 ml Raspberry Liqueur",
      "15 ml Fresh Pineapple Juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Raspberry Liqueur",
      "Pineapple Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "Squeeze oil from lemon peel onto the drink.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Raspberry Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "raspberry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "garibaldi",
    "name": "Garibaldi",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/garibaldi/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-garibaldi-6695cdb4cbf81.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "45 ml Bitter Campari",
      "120 ml Freshly Squeezed Orange Juice"
    ],
    "ingredientNames": [
      "Campari",
      "Orange Juice"
    ],
    "method": [
      "Build all ingredients in a highball glass filled with ice."
    ],
    "garnish": "Garnish with an orange wedge.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "gin-basil-smash",
    "name": "Gin Basil Smash",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/gin-basil-smash/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-gin-basil-smash-6695d3a4c0967.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "60ml Gin",
      "22.5 ml Freshly Squeezed Lemon Juice",
      "22.5 ml Sugar Syrup",
      "10 pcs Italian Basil leaves"
    ],
    "ingredientNames": [
      "Gin",
      "Lemon Juice",
      "Sugar Syrup",
      "Basil"
    ],
    "method": [
      "Add all ingredients into shaker with ice.",
      "Shake vigorously and pour into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "gin-fizz",
    "name": "Gin Fizz",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/gin-fizz/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-gin-fizz-6694910fc2eab.webp",
    "glassware": "Tall tumbler glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1993,
    "dateRemoved": null,
    "addedRemoved": "Added 1993",
    "ingredients": [
      "45 ml Gin",
      "30 ml Lemon Juice [Fresh]",
      "10 ml Simple Syrup",
      "Splash of Soda Water"
    ],
    "ingredientNames": [
      "Gin",
      "Lemon Juice",
      "Simple Syrup",
      "Soda Water"
    ],
    "method": [
      "Shake all ingredients with ice except soda water.",
      "Pour into thin tall Tumbler glass , top with a splash soda water."
    ],
    "garnish": "Garnish with lemon slice, optional lemon zest.",
    "notes": [
      "Serve without ice."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "grand-margarita",
    "name": "Grand Margarita",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/grand-margarita/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-tommys-margarita-6695d3c7171ef.webp",
    "glassware": "Margarita glass",
    "baseLiquor": [
      "Tequila",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "45 ml Tequila 100% agave",
      "30 ml Grand Marnier",
      "15 ml Fresh Lime Juice"
    ],
    "ingredientNames": [
      "Tequila",
      "Grand Marnier",
      "Lime Juice"
    ],
    "method": [
      "Rim the rock glass with good quality sea salt. Pour the ingredients into the shaker.",
      "Add ice to both glass and shaker.",
      "Shake hard for 10 seconds. Strain the drink into the glass."
    ],
    "garnish": "Garnish with a lime slice.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Grand Marnier",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "grasshopper",
    "name": "Grasshopper",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/grasshopper/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-grasshopper-6695cdb737498.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "20 ml Crème de Cacao (White)",
      "20 ml Crème de Menthe (Green)",
      "20 ml Fresh Cream"
    ],
    "ingredientNames": [
      "Crème de Cacao",
      "Crème de Menthe",
      "Cream"
    ],
    "method": [
      "Pour all ingredients into shaker filled with ice.",
      "Shake briskly for few seconds. Strain into chilled cocktail glass."
    ],
    "garnish": "N/A, optional mint leave.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Crème de Cacao",
        "subtype": "Chocolate liqueurs",
        "flavor": "chocolate"
      },
      {
        "name": "Crème de Menthe",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "mint"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "hanky-panky",
    "name": "Hanky Panky",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/hanky-panky/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-hanky-panky-66949112edbf5.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml London Dry Gin",
      "45 ml Sweet Red Vermouth",
      "7.5 ml Fernet"
    ],
    "ingredientNames": [
      "London Dry Gin",
      "Sweet Red Vermouth",
      "Fernet"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes. Stir well.",
      "Strain into chilled cocktail glass."
    ],
    "garnish": "Orange zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Fernet-Branca",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "hemingway-special",
    "name": "Hemingway Special",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/hemingway-special/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-hemingway-special-6695cdb814e5a.webp",
    "glassware": "Large cocktail glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "60 ml Rum",
      "40 ml Grapefruit Juice",
      "15 ml Maraschino Luxardo",
      "15 ml Fresh Lime"
    ],
    "ingredientNames": [
      "Rum",
      "Grapefruit Juice",
      "Maraschino Liqueur",
      "Fresh Lime"
    ],
    "method": [
      "Pour all ingredients into a shaker with ice.",
      "Shake well and strain into a large cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "horses-neck",
    "name": "Horse’s Neck",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/horses-neck/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-horses-neck-6695cdba5fadc.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Brandy"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "40 ml Cognac",
      "120 ml Ginger Ale",
      "Dash of Angostura Bitters (optional)"
    ],
    "ingredientNames": [
      "Cognac",
      "Ginger Ale",
      "Bitters"
    ],
    "method": [
      "Pour Cognac and ginger ale directly into highball glass with ice cubes.",
      "Stir gently.",
      "If preferred, add dashes of Angostura Bitter."
    ],
    "garnish": "Garnish with rind of one lemon spiral.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "iba-tiki",
    "name": "IBA Tiki",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/iba-tiki/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-iba-tiki-6695d3a7e33fd.webp",
    "glassware": "Tiki glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 9,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "30 ml Ron Profundo Havana Club",
      "30 ml Ron Smoky Havana Club",
      "15 ml Licor Amaretto",
      "5 ml Licor Frangelico",
      "5 drops Maraschino Luxardo",
      "30 ml Passion Fruit Puree",
      "90 Fresh Pineapple Juice",
      "30 Fresh Lime Juice",
      "1 pc Gengibre Slice"
    ],
    "ingredientNames": [
      "Rum",
      "Amaretto",
      "Frangelico",
      "Maraschino Liqueur",
      "Passion Fruit Puree",
      "Pineapple Juice",
      "Lime Juice",
      "Ginger"
    ],
    "method": [
      "In a cocktail shaker muddle a thin slice of Gengibre, Pour all other ingredients.",
      "Shake vigorously with ice.",
      "Strain into a chilled Tiki glass filled with pebbled ice."
    ],
    "garnish": "Garnish with citruses and dehydrated pineapple slice.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Amaretto",
        "subtype": "Nuts liqueurs",
        "flavor": "almond"
      },
      {
        "name": "Frangelico",
        "subtype": "Nuts liqueurs",
        "flavor": "hazelnut"
      },
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "illegal",
    "name": "Illegal",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/illegal/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-illegal-6695d3a7de51f.webp",
    "glassware": "Terracotta mug",
    "baseLiquor": [
      "Rum",
      "Tequila",
      "Liqueurs"
    ],
    "ingredientCount": 7,
    "makeTime": 5,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "30 ml Espadin Mezcal",
      "15 ml Jamaica Overproof White Rum",
      "15 ml Falernum",
      "1 Bar Spoon Maraschino Luxardo",
      "22.5 ml Fresh Lime Juice",
      "15 ml Simple Syrup",
      "Few Drops of Egg White (Optional)"
    ],
    "ingredientNames": [
      "Mezcal",
      "Overproof White Rum",
      "Falernum",
      "Maraschino Liqueur",
      "Lime Juice",
      "Simple Syrup",
      "Egg White"
    ],
    "method": [
      "Pour all ingredients into the shaker. Shake vigorously with ice.",
      "Strain into a chilled cocktail glass, or “on the rocks” in a traditional clay or terracotta mug."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Falernum",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "lime, almond, ginger, clove"
      },
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "irish-coffee",
    "name": "Irish Coffee",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/irish-coffee/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-irish-coffee-copy-6695cdbb430cd.webp",
    "glassware": "Irish coffee glass",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 1993,
    "dateRemoved": null,
    "addedRemoved": "Added 1993",
    "ingredients": [
      "50 ml Irish Whiskey",
      "120 ml Hot coffee",
      "50 ml Fresh cream (Chilled)",
      "1 teaspoon Sugar"
    ],
    "ingredientNames": [
      "Irish Whiskey",
      "Coffee",
      "Cream",
      "Sugar"
    ],
    "method": [
      "Warm black coffee is poured into a preheated Irish coffee glass.",
      "Whiskey and at least one teaspoon of sugar is added and stirred until dissolved.",
      "Fresh thick chilled cream is carefully poured over the back of a spoon held just above the surface of the coffee.",
      "The layer of cream will float on the coffee without mixing.",
      "Plain sugar can be replaced with sugar syrup"
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "john-collins",
    "name": "John Collins",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/john-collins/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-john-collins-669491130ef87.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 4,
    "makeTime": 2,
    "dateAdded": 1993,
    "dateRemoved": null,
    "addedRemoved": "Added 1993",
    "ingredients": [
      "45 ml Gin",
      "30 ml Lemon Juice [Fresh]",
      "15 ml Simple Syrup",
      "60 ml Soda Water"
    ],
    "ingredientNames": [
      "Gin",
      "Lemon Juice",
      "Simple Syrup",
      "Soda Water"
    ],
    "method": [
      "Pour all ingredients directly into highball filled with ice. Stir gently."
    ],
    "garnish": "Garnish with lemon slice and maraschino cherry.",
    "notes": [
      "Use ‘Old Tom’ Gin for Tom Collins."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "jungle-bird",
    "name": "Jungle Bird",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/jungle-bird/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-jungle-bird-6695d3ab45a87.webp",
    "glassware": "Rocks glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "45 ml Blackstrap rum",
      "22.5 ml Campari",
      "45 ml Pineapple juice",
      "15 ml Freshly Squeezed Lime juice",
      "15 ml Demerara sugar syrup"
    ],
    "ingredientNames": [
      "Blackstrap Rum",
      "Campari",
      "Pineapple Juice",
      "Lime Juice",
      "Sugar Syrup"
    ],
    "method": [
      "Pour all ingredients into a shaker with ice and shake.",
      "Strain into a rocks glass filled with ice."
    ],
    "garnish": "Garnish with a pineapple wedge.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "kir",
    "name": "Kir",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/kir/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-kir-6695cdbdbb2e1.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "90 ml Dry White Wine",
      "10 ml Crème de Cassis"
    ],
    "ingredientNames": [
      "White Wine",
      "Crème de Cassis"
    ],
    "method": [
      "Pour Crème de Cassis into glass, top up with white wine."
    ],
    "garnish": "",
    "notes": [
      "Kir Royal – Use Champagne instead of white wine"
    ],
    "liqueurs": [
      {
        "name": "Crème de Cassis",
        "subtype": "Fruits liqueurs",
        "flavor": "blackcurrant"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "last-word",
    "name": "Last Word",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/last-word/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-last-word-6694911607ddf.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "22.5 ml Gin",
      "22.5 ml Green Chartreuse",
      "22.5 ml Maraschino Luxardo",
      "22.5 ml Fresh Lime Juice"
    ],
    "ingredientNames": [
      "Gin",
      "Chartreuse",
      "Maraschino Liqueur",
      "Lime Juice"
    ],
    "method": [
      "Add all ingredients into a cocktail shaker.",
      "Shake with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Chartreuse",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "herbal botanicals"
      },
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "lemon-drop-martini",
    "name": "Lemon Drop Martini",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/lemon-drop-martini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-lemon-drop-martini-6695cdbe3eed7.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "30 ml Vodka",
      "20 ml Triple Sec",
      "15 ml Lemon Juice [Fresh]"
    ],
    "ingredientNames": [
      "Vodka",
      "Triple Sec",
      "Lemon Juice"
    ],
    "method": [
      "Pour all ingredients into a shaker with ice.",
      "Shake well and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "long-island-iced-tea",
    "name": "Long Island Iced Tea",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/long-island-iced-tea/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-long-island-iced-tea-6695cdc10c463.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Vodka",
      "Rum",
      "Gin",
      "Tequila",
      "Liqueurs"
    ],
    "ingredientCount": 8,
    "makeTime": 5,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "15 ml Vodka",
      "15 ml Tequila",
      "15 ml White rum",
      "15 ml Gin",
      "15 ml Cointreau",
      "25 ml Lemon juice",
      "30 ml Simple syrup",
      "Top with Cola"
    ],
    "ingredientNames": [
      "Vodka",
      "Tequila",
      "White Rum",
      "Gin",
      "Cointreau",
      "Lemon Juice",
      "Simple Syrup",
      "Cola"
    ],
    "method": [
      "Add all ingredients into highball glass filled with ice.",
      "Stir gently."
    ],
    "garnish": "Garnish with lemon slice (Optional).",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cointreau",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "mai-tai",
    "name": "Mai Tai",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/mai-tai/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-mai-tai-6695cdc169ea3.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 6,
    "makeTime": 4,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "30 ml Amber Jamaican Rum",
      "30 ml Martinique Molasses Rhum*",
      "15 ml Orange Curacao",
      "15 ml Orgeat Syrup (Almond)",
      "30 ml Fresh Squeezed Lime Juice",
      "7.5 ml Simple Syrup"
    ],
    "ingredientNames": [
      "Jamaican Rum",
      "Martinique Rhum",
      "Orange Curaçao",
      "Orgeat Syrup",
      "Lime Juice",
      "Simple Syrup"
    ],
    "method": [
      "Add all ingredients into a shaker with ice.",
      "Shake and pour into a double rocks glass or an highball glass.",
      "* The Martinique molasses rum used by Trader Vic was not an Agricole Rhum but a type of “rummy” from molasses."
    ],
    "garnish": "Garnish with pineapple spear, mint leaves and lime peel.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Orange Curaçao",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "manhattan",
    "name": "Manhattan",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/manhattan/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-manhattan-6694911627de7.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Whiskey",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "50 ml Rye Whiskey",
      "20 ml Sweet Red Vermouth",
      "1 dash Angostura Bitters"
    ],
    "ingredientNames": [
      "Rye Whiskey",
      "Sweet Red Vermouth",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes.",
      "Stir well. Strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with cocktail cherry.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "margarita",
    "name": "Margarita",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/margarita/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-margarita-6695cdd7505e0.webp",
    "glassware": "Margarita glass",
    "baseLiquor": [
      "Tequila",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "50 ml Tequila 100% Agave",
      "20 ml Triple Sec",
      "15 ml Freshly Squeezed Lime Juice"
    ],
    "ingredientNames": [
      "Tequila",
      "Triple Sec",
      "Lime Juice"
    ],
    "method": [
      "Add all ingredients into a shaker with ice.",
      "Shake and strain into a chilled cocktail glass."
    ],
    "garnish": "Half salt rim (Optional).",
    "notes": [],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "martinez",
    "name": "Martinez",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/martinez/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-martinez-6694911927849.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 4,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml London Dry Gin",
      "45 ml Sweet Red Vermouth",
      "1 Bar Spoon Maraschino Luxardo",
      "2 Dashes Orange Bitters"
    ],
    "ingredientNames": [
      "London Dry Gin",
      "Sweet Red Vermouth",
      "Maraschino Liqueur",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes.",
      "Stir well. Strain into chilled cocktail glass."
    ],
    "garnish": "Lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "mary-pickford",
    "name": "Mary Pickford",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/mary-pickford/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-mary-pickford-6694911933ea7.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml White Rum",
      "45 ml Fresh Pineapple Juice",
      "7.5 ml Maraschino Luxardo",
      "5 ml Grenadine Syrup"
    ],
    "ingredientNames": [
      "White Rum",
      "Pineapple Juice",
      "Maraschino Liqueur",
      "Grenadine Syrup"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "mimosa",
    "name": "Mimosa",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/mimosa/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-mimosa-6695cdc4463c9.webp",
    "glassware": "Flute glass",
    "baseLiquor": [
      "Wine"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "75 ml Freshly Squeezed Orange Juice",
      "75 ml Prosecco"
    ],
    "ingredientNames": [
      "Orange Juice",
      "Prosecco"
    ],
    "method": [
      "Pour orange juice into flute glass and gently pour the sparkling wine.",
      "Stir gently."
    ],
    "garnish": "Garnish with orange twist (optional).",
    "notes": [
      "Also known as Buck’s Fizz."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "mint-julep",
    "name": "Mint Julep",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/mint-julep/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-mint-julep-6695cdc4aa398.webp",
    "glassware": "Julep cup",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "60 ml Bourbon Whiskey",
      "4 fresh Mint sprigs",
      "1 tsp Powdered Sugar",
      "2 tsp Water"
    ],
    "ingredientNames": [
      "Bourbon Whiskey",
      "Mint",
      "Powdered Sugar",
      "Water"
    ],
    "method": [
      "In Julep Stainless Steel Cup gently muddle the mint with sugar and water.",
      "Fill the glass with cracked ice, add the Bourbon and stir well until the cup frosts."
    ],
    "garnish": "Garnish with a mint sprig.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "missionarys-downfall",
    "name": "Missionary’s Downfall",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/missionarys-downfall/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-missionarys-downfall-6695d3ab4d4c5.webp",
    "glassware": "Coppa grande",
    "baseLiquor": [
      "Rum",
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 6,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "30 ml White rum",
      "15 ml Peach Brandy",
      "15 ml Fresh lime juice",
      "30 ml Honey Mix",
      "10 pcs Mint Leaves",
      "3 to 4 pcs Pineapple Chunks"
    ],
    "ingredientNames": [
      "White Rum",
      "Peach Brandy",
      "Lime Juice",
      "Honey Syrup",
      "Mint",
      "Pineapple"
    ],
    "method": [
      "Blend all the ingredients with half cup of crushed ice.",
      "Serve it in a Coppa grande."
    ],
    "garnish": "Garnish with mint sprig and a slice of pineapple.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Peach Brandy",
        "subtype": "Fruits liqueurs",
        "flavor": "peach"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "mojito",
    "name": "Mojito",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/mojito/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-mojito-6695cdc755626.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 5,
    "makeTime": 3,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "45 ml White Cuban Ron",
      "20 ml Fresh Lime Juice",
      "6 pcs Mint Sprigs",
      "2 tsp White Cane Sugar",
      "Soda Water"
    ],
    "ingredientNames": [
      "White Rum",
      "Lime Juice",
      "Mint",
      "White Cane Sugar",
      "Soda Water"
    ],
    "method": [
      "Mix mint springs with sugar and lime juice.",
      "Add splash of soda water and fill the glass with ice.",
      "Pour the rum and top with soda water. Light stir to involve all ingredients."
    ],
    "garnish": "Garnish with sprigs of mint and slice of lime.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "monkey-gland",
    "name": "Monkey Gland",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/monkey-gland/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-monkey-gland-6694911cbf5a2.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml Dry Gin",
      "45 ml Fresh Orange Juice",
      "1 Tablespoon Absinthe",
      "1 Tablespoon Grenadine Syrup"
    ],
    "ingredientNames": [
      "Gin",
      "Orange Juice",
      "Absinthe",
      "Grenadine Syrup"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Absinthe",
        "subtype": "Anise liqueurs",
        "flavor": "anise, wormwood"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "moscow-mule",
    "name": "Moscow Mule",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/moscow-mule/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-moscow-mule-6695cdc7d8cb2.webp",
    "glassware": "Mule cup",
    "baseLiquor": [
      "Vodka"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "45 ml Smirnoff Vodka",
      "120 ml Ginger Beer",
      "10 ml Fresh lime juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Ginger Beer",
      "Lime Juice"
    ],
    "method": [
      "In an Mule Cup or rocks glass, combine the vodka and ginger beer.",
      "Add lime juice and gently stir to involve all ingredients."
    ],
    "garnish": "Garnish with a lime slice.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "naked-and-famous",
    "name": "Naked and Famous",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/naked-and-famous/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-naked-and-famous-6695d3ae8e1dc.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Tequila",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "22.5 ml Mezcal",
      "22.5 ml Yellow Chartreuse",
      "22.5 ml Aperol",
      "22.5 ml Fresh Lime Juice"
    ],
    "ingredientNames": [
      "Mezcal",
      "Chartreuse",
      "Aperol",
      "Lime Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Chartreuse",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "herbal botanicals"
      },
      {
        "name": "Aperol",
        "subtype": "Bitter liqueurs",
        "flavor": "orange, rhubarb, gentian"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "negroni",
    "name": "Negroni",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/negroni/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-negroni-6694911cc3b65.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "30 ml Gin",
      "30 ml Bitter Campari",
      "30 ml Sweet Red Vermouth"
    ],
    "ingredientNames": [
      "Gin",
      "Campari",
      "Sweet Red Vermouth"
    ],
    "method": [
      "Pour all ingredients directly into chilled old fashioned glass filled with ice.",
      "Stir gently."
    ],
    "garnish": "Garnish with half orange slice.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Campari",
        "subtype": "Bitter liqueurs",
        "flavor": "bitter orange, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "new-york-sour",
    "name": "New York Sour",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/new-york-sour/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-new-york-sour-6695d3ae88cd2.webp",
    "glassware": "Rocks glass",
    "baseLiquor": [
      "Whiskey",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 5,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "60 ml Rye Whiskey or Bourbon",
      "22.5 ml Simple syrup",
      "30 ml Fresh lemon juice",
      "Few Drops of Egg White",
      "15 ml Red wine (Shiraz or Malbech)"
    ],
    "ingredientNames": [
      "Bourbon or Rye Whiskey",
      "Simple Syrup",
      "Lemon Juice",
      "Egg White",
      "Red Wine"
    ],
    "method": [
      "Pour all ingredients into the shaker. Shake vigorously with ice.",
      "Strain into a chilled rocks glass filled with ice. Float the wine on top."
    ],
    "garnish": "Garnish with lemon or orange zest with cherry.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "old-cuban",
    "name": "Old Cuban",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/old-cuban/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-old-cuban-6695d3b18c692.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum",
      "Wine"
    ],
    "ingredientCount": 6,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "6/8 pcs Mint Leaves",
      "45 ml Aged Rum",
      "22.5 ml Fresh Lime Juice",
      "30 ml Simple Syrup",
      "2 Dashes Angostura Bitters",
      "60 ml Brut Champagne or Prosecco"
    ],
    "ingredientNames": [
      "Mint",
      "Aged Rum",
      "Lime Juice",
      "Simple Syrup",
      "Bitters",
      "Champagne"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker except the wine, shake well with ice, strain into chilled elegant cocktail glass.",
      "Top up with the sparkling wine."
    ],
    "garnish": "Garnish with mint springs.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "old-fashioned",
    "name": "Old Fashioned",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/old-fashioned/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-old-fashioned-6694911fce360.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml Bourbon or Rye Whiskey",
      "1 Sugar Cube",
      "Few Dashes Angostura Bitters",
      "Few Dashes Plain Water"
    ],
    "ingredientNames": [
      "Bourbon or Rye Whiskey",
      "Sugar Cube",
      "Bitters",
      "Water"
    ],
    "method": [
      "Place sugar cube in old fashioned glass and saturate with bitter, add few dashes of plain water. Muddle until dissolved. Fill the glass with ice cubes and add whiskey.",
      "Stir gently."
    ],
    "garnish": "Garnish with orange slice or zest, and a cocktail cherry.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "paloma",
    "name": "Paloma",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/paloma/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-paloma-6695d3b19cda4.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Tequila"
    ],
    "ingredientCount": 4,
    "makeTime": 2,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "50 ml 100% Agave Tequila",
      "5 ml Fresh lime",
      "A pinch of Salt",
      "100 ml Pink Grapefruit Soda"
    ],
    "ingredientNames": [
      "Tequila",
      "Fresh Lime",
      "Pinch Of Salt",
      "Pink Grapefruit Soda"
    ],
    "method": [
      "Poor the tequila into a highball glass, squeeze the lime juice.",
      "Add ice and salt, fill up pink grapefruit soda.",
      "Stir gently."
    ],
    "garnish": "Garnish with a slice of lime.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "paper-plane",
    "name": "Paper Plane",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/paper-plane/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-paper-plane-6695d3b4745eb.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Whiskey",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "30 ml Bourbon Whiskey",
      "30 ml Amaro Nonino",
      "30 ml Aperol",
      "30 ml Lemon Juice [Fresh]"
    ],
    "ingredientNames": [
      "Bourbon Whiskey",
      "Amaro Nonino",
      "Aperol",
      "Lemon Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Amaro Nonino",
        "subtype": "Bitter liqueurs",
        "flavor": "herbal bittersweet"
      },
      {
        "name": "Aperol",
        "subtype": "Bitter liqueurs",
        "flavor": "orange, rhubarb, gentian"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "paradise",
    "name": "Paradise",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/paradise/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-paradise-6694911fdbd4b.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "30 ml Gin",
      "20 ml Apricot Brandy",
      "15 ml Fresh Orange Juice"
    ],
    "ingredientNames": [
      "Gin",
      "Apricot Brandy",
      "Orange Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Apricot Brandy",
        "subtype": "Fruits liqueurs",
        "flavor": "apricot"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "penicillin",
    "name": "Penicillin",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/penicillin/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-penicillin-6695d3b47b79f.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 5,
    "makeTime": 5,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "60 ml Blended scotch whisky",
      "7.5 ml Lagavulin 16y",
      "22.5 ml Fresh lemon juice",
      "22.5 ml Honey syrup",
      "2-3 quarter size sliced fresh ginger"
    ],
    "ingredientNames": [
      "Scotch Whisky",
      "Lemon Juice",
      "Honey Syrup",
      "Ginger"
    ],
    "method": [
      "Muddle fresh ginger in a shaker and add the remaining ingredients except for the Islay single malt whisky.",
      "Fill the shaker with ice and shake.",
      "Fine train into a chilled Old Fashioned glass with ice.",
      "Float the single malt whisky on top."
    ],
    "garnish": "Garnish with candied ginger slices.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "pina-colada",
    "name": "Piña Colada",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/pina-colada/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-pina-colada-6695cdcabbf00.webp",
    "glassware": "Large glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 5,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "50 ml White Rum",
      "30 ml Coconut Cream",
      "50 ml Fresh Pineapple Juice"
    ],
    "ingredientNames": [
      "White Rum",
      "Cream",
      "Pineapple Juice"
    ],
    "method": [
      "Blend all the ingredients with ice in a electric blender,",
      "pour into a large glass and serve with straws."
    ],
    "garnish": "Garnish with a slice of pineapple with a cocktail cherry.",
    "notes": [
      "Historically a few drops of fresh lime juice was added to taste. 4 slices of fresh pineapple can be used instead of juice"
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "pisco-punch",
    "name": "Pisco Punch",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/pisco-punch/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-pisco-punch-6695d3b74b9f5.webp",
    "glassware": "Large goblet",
    "baseLiquor": [
      "Brandy",
      "Wine"
    ],
    "ingredientCount": 6,
    "makeTime": 4,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "60 ml Pisco",
      "22.5 ml Fresh Pineapple Juice",
      "15 ml Simple Syrup",
      "15 ml Lemon Juice [Fresh]",
      "30 ml Dry White Wine",
      "3 pcs Cloves"
    ],
    "ingredientNames": [
      "Pisco",
      "Pineapple Juice",
      "Simple Syrup",
      "Lemon Juice",
      "White Wine",
      "Cloves"
    ],
    "method": [
      "Gentle mash the simple syrup with the cloves, add the remaining ingredients except the wine.",
      "Shake vigorously and double strain into a large goblet.",
      "Add the wine on top and gently stir."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "pisco-sour",
    "name": "Pisco Sour",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/pisco-sour/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-pisco-sour-6695cdcaf1122.webp",
    "glassware": "Goblet glass",
    "baseLiquor": [
      "Brandy"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "60 ml Pisco",
      "30 ml Lemon Juice [Fresh]",
      "20 ml Simple Syrup",
      "1 Raw whole Egg White"
    ],
    "ingredientNames": [
      "Pisco",
      "Lemon Juice",
      "Simple Syrup",
      "Egg White"
    ],
    "method": [
      "Add all ingredients into a shaker with ice.",
      "Shake and strain into a chilled goblet glass."
    ],
    "garnish": "Few dashes of Amargo bitters on top as an aromatic garnish.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "planters-punch",
    "name": "Planter’s Punch",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/planters-punch/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-planters-punch-66949122d41fb.webp",
    "glassware": "Small tumbler glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "45 ml Jamaican Rum",
      "15 ml Lime Juice",
      "30 ml Sugar Cane Juice"
    ],
    "ingredientNames": [
      "Jamaican Rum",
      "Lime Juice",
      "Sugar Cane Juice"
    ],
    "method": [
      "Pour all ingredients directly in a small tumbler or a typical terracotta glass."
    ],
    "garnish": "Garnish with orange zest.",
    "notes": [
      "Add dilution up to taste, it can be given by water, ice or fresh juices."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "porn-star-martini",
    "name": "Porn Star Martini",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/porn-star-martini/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-porn-star-martini-6695d3b771b97.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "50 ml Vanilla Vodka",
      "20 ml Passion Fruit Liqueur",
      "50 ml Passion Fruit Puree",
      "2 Bar Spoons Vanilla Sugar",
      "50 ml Champagne to serve on the side"
    ],
    "ingredientNames": [
      "Vanilla Vodka",
      "Passion Fruit Liqueur",
      "Passion Fruit Puree",
      "Vanilla Sugar",
      "Champagne"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, double strain into a large chilled cocktail glass.",
      "Accompany with a shot of champagne."
    ],
    "garnish": "Garnish with passion fruit cup and sugar.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Passion Fruit Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "passion fruit"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "porto-flip",
    "name": "Porto Flip",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/porto-flip/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-porto-flip-669491230cea4.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Brandy",
      "Wine"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "15 ml Brandy",
      "45 ml Red Tawny Port Wine",
      "10 ml Egg Yolk"
    ],
    "ingredientNames": [
      "Brandy",
      "Port Wine",
      "Egg Yolk"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "Sprinkle with fresh ground nutmeg.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "rabo-de-galo",
    "name": "Rabo de Galo",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/rabo-de-galo/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-rabo-de-galo-6695cdcdb2df1.webp",
    "glassware": "Rocks glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 4,
    "makeTime": 3,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "60 ml Cachaca",
      "20 ml Sweet Vermouth Cinzano Rosso",
      "15 ml Cynar",
      "2 Drops Angostura (Optional)"
    ],
    "ingredientNames": [
      "Cachaça",
      "Sweet Vermouth",
      "Cynar",
      "Angostura"
    ],
    "method": [
      "Combine all the ingredients into a rocks glass, add ice and stir briefly."
    ],
    "garnish": "Garnish with a orange twist.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cynar",
        "subtype": "Bitter liqueurs",
        "flavor": "artichoke, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "ramos-fizz",
    "name": "Ramos Fizz",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/ramos-fizz/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-ramos-fizz-669491260ca6c.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 9,
    "makeTime": 8,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "45 ml Gin",
      "15 ml Fresh Lime Juice",
      "15 ml Lemon Juice [Fresh]",
      "30 ml Sugar Syrup",
      "60 ml Cream",
      "30ml Egg white",
      "3 Dashes Orange Flower Water",
      "2 Drops Vanilla Extract",
      "Soda Water"
    ],
    "ingredientNames": [
      "Gin",
      "Lime Juice",
      "Lemon Juice",
      "Sugar Syrup",
      "Cream",
      "Egg White",
      "Water",
      "Vanilla Extract",
      "Soda Water"
    ],
    "method": [
      "Pour all ingredients except soda water in a cocktail shaker with ice.",
      "Shake for two minutes, double strain in a glass, pour the drink back in the shaker and hard shake without ice for one minute.",
      "Strain into a highball glass, top up with soda."
    ],
    "garnish": "",
    "notes": [
      "The drink was invented by Henry Ramos in 1888, at his bar Meyer’s Table d’Hôtel Internationale in New Orleans. The Ramos Fizz was originally shaken for 12 minutes by a crew of 30 bartenders who passed the shaker from one to another."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "remember-the-maine",
    "name": "Remember the Maine",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/remember-the-maine/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-remember-the-main-6694912622959.webp",
    "glassware": "Coupe glass",
    "baseLiquor": [
      "Whiskey",
      "Brandy",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "60 ml Rye Whiskey",
      "22.5 ml Sweet Vermouth",
      "15 ml Cherry Brandy Luxardo",
      "7.5 ml Absinthe"
    ],
    "ingredientNames": [
      "Rye Whiskey",
      "Sweet Vermouth",
      "Cherry Brandy",
      "Absinthe"
    ],
    "method": [
      "Pour the absinthe into a coupe glass and swirl to completely coat the inside.",
      "Discard the absinthe and set the glass aside. Add the other ingredients to a mixing glass and fill it 3/4 full with ice. Stir until chilled, then strain into the glass rinsed with the absinthe."
    ],
    "garnish": "Garnish with lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cherry Brandy",
        "subtype": "Fruits liqueurs",
        "flavor": "cherry"
      },
      {
        "name": "Absinthe",
        "subtype": "Anise liqueurs",
        "flavor": "anise, wormwood"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "russian-spring-punch",
    "name": "Russian Spring Punch",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/russian-spring-punch/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-russian-spring-punch-6695d3ba314f1.webp",
    "glassware": "Tall tumbler glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "25 ml Vodka",
      "25 ml Lemon Juice [Fresh]",
      "15 ml Creme de Cassis",
      "10 ml Sugar Syrup",
      "Top up with Sparkling Wine"
    ],
    "ingredientNames": [
      "Vodka",
      "Lemon Juice",
      "Crème de Cassis",
      "Sugar Syrup",
      "Sparkling Wine"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker except the sparkling wine, shake well with ice, strain into chilled tall tumbler glass filled with ice",
      "and top up with sparkling wine."
    ],
    "garnish": "Garnish with blackberries and optionally a lemon slice as well.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Crème de Cassis",
        "subtype": "Fruits liqueurs",
        "flavor": "blackcurrant"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "rusty-nail",
    "name": "Rusty Nail",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/rusty-nail/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-rusty-nail-66949129acfd1.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Whiskey",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "45 ml Scotch Whisky",
      "25 ml Drambuie"
    ],
    "ingredientNames": [
      "Scotch Whisky",
      "Drambuie"
    ],
    "method": [
      "Pour all ingredients directly into an old fashioned glass filled with ice.",
      "Stir gently."
    ],
    "garnish": "Garnish with lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Drambuie",
        "subtype": "Whisk(e)y liqueurs",
        "flavor": "scotch, honey, herbs"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "sazerac",
    "name": "Sazerac",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/sazerac/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-sazerac-66949129b50d1.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 5,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "50 ml Cognac",
      "10 ml Absinthe",
      "1 Sugar Cube",
      "2 Dashes Peychaud’s Bitters"
    ],
    "ingredientNames": [
      "Cognac",
      "Absinthe",
      "Sugar Cube",
      "Bitters"
    ],
    "method": [
      "Rinse a chilled old-fashioned glass with the absinthe, add crushed ice and set it aside. Stir the remaining ingredients over ice in a mixing glass.",
      "Discard the ice and any excess absinthe from the prepared glass, strain the mixed drink into the glass."
    ],
    "garnish": "Garnish with lemon zest.",
    "notes": [
      "The original recipe changed after the American Civil War, Rye Whiskey substituted Cognac as it became hard to obtain."
    ],
    "liqueurs": [
      {
        "name": "Absinthe",
        "subtype": "Anise liqueurs",
        "flavor": "anise, wormwood"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "sea-breeze",
    "name": "Sea Breeze",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/sea-breeze/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-sea-breeze-6695cdce015a8.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Vodka"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "40 ml Vodka",
      "120 ml Cranberry Juice",
      "30 ml Grapefruit Juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Cranberry Juice",
      "Grapefruit Juice"
    ],
    "method": [
      "Build all ingredients in a highball glass filled with ice."
    ],
    "garnish": "Garnish with an orange zest and cherry.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "sex-on-the-beach",
    "name": "Sex on the Beach",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/sex-on-the-beach/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-sex-on-the-beach-6695cdd0aecf3.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 2,
    "dateAdded": 2004,
    "dateRemoved": null,
    "addedRemoved": "Added 2004",
    "ingredients": [
      "40 ml Vodka",
      "20 ml Peach Schnapps",
      "40 ml Fresh Orange Juice",
      "40 ml Cranberry Juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Peach Schnapps",
      "Orange Juice",
      "Cranberry Juice"
    ],
    "method": [
      "Build all ingredients in a highball glass filled with ice."
    ],
    "garnish": "Garnish with half orange slice.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Peach Schnapps",
        "subtype": "Fruits liqueurs",
        "flavor": "peach"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "sherry-cobbler",
    "name": "Sherry Cobbler",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/sherry-cobbler/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-sherry-cobbler-6695d3ba8bdb7.webp",
    "glassware": "Julep cup",
    "baseLiquor": [
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "45 ml Amontillado sherry",
      "45 ml Palo Cortado",
      "1 tsp Superfine Sugar (or granulated)",
      "1/2 Orange Wheel",
      "1/2 Lemon Wheel"
    ],
    "ingredientNames": [
      "Sherry",
      "Superfine Sugar",
      "Orange Wheel",
      "Lemon Wheel"
    ],
    "method": [
      "Combine sherry, sugar and 2 quarter wheels each of orange and lemon in a shaker with ice, shake briskly, strain into a Julep cocktail cup filled with crushed ice."
    ],
    "garnish": "Garnish with fresh berries, ¼ wheel each orange and lemon. Serve with straws.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "sidecar",
    "name": "Sidecar",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/sidecar/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-sidecar-6694912cb8aa9.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "50 ml Cognac",
      "20 ml Triple Sec",
      "20 ml Lemon Juice [Fresh]"
    ],
    "ingredientNames": [
      "Cognac",
      "Triple Sec",
      "Lemon Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "singapore-sling",
    "name": "Singapore Sling",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/singapore-sling/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-singapore-sling-6695cdd136426.webp",
    "glassware": "Hurricane glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 8,
    "makeTime": 5,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "30 ml Gin",
      "15 ml Cherry Sangue Morlacco",
      "7.5 ml Cointreau",
      "7.5 ml DOM Bénédictine",
      "120 ml Fresh Pineapple Juice",
      "15 ml Fresh Lime Juice",
      "10 ml Grenadine Syrup",
      "A dash of Angostura bitters"
    ],
    "ingredientNames": [
      "Gin",
      "Cherry Brandy",
      "Cointreau",
      "Bénédictine",
      "Pineapple Juice",
      "Lime Juice",
      "Grenadine Syrup",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker filled with ice cubes.",
      "Shake well.",
      "Strain into Hurricane glass."
    ],
    "garnish": "Garnish with pineapple and maraschino cherry.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Cherry Sangue Morlacco",
        "subtype": "Fruits liqueurs",
        "flavor": "cherry"
      },
      {
        "name": "Cointreau",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      },
      {
        "name": "Bénédictine",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "honey, herbs, spice"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "south-side",
    "name": "South Side",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/south-side/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-south-side-6695d3bdcc9fe.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "60 ml London dry Gin",
      "30 ml Lemon Juice [Fresh]",
      "15 ml Simple syrup",
      "5/6 Mint leaves",
      "Few drops Egg white (Optional)"
    ],
    "ingredientNames": [
      "London Dry Gin",
      "Lemon Juice",
      "Simple Syrup",
      "Mint",
      "Egg White"
    ],
    "method": [
      "Pour all ingredients into a cocktail shaker, shake well with ice, double-strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with mint springs.",
    "notes": [
      "If egg white is used shake vigorously."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "spicy-fifty",
    "name": "Spicy Fifty",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/spicy-fifty/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-spicy-fifty-6695d3bdd14b1.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "50 ml Vodka Vanilla",
      "15 ml Elderflower Cordial",
      "15 ml Fresh Lime Juice",
      "10 ml Monin Honey Syrup",
      "2 thin Slices Red Chili Pepper"
    ],
    "ingredientNames": [
      "Vanilla Vodka",
      "Elderflower Cordial",
      "Lime Juice",
      "Honey Syrup",
      "Red Chili Pepper"
    ],
    "method": [
      "Pour all ingredients into a cocktail shaker, shake well with ice, double-strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with a red chili pepper.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Elderflower Cordial",
        "subtype": "Floral liqueurs",
        "flavor": "elderflower"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "spritz",
    "name": "Spritz",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/spritz/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-spritz-6695d3c0f113f.webp",
    "glassware": "Wine glass",
    "baseLiquor": [
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "90 ml Prosecco",
      "60 ml Aperol",
      "Splash of Soda water"
    ],
    "ingredientNames": [
      "Prosecco",
      "Aperol",
      "Soda Water"
    ],
    "method": [
      "Build all ingredients into a wine glass filled with ice.",
      "Stir gently."
    ],
    "garnish": "Garnish with a slice of orange.",
    "notes": [
      "There are other versions of the Spritz that use Campari, Cynar or Select instead of Aperol."
    ],
    "liqueurs": [
      {
        "name": "Aperol",
        "subtype": "Bitter liqueurs",
        "flavor": "orange, rhubarb, gentian"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "stinger",
    "name": "Stinger",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/stinger/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-stinger-6694912ce0b8d.webp",
    "glassware": "Martini cocktail glass",
    "baseLiquor": [
      "Brandy",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "50 ml Cognac",
      "20 ml White Crème de Menthe"
    ],
    "ingredientNames": [
      "Cognac",
      "Crème de Menthe"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes. Stir well.",
      "Strain into chilled martini cocktail glass."
    ],
    "garnish": "Optional mint leave.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Crème de Menthe",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "mint"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "suffering-bastard",
    "name": "Suffering Bastard",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/suffering-bastard/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-suffering-bastard-6695d3c1081c4.webp",
    "glassware": "Mug",
    "baseLiquor": [
      "Gin",
      "Brandy"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "30 ml Cognac or Brandy",
      "30 ml Gin",
      "15 ml Fresh Lime Juice",
      "2 Dashes Angostura Bitters",
      "Top up Ginger beer"
    ],
    "ingredientNames": [
      "Cognac or Brandy",
      "Gin",
      "Lime Juice",
      "Bitters",
      "Ginger Beer"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker except the ginger beer, shake well with ice.",
      "Pour unstrained into a Collins glass or in the original.",
      "S. Bastard mug and top up with ginger beer."
    ],
    "garnish": "Garnish with mint spring and optionally an orange slice as well.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "tequila-sunrise",
    "name": "Tequila Sunrise",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/tequila-sunrise/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-tequila-sunrise-6695cdd3da10a.webp",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Tequila"
    ],
    "ingredientCount": 3,
    "makeTime": 2,
    "dateAdded": 1987,
    "dateRemoved": null,
    "addedRemoved": "Added 1987",
    "ingredients": [
      "45 ml Tequila",
      "90 ml Fresh Orange Juice",
      "15 ml Grenadine Syrup"
    ],
    "ingredientNames": [
      "Tequila",
      "Orange Juice",
      "Grenadine Syrup"
    ],
    "method": [
      "Pour tequila and orange juice directly into highball glass filled with ice cubes.",
      "Add the grenadine syrup to create chromatic effect (sunrise), do not stir."
    ],
    "garnish": "Garnish with half orange slice or an orange zest.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "three-dots-and-a-dash",
    "name": "Three Dots and a Dash",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/three-dots-and-a-dash/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-three-dots-and-a-dash-6695d3c3e2d24.webp",
    "glassware": "Footed copo glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 7,
    "makeTime": 5,
    "dateAdded": 2024,
    "dateRemoved": null,
    "addedRemoved": "Added 2024",
    "ingredients": [
      "45 ml Rhum Martinique Agricole",
      "15 ml Blended Aged Rum",
      "7.5 ml Falernum",
      "7.5 ml Allspice Saint Elizabeth15 ml Fresh Lime Juice",
      "15 ml Fresh Orange juice",
      "15 ml Honey Syrup",
      "2 Dashes Angostura Bitters"
    ],
    "ingredientNames": [
      "Martinique Rhum",
      "Aged Rum",
      "Falernum",
      "Lime Juice",
      "Orange Juice",
      "Honey Syrup",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients in a Blender with 12 ounces of crushed ice, flash blend, pour the drink into a footed copo glass.",
      "Fill the glass with more crushed ice."
    ],
    "garnish": "Garnish with three cherries and a rectangular chunk of pineapple.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Falernum",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "lime, almond, ginger, clove"
      },
      {
        "name": "Allspice Liqueur",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "allspice"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "tipperary",
    "name": "Tipperary",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/tipperary/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-tipperary-6695d3c453fd3.webp",
    "glassware": "Martini cocktail glass",
    "baseLiquor": [
      "Whiskey",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 4,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "50 ml Irish Whiskey",
      "25 ml Sweet Red Vermouth",
      "15 ml Green Chartreuse",
      "2 Dashes Angostura Bitters"
    ],
    "ingredientNames": [
      "Irish Whiskey",
      "Sweet Red Vermouth",
      "Chartreuse",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes.",
      "Stir well. Strain into chilled martini cocktail glass."
    ],
    "garnish": "Garnish with a slice of orange.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Chartreuse",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "herbal botanicals"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "tommys-margarita",
    "name": "Tommy’s Margarita",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/tommys-margarita/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-tommys-margarita-6695d3c7171ef.webp",
    "glassware": "Margarita glass",
    "baseLiquor": [
      "Tequila"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "60 ml Tequila 100% agave",
      "30 ml Fresh Lime Juice",
      "30 ml Agave Nectar"
    ],
    "ingredientNames": [
      "Tequila",
      "Lime Juice",
      "Agave Nectar"
    ],
    "method": [
      "Pour all ingredients into a cocktail shaker, shake well with ice, strain into chilled rocks glass filled with ice."
    ],
    "garnish": "Garnish with a lime slice.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "trinidad-sour",
    "name": "Trinidad Sour",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/trinidad-sour/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-trinidad-sour-6695d3c794a43.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml Angostura Bitters",
      "30 ml Orgeat Syrup",
      "22.5 ml Lemon Juice [Fresh]",
      "15 ml Rye Whiskey"
    ],
    "ingredientNames": [
      "Bitters",
      "Orgeat Syrup",
      "Lemon Juice",
      "Rye Whiskey"
    ],
    "method": [
      "Pour all ingredients into a cocktail shaker, shake well with ice.",
      "Strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "tuxedo",
    "name": "Tuxedo",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/tuxedo/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-tuxedo-6694912fd3b8f.webp",
    "glassware": "Martini cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 5,
    "makeTime": 3,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "30 ml Old Tom Gin",
      "30 ml Dry Vermouth",
      "1/2 Bar Spoon Maraschino Luxardo",
      "1/4 Bar Spoon of Absinthe",
      "3 Dashes Orange Bitters"
    ],
    "ingredientNames": [
      "Old Tom Gin",
      "Dry Vermouth",
      "Maraschino Liqueur",
      "Absinthe",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes. Stir well.",
      "Strain into chilled martini cocktail glass."
    ],
    "garnish": "Garnish with cherry and lemon zest.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Maraschino Liqueur",
        "subtype": "Fruits liqueurs",
        "flavor": "marasca cherry"
      },
      {
        "name": "Absinthe",
        "subtype": "Anise liqueurs",
        "flavor": "anise, wormwood"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "ve-n-to",
    "name": "Ve.n.to",
    "type": "New Era Drinks",
    "originalType": "New Era Drinks",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/ve-n-to/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-new-era-vento-6695d3ca45bc2.webp",
    "glassware": "Small tumbler glass",
    "baseLiquor": [
      "Brandy"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml White Smooth Grappa",
      "22.5 ml Fresh lemon Juice",
      "15 ml Honey mix (replace water with chamomile)*",
      "15 ml Chamomile cordial",
      "Few Drops of Egg White (Optional)"
    ],
    "ingredientNames": [
      "Grappa",
      "Lemon Juice",
      "Honey Syrup",
      "Chamomile Cordial",
      "Egg White"
    ],
    "method": [
      "Pour all ingredients into the shaker. Shake vigorously with ice.",
      "Strain into a chilled small tumbler glass filled with ice."
    ],
    "garnish": "Garnish with lemon zest and white grapes.",
    "notes": [
      "*If desired water can be replaced by chamomile infusion in the honey mix."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "vesper",
    "name": "Vesper",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/vesper/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-vesper-6695cdd43284b.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Gin",
      "Wine"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": null,
    "addedRemoved": "Added 2011",
    "ingredients": [
      "45 ml Gin",
      "15 ml Vodka",
      "7.5 ml Lillet Blanc"
    ],
    "ingredientNames": [
      "Gin",
      "Vodka",
      "Lillet Blanc"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker filled with ice cubes.",
      "Shake and strain into a chilled cocktail glass."
    ],
    "garnish": "Garnish with lemon zest.",
    "notes": [],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "vieux-carre",
    "name": "Vieux Carré",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/vieux-carre/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-vieux-carre-6694913015248.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Whiskey",
      "Brandy",
      "Liqueurs",
      "Vermouth"
    ],
    "ingredientCount": 5,
    "makeTime": 3,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "30 ml Rye Whiskey",
      "30 ml Cognac",
      "30 ml Sweet Vermouth",
      "1 Bar Spoon Bénédictine",
      "2 Dashes Peychaud’s Bitters"
    ],
    "ingredientNames": [
      "Rye Whiskey",
      "Cognac",
      "Sweet Vermouth",
      "Bénédictine",
      "Bitters"
    ],
    "method": [
      "Pour all ingredients into mixing glass with ice cubes.",
      "Stir well. Strain into chilled cocktail glass."
    ],
    "garnish": "Garnish with orange zest and maraschino cherry.",
    "notes": [],
    "liqueurs": [
      {
        "name": "Bénédictine",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "honey, herbs, spice"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "whiskey-sour",
    "name": "Whiskey Sour",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/whiskey-sour/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-whiskey-sour-66949132e6ae9.webp",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Whiskey"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1993,
    "dateRemoved": null,
    "addedRemoved": "Added 1993",
    "ingredients": [
      "45 ml Bourbon Whiskey",
      "25 ml Lemon Juice [Fresh]",
      "20 ml Sugar Syrup",
      "Few Drops of Egg White (Optional)"
    ],
    "ingredientNames": [
      "Bourbon Whiskey",
      "Lemon Juice",
      "Sugar Syrup",
      "Egg White"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker filled with ice. Shake well.",
      "Strain into cobbler glass. If served “On the rocks”, strain ingredients",
      "into old fashioned glass filled with ice."
    ],
    "garnish": "Garnish with half orange slice and maraschino cherry, optionally use orange zest.",
    "notes": [
      "If egg white is used shake little harder to release and incorporate the foam from the egg white."
    ],
    "liqueurs": [],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "white-lady",
    "name": "White Lady",
    "type": "The Unforgettables",
    "originalType": "The Unforgettables",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/white-lady/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-the-unforgettables-white-lady-6694913318105.webp",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": null,
    "addedRemoved": "Added 1961",
    "ingredients": [
      "40 ml Gin",
      "30 ml Triple Sec",
      "20 ml Lemon Juice [Fresh]"
    ],
    "ingredientNames": [
      "Gin",
      "Triple Sec",
      "Lemon Juice"
    ],
    "method": [
      "Pour all ingredients into cocktail shaker, shake well with ice, strain into chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "zombie",
    "name": "Zombie",
    "type": "Contemporary Classics",
    "originalType": "Contemporary Classics",
    "status": "Current IBA",
    "url": "https://iba-world.com/iba-cocktail/zombie/",
    "image": "https://iba-world.com/wp-content/uploads/2024/07/iba-cocktail-contemporary-classics-zombie-6695cdd6cef05.webp",
    "glassware": "Tall tumbler glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 9,
    "makeTime": 5,
    "dateAdded": 2020,
    "dateRemoved": null,
    "addedRemoved": "Added 2020",
    "ingredients": [
      "45 ml Jamaican dark rum",
      "45 ml Gold Puerto Rican rum",
      "30 ml Demerara Rum",
      "20 ml Fresh lime juice",
      "15 ml Falernum",
      "15 ml Donn’s Mix*",
      "1 tsp Grenadine syrup",
      "1 dash Angostura bitters",
      "6 drops Pernod"
    ],
    "ingredientNames": [
      "Jamaican Dark Rum",
      "Puerto Rican Rum",
      "Demerara Rum",
      "Lime Juice",
      "Falernum",
      "Donn’S Mix*",
      "Grenadine Syrup",
      "Bitters",
      "Pernod"
    ],
    "method": [
      "Add all ingredients into an electric blender with 170 grams of cracked ice.",
      "With pulse bottom blend for a few seconds. Serve in a tall tumbler glass."
    ],
    "garnish": "Garnish with mint leaves.",
    "notes": [
      "*Donn’s Mix: 2 parts of fresh yellow grapefruit and 1 part of cinnamon syrup"
    ],
    "liqueurs": [
      {
        "name": "Falernum",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "lime, almond, ginger, clove"
      },
      {
        "name": "Pernod",
        "subtype": "Anise liqueurs",
        "flavor": "anise"
      }
    ],
    "sourceNote": "Current IBA cocktail page; recipe fields summarized into this local app."
  },
  {
    "id": "legacy-b-52",
    "name": "B-52",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/B-52_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cocktail_B52.jpg",
    "glassware": "Shot glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 2004,
    "dateRemoved": 2020,
    "addedRemoved": "Added 2004; removed 2020",
    "ingredients": [
      "20 ml Coffee liqueur",
      "20 ml Baileys Irish Cream",
      "20 ml Grand Marnier"
    ],
    "ingredientNames": [
      "Coffee Liqueur",
      "Baileys Irish Cream",
      "Grand Marnier"
    ],
    "method": [
      "Layer coffee liqueur, Irish cream, and orange liqueur in a shot glass."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [
      {
        "name": "Coffee Liqueur",
        "subtype": "Coffee liqueurs",
        "flavor": "coffee"
      },
      {
        "name": "Baileys Irish Cream",
        "subtype": "Cream liqueurs",
        "flavor": "cream, cocoa, whiskey"
      },
      {
        "name": "Grand Marnier",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-bacardi",
    "name": "Bacardi",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Bacardi_cocktail",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Bacardi_cocktail.jpg/1280px-Bacardi_cocktail.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1961; removed 2020",
    "ingredients": [
      "45 ml White rum",
      "20 ml Lime Juice",
      "10 ml Grenadine Syrup"
    ],
    "ingredientNames": [
      "White Rum",
      "Lime Juice",
      "Grenadine Syrup"
    ],
    "method": [
      "Shake the ingredients with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "Lime wedge",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-barracuda",
    "name": "Barracuda",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://fr.wikipedia.org/wiki/Barracuda_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Barracuda_Sparkling_Cocktail.png/960px-Barracuda_Sparkling_Cocktail.png",
    "glassware": "Margarita glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs",
      "Wine"
    ],
    "ingredientCount": 5,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": 2024,
    "addedRemoved": "Added 2011; removed 2024",
    "ingredients": [
      "45 ml Gold rum",
      "15 ml Galliano",
      "60 ml Pineapple Juice",
      "1 dash Lime Juice",
      "Top with Prosecco"
    ],
    "ingredientNames": [
      "Rum",
      "Galliano",
      "Pineapple Juice",
      "Lime Juice",
      "Prosecco"
    ],
    "method": [
      "Shake rum, Galliano, pineapple, and lime with ice, strain into the glass, then top with Prosecco."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2024 update."
    ],
    "liqueurs": [
      {
        "name": "Galliano",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "vanilla, anise, herbs"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-derby",
    "name": "Derby",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Derby_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/IBA_Cocktail_Derby_%2828968231993%29.jpg/1280px-IBA_Cocktail_Derby_%2828968231993%29.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Gin"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 1961,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1961; removed 2020",
    "ingredients": [
      "60 ml Gin",
      "2 dashes Peach bitters",
      "2 fresh mint leaves"
    ],
    "ingredientNames": [
      "Gin",
      "Bitters",
      "Mint"
    ],
    "method": [
      "Shake gin and bitters with ice, strain into a chilled cocktail glass, and finish with mint."
    ],
    "garnish": "Mint leaves",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-dirty-martini",
    "name": "Dirty Martini",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Martini_(cocktail)#Variations",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/15-09-26-RalfR-WLC-0084.jpg/1280px-15-09-26-RalfR-WLC-0084.jpg",
    "glassware": "Martini cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Gin",
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": 2020,
    "addedRemoved": "Added 2011; removed 2020",
    "ingredients": [
      "60 ml Gin or Vodka",
      "10 ml Dry Vermouth",
      "10 ml Olive brine"
    ],
    "ingredientNames": [
      "Vodka",
      "Dry Vermouth",
      "Olive Brine"
    ],
    "method": [
      "Stir or shake the ingredients with ice and strain into a chilled martini glass."
    ],
    "garnish": "Green olive",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-godfather",
    "name": "Godfather",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Godfather_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Godfather_cocktail.jpg/1280px-Godfather_cocktail.jpg",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Whiskey",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1987,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1987; removed 2020",
    "ingredients": [
      "35 ml Scotch Whisky",
      "35 ml Amaretto"
    ],
    "ingredientNames": [
      "Scotch Whisky",
      "Amaretto"
    ],
    "method": [
      "Build over ice in an old fashioned glass and stir briefly."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [
      {
        "name": "Amaretto",
        "subtype": "Nuts liqueurs",
        "flavor": "almond"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-godmother",
    "name": "Godmother",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Godfather_(cocktail)#Variations",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Godfather_cocktail.jpg/1280px-Godfather_cocktail.jpg",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1987,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1987; removed 2020",
    "ingredients": [
      "35 ml Vodka",
      "35 ml Amaretto"
    ],
    "ingredientNames": [
      "Vodka",
      "Amaretto"
    ],
    "method": [
      "Build over ice in an old fashioned glass and stir briefly."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [
      {
        "name": "Amaretto",
        "subtype": "Nuts liqueurs",
        "flavor": "almond"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-golden-dream",
    "name": "Golden Dream",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Golden_dream_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Godlen-Dream_Mixed_Drink_Cocktail_%282360538105%29.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 1987,
    "dateRemoved": 2024,
    "addedRemoved": "Added 1987; removed 2024",
    "ingredients": [
      "20 ml Galliano",
      "20 ml Triple Sec",
      "20 ml Orange Juice",
      "10 ml Fresh Cream"
    ],
    "ingredientNames": [
      "Galliano",
      "Triple Sec",
      "Orange Juice",
      "Cream"
    ],
    "method": [
      "Shake all ingredients with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2024 update."
    ],
    "liqueurs": [
      {
        "name": "Galliano",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "vanilla, anise, herbs"
      },
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-harvey-wallbanger",
    "name": "Harvey Wallbanger",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Harvey_Wallbanger",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/44/Harvey_Wallbanger.jpg",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 5,
    "dateAdded": 1987,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1987; removed 2020",
    "ingredients": [
      "45 ml Vodka",
      "90 ml Orange Juice",
      "15 ml Galliano"
    ],
    "ingredientNames": [
      "Vodka",
      "Orange Juice",
      "Galliano"
    ],
    "method": [
      "Build vodka and orange juice over ice, then float Galliano on top."
    ],
    "garnish": "Orange slice and cherry",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [
      {
        "name": "Galliano",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "vanilla, anise, herbs"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-kamikaze",
    "name": "Kamikaze",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Kamikaze_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Kamikaze-cocktail.jpg/1280px-Kamikaze-cocktail.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vodka",
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2004,
    "dateRemoved": 2020,
    "addedRemoved": "Added 2004; removed 2020",
    "ingredients": [
      "30 ml Vodka",
      "30 ml Triple Sec",
      "30 ml Lime Juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Triple Sec",
      "Lime Juice"
    ],
    "method": [
      "Shake with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "Lime wedge",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-orgasm",
    "name": "Orgasm",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Orgasm_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Orgasm_%28cocktail%29.jpg/1280px-Orgasm_%28cocktail%29.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Liqueurs"
    ],
    "ingredientCount": 3,
    "makeTime": 4,
    "dateAdded": 2004,
    "dateRemoved": 2011,
    "addedRemoved": "Added 2004; removed 2011",
    "ingredients": [
      "30 ml Baileys Irish Cream",
      "30 ml Cointreau",
      "20 ml Grand Marnier"
    ],
    "ingredientNames": [
      "Baileys Irish Cream",
      "Cointreau",
      "Grand Marnier"
    ],
    "method": [
      "Shake with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink present in the 2004 list and absent from the 2011 revision."
    ],
    "liqueurs": [
      {
        "name": "Baileys Irish Cream",
        "subtype": "Cream liqueurs",
        "flavor": "cream, cocoa, whiskey"
      },
      {
        "name": "Cointreau",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      },
      {
        "name": "Grand Marnier",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-rose",
    "name": "Rose",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Rose_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Rose_%28cocktail%29.jpg/1280px-Rose_%28cocktail%29.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Vermouth"
    ],
    "ingredientCount": 3,
    "makeTime": 3,
    "dateAdded": 1961,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1961; removed 2020",
    "ingredients": [
      "40 ml Dry Vermouth",
      "20 ml Kirsch",
      "3 dashes Strawberry syrup"
    ],
    "ingredientNames": [
      "Dry Vermouth",
      "Kirsch",
      "Sugar Syrup"
    ],
    "method": [
      "Stir the ingredients with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "Cherry",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-screwdriver",
    "name": "Screwdriver",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Screwdriver_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Screwdriver%2C_Birmingham-Shuttlesworth_International_Airport%2C_Birmingham_AL.jpg/960px-Screwdriver%2C_Birmingham-Shuttlesworth_International_Airport%2C_Birmingham_AL.jpg",
    "glassware": "Highball glass",
    "baseLiquor": [
      "Vodka"
    ],
    "ingredientCount": 2,
    "makeTime": 3,
    "dateAdded": 1987,
    "dateRemoved": 2020,
    "addedRemoved": "Added 1987; removed 2020",
    "ingredients": [
      "50 ml Vodka",
      "100 ml Orange Juice"
    ],
    "ingredientNames": [
      "Vodka",
      "Orange Juice"
    ],
    "method": [
      "Build over ice in a highball glass and stir."
    ],
    "garnish": "Orange slice",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-vampiro",
    "name": "Vampiro",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Vampiro_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Vampiro_coctail_Orange.jpg",
    "glassware": "Old fashioned glass",
    "baseLiquor": [
      "Tequila"
    ],
    "ingredientCount": 6,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": 2020,
    "addedRemoved": "Added 2011; removed 2020",
    "ingredients": [
      "50 ml Tequila",
      "70 ml Tomato Juice",
      "30 ml Orange Juice",
      "10 ml Lime Juice",
      "1 teaspoon Honey",
      "Seasoning to taste"
    ],
    "ingredientNames": [
      "Tequila",
      "Tomato Juice",
      "Orange Juice",
      "Lime Juice",
      "Honey Syrup",
      "Seasoning To Taste"
    ],
    "method": [
      "Shake with ice and strain into an old fashioned glass over ice."
    ],
    "garnish": "Lime wedge",
    "notes": [
      "Former IBA drink removed in the 2020 update."
    ],
    "liqueurs": [],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  },
  {
    "id": "legacy-yellow-bird",
    "name": "Yellow Bird",
    "type": "Legacy",
    "originalType": "Legacy",
    "status": "Former IBA",
    "url": "https://en.wikipedia.org/wiki/Yellow_bird_(cocktail)",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Yellow_Bird_at_Bar_Blanc%2C_Atlanta_GA.jpg/1280px-Yellow_Bird_at_Bar_Blanc%2C_Atlanta_GA.jpg",
    "glassware": "Cocktail glass",
    "baseLiquor": [
      "Rum",
      "Liqueurs"
    ],
    "ingredientCount": 4,
    "makeTime": 4,
    "dateAdded": 2011,
    "dateRemoved": 2024,
    "addedRemoved": "Added 2011; removed 2024",
    "ingredients": [
      "30 ml White rum",
      "15 ml Galliano",
      "15 ml Triple Sec",
      "15 ml Lime Juice"
    ],
    "ingredientNames": [
      "White Rum",
      "Galliano",
      "Triple Sec",
      "Lime Juice"
    ],
    "method": [
      "Shake with ice and strain into a chilled cocktail glass."
    ],
    "garnish": "",
    "notes": [
      "Former IBA drink removed in the 2024 update."
    ],
    "liqueurs": [
      {
        "name": "Galliano",
        "subtype": "Herbs and Anise liqueurs",
        "flavor": "vanilla, anise, herbs"
      },
      {
        "name": "Triple Sec",
        "subtype": "Fruits liqueurs",
        "flavor": "orange"
      }
    ],
    "sourceNote": "Legacy recipe summary based on former IBA/Wikipedia references."
  }
];
