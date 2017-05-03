'use strict';

(function (module) {

function Drinks(drinkDataObj) {
  Object.keys(drinkDataObj).forEach(key => this[key] = drinkDataObj[key]);
}

Drinks.all = [];

Drinks.prototype.toHtml = function () {
  let template = Handlebars.compile($('#form-template').text());
  return template(this);
};

Drinks.prototype.insertRecord = function (callback) {
  $.post('/submission', { drinkName: this.drinkName, alcohol: this.alcohol, mixer1: this.mixer1, mixer2: this.mixer2, instructions: this.instructions })
  .then(console.log)
  .then(callback);
};

Drinks.loadAll = rows => {
  Drinks.all = rows.map(ele => new Drinks(ele));
  console.log(Drinks.all);
};

Drinks.fetchAll = callback => {
  console.log('sup');
  $.get('/drinks')
  .then(
    results => {
      console.log(results);
      Drinks.loadAll(results);
      callback();
    }
  );
};

Drinks.allDrinks = () => {
  return Drinks.all.map(drinks => drinks.name)
  .reduce((drinkNames, drinkName)=> {
    if (names.indexOf(drinkName) === -1)drinkNames.push(drinkName);
    return drinkNames;
  }, []);
};

Drinks.allIngredients = function (callback) {
  $.get('/ingredients', callback);
};

module.Drinks = Drinks;
})(window);

// Drinks.fetchAll();
