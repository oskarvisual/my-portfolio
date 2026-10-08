import React, { useState } from 'react';

interface FeatureHighlightCategory {
  category: string;
  items: { name: string; description: string }[];
}

interface Project {
  number: string;
  title: string;
  clientType: string;
  highlightMetric: string;
  description: string;
  stack: string[];
  architecturePoints: string[];
  url?: string;
  urlLabel?: string;
  featureHighlights?: FeatureHighlightCategory[];
  featureToggleLabel?: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'AT3 Tactical – Custom Enterprise Ecommerce Engine & 14 Bespoke Plugins',
    clientType: 'AT3 Tactical · High-Volume Technical Commerce',
    highlightMetric: '$45M+ Lifetime GMV · Bespoke Theme · 14 Custom Plugins',
    description:
      'Architected and engineered the end-to-end ecommerce technology stack for AT3 Tactical—combining a high-conversion custom WooCommerce theme with a proprietary ecosystem of 14 bespoke plugins and cloud microservices. Replaced fragile off-the-shelf plugins with purpose-built, battle-tested solutions: sub-50ms Algolia search, AWS S3/CloudFront asset offloading, real-time Finale Inventory RMA reconciliation, automated affiliate syndication feeds, and zero-defect ShipStation fulfillment routing.',
    architecturePoints: [
      'Bespoke WooCommerce Theme: Engineered from scratch for complex variation discovery, technical gear specifications, and lightning-fast checkout flow.',
      'Sub-50ms Algolia Search & Facets: Enterprise catalog indexing with instant autocomplete, attribute-based filtering, and typo-tolerant discovery across 15,000+ SKUs.',
      'Automated Multi-Channel Feed Syndication: Custom feed engines for AvantLink and Gun.deals with automated XML generation, commission tiers, and health alerts.',
      'Two-Way ERP & RMA Inventory Automation: Real-time Finale Inventory synchronization converting customer returns and open-box items into sellable inventory.',
      'Cloud Media Offloading & Operations: Automated batch AWS S3 + CloudFront CDN migration eliminating disk bloat, paired with Help Scout HPOS order integration and Make.com automation hubs.',
    ],
    stack: [
      'WooCommerce',
      'PHP 8.2',
      'MySQL',
      'Algolia',
      'AWS S3 / CloudFront',
      'Finale Inventory',
      'ShipStation',
      'Make.com',
      'Help Scout',
      'Gutenberg',
    ],
    url: 'https://www.at3tactical.com',
    urlLabel: 'Visit Storefront',
    featureToggleLabel: 'Explore All 14 Proprietary Micro-Plugins & Bespoke Theme',
    featureHighlights: [
      {
        category: 'Catalog, Search & Digital Experience',
        items: [
          {
            name: 'Theme AT3 Tactical',
            description:
              'Custom WooCommerce theme engineered for technical gear catalogs, variation discovery, dynamic promos, and sub-second page loads.',
          },
          {
            name: 'AT3 Algolia',
            description:
              'Supercharges catalog search with instant autocomplete, faceted filters by price/category/attributes, and sub-50ms product discovery.',
          },
          {
            name: 'AT3 Blocks',
            description:
              'Proprietary Gutenberg block library empowering marketing teams to launch high-converting landing pages, FAQs, and promos without developers.',
          },
          {
            name: 'AT3 Image Editor',
            description:
              'Secure tokenized bridge connecting WordPress media directly with internal image optimization microservices.',
          },
        ],
      },
      {
        category: 'Affiliate & Marketplace Syndication',
        items: [
          {
            name: 'AT3 AvantLink',
            description:
              'Automates affiliate feed generation and delivery with dynamic pricing, commission tiers, and category-level exclusion rules.',
          },
          {
            name: 'AT3 Gun.deals Feed Manager',
            description:
              'High-throughput XML syndication feed with automated product filtering, feed health diagnostics, and real-time quality alerts.',
          },
          {
            name: 'AT3 Convert Image Links',
            description:
              'Auto-downloads and re-hosts external email campaign creatives onto WordPress for Klaviyo, FunnelKit, and ActiveCampaign templates.',
          },
        ],
      },
      {
        category: 'Operations, Reverse Logistics & ERP',
        items: [
          {
            name: 'AT3 Open Box Returns',
            description:
              'Direct Finale Inventory integration converting returns and open-box gear into live sellable stock with sublocation tracking.',
          },
          {
            name: 'AT3 CSV Importer',
            description:
              'Bulk catalog ingestion engine processing GTIN/UPC, MAP, MSRP, wholesale pricing rules, and batch validation at scale.',
          },
          {
            name: 'AT3 Make Integration',
            description:
              'Operational middleware hub connecting store orders and catalog events to Make.com scenarios with retry logging.',
          },
        ],
      },
      {
        category: 'Fulfillment Integrity, Cloud & Support',
        items: [
          {
            name: 'AT3 S3 Offload',
            description:
              'Offloads media libraries to Amazon S3 and CloudFront CDN with automated batch migration, retry queues, and local retention controls.',
          },
          {
            name: 'AT3 ShipStation Gun Bucks Fix',
            description:
              'Proportional discount allocation algorithm ensuring accurate line-item totals and frictionless fulfillment dispatch.',
          },
          {
            name: 'AT3 Shipping Zones',
            description:
              'Extends shipping zone logic to accurately support US territories (Puerto Rico, Guam) with customized delivery rules.',
          },
          {
            name: 'AT3 HelpScout Integration',
            description:
              'Embeds live WooCommerce order data directly into the Help Scout agent sidebar with modern HPOS compatibility.',
          },
          {
            name: 'AT3 YITH Reviews Importer',
            description:
              'Review hygiene engine with automated anti-spam filtering, verified-buyer validation, and rating synchronization.',
          },
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'Great Old Broads for Wilderness – Enterprise Platform & Custom UX/UI Design System',
    clientType: 'National Conservation Non-Profit (US)',
    highlightMetric: 'Custom UX/UI Design System · 20+ Native Gutenberg Blocks · Monorepo',
    description:
      'Engineered an enterprise-grade digital platform and a 100% bespoke UX/UI design system for Great Old Broads for Wilderness, a prominent US women-led grassroots conservation non-profit. Replaced bulky third-party page builders with 20+ native custom Gutenberg blocks (React + PHP SSR), delivering 1:1 visual parity between the WordPress editor and frontend, frictionless donation funnels, and sub-second Core Web Vitals.',
    architecturePoints: [
      'Bespoke UX/UI Design System: Proprietary design tokens (broads-purple, coral, sunshine), Geist & Inter typography, and conversion-optimized donation & grassroots advocacy funnels.',
      '20+ Native Custom Gutenberg Blocks: Hybrid architecture coupling React/JSX block editors with PHP SSR classes (GreatOldBroads_Abstract_Block) for semantic, zero-bloat HTML output.',
      '1:1 Visual Parity (Editor vs. Frontend): What content teams construct in the React editor matches the live public experience pixel-for-pixel, eliminating layout surprises.',
      'Modular Monorepo Architecture: Strict separation of concerns segregating theme presentation, decoupled portable custom-plugins, mu-plugins, and Docker Compose local orchestration.',
    ],
    stack: [
      'WordPress',
      'PHP 8.3 OOP',
      'React',
      'Gutenberg API',
      'Tailwind CSS 3.4',
      'esbuild',
      'Lucide Icons',
      'Docker Compose',
      'MariaDB 11.4',
    ],
    url: 'https://www.greatoldbroads.org',
    urlLabel: 'Visit Live Platform',
    featureToggleLabel: 'Explore Bespoke Design System & 20+ Native Gutenberg Blocks',
    featureHighlights: [
      {
        category: 'Custom-Authored UX/UI & Design System',
        items: [
          {
            name: 'Bespoke Brand Tokens & Palette',
            description:
              'Tailored color architecture (broads-purple, coral, paper, sunshine), soft elevation system (shadow-soft), and modern typography pairing (Geist & Inter).',
          },
          {
            name: 'Advocacy & High-Conversion Donor Journeys',
            description:
              'Frictionless donation funnels, multi-tiered membership subscriptions, grassroots action petitions, and downloadable conservation toolkits.',
          },
          {
            name: 'Zero Design-to-Code Fidelity Loss',
            description:
              'Direct UX/UI leadership into engineering—every microinteraction, responsive rhythm, hover state, and accessible element crafted without translation gaps.',
          },
        ],
      },
      {
        category: '20+ Native Gutenberg Blocks (Zero Bloatware)',
        items: [
          {
            name: '1:1 Visual Parity (Admin vs Frontend)',
            description:
              'The editor React canvas renders exactly as the public site does, empowering non-technical editorial teams to publish complex layouts with zero styling breakage.',
          },
          {
            name: 'Hybrid Rendering (React + SSR PHP)',
            description:
              'Interactive React block interface for editors paired with lightweight, semantic server-side PHP classes (GreatOldBroads_Abstract_Block) for optimal SEO & CWV.',
          },
          {
            name: 'Custom Block Suite',
            description:
              'Includes banner-hero, advocacy-actions, four-pillars, giving-options, people-grid, impact-stats, and custom testimonial carousels.',
          },
        ],
      },
      {
        category: 'Modern Engineering Monorepo & Pipeline',
        items: [
          {
            name: 'Decoupled Monorepo Structure',
            description:
              'Strict separation of concerns isolating theme presentation (theme/greatoldbroads/), business logic (custom-plugins/), and mu-plugins/.',
          },
          {
            name: 'Tailwind CSS 3.4 & esbuild Compilation',
            description:
              'Compiles only used utility classes with zero dead CSS; esbuild bundles all React Gutenberg blocks in milliseconds, auto-mapping wp.* globals.',
          },
          {
            name: 'Living Architecture Skills & ADRs',
            description:
              'Engineering standards and component lifecycles codified as living specs for seamless long-term maintainability and AI-assisted pair programming.',
          },
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'bAInners – AI Image Banners',
    clientType: 'Shopify App Store · Visual AI Commerce',
    highlightMetric: '10x Faster Campaign Turnaround · Multi-Ratio AI Assets',
    description:
      'AI-powered promotional banner studio engineered for high-growth Shopify stores. Generates on-brand campaign banners, countdown timers, and announcement bars directly from store products in seconds without design agency turnaround bottlenecks.',
    architecturePoints: [
      'Shopify Theme App Extensions (Liquid App Blocks) for zero theme code pollution',
      'Generative AI prompt synthesis pipeline with brand style presets & multi-aspect ratio rendering',
      'Automated campaign scheduler, banner asset gallery manager, and real-time click-through analytics',
    ],
    stack: ['Shopify App Bridge', 'React', 'Node.js', 'Generative AI', 'Liquid', 'PostgreSQL', 'Tailwind CSS'],
    url: 'https://orivisdev.shop/app/bainners-ai-image-banners/',
    urlLabel: 'View Live App',
  },
  {
    number: '04',
    title: 'AI Product Questions & Answers',
    clientType: 'Shopify App Store · Conversational Commerce',
    highlightMetric: 'Automated Customer Inquiry Resolution · Conversion Uplift',
    description:
      'Storefront AI concierge that resolves pre-purchase customer inquiries on product pages in real time. Automatically grounds answers in product specifications, catalog descriptions, and merchant policies to eliminate buyer hesitation.',
    architecturePoints: [
      'Grounding pipeline synthesizing instant answers from live product descriptions & vendor metafields',
      'Merchant moderation dashboard with manual review queues, custom responses, and FAQ publishing',
      'Ultra-lightweight embeddable storefront widgets with sub-50ms render overhead and conversion tracking',
    ],
    stack: ['Shopify CLI', 'React', 'Node.js', 'OpenAI API', 'GraphQL Admin API', 'Redis', 'Shopify App Bridge'],
    url: 'https://orivisdev.shop/app/ai-product-questions-answers/',
    urlLabel: 'View Live App',
  },
  {
    number: '05',
    title: 'BrAIker – Trading Bot Fleet Control Room',
    clientType: 'FinTech & Algorithmic Trading Platform',
    highlightMetric: 'Deterministic Risk Gates · Multi-Agent Alpaca Fleet',
    description:
      'A multi-user paper-trading control room and autonomous bot fleet operations platform for US equities via Alpaca Paper. Combines deterministic execution signals, isolated virtual capital, strict survival gates, and complete trade auditability.',
    architecturePoints: [
      'Multi-bot execution engine with isolated capital boundaries and adaptive drawdown survival bands',
      'Bot Manager operations interface with confirmation-first controls and real-time Telegram alerts',
      'Scheduled global portfolio reconciliation, persistent scheduler leases, and mark-to-market performance tracking',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma ORM', 'MySQL 8', 'Alpaca API', 'Telegram Bot API', 'OpenAI API'],
    url: 'https://github.com/oskarvisual/braiker',
    urlLabel: 'View on GitHub',
  },
  {
    number: '06',
    title: 'Wave Putaway Mobile App',
    clientType: 'AT3 Tactical · Industrial Warehouse Mobile Software',
    highlightMetric: '0% Placement Errors · 40%+ Dock-to-Stock Acceleration',
    description:
      'Ruggedized mobile warehouse station engineered on Retool Mobile and Zebra terminals. Guides warehouse operators through fail-safe 3-step putaway workflows with real-time transactional ERP inventory synchronization.',
    architecturePoints: [
      'Native Zebra DataWedge laser scanning with instant burst barcode verification (RCV Cart ➔ SKU ➔ Bin ID)',
      '3-phase idempotent sync (prepare ➔ confirm ➔ transferred) guaranteeing zero duplicated ERP transfers',
      'Session takeover protocol between shifts and live telemetry health dashboard (API, DB, Redis, Finale)',
    ],
    stack: ['Retool Mobile', 'Zebra DataWedge', 'Finale Inventory API', 'PostgreSQL', 'Redis', 'Node.js / REST Webhooks'],
    urlLabel: 'Enterprise Operations',
  },
];

export const Projects: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleCard = (num: string) => {
    setExpandedCard((prev) => (prev === num ? null : num));
  };

  return (
    <section
      id="projects"
      className="relative bg-paper py-28 md:py-36 px-6 md:px-12 lg:px-16 border-t border-ink/10 selection:bg-accent/20"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
              SELECTED WORK &amp; CASE STUDIES
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight">
            Recent projects.
          </h2>

          <p className="font-editorial italic text-2xl sm:text-3xl text-ink/80 mt-4 leading-relaxed font-light">
            Real systems built for scale, reliability, and revenue.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((proj) => {
            const isExpanded = expandedCard === proj.number;

            return (
              <div
                key={proj.number}
                className="group rounded-3xl border border-ink/15 bg-warm-50/70 hover:bg-warm-100/60 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-ink/30 hover:shadow-xl"
              >
                <div className="space-y-6">
                  {/* Header row */}
                  <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-ink/10 pb-4">
                    <span className="font-mono text-2xl font-light text-accent">
                      {proj.number}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        {proj.clientType}
                      </span>
                      {proj.url ? (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${proj.urlLabel || 'View Project'}: ${proj.title}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-ink/5 hover:bg-accent hover:text-paper text-ink transition-all border border-ink/10 hover:border-accent ml-1 group/btn"
                        >
                          <span>{proj.urlLabel || 'View'}</span>
                          <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                            ↗
                          </span>
                        </a>
                      ) : (
                        proj.urlLabel && (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-ink/5 text-ink-muted border border-ink/10 ml-1">
                            {proj.urlLabel}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  {/* Metric pill */}
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                    {proj.highlightMetric}
                  </div>

                  {/* Title & Description */}
                  <div>
                    {proj.url ? (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/title inline-block"
                      >
                        <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight group-hover/title:text-accent transition-colors">
                          {proj.title}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                        {proj.title}
                      </h3>
                    )}
                    <p className="font-sans text-ink-muted text-sm sm:text-base leading-relaxed mt-3">
                      {proj.description}
                    </p>
                  </div>

                  {/* Key Architecture Highlights */}
                  <div className="space-y-2 pt-2 border-t border-ink/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block">
                      Architecture &amp; Business Value:
                    </span>
                    <ul className="space-y-1.5 text-xs font-sans text-ink/90">
                      {proj.architecturePoints.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="text-accent mt-0.5 shrink-0">✦</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Feature / Plugin Highlights */}
                  {proj.featureHighlights && (
                    <div className="pt-3 border-t border-ink/10">
                      <button
                        type="button"
                        onClick={() => toggleCard(proj.number)}
                        className="w-full flex items-center justify-between p-3.5 rounded-xl bg-ink/[0.03] hover:bg-accent/10 border border-ink/10 hover:border-accent/30 transition-all text-left group/toggle cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-accent font-mono text-xs">⚡</span>
                          <span className="font-mono text-xs font-semibold text-ink group-hover/toggle:text-accent">
                            {isExpanded
                              ? 'Hide Detailed Technical Breakdown'
                              : proj.featureToggleLabel || 'Explore Full Architectural Breakdown'}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-accent transition-transform duration-200">
                          {isExpanded ? '▲ Collapse' : '▼ View (Details)'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-4 space-y-4 animate-fadeIn">
                          {proj.featureHighlights.map((cat) => (
                            <div
                              key={cat.category}
                              className="p-4 rounded-2xl bg-paper/90 border border-ink/10 space-y-3"
                            >
                              <h4 className="font-mono text-[11px] font-bold text-accent uppercase tracking-wider border-b border-ink/10 pb-1.5">
                                {cat.category}
                              </h4>
                              <div className="space-y-2.5">
                                {cat.items.map((item) => (
                                  <div key={item.name} className="space-y-0.5">
                                    <span className="font-mono text-xs font-semibold text-ink block">
                                      {item.name}
                                    </span>
                                    <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-6 mt-6 border-t border-ink/10 flex flex-wrap gap-2">
                  {proj.stack.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono text-ink-muted bg-paper border border-ink/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
