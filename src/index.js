"use strict";
const express = require('express');
const app = express();
let products = require('./data/products.json');
let categories = require('./data/categories.json');
let dataService = require('./dataService.js');

const PORT = 3000;

//combining product.json with categories.json so that categoryId is the actual name of the category
products.products.map(product => product.categoryName = categories.categories.filter(category => category.id === product.categoryId)[0].categoryName);

app.get('/', (request, response) => {
  response.send('Hello World');
});

//returning all products
app.get('/products/all', (request, response) => {
  response.send(Array.from(dataService.getProducts()));
});

//returns products with the specified id
app.get('/products/:id', (request, response) => {
  for (const [key, value] of dataService.getProducts()) {
    if(key === request.params.id) {
      response.send(JSON.stringify(value));
    }
  }
});

//returns products with specified category id
app.get('/category/:ctyId', (request, response) => {
  let arr = [];
  for (const [key, value] of dataService.getProducts()) {
    if(value.categoryId === request.params.ctyId) {
      arr.push(value);
    }
  }
  response.send(arr);
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
