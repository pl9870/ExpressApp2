'use strict';
let express = require('express');
let app = express();
let products = require('./data/products.json');
let categories = require('./data/categories.json');
let dataService = require('./dataService.js');

let PORT = 3000;

// combining product.json with categories.json
products.products.map(function(p) {
  p.categoryName =
  categories.categories.filter(c => c.id ===
  p.categoryId)[0].categoryName;
});

app.get('/', (request, response) => {
  response.send('Hello World');
});

// returning all products
app.get('/products/all', (request, response) => {
  response.send(Array.from(dataService.getCombinedProductMap()));
});

// returns products with the specified id
app.get('/products/:id', (request, response) => {
  for (const [key, value] of dataService.getCombinedProductMap()) {
    if (key === request.params.id) {
      response.send(JSON.stringify(value));
    }
  }
});

// returns products with specified category id
app.get('/category/:ctyId', (request, response) => {
  let arr = [];
  for (const [key, value] of dataService.getCombinedProductMap()) {
    if (value.categoryId === request.params.ctyId) {
      arr.push(value);
    }
  }
  response.send(arr);
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
