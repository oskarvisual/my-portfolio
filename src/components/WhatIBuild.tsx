import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ecommerceVideo from '../assets/videos/ecommerce.mp4';
import integrationsVideo from '../assets/videos/integrations.mp4';
import optimizationVideo from '../assets/videos/optimization.mp4';
import customappsVideo from '../assets/videos/customapps.mp4';

gsap.registerPlugin(ScrollTrigger);

interface VideoStageProps {
  src: string;
  isActive: boolean;
  title: string;
}

const VideoStage: React.FC<VideoStageProps> = ({ src, isActive, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playFromStart = () => {
      try {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      } catch {
        // Fallback catch
      }
    };

    if (isActive) {
      if (video.readyState >= 1) {
        playFromStart();
      } else {
        video.addEventListener('loadeddata', playFromStart, { once: true });
        video.addEventListener('canplay', playFromStart, { once: true });
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {}
    }
  }, [isActive]);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#f5f3ee] border border-ink/10 shadow-sm flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop={false}
        preload="auto"
        className="w-full h-full object-contain block bg-[#f5f3ee]"
        aria-label={`Demonstration video for ${title}`}
      />
    </div>
  );
};

interface ServiceData {
  id: string;
  number: string;
  category: string;
  title: string;
  punchline: string;
  description: string;
  tags: string[];
  videoSrc: string;
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'ecommerce',
    number: '01',
    category: 'Architecture & Storefronts',
    title: 'Ecommerce Development',
    punchline: 'Storefronts built around the business — not around a template.',
    description:
      'Technical WooCommerce (Bedrock, HPOS, WP-CLI, Gutenberg, ACF Pro, custom hooks/filters and tailor-made plugins), Shopify Plus and BigCommerce. Architected for complex catalogs, tax rules, shipping workflows, product feeds and account portals.',
    tags: ['WooCommerce (HPOS)', 'Bedrock & WP-CLI', 'Shopify Plus', 'BigCommerce', 'Custom Plugins & Hooks', 'Gutenberg & ACF Pro', 'Catalog & Tax Operations'],
    videoSrc: ecommerceVideo,
  },
  {
    id: 'integrations',
    number: '02',
    category: 'Ecosystem & Pipelines',
    title: 'Integrations & Automation',
    punchline: 'Make your systems talk to each other without losing a single packet.',
    description:
      'Reliable backend pipelines engineered with webhooks, scheduled cron jobs, background queue processing, exponential retries, rate-limiting, and data synchronization across inventory, ERP, warehouse management and fulfillment.',
    tags: ['Webhooks & Cron Jobs', 'Background Retries & Queues', 'ShipStation & Finale', 'Salesforce CRM', 'n8n & Make', 'Warehouse & Fulfillment Sync'],
    videoSrc: integrationsVideo,
  },
  {
    id: 'performance',
    number: '03',
    category: 'Infrastructure & Audits',
    title: 'Infrastructure & Performance',
    punchline: 'Faster stores. Resilient servers. Zero unexpected downtime.',
    description:
      'Production server administration across Linux environments (DigitalOcean, AWS), Nginx, Apache, PHP-FPM, and Redis object caching. Edge acceleration with Cloudflare, SQL query indexing, and deep Core Web Vitals optimization.',
    tags: ['Linux / DigitalOcean / AWS', 'Nginx, Apache & PHP-FPM', 'Cloudflare Edge', 'Redis Object Cache', 'SQL Query Indexing', 'Core Web Vitals'],
    videoSrc: optimizationVideo,
  },
  {
    id: 'custom-apps',
    number: '04',
    category: 'Custom Software & Delivery',
    title: 'Custom Tools & Delivery',
    punchline: 'Tested code, verified releases, and tools built when off-the-shelf won’t cut it.',
    description:
      'Internal Retool dashboards, n8n & Make automated workflows, Python scripts, CLI utilities and custom plugins built with strict engineering discipline: QA regression testing, production validation, rapid troubleshooting, Git workflows, continuous integration and versioned releases.',
    tags: ['Retool Internal Apps', 'n8n & Make Automation', 'Python Scripts & CLIs', 'Custom WP Plugins', 'QA & Regression Testing', 'Versioned CI Deployments', 'AI Workflows (Codex, Claude)'],
    videoSrc: customappsVideo,
  },
];

