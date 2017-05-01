// $('#message').find('b').text('$2000');

// $.get('https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424')
// .then(result => {
//   console.log(result);
// });

jQuery.ajax({
     type: "GET",
     url: 'https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424',
     dataType: "jsonp",
     cache: false,
     crossDomain: true,
     processData: true,


     success: function (data) {
         alert(JSON.stringify(data));
     },
     error: function (XMLHttpRequest, textStatus, errorThrown) {
         alert("error");
     }
 });
