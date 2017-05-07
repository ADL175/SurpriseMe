'use strict';

//////// ** DRINK / ING OPTIONS FILTERS ** ////////

let uniqueIng = [];
let drinkName = [];
let alcoholType = [];

(function (module) {
  const generatorView = {};

  Drinks.all.forEach;

  generatorView.populateFilters = function () {
    console.log('this was run');
    $('#drink-filter').children().remove();
    $('#drink-filter').append('<option> CHOOSE YOUR DRINK </option>');
    let template = Handlebars.compile($('#option-template').text());
    Drinks.fetchAll(function () {
      drinkName = [];
      console.log('populating filters now');
      console.log(Drinks.all);
      Drinks.all.forEach(drink => {
        drinkName.push(drink.name);
      });
      drinkName.sort().forEach(i => {
        var option = new Option(i, i);
        $('#drink-filter').append($(option));
      });
    });

    /////// ** DRINK NAMES FILTERS ** ////////

    Drinks.allDrinks(function (rows) {
      if ($('#drink-filter option').length < 2) {
        $('#drink-filter').append(rows.map(row => template({
          val: row.drinks,
        })));
      }
    });
  };

  generatorView.index = function (drinkSelect) {
    drinkSelect.forEach(a => $('#drink-data-section').append(render(a)));
    generatorView.populateFilters();

  };

  //////// ** HANDLE  OPTIONS FILTERS ** ////////

  generatorView.handleFilters = function () {
    $('#drink-filter').on('change', function () {
      if ($(this).val()) {
        let test = $(this).val();
        let thing = Drinks.all.filter(function (drink) {
          return drink.name === test;
        })[0];

        $('.drink-recipe').remove();
        $('#drink-holder').append(thing.toHtml());
        $('.drink-recipe').show();
        $(`section[data-drink="${$(this).val()}"]`).fadeIn();
      } else {
        $('section').fadeIn();
        $('section.template').hide('');
      }
    });
  };

  Drinks.fetchAll(generatorView.populateFilters);

  generatorView.handleFilters();
  module.Drinks = Drinks;
  module.generatorView = generatorView;

})(window);
