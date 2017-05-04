'use strict';
(function(module) {
  const generatorController = {};

  generatorController.init = () => {
    $('#drink-container').hide();
    $('#about-us-section').hide();
    $('#submission-view').hide();
    $('#generated-drinks-section').fadeIn(1500);
  };

  generatorController.index = (ctx) => generatorView.index(ctx.drinkSelect);

  generatorController.loadById = (ctx, next) => {
    let ingredientTypeData = drinksByIngredType => {
      ctx.drinkSelect = drinksByIngredType;
      next();
    };

    Drinks.findWhere('id', ctx.params.ingredientName.replace('+', ' '), ingredientTypeData);
  };

  module.generatorController = generatorController;
})(window);
