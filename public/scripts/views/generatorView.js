//////// ** DRINK / ING OPTIONS FILTERS ** ////////
////////////////////////////////////////

let uniqueIng = [];
let drinkName = [];
let alcoholType = [];

(function (module) {
  const generatorView = {};

  Drinks.all.forEach;

  generatorView.populateFilters = function () {
    let template = Handlebars.compile($('#option-template').text());
    Drinks.fetchAll();


    /////// ** DRINK NAMES FILTERS ** ////////
    ////////////////////////////////////////

    Drinks.all.forEach(drink => {
      drinkName.push(drink.name);
    });
    drinkName.sort().forEach(i => {
      var option = new Option(i, i);
      $('#drink-filter').append($(option));
    });

    Drinks.all.forEach(drink => {
      let alch = drink.alcoholType;
      for (let i = 0; i < alch.length; i++) {
        if (!alcoholType.includes(alch[i])) {
          // console.log(ing[i]);
          uniqueIng.push(ing[i].name);
        }
      }
    });
    uniqueIng.sort().forEach(i => {
      var option = new Option(i, i);
      $('#ingredient-filter').append($(option));
    });

    Drinks.allDrinks(function (rows) {
      if ($('#drink-filter option').length < 2) {
        $('#drink-filter').append(rows.map(row => template({
          val: row.drinks,
        })));
      }
    });
  };

  generatorView.index = function (drinkSelect) {
    //   $('#drink-data-section').show().siblings().hide();
    // $('#drink-data-section div').remove();
    drinkSelect.forEach(a => $('#drink-data-section').append(render(a)));
    generatorView.populateFilters();

  };

  //////// ** HANDLE  OPTIONS FILTERS ** ////////
  ////////////////////////////////////////


  generatorView.randomFilters = function(){
    $('#random-drink').on('click',function(){
      if($(this).val()){
        let test = Drinks.all[Math.floor(Math.random() * Drinks.all.length)].name;
        let thing = Drinks.all.filter(function(drink){
          return drink.name === test;
        })[0];
        $('.drink-recipe').remove();
        $('#drink-holder').append(thing.toHtml());
        $('.drink-recipe').show();
        $(`section[data-drink="${$(this).val()}"]`).fadeIn();
      }
      else {
        $('section').fadeIn();
        $('section.template').hide('');
      }
    });
  };


  generatorView.handleFilters = function(){
    $('#drink-filter').on('change',function(){
      if($(this).val()){
        let test = $(this).val();
        let thing = Drinks.all.filter(function(drink){
          return drink.name === test;
        })[0];
        $('.drink-recipe').remove();
        $('#drink-holder').append(thing.toHtml());
        $('.drink-recipe').show();
        $(`section[data-drink="${$(this).val()}"]`).fadeIn();
      }
      else {
        $('section').fadeIn();
        $('section.template').hide('');
      }
    });
  };


  Drinks.fetchAll(generatorView.populateFilters);

  generatorView.handleFilters();
  generatorView.randomFilters();

})(window);
