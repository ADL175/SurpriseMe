// (function () {
//   const aboutView = {};
//
//   aboutView.createPage = function () {
//     var $page = $('<section>', {
//     });
//
//     $page.append('<p>', {
//
//     })
//   }
//
//   aboutView.initAboutPage = () => {
//     let template = Handlebars.compile($('#about-template').text());
//     Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
//     $('#blog-stats .articles').text(Article.all.length);
//     $('#blog-stats .words').text(Article.numWordsAll());
//   };
//
//   Article.fetchAll(adminView.initAdminPage);
// })();
