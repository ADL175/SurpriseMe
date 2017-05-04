(function(module) {
  const generatorController = {};

  generatorController.init = () => {
    $('#drink-container').hide();
    $('#about-us-section').hide();
    $('#submission-view').hide();
    $('#generated-drinks-section').fadeIn(1500);
  };

  module.generatorController = generatorController;
})(window);
