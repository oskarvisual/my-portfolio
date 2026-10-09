import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  videoSrc?: string; // Will hold the 10-20s vertical video file once recorded
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
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Pinned scroll-trigger setup (Desktop: >= 1024px)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinSectionRef.current,
        start: 'top top',
        end: '+=3000',
        onUpdate: (self) => {
          if (isProgrammaticScrollRef.current) return;
          const numStages = INDUSTRY_VERTICALS.length;
          const idx = Math.min(
            numStages - 1,
            Math.max(0, Math.floor(self.progress * numStages))
          );
          setActiveStageIndex(idx);
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
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

  // Programmatic jump to a specific industry stage (via arrows or pagination dots)
  const handleSelectStage = (idx: number) => {
    const boundedIdx = Math.max(0, Math.min(INDUSTRY_VERTICALS.length - 1, idx));
    setActiveStageIndex(boundedIdx);

    const st = scrollTriggerRef.current;
    if (!st) return;

    // Center checkpoints for 6 stages inside the scroll track
    const targets = [0.06, 0.24, 0.42, 0.60, 0.78, 0.94];
    const targetProgress = targets[boundedIdx] ?? 0.06;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    isProgrammaticScrollRef.current = true;
    if (programmaticTimeoutRef.current) {
      window.clearTimeout(programmaticTimeoutRef.current);
    }

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.classList.remove('scroll-smooth');
    html.style.scrollBehavior = 'auto';

    window.scrollTo({ top: targetScroll, behavior: 'instant' });
    ScrollTrigger.update();

    requestAnimationFrame(() => {
      html.classList.add('scroll-smooth');
      if (prevScrollBehavior) {
        html.style.scrollBehavior = prevScrollBehavior;
      } else {
        html.style.removeProperty('scroll-behavior');
      }
    });

    programmaticTimeoutRef.current = window.setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      programmaticTimeoutRef.current = null;
    }, 350);
  };

  const activeVertical = INDUSTRY_VERTICALS[activeStageIndex];

  return (
    <section id="industries" ref={containerRef} className="relative w-full bg-paper">
      {/* Pinned Viewport Container (Fixed in place while user scrolls through industries) */}
      <div
        ref={pinSectionRef}
        className="relative lg:min-h-[100svh] w-full flex flex-col justify-between py-10 md:py-14 lg:py-16 px-6 md:px-12 lg:px-16 border-t border-ink/10 overflow-hidden"
      >
        {/* =================================================================== */}
        {/* TOP HEADER & CONTROLS BAR                                           */}
        {/* =================================================================== */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-accent" />
              <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                CROSS-INDUSTRY DOMAIN FLUENCY
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-ink tracking-tight">
              Industry verticals.
            </h2>
            <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-ink/75 max-w-xl font-light mt-2">
              15+ years solving high-stakes challenges across specialized business models and regulated environments.
            </p>
          </div>

          {/* Right Header Navigation Pill & Quick Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-warm-100 border border-ink/10 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-ink font-semibold">
                INDUSTRY 0{activeStageIndex + 1} / 0{INDUSTRY_VERTICALS.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSelectStage(activeStageIndex - 1)}
                disabled={activeStageIndex === 0}
                aria-label="Previous industry"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink text-sm hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => handleSelectStage(activeStageIndex + 1)}
                disabled={activeStageIndex === INDUSTRY_VERTICALS.length - 1}
                aria-label="Next industry"
                className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink text-sm hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* MAIN STAGE & ACTIVE INDUSTRY CARD (2 COLUMNS, 1 ACTIVE CARD AT A TIME) */}
        {/* =================================================================== */}
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center my-auto py-2">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT: 9:16 VERTICAL "POCOYÓ" MINIMAL STAGE                        */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-[280px] rounded-3xl border border-ink/15 bg-paper p-5 flex flex-col justify-between shadow-xs overflow-hidden relative">
              {/* Seamless paper background */}
              <div className="absolute inset-0 bg-paper pointer-events-none" />

              {/* Stage Top Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-ink/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                    STAGE {activeVertical.number}
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">
                  9:16 VERTICAL STAGE
                </span>
              </div>

              {/* 9:16 Frame Area */}
              <div className="relative z-10 my-auto py-3 flex flex-col items-center justify-center">
                <div className="relative w-full aspect-[9/16] max-h-[440px] flex items-center justify-center rounded-2xl overflow-hidden bg-paper shadow-2xs">
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
                          /* Pocoyó Minimal Stage Artwork & Character Preview */
                          <div className="w-full h-full p-5 flex flex-col items-center justify-between bg-paper relative select-none">
                            {/* Ambient stage floor pedestal shadow */}
                            <div className="absolute bottom-5 w-3/4 h-8 rounded-full bg-ink/5 blur-md" />

                            {/* Minimal Role Avatar Icon */}
                            <div className="w-20 h-20 rounded-full bg-warm-100 border border-ink/10 flex items-center justify-center shadow-xs text-accent mt-2 relative">
                              <span className="font-mono text-3xl font-light">
                                {idx === 0 && '🎯'}
                                {idx === 1 && '📦'}
                                {idx === 2 && '⚡'}
                                {idx === 3 && '🌲'}
                                {idx === 4 && '📋'}
                                {idx === 5 && '🚀'}
                              </span>
                              <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-accent text-paper font-mono text-[8px] uppercase tracking-wider font-semibold">
                                Oscar In Character
                              </span>
                            </div>

                            {/* Role & Costume Details */}
                            <div className="space-y-1.5 mt-3 max-w-xs text-center">
                              <h4 className="font-sans font-bold text-base text-ink">
                                {vertical.characterTitle}
                              </h4>
                              <p className="font-sans text-[11px] text-ink-muted leading-relaxed">
                                {vertical.characterCostume}
                              </p>
                            </div>

                            {/* Minimal Realistic Props List */}
                            <div className="w-full pt-3 border-t border-ink/10 text-center">
                              <span className="font-mono text-[9px] uppercase tracking-widest text-ink-muted block mb-1.5">
                                Minimal Stage Props:
                              </span>
                              <div className="flex flex-wrap items-center justify-center gap-1">
                                {vertical.minimalProps.map((prop) => (
                                  <span
                                    key={prop}
                                    className="px-1.5 py-0.5 rounded bg-warm-100 text-ink/80 text-[9px] font-mono border border-ink/10"
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

              {/* Stage Bottom Footer */}
              <div className="relative z-10 pt-3 border-t border-ink/10 flex items-center justify-between text-ink-muted text-xs font-mono">
                <span className="truncate max-w-[170px] text-ink font-semibold">
                  {activeVertical.industry}
                </span>
                <span className="text-[10px] uppercase text-accent font-medium">
                  {activeVertical.proofClient.split('·')[0].trim()}
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT: SINGLE ACTIVE INDUSTRY CARD (Changes smoothly on scroll/click) */}
          {/* ----------------------------------------------------------------- */}
          <div className="lg:col-span-8">
            <div
              key={activeVertical.id}
              className="rounded-3xl border border-ink/15 bg-warm-50/90 shadow-sm p-7 sm:p-9 xl:p-11 flex flex-col justify-between animate-fade-in transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Header Row: Number & Client Context */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-ink/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-3xl font-light text-accent">
                      {activeVertical.number}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                      {activeVertical.industry}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                    {activeVertical.proofClient}
                  </span>
                </div>

                {/* Metric Highlight Pill & Roleplay Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-block px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                    {activeVertical.highlightMetric}
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-ink/10 font-mono text-[11px] text-ink-muted">
                    <span className="text-accent">🎭</span>
                    <span className="font-semibold text-ink">{activeVertical.characterTitle}</span>
                  </div>
                </div>

                {/* Headline & 2-Part Domain Challenge */}
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight">
                    {activeVertical.headline}
                  </h3>

                  <div className="space-y-3.5 pt-1">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">
                        The Industry Reality:
                      </span>
                      <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
                        {activeVertical.hardProblem}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold block mb-1">
                        Engineered Solution &amp; Impact:
                      </span>
                      <p className="font-sans text-sm sm:text-base text-ink/90 leading-relaxed font-medium">
                        {activeVertical.deliverables}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Domain Tags / Tech Skills */}
                <div className="pt-5 border-t border-ink/10 flex flex-wrap gap-2">
                  {activeVertical.domainTags.map((tag) => (
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
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM CONTROLS & PAGINATION BAR                                    */}
        {/* =================================================================== */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-ink/10">
          {/* Left: Active Industry Status */}
          <div className="text-xs font-mono text-ink-muted flex items-center gap-2">
            <span className="text-accent font-semibold">STAGE {activeVertical.number} / 0{INDUSTRY_VERTICALS.length}</span>
            <span>·</span>
            <span className="text-ink truncate max-w-[220px]">{activeVertical.industry}</span>
          </div>

          {/* Center: Interactive Stage Pills */}
          <div className="flex items-center gap-2">
            {INDUSTRY_VERTICALS.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => handleSelectStage(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeStageIndex === idx ? 'w-10 bg-accent' : 'w-2.5 bg-ink/20 hover:bg-ink/40'
                }`}
                aria-label={`Jump to stage 0${idx + 1}: ${v.industry}`}
              />
            ))}
          </div>

          {/* Right: Scroll Hint & Quick Buttons */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-ink-muted uppercase tracking-wider hidden md:inline">
              {activeStageIndex === INDUSTRY_VERTICALS.length - 1 ? (
                'Final Industry Reached'
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="animate-bounce inline-block text-accent">↓</span>
                  Scroll down for next
                </span>
              )}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleSelectStage(activeStageIndex - 1)}
                disabled={activeStageIndex === 0}
                className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center text-ink text-xs hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors"
                aria-label="Previous industry"
              >
                ←
              </button>
              <button
                onClick={() => handleSelectStage(activeStageIndex + 1)}
                disabled={activeStageIndex === INDUSTRY_VERTICALS.length - 1}
                className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center text-ink text-xs hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors"
                aria-label="Next industry"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
