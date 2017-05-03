'use strict';

//IIFE

const generatorController  = {};

generatorController.index = (ctx) => generatorView.index(ctx.drinkSelect);

generatorController.loadById = (ctx, next) => {
  let ingredientTypeData = drinksByIngredType => {
    ctx.drinkSelect = drinksByIngredType;
    next();
  };

  Drinks.findWhere('id', ctx.params.ingredientName.replace('+', ' '), ingredientTypeData);
};


// generatorController.loadById = (ctx, next) => {
//   let ingredientTypeData = drinksByIngredType => {
//     ctx.drinkSelect = drinksByIngredType;
//     next();
//   };
//
//   Drinks.findWhere('id', ctx.params.ingredientName.replace('+', ' '), ingredientTypeData);
// };
