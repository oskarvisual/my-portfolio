import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import firearmsVideo from '../assets/videos/industry_firearms.mp4';
import warehouseVideo from '../assets/videos/industry_warehouse.mp4';
import saasVideo from '../assets/videos/industry_saas.mp4';
import nonprofitVideo from '../assets/videos/industry_non-profit.mp4';
import recruitersVideo from '../assets/videos/industry_recruiters.mp4';
import agencyVideo from '../assets/videos/industry_agancy.mp4';
import { getCdnVideoUrl } from '../utils/cdn';

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
  videoSrc: string;
}

const INDUSTRY_VERTICALS: IndustryVertical[] = [
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
    videoSrc: getCdnVideoUrl(firearmsVideo, 'industry_firearms.mp4'),
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
    videoSrc: getCdnVideoUrl(warehouseVideo, 'industry_warehouse.mp4'),
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
    videoSrc: getCdnVideoUrl(saasVideo, 'industry_saas.mp4'),
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
    videoSrc: getCdnVideoUrl(nonprofitVideo, 'industry_non-profit.mp4'),
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
    videoSrc: getCdnVideoUrl(recruitersVideo, 'industry_recruiters.mp4'),
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
    videoSrc: getCdnVideoUrl(agencyVideo, 'industry_agancy.mp4'),
  },
];

