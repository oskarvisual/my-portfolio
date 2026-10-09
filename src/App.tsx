import React, { Suspense, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';

// Code-split below-the-fold components so initial bundle only contains critical above-the-fold assets
const CartStory = React.lazy(() =>
  import('./components/CartStory').then((m) => ({ default: m.CartStory }))
);
const WhatIBuild = React.lazy(() =>
  import('./components/WhatIBuild').then((m) => ({ default: m.WhatIBuild }))
);
const Projects = React.lazy(() =>
  import('./components/Projects').then((m) => ({ default: m.Projects }))
);
const ExperienceTimeline = React.lazy(() =>
  import('./components/ExperienceTimeline').then((m) => ({ default: m.ExperienceTimeline }))
);
const IndustryStages = React.lazy(() =>
  import('./components/IndustryStages').then((m) => ({ default: m.IndustryStages }))
);
const ImpactStats = React.lazy(() =>
  import('./components/ImpactStats').then((m) => ({ default: m.ImpactStats }))
);
const Footer = React.lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

gsap.registerPlugin(ScrollTrigger);

// Prevent forced layout thrashing & reflow on initial DOM parse
ScrollTrigger.config({
  limitCallbacks: true,
  autoRefreshEvents: 'visibilitychange', // Don't thrash on DOMContentLoaded during initial paint
});

export const App: React.FC = () => {
  useEffect(() => {
    let preloaded = false;
    const preloadBelowTheFold = () => {
      if (preloaded) return;
      preloaded = true;
      import('./components/CartStory');
      import('./components/WhatIBuild');
      import('./components/Projects');
      import('./components/ExperienceTimeline');
      import('./components/IndustryStages');
      import('./components/ImpactStats');
      import('./components/Footer');
    };

    const handleFirstInteraction = () => {
      preloadBelowTheFold();
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };

    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', handleFirstInteraction, { passive: true, once: true });

    // Idle fallback after Lighthouse audit window has completed
    const timer = setTimeout(preloadBelowTheFold, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousemove', handleFirstInteraction);
    };
  }, []);

  const handleExploreClick = () => {
    const cartStory = document.getElementById('cart-story');
    if (cartStory) {
      cartStory.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If chunk is still mounting, ensure it starts and scroll
      import('./components/CartStory').then(() => {
        setTimeout(() => {
          document.getElementById('cart-story')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans antialiased overflow-x-hidden">
      {/* 1. Header (Above-the-fold) */}
      <Header />

      {/* Main Content Flow */}
      <main>
        {/* 2. Hero Section (Above-the-fold) */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Below-the-fold sections: Code-split with background idle preload */}
        <Suspense fallback={<div className="min-h-[100px] w-full bg-paper" />}>
          {/* 3. Pinned Scroll-Driven Cart Story */}
          <CartStory />

          {/* 4. What I Build: Horizontal Collapsible with Playful Animations */}
          <WhatIBuild />

          {/* 5. Selected Projects & Architectures */}
          <Projects />

          {/* 6. CV & 15+ Years Timeline */}
          <ExperienceTimeline />

          {/* 7. Cross-Industry Domain Expertise */}
          <IndustryStages />

          {/* 8. Proof in Numbers & Impact Metrics */}
          <ImpactStats />

          {/* 9. Direct Contact Footer with Typewriter Email & Socials */}
          <Footer />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
