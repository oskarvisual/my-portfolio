import React, { useState, useEffect, useRef } from 'react';

export interface IndustryVertical {
  id: string;
  number: string;
  industry: string;
  characterTitle: string;
  characterCostume: string;
  minimalProps: string[];
  proofClient: string;
  highlightMetric: string;
  headline: string;
  hardProblem: string;
  deliverables: string;
  domainTags: string[];
  videoSrc?: string; // Will hold the 10-20s video file once recorded
}

export const INDUSTRY_VERTICALS: IndustryVertical[] = [
  {
    id: 'regulated-tactical',
    number: '01',
    industry: 'Regulated Retail & Tactical Gear',
    characterTitle: 'The Tactical Gear Merchant',
    characterCostume: 'Tactical vest, cap, shooting safety glasses, serious analytical expression',
    minimalProps: ['Target stand', 'Tactical optic pedestal', 'Ammo storage crate'],
    proofClient: 'AT3 Tactical · $45M+ GMV Architecture',
    highlightMetric: '15,000+ Active SKUs · Zero Payment Gate Friction',
    headline: 'High-Risk Compliance, 2A Payment Processing & Syndicated Feeds',
    hardProblem:
      'Selling firearms accessories and regulated outdoor gear requires navigating high-risk payment merchant gateways, strict MAP/MSRP pricing compliance, complex multi-attribute variation matrices, and automated feed syndication to specialized aggregators (Gun.deals, AvantLink).',
    deliverables:
      'Engineered a complete custom WooCommerce platform with 14 bespoke plugins, sub-50ms Algolia faceted search, proportional ShipStation discount allocation, and real-time ERP catalog feeds.',
    domainTags: ['High-Risk Gateways', 'MAP Enforcement', 'Gun.deals XML', 'AvantLink Feeds', 'Algolia Search', 'WooCommerce HPOS'],
  },
  {
    id: 'warehouse-logistics',
    number: '02',
    industry: 'Industrial Warehousing & Supply Chain',
    characterTitle: 'The Warehouse Floor Operator',
    characterCostume: 'High-vis safety vest, rugged laser barcode scanner gun, work gloves',
    minimalProps: ['Cardboard pallet box with shipping label', 'Aisle bin marker #A-14', 'Zebra laser beam'],
    proofClient: 'AT3 Tactical & Finale Inventory',
    highlightMetric: '0% Placement Errors · 50% Faster Dock-to-Stock',
    headline: 'Physical Terminal Scanners, Concurrency Locks & Real-Time ERP Sync',
    hardProblem:
      'Warehouse operators work in loud, fast environments with laser scanners, receiving carts, and tight shift deadlines. Hand-typed data leads to misplaced inventory, duplicate transfers, and lost stock across warehouse aisles.',
    deliverables:
      'Architected a ruggedized mobile workstation on Retool Mobile and Zebra DataWedge with a Python FastAPI backend. Features cart concurrency locks, multi-bin split putaway, and 3-phase idempotent sync with Finale Inventory.',
    domainTags: ['Zebra DataWedge', 'Python (FastAPI)', 'Retool Mobile', 'Finale Inventory API', 'Idempotent Sync', 'Split Putaway'],
  },
  {
    id: 'saas-ai-fintech',
    number: '03',
    industry: 'SaaS, Applied AI & FinTech Systems',
    characterTitle: 'The Senior AI & FinTech Engineer',
    characterCostume: 'Tech hoodie, oversized noise-cancelling headphones, espresso mug, glowing laptop',
    minimalProps: ['Floating AI robot mascot', 'Minimal server pedestal', 'Green candlestick chart'],
    proofClient: 'Shopify App Store & Alpaca Paper',
    highlightMetric: 'Automated Event Pipelines · Deterministic Risk Gates',
    headline: 'App Store Commercialization, LLM Pipelines & Autonomous Bot Fleets',
    hardProblem:
      'Building commercial AI apps requires strict API cost control, low-latency prompt synthesis, and rock-solid event-driven background queues. In FinTech, automated trading bots demand isolated virtual capital and strict survival gates.',
    deliverables:
      'Engineered bAInners AI Banner Studio and AI Product Q&A for Shopify with n8n workflow triggers and GraphQL APIs. Developed BrAIker: an autonomous multi-user trading bot fleet control room on Alpaca Paper with deterministic drawdown limits.',
    domainTags: ['Shopify App Bridge', 'OpenAI API', 'n8n Workflows', 'Alpaca Paper API', 'Prisma / MySQL', 'Redis Queues'],
  },
  {
    id: 'nonprofit-wilderness',
    number: '04',
    industry: 'Non-Profits & Public Land Conservation',
    characterTitle: 'The Wilderness Trail Ranger',
    characterCostume: 'Outdoor safari trail shirt, wide-brim hat, vintage binoculars, canteen',
    minimalProps: ['Topographic trail map', 'Minimal sandstone rock prop', 'Camp compass'],
    proofClient: "Great Old Broads for Wilderness & Laudato Si' Movement",
    highlightMetric: '20+ Native Gutenberg Blocks · 1:1 Visual Parity · Monorepo',
    headline: 'Cause Advocacy, Frictionless Giving & Total Editorial Freedom',
    hardProblem:
      'Grassroots conservation organizations rely entirely on donor trust, storytelling, and legislative action petitions. Non-technical staff must compose rich campaigns without relying on clunky page builders that break site performance or accessibility.',
    deliverables:
      'Delivered an enterprise-grade digital platform with a custom UX/UI design system and 20+ native Gutenberg blocks (React + PHP SSR) providing 1:1 editor-to-frontend parity, frictionless donation funnels, and monorepo architecture.',
    domainTags: ['Bespoke UX/UI Design', 'Native Gutenberg Blocks', '1:1 Visual Parity', 'Donation Funnels', 'WCAG Accessibility', 'Monorepo'],
  },
  {
    id: 'hrtech-recruitment',
    number: '05',
    industry: 'HR-Tech, Talent Platforms & Accessibility',
    characterTitle: 'The Technical Talent Architect',
    characterCostume: 'Smart-casual blazer, digital tablet with candidate profiles, verification stamp',
    minimalProps: ['Clean interview podium', 'Approved candidate checklist badge', 'Glass hourglass'],
    proofClient: 'Te Recluta & Disiswork',
    highlightMetric: '80% Reduction in Hiring Turnaround · Automated PDF Reports',
    headline: 'Enterprise ATS Engines, Psychological Scoring & Inclusive UX',
    hardProblem:
      'Traditional corporate hiring processes drown in manual resume triage, slow psychological evaluations, and inaccessible interfaces that exclude candidates with disabilities.',
    deliverables:
      'Engineered a complete enterprise Applicant Tracking System (ATS) from scratch, automated psychological test reporting with background PDF generators (90% manual workload cut), and built WCAG-compliant portals for Disiswork.',
    domainTags: ['Custom ATS Platform', 'PHP & AngularJS', 'PDF Automation', 'WCAG Compliance', 'Candidate Syndication', 'RESTful APIs'],
  },
  {
    id: 'dtc-agencies',
    number: '06',
    industry: 'High-Growth DTC & Digital Agencies',
    characterTitle: 'The Agency Engineering Lead',
    characterCostume: 'Rolled-up sleeves, modern frames, stopwatch, espresso in takeaway cup',
    minimalProps: ['Analytics board with green trend arrow', 'Megaphone prop', 'Delivery bell'],
    proofClient: 'Limadot Digital Agency & US/EU Storefronts',
    highlightMetric: 'Led 5 Devs & 5 Designers · Sub-800ms Global TTFB',
    headline: 'High-Velocity Campaigns, CRO Frameworks & Agency Leadership',
    hardProblem:
      'Fast-paced marketing agencies require engineering that bridges technical precision with aggressive campaign deadlines. Slow stores lose millions, and design fidelity is often lost when converting Figma to code.',
    deliverables:
      'Led teams of 5 developers and collaborated directly with 5 UX/UI designers across US and LATAM client stores. Built custom email creative link converters (Klaviyo, FunnelKit), headless stores with sub-second TTFB, and strict QA testing protocols.',
    domainTags: ['Team Leadership', 'UX/UI Collaboration', 'Shopify Plus', 'Klaviyo / FunnelKit', 'Core Web Vitals', 'QA Protocols'],
  },
];

