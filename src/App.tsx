import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CartStory } from './components/CartStory';
import { WhatIBuild } from './components/WhatIBuild';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { IndustryStages } from './components/IndustryStages';
import { ImpactStats } from './components/ImpactStats';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Prevent forced layout thrashing & reflow by batching callbacks
ScrollTrigger.config({
  limitCallbacks: true,
  autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
});

export const App: React.FC = () => {
  useEffect(() => {
    // Refresh ScrollTrigger safely in next animation frame once DOM & fonts settle
    const handleLoad = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const handleExploreClick = () => {
    const cartStory = document.getElementById('cart-story');
    if (cartStory) {
      cartStory.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-paper text-ink font-sans antialiased overflow-x-hidden">
      {/* 1. Header */}
      <Header />

      {/* Main Content Flow */}
      <main>
        {/* 2. Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

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
      </main>

      {/* 8. Direct Contact Footer with Typewriter Email & Socials */}
      <Footer />
    </div>
  );
};

export default App;
