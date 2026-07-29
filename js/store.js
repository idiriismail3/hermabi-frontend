const PRODUCTS_KEY = 'hermabi_products';
const CART_KEY = 'maisonAtlasCart';
const SHIPPING_FLAT = 25;
const FREE_SHIPPING_THRESHOLD = 800;

const PRODUCTS = [
  { id:1, name:"Black Catalan Shirt Classic", cat:"Maillots", price:199, stock:50, img:"images/shirt-01.jpg" },
  { id:2, name:"Burgundy Catalan Shirt Premium", cat:"Maillots", price:199, stock:50, img:"images/shirt-02.jpg" },
  { id:3, name:"Beige Catalan Shirt Elegant", cat:"Maillots", price:199, stock:50, img:"images/shirt-03.jpg" },
  { id:4, name:"Navy Blue Catalan Shirt Statement", cat:"Maillots", price:199, stock:50, img:"images/shirt-04.jpg" },
  { id:5, name:"Charcoal Catalan Shirt Limited", cat:"Maillots", price:199, stock:50, img:"images/shirt-05.jpg" },
  { id:6, name:"Black Fluid Pants", cat:"Pantalons", price:199, stock:50, img:"images/hermabi-11.jpg" },
  { id:7, name:"Black Cargo Pants", cat:"Pantalons", price:199, stock:50, img:"images/hermabi-12.jpg" },
  { id:8, name:"Designer Sunglasses", cat:"Accessories", price:100, stock:50, img:"images/sunglasses.png" },
];

function getProducts() {
  const productsJson = localStorage.getItem(PRODUCTS_KEY);
  return productsJson ? JSON.parse(productsJson) : PRODUCTS;
}

function getProduct(id) {
  return getProducts().find(p => p.id === parseInt(id));
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function getCart() {
  const cartJson = localStorage.getItem(CART_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

function addToCart(productId, qty, size) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty, size: size || 'M' });
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function removeFromCart(productId, size) {
  const cart = getCart().filter(item => !(item.id === productId && item.size === size));
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => sum + (getProduct(item.id).price * item.qty), 0);
}

function shippingCost() {
  const sub = cartSubtotal();
  return sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

function cartTotal() {
  return cartSubtotal() + shippingCost();
}

function fmtPrice(price) {
  return price.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
