'use strict';

(function (module) {
  const newDrink = {};

  newDrink.createForm = function () {
    var $formContent = $('<div>', {
      action: '/submission',
    });

    $formContent.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Drink Name',
        id: 'drink-name',
      })
    );

    $formContent.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Ingredients',
        id: 'ingredients',
      })
    );

    $formContent.append(
      $('<textarea>', {
        type: 'text',
        placeholder: 'Recipe',
        id: 'recipe',
      })
    );

    $formContent.append(
      $('<input>', {
        type: 'submit',
        id: 'submit',
        name: 'submit',
      })
    );

    $('#submission-post-section').append($formContent);
  };

  newDrink.initNewDrinkPage = function () {
    $('.submission').show();
    $('#export-field').hide();
    $('#drink-json').on('focus', function () {
      $(this).select();
    });

    $('#submission-post-section').on('change', newDrink.create);
    $('#submission-post-section').on('submit', newDrink.submit);
  };

  newDrink.create = function () {
    $('#user-drinks').empty();
    let formDrink = new Submit({
      name: $('#drink-name').val(),
      ingredients: $('#ingredients').val(),
      recipe: $('#recipe').val(),
    });
    $('#user-drinks').append(formDrink.toHtml('#form-template'));
  };

  newDrink.submit = function (event) {
    event.preventDefault();
    let userDrink = new Submit({
      name: $('#drink-name').val(),
      ingredients: $('#ingredients').val(),
      recipe: $('#recipe').val(),
    });
    userDrink.insertRecord();
  };

  newDrink.initNewDrinkPage();
  newDrink.createForm();

  module.newDrink = newDrink;
})(window);