export const WhatIBuild: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only (>= 1024px): Pin viewport and scrub through the 4 panels
    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinSectionRef.current,
        start: 'top top',
        end: '+=2400',
        onUpdate: (self) => {
          if (isProgrammaticScrollRef.current) return;
          const progress = self.progress;
          if (progress < 0.25) setActiveIdx(0);
          else if (progress < 0.5) setActiveIdx(1);
          else if (progress < 0.75) setActiveIdx(2);
          else setActiveIdx(3);
        },
      });

      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const handleSelectPanel = (idx: number) => {
    setActiveIdx(idx);

    const st = scrollTriggerRef.current;
    if (!st) return;

    // Progress checkpoints that put the user inside each stage:
    // Stage 01: 0.06 (early, scrolls back up cleanly)
    // Stage 02: 0.36 (centered in stage 2)
    // Stage 03: 0.63 (centered in stage 3)
    // Stage 04: 0.92 (near end of stage 4, scrolling down immediately releases to next section)
    const targets = [0.06, 0.36, 0.63, 0.92];
    const targetProgress = targets[idx] ?? 0.06;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    isProgrammaticScrollRef.current = true;
    window.scrollTo(0, targetScroll);
    ScrollTrigger.update();

    requestAnimationFrame(() => {
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 60);
    });
  };

  return (
    <section id="what-i-build" ref={containerRef} className="relative w-full bg-paper">
      {/* Accordion Container (Pinned on desktop only, natural flow on mobile) */}
      <div
        ref={pinSectionRef}
        className="relative lg:min-h-[100svh] w-full flex flex-col justify-between py-12 md:py-16 lg:py-20 px-6 md:px-12 lg:px-16 border-t border-ink/10 overflow-visible lg:overflow-hidden"
      >
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-accent" />
              <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                CORE CAPABILITIES · INTERACTIVE ACCORDION
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-ink tracking-tight">
              What I build.
            </h2>
          </div>
          <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-ink/75 max-w-md font-light">
            Technology should make the business simpler — not the other way around.
          </p>
        </div>

        {/* =================================================================== */}
        {/* DESKTOP: HORIZONTAL COLLAPSIBLE PANELS                             */}
        {/* =================================================================== */}
        <div className="hidden lg:flex max-w-7xl mx-auto w-full flex-1 gap-3 items-stretch min-h-[520px] max-h-[660px] mb-4">
          {SERVICES_DATA.map((service, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <div
                key={service.id}
                onClick={() => handleSelectPanel(idx)}
                style={{
                  flex: isExpanded ? '6.5 1 0%' : '0.45 1 0%',
                  transition: 'flex 0.65s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-500 border ${
                  isExpanded
                    ? 'bg-[#f5f3ee] border-ink/20 shadow-xl p-6 xl:p-8'
                    : 'bg-warm-100/50 hover:bg-warm-100 border-ink/10 px-2 py-4'
                }`}
              >
                {/* Collapsed Vertical View (Minimal padding so open item gets max width) */}
                {!isExpanded ? (
                  <div className="h-full flex flex-col justify-between items-center py-2 select-none">
                    <span className="font-mono text-lg font-light text-accent/90">
                      {service.number}
                    </span>
                    <div className="[writing-mode:vertical-rl] rotate-180 font-sans font-bold text-xs tracking-tight text-ink/75 group-hover:text-accent transition-colors my-auto whitespace-nowrap">
                      {service.title}
                    </div>
                    <span className="w-6 h-6 rounded-full border border-ink/20 flex items-center justify-center font-mono text-[10px] text-ink-muted group-hover:bg-ink group-hover:text-paper transition-colors">
                      +
                    </span>
                  </div>
                ) : (
                  /* Expanded Full Interactive View */
                  <div className="h-full flex flex-col justify-between animate-fade-in select-none">
                    {/* Top Row: Number, Category, Title */}
                    <div className="flex items-center justify-between border-b border-ink/10 pb-3">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-3xl font-light text-accent tracking-tight">
                          {service.number}
                        </span>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted block">
                            {service.category}
                          </span>
                          <h3 className="font-sans font-bold text-2xl text-ink">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded-full font-medium">
                        Active Stage 0{idx + 1}
                      </span>
                    </div>

                    {/* Middle Grid: Narrative Copy Left (5 cols), 16:9 Video Right (7 cols) */}
                    <div className="grid grid-cols-12 gap-6 xl:gap-8 items-center my-auto py-3">
                      {/* Left Narrative */}
                      <div className="col-span-5 space-y-3.5">
                        <p className="font-editorial italic text-xl xl:text-2xl text-ink leading-snug">
                          {service.punchline}
                        </p>
                        <p className="font-sans text-ink-muted text-xs sm:text-sm leading-relaxed">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {service.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-md text-[10px] xl:text-[11px] font-mono text-ink-muted bg-paper border border-ink/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: 16:9 Video Player */}
                      <div className="col-span-7">
                        <VideoStage
                          src={service.videoSrc}
                          isActive={isExpanded}
                          title={service.title}
                        />
                      </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex items-center justify-between text-xs font-mono text-ink-muted border-t border-ink/10 pt-3">
                      <span>SCROLL OR CLICK TO CYCLE CAPABILITIES</span>
                      <span>STAGE 0{idx + 1} / 04</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* MOBILE & TABLET: RESPONSIVE EXPANDABLE ACCORDION                   */}
        {/* =================================================================== */}
        <div className="lg:hidden space-y-4 max-w-xl mx-auto w-full">
          {SERVICES_DATA.map((service, idx) => {
            const isExpanded = activeIdx === idx;
            return (
              <div
                key={service.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded ? 'bg-[#f5f3ee] border-ink/20 shadow-md p-5' : 'bg-warm-100/60 border-ink/10 p-4'
                }`}
              >
                <div
                  onClick={() => setActiveIdx(idx)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg font-bold text-accent">
                      {service.number}
                    </span>
                    <h3 className="font-sans font-bold text-base text-ink">
                      {service.title}
                    </h3>
                  </div>
                  <span className="font-mono text-sm text-ink-muted">
                    {isExpanded ? '−' : '+'}
                  </span>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-4 animate-fade-in">
                    <p className="font-editorial italic text-lg text-ink">
                      {service.punchline}
                    </p>
                    <p className="font-sans text-xs text-ink-muted leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {service.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-paper border border-ink/10 text-ink-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2">
                      <VideoStage
                        src={service.videoSrc}
                        isActive={isExpanded}
                        title={service.title}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Tabs for Manual Jump */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 pt-4">
          {SERVICES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleSelectPanel(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx === idx ? 'w-10 bg-accent' : 'w-2 bg-ink/20 hover:bg-ink/40'
              }`}
              aria-label={`Jump to ${s.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
