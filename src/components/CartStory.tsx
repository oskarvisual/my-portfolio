import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cartV2Webp from '../assets/images/cart-v2.webp';
import cartMobileV2Webp from '../assets/images/cart-mobile-v2.webp';
import floorWebp from '../assets/images/floor.webp';
import { getCdnImageUrl } from '../utils/cdn';

const resolvedCartImage = getCdnImageUrl(cartV2Webp, 'cart-v2.webp');
const resolvedCartMobile = getCdnImageUrl(cartMobileV2Webp, 'cart-mobile-v2.webp');
const resolvedFloorImage = getCdnImageUrl(floorWebp, 'floor.webp');

gsap.registerPlugin(ScrollTrigger);

// Mascot Slot Architecture for Future Technology Plush Assets
export interface PlushMascotSlot {
  id: string;
  name: string;
  category: 'platform' | 'language' | 'database' | 'framework' | 'infra';
  x: number; // percentage left in cart
  y: number; // percentage top in cart
  width: number; // percentage width
  sceneClass: string;
  customAssetUrl?: string; // Slot for future individual plush mascot image
}

const PLUSH_MASCOT_SLOTS: PlushMascotSlot[] = [
  { id: 'woo', name: 'WooCommerce', category: 'platform', x: 36, y: 15, width: 22, sceneClass: 'mascot-scene-2' },
  { id: 'shopify', name: 'Shopify', category: 'platform', x: 53, y: 16, width: 22, sceneClass: 'mascot-scene-2' },
  { id: 'bigcommerce', name: 'BigCommerce', category: 'platform', x: 67, y: 24, width: 20, sceneClass: 'mascot-scene-2' },
  { id: 'python', name: 'Python', category: 'language', x: 51, y: 27, width: 18, sceneClass: 'mascot-scene-3' },
  { id: 'php', name: 'PHP', category: 'language', x: 42, y: 35, width: 20, sceneClass: 'mascot-scene-3' },
  { id: 'js', name: 'JavaScript', category: 'language', x: 63, y: 35, width: 22, sceneClass: 'mascot-scene-3' },
  { id: 'react', name: 'React', category: 'framework', x: 45, y: 46, width: 20, sceneClass: 'mascot-scene-3' },
  { id: 'node', name: 'Node.js', category: 'framework', x: 58, y: 46, width: 18, sceneClass: 'mascot-scene-3' },
  { id: 'mysql', name: 'MySQL', category: 'database', x: 33, y: 55, width: 24, sceneClass: 'mascot-scene-3' },
  { id: 'postgres', name: 'PostgreSQL', category: 'database', x: 60, y: 55, width: 22, sceneClass: 'mascot-scene-3' },
  { id: 'wordpress', name: 'WordPress', category: 'platform', x: 69, y: 66, width: 22, sceneClass: 'mascot-scene-2' },
  { id: 'laravel', name: 'Laravel', category: 'framework', x: 69, y: 79, width: 24, sceneClass: 'mascot-scene-3' },
];

