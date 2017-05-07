'use strict';

(function (module) {
  const submissionController = {};

  submissionController.init = () => {
    $('#about-us-section').hide();
    $('#generated-drinks-section').hide();
    $('#drink-container').hide();
    $('#submission-view').fadeIn(1500);
  };

  module.submissionController = submissionController;
})(window);
