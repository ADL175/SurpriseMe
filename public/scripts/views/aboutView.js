
'use strict';

(function(module) {
  const aboutView = {}

  aboutView.initAboutPage = function() {
    About.all.forEach(function(about){
      console.log(about);
      $('#about-us-section').append(about.toHtml());
});
}
  module.aboutView = aboutView;
})(window);