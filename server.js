'use strict';

const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const drinkKey = '791f7bb8531446d09af4f98a22a06424';
const conString = process.env.DATABASE_URL + 'drinks';
const client = new pg.Client(conString);
const request = require('superagent');
const drinksURL = 'https://addb.absolutdrinks.com/drinks/?apiKey=791f7bb8531446d09af4f98a22a06424';
client.connect();
client.on('error', console.error);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/', (request, response) => response.sendFile('index.html', { root: './public' }));

// app.get('/drinks', (request, response) => response.sendFile('index.html', { root: './public' }));
//
// app.get('/*', (request, response) => response.sendFile('index.html', { root: './public' }));

//////// ** GET REQUESTS ** ////////
////////////////////////////////////////

app.get('/drinks/find', (request, response) =>{
  let sql =
  `SELECT drinks.name, ingredients.id,
    FROM drinks
    INNER JOIN reltable
    ON reltable.drinkName = drinks.name
    INNER JOIN ingredients
    ON reltable.ingredName = ingredients.id
    `;
    client.query(sql).then(function(result){
      response.send(result.rows);
    });
  }
);

app.get('/ingredients', (request, response) => {
  client.query(
    `SELECT *
    FROM ingredients
    INNER JOIN reltable
    ON ingredients.id=reltable.ingredName;`
  )
  .then(result => response.send(result.rows))
  .catch(console.error);
})

app.get('/drinks', (request, response) => {
  console.log('wassup');
  client.query(
    `SELECT *
    FROM drinks
    INNER JOIN reltable
    ON drinks.name=reltable.drinkName;`
  )
  .then(
    result => {

      console.log(result.rows);
      response.send(result.rows);
    }
)
  .catch(console.error);
})

//////// ** POST REQUESTS ** ////////
////////////////////////////////////////


//////// ** PUT REQUESTS ** ////////
////////////////////////////////////////


//////// ** DELETE REQUESTS ** ////////
////////////////////////////////////////




app.listen(PORT, function () {
  console.log(`Your server is now running on port ${PORT}`);
});

//////// ** DATABASE LOADERS ** ////////
////////////////////////////////////////

//////// ** LOAD DRINKS TO DRINKS TABLE ** ////////
////////////////////////////////////////

function loadDrinks() {
  console.log('load drinks says hi');
  request.get(drinksURL)
  .then(results => {
    let drinksData = results.body.result;
    drinksData.map(drinkObj => {
      client.query(
        `INSERT INTO
        drinks(id, name, recipe)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING`,
        [drinkObj.id, drinkObj.name, drinkObj.ingredients.reduce(function(aggr,value){return aggr + '||' + value.textPlain;}, '')]
      )
      .then( function() {
        drinkObj.ingredients.forEach(ingred =>{
          client.query(
            `INSERT INTO
            ingredients(type, id, text, textPlain)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT DO NOTHING`,
            [ingred.type, ingred.id, ingred.text, ingred.textPlain]
            )
            //our special function for reltable
            .then(function () {
              client.query(
                `INSERT INTO
                reltable(drinkName, ingredName)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`,
                [drinkObj.name, ingred.id]
              )
            })
            })
        }) //ends second .then

//START -- YOUTUBE TABLE FOR YOUTUBE LINKS

      // .then( function(){
      //   drinkObj.videos.forEach(vid => {
      //     client.query(
      //       `INSERT INTO
      //       videos(video, type)
      //       VALUES ($1, $2)
      //       ON CONFLICT DO NOTHING`,
      //       [vid.video, vid.type]
      //     )
      //     .then(function() {
      //       client.query(
      //         `INSERT INTO
      //         reltable(videoLink, youvideo)
      //         VALUES ($3)
      //         ON CONFLICT DO NOTHING`,
      //         [rel.videoLink, vid.youvideo]
      //       )
      //     })
      //   })
      // })
//END -- YOUTUBE TABLE FOR YOUTUBE LINKS

      }) //ends the drinksdata.map
    }) //ends the first .then
    // .catch(console.error);
  } //ends main function

//////// ** CREATE DRINKS, INGREDIENTS, VIDEO, REL TABLE ** ////////
////////////////////////////////////////

function loadDB() {
// DRINKS TABLE
  client.query(`
    CREATE TABLE IF NOT EXISTS
    drinks (
      drink_id SERIAL PRIMARY KEY,
      id VARCHAR(1024) UNIQUE NOT NULL,
      name VARCHAR(1024) UNIQUE NOT NULL,
      recipe VARCHAR(1024) UNIQUE NOT NULL
        );
    `)
// INGREDIENTS TABLE
  client.query(`
    CREATE TABLE IF NOT EXISTS
    ingredients (
      ingredients_id SERIAL PRIMARY KEY,
      type VARCHAR(1024) NOT NULL,
      id VARCHAR(1024) UNIQUE NOT NULL,
      text VARCHAR(1024) UNIQUE NOT NULL,
      textPlain VARCHAR(1024) UNIQUE NOT NULL
    );
    `)
//YOUTUBE VIDEO TABLE
    // client.query(`
    //   CREATE TABLE IF NOT EXISTS
    //   videos (
    //     videos_id SERIAL PRIMARY KEY,
    //     video VARCHAR(1024) UNIQUE NOT NULL,
    //     type VARCHAR(1024) UNIQUE NOT NULL
    //   );
    //   `)
// RELATIONAL TABLE
    client.query(`
      CREATE TABLE IF NOT EXISTS
      reltable (
        rel_id SERIAL PRIMARY KEY,
        drinkName VARCHAR(1024) NOT NULL,
        ingredName VARCHAR(1024) NOT NULL
      );
      `)
  .then(loadDrinks)
  .catch(console.error);

}

loadDB();