export const IndustryStages: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted as requested ("con sonido")
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isNearSection, setIsNearSection] = useState(false);
  const [mobileVideoEnded, setMobileVideoEnded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  // Pinned scroll-trigger setup (Desktop: >= 1024px)
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinSectionRef.current,
        start: 'top top',
        end: '+=3000',
        onEnter: () => setIsSectionInView(true),
        onLeave: () => setIsSectionInView(false),
        onEnterBack: () => setIsSectionInView(true),
        onLeaveBack: () => setIsSectionInView(false),
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

      if (st.progress > 0 && st.progress < 1) {
        setIsSectionInView(true);
      }

      scrollTriggerRef.current = st;

      return () => {
        scrollTriggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  // Near-viewport observer: initiates preloading chunks when scrolling near this section (400px margin)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsNearSection(true);
          }
        });
      },
      { rootMargin: '400px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Universal viewport observer: guarantees pause when leaving section on mobile or desktop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsSectionInView(false);
          } else if (window.innerWidth < 1024) {
            setIsSectionInView(true);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Reset desktop video to start when active stage changes
  useEffect(() => {
    const video = videoRefs.current[activeStageIndex];
    if (video) {
      try {
        video.currentTime = 0;
      } catch {}
    }
  }, [activeStageIndex]);

  // Video playback management: play active video when in view, pause when scrolled away (Desktop only)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;

    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      video.muted = isMuted;

      if (idx === activeStageIndex && isSectionInView) {
        const startPlay = () => {
          try {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch((err) => {
                // If browser autoplay policy blocks unmuted playback before user interaction,
                // fallback gracefully to muted playback so the video doesn't stall
                if (!video.muted) {
                  console.warn('Browser blocked unmuted autoplay policy, playing muted fallback:', err);
                  video.muted = true;
                  video.play().catch(() => {});
                }
              });
            }
          } catch {}
        };

        if (video.readyState >= 2) {
          startPlay();
        } else {
          video.addEventListener('canplay', startPlay, { once: true });
          video.addEventListener('loadeddata', startPlay, { once: true });
          startPlay();
        }
      } else {
        video.pause();
      }
    });
  }, [activeStageIndex, isMuted, isSectionInView]);

  // Mobile-only video playback management (< 1024px)
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 1024) return;
    const video = mobileVideoRef.current;
    if (!video) return;

    video.muted = isMuted;

    if (isSectionInView && !mobileVideoEnded) {
      const startMobilePlay = () => {
        try {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              if (!video.muted) {
                video.muted = true;
                video.play().catch(() => {});
              }
            });
          }
        } catch {}
      };

      if (video.readyState >= 2) {
        startMobilePlay();
      } else {
        video.addEventListener('canplay', startMobilePlay, { once: true });
        video.addEventListener('loadeddata', startMobilePlay, { once: true });
        startMobilePlay();
      }
    } else {
      video.pause();
    }
  }, [activeStageIndex, isSectionInView, mobileVideoEnded, isMuted]);

  // Audio mute/unmute toggle (applies globally to all videos)
  const toggleAudio = () => {
    setIsMuted((prev) => {
      const next = !prev;
      videoRefs.current.forEach((v) => {
        if (v) {
          v.muted = next;
        }
      });
      if (mobileVideoRef.current) {
        mobileVideoRef.current.muted = next;
        if (!next && !mobileVideoEnded) {
          mobileVideoRef.current.play().catch(() => {});
        }
      }
      const activeVideo = videoRefs.current[activeStageIndex];
      if (activeVideo && !next && window.innerWidth >= 1024) {
        activeVideo.play().catch(() => {});
      }
      return next;
    });
  };

  // Replay mobile video from the beginning
  const handleReplayMobileVideo = () => {
    setMobileVideoEnded(false);
    const v = mobileVideoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
        v.play().catch(() => {});
      } catch {}
    }
  };

  // Mobile swipe gestures (swipe left = next, swipe right = prev)
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStartXRef.current;
    const deltaY = touchEndY - touchStartYRef.current;

    // Must be predominantly horizontal and exceed threshold (35px)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swipe Left -> Next
        if (activeStageIndex < INDUSTRY_VERTICALS.length - 1) {
          handleSelectStage(activeStageIndex + 1);
        }
      } else {
        // Swipe Right -> Prev
        if (activeStageIndex > 0) {
          handleSelectStage(activeStageIndex - 1);
        }
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleTouchCancel = () => {
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Programmatic jump to a specific industry stage (via arrows or pagination dots)
  const handleSelectStage = (idx: number) => {
    const boundedIdx = Math.max(0, Math.min(INDUSTRY_VERTICALS.length - 1, idx));
    setMobileVideoEnded(false);
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
        {/* TOP HEADER                                                          */}
        {/* =================================================================== */}
        <div className="max-w-7xl mx-auto w-full mb-8 lg:mb-10">
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
        </div>

        {/* =================================================================== */}
        {/* MAIN STAGE & ACTIVE INDUSTRY CARD (2 COLUMNS ON DESKTOP, CARD ONLY ON MOBILE) */}
        {/* =================================================================== */}
        <div className="max-w-7xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-stretch my-auto py-2">
          {/* ----------------------------------------------------------------- */}
          {/* LEFT: PURE VIDEO FRAMED WITH PLOMO BORDER (Desktop Only: hidden lg:flex) */}
          {/* ----------------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-4 justify-center items-stretch">
            <div
              onClick={toggleAudio}
              title="Click to toggle sound"
              className="w-full max-w-[320px] aspect-[9/16] lg:aspect-auto h-full min-h-[460px] lg:min-h-0 rounded-3xl border border-ink/15 bg-paper shadow-xs overflow-hidden relative cursor-pointer"
            >
              {INDUSTRY_VERTICALS.map((vertical, idx) => {
                const isActive = idx === activeStageIndex;

                return (
                  <div
                    key={vertical.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-500 bg-paper ${
                      isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <video
                      ref={(el) => (videoRefs.current[idx] = el)}
                      src={vertical.videoSrc}
                      playsInline
                      webkit-playsinline="true"
                      muted={isMuted}
                      loop={false}
                      preload={isNearSection ? (idx === activeStageIndex ? 'auto' : 'metadata') : 'none'}
                      onEnded={() => {
                        // Freezes gracefully on the last frame as requested
                        const v = videoRefs.current[idx];
                        if (v) v.pause();
                      }}
                      className="w-full h-full object-cover block bg-paper"
                      aria-label={`${vertical.industry} vertical video`}
                    >
                      <track kind="captions" srcLang="en" label="English" default />
                    </video>
                  </div>
                );
              })}

              {/* Floating White Mute / Unmute Button in Bottom Right Corner */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleAudio();
                }}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                title={isMuted ? 'Unmute audio' : 'Mute audio'}
                className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white text-ink shadow-md hover:shadow-lg border border-ink/10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
              >
                {isMuted ? (
                  /* Muted Icon (Speaker with slash) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-ink/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  /* Unmuted Icon (Speaker with waves) */
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-accent"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT: SINGLE ACTIVE INDUSTRY CARD (Desktop: 8 cols, Mobile: full width) */}
          {/* ----------------------------------------------------------------- */}
          <div
            className="w-full lg:col-span-8 flex flex-col justify-stretch touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            {/* Mobile-Only Navigation Bar: Arrows & Stage Counter placed directly above the card */}
            <div className="flex lg:hidden items-center justify-between pb-3.5 select-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                  STAGE {activeVertical.number} / 0{INDUSTRY_VERTICALS.length}
                </span>
                <span className="font-mono text-[10px] text-ink-muted">
                  · Swipe left/right
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSelectStage(activeStageIndex - 1)}
                  disabled={activeStageIndex === 0}
                  aria-label="Previous industry"
                  className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink text-sm bg-warm-100 hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors shadow-2xs"
                >
                  ←
                </button>
                <button
                  onClick={() => handleSelectStage(activeStageIndex + 1)}
                  disabled={activeStageIndex === INDUSTRY_VERTICALS.length - 1}
                  aria-label="Next industry"
                  className="w-9 h-9 rounded-full border border-ink/15 flex items-center justify-center text-ink text-sm bg-warm-100 hover:bg-ink hover:text-paper disabled:opacity-25 disabled:pointer-events-none transition-colors shadow-2xs"
                >
                  →
                </button>
              </div>
            </div>

            <div
              key={activeVertical.id}
              className="relative overflow-hidden rounded-3xl border border-ink/15 bg-warm-50/90 shadow-sm p-7 sm:p-9 xl:p-11 flex flex-col justify-between h-full animate-fade-in transition-all duration-300"
            >
              {/* MOBILE-ONLY FULL-BLEED VIDEO LAYER (100% width & height of card container, zero gap) */}
              <div
                className={`lg:hidden absolute inset-0 w-full h-full z-10 transition-opacity duration-700 ease-in-out ${
                  !mobileVideoEnded
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                }`}
              >
                <video
                  ref={mobileVideoRef}
                  src={isNearSection ? activeVertical.videoSrc : undefined}
                  playsInline
                  webkit-playsinline="true"
                  muted={isMuted}
                  loop={false}
                  preload={isNearSection ? 'auto' : 'none'}
                  onClick={toggleAudio}
                  onEnded={() => {
                    setMobileVideoEnded(true);
                  }}
                  className="w-full h-full object-cover object-top block bg-warm-50"
                  aria-label={`${activeVertical.industry} vertical video`}
                >
                  <track kind="captions" srcLang="en" label="English" default />
                </video>

                {/* Top gradient from black to completely transparent behind title/stage text; disappears when video ends */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/85 via-black/45 to-transparent pointer-events-none"
                />

                {/* Mobile Audio Mute/Unmute Toggle (Bottom Left) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAudio();
                  }}
                  aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                  className="absolute bottom-4 left-4 z-30 w-9 h-9 rounded-full bg-white/95 text-ink shadow-md border border-ink/10 flex items-center justify-center transition-transform active:scale-95"
                >
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-ink/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-accent"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>

                {/* Mobile Skip Video Pill (Bottom Right) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (mobileVideoRef.current) {
                      mobileVideoRef.current.pause();
                    }
                    setMobileVideoEnded(true);
                  }}
                  className="absolute bottom-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-ink/80 text-white font-mono text-[11px] uppercase tracking-wider backdrop-blur-xs shadow-md hover:bg-ink transition-colors"
                >
                  Skip →
                </button>
              </div>

              <div className="space-y-6 relative z-20 pointer-events-none lg:pointer-events-auto">
                {/* Header Row: Overlaid directly on top of the video & black-to-transparent gradient on mobile */}
                <div
                  className={`flex flex-wrap items-center justify-between gap-y-2 border-b pb-4 transition-colors duration-700 ${
                    !mobileVideoEnded
                      ? 'border-transparent lg:border-ink/10'
                      : 'border-ink/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-3xl font-light transition-colors duration-700 ${
                        !mobileVideoEnded
                          ? 'text-white lg:text-accent'
                          : 'text-accent'
                      }`}
                    >
                      {activeVertical.number}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-wider font-semibold transition-colors duration-700 ${
                        !mobileVideoEnded
                          ? 'text-white lg:text-ink'
                          : 'text-ink'
                      }`}
                    >
                      {activeVertical.industry}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-wider transition-colors duration-700 ${
                      !mobileVideoEnded
                        ? 'text-white/85 lg:text-ink-muted'
                        : 'text-ink-muted'
                    }`}
                  >
                    {activeVertical.proofClient}
                  </span>
                </div>

                {/* Body Content: Revealed on mobile after video ends; always visible on desktop */}
                <div
                  className={`space-y-6 transition-all duration-700 ease-out ${
                    !mobileVideoEnded
                      ? 'opacity-0 translate-y-2 pointer-events-none select-none lg:opacity-100 lg:translate-y-0 lg:pointer-events-auto lg:select-auto'
                      : 'opacity-100 translate-y-0 pointer-events-auto'
                  }`}
                >
                  {/* Metric Highlight Pill & Roleplay Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-block px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs font-semibold">
                      {activeVertical.highlightMetric}
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper border border-ink/10 font-mono text-[11px] text-ink-muted">
                      <span className="text-accent">🎭</span>
                      <span className="font-semibold text-ink">{activeVertical.characterTitle}</span>
                    </div>

                    {/* Mobile-Only Replay Video Button */}
                    <button
                      type="button"
                      onClick={handleReplayMobileVideo}
                      className="lg:hidden inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ink text-paper font-mono text-[11px] hover:bg-accent transition-colors"
                    >
                      <span>↺</span>
                      <span>Replay video</span>
                    </button>
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
                className="py-3.5 px-1.5 flex items-center justify-center cursor-pointer min-h-[44px]"
                aria-label={`Jump to stage 0${idx + 1}: ${v.industry}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    activeStageIndex === idx ? 'w-10 bg-accent' : 'w-2.5 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              </button>
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

            {/* Desktop-Only Arrows (On mobile, arrows are situated above the card) */}
            <div className="hidden lg:flex items-center gap-1.5">
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
