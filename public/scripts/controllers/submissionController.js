(function(module) {
  const submissionController = {};

  submissionController.init = () => {
    $('#about-us-section').hide();
    $('#generated-drinks-section').hide();
    $('#drink-data-selection').hide();
    $('#submission-post-selection').fadeIn(1500);
  };

  module.submissionController = submissionController;
})(window);
