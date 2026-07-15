// ---- HERMABI catalog — Moroccan-Catalan fusion streetwear ----
const PRODUCTS = [
  { id: 1,  name: "Black Catalan Shirt Classic",      cat: "Maillots",  price: 199, img: "images/shirt-01.jpg", desc: "Oversized black shirt with classic 00 print. Moroccan tailoring meets Catalan minimalism." },
  { id: 2,  name: "Burgundy Catalan Shirt Premium",   cat: "Maillots",  price: 199, img: "images/shirt-02.jpg", desc: "Premium burgundy fusion shirt. Comfortable oversize fit, perfect for everyday wear." },
  { id: 3,  name: "Beige Catalan Shirt Elegant",      cat: "Maillots",  price: 199, img: "images/shirt-03.jpg", desc: "Elegant beige shirt with embroidered details. Quality Catalan craftsmanship." },
  { id: 4,  name: "Navy Blue Catalan Shirt Statement", cat: "Maillots",  price: 199, img: "images/shirt-04.jpg", desc: "Navy blue premium shirt. Statement piece for the modern Moroccan-Catalan style." },
  { id: 5,  name: "Charcoal Catalan Shirt Limited",   cat: "Maillots",  price: 199, img: "images/shirt-05.jpg", desc: "Textured charcoal shirt with unique fabric. Limited edition fusion design." },
  { id: 6,  name: "Black Fluid Pants",                 cat: "Pantalons", price: 199, img: "images/hermabi-11.jpg", desc: "Fluid black pants, elastic waist, comfortable straight cut." },
  { id: 7,  name: "Black Cargo Pants",                 cat: "Pantalons", price: 199, img: "images/hermabi-12.jpg", desc: "Black cargo pants with flap pockets, drawstring waist." },
  { id: 8,  name: "Designer Sunglasses",               cat: "Accessories", price: 100, img: "images/sunglasses.png", desc: "Premium sunglasses with UV protection. Statement accessory for the modern Hermabi style." },
];

// ---- Helper function for price formatting ----
function fmtPrice(amount) {
  return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'MAD' }).replace('MAD', 'DHS');
}

function getProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

// ---- Cart management (localStorage) ----
const CART_KEY = 'maisonAtlasCart';
const SHIPPING_FLAT = 39;
const FREE_SHIPPING_THRESHOLD = 800;

function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }
  saveCart(cart);
  updateCartCount();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function updateCartItemQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartSubtotal() {
  return getCart().reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

function shippingCost() {
  const subtotal = cartSubtotal();
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

function cartTotal() {
  return cartSubtotal() + shippingCost();
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.qty, 0);
  const elements = document.querySelectorAll('.cart-count');
  elements.forEach(el => el.textContent = count);
}

// Update cart count on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateCartCount);
} else {
  updateCartCount();
}