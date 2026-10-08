import React, { useState, useRef, useEffect } from 'react';
import iphoneFrame from '../assets/images/iphone-17.svg';
import myPresentationVideo from '../assets/videos/my-presentation.mp4';
import cvPdf from '../assets/docs/cv.pdf';

interface HeroPhoneProps {
  /** Optional video source; defaults to my-presentation.mp4 */
  videoSrc?: string;
  className?: string;
}

const getSystemTime = () => {
  const now = new Date();
  return now
    .toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
    .replace(/\s*(AM|PM|a\.\s?m\.|p\.\s?m\.)/gi, '')
    .trim();
};

export const HeroPhone: React.FC<HeroPhoneProps> = ({
  videoSrc = myPresentationVideo,
  className = '',
}) => {
  // Live system time displayed on iPhone top status bar
  const [systemTime, setSystemTime] = useState<string>(() => getSystemTime());

  // Playback lifecycle: 'idle' (waiting to play) | 'playing' | 'ended' (finished)
  const [playbackState, setPlaybackState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [fadeToBlackOpacity, setFadeToBlackOpacity] = useState(0);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const FADE_OUT_DURATION = 1.5; // seconds for smooth audio/video fade-out

  // Synchronize clock every second with actual system time
  useEffect(() => {
    setSystemTime(getSystemTime());
    const interval = setInterval(() => {
      setSystemTime(getSystemTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Smooth audio volume and video fade to black over the last 1.5 seconds
  useEffect(() => {
    if (playbackState !== 'playing') {
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    let animId: number;

    const checkFade = () => {
      if (!video.paused && !video.ended && video.duration && !isNaN(video.duration)) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= FADE_OUT_DURATION) {
          // Progress from 0 (at 1.5s remaining) to 1 (at end)
          const progress = Math.max(0, Math.min(1, 1 - remaining / FADE_OUT_DURATION));

          // Audio fade-out: smoothly decrease volume to 0
          try {
            video.volume = Math.max(0, Math.min(1, 1 - progress));
          } catch {}

          // Video fade to black: smoothly increase black overlay opacity to 1
          setFadeToBlackOpacity(progress);
        } else {
          try {
            if (video.volume !== 1) video.volume = 1;
          } catch {}
          setFadeToBlackOpacity(0);
        }
      }
      animId = requestAnimationFrame(checkFade);
    };

    animId = requestAnimationFrame(checkFade);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [playbackState]);

  // Force video first frame rendering on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      try {
        if (video.currentTime === 0) {
          video.currentTime = 0.001;
        }
      } catch {}
    };

    if (video.readyState >= 1) {
      handleReady();
    } else {
      video.addEventListener('loadeddata', handleReady, { once: true });
    }
  }, [videoSrc]);

  // Start video playback with unmuted sound
  const handleStartPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      video.volume = 1;
      video.muted = false; // Start with full sound
    } catch {}
    setFadeToBlackOpacity(0);

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaybackState('playing');
        })
        .catch((err) => {
          console.warn('Playback with sound policy fallback:', err);
          video.muted = true;
          video.play().then(() => setPlaybackState('playing')).catch(console.error);
        });
    }
  };

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
      try {
        video.volume = 0;
      } catch {}
    }
    setFadeToBlackOpacity(1);
    setPlaybackState('ended');
  };

  // Replay from beginning
  const handlePlayAgain = () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.currentTime = 0;
      video.volume = 1;
      video.muted = false;
    } catch {}
    setFadeToBlackOpacity(0);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaybackState('playing');
        })
        .catch(() => {
          video.muted = true;
          video.play().then(() => setPlaybackState('playing')).catch(console.error);
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
      className={`relative select-none pointer-events-auto ${className}`}
      style={{
        // Maintain exact iPhone 17 physical aspect ratio: 72.5mm / 150mm
        aspectRatio: '72.5 / 150',
      }}
    >
      {/* =================================================================== */}
      {/* 1. IPHONE SCREEN LAYER                                              */}
      {/* =================================================================== */}
      <div
        className="absolute inset-[1.64%_4.02%] rounded-[14%/7%] bg-black overflow-hidden flex flex-col justify-between z-10"
        style={{
          boxShadow: 'inset 0 0 25px rgba(0,0,0,0.95)',
        }}
      >
        {/* ================================================================= */}
        {/* FULL VERTICAL SCREEN VIDEO                                        */}
        {/* ================================================================= */}
        <video
          ref={videoRef}
          src={`${videoSrc}#t=0.001`}
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover block bg-black z-0 transition-opacity duration-300 pointer-events-none ${
            playbackState === 'ended' ? 'opacity-0' : 'opacity-100'
          }`}
          aria-label="Oscar Fernandez Presentation Video"
        />

        {/* ================================================================= */}
        {/* SMOOTH FADE-TO-BLACK OVERLAY (Last 1.5 seconds)                   */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 bg-black pointer-events-none z-[15] will-change-opacity"
          style={{
            opacity: fadeToBlackOpacity,
            transition: 'opacity 0.05s linear',
          }}
        />

        {/* ================================================================= */}
        {/* iOS Top Status Bar (System Time, Cellular, 5G, Battery)         */}
        {/* ================================================================= */}
        <div className="relative z-10 w-full px-5 pt-2.5 flex items-center justify-between text-white/90 text-[9px] font-sans font-medium tracking-tight select-none pointer-events-none drop-shadow">
          <span className="font-semibold text-white tracking-normal">{systemTime}</span>
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
        {/* STATE A: INITIAL PLAY OVERLAY (Dark veil + centered YouTube play) */}
        {/* ================================================================= */}
        {playbackState === 'idle' && (
          <div
            onClick={handleStartPlay}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center cursor-pointer bg-black/40 hover:bg-black/30 transition-all group"
            aria-label="Play presentation video with sound"
          >
            {/* Perfectly centered official YouTube SVG badge */}
            <div className="flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95">
              <svg
                viewBox="0 0 68 48"
                className="w-16 h-11 sm:w-18 sm:h-12 drop-shadow-2xl"
              >
                {/* Authentic YouTube curved rectangular body */}
                <path
                  d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                  fill="#ff0000"
                />
                {/* Mathematically centered white triangle */}
                <path d="M45 24L27 14v20z" fill="#ffffff" />
              </svg>

              {/* Small white text below */}
              <span className="font-mono text-[9px] sm:text-[10px] text-white uppercase tracking-widest drop-shadow-md font-semibold mt-2.5">
                Play presentation
              </span>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STATE B: END SCREEN (Full Black + Contact Info + Play Again)      */}
        {/* ================================================================= */}
        {playbackState === 'ended' && (
          <div className="absolute inset-0 z-50 bg-black pointer-events-auto flex flex-col justify-between px-4 py-3 text-white animate-fadeIn overflow-hidden">
            {/* Top Status Space */}
            <div className="h-4" />

            {/* UPPER: Contact Info matching Footer */}
            <div className="w-full flex-1 flex flex-col justify-center space-y-2.5">
              {/* Header / Intro */}
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[8px] font-mono uppercase tracking-wider text-white/90">
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
                  className="w-full px-3 py-2 rounded-xl bg-white text-black hover:bg-white/90 font-sans text-[10px] font-bold tracking-wide flex items-center justify-between transition-colors shadow-sm cursor-pointer"
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
                    className="truncate hover:text-white/80 flex items-center gap-1.5 cursor-pointer"
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
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white cursor-pointer"
                  >
                    <span className="text-emerald-400">●</span>
                    <span>WhatsApp</span>
                    <span className="text-[8px]">↗</span>
                  </a>

                  <a
                    href="tel:+51977675421"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white cursor-pointer"
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
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white cursor-pointer"
                  >
                    <span>LinkedIn</span>
                    <span className="text-[8px]">↗</span>
                  </a>

                  <a
                    href={cvPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Oscar_Fernandez_CV.pdf"
                    className="px-2 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-[9px] font-mono flex items-center justify-center gap-1 transition-colors text-white cursor-pointer"
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
