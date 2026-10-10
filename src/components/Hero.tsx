import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import cvPdf from '../assets/docs/cv.pdf';
import { HeroPhone } from './HeroPhone';
import myPresentationVideo from '../assets/videos/my-presentation.mp4';
import myPresentationPosterWebp from '../assets/images/my-presentation-v2.webp';
import { getCdnVideoUrl, getCdnImageUrl } from '../utils/cdn';

const presentationVideoUrl = getCdnVideoUrl(myPresentationVideo, 'my-presentation.mp4');
const presentationPosterUrl = getCdnImageUrl(myPresentationPosterWebp, 'my-presentation-v2.webp');

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const heroRef = useRef<HTMLElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    const rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
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
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
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

  // Mobile Presentation Video Modal State & Handlers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const v = modalVideoRef.current;
      if (v) {
        try {
          v.currentTime = 0;
          v.volume = 1;
          v.muted = false;
        } catch {}
        const playPromise = v.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Playback with sound policy fallback:', err);
            v.muted = true;
            v.play().catch(console.error);
          });
        }
      }
    }, 60);
  };

  const handleCloseModal = () => {
    const v = modalVideoRef.current;
    if (v) {
      try {
        v.pause();
      } catch {}
    }
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  const handleVideoEnded = () => {
    handleCloseModal();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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

      {/* 2. Central Media Area — iPhone 17 Showcase with Video & Play Button */}
      <div className="hidden lg:flex absolute top-1/2 right-6 lg:right-[8%] xl:right-[12%] 2xl:right-[15%] -translate-y-1/2 z-30 items-center justify-center pointer-events-auto">
        <div
          ref={mediaContainerRef}
          className="relative h-[440px] lg:h-[490px] xl:h-[540px] 2xl:h-[580px]"
        >
          <HeroPhone className="h-full w-auto" />
        </div>
      </div>

      {/* 3. Foreground Left Narrative Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto flex flex-col justify-center pointer-events-none">
        <div ref={contentRef} className="max-w-2xl lg:max-w-3xl space-y-6 md:space-y-8 pointer-events-auto">
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
          <div className="pt-2 flex flex-col items-start gap-3.5 sm:gap-4">
            {/* 1. Mobile-Only Red View Presentation Button (Solito arriba en móvil) */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#e62b1e] hover:bg-[#cc2216] text-white text-sm font-sans font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                aria-label="View presentation video"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-white shrink-0"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>View presentation</span>
              </button>
            </div>

            {/* 2. Main CTAs: On mobile, Explore my work & Let's talk together; on desktop, inline with Resume */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
              <a
                href="#cart-story"
                onClick={handleScrollToCart}
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full bg-ink text-paper text-sm font-sans font-medium hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Explore my work
              </a>

              <a
                href="https://calendly.com/oscarferher"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 rounded-full border border-ink/25 text-ink text-sm font-sans font-medium hover:border-ink hover:bg-warm-100 transition-all duration-300"
              >
                Let&apos;s talk
              </a>

              {/* Desktop-Only Resume Link (inline with the other buttons) */}
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                download="Oscar_Fernandez_CV.pdf"
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors py-2 px-1 underline-offset-4 hover:underline"
                title="Download Oscar Fernandez CV (PDF)"
              >
                Resume <span className="text-sm">↓</span>
              </a>
            </div>

            {/* 3. Mobile-Only Resume Link (Solito abajo en móvil) */}
            <div className="lg:hidden pt-0.5">
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                download="Oscar_Fernandez_CV.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-ink-muted hover:text-ink transition-colors py-1.5 px-0.5 underline-offset-4 hover:underline"
                title="Download Oscar Fernandez CV (PDF)"
              >
                Resume <span className="text-sm">↓</span>
              </a>
            </div>
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

      {/* Mobile Presentation Video Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Oscar Fernandez Presentation Video"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          {/* Modal Container: Aspect 9/16 vertical phone ratio */}
          <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[85vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center">
            {/* Close Button: Circular white background with black border and black X */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center text-black shadow-2xl hover:scale-105 active:scale-90 transition-transform cursor-pointer"
              aria-label="Close presentation video"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 stroke-black stroke-[2.5]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Video Player */}
            <video
              ref={modalVideoRef}
              src={presentationVideoUrl}
              poster={presentationPosterUrl}
              playsInline
              webkit-playsinline="true"
              controls
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover block bg-black"
              aria-label="Oscar Fernandez Presentation Video"
            >
              <track kind="captions" srcLang="en" label="English" default />
            </video>
          </div>
        </div>
      )}
    </section>
  );
};
