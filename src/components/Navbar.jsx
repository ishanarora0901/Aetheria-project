import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEngine';
import { User, Shield, Sparkles, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenAuth, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', target: '#about' },
    { label: 'COMPETITIONS', target: '#events' },
    { label: 'WORKSHOPS', target: '#workshops', badge: 'EARLY BIRD' },
    { label: 'ESPORTS ARENA', target: '#esports' },
    { label: 'SCHEDULE', target: '#schedule' },
    { label: 'CAMPUS MAP', target: '#map' },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    sounds.playClick();
    setMobileMenuOpen(false);
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`top-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
      {/* Brand Logo */}
      <a
        href="#"
        className="brand-logo"
        onMouseEnter={() => sounds.playHover()}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        data-cursor-text="AETHERIA"
      >
        <div className="logo-glyph">
          <svg viewBox="0 0 40 40" width="34" height="34" fill="none">
            <polygon points="20,2 38,11 38,29 20,38 2,29 2,11" stroke="#00f2fe" strokeWidth="2.5" />
            <polygon points="20,9 31,16 31,24 20,31 9,24 9,16" stroke="#ffb347" strokeWidth="1.8" opacity="0.8" />
            <circle cx="20" cy="20" r="3.5" fill="#00f2fe" />
          </svg>
        </div>
        <div className="logo-text">
          <span className="logo-title">AETHERIA</span>
          <span className="logo-edition">'26</span>
        </div>
      </a>

      {/* Futuristic Chamfered Center Command Bar (Inspired by Techfest HUD) */}
      <nav className="center-hud-deck">
        <div className="hud-deck-shape">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.target}
              className={`hud-link ${item.badge ? 'has-badge' : ''}`}
              onMouseEnter={() => sounds.playHover()}
              onClick={(e) => handleNavClick(e, item.target)}
              data-cursor-text={item.label}
            >
              {item.badge && <span className="nav-badge-pill">{item.badge}</span>}
              <span className="link-title">{item.label}</span>
              <span className="glow-bar" />
            </a>
          ))}
        </div>
      </nav>

      {/* Right Action: Sign In / Register Fest Pass */}
      <div className="nav-actions">
        <button
          className="cyber-auth-btn"
          onMouseEnter={() => sounds.playHover()}
          onClick={() => {
            sounds.playModalOpen();
            onOpenAuth();
          }}
          data-cursor-text="DELEGATE ACCESS"
        >
          <span className="cyber-bracket left">[</span>
          <User size={15} className="btn-icon" />
          <span className="btn-label">SIGN IN</span>
          <span className="cyber-bracket right">]</span>
        </button>

        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle"
          onClick={() => {
            sounds.playClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.target}
              className="mobile-link"
              onClick={(e) => handleNavClick(e, item.target)}
            >
              {item.label}
              {item.badge && <span className="mobile-badge">{item.badge}</span>}
            </a>
          ))}
          <button
            className="mobile-auth-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth();
            }}
          >
            SIGN IN / REGISTER FEST PASS
          </button>
        </div>
      )}
    </header>
  );
}
