'use strict';
//WIll have to do IIFE later

  // function Drinks(drinkDataObj) {
  //   Object.keys(drinkDataObj).forEach(key => this[key] = drinkDataObj[key]);
  // }
  Drinks.all = [];
  Ingredients.all =[];


  function Ingredients(data){
    this.type = data[0];
    this.name = data[1];
    console.log(this.type);
    // Ingredients.all.push()
  }

  function Drinks(drinkDataObj) {
    this.id = drinkDataObj.id;
    this.name = drinkDataObj.name;
    this.recipe = drinkDataObj.recipe.split('||').slice(1);
    this.tools = drinkDataObj.tools.split('||').slice(1);
    this.video = drinkDataObj.video.split('||').slice(1,2).toString();
    this.ingredients = drinkDataObj.ingredients.split('||').slice(1);
    this.youURL = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.video}" frameborder="0" allowfullscreen></iframe>`;
    this.ingredients = this.ingredients.map(function(ing){
      return new Ingredients(ing.split(':'));
    });
    this.image = `http://assets.absolutdrinks.com/drinks/transparent-background-white/${this.id}.png`;
  }


  Drinks.loadAll = rows => {
  Drinks.all = rows.map(ele => new Drinks(ele));
  console.log(Drinks.all);
};

  Drinks.fetchAll = callback => {
    // console.log('sup');
    $.get('/drinks')
    .then(
      results => {
        // console.log(results);
        Drinks.loadAll(results);
        callback();
      }
    )
  };
//
// Drinks.allDrinks = () => {
//     return Drinks.all.map(drinks => drinks.name)
//     .reduce((drinkNames, drinkName)=>{
//       if(names.indexOf(drinkName)=== -1)drinkNames.push(drinkName);
//       return drinkNames;
//     }, []);
// };

Drinks.allIngredients = function(callback){
  $.get('/ingredients', callback);
};

// Drinks.fetchAll();
