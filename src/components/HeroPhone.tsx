import React, { useState, useRef } from 'react';
import iphoneFrame from '../assets/images/iphone-17.svg';
import myPresentationVideo from '../assets/videos/my-presentation.mp4';
import cvPdf from '../assets/docs/cv.pdf';

interface HeroPhoneProps {
  /** Optional video source; defaults to my-presentation.mp4 */
  videoSrc?: string;
  className?: string;
}

export const HeroPhone: React.FC<HeroPhoneProps> = ({
  videoSrc = myPresentationVideo,
  className = '',
}) => {
  // Playback lifecycle: 'idle' (waiting to play) | 'playing' | 'ended' (finished)
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video with audio from start, locking out all controls
  const handleStartPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false; // Play with full unmuted sound
    } catch {}

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaybackState('playing');
        })
        .catch((err) => {
          console.warn('Playback error with sound, attempting fallback:', err);
          // Fallback if browser strict policy requires initial muted playback
          try {
            video.muted = true;
            video.play().then(() => setPlaybackState('playing')).catch(() => {});
          } catch {}
        });
    }
  };

  const handleVideoEnded = () => {
    setPlaybackState('ended');
  };

  // Play again handler
  const handlePlayAgain = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      video.muted = false;
    } catch {}

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaybackState('playing');
        })
        .catch(() => {
          try {
            video.muted = true;
            video.play().then(() => setPlaybackState('playing')).catch(() => {});
          } catch {}
        });
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('oskarvisual@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        // Maintain exact iPhone 17 physical aspect ratio: 72.5mm / 150mm
        aspectRatio: '72.5 / 150',
      }}
    >
      {/* =================================================================== */}
      {/* 1. IPHONE SCREEN LAYER (Underneath SVG bezel frame)                 */}
      {/* =================================================================== */}
      <div
        className="absolute inset-[1.64%_4.02%] rounded-[14%/7%] bg-black overflow-hidden flex flex-col justify-between"
        style={{
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.95)',
        }}
      >
        {/* ================================================================= */}
        {/* FULL-SCREEN VERTICAL VIDEO (Fills entire iPhone screen)           */}
        {/* ================================================================= */}
        <video
          ref={videoRef}
          src={videoSrc}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          // The video fills the entire phone display vertically
          className={`absolute inset-0 w-full h-full object-cover block bg-black z-0 transition-opacity duration-300 ${
            playbackState === 'ended' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Oscar Fernandez Presentation Video"
        />

        {/* ================================================================= */}
        {/* iOS Top Status Bar (9:41, Cellular, 5G, Battery)                  */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full px-5 pt-2.5 flex items-center justify-between text-white/85 text-[9px] font-sans font-medium tracking-tight select-none pointer-events-none drop-shadow">
          <span className="font-semibold text-white">9:41</span>
          <div className="flex items-center gap-1.5 text-white/90">
            {/* Cellular signal */}
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 16 16">
              <rect x="1" y="11" width="2" height="4" rx="0.5" />
              <rect x="5" y="8" width="2" height="7" rx="0.5" />
              <rect x="9" y="5" width="2" height="10" rx="0.5" />
              <rect x="13" y="2" width="2" height="13" rx="0.5" />
            </svg>
            <span className="text-[8px] font-bold">5G</span>
            {/* Battery */}
            <div className="w-4 h-2 rounded-[2px] border border-white/80 p-[1px] flex items-center">
              <div className="h-full w-3/4 bg-white rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* STATE A: INITIAL PLAY BUTTON OVERLAY (When idle)                  */}
        {/* ================================================================= */}
        {playbackState === 'idle' && (
          <div
            onClick={handleStartPlay}
            className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer bg-black/15 hover:bg-black/5 transition-all group"
            aria-label="Play presentation video with sound"
          >
            {/* Iconic, clean YouTube / iOS style play button */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 active:scale-95">
              <div className="w-16 h-11 sm:w-18 sm:h-12 rounded-2xl bg-[#ff0000] hover:bg-[#e60000] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-white/20 transition-colors">
                {/* Crisp pure white play triangle */}
                <svg
                  className="w-6 h-6 fill-white translate-x-0.5"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STATE B: END SCREEN (Full Black + Contact Info + Play Again)      */}
        {/* ================================================================= */}
        {playbackState === 'ended' && (
          <div className="absolute inset-0 z-20 bg-black flex flex-col justify-between px-4 py-3 text-white animate-fadeIn overflow-hidden">
            {/* Top Status Space */}
            <div className="h-4" />

            {/* UPPER: Contact Info matching Footer */}
            <div className="w-full flex-1 flex flex-col justify-center space-y-2.5">
              {/* Header / Intro */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[8px] font-mono uppercase tracking-wider text-white/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Projects
                </div>

                <h3 className="font-sans font-bold text-base text-white tracking-tight leading-tight">
                  Oscar Fernandez
                </h3>
                <p className="font-mono text-[9px] text-white/70 uppercase tracking-wider">
                  Full-Stack Ecommerce Engineer
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-1.5 pt-0.5">
                {/* 1. Schedule a Call (Calendly) */}
                <a
                  href="https://calendly.com/oscarferher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-3 py-2 rounded-xl bg-white text-black hover:bg-white/90 font-sans text-[10px] font-bold tracking-wide flex items-center justify-between transition-colors shadow-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Schedule Discovery Call
                  </span>
                  <span className="text-[9px]">↗</span>
                </a>

                {/* 2. Direct Email with Copy */}
                <div className="w-full px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between text-[9px] font-mono text-white">
                  <a
                    href="mailto:oskarvisual@gmail.com"
                    className="truncate hover:text-white/80 flex items-center gap-1.5"
                  >
                    <span>✉</span>
                    <span className="truncate">oskarvisual@gmail.com</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-1.5 py-0.5 rounded bg-white/20 hover:bg-white/30 text-[8px] uppercase tracking-wider text-white shrink-0 ml-1 transition-colors cursor-pointer"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* 3. WhatsApp & Direct Phone */}
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="https://wa.me/51977675421?text=Hi%20Oscar%2C%20I%20saw%20your%20presentation%20video%20and%20would%20like%20to%20connect."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white"
                  >
                    <span className="text-emerald-400">●</span>
                    <span>WhatsApp</span>
                    <span className="text-[8px]">↗</span>
                  </a>

                  <a
                    href="tel:+51977675421"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white"
                  >
                    <span>📞</span>
                    <span>Call</span>
                    <span className="text-[8px]">↗</span>
                  </a>
                </div>

                {/* 4. LinkedIn & Resume */}
                <div className="grid grid-cols-2 gap-1.5">
                  <a
                    href="https://www.linkedin.com/in/oscarfer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[8px]">↗</span>
                  </a>

                  <a
                    href={cvPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Oscar_Fernandez_CV.pdf"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white"
                  >
                    <span>Resume ↓</span>
                  </a>
                </div>
              </div>
            </div>

            {/* LOWER: "Play again" button with Play Icon (White letters, white icon, centered) */}
            <div className="w-full pt-1 pb-1 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handlePlayAgain}
                className="group px-4 py-1.5 rounded-full border border-white/40 hover:border-white hover:bg-white/15 text-white flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Play presentation video again"
              >
                {/* White Play Icon */}
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white font-medium group-hover:tracking-wider transition-all">
                  Play again
                </span>
              </button>
            </div>
          </div>
        )}

        {/* iOS Bottom Home Indicator Bar */}
        <div className="relative z-10 w-full pb-2.5 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-1 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. IPHONE 17 VECTOR FRAME OVERLAY (Screen cut out transparently)    */}
      {/* =================================================================== */}
      <img
        src={iphoneFrame}
        alt="iPhone 17 Chassis Frame"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-30 select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        loading="eager"
      />

      {/* Subtle realistic diagonal glass reflection over the front */}
      <div
        className="absolute inset-[1.64%_4.02%] rounded-[14%/7%] pointer-events-none z-40 overflow-hidden opacity-25"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)',
        }}
      />
    </div>
  );
};
