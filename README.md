# Wander CodeWare

A luxury minimalist fashion brand website built with React, TypeScript, and Tailwind CSS. This project demonstrates a modern e-commerce frontend with a focus on clean aesthetics, responsive design, and user experience.

## Tech Stack

- **Framework:** React 19 + Vite 8
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 (Custom Monochromatic Theme)
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **Package Manager:** Bun
- **Deployment:** Netlify

## Features

- **Luxury Aesthetic:** Strict monochromatic color palette with Playfair Display / Inter typography pairing
- **Responsive Design:** Mobile-first with a dedicated bottom navigation bar on mobile
- **Dark Mode:** System-aware toggle with localStorage persistence
- **Product Catalog:** Filterable by category, sortable by price
- **Product Detail:** Size selection and Add to Cart with visual confirmation
- **Persistent Cart:** React Context + localStorage — survives page refresh
- **Contact Form:** Frontend-validated with success feedback

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

```bash
git clone <your-repo-url>
cd wander-codeware
bun install
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
bun run build   # outputs to dist/
bun run preview # preview the production build locally
```

## Project Structure

```
src/
├── components/      # Layout (header, bottom nav)
├── context/         # AppContext — cart + dark mode state
├── data/            # products.ts — mock data + TypeScript interfaces
├── pages/           # Home, Shop, ProductDetailPage, Cart, AboutPage, ContactPage
├── App.tsx          # BrowserRouter + routes
└── main.tsx         # Entry point
```

## Design Decisions

- **Monochromatic palette (`luxury-50`–`luxury-950`):** Keeps the focus on product imagery and typography; avoids accent colors competing with the goods
- **Tailwind v4 `@theme`:** Color tokens defined in CSS, not a config file — no `tailwind.config.js` required
- **Single `AppContext`:** Cart and dark mode share one provider to keep the tree shallow
- **Bottom navigation on mobile:** Thumb-reachable; mirrors native app conventions
- **Dot matrix texture:** Adds depth to hero/header sections without breaking the minimal aesthetic

## Deployment (Netlify)

1. Push to GitHub
2. Connect the repo in Netlify → **New site from Git**
3. Build command: `bun run build`
4. Publish directory: `dist`
5. Add a `netlify.toml` for SPA routing (see below) or enable the redirect manually in site settings

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## License

MIT — free to use for learning or portfolio projects.
