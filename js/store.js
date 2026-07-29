const PRODUCTS_KEY = 'hermabi_products';
const CART_KEY = 'maisonAtlasCart';
const SHIPPING_FLAT = 25;
const FREE_SHIPPING_THRESHOLD = 800;
const BACKEND_URL = 'https://hermabi-backend-1.onrender.com';

function getProducts() {
  const productsJson = localStorage.getItem(PRODUCTS_KEY);
  return productsJson ? JSON.parse(productsJson) : [];
}

function getProduct(id) {
  return getProducts().find(p => p.id === parseInt(id));
}

function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  // Save to backend
  fetch(`${BACKEND_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products })
  }).catch(e => console.log('Backend sync failed'));
}

// Sync products from backend on load
async function syncProductsFromBackend() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products`);
    const data = await res.json();
    if (data.success && data.products.length > 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data.products));
    }
  } catch (e) {
    console.log('Backend not available');
  }
}

window.addEventListener('load', syncProductsFromBackend);

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
