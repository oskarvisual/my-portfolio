# Oscar Fernandez · Portfolio

> **Full-Stack Ecommerce Developer & Systems Architect**  
> 15+ years building ecommerce systems, custom software, backend pipelines, and server infrastructure that sell, scale, and actually work.

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)

---

## 📌 Overview

This repository contains the source code for the personal portfolio of **Oscar Fernandez**. The site is an editorial, performance-focused single-page application crafted with a warm minimalist aesthetic, tactile typography, and cinematic scroll-driven interactions.

### Key Highlights

* **Hero & Editorial Typography**: Clean typographic contrast, availability indicators, bilingual status, and prepared standing video area slot.
* **The Cart Story (Pinned Scroll Experience)**: A continuous, scroll-pinned top-down supermarket aisle journey featuring a shopping cart with technology plush mascots that progressively reveals technical depth across 5 scenes. Responsive choreography zooms out the cart and floor on mobile while transitioning smoothly.
* **What I Build (Interactive Capability Accordion)**: Horizontal desktop accordion and responsive mobile stages showcasing 4 core service areas with embedded 16:9 demonstration videos:
  1. *Ecommerce Development* (WooCommerce HPOS, Bedrock, WP-CLI, Shopify Plus, BigCommerce)
  2. *Integrations & Automation* (Webhooks, cron queues, ShipStation, Finale, Salesforce, n8n, Make)
  3. *Infrastructure & Performance* (Linux, AWS, DigitalOcean, Nginx, Redis, Cloudflare, Core Web Vitals)
  4. *Custom Tools & Delivery* (Retool, custom WP plugins, Python/CLI tools, QA testing, versioned CI deployments)
* **Selected Projects & Impact**: Case studies including high-volume stores (AT3 Tactical, 4Patriots, etc.), accessible job boards (Disiswork), and agency leadership.
* **Direct Contact & Schedule**: Interactive contact section with typewriter status, direct email copy, resume download, and Calendly meeting booking.

---

## 🛠️ Tech Stack

* **Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom typography, warmth color palettes, and editorial utilities
* **Animation & Scroll Choreography**: [GSAP 3](https://greensock.com/gsap/) and [ScrollTrigger](https://greensock.com/scrolltrigger/) with `gsap.matchMedia()` for responsive timelines
* **Icons**: [Lucide React](https://lucide.dev/)

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

### Development

```bash
# Start local development server with HMR
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Type check and build optimized bundle for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```text
my-portfolio/
├── public/                 # Static public assets
├── src/
│   ├── assets/
│   │   ├── docs/          # Downloadable PDF Resume
│   │   ├── images/        # Optimized raster assets (cart, floor texture, avatar)
│   │   └── videos/        # 16:9 capability showcase MP4 videos
│   ├── components/
│   │   ├── Header.tsx             # Sticky minimalist navigation
│   │   ├── Hero.tsx               # Editorial hero section
│   │   ├── CartStory.tsx          # ScrollTrigger pinned cart narrative
│   │   ├── WhatIBuild.tsx         # Interactive collapsible accordion with video demos
│   │   ├── Projects.tsx           # Production case studies & architectures
│   │   ├── ExperienceTimeline.tsx # 15+ years career timeline
│   │   ├── ImpactStats.tsx        # Quantifiable impact metrics
│   │   └── Footer.tsx             # Contact section & terminal typewriter
│   ├── App.tsx                    # Main app container & scroll setup
│   ├── index.css                  # Global styles, fonts, and Tailwind directives
│   └── main.tsx                   # React root entry point
├── tailwind.config.js             # Theme extensions (warm palettes, custom fonts)
├── tsconfig.json                  # TypeScript compiler configuration
└── vite.config.ts                 # Vite bundler configuration
```

---

## 📬 Contact & Connect

* **Website**: [oscarfernandez.dev](https://oscarfernandez.dev)
* **LinkedIn**: [linkedin.com/in/oscarfer](https://www.linkedin.com/in/oscarfer/)
* **Calendly**: [calendly.com/oscarferher](https://calendly.com/oscarferher)
* **Email**: [oskarvisual@gmail.com](mailto:oskarvisual@gmail.com)
