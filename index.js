"use strict";
const express = require('express');
const app = express();
let jsonData = require('./package.json');

const PORT = 3000;

app.get('/', (request, response) => {
  response.send('Hello World');
});

app.get('/info', (request, response) => {
  response.send("{serverName: " + jsonData['name'] + ", serverVersion: " + jsonData['version'] + "}");
});

app.get('/welcome', (request, response) => {
  response.send('Welcome!');
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
