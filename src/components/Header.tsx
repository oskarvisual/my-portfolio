import React, { useState, useEffect } from 'react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-paper/85 backdrop-blur-md py-4 border-b border-ink/5 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)]'
          : 'bg-transparent py-6 md:py-8'
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {[
            { label: 'Story', target: 'cart-story' },
            { label: 'Capabilities', target: 'what-i-build' },
            { label: 'Projects', target: 'projects' },
            { label: 'Experience', target: 'experience' },
            { label: 'Contact', target: 'contact' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              className="text-xs uppercase tracking-widest text-ink-muted hover:text-ink font-mono transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-ink hover:after:w-full after:transition-all after:duration-300"
            >
              {item.label}
            </button>
          ))}
          <a
            href="https://calendly.com/oscarferher"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-all duration-300 inline-flex items-center gap-1.5"
          >
            <span>Let&apos;s talk</span>
            <span className="text-[10px]">↗</span>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink focus:outline-none"
          aria-label="Toggle navigation menu"
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
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper/98 backdrop-blur-xl border-b border-ink/10 px-6 py-6 space-y-4">
          {[
            { label: 'Story', target: 'cart-story' },
            { label: 'Capabilities', target: 'what-i-build' },
            { label: 'Projects', target: 'projects' },
            { label: 'Experience', target: 'experience' },
            { label: 'Contact', target: 'contact' },
          ].map((item) => (
            <div key={item.label}>
              <button
                onClick={() => scrollTo(item.target)}
                className="w-full text-left py-2 text-sm uppercase tracking-widest font-mono text-ink hover:text-accent transition-colors"
              >
                {item.label}
              </button>
            </div>
          ))}

          <div className="pt-3 border-t border-ink/10">
            <a
              href="https://calendly.com/oscarferher"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-mono tracking-wider uppercase rounded-full bg-ink text-paper hover:bg-accent transition-colors"
            >
              <span>Let&apos;s talk</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
