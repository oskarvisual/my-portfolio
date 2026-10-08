import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import cvPdf from '../assets/docs/cv.pdf';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.1 },
      });

      // Background typography fade & slide in
      tl.fromTo(
        bgTextRef.current,
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4 },
        0
      );

      // Central media placeholder entrance
      tl.fromTo(
        mediaContainerRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        0.2
      );

      // Foreground content elements staggered
      if (contentRef.current) {
        const elements = contentRef.current.children;
        tl.fromTo(
          elements,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 1.0 },
          0.35
        );
      }

      // Scroll indicator fade
      tl.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick();
    } else {
      const target = document.getElementById('cart-story');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden bg-paper pt-24 md:pt-28 pb-10 px-6 md:px-12 selection:bg-accent/20"
    >
      {/* 1. Oversized Editorial Background Typography */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden z-0"
      >
        <span className="font-sans font-black text-[28vw] leading-none tracking-tighter text-ink/[0.04] whitespace-nowrap uppercase">
          OSCAR
        </span>
      </div>

      {/* 2. Central Media Area — Designed for Future Hero Video */}
      <div
        className="hidden lg:flex absolute top-1/2 right-6 lg:right-[10%] xl:right-[15%] 2xl:right-[18%] -translate-y-1/2 w-[320px] lg:w-[360px] xl:w-[400px] h-[48vh] lg:h-[52vh] max-h-[540px] pointer-events-none z-10 items-center justify-center"
      >
        {/*
          ======================================================================
          FUTURE HERO VIDEO COMPONENT SLOT:
          When your video asset is ready, replace the inner placeholder with:
          <video
            autoPlay
            muted
            loop
            playsInline
            src="/path-to-your-video.mp4"
            className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
          />
          ======================================================================
        */}
        <div
          ref={mediaContainerRef}
          className="relative w-full h-full rounded-2xl border border-ink/10 bg-gradient-to-b from-warm-100/90 via-warm-200/50 to-warm-100/80 backdrop-blur-sm overflow-hidden flex flex-col justify-between p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]"
        >
          {/* Subtle Viewfinder / Editorial Crop Marks */}
          <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent/80 animate-pulse" />
              SLOT · HERO FIGURE // 01
            </span>
            <span className="font-mono text-[9px] text-ink-light">LIMA, PE</span>
          </div>

          {/* Central Tasteful Silhouette / Architectural Wireframe Placeholder */}
          <div className="relative my-auto flex flex-col items-center justify-center text-center px-4">
            {/* Elegant Minimalist Human Silhouette Contour */}
            <div className="relative w-32 h-44 mb-3 opacity-25 flex items-center justify-center">
              <svg
                viewBox="0 0 100 160"
                className="w-full h-full stroke-ink fill-none"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Minimal editorial standing silhouette contour */}
                <circle cx="50" cy="24" r="14" strokeDasharray="3 2" />
                <path d="M50 38 L50 48" />
                <path d="M30 52 C36 48, 64 48, 70 52 L78 94 C76 98, 68 98, 66 94 L62 68 L62 136 L52 136 L50 96 L48 136 L38 136 L38 68 L34 94 C32 98, 24 98, 22 94 Z" />
              </svg>
            </div>

            <p className="font-mono text-[11px] tracking-wider text-ink-muted uppercase">
              Standing Video Area
            </p>
            <p className="font-sans text-[11px] text-ink-light max-w-[200px] mt-1">
              Prepared for high-framerate standing video loop
            </p>
          </div>

          {/* Bottom metadata tags */}
          <div className="flex justify-between items-end border-t border-ink/5 pt-3">
            <span className="font-mono text-[9px] text-ink-light tracking-wider">
              15+ YRS EXP
            </span>
            <span className="font-mono text-[9px] text-ink-light tracking-wider">
              ECOMMERCE ARCHITECTURE
            </span>
          </div>

          {/* Corner frame ticks */}
          <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-ink/20" />
          <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-ink/20" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-ink/20" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-ink/20" />
        </div>
      </div>

      {/* 3. Foreground Left Narrative Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center">
        <div ref={contentRef} className="max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs md:text-sm uppercase tracking-mega-wide text-ink font-medium">
              Oscar Fernandez
            </p>
          </div>

          {/* Main Headline with High Typographic Contrast */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans tracking-tight text-ink leading-[1.08]">
            <span className="font-extrabold block">Full-Stack</span>
            <span className="font-editorial italic font-normal text-accent block mt-1 md:mt-2">
              Ecommerce Developer.
            </span>
          </h1>

          {/* Supporting Copy */}
          <div className="space-y-2 max-w-xl text-ink-muted font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed">
            <p className="text-ink font-normal">
              I build ecommerce systems that sell, scale, and actually work.
            </p>
            <p className="text-sm sm:text-base text-ink-muted">
              15+ years building ecommerce platforms, custom applications, integrations, and automation for real businesses.
            </p>
          </div>

          {/* Call-to-Action Group */}
          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#cart-story"
              onClick={handleScrollToCart}
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-sans font-medium hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore my work
            </a>

            <a
              href="https://calendly.com/oscarferher"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-ink/25 text-ink text-sm font-sans font-medium hover:border-ink hover:bg-warm-100 transition-all duration-300"
            >
              Let&apos;s talk
            </a>

            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              download="Oscar_Fernandez_CV.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors py-2 px-1 underline-offset-4 hover:underline"
              title="Download Oscar Fernandez CV (PDF)"
            >
              Resume <span className="text-sm">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Area: Centered Mobile Scroll Indicator + Full Width Metadata Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col">
        {/* Mobile-Only Scroll Indicator — Centered above the line (icon on top, text below) */}
        <div
          onClick={handleScrollToCart}
          className="hero-scroll-indicator md:hidden flex flex-col items-center justify-center gap-2 pb-5 cursor-pointer group text-xs font-mono text-ink-muted hover:text-ink transition-colors"
        >
          {/* Scroll down mouse icon on top */}
          <div className="w-5 h-8 rounded-full border border-ink/30 flex items-start justify-center p-1 group-hover:border-ink transition-colors">
            <div className="w-1 h-2 rounded-full bg-ink animate-bounce" />
          </div>
          {/* Centered text below */}
          <span className="tracking-widest uppercase text-[10px] text-ink-muted group-hover:text-ink transition-colors">
            Scroll to explore
          </span>
        </div>

        {/* Bottom Line & Metadata Row */}
        <div className="w-full flex items-end justify-between border-t border-ink/10 pt-5 md:pt-6">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono text-ink-muted">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">Available for select projects &amp; advisory</span>
              <span className="sm:hidden">Available</span>
            </div>
            <span className="text-ink/20">|</span>
            <span className="text-[11px] uppercase tracking-wider text-ink font-medium">
              Lima, PE · GMT -5
            </span>
            <span className="text-ink/20">|</span>
            <span className="text-[11px] font-mono text-ink/80">
              Spanish (Native) · English (Fluent)
            </span>
            <span className="text-ink/20">|</span>
            <a
              href="https://www.linkedin.com/in/oscarfer/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors flex items-center gap-1 text-[11px] uppercase tracking-wider font-medium text-ink"
            >
              <span>LinkedIn</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>

          {/* Desktop-Only Scroll Indicator — Right aligned */}
          <div
            onClick={handleScrollToCart}
            className="hero-scroll-indicator hidden md:flex cursor-pointer group items-center gap-3 text-xs font-mono text-ink-muted hover:text-ink transition-colors ml-auto shrink-0"
          >
            <span className="tracking-widest uppercase text-[11px]">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-ink/30 flex items-start justify-center p-1 group-hover:border-ink transition-colors">
              <div className="w-1 h-2 rounded-full bg-ink animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
