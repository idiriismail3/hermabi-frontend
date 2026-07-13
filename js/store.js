/* ==========================================================================
   MAISON ATLAS — store.js
   Product catalog (placeholder data — replace with your real products/images)
   + cart logic using localStorage (client-side, works once the site is hosted)
   ========================================================================== */

const CURRENCY = "MAD";

// ---- HERMABI catalog — Moroccan-Catalan fusion streetwear, all at 300 MAD. ----
const PRODUCTS = [
  { id: 1,  name: "Maillot Oversize Bordeaux 00",   cat: "Maillots",  price: 300, img: "images/hermabi-01.jpg", desc: "Maillot oversize côtelé, coupe Marocaine ample, finitions Catalanes épurées. Col v, print 00." },
  { id: 2,  name: "Maillot Oversize Marine",         cat: "Maillots",  price: 300, img: "images/hermabi-02.jpg", desc: "Maillot côtelé, fusion tailoring marocain + minimalisme catalan, col montant, coupe streetwear." },
  { id: 3,  name: "Maillot Marine Print 00",          cat: "Maillots",  price: 300, img: "images/hermabi-03.jpg", desc: "Maillot marine, col v, gros floquage 00. Héritage marocain, esthétique catalane urbaine." },
  { id: 4,  name: "Maillot Gris Bicolore Print 00",   cat: "Maillots",  price: 300, img: "images/hermabi-05.jpg", desc: "Maillot côtelé, bordures contrastées, numéro 00. Fusion Maroc-Catalogne en une pièce." },
  { id: 5,  name: "Maillot Gris Bicolore",             cat: "Maillots",  price: 300, img: "images/hermabi-06.jpg", desc: "Oversize gris, bordures noires, coupe marocaine ample + épure catalane. Streetwear fusion." },
  { id: 6,  name: "Maillot Bordeaux",                  cat: "Maillots",  price: 300, img: "images/hermabi-07.jpg", desc: "Oversize bordeaux, col montant, tissu côtelé. Tailoring marocain, sensibilité catalane." },
  { id: 7,  name: "Maillot Noir Print 00",             cat: "Maillots",  price: 300, img: "images/hermabi-08.jpg", desc: "Maillot noir, col v, floquage 00 blanc. Croisement des traditions Maroc + Catalogne." },
  { id: 8,  name: "Maillot Bordeaux Foncé",            cat: "Maillots",  price: 300, img: "images/hermabi-09.jpg", desc: "Oversize bordeaux foncé, col montant. Coupe généreuse marocaine, design épuré catalan." },
  { id: 9,  name: "Maillot Bordeaux Print 00",         cat: "Maillots",  price: 300, img: "images/hermabi-10.jpg", desc: "Maillot bordeaux, col v, numéro 00 ton sur ton. Fusion streetwear Maroc-Catalogne." },
  { id: 10, name: "Pantalon Fluide Noir",              cat: "Pantalons", price: 300, img: "images/hermabi-11.jpg", desc: "Pantalon fluide, taille élastique, coupe droite. Confort marocain + minimalisme catalan." },
  { id: 11, name: "Pantalon Cargo Noir",               cat: "Pantalons", price: 300, img: "images/hermabi-12.jpg", desc: "Cargo noir, poches à rabat, cordon de serrage. Fonctionnel marocain, esthétique catalane." },
  { id: 12, name: "Maillot Noir",                      cat: "Maillots",  price: 300, img: "images/hermabi-13.jpg", desc: "Oversize noir, col montant, côtelé premium. La fusion Hermabi : Maroc rencontre Catalogne." },
];

function fmtPrice(n){
  return n.toLocaleString('fr-FR') + " " + CURRENCY;
}

function getProduct(id){
  return PRODUCTS.find(p => p.id === Number(id));
}

// ---------------- Cart (localStorage) ----------------
const CART_KEY = "maisonAtlasCart";

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, qty){
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(i => i.id === Number(id));
  if(existing){ existing.qty += qty; }
  else{ cart.push({ id: Number(id), qty }); }
  saveCart(cart);
}

function updateCartQty(id, qty){
  let cart = getCart();
  if(qty <= 0){
    cart = cart.filter(i => i.id !== Number(id));
  }else{
    const item = cart.find(i => i.id === Number(id));
    if(item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(id){
  const cart = getCart().filter(i => i.id !== Number(id));
  saveCart(cart);
}

function cartCount(){
  return getCart().reduce((sum,i) => sum + i.qty, 0);
}

function cartSubtotal(){
  return getCart().reduce((sum,i) => {
    const p = getProduct(i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

const SHIPPING_FLAT = 39; // MAD flat rate placeholder — adjust to your real rates
const FREE_SHIPPING_THRESHOLD = 800;

function shippingCost(){
  const sub = cartSubtotal();
  if(sub === 0) return 0;
  return sub >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}

function cartTotal(){
  return cartSubtotal() + shippingCost();
}

function updateCartBadge(){
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = cartCount());
}

function showToast(msg){
  let toast = document.querySelector('.toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
