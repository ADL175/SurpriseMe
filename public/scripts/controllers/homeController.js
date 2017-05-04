(function(module) {
  const homeController = {};

  homeController.init = () => {
    $('#about-us-section').hide();
    $('#submission-view').hide();
    $('#generated-drinks-section').hide();
    $('#drink-container').fadeIn(1500);
  };

  Drinks.prototype.toHtml(homeView.populateFilters)
  module.homeController = homeController;
})(window);
