// $('#message').find('b').text('$2000');

$.get('https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424')
.then(result => {
  console.log(result);
});
