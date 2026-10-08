import React from 'react';

interface MetricItem {
  value: string;
  label: string;
  sourceContext: string;
  description: string;
}

const VERIFIED_METRICS: MetricItem[] = [
  {
    value: '50%',
    label: 'Warehouse Processing Time Reduction',
    sourceContext: 'AT3 Tactical · Python & Retool',
    description:
      'Engineered custom putaway and inventory applications streamlining purchasing and warehouse operations.',
  },
  {
    value: '100%',
    label: 'Core Web Vitals Passed',
    sourceContext: 'AT3 Tactical · Performance Engineering',
    description:
      'Achieved passing Core Web Vitals across the site through Cloudflare edge caching, backend optimization, and reduced server-side processing.',
  },
  {
    value: '80%',
    label: 'Hiring Turnaround Acceleration',
    sourceContext: 'Te Recluta · Full Platform from Scratch',
    description:
      'Designed and engineered a complete Applicant Tracking System (ATS) cutting corporate hiring cycles.',
  },
  {
    value: '30%–50%',
    label: 'Web Performance & Speed Optimization',
    sourceContext: 'Laudato Si’ & Limadot Digital',
    description:
      'Measurable page load acceleration across enterprise stores via Redis caching, Bedrock architecture, and Cloudflare.',
  },
  {
    value: '90%',
    label: 'Reporting Processing Automation',
    sourceContext: 'Te Recluta · Automated Pipeline',
    description:
      'Replaced manual candidate evaluation workflows with automated reporting pipelines and PDF generation.',
  },
  {
    value: '15+',
    label: 'Years in Continuous Production',
    sourceContext: '2009 — Present · Full-Stack Ecommerce',
    description:
      'Proven expertise spanning WooCommerce, Shopify Plus, BigCommerce, custom APIs, and backend systems.',
  },
];

interface DisciplineItem {
  tag: string;
  title: string;
  description: string;
  skills: string[];
}

const DISCIPLINES: DisciplineItem[] = [
  {
    tag: 'QUALITY ASSURANCE',
    title: 'QA & Production Validation',
    description:
      'Rigorous manual and automated regression verification, release validation, and rapid production troubleshooting to catch regressions before shoppers ever do.',
    skills: ['QA Testing', 'Regression Verification', 'Production Validation', 'Troubleshooting'],
  },
  {
    tag: 'DELIVERY & CI',
    title: 'Versioned Deployments & Git',
    description:
      'Disciplined Git and GitHub workflows, continuous integration (CI), versioned deployments, release checks, and zero-downtime production rollouts.',
    skills: ['Git / GitHub', 'Continuous Integration', 'Versioned Releases', 'Release Validation'],
  },
  {
    tag: 'TECHNICAL SEO',
    title: 'SEO & Structured Data',
    description:
      'Technical SEO built into site architecture — schema markup, crawlability, indexing, canonical URLs, redirects, XML sitemaps, and Core Web Vitals.',
    skills: ['Schema Markup', 'Crawlability & Indexing', 'Canonicals & Redirects', 'Sitemaps & Core Web Vitals'],
  },
  {
    tag: 'TECHNICAL CMS',
    title: 'Modern WordPress & HPOS',
    description:
      'Modern Bedrock boilerplate, WooCommerce High-Performance Order Storage (HPOS), WP-CLI terminal automation, Gutenberg blocks, ACF Pro, and custom plugins from scratch.',
    skills: ['Bedrock & WP-CLI', 'WooCommerce HPOS', 'Gutenberg & ACF Pro', 'Custom Plugins & Hooks'],
  },
  {
    tag: 'INFRASTRUCTURE',
    title: 'Linux & Cloud Edge',
    description:
      'Production server administration across Linux (DigitalOcean, AWS), Nginx, Apache, PHP-FPM tuning, Redis object caching, Docker, and Cloudflare CDN/Workers.',
    skills: ['Linux & Docker', 'DigitalOcean & AWS', 'Nginx & PHP-FPM', 'Redis & Cloudflare'],
  },
  {
    tag: 'OPERATIONS & WORKFLOW',
    title: 'Ecommerce Ops, Automation & AI',
    description:
      'Store operations (catalogs, taxes, shipping, warehouse feeds) combined with n8n & Make automation scenarios, Retool apps, and AI-assisted workflows (Codex, Claude).',
    skills: ['Catalogs & Taxes', 'n8n & Make Automation', 'Retool & Warehouse', 'AI Workflows (Codex, Claude)'],
  },
];

export const ImpactStats: React.FC = () => {
  return (
    <section className="relative bg-paper py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-ink/10 selection:bg-accent/20">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
              VERIFIED IMPACT &amp; BENCHMARKS
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-ink tracking-tight">
            Proof in numbers.
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-ink/80 mt-3 font-light">
            Real outcomes delivered across 15+ years of engineering production ecommerce platforms.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {VERIFIED_METRICS.map((m) => (
            <div
              key={m.label}
              className="p-8 rounded-3xl bg-warm-100/50 hover:bg-warm-100 border border-ink/10 hover:border-ink/20 transition-all duration-300 space-y-3 group shadow-sm hover:shadow-md"
            >
              <div className="font-sans font-black text-4xl sm:text-5xl text-ink tracking-tight group-hover:text-accent transition-colors">
                {m.value}
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                  {m.label}
                </div>
                <div className="font-mono text-[10px] text-accent tracking-wide uppercase">
                  {m.sourceContext}
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* Engineering Standards & Disciplines */}
        <div className="pt-12 border-t border-ink/10 space-y-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-accent" />
              <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                ENGINEERING DISCIPLINES &amp; PRODUCTION STANDARDS
              </p>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-ink tracking-tight">
              Built for reliability, speed &amp; scale.
            </h3>
            <p className="font-sans text-sm sm:text-base text-ink-muted mt-2 max-w-2xl leading-relaxed">
              Practical competencies grounded in production track records — ensuring resilient ecommerce operations without unexpected downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISCIPLINES.map((d) => (
              <div
                key={d.title}
                className="p-7 rounded-2xl bg-warm-50/60 hover:bg-warm-100/70 border border-ink/10 hover:border-ink/25 transition-all duration-300 space-y-3.5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold">
                    {d.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                </div>

                <h4 className="font-sans font-bold text-lg text-ink">
                  {d.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {d.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {d.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-paper border border-ink/10 font-mono text-[10px] text-ink/75"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
