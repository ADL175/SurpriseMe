(function () {
  const newDrink = {};

  newDrink.initNewDrink = function () {
    var $form = $('<form/>',
    { action: '/submissionController' }
  );

    $form.append(
    $('<input>',
    { type: 'text',
      placeholder: 'Drink Name',
      id: 'drink-name',
      style: 'width: 20%', }
    )
  );

    $form.append(
    $('<input>',
    { type: 'text',
      placeholder: 'Alcohol Type',
      id: 'alcohol-name',
      style: 'width 20%', }
    )
  );

    $form.append(
    $('<input>',
    { type: 'text',
      placeholder: 'Mixer',
      id: 'mixer-name1',
      style: 'width 20%', }
    )
  );

    $form.append(
    $('<input>',
    { type: 'text',
      placeholder: 'Mixer',
      id: 'mixer-name2',
      style: 'width 20%', }
    )
  );

    $form.append(
    $('<input>',
    { type: 'text',
      placeholder: 'Instructions',
      id: 'instructions',
      style: 'height: 40%', }
    )
  );

    $form.append(
    $('<input>',
    { type: 'submit',
      id: 'submit',
      value: 'Search',
      style: 'width: 20%', }
    )
  );

    $('#submission-post-section').append($form);
  };

  newDrink.handleFormSubmit = function (event) {
    event.preventDefault();
    let userDrink = new Drinks({
      drinkName: $('#drink-name').val(),
      alcohol: $('alcohol-name').val(),
      mixer1: $('mixer-name1').val(),
      mixer2: $('mixer-name2').val(),
      instructions: $('instructions').val(),
    });
  };

  newDrink.initNewDrink();
})();
