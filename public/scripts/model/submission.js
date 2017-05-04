(function (module) {

function Submit(submitObj) {
  this.drinkName = submitObj.drinkName
  this.alcohol = submitObj.alcohol;
  this.ingredients = submitObj.ingredients;
  this.recipe = submitObj.recipe;
}

Submit.prototype.toHtml = function () {
  let template = Handlebars.compile($('#form-template').text());
  return template(this);
};

$(document).ready(function () {
  Submit.prototype.toHtml(homeView.populateFilters);
  $('.nav .tab:first').click();
});

module.Submit = Submit;
})(window);
