'use strict';

(function (module) {

  Drinks.all = [];

  function Drinks(drinkDataObj) {
    this.id = drinkDataObj.id;
    this.name = drinkDataObj.name;
    this.recipe = drinkDataObj.recipe.split('||').slice(1);
    this.tools = drinkDataObj.tools.split('||').slice(1);
    this.video = drinkDataObj.video.split('||').slice(1, 2).toString();
    this.ingredients = drinkDataObj.ingredients.split('||').slice(1);
    this.youURL = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${this.video}" frameborder="0" allowfullscreen></iframe>`;

    this.image = `http://assets.absolutdrinks.com/drinks/transparent-background-white/${this.id}.png`;
  }

  Drinks.loadAll = rows => {
    Drinks.all = rows.map(ele => new Drinks(ele));
  };

  Drinks.allDrinks = () => {
    return Drinks.all.map(drinks => drinks.name)
      .reduce((drinkNames, drinkName) => {
        if (name.indexOf(drinkName) === -1) drinkNames.push(drinkName);
        return drinkNames;
      }, []);
  };

  Drinks.fetchAll = callback => {
    $.get('/drinks')
      .then(
        results => {
          Drinks.loadAll(results);
          callback();
        }
      );
  };

  //DRINKS TO HTML
  Drinks.prototype.toHtml = function () {
    let template = Handlebars.compile($('#drink-recipe-template').text());
    return template(this);
  };

  Drinks.prototype.insertRecord = function (callback) {
    $.post('/drinks', {
        drinkName: this.drinkName,
        alcohol: this.alcohol,
        ingredients: this.ingredients,
        recipe: this.recipe,
      })
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
    Drinks.prototype.toHtml(homeView.populateFilters);
    $('.nav .tab:first').click();
  });

  module.Drinks = Drinks;
})(window);
