'use strict'

const fs = require('fs');
const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const drinkKey = '791f7bb8531446d09af4f98a22a06424';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(function(req, res) {
  res.header('Access-Control-Allow-Origin', '.');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
})

app.get('/', (request, response) => response.sendFile('index.html', { root: './public' }));

app.listen(PORT, function () {
  console.log(`Your server is now running on port ${PORT}`);
});

//////// ** DATABASE LOADERS ** ////////
////////////////////////////////////////

function loadDrinks() {
  fs.readFile('https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO
        drinks(id, name, description, ingredients, drinkTypes)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT DO NOTHING`,
        [ele.id, ele.name, ele.description, ele.ingredients, ele.drinkTypes]
      )
      .catch(console.error);
    })
  })
}

function loadDB
