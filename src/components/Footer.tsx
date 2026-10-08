import React, { useState, useEffect } from 'react';
import cvPdf from '../assets/docs/cv.pdf';

export const Footer: React.FC = () => {
  const emailToType = 'oskarvisual@gmail.com';
  const [displayedEmail, setDisplayedEmail] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailSectionRef = React.useRef<HTMLDivElement>(null);

  // Typewriter effect triggered every time user scrolls to the contact section
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any active typing interval
            if (intervalId) clearInterval(intervalId);

            // Reset email state and start typing
            setDisplayedEmail('');
            setIsTypingComplete(false);

            let index = 0;
            intervalId = setInterval(() => {
              if (index <= emailToType.length) {
                setDisplayedEmail(emailToType.slice(0, index));
                index++;
              } else {
                setIsTypingComplete(true);
                if (intervalId) clearInterval(intervalId);
              }
            }, 60);
          }
        });
      },
      { threshold: 0.25 }
    );

    if (emailSectionRef.current) {
      observer.observe(emailSectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [emailToType]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailToType);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className="relative bg-warm-100 border-t border-ink/15 py-24 md:py-32 px-6 md:px-12 lg:px-16 text-ink selection:bg-accent/20"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Contact Lead */}
        <div ref={emailSectionRef} className="max-w-4xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-[1px] bg-accent" />
            <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
              LET&apos;S CONNECT · DIRECT CHANNELS
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-ink leading-tight">
            Building systems that sell, scale, and work reliably.
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-ink/80 max-w-2xl leading-relaxed">
            Available for platform architecture, custom integrations, performance troubleshooting, and high-stakes ecommerce engineering.
          </p>

          {/* Typewriter Email Bar + Copy & Action Buttons */}
          <div className="pt-4">
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 p-2 rounded-2xl bg-paper border border-ink/15 shadow-sm max-w-full">
              {/* Typewritten email with blinking cursor + clickable mailto */}
              <a
                href={`mailto:${emailToType}`}
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-sm sm:text-base font-bold text-ink hover:text-accent transition-colors cursor-pointer"
                title="Send email to oskarvisual@gmail.com"
              >
                <span className="text-accent text-sm">✉</span>
                <span className="tracking-tight">{displayedEmail || ' '}</span>
                <span
                  className={`inline-block w-2 h-4 bg-accent ml-0.5 ${
                    isTypingComplete ? 'animate-pulse' : 'animate-ping'
                  }`}
                />
              </a>

              {/* Copy Button */}
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-warm-100 hover:bg-ink hover:text-paper font-mono text-xs font-semibold uppercase tracking-wider text-ink transition-all border border-ink/10 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Copy email to clipboard"
              >
                <span>{copied ? '✓ Copied!' : 'Copy'}</span>
              </button>

              {/* Book a Call Button (Calendly) */}
              <a
                href="https://calendly.com/oscarferher"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-ink text-paper hover:bg-accent font-sans text-xs font-semibold tracking-wider transition-all shadow-sm flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Schedule a Call</span>
                <span className="text-[10px]">↗</span>
              </a>

              {/* Download CV Button: Transparent, no border, no background, underline on hover only */}
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                download="Oscar_Fernandez_CV.pdf"
                className="px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-ink/70 hover:text-ink transition-colors inline-flex items-center hover:underline underline-offset-4"
                title="Download CV (PDF)"
              >
                <span>CV (PDF) ↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Channels & Direct Communications Grid - Spacious, full width, unconstrained */}
        <div className="w-full">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-4">
            DIRECT CONTACT & SOCIAL PROFILES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Calendly Booking */}
            <a
              href="https://calendly.com/oscarferher"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-paper hover:bg-white border border-ink/15 hover:border-accent transition-all group flex items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-paper transition-colors shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block truncate">
                  Video Discovery Call
                </span>
                <span className="font-mono text-xs font-bold text-ink group-hover:text-accent transition-colors flex items-center gap-1 truncate">
                  <span>/oscarferher</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </span>
              </div>
            </a>

            {/* Direct Phone / Call */}
            <a
              href="tel:+51977675421"
              className="p-5 rounded-2xl bg-paper hover:bg-white border border-ink/15 hover:border-ink transition-all group flex items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-ink/10 text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-colors shrink-0">
                <svg className="w-5 h-5 fill-none stroke-current" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block truncate">
                  Direct Phone Call
                </span>
                <span className="font-mono text-xs font-bold text-ink group-hover:text-ink transition-colors flex items-center gap-1 truncate">
                  <span>+51 977 675 421</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </span>
              </div>
            </a>

            {/* Official WhatsApp */}
            <a
              href="https://wa.me/51977675421?text=Hi%20Oscar%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-paper hover:bg-white border border-ink/15 hover:border-[#25D366] transition-all group flex items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
                {/* Official WhatsApp SVG Icon */}
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.53 1.838.814 2.791.814 3.179 0 5.765-2.586 5.766-5.766 0-3.18-2.586-5.766-5.766-5.766zm3.385 8.165c-.141.396-.714.733-1.002.779-.276.044-.632.067-1.026-.06-.242-.078-.553-.186-.957-.361-1.688-.73-2.776-2.457-2.861-2.57-.084-.114-.683-.91-.683-1.735 0-.825.433-1.231.587-1.398.154-.167.336-.209.448-.209.112 0 .224.001.322.006.105.005.244-.04.382.292.141.341.482 1.176.524 1.262.042.086.07.186.014.299-.056.113-.084.183-.168.282-.084.099-.177.221-.252.297-.084.084-.172.176-.074.344.098.168.437.721.937 1.167.643.573 1.185.751 1.353.835.168.084.266.07.364-.042.098-.113.42-.489.532-.657.112-.168.224-.141.378-.084.154.056.979.461 1.147.545.168.084.28.126.322.197.042.07.042.411-.099.807z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.399C8.423 21.493 10.154 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.636 0-3.155-.494-4.431-1.341l-.318-.212-3.295.93.947-3.218-.215-.328A8.212 8.212 0 0 1 3.75 12c0-4.549 3.701-8.25 8.25-8.25 4.549 0 8.25 3.701 8.25 8.25 0 4.549-3.701 8.25-8.25 8.25z"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block truncate">
                  WhatsApp Direct
                </span>
                <span className="font-mono text-xs font-bold text-ink group-hover:text-[#25D366] transition-colors flex items-center gap-1 truncate">
                  <span>+51 977 675 421</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </span>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/oscarfer/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-paper hover:bg-white border border-ink/15 hover:border-[#0A66C2] transition-all group flex items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-[#0A66C2]/15 text-[#0A66C2] flex items-center justify-center group-hover:bg-[#0A66C2] group-hover:text-white transition-colors shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.92H5.06v8.58h2.8z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block truncate">
                  LinkedIn Profile
                </span>
                <span className="font-mono text-xs font-bold text-ink group-hover:text-[#0A66C2] transition-colors flex items-center gap-1 truncate">
                  <span>/in/oscarfer</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </span>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/oskarvisual"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-paper hover:bg-white border border-ink/15 hover:border-ink transition-all group flex items-center gap-4 shadow-2xs hover:shadow-md"
            >
              <div className="w-11 h-11 rounded-xl bg-ink/10 text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-colors shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted block truncate">
                  GitHub Code
                </span>
                <span className="font-mono text-xs font-bold text-ink group-hover:text-ink transition-colors flex items-center gap-1 truncate">
                  <span>@oskarvisual</span>
                  <span className="text-[10px] opacity-60">↗</span>
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Minimal Colophon & Back to Top */}
        <div className="border-t border-ink/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-muted">
          <div>
            © {new Date().getFullYear()} Oscar Fernandez · Senior Full-Stack Ecommerce Developer · Lima, Peru (GMT -5)
          </div>

          <button
            onClick={scrollToTop}
            className="hover:text-ink transition-colors flex items-center gap-1 uppercase tracking-wider text-[11px] cursor-pointer"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
