"use strict";
const express = require('express');
const app = express();
let products = require('./data/products.json');
let categories = require('./data/categories.json');

const PORT = 3000;

//combining product.json with categories.json so that categoryId is the actual name of the category
products.products.map(product => product.categoryName = categories.categories.filter(category => category.id === product.categoryId)[0].categoryName);

app.get('/', (request, response) => {
  response.send('Hello World');
});

//returning all products
app.get('/products/all', (request, response) => {
  response.send(JSON.stringify(products));
});

//returns products with the specified id
app.get('/products/:id', (request, response) => {
  response.send(products.products.filter(product => product.id === request.params.id));
});

//returns products with the specificed categoryId
app.get('/category/:ctyId', (request, response) => {
  response.send(products.products.filter(product => product.categoryId === request.params.ctyId));
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
