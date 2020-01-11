let express = require('express');
let app = express();
const products = require('./data/products.json');
const categories = require('./data/categories.json');
const dataService = require('./dataService.js');

let PORT = 3000;

app.get('/', (request, response) => {
  response.send('Hello World');
});

// returning all products
app.get('/products/all', (request, response) => {
  response.send(JSON.stringify(mapToObj(dataService.getCombinedProductMap())));
});

//helper function because response.send can't send maps
const mapToObj = map => {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {});
};


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
  let tempMap = new Map();
  for (const [key, value] of dataService.getCombinedProductMap()) {
    if (value.categoryId === request.params.ctyId) {
      tempMap.set(key,value);
    }
  }
  response.send(JSON.stringify(mapToObj(tempMap)));
});

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