export const CartStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const cartWrapperRef = useRef<HTMLDivElement>(null);
  const cartInnerRef = useRef<HTMLDivElement>(null);

  // Scene Refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    const setupTimeline = (isMobile: boolean) => {
      // Pure GSAP timeline without React state changes onUpdate (eliminates all scroll flicker)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinTargetRef.current,
          start: 'top top',
          end: '+=4200',
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // 1. Continuous vertical floor translation
      masterTl.to(
        floorRef.current,
        {
          y: 1800,
          ease: 'none',
          duration: 10,
        },
        0
      );

      // Subtle tactile rolling micro-movement for the shopping cart inner
      if (cartInnerRef.current) {
        masterTl.to(
          cartInnerRef.current,
          {
            y: -2,
            x: 2,
            rotation: -0.2,
            ease: 'sine.inOut',
            duration: 2.5,
            yoyo: true,
            repeat: 3,
          },
          0
        );
      }

      // Responsive mobile cart positioning & zoom + floor zoom
      if (isMobile) {
        // Scene 1: Cart is centered horizontally & 25% larger; floor is slightly zoomed in
        gsap.set(cartWrapperRef.current, {
          xPercent: -50,
          scale: 1.25,
          transformOrigin: 'bottom center',
        });
        gsap.set(floorRef.current, {
          scale: 1.15,
          transformOrigin: 'center center',
        });

        // Transition 1 -> 2: Cart glides to bottom-right & zooms out; floor zooms out
        masterTl.to(
          cartWrapperRef.current,
          {
            xPercent: 0,
            scale: 1.0,
            duration: 0.85,
            ease: 'power2.inOut',
            transformOrigin: 'bottom center',
          },
          1.5
        );

        masterTl.to(
          floorRef.current,
          {
            scale: 1.0,
            duration: 0.85,
            ease: 'power2.inOut',
          },
          1.5
        );
      } else {
        // Desktop: Cart centered in left column via Flexbox, normal scale; floor at normal scale
        gsap.set(cartWrapperRef.current, {
          xPercent: 0,
          scale: 1.0,
          clearProps: 'transformOrigin',
        });
        gsap.set(floorRef.current, {
          scale: 1.0,
        });
      }

      // Initial Scene states
      gsap.set(scene1Ref.current, { opacity: 1, y: 0, pointerEvents: 'auto' });
      gsap.set(
        [
          scene2Ref.current,
          scene3Ref.current,
          scene4Ref.current,
          scene5Ref.current,
        ],
        { opacity: 0, y: 40, pointerEvents: 'none' }
      );

      // Initial Mascot Pins state (invisible until their scene activates)
      gsap.set('.mascot-ping', { opacity: 0, scale: 0.8 });

      // --- TRANSITION 1 -> 2 ---
      masterTl
        // Scene 1 exits
        .to(
          scene1Ref.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.7,
            ease: 'power2.in',
            pointerEvents: 'none',
          },
          1.7
        )
        // Scene 2 enters
        .to(
          scene2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          2.2
        )
        // Light up Scene 2 mascots (WooCommerce, Shopify, BigCommerce)
        .to(
          '.mascot-scene-2',
          { opacity: 1, scale: 1.1, duration: 0.5, stagger: 0.1 },
          2.3
        )
        // Stagger platform tags inside Scene 2
        .fromTo(
          '.scene2-platform',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
          2.4
        )
        // Stagger capabilities inside Scene 2
        .fromTo(
          '.scene2-capability',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' },
          2.7
        );

      // --- TRANSITION 2 -> 3 ---
      masterTl
        // Scene 2 mascots fade
        .to('.mascot-scene-2', { opacity: 0, scale: 0.8, duration: 0.4 }, 3.8)
        // Scene 2 exits
        .to(
          scene2Ref.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.7,
            ease: 'power2.in',
            pointerEvents: 'none',
          },
          3.9
        )
        // Scene 3 enters
        .to(
          scene3Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          4.4
        )
        // Light up Scene 3 mascots (PHP, Python, React, JS, Node, DBs)
        .to(
          '.mascot-scene-3',
          { opacity: 1, scale: 1.1, duration: 0.5, stagger: 0.08 },
          4.5
        )
        // Dramatic reveal "Neither do I."
        .fromTo(
          '.scene3-reveal',
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          4.7
        )
        // Stagger languages inside Scene 3
        .fromTo(
          '.scene3-tech',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
          5.0
        );

      // --- TRANSITION 3 -> 4 ---
      masterTl
        // Scene 3 mascots fade
        .to('.mascot-scene-3', { opacity: 0, scale: 0.8, duration: 0.4 }, 6.0)
        // Scene 3 exits
        .to(
          scene3Ref.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.7,
            ease: 'power2.in',
            pointerEvents: 'none',
          },
          6.1
        )
        // Scene 4 enters
        .to(
          scene4Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          6.6
        )
        // Flow nodes stagger
        .fromTo(
          '.scene4-node',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)' },
          6.8
        )
        // Floating ecosystem tools stagger
        .fromTo(
          '.scene4-tool',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' },
          7.2
        );

      // --- TRANSITION 4 -> 5 ---
      masterTl
        // Scene 4 exits
        .to(
          scene4Ref.current,
          {
            opacity: 0,
            y: -30,
            duration: 0.7,
            ease: 'power2.in',
            pointerEvents: 'none',
          },
          8.2
        )
        // Scene 5 enters
        .to(
          scene5Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            pointerEvents: 'auto',
          },
          8.7
        )
        .fromTo(
          '.scene5-cta',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          9.1
        );
    };

    mm.add('(min-width: 768px)', () => {
      setupTimeline(false);
    });

    mm.add('(max-width: 767px)', () => {
      setupTimeline(true);
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="cart-story" ref={containerRef} className="relative w-full bg-paper">
      {/* Pinned Viewport Container */}
      <div
        ref={pinTargetRef}
        className="relative h-[100svh] w-full overflow-hidden bg-paper flex items-center"
      >
        {/* ================================================================= */}
        {/* BACKGROUND FLOOR RUNWAY: DISSOLVES WITHOUT ANY HARD LINE          */}
        {/* ================================================================= */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Moving Supermarket Floor Layer with ultra-smooth wide mask */}
          <div
            ref={floorRef}
            className="absolute inset-x-0 -top-[1800px] -bottom-[1800px] floor-mask pointer-events-none will-change-transform"
            style={{
              backgroundImage: `url(${resolvedFloorImage})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '720px 720px',
              filter: 'contrast(0.96) brightness(1.02)',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
            }}
          />
        </div>

        {/* ================================================================= */}
        {/* THE SHOPPING CART: ANCHORED FLUSH AT BOTTOM                       */}
        {/* ================================================================= */}
        <div
          ref={cartWrapperRef}
          className="absolute bottom-0 z-20 left-1/2 md:left-0 md:w-[48%] lg:w-[46%] xl:w-[45%] md:flex md:justify-center md:items-end will-change-transform drop-shadow-[0_20px_45px_rgba(0,0,0,0.22)] select-none pointer-events-auto"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          <div
            ref={cartInnerRef}
            className="relative w-[195px] sm:w-[270px] md:w-[340px] lg:w-[410px] xl:w-[470px] 2xl:w-[510px] md:max-w-[85%]"
          >
            {/* Cart Top-down Image */}
            <img
              src={resolvedCartImage}
              srcSet={`${resolvedCartMobile} 300w, ${resolvedCartImage} 500w`}
              sizes="(max-width: 768px) 270px, 470px"
              width={470}
              height={593}
              onError={(e) => {
                if (e.currentTarget.src !== cartV2Webp) {
                  e.currentTarget.src = cartV2Webp;
                }
              }}
              alt="Shopping cart filled with modern technology plush mascots"
              className="w-full h-auto object-contain block select-none pointer-events-none"
              loading="lazy"
            />

            {/* Mascot Slots Overlay */}
            <div
              className="absolute inset-0 pointer-events-auto"
              aria-label="Technology mascots in cart"
            >
              {PLUSH_MASCOT_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  data-mascot-id={slot.id}
                  style={{
                    top: `${slot.y}%`,
                    left: `${slot.x}%`,
                    width: `${slot.width}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 aspect-square flex items-center justify-center group cursor-pointer transition-all duration-300"
                >
                  {/* Visual hotspot indicator driven directly by GSAP */}
                  <div
                    className={`mascot-ping ${slot.sceneClass} relative rounded-full transition-all duration-500 flex items-center justify-center w-4 h-4 bg-accent/90 shadow-[0_0_12px_rgba(189,83,43,0.7)]`}
                  >
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />

                    {/* Hover Tooltip */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-ink text-paper text-[10px] font-mono tracking-wider transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 shadow-md">
                      {slot.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT SIDE: CONTINUOUS NARRATIVE EVOLUTION (TRANSPARENT BG)       */}
        {/* ================================================================= */}
        <div className="relative z-10 ml-auto w-full md:w-[52%] lg:w-[54%] xl:w-[55%] h-full flex items-start md:items-center justify-center px-5 sm:px-10 md:px-12 lg:px-16 xl:px-20 pt-24 sm:pt-28 md:pt-0 bg-transparent">
          <div className="relative w-full max-w-xl lg:max-w-2xl min-h-[300px] sm:min-h-[360px] md:min-h-[440px] flex items-start md:items-center">
            {/* --------------------------------------------------------------- */}
            {/* SCENE 1: 15+ Years of Building                                 */}
            {/* --------------------------------------------------------------- */}
            <div
              ref={scene1Ref}
              className="absolute inset-0 flex flex-col justify-start md:justify-center space-y-3.5 sm:space-y-5 md:space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent" />
                <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                  15+ YEARS OF BUILDING
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-sans font-bold text-ink tracking-tight leading-[1.15]">
                I&apos;ve been building for the web for 15+ years.
              </h2>

              <div className="space-y-2 sm:space-y-3 md:space-y-4 text-ink-muted font-sans text-xs sm:text-base md:text-lg leading-relaxed font-light">
                <p>
                  But writing code is only part of what I do.
                </p>
                <p>
                  I&apos;ve spent my career understanding how businesses, ecommerce platforms, APIs, infrastructure and people need to work together.
                </p>
              </div>

              <div className="pt-1.5 md:pt-2 border-l-2 border-accent pl-3 md:pl-4">
                <p className="font-editorial italic text-base sm:text-xl md:text-2xl text-ink font-normal">
                  I build the systems behind the storefront.
                </p>
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* SCENE 2: Ecommerce                                              */}
            {/* --------------------------------------------------------------- */}
            <div
              ref={scene2Ref}
              className="absolute inset-0 flex flex-col justify-start md:justify-center space-y-3 sm:space-y-4 md:space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent" />
                <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                  ECOMMERCE
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-sans font-bold text-ink tracking-tight leading-[1.14]">
                Ecommerce is where I do my best work.
              </h2>

              {/* Major Platform Highlights */}
              <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
                {[
                  { name: 'WooCommerce', role: 'Bedrock · HPOS · WP-CLI · Plugins' },
                  { name: 'Shopify Plus', role: 'Theme Dev · Liquid · Custom Apps' },
                  { name: 'BigCommerce', role: 'B2B Portals & Complex Catalogs' },
                ].map((plat) => (
                  <div
                    key={plat.name}
                    className="scene2-platform px-4 py-2.5 rounded-xl border border-ink/15 bg-warm-100/70 hover:border-ink/40 transition-colors"
                  >
                    <span className="font-sans font-bold text-base text-ink block">
                      {plat.name}
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider block mt-0.5">
                      {plat.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Granular Capabilities */}
              <div className="pt-2">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-muted mb-2">
                  Ecommerce &amp; Operations Strengths
                </p>
                <div className="flex flex-wrap gap-1.5 text-xs font-sans text-ink">
                  {[
                    'Bedrock & HPOS architecture.',
                    'WP-CLI & custom plugins from scratch.',
                    'ACF Pro & Gutenberg blocks.',
                    'Catalogs, taxes & shipping rules.',
                    'Customer accounts & checkout UI.',
                    'Warehouse & inventory sync.',
                    'Algolia instant search.',
                    'Product feeds & fulfillment.',
                  ].map((cap) => (
                    <span
                      key={cap}
                      className="scene2-capability px-2.5 py-1 rounded-full bg-paper border border-ink/10 text-ink-muted hover:text-ink font-medium text-[11px]"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* --------------------------------------------------------------- */}
            {/* SCENE 3: Across the Stack & Infrastructure                       */}
            {/* --------------------------------------------------------------- */}
            <div
              ref={scene3Ref}
              className="absolute inset-0 flex flex-col justify-start md:justify-center space-y-2 sm:space-y-4 md:space-y-5"
            >
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-sans font-medium text-ink-muted tracking-tight">
                  But ecommerce doesn&apos;t stop at the storefront.
                </h2>
                <p className="scene3-reveal text-2xl sm:text-3xl md:text-5xl font-editorial italic text-accent font-semibold">
                  Neither do I.
                </p>
              </div>

              {/* Progressively Introduced Tech Stack: 3 Columns x 2 Rows so JS/TS fit comfortably */}
              <div className="pt-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { tech: 'PHP', note: 'PHP-FPM · Engines' },
                    { tech: 'JavaScript', note: 'Interactive' },
                    { tech: 'TypeScript', note: 'Type safety' },
                    { tech: 'Python', note: 'Data & ETL' },
                    { tech: 'React', note: 'Modern UI' },
                    { tech: 'Node.js', note: 'Services' },
                  ].map((item) => (
                    <div
                      key={item.tech}
                      className="scene3-tech p-2.5 sm:p-3 rounded-xl border border-ink/10 bg-warm-50 text-center hover:border-accent/40 transition-colors"
                    >
                      <span className="font-mono text-sm sm:text-base font-bold text-ink block">
                        {item.tech}
                      </span>
                      <span className="font-mono text-[10px] text-ink-light block mt-0.5">
                        {item.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infrastructure Row */}
              <div className="pt-1">
                <p className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-1.5">
                  Infrastructure &amp; Server Environments
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Linux',
                    'Docker',
                    'DigitalOcean',
                    'AWS',
                    'Nginx',
                    'Apache',
                    'PHP-FPM',
                    'Redis',
                    'Cloudflare',
                  ].map((infra) => (
                    <span
                      key={infra}
                      className="scene3-tech px-2.5 py-0.5 rounded-md bg-warm-100/80 border border-ink/10 font-mono text-[11px] text-ink font-medium"
                    >
                      {infra}
                    </span>
                  ))}
                </div>
              </div>

              {/* Supporting Statement */}
              <div className="space-y-0.5 text-ink font-sans text-xs sm:text-sm leading-relaxed pt-1">
                <p className="font-medium text-ink">
                  From Linux servers and containerized runtimes to responsive client storefronts.
                </p>
                <p className="text-ink-muted">
                  I work across the stack to solve the problem — not just the ticket.
                </p>
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* SCENE 4: Connected Commerce Ecosystem                           */}
            {/* --------------------------------------------------------------- */}
            <div
              ref={scene4Ref}
              className="absolute inset-0 flex flex-col justify-start md:justify-center space-y-2 sm:space-y-4 md:space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent" />
                <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                  CONNECTED COMMERCE &amp; BACKEND RESILIENCE
                </p>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-ink tracking-tight">
                  Modern ecommerce is an ecosystem.
                </h2>
                <p className="text-sm sm:text-base font-editorial italic text-accent font-normal">
                  Webhooks, cron jobs, background queues, retries, rate limits &amp; resilient data sync.
                </p>
              </div>

              {/* Minimal Editorial Visual Pipeline */}
              <div className="py-1">
                <div className="flex items-center justify-between text-center overflow-x-auto py-1 px-1">
                  {[
                    'Storefront',
                    'API',
                    'Inventory',
                    'Warehouse',
                    'Shipping',
                    'Customer',
                  ].map((node, index, arr) => (
                    <React.Fragment key={node}>
                      <div className="scene4-node flex flex-col items-center">
                        <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-ink/20 bg-warm-100 flex items-center justify-center font-mono text-[10px] font-semibold text-ink shadow-sm">
                          0{index + 1}
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink font-medium mt-1">
                          {node}
                        </span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="flex-1 h-[1px] bg-ink/20 mx-1 relative top-[-8px] min-w-[8px]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Subtle Editorial Ecosystem Tools (Including n8n) */}
              <div className="pt-1">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-muted mb-1.5">
                  Integrated platforms &amp; tools
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { tool: 'ShipStation', cat: 'Fulfillment' },
                    { tool: 'Finale Inventory', cat: 'Inventory' },
                    { tool: 'Salesforce', cat: 'CRM' },
                    { tool: 'Algolia', cat: 'Search' },
                    { tool: 'Cloudflare', cat: 'Edge' },
                    { tool: 'Retool', cat: 'Internal Apps' },
                    { tool: 'Make', cat: 'Scenarios' },
                    { tool: 'n8n', cat: 'Automation' },
                  ].map((item) => (
                    <span
                      key={item.tool}
                      className="scene4-tool inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-warm-100/60 border border-ink/10 text-[11px] font-mono text-ink"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                      <span className="font-semibold">{item.tool}</span>
                      <span className="text-[10px] text-ink-muted">· {item.cat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* AI-Assisted Workflow Note */}
              <div className="pt-2 border-t border-ink/10 flex items-center gap-2 text-[11px] font-mono text-ink-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>
                  <strong className="text-ink font-medium">AI-assisted engineering workflows:</strong> Codex, Claude for accelerated scaffolding, refactoring &amp; test edge-cases.
                </span>
              </div>
            </div>

            {/* --------------------------------------------------------------- */}
            {/* SCENE 5: Transition to "What I Build"                            */}
            {/* --------------------------------------------------------------- */}
            <div
              ref={scene5Ref}
              className="absolute inset-0 flex flex-col justify-start md:justify-center space-y-3 sm:space-y-5 md:space-y-6"
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent" />
                <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                  PERSPECTIVE
                </p>
              </div>

              <blockquote className="text-2xl sm:text-3xl md:text-5xl font-editorial italic font-normal text-ink leading-[1.18] max-w-xl">
                &ldquo;The right technology is only useful when it solves the right problem.&rdquo;
              </blockquote>

              <div className="scene5-cta pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#what-i-build"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('what-i-build')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group inline-flex items-center gap-3 text-lg sm:text-xl font-sans font-bold text-accent hover:text-ink transition-colors"
                >
                  <span>Here&apos;s what I build</span>
                  <span className="w-8 h-8 rounded-full border border-accent group-hover:border-ink flex items-center justify-center transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <span className="font-mono text-xs text-ink-muted uppercase tracking-wider">
                  Scroll down to explore core capabilities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
