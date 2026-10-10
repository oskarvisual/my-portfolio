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

export const App: React.FC = () => {
  useEffect(() => {
    // When dynamic chunks resolve and mount, ensure ScrollTrigger pins are recalculated precisely
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleExploreClick = () => {
    const cartStory = document.getElementById('cart-story');
    if (cartStory) {
      cartStory.scrollIntoView({ behavior: 'smooth' });
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

        {/* Below-the-fold sections: Suspense boundaries with natural document flow */}
        <Suspense fallback={<div className="min-h-screen w-full bg-paper" />}>
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
