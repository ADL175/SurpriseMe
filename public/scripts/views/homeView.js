'use strict';

(function (module) {

const homeView = {};

//////// ** DRINK / ING OPTIONS FILTERS ** ////////

homeView.populateFilters = function () {
  let template = Handlebars.compile($('#drink-template').text());
  Drinks.all.map(ele => {
    $('#drink-filter').append(ele);
  });

  Drinks.allIngredients(function (rows) {
    if ($('#ingredient-filter option').length < 2) {
      $('#ingredient-filter').append(rows.map(row => template({ val: row.ingredients })));
    }
  });
};

//////// ** HANDLE  OPTIONS FILTERS ** ////////

Drinks.fetchAll(homeView.populateFilters);

module.homeView = homeView;

})(window);
