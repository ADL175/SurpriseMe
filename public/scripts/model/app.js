'use strict';
//WIll have to do IIFE later

  function Drinks(drinkDataObj) {
    Object.keys(drinkDataObj).forEach(key => this[key] = drinkDataObj[key]);
  }

  Drinks.all = [];

  Drinks.loadAll = rows => {
    Drinks.all = rows.map(ele => new Drinks(ele));
    console.log(ele);
  };

  Drinks.fetchAll = callback => {
    $.get('/drinks')
    .then(
      results => {
        Drinks.loadAll(results);
        console.log('app.js ' + results);
        callback();
      }
    )
  };
