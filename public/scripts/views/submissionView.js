(function() {
  const newDrink = {};

  newDrink.createForm = function() {
    var $form = $('<form/>', {
      action: '/submission',
    });

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Drink Name',
        id: 'drink-name',
        style: 'width: 20%',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Alcohol Type',
        id: 'alcohol-name',
        style: 'width 20%',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Mixer',
        id: 'mixer-name1',
        style: 'width 20%',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Mixer',
        id: 'mixer-name2',
        style: 'width 20%',
      })
    );

    $form.append(
      $('<input>', {
        type: 'text',
        placeholder: 'Instructions',
        id: 'instructions',
        style: 'height: 40%',
      })
    );

    $form.append(
      $('<input>', {
        type: 'submit',
        id: 'submit',
        placeholder: 'submit',
        style: 'width: 20%',
      })
    );

    $('#submission-post-section').append($form);
  };

  newDrink.initNewDrinkPage = function() {
    $('.tab-content').show();
    $('#export-field').hide();
    $('#drink-json').on('focus', function() {
      $(this).select();
    });
    $('#new-form').on('change', newDrink.create);
    $('#new-form').on('submit', newDrink.submit);
  };

  newDrink.create = function() {
    $('#articles').empty();
    let formDrink = new Drinks({
      drinkName: $('#drink-name').val(),
      alcohol: $('alcohol-name').val(),
      mixer1: $('mixer-name1').val(),
      mixer2: $('mixer-name2').val(),
      instructions: $('instructions').val(),
    });
    $('#articles').append(formDrink.toHtml('#form-template'));
  };


  newDrink.handleFormSubmit = function(event) {
    event.preventDefault();
    let userDrink = new Drinks({
      drinkName: $('#drink-name').val(),
      alcohol: $('alcohol-name').val(),
      mixer1: $('mixer-name1').val(),
      mixer2: $('mixer-name2').val(),
      instructions: $('instructions').val(),
    });
    $('#submit').on('click', append());
    $('#articles').append(formDrink.toHtml('#form-template'));
  };

  newDrink.createForm();
})();
