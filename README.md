

## 🎯 Project Structure
hermabi-site/
├── index.html (Homepage)
├── shop.html (Products listing)
├── product.html (Product detail page)
├── cart.html (Shopping cart)
├── checkout.html (Checkout & payment)
├── admin.html (Admin dashboard)
├── css/
│ └── style.css (All styling)
├── js/
│ └── store.js (Product & cart logic)
├── images/ (Product images)
└── README.md (This file)

Backend Folder: /backend/
├── hermabi-backend.js (Express server)
├── package.json (Dependencies)
├── orders.json (Saved orders)
└── .env (Environment variables)


---

## 💻 Frontend Setup

### Requirements
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git (optional, for version control)

### Installation

1. **Extract the hermabi-site folder** to your desired location

2. **No NPM installation needed!** The frontend is pure HTML/CSS/JavaScript

3. **Open in browser:**
   - Double-click `index.html` OR
   - Use a local server (recommended):
```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js (if installed)
   npx http-server
```

---

## 🔧 Backend Setup

### Requirements
- **Node.js v16+** (https://nodejs.org)
- **npm** (comes with Node.js)

### Installation

1. **Navigate to backend folder:**
```bash
   cd /path/to/backend
```

2. **Install dependencies:**
```bash
   npm install
```

   This installs:
   - `express` - Web framework
   - `cors` - Cross-origin requests

3. **Create `.env` file** in backend folder:
```bash
   touch .env
```

4. **Add environment variables to `.env`:**

PORT=3000
NODE_ENV=production
FRONTEND_URL=http://localhost:8000
BACKEND_URL=http://localhost:3000


5. **Start the backend:**
```bash
   npm start
```
   
   You should see:

✓ Hermabi backend running on port 3000
✓ Frontend: http://localhost:8000


---

## ⚙️ Configuration

### Change Backend URL (if needed)

**File:** `checkout.html`

**Find this line (around line 245):**
```javascript
fetch('https://hermabi-backend1.onrender.com/api/checkout', {
```

**Change to your backend URL:**
```javascript
fetch('http://localhost:3000/api/checkout', {
```

### Change WhatsApp Number

**File:** `checkout.html`

**Find this line (around line 280):**
```javascript
window.open(`https://wa.me/212611301422?text=${message}`, '_blank');
```

**Change phone number:**
```javascript
window.open(`https://wa.me/YOUR_PHONE_NUMBER?text=${message}`, '_blank');
```

Example: `https://wa.me/212611301422?text=` (Morocco format: +212611301422)

### Admin Password

**File:** `admin.html`

**Find this line (around line 140):**
```javascript
const ADMIN_PASSWORD = 'hermabi2024';
```

**Change password:**
```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

---

## 🚀 Running the Application

### Local Development

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd hermabi-site
python -m http.server 8000
```

**Open in browser:**

http://localhost:8000


### Access Points

- **Homepage:** `http://localhost:8000/index.html`
- **Shop:** `http://localhost:8000/shop.html`
- **Admin Dashboard:** `http://localhost:8000/admin.html`
- **Backend Health Check:** `http://localhost:3000/health`

---

## 🎛️ Admin Dashboard

### Login
1. Go to: `http://localhost:8000/admin.html`
2. Enter password: `hermabi2024` (or your custom password)
3. Click **Connexion**

### Features

**Products Tab:**
- ➕ Add new products with images
- ✏️ Edit product prices and stock
- 🗑️ Delete products
- 📸 Upload images directly from computer

**Orders Tab:**
- 📋 View all customer orders
- 👤 See customer details
- 📦 View ordered products with sizes/quantities
- 💰 Check order totals and payment methods

### Add Product Example

1. Click **"+ Ajouter un Produit"**
2. Fill in:
   - **Product Name:** Black Catalan Shirt
   - **Category:** Maillots
   - **Price:** 199
   - **Stock:** 50
   - **Description:** Premium streetwear
   - **Image:** Upload from your computer
3. Click **"Enregistrer"**

---

## 📱 Payment Methods

Currently only **WhatsApp Payment** is available:

1. Customer adds products to cart
2. Goes to checkout
3. Fills in contact & delivery info
4. Clicks "Confirmer la commande"
5. **Redirected to WhatsApp** with order details
6. Customer messages payment confirmation

### To Add Payment Methods

Edit `checkout.html` to add:
- Stripe
- PayPal
- Bank transfer
- Other payment gateways

---

## 🌐 Deployment

### Deploy Frontend (GitHub Pages)

1. Push code to GitHub repository
2. Enable GitHub Pages in Settings
3. Frontend accessible at: `https://username.github.io/hermabi-site`

### Deploy Backend (Render)

1. Create account at: https://render.com
2. Connect GitHub repository
3. Create new Web Service
4. Set environment variables
5. Backend URL: `https://your-service.onrender.com`

### Update Checkout URL

After deploying, update `checkout.html`:

**Change from:**
```javascript
fetch('http://localhost:3000/api/checkout', {
```

**To:**
```javascript
fetch('https://your-service.onrender.com/api/checkout', {
```

---

## 📊 Data Storage

- **Products:** Stored in browser `localStorage`
- **Cart:** Stored in browser `localStorage`
- **Orders:** Saved in backend `orders.json`
- **Admin Data:** Protected by password

### Clear All Data
```bash
# In browser console (F12 → Console):
localStorage.clear()
```

---

## 🐛 Troubleshooting

### Images Not Showing
- Check image paths in `/images` folder
- Verify file names match in code
- Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Backend Connection Error
- Ensure backend is running: `npm start`
- Check `FRONTEND_URL` in `.env` matches your frontend URL
- Verify CORS is enabled in `hermabi-backend.js`

### Admin Dashboard Not Loading
- Clear browser cache
- Try incognito/private mode
- Check browser console for errors (F12)

### Orders Not Saving
- Check backend is running
- Verify network tab in DevTools shows requests
- Check `orders.json` file permissions

---

## 📝 File Reference

### Key Files to Modify

| File | Purpose | Changes |
|------|---------|---------|
| `checkout.html` | Payment integration | Backend URL, WhatsApp number |
| `admin.html` | Admin access | Password |
| `.env` (backend) | Environment setup | Port, URLs |
| `js/store.js` | Product data | Add/edit products |

---

## 🔐 Security Notes

1. **Admin Password:** Change from default `hermabi2024`
2. **Environment Variables:** Keep `.env` file private (don't commit to Git)
3. **WhatsApp Number:** Use proper format with country code
4. **Backend URL:** Never expose sensitive endpoints publicly

---

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check backend logs in terminal
3. Verify all URLs are correct
4. Clear browser cache
5. Restart backend server

---

## ✅ Quick Start Checklist

- [ ] Install Node.js
- [ ] Run `npm install` in backend folder
- [ ] Create `.env` file with correct URLs
- [ ] Update backend URL in `checkout.html`
- [ ] Update WhatsApp number
- [ ] Change admin password
- [ ] Start backend: `npm start`
- [ ] Start frontend server
- [ ] Test checkout flow
- [ ] Test admin dashboard
- [ ] Add products via admin
- [ ] Deploy to production

---

