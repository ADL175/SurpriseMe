(function (module) {

function Submit(submitObj) {
  this.name = submitObj.name;
  this.ingredients = submitObj.ingredients;
  this.recipe = submitObj.recipe;
}

Submit.prototype.toHtml = function () {
  let template = Handlebars.compile($('#form-template').text());
  return template(this);
};

Submit.prototype.insertRecord = function (callback) {
  console.log('hi this is post');
  $.post('/drinks', {
      name: this.name,
      ingredients: this.ingredients,
      recipe: this.recipe,
    })
    .then(res => {
      console.log(res);
      return res;
    })
    .then(callback)
    .catch(console.error);
};

$(document).ready(function () {
  Submit.prototype.toHtml(homeView.populateFilters);
  $('.nav .tab:first').click();
});

module.Submit = Submit;
})(window);
