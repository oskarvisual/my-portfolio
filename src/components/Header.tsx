import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Story', target: 'cart-story' },
  { label: 'Capabilities', target: 'what-i-build' },
  { label: 'Projects', target: 'projects' },
  { label: 'Experience', target: 'experience' },
  { label: 'Industries', target: 'industries' },
  { label: 'Numbers', target: 'numbers' },
  { label: 'Games', target: 'games' },
  { label: 'Contact', target: 'contact' },
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 before:content-[''] before:absolute before:inset-0 before:-z-10 before:transition-all before:duration-500 ${
        isScrolled || mobileMenuOpen
          ? 'py-4 before:bg-paper/80 before:backdrop-blur-xl border-b border-ink/5 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]'
          : 'py-6 md:py-8 before:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Brand Monogram & Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('hero');
          }}
          className="group flex items-center gap-3 text-ink focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-ink/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-ink group-hover:text-paper">
            <span className="font-mono text-xs font-semibold tracking-tighter">OF</span>
          </div>
          <span className="font-sans text-sm md:text-base font-semibold tracking-tight text-ink group-hover:text-accent transition-colors">
            Oscar Fernandez
          </span>
        </a>

        {/* Hamburger Button (Visible below 1200px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="min-[1200px]:hidden p-2 text-ink focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-ink transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-full bg-ink transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>

        {/* Single Unified Navigation Menu (Frosted glass drawer below 1200px across the whole site, inline horizontal bar at >= 1200px) */}
        <nav
          className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } min-[1200px]:flex flex-col min-[1200px]:flex-row items-stretch min-[1200px]:items-center gap-4 min-[1200px]:gap-6 xl:gap-7 absolute min-[1200px]:static top-full left-0 right-0 bg-paper/75 min-[1200px]:bg-transparent backdrop-blur-xl min-[1200px]:backdrop-blur-none border-b border-ink/10 min-[1200px]:border-0 px-6 py-6 min-[1200px]:p-0 shadow-lg min-[1200px]:shadow-none`}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              className="w-full min-[1200px]:w-auto text-left min-[1200px]:text-center py-2 min-[1200px]:py-1 text-sm min-[1200px]:text-xs uppercase tracking-widest text-ink min-[1200px]:text-ink-muted hover:text-accent min-[1200px]:hover:text-ink font-mono transition-colors relative min-[1200px]:after:content-[''] min-[1200px]:after:absolute min-[1200px]:after:bottom-0 min-[1200px]:after:left-0 min-[1200px]:after:w-0 min-[1200px]:after:h-[1px] min-[1200px]:after:bg-ink min-[1200px]:hover:after:w-full min-[1200px]:after:transition-all min-[1200px]:after:duration-300"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-ink/10 min-[1200px]:pt-0 min-[1200px]:border-0 min-[1200px]:ml-2">
            <a
              href="https://calendly.com/oscarferher"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-[1200px]:inline-flex items-center justify-center gap-2 min-[1200px]:gap-1.5 w-full min-[1200px]:w-auto py-3 min-[1200px]:py-2 min-[1200px]:px-4 text-xs font-mono tracking-wider uppercase rounded-full bg-ink text-paper hover:bg-accent min-[1200px]:bg-transparent min-[1200px]:text-ink min-[1200px]:border min-[1200px]:border-ink/20 min-[1200px]:hover:border-ink min-[1200px]:hover:bg-ink min-[1200px]:hover:text-paper transition-all duration-300"
            >
              <span>Let&apos;s talk</span>
              <span className="text-sm min-[1200px]:text-[10px]">↗</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