export const IndustryStages: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Track which card is in view on scroll
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStageIndex(index);
            }
          });
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0.2,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Video playback management: play active video, freeze on last frame, pause others
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      if (idx === activeStageIndex) {
        try {
          video.currentTime = 0;
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {});
          }
        } catch {}
      } else {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {}
      }
    });
  }, [activeStageIndex]);

  const activeVertical = INDUSTRY_VERTICALS[activeStageIndex];

  return (
    <section
      id="industries"
      className="relative bg-paper py-28 md:py-36 px-6 md:px-12 lg:px-16 border-t border-ink/10 selection:bg-accent/20"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
              CROSS-INDUSTRY DOMAIN EXPERTISE
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight">
            Industry verticals.
          </h2>

          <p className="font-editorial italic text-2xl sm:text-3xl text-ink/80 mt-4 leading-relaxed font-light">
            Deep domain fluency. 15+ years solving high-stakes challenges across specialized business models and regulated environments.
          </p>
        </div>

        {/* Split Grid: Sticky Minimal Stage (Left) & Scrolling Domain Stories (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: STICKY "POCOYÓ" MINIMAL STAGE                        */}
          {/* ================================================================= */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 z-20">
            <div className="rounded-3xl border border-ink/15 bg-paper p-6 sm:p-8 flex flex-col justify-between shadow-xs overflow-hidden relative min-h-[580px]">
              {/* Minimal Stage Background (Seamless #F8F7F4 with subtle ambient lighting) */}
              <div className="absolute inset-0 bg-paper pointer-events-none" />

              {/* Stage Top Header: Active Stage Status */}
              <div className="relative z-10 flex items-center justify-between border-b border-ink/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                    STAGE {activeVertical.number}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">
                  CHARACTER ROLEPLAY
                </span>
              </div>

              {/* STAGE DISPLAY AREA (Seamless blending with bg-paper #F8F7F4) */}
              <div className="relative z-10 my-auto py-8 flex flex-col items-center justify-center text-center">
                {/* Video elements (rendered once for seamless crossfade and caching) */}
                <div className="relative w-full aspect-[4/5] max-h-[380px] flex items-center justify-center rounded-2xl overflow-hidden bg-paper">
                  {INDUSTRY_VERTICALS.map((vertical, idx) => {
                    const isActive = idx === activeStageIndex;

                    return (
                      <div
                        key={vertical.id}
                        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 bg-paper ${
                          isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                      >
                        {vertical.videoSrc ? (
                          <video
                            ref={(el) => (videoRefs.current[idx] = el)}
                            src={vertical.videoSrc}
                            playsInline
                            muted
                            loop={false}
                            preload="auto"
                            onEnded={() => {
                              // Freezes gracefully on the last frame as requested
                              const v = videoRefs.current[idx];
                              if (v) v.pause();
                            }}
                            className="w-full h-full object-contain block bg-paper"
                            aria-label={`${vertical.characterTitle} stage video`}
                          />
                        ) : (
                          /* Pocoyó Minimal Stage Artwork & Character Card */
                          <div className="w-full h-full p-6 flex flex-col items-center justify-between bg-paper relative">
                            {/* Ambient stage floor pedestal shadow */}
                            <div className="absolute bottom-6 w-3/4 h-8 rounded-full bg-ink/5 blur-md" />

                            {/* Minimal Role Avatar Icon */}
                            <div className="w-24 h-24 rounded-full bg-warm-100 border border-ink/10 flex items-center justify-center shadow-xs text-accent mt-4 relative">
                              <span className="font-mono text-3xl font-light">
                                {idx === 0 && '🎯'}
                                {idx === 1 && '📦'}
                                {idx === 2 && '⚡'}
                                {idx === 3 && '🌲'}
                                {idx === 4 && '📋'}
                                {idx === 5 && '🚀'}
                              </span>
                              <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-accent text-paper font-mono text-[9px] uppercase tracking-wider font-semibold">
                                Oscar In Character
                              </span>
                            </div>

                            {/* Minimal Stage Role & Costume Details */}
                            <div className="space-y-2 mt-4 max-w-xs">
                              <h4 className="font-sans font-bold text-lg text-ink">
                                {vertical.characterTitle}
                              </h4>
                              <p className="font-sans text-xs text-ink-muted leading-relaxed">
                                {vertical.characterCostume}
                              </p>
                            </div>

                            {/* Minimal Realistic Props List */}
                            <div className="w-full pt-4 border-t border-ink/10">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block mb-2">
                                Minimal Stage Props:
                              </span>
                              <div className="flex flex-wrap items-center justify-center gap-1.5">
                                {vertical.minimalProps.map((prop) => (
                                  <span
                                    key={prop}
                                    className="px-2 py-0.5 rounded-md bg-warm-100 text-ink/80 text-[10px] font-mono border border-ink/10"
                                  >
                                    ✦ {prop}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stage Bottom Footer (Active Industry Pill & Status) */}
              <div className="relative z-10 pt-4 border-t border-ink/10 flex items-center justify-between text-ink-muted text-xs font-mono">
                <span className="truncate max-w-[200px] text-ink font-semibold">
                  {activeVertical.industry}
                </span>
                <span className="text-[10px] uppercase text-accent font-medium">
                  {activeVertical.proofClient.split('·')[0].trim()}
                </span>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: SCROLLING DOMAIN STORIES                            */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            {INDUSTRY_VERTICALS.map((vertical, index) => {
              const isActive = index === activeStageIndex;

              return (
                <div
                  key={vertical.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`rounded-3xl border transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between ${
                    isActive
                      ? 'border-accent/40 bg-warm-100/90 shadow-lg ring-1 ring-accent/20'
                      : 'border-ink/15 bg-warm-50/70 hover:bg-warm-100/60 hover:border-ink/30'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Header Row: Number & Client Context */}
                    <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-ink/10 pb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl font-light text-accent">
                          {vertical.number}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                          {vertical.industry}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        {vertical.proofClient}
                      </span>
                    </div>

                    {/* Metric Highlight Pill */}
                    <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                      {vertical.highlightMetric}
                    </div>

                    {/* Mobile Character Stage Visual (Shown only on small screens) */}
                    <div className="block lg:hidden my-2 p-4 rounded-2xl bg-paper border border-ink/10 text-center space-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold block">
                        🎭 In-Character Roleplay
                      </span>
                      <p className="font-sans text-sm font-semibold text-ink">
                        {vertical.characterTitle}
                      </p>
                      <p className="font-sans text-xs text-ink-muted">
                        {vertical.characterCostume}
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                        {vertical.minimalProps.map((p) => (
                          <span
                            key={p}
                            className="px-2 py-0.5 rounded bg-warm-100 text-[10px] font-mono text-ink-muted"
                          >
                            ✦ {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Headline & Hard Problem Solved */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight">
                        {vertical.headline}
                      </h3>
                      <div className="mt-4 space-y-3">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">
                            The Industry Reality:
                          </span>
                          <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
                            {vertical.hardProblem}
                          </p>
                        </div>

                        <div className="pt-2">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">
                            Engineered Solution &amp; Impact:
                          </span>
                          <p className="font-sans text-sm sm:text-base text-ink/90 leading-relaxed font-medium">
                            {vertical.deliverables}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Domain Tags / Tech Skills */}
                    <div className="pt-6 border-t border-ink/10 flex flex-wrap gap-2">
                      {vertical.domainTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono text-ink-muted bg-paper border border-ink/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
