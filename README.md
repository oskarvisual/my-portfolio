# Oscar Fernandez · Portfolio

> **Full-Stack Ecommerce Engineer & Systems Architect**  
> 15+ years building high-volume ecommerce systems, bespoke WordPress & Shopify architectures, Python backend pipelines, and industrial warehouse software that sell, scale, and actually work.

[![Live Website](https://img.shields.io/badge/Live_Site-oskarvisual.github.io%2Fmy--portfolio-2ea44f?style=for-the-badge&logo=githubpages&logoColor=white)](https://oskarvisual.github.io/my-portfolio/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)

🌐 **Live Website**: [https://oskarvisual.github.io/my-portfolio/](https://oskarvisual.github.io/my-portfolio/)

---

## 📌 Overview

This repository contains the source code for the personal portfolio of **Oscar Fernandez**. Built as an editorial, performance-focused single-page application crafted with a warm minimalist aesthetic, tactile typography, physical device mockups, and cinematic scroll-driven interactions.

### Key Highlights

* **Hero with iPhone 17 Video Presentation**:
  * Precision vector iPhone 17 hardware frame with live system clock synchronization on the iOS status bar.
  * Vertical video presentation with unmuted audio playback, YouTube play badge, smooth 0.5-second cinematic fade-to-black outro, and interactive post-play contact menu.
* **The Cart Story (Scroll-Pinned Narrative)**:
  * A continuous top-down supermarket aisle journey featuring a shopping cart with technology plush mascots that progressively reveals technical depth across 5 scenes.
  * Responsive choreography zooms out the cart and floor on mobile while transitioning smoothly with GSAP ScrollTrigger.
* **What I Build (Interactive Video Showcase)**:
  * Responsive stages showcasing 4 core service areas with embedded 16:9 demonstration videos:
    1. *Ecommerce Development* (WooCommerce HPOS, Bedrock, WP-CLI, Shopify Plus, BigCommerce)
    2. *Integrations & Automation* (Webhooks, cron queues, ShipStation, Finale, Salesforce, n8n, Make)
    3. *Infrastructure & Performance* (Linux, AWS, DigitalOcean, Nginx, Redis, Cloudflare, Core Web Vitals)
    4. *Custom Tools & Delivery* (Retool, custom WP plugins, Python/CLI tools, QA testing, versioned CI deployments)
* **Recent Projects & Architectures**:
  1. **Great Old Broads for Wilderness** · *National Conservation Non-Profit (US)* — Bespoke UX/UI design system with 20+ native Gutenberg blocks (React + PHP SSR) in a modular monorepo (`● Under Construction`).
  2. **AT3 Tactical – Custom Enterprise Ecommerce Engine & 14 Bespoke Plugins** · *High-Volume Technical Retail* — $45M+ lifetime GMV WooCommerce flagship with Algolia search, AWS S3/CloudFront offload, Finale Inventory RMA reconciliation, automated affiliate syndication feeds, and ShipStation dispatch.
  3. **bAInners – AI Image Banners** · *Shopify App Store* — Generative AI promotional banner studio with n8n workflow automation and Theme App Extensions.
  4. **AI Product Questions & Answers** · *Shopify App Store* — Pre-purchase conversational AI concierge grounded on product specs with n8n background pipelines.
  5. **BrAIker – Trading Bot Fleet Control Room** · *FinTech & Algorithmic Trading* — Multi-user autonomous paper-trading platform for US equities via Alpaca Paper API with strict risk gates.
  6. **Wave Putaway App & Python Logistics API** · *Industrial Warehouse Software* — Ruggedized mobile station (Retool Mobile + Zebra) and Python FastAPI backend with cart concurrency lock, split putaway, and 50% dock-to-stock acceleration.
* **Experience Timeline**:
  * 15+ years career timeline detailing roles as Head of Development, Senior Architect, and Lead Engineer.
* **Direct Contact & Scheduling**:
  * Interactive contact suite with live typewriter effect, instant clipboard email copy, downloadable resume PDF, direct phone/WhatsApp links, and Calendly discovery call scheduling.

---

## 🛠️ Tech Stack

* **Frontend**: [React 18](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/)
* **Build Tool & Bundler**: [Vite 5](https://vitejs.dev/)
* **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) with custom font pairings (`Inter`, `Playfair Display`, `JetBrains Mono`) and warm editorial palettes
* **Animation & Motion**: [GSAP 3](https://greensock.com/gsap/) · [ScrollTrigger](https://greensock.com/scrolltrigger/) with `gsap.matchMedia()`
* **Icons**: [Lucide React](https://lucide.dev/)
* **CI/CD & Deployment**: GitHub Actions deploying to [GitHub Pages](https://pages.github.com/)

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+ or 20+
* npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/oskarvisual/my-portfolio.git

# Navigate into the project folder
cd my-portfolio

# Install dependencies
npm install
```

### Local Development

```bash
# Start local development server with Hot Module Replacement (HMR)
npm run dev
```

Open [http://localhost:5173/my-portfolio/](http://localhost:5173/my-portfolio/) in your browser.

### Production Build

```bash
# Type-check and compile optimized bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
my-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml         # Automated GitHub Actions deployment to GitHub Pages
├── public/                    # Static public assets
├── src/
│   ├── assets/
│   │   ├── docs/              # Downloadable PDF Resume
│   │   ├── images/            # Optimized SVG & raster assets (iPhone 17, cart, floor)
│   │   └── videos/            # Capability demo videos & presentation MP4
│   ├── components/
│   │   ├── Header.tsx             # Sticky minimalist navigation
│   │   ├── Hero.tsx               # Editorial hero section
│   │   ├── HeroPhone.tsx          # iPhone 17 hardware mockup with presentation video
│   │   ├── CartStory.tsx          # ScrollTrigger pinned supermarket cart narrative
│   │   ├── WhatIBuild.tsx         # Interactive capability stages with video demos
│   │   ├── Projects.tsx           # Production case studies & architectures
│   │   ├── ExperienceTimeline.tsx # 15+ years career timeline
│   │   ├── ImpactStats.tsx        # Quantifiable impact metrics
│   │   └── Footer.tsx             # Contact channels, typewriter terminal & resume download
│   ├── App.tsx                    # Main layout container & scroll setup
│   ├── index.css                  # Global styles, fonts, and Tailwind directives
│   └── main.tsx                   # React root entry point
├── tailwind.config.js             # Theme extensions (warm palettes, custom fonts)
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite configuration with /my-portfolio/ base path
```

---

## 📬 Contact & Connect

* **Live Website**: [https://oskarvisual.github.io/my-portfolio/](https://oskarvisual.github.io/my-portfolio/)
* **LinkedIn**: [linkedin.com/in/oscarfer](https://www.linkedin.com/in/oscarfer/)
* **Calendly**: [calendly.com/oscarferher](https://calendly.com/oscarferher)
* **Direct Phone / WhatsApp**: [+51 977 675 421](https://wa.me/51977675421)
* **Email**: [oskarvisual@gmail.com](mailto:oskarvisual@gmail.com)
