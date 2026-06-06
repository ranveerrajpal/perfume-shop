# Maison Éclat — Perfume Shop

A full-stack perfume e-commerce application built with React, Node.js, Express, and MongoDB.

## Architecture

```
perfume-shop/
├── server/               # Node.js + Express API
│   ├── index.js          # Server entry point + routes
│   ├── models.js         # Mongoose schemas (Product, Review)
│   ├── seed.js           # Database seeder (6 products + reviews)
│   └── package.json
└── client/               # React frontend
    ├── src/
    │   ├── App.js                    # Router + CartProvider
    │   ├── context/CartContext.js    # Cart state
    │   ├── components/
    │   │   ├── Navbar.js / .css      # Responsive sticky navbar
    │   │   └── ProductCard.js / .css # Cards with hover effects
    │   └── pages/
    │       ├── Home.js / .css        # Homepage
    │       └── ProductPage.js / .css # Product detail page
    └── package.json
```

## Prerequisites
- Node.js ≥ 16
- MongoDB running locally on port 27017 (or set MONGO_URI env var)

## Setup

### 1. Install & seed the database
```bash
cd server
npm install
node seed.js   # Seeds 6 products + ~20 reviews into MongoDB
```

### 2. Start the API server
```bash
node index.js  # Runs on http://localhost:5000
```

### 3. Start the React frontend (new terminal)
```bash
cd client
npm install
npm start      # Runs on http://localhost:3000
```

The React app proxies `/api/*` requests to `localhost:5000` automatically.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | All products |
| GET | `/api/products/:id` | Single product |
| GET | `/api/products/:id/reviews` | Reviews for product |
| POST | `/api/products/:id/reviews` | Submit new review |

### POST /api/products/:id/reviews
```json
{
  "author": "Sophie L.",
  "rating": 5,
  "title": "Absolutely divine",
  "body": "My signature scent for years..."
}
```

## Features

### Homepage
- **Full-screen hero banner** with cinematic background, animated scroll indicator, and CTA buttons
- **Animated marquee ribbon** with shipping/brand messaging
- **Product grid** (6 perfumes) with category filter buttons
- **Dual-image hover effect** on product cards — secondary image crossfades on hover
- **Overlay CTA** slides up on card hover
- **About section** with editorial two-column layout
- **Footer** with brand info and navigation

### Product Page
- **Sticky image gallery** with thumbnail navigation and fade transitions
- **Fragrance notes** displayed as top/heart/base
- **Size selector** with per-size pricing (updates displayed price)
- **Add to Bag** button with confirmation animation + cart counter in navbar
- **Wishlist button**
- **Social share buttons** (X/Twitter, Facebook, Pinterest, WhatsApp, Copy Link)
- **Reviews section** with average rating display
- **Review submission form** with star rating input + live append to list

## Environment Variables (server/.env)
```
MONGO_URI=mongodb://localhost:27017/perfume-shop
PORT=5000
```

## Design System
- **Palette**: Ivory `#FAF7F2`, Gold `#C9A96E`, Charcoal `#1C1C1E`, Warm Gray `#8A8278`
- **Typography**: Cormorant Garamond (display) + Jost (body)
- **Aesthetic**: Luxury editorial — refined minimalism with gold accents, grain overlays, generous negative space
