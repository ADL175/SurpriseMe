'use strict';

const generatorView = {};

// const render = function(drink){
//   let template = Handlebars.compile($('#drink-template').text());
//   return template(drink);
// };

//////// ** DRINK / ING OPTIONS FILTERS ** ////////
////////////////////////////////////////

let uniqueIng = [];
let drinkName = [];

Drinks.all.forEach

generatorView.populateFilters = function(){
  let template = Handlebars.compile($('#option-template').text());
  Drinks.fetchAll();
  // console.log(Drinks.all);

  //////// INGREDIENTS FILTERS ** ////////
  ////////////////////////////////////////

  Drinks.all.forEach(drink => {
    let ing = drink.ingredients;
    for (let i = 0; i < ing.length; i++){
      if(!uniqueIng.includes(ing[i].name)){
        // console.log(ing[i]);
        uniqueIng.push(ing[i].name);
      }
    }
  });
    uniqueIng.sort().forEach(i => {
      var option = new Option(i,i);
      $('#ingredient-filter').append($(option));
    });

/////// ** DRINK NAMES FILTERS ** ////////
    ////////////////////////////////////////

    Drinks.all.forEach(drink => {
      drinkName.push(drink.name)
    });
      drinkName.sort().forEach(i => {
        var option = new Option(i,i);
        $('#drink-filter').append($(option));
      });







  Drinks.allDrinks(function(rows) {
    if($('#drink-filter option').length < 2) {
      $('#drink-filter').append(rows.map(row => template({val:row.drinks})));
    }
  });
};

generatorView.index = function(drinkSelect){
//   $('#drink-data-section').show().siblings().hide();
// $('#drink-data-section div').remove();
  drinkSelect.forEach(a => $('#drink-data-section').append(render(a)))
  generatorView.populateFilters();
  // generatorView.handleFilters();
}


//////// ** HANDLE  OPTIONS FILTERS ** ////////
////////////////////////////////////////
// generatorView.handleFilters = function(){
//   $('#filters').on('change', 'select', function( {
//     let resource = this.id.replace('-filter', '');
//     page(`/${resource}/${$(this).val().replace(/\W+/g, '+')}`);
//   }));
// };





Drinks.fetchAll(generatorView.populateFilters);
// generatorView.handleFilters();
