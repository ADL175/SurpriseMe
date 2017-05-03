(function(module) {
  const homeController = {};

  homeController.init = () => {
    $('#about-us-section').hide();
    $('#submission-post-selection').hide();
    $('#generated-drinks-section').hide();
    $('#drink-data-selection').fadeIn(1500);
  };

  module.homeController = homeController;
})(window);
