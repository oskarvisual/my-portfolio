import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cvPdf from '../assets/docs/cv.pdf';
import openToWorkWebp from '../assets/images/open-to-work.webp';
import { getCdnImageUrl } from '../utils/cdn';

const resolvedOpenToWorkImg = getCdnImageUrl(openToWorkWebp, 'open-to-work.webp');

gsap.registerPlugin(ScrollTrigger);

interface CareerRole {
  id: string;
  yearDisplay: string;
  dateRange: string;
  badge: string;
  role: string;
  company: string;
  location: string;
  keyMetric: string;
  bullets: string[];
  skills: string[];
}

const CAREER_DATA: CareerRole[] = [
  {
    id: 'freelance-early',
    yearDisplay: '2012',
    dateRange: 'Sep 2012 — Jun 2016',
    badge: 'FREELANCE',
    role: 'Fullstack Developer & Consultant',
    company: 'Independent Engineering / Workana',
    location: 'Lima, Peru',
    keyMetric: '⚡ 30% Turnaround Acceleration',
    bullets: [
      'Delivered client solutions ranging from high-performing custom WordPress platforms to bespoke web applications built from scratch.',
      'Configured Linux hosting environments (Apache, Nginx, PHP, MySQL) and custom payment gateway integrations.',
      'Consistently delivered production-grade solutions cutting client time-to-market by ~30%.',
    ],
    skills: ['PHP', 'WordPress', 'Linux', 'MySQL', 'JavaScript', 'Apache / Nginx'],
  },
  {
    id: 'disiswork',
    yearDisplay: '2015',
    dateRange: 'Jan 2015 — Jul 2016',
    badge: 'FULL-TIME',
    role: 'Web Developer',
    company: 'Disiswork Perú',
    location: 'Lima, Peru',
    keyMetric: '⚡ 30% Faster Candidate Screening',
    bullets: [
      'Engineered a specialized accessible employment portal connecting job seekers with disabilities to inclusive career opportunities.',
      'Built fully accessible, compliant user interfaces (WCAG best practices, keyboard navigation, accessible forms) and relational database backends with PHP and AngularJS.',
      'Automated candidate evaluation pipelines, cutting corporate applicant review times by ~30%.',
    ],
    skills: ['Web Accessibility (WCAG)', 'PHP', 'AngularJS', 'MySQL', 'Inclusive UX', 'Web Engineering'],
  },
  {
    id: 'te-recluta',
    yearDisplay: '2016',
    dateRange: 'Jan 2016 — Jan 2018',
    badge: 'LEADERSHIP',
    role: 'Head of Technology and Development',
    company: 'Te Recluta · Online Selection Systems',
    location: 'Lima, Peru',
    keyMetric: '⚡ 80% Reduction in Hiring Turnaround',
    bullets: [
      'Architected and engineered a comprehensive enterprise Applicant Tracking System (ATS) from scratch.',
      'Enabled enterprise clients to compress recruitment cycles by up to 80% through automated candidate screening.',
      'Automated psychological evaluation report pipelines with background processing and PDF generation, reducing manual workload by up to 90%.',
      'Designed and documented clean RESTful APIs with webhooks for third-party ATS integrations and candidate profile data syndication.',
    ],
    skills: ['System Architecture', 'PHP', 'AngularJS', 'REST APIs & Webhooks', 'MySQL', 'PDF Automation'],
  },
  {
    id: 'limadot',
    yearDisplay: '2018',
    dateRange: 'Jan 2018 — Mar 2021',
    badge: 'LEADERSHIP',
    role: 'Head of Programming Team',
    company: 'Limadot Digital Agency',
    location: 'Lima, Peru',
    keyMetric: '⚡ Led 5 Engineers & Collaborated with 5 UX/UI Designers',
    bullets: [
      'Led and mentored a team of 5 developers while collaborating directly with 5 UX/UI designers to bridge architectural rigor with high-converting user experience.',
      'Delivered bespoke Shopify themes and enterprise WordPress portals with custom hooks, filters, and Gutenberg components.',
      'Architected multi-system enterprise integrations with SAP, Salesforce CRM, and ActiveCampaign.',
      'Established QA testing standards, regression verification, and continuous deployment workflows yielding 30%–50% speed improvements across client stores.',
    ],
    skills: ['Team Leadership (5 Devs)', 'UX/UI Collaboration (5 Designers)', 'QA & Regression Testing', 'Shopify', 'WordPress', 'SAP & Salesforce', 'Linux'],
  },
  {
    id: 'laudato-si',
    yearDisplay: '2021',
    dateRange: 'Oct 2021 — Jun 2023',
    badge: 'CONTRACT',
    role: 'Backend Developer',
    company: "Laudato Si' Movement",
    location: 'Vatican City · Remote',
    keyMetric: '⚡ 30%–50% Site Performance Boost',
    bullets: [
      'Led backend WordPress architecture utilizing modern Bedrock boilerplate, WP-CLI scripting, continuous integration, and versioned releases.',
      'Configured and administered Linux cloud servers on DigitalOcean (Nginx, PHP-FPM, Redis object caching) for resilient global traffic handling.',
      'Integrated Salesforce APIs with WordPress webhooks to support seamless user authentication, custom forms, and dynamic data workflows.',
      'Instituted release validation and troubleshooting protocols, cutting development iterations by ~30% and speeding up page response by 30%–50%.',
    ],
    skills: ['Bedrock & WP-CLI', 'Linux & DigitalOcean', 'Nginx & PHP-FPM', 'Salesforce API & Webhooks', 'Redis Caching', 'CI & Versioned Releases'],
  },
  {
    id: 'at3',
    yearDisplay: '2023',
    dateRange: 'Jun 2023 — Sep 2026',
    badge: 'MOST RECENT ROLE',
    role: 'Senior Web Developer',
    company: 'AT3 Tactical',
    location: 'United States · Remote',
    keyMetric: '⚡ 50% Warehouse Processing Reduction',
    bullets: [
      'Engineered and maintained AT3 Tactical’s high-volume ecommerce ecosystem across WordPress, WooCommerce (leveraging HPOS for orders), Shopify, and BigCommerce properties.',
      'Developed custom WordPress and WooCommerce plugins from scratch, leveraging hooks, filters, and REST API integrations.',
      'Created custom Python and Retool applications, including an internal warehouse putaway tool that cut intake and inventory processing time by ~50%.',
      'Automated multi-system operational workflows with cron jobs, Make, and webhook pipelines connecting ShipStation, Finale Inventory, and catalog feeds.',
      'Hardened production performance and uptime utilizing Cloudflare edge rules, Redis caching, Algolia instant search, QA regression testing, and live troubleshooting.',
    ],
    skills: ['WooCommerce (HPOS)', 'Custom WP Plugins & Hooks', 'Python & Retool', 'ShipStation & Finale', 'Redis & Cloudflare', 'Algolia Search', 'QA & Troubleshooting', 'Make Automation'],
  },
];

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineListRef = useRef<HTMLDivElement>(null);
  const activeSpineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Spine growth animation tied to normal document scroll
      if (activeSpineRef.current && timelineListRef.current) {
        gsap.fromTo(
          activeSpineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineListRef.current,
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.2,
            },
          }
        );
      }

      // 2. Individual node activations as scroll crosses each milestone
      dotRefs.current.forEach((dot, idx) => {
        if (!dot) return;
        ScrollTrigger.create({
          trigger: dot,
          start: 'top 70%',
          onEnter: () => {
            dot.classList.add('bg-ink', 'border-ink', 'scale-115');
            dot.classList.remove('bg-paper', 'border-ink/25');
          },
          onLeaveBack: () => {
            // First item stays active once entered from top
            if (idx > 0) {
              dot.classList.remove('bg-ink', 'border-ink', 'scale-115');
              dot.classList.add('bg-paper', 'border-ink/25');
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-paper text-ink py-24 md:py-32 px-6 md:px-12 lg:px-16 border-t border-ink/10 selection:bg-accent/20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header: The path so far. */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ink/10 pb-8 mb-16 md:mb-24">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1px] bg-accent" />
              <p className="font-mono text-xs uppercase tracking-mega-wide text-accent font-medium">
                CHRONOLOGICAL CAREER TIMELINE
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-ink tracking-tight">
              The path so <span className="font-editorial italic font-normal">far.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-xs font-mono text-ink-muted">
            <p className="max-w-sm leading-relaxed">
              Education and roles on one line, oldest first. The spine draws itself as you scroll.
            </p>
            <a
              href={cvPdf}
              target="_blank"
              rel="noopener noreferrer"
              download="Oscar_Fernandez_CV.pdf"
              className="inline-flex items-center px-4 py-2 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper text-ink transition-all shrink-0 uppercase tracking-wider text-[11px]"
              title="Download Oscar Fernandez CV (PDF)"
            >
              <span>CV (PDF) ↓</span>
            </a>
          </div>
        </div>

        {/* Timeline Container with Continuous Drawing Spine */}
        <div ref={timelineListRef} className="relative">
          {/* Continuous Spine Line Track */}
          {/* Desktop position: column 1 (200px) + half of column 2 (24px) = 224px */}
          {/* Mobile position: half of column 1 (16px) = 16px */}
          <div className="absolute top-4 bottom-8 left-4 md:left-[224px] -translate-x-1/2 w-[2px] bg-ink/15 pointer-events-none">
            <div
              ref={activeSpineRef}
              className="w-full h-full bg-ink origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Chronological Milestones List */}
          <div className="space-y-12 md:space-y-20">
            {CAREER_DATA.map((role, idx) => (
              <div
                key={role.id}
                className="relative grid grid-cols-[32px_1fr] md:grid-cols-[200px_48px_1fr] gap-4 md:gap-0 group"
              >
                {/* Desktop Left Column: Bold Year & Date Range (Single line, no break) */}
                <div className="hidden md:block text-right pr-6 pt-0.5 select-none">
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-ink block leading-none tracking-tight">
                    {role.yearDisplay}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-ink/50 mt-2 block whitespace-nowrap">
                    {role.dateRange}
                  </span>
                </div>

                {/* Center Column: Spine Milestone Dot */}
                <div className="relative flex justify-center pt-1.5 select-none">
                  <div
                    ref={(el) => (dotRefs.current[idx] = el)}
                    className="w-3.5 h-3.5 rounded-full border-2 border-ink/25 bg-paper transition-all duration-300 z-10 shadow-2xs"
                  />
                </div>

                {/* Right Column: Role Content (NO border, NO container card, directly integrated) */}
                <div className="pl-2 md:pl-8 space-y-3.5">
                  {/* Mobile only: Year and Date row (Single line, no break) */}
                  <div className="md:hidden flex items-baseline gap-3 mb-1">
                    <span className="font-sans text-2xl font-bold text-ink">
                      {role.yearDisplay}
                    </span>
                    <span className="font-mono text-xs text-ink/50 whitespace-nowrap">
                      {role.dateRange}
                    </span>
                  </div>

                  {/* Top Badge & Metric Row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-sand/60 border border-sand text-[10px] font-mono uppercase tracking-widest text-ink/75 font-semibold">
                      {role.badge}
                    </span>
                    {role.keyMetric && (
                      <span className="text-xs font-mono text-accent font-medium">
                        {role.keyMetric}
                      </span>
                    )}
                  </div>

                  {/* Role Title & Organization */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-ink tracking-tight leading-tight">
                      {role.role}
                    </h3>
                    <p className="text-sm sm:text-base font-sans text-ink/70 mt-1">
                      {role.company} <span className="text-ink/30">·</span> {role.location}
                    </p>
                  </div>

                  {/* Bullet points with em-dash — */}
                  <div className="space-y-2.5 pt-2 max-w-3xl">
                    {role.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/80 leading-relaxed font-sans">
                        <span className="text-ink/40 select-none shrink-0 mt-0.5">—</span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-3 flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono text-ink-muted bg-paper-dark/60 border border-ink/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* ============================================================= */}
            {/* FINAL MILESTONE: "Next" -> "Your team?"                       */}
            {/* ============================================================= */}
            <div className="relative grid grid-cols-[32px_1fr] md:grid-cols-[200px_48px_1fr] gap-4 md:gap-0 group pt-4">
              {/* Desktop Left Column: Next */}
              <div className="hidden md:block text-right pr-6 pt-2 select-none">
                <span className="font-sans text-2xl sm:text-3xl font-bold text-ink block leading-none tracking-tight">
                  Next
                </span>
                <span className="font-mono text-[11px] text-accent mt-2 block uppercase tracking-wider font-semibold whitespace-nowrap">
                  Upcoming
                </span>
              </div>

              {/* Center Column: Final Spine Node Dot */}
              <div className="relative flex justify-center pt-3 select-none">
                <div
                  ref={(el) => (dotRefs.current[CAREER_DATA.length] = el)}
                  className="w-3.5 h-3.5 rounded-full border-2 border-ink/25 bg-paper transition-all duration-300 z-10 shadow-2xs"
                />
              </div>

              {/* Right Column: "Your team?" Dashed Card */}
              <div className="pl-2 md:pl-8">
                {/* Mobile only: Next title */}
                <div className="md:hidden flex items-baseline gap-3 mb-3">
                  <span className="font-sans text-2xl font-bold text-ink">
                    Next
                  </span>
                  <span className="font-mono text-xs text-accent font-semibold uppercase tracking-wider">
                    Upcoming
                  </span>
                </div>

                <div className="rounded-2xl border border-dashed border-ink/25 bg-warm-50/70 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-ink/50 hover:bg-warm-100/70 shadow-2xs">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                    {/* Oscar's Open-to-work circular avatar */}
                    <div className="shrink-0">
                      <img
                        src={resolvedOpenToWorkImg}
                        width={150}
                        height={150}
                        onError={(e) => {
                          if (e.currentTarget.src !== openToWorkWebp) {
                            e.currentTarget.src = openToWorkWebp;
                          }
                        }}
                        alt="Oscar Fernandez - Open to Work"
                        className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 max-w-[150px] max-h-[150px] rounded-full object-cover border-2 border-paper shadow-md"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted font-bold">
                          OPEN TO WORK · NEXT STOP
                        </span>
                      </div>

                      <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight">
                        Your <span className="font-editorial italic font-normal">team?</span>
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-ink/75 max-w-lg leading-relaxed">
                        Available for full-stack ecommerce engineering, senior system architecture, team leadership & high-stakes projects.
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-start sm:self-center">
                    <a
                      href="https://calendly.com/oscarferher"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper hover:bg-accent font-sans text-xs font-semibold uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Let&apos;s talk</span>
                      <span className="text-sm">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
