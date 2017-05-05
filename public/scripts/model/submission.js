(function (module) {

function Submit(submitObj) {
  this.id = null;
  this.name = submitObj.name;
  this.ingredients = submitObj.ingredients;
  this.recipe = submitObj.recipe;
  this.tools = 'Shaker, glass, attitude';
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
      tools: this.tool,
      video: this.video,
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
