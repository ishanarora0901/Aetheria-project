import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEngine';
import { Sparkles, Zap, Trophy, ShieldCheck, Terminal } from 'lucide-react';

export default function HeroBanner({ isOverclocked, onToggleOverclock, onOpenAuth }) {
  const [timeLeft, setTimeLeft] = useState({ days: 142, hours: 8, minutes: 24, seconds: 12 });
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Dynamic countdown clock
    const festDate = new Date('2026-03-27T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = festDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Mouse parallax tracking for moving wallpaper feel
    const handleMouseMove = (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const nx = (e.clientX - halfW) / halfW;
      const ny = (e.clientY - halfH) / halfH;
      setMouseParallax({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScrollDown = () => {
    sounds.playClick();
    const el = document.querySelector('#events');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Dynamic 3D WebGL Living World is rendered directly by HeroScene3D below */}
      <div className="hero-sharp-overlay" />

      {/* Main Center Content */}
      <div className="hero-content-wrapper">
        <div className="hero-edition-badge">
          <span className="badge-glow" />
          <span className="badge-text">27TH - 29TH MARCH • 18TH CONCLAVE EDITION</span>
        </div>

        {/* Epic Mythic Typography (Techfest inspired) */}
        <div className="hero-title-container">
          <h1 className="hero-main-title">
            <span className="title-glow-text">AETHERIA</span>
            <span className="title-year">'26</span>
          </h1>
          <div className="hero-theme-subtitle">
            <span className="flourish left">✦</span>
            <h2 className="theme-text">THE NEO-MYTHIC RENAISSANCE</h2>
            <span className="flourish right">✦</span>
          </div>
          <p className="hero-meta-tagline">
            ASIA'S PREMIER SCIENCE, TECHNOLOGY & ESPORTS PHENOMENON
          </p>
        </div>

        {/* Live Festival Countdown HUD */}
        <div className="countdown-hud-card">
          <div className="countdown-hud-header">
            <Terminal size={14} className="hud-icon" />
            <span className="hud-label">CHRONO-WARP INITIATION PROTOCOL</span>
            <span className="status-live-dot" />
          </div>
          <div className="countdown-grid">
            <div className="time-block">
              <span className="time-val">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="time-unit">DAYS</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-val">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="time-unit">HOURS</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="time-unit">MINS</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="time-unit">SECS</span>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="hero-action-buttons">
          <button
            className="hero-btn primary-glow-btn"
            onClick={handleScrollDown}
            onMouseEnter={() => sounds.playHover()}
            data-cursor-text="ENTER ARENA"
          >
            <span className="btn-cut-bg" />
            <span className="btn-content">
              <Sparkles size={17} className="btn-icon" />
              <span>ENTER THE CONCLAVE</span>
            </span>
          </button>

          <button
            className={`hero-btn overclock-btn ${isOverclocked ? 'is-active' : ''}`}
            onClick={() => {
              sounds.playOverclock();
              onToggleOverclock();
            }}
            onMouseEnter={() => sounds.playHover()}
            data-cursor-text="OVERCLOCK"
          >
            <span className="btn-cut-bg" />
            <span className="btn-content">
              <Zap size={17} className="btn-icon zap-icon" />
              <span>{isOverclocked ? 'CORE OVERCLOCKED (100%)' : 'OVERCLOCK 3D CORE'}</span>
            </span>
          </button>
        </div>

        {/* Stats strip */}
        <div className="hero-quick-stats">
          <div className="stat-pill">
            <Trophy size={14} className="stat-icon" />
            <span>₹25,00,000+ CASH & BOUNTIES</span>
          </div>
          <div className="stat-pill">
            <ShieldCheck size={14} className="stat-icon" />
            <span>64+ UNIVERSITIES COMPETING</span>
          </div>
          <div className="stat-pill coordinates">
            <span>COORD: 19.1334° N, 72.9133° E</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator (Identical to Techfest reference) */}
      <div
        className="scroll-indicator-deck"
        onClick={handleScrollDown}
        onMouseEnter={() => sounds.playHover()}
        data-cursor-text="DESCEND"
      >
        <span className="scroll-label">SCROLL</span>
        <div className="scroll-line-pill">
          <div className="scroll-dot-drop" />
        </div>
      </div>
    </section>
  );
}
