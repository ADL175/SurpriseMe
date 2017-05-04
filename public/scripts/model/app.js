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
  .reduce((drinkNames, drinkName) => {
    if (names.indexOf(drinkName) === -1)drinkNames.push(drinkName);
    return drinkNames;
  }, []);
};

Drinks.allIngredients = function (callback) {
  $.get('/ingredients', callback);
};

Drinks.prototype.insertRecord = function (callback) {
  $.post('/drinks', { drinkName: this.drinkName, alcohol: this.alcohol, ingredients: this.ingredients, recipe: this.recipe })
  .then(console.log)
  .then(callback);
};

Drinks.prototype.deleteRecord = function (callback) {
  $.ajax({
    url: `/drinks/${this.drink_id}`,
    method: 'DELETE',
  })
  .then(console.log)
  .then(callback);
};

Drinks.prototype.updateRecord = function (callback) {
  $.ajax({
    url: `/drinks/${this.drink_id}`,
    method: 'DELETE',
    data: {
      drinkName: this.drinkName,
      alcohol: this.alcohol,
      ingredients: this.ingredients,
      recipe: this.recipe,
    },
  })
  .then(console.log)
  .then(callback);
};

$(document).ready(function () {
Drinks.prototype.toHtml(homeView.populateFilters)
  $('.nav .tab:first').click();
});

module.Drinks = Drinks;
})(window);

// Drinks.fetchAll();
