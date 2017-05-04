'use strict';
(function (module) {

const homeView = {};

// const render = function(drink){
//   let template = Handlebars.compile($('#drink-template').text());
//   return template(drink);
// };

//////// ** DRINK / ING OPTIONS FILTERS ** ////////
////////////////////////////////////////

homeView.populateFilters = function () {
  let template = Handlebars.compile($('#drink-template').text());

  // Drinks.fetchAll();
  console.log(Drinks.all);
  Drinks.all.map(ele => {
    console.log(ele);
    $('#drink-filter').append(ele);
  });

  // let options = Drinks.allDrinks().map(drink =>{
  //   console.log(drink);
  // }
  //  template({val:drink})
  //  );

  Drinks.allIngredients(function (rows) {
    if ($('#ingredient-filter option').length < 2) {
      $('#ingredient-filter').append(rows.map(row => template({ val: row.ingredients })));
    }
  });
};

//////// ** HANDLE  OPTIONS FILTERS ** ////////
////////////////////////////////////////
// homeView.handleFilters = function(){
//   $('#filters').one('change', 'select', function( {
//     let resource = this.id.replace('-filter', '');
//     page(`/${resource}/${$(this).val().replace(/\W+/g, '+')}`);
//   }));
// };
Drinks.fetchAll(homeView.populateFilters);

module.homeView = homeView;

// homeView.handleFilters();
})(window);
