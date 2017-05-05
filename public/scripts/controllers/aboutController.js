(function(module) {
  const aboutController = {};

  aboutController.init = () => {
    $('#drink-container').hide();
    // $('login.html').hide();
    $('#generated-drinks-section').hide();
    $('#submission-view').hide();
    $('#about-us-section').fadeIn(1500);
  };

  module.aboutController = aboutController;
})(window);
