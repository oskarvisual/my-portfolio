import React from 'react';

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
      'Automated workflow & event triggers orchestrating asset generation and webhook dispatch via n8n',
    ],
    stack: [
      'Shopify App Bridge',
      'React',
      'Node.js',
      'Generative AI',
      'n8n',
      'Liquid',
      'PostgreSQL',
      'Tailwind CSS',
    ],
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
      'Event-driven background automation and ingestion pipelines orchestrated with n8n workflows',
      'Ultra-lightweight embeddable storefront widgets with sub-50ms render overhead and conversion tracking',
    ],
    stack: [
      'Shopify CLI',
      'React',
      'Node.js',
      'OpenAI API',
      'n8n',
      'GraphQL Admin API',
      'Redis',
      'Shopify App Bridge',
    ],
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
          {PROJECTS.map((proj) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};
