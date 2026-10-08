import React from 'react';

interface Project {
  number: string;
  title: string;
  clientType: string;
  highlightMetric: string;
  description: string;
  stack: string[];
  architecturePoints: string[];
}

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'Omnichannel Apparel & Gear Platform',
    clientType: 'High-Volume Enterprise Retailer',
    highlightMetric: '$45M+ Annual GMV · 12,000+ Active SKUs',
    description:
      'High-volume multivariant storefront with real-time multi-warehouse inventory synchronization, automated fulfillment dispatch, and custom checkout flows reducing cart abandonment by 18%.',
    architecturePoints: [
      'Multi-warehouse synchronization with Finale Inventory',
      'Automated batch label dispatch via ShipStation API',
      'Custom Redis object caching layer handling high-traffic sales spikes',
    ],
    stack: ['WooCommerce', 'PHP 8.2', 'Redis', 'MySQL', 'Finale Inventory', 'ShipStation', 'Cloudflare'],
  },
  {
    number: '02',
    title: 'Global DTC Lifestyle & Fashion Storefront',
    clientType: 'International DTC Brand (US/EU/LATAM)',
    highlightMetric: 'Sub-800ms Global TTFB · 4 Currencies & Locales',
    description:
      'Headless architecture built for international scale with instantaneous client-side navigation, localized currency routing, custom React bundle builder, and Algolia instant search.',
    architecturePoints: [
      'Custom interactive bundle builder with dynamic pricing rules',
      'Algolia instant autocomplete & facet filtering (<40ms latency)',
      'Shopify Plus Checkout Extensions & custom pixel tracking',
    ],
    stack: ['Shopify Plus', 'React', 'TypeScript', 'Tailwind CSS', 'Algolia', 'Liquid', 'Shopify CLI'],
  },
  {
    number: '03',
    title: 'B2B Wholesale & Industrial Supply Portal',
    clientType: 'Industrial Distributor Network',
    highlightMetric: '40k+ Wholesale Accounts · Real-time Credit Limits',
    description:
      'Custom B2B ecommerce experience featuring tiered pricing matrices, company purchasing hierarchies, Net-30 invoice approvals, and bi-directional ERP order processing.',
    architecturePoints: [
      'Tiered corporate account management & role-based procurement',
      'Automated sync middleware handling 50k+ daily catalog webhook updates',
      'Retool internal ops dashboard for customer service and credit overrides',
    ],
    stack: ['BigCommerce B2B', 'Node.js', 'PostgreSQL', 'Docker', 'Retool', 'REST / GraphQL'],
  },
  {
    number: '04',
    title: 'Automated Logistics & Return Portal (RMA)',
    clientType: 'Internal Proprietary Operations Software',
    highlightMetric: '60% Faster Return Cycle · Zero Manual Data Entry',
    description:
      'Self-service customer return portal coupled with warehouse scanning terminal app. Automates label generation, barcode verification, inventory restocking, and refund payouts.',
    architecturePoints: [
      'Customer self-service portal generating prepaid ShipStation return labels',
      'Warehouse tablet scanning interface for instant inventory triage',
      'Automated Stripe refund triggers tied to warehouse scan confirmation',
    ],
    stack: ['React', 'Python / FastAPI', 'PostgreSQL', 'ShipStation API', 'Stripe API', 'Tailwind CSS'],
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
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="font-mono text-2xl font-light text-accent">
                    {proj.number}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    {proj.clientType}
                  </span>
                </div>

                {/* Metric pill */}
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                  {proj.highlightMetric}
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight group-hover:text-accent transition-colors">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-ink-muted text-sm sm:text-base leading-relaxed mt-3">
                    {proj.description}
                  </p>
                </div>

                {/* Key Architecture Highlights */}
                <div className="space-y-2 pt-2 border-t border-ink/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block">
                    Architecture Highlights:
                  </span>
                  <ul className="space-y-1.5 text-xs font-sans text-ink/90">
                    {proj.architecturePoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">✦</span>
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
