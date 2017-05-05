(function(module) {
  const aboutController = {};

  aboutController.init = () => {
    $('#drink-selection').hide();
    $('#generated-drinks-section').hide();
    $('#submission-post-selection').hide();
    $('#about-us-section').fadeIn(1500);
  };

  module.aboutController = aboutController;
})(window);
