const products = require('./data/products.json');
const categories = require('./data/categories.json');

let productMap = new Map();
let categoryMap = new Map();
let combinedProductMap = new Map();

// returns a map of elements with product id with product
function getProducts() {
  if (productMap.size === 0) {
    products.products.forEach(prod => productMap.set(prod['id'], prod));
  }
}

// returns a map of elements with category id and category
function getCategories() {
  if (categoryMap.size === 0) {
    categories.categories.forEach(cat => categoryMap.set(cat['id'], cat));
  }
}

// returns a map of elements with product id and category and products combined
function combineProductsWithCategories() {
  products.products.forEach(function(prod) {
    prod.categoryName = categories.categories.filter(cat => cat.id === prod.categoryId)[0].categoryName;
    combinedProductMap.set(prod['id'], prod);
  });
}

function getCombinedProductMap() {
  if (combinedProductMap.size === 0) {
    combineProductsWithCategories();
  }
  return combinedProductMap;
}

exports.getCombinedProductMap = getCombinedProductMap;
