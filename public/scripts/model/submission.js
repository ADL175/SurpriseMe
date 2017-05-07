'use strict';

(function (module) {

function Submit(submitObj) {
  this.id = null;
  this.name = submitObj.name;
  this.ingredients = submitObj.ingredients;
  this.recipe = submitObj.recipe;
  this.tools = 'Glass || Shaker || Attitude || Will';
  this.video = 'no video';
}

Submit.prototype.toHtml = function () {
  let template = Handlebars.compile($('#form-template').text());
  return template(this);
};

Submit.prototype.insertRecord = function (callback) {
  $.post('/drinks', {
      id: this.name,
      name: this.name,
      recipe: this.recipe,
      ingredients: this.ingredients,
      tools: this.tools,
      video: this.video,
    })
    .then(res => {
      return res;
    })
    .then(callback)
    .then(generatorView.populateFilters)
    .catch(console.error);
};

$(document).ready(function () {
  Submit.prototype.toHtml(homeView.populateFilters);
  $('.nav .tab:first').click();
});

module.Submit = Submit;
})(window);
