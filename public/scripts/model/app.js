'use strict';
//WIll have to do IIFE later

  function Drinks(drinkDataObj) {
    Object.keys(drinkDataObj).forEach(key => this[key] = drinkDataObj[key]);
  }

  Drinks.all = [];

  Drinks.loadAll = rows => {
    console.log(rows);
      let drinkNames = [];
    rows.map(ele => {
        // console.log(ele.name);
        if(!drinkNames.includes(ele.name)){
          drinkNames.push(ele.name);
      }  });
        console.log(drinkNames);

      // new Drinks(ele);
    // });
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
