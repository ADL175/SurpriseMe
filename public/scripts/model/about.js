'use strict';
(function(module) {

  About.all = [];
  function About(aboutObj) {
    this.teamMember = aboutObj.teamMember;
    this.body = aboutObj.body;
    this.img = aboutObj.img;
  };

  About.prototype.toHtml = function() {
    let template = Handlebars.compile($('#about-template').text());
    return template(this);
  }

  About.fetchAbout = function(callback) {
    $.getJSON('/data/about.json')
    .then(
      function(results) {
        console.log(results);
        results.forEach(function(ele) {
          About.all.push(new About(ele));
        });
        callback();
      }
    );
  };
  module.About = About;
})(window);
