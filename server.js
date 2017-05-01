'use strict'

const fs = require('fs');
const express = require('express');
const pg = require('pg');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.'));

app.get('/', (request, response) => response.sendFile('index.html', { root: './' }));

app.listen(PORT, function () {
  console.log(`Your server is now running on port ${PORT}`);
});
