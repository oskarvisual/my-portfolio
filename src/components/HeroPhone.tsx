import React, { useState, useRef } from 'react';
import iphoneFrame from '../assets/images/iphone-17.svg';
import sampleVideo from '../assets/videos/ecommerce.mp4';

interface HeroPhoneProps {
  /** Optional video source; defaults to placeholder video until user provides final asset */
  videoSrc?: string;
  /** Optional custom poster or title */
  title?: string;
  className?: string;
}

export const HeroPhone: React.FC<HeroPhoneProps> = ({
  videoSrc = sampleVideo,
  title = 'Oscar Fernandez · Full-Stack Ecommerce',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // If browser blocks unmuted audio on initial play, fallback to muted
            video.muted = true;
            setIsMuted(true);
            video.play();
            setIsPlaying(true);
          });
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newPercentage * duration;
    setCurrentTime(video.currentTime);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        // Maintain exact iPhone 17 physical aspect ratio: 72.5mm / 150mm
        aspectRatio: '72.5 / 150',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =================================================================== */}
      {/* 1. IPHONE SCREEN LAYER (Underneath SVG bezel frame)                 */}
      {/* =================================================================== */}
      <div
        className="absolute inset-[1.64%_4.02%] rounded-[14%/7%] bg-[#08080a] overflow-hidden flex flex-col justify-between shadow-inner"
        style={{
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
        }}
      >
        {/* iOS Top Status Bar (positioned just below top bezel) */}
        <div className="relative z-10 w-full px-5 pt-2.5 flex items-center justify-between text-white/70 text-[9px] font-sans font-medium tracking-tight select-none pointer-events-none">
          {/* Time (left of Dynamic Island) */}
          <span className="font-semibold text-white/90">9:41</span>

          {/* Status Icons (right of Dynamic Island) */}
          <div className="flex items-center gap-1.5 text-white/80">
            {/* Cellular signal */}
            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 16 16">
              <rect x="1" y="11" width="2" height="4" rx="0.5" />
              <rect x="5" y="8" width="2" height="7" rx="0.5" />
              <rect x="9" y="5" width="2" height="10" rx="0.5" />
              <rect x="13" y="2" width="2" height="13" rx="0.5" />
            </svg>
            {/* 5G */}
            <span className="text-[8px] font-bold">5G</span>
            {/* Battery */}
            <div className="w-4 h-2 rounded-[2px] border border-white/70 p-[1px] flex items-center">
              <div className="h-full w-3/4 bg-white/90 rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. CENTERED 16:9 VIDEO CONTAINER                                 */}
        {/* ================================================================= */}
        <div
          onClick={togglePlay}
          className="relative w-full aspect-video my-auto bg-black/90 flex items-center justify-center cursor-pointer group overflow-hidden border-y border-white/5 shadow-2xl"
        >
          {/* Native HTML5 Video Element (16:9) */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            loop
            muted={isMuted}
            preload="metadata"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover block bg-black"
            aria-label={title}
          />

          {/* Subtle Ambient Video Gradient Overlay for High-End Cinematic Look */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 ${
              isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* =============================================================== */}
          {/* LARGE PLAY BUTTON ICON (In middle of 16:9 video)                */}
          {/* =============================================================== */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${
              isPlaying && !isHovered
                ? 'opacity-0 scale-90'
                : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative flex items-center justify-center">
              {/* Pulsing ring animation when video is paused */}
              {!isPlaying && (
                <span className="absolute -inset-2.5 rounded-full bg-accent/40 animate-ping opacity-60 pointer-events-none" />
              )}

              {/* The Big Play Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="relative pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-accent hover:bg-accent/90 active:scale-95 text-paper flex items-center justify-center shadow-[0_10px_30px_rgba(189,83,43,0.5)] border border-white/20 transition-all duration-300 hover:scale-105 group-hover:shadow-[0_15px_35px_rgba(189,83,43,0.7)]"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  // Pause Icon
                  <svg
                    className="w-6 h-6 fill-current text-white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  // Large Play Icon (triangle)
                  <svg
                    className="w-7 h-7 fill-current text-white translate-x-0.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Video Micro Controls: Time Bar & Mute Button */}
          <div
            className={`absolute bottom-0 inset-x-0 p-2 flex items-center justify-between gap-2 z-10 transition-opacity duration-300 ${
              isPlaying && !isHovered ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {/* Interactive Progress Bar */}
            <div
              onClick={handleSeek}
              className="flex-1 h-1 bg-white/20 hover:h-1.5 rounded-full overflow-hidden cursor-pointer transition-all"
            >
              <div
                className="h-full bg-accent transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Audio Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-1 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white transition-colors"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                // Muted speaker
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                // Loudspeaker
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* iOS Bottom Home Indicator Bar */}
        <div className="relative z-10 w-full pb-2.5 flex flex-col items-center justify-center gap-1 select-none pointer-events-none">
          <span className="font-mono text-[8px] uppercase tracking-widest text-white/40">
            Tap to watch
          </span>
          <div className="w-24 h-1 bg-white/30 rounded-full" />
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. IPHONE 17 VECTOR FRAME OVERLAY (Screen cut out transparently)    */}
      {/* =================================================================== */}
      <img
        src={iphoneFrame}
        alt="iPhone 17 Chassis Frame"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 select-none drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)]"
        loading="eager"
      />

      {/* Subtle realistic diagonal glass reflection over the front */}
      <div
        className="absolute inset-[1.64%_4.02%] rounded-[14%/7%] pointer-events-none z-30 overflow-hidden opacity-25"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)',
        }}
      />
    </div>
  );
};
