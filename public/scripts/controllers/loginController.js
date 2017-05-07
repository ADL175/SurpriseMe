'use strict';

(function (module) {
  const loginController = {};

  loginController.init = () => {
    $('#about-us-section').hide();
    $('#generated-drinks-section').hide();
    $('#drink-container').hide();
    $('#submission-view').hide();
    $('login.html').fadeIn(1500);
  };

  module.loginController = loginController;
})(window);
