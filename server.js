'use strict';

const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const drinkKey = '791f7bb8531446d09af4f98a22a06424';
const conString = process.env.DATABASE_URL;
const client = new pg.Client(conString);
const request = require('superagent');
const drinksURL = 'https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424';
client.connect();
client.on('error', console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static('./public'));

app.get('/', (request, response) => response.sendFile('index.html', {
  root: './public',
}));
app.get('/login', (request, response) => response.sendFile('login.html', {
  root: './public',
}));
app.get('/submission', (request, response) => response.sendFile('index.html', {
  root: './public',
}));
app.get('/about', (request, response) => response.sendFile('index.html', {
  root: './public',
}));

//////// ** GET REQUESTS ** ///////

app.get('/drinks', (request, response) => {
  client.query(
      `SELECT *
    FROM drinks;`
    )
    .then(
      result => {
        response.send(result.rows);
      })
    .catch(console.error);
});

//////// ** POST REQUESTS ** ////////

app.post('/drinks', (request, response) => {
  console.log(request.body);
  console.log('hi this is post');
  client.query(
      `INSERT INTO drinks(id, name, recipe, ingredients, tools, video)
    VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING`, [request.body.id, request.body.name, request.body.recipe, request.body.ingredients, request.body.tools, request.body.video]
    )
    .then(() => response.send('Insert Complete'))
    .catch(console.log);
});

app.listen(PORT, function () {
  console.log(`Your server is now running on port ${PORT}`);
});

//////// ** DATABASE LOADERS ** ////////

function loadDrinks() {
  request.get(drinksURL)
    .then(results => {
      let drinksData = results.body.result;
      drinksData.map(drinkObj => {
        client.query(
          `INSERT INTO
        drinks(id, name, recipe, ingredients, tools, video)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING`, [
            drinkObj.id,
            drinkObj.name,
            drinkObj.ingredients.reduce(function(aggr, value) {
              return aggr + '||' + value.textPlain;
            }, ''),
            drinkObj.ingredients.reduce(function(aggr, value) {
              return aggr + '||' + value.id;
            }, ''),
            drinkObj.tools.reduce(function(aggr, value) {
              return aggr + '||' + value.text;
            }, ''),
            drinkObj.videos.reduce(function(aggr, value) {
              return aggr + '||' + value.video;
            }, ''),

          ]
        );
      });
    });
};

//////// ** CREATE DRINKS, INGREDIENTS, VIDEO, REL TABLE ** ////////

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    drinks (
      drink_id SERIAL PRIMARY KEY,
      id VARCHAR(1024) UNIQUE NOT NULL,
      name VARCHAR(1024) UNIQUE NOT NULL,
      recipe VARCHAR(1024) NOT NULL,
      ingredients VARCHAR(1024) NOT NULL,
      tools VARCHAR(1024) NOT NULL,
      video VARCHAR(1024) NOT NULL
        );
    `)

    .then(loadDrinks)
    .catch(console.error);
}

loadDB();
