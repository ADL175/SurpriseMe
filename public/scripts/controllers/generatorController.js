(function(module) {
  const generatorController = {};

  generatorController.init = () => {
    $('#drink-data-selection').hide();
    $('#about-us-section').hide();
    $('#submission-post-selection').hide();
    $('#generated-drinks-section').fadeIn(1500);
  };

  module.generatorController = generatorController;
})(window);
