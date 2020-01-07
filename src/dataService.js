'use strict';

let products = require('./data/products.json');
let categories = require('./data/categories.json');

let productMap = new Map();
let categoryMap = new Map();
let combinedProductMap = new Map();

// returns a map of elements with product id with product
function getProducts() {
  products.products.forEach(product => productMap.set(product['id'], product));
}

// returns a map of elements with category id and category
function getCategories() {
  categories.categories.forEach(cat => categoryMap.set(cat['id'], cat));
}

// returns a map of elements with product id and category and products combined
function combineProductsWithCategories() {
  products.products.map(function(p) {
    p.categoryName =
    categories.categories.filter(c => c.id ===
    p.categoryId)[0].categoryName;
    combinedProductMap.set(p['id'], p);
  });
}

function getCombinedProductMap() {
  if (combinedProductMap.size === 0) {
    combineProductsWithCategories();
  }
  return combinedProductMap;
}

exports.getCombinedProductMap = getCombinedProductMap;
