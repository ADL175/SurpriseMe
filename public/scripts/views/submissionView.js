(function () {
  const newDrink = {};

  newDrink.createForm = function () {
    var $form = $('<form/>', {
      action: '/submission',
    });

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Drink Name',
        id: 'drink-name',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Alcohol Type',
        id: 'alcohol-name',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Ingredients',
        id: 'ingredients',
      })
    );

    $form.append(
      $('<textarea>', {
        type: 'text',
        placeholder: 'Recipe',
        id: 'recipe',
      })
    );

    $form.append(
      $('<input>', {
        type: 'submit',
        id: 'submit',
        name: 'submit',
      })
    );

    $('#submission-post-section').append($form);
  };

  newDrink.initNewDrinkPage = function () {
    console.log('init new drink');
    $('.submission').show();
    $('#export-field').hide();
    $('#drink-json').on('focus', function () {
      $(this).select();
    });

    $('#submission-post-section').on('change', newDrink.create);
    $('#submission-post-section').on('submit', newDrink.submit);
  };

  newDrink.create = function () {
    console.log('create function');
    $('#user-drinks').empty();
    let formDrink = new Drinks({
      drinkName: $('#drink-name').val(),
      alcohol: $('#alcohol-name').val(),
      ingredients: $('#ingredients').val(),
      recipe: $('#recipe').val(),
    });
    $('#user-drinks').append(formDrink.toHtml('#form-template'));
  };

  newDrink.submit = function (event) {
    console.log('handle submit');
    event.preventDefault();
    let userDrink = new Drinks({
      drinkName: $('#drink-name').val(),
      alcohol: $('#alcohol-name').val(),
      ingredients: $('#ingredients').val(),
      recipe: $('#recipe').val(),
    });
    userDrink.insertRecord();
  };

  newDrink.initNewDrinkPage();
  newDrink.createForm();
})();
