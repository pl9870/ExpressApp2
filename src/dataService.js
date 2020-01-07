let products = require('./data/products.json');
let categories = require('./data/categories.json');

let productMap = new Map();
let categoryMap = new Map();
let combinedProductMap = new Map();

//returns a map of elements with product id with product
function getProducts() {
   products.products.forEach(product => productMap.set(product["id"], product));
   return productMap;
}

//returns a map of elements with category id and category
function getCategories() {
   categories.categories.forEach(category => categoryMap.set(category["id"], category));
   return categoryMap;
}

//returns a map of elements with product id and category and products combined
function combineProductsWithCategories() {
  products.products.map(product => product.categoryName = categories.categories.filter(category => category.id === product.categoryId)[0].categoryName).forEach(obj => combinedProductMap.set(obj["id"], obj));
}

function getCombinedProductMap() {
  if(combinedProductMap.size === 0) {
    combineProductsWithCategories;
  }
  return combinedProductMap;
}

exports.getProducts = getProducts;
exports.getCategories = getCategories;
