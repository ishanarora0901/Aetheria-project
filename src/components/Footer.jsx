import React from 'react';
import { sounds } from '../utils/soundEngine';
import { ShieldCheck, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="fest-footer">
      <div className="footer-glow-bar" />
      <div className="section-container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="logo-title">AETHERIA</span>
              <span className="logo-edition">'26</span>
            </div>
            <p className="footer-bio">
              Asia's largest annual student-organized science, technology and esports symposium. Empowering next-generation engineers, hackers, and creators to shape the frontiers of reality.
            </p>
            <div className="tech-telemetry-tag">
              <span className="dot pulse" />
              <span>ALL SYSTEMS OPERATIONAL • 2026 EDITION</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-col">
            <h4 className="footer-heading">NAVIGATION HUBS</h4>
            <ul className="footer-links-list">
              <li><a href="#hero" onClick={scrollToTop}>Home Base</a></li>
              <li><a href="#events">Competitive Arenas</a></li>
              <li><a href="#workshops">Executive Masterclasses</a></li>
              <li><a href="#schedule">Itinerary & Timetable</a></li>
              <li><a href="#map">Geo-Spatial Map</a></li>
              <li><a href="#about">Hostels & Hospitality</a></li>
            </ul>
          </div>

          {/* Sectors */}
          <div className="footer-col">
            <h4 className="footer-heading">OPERATIONAL SECTORS</h4>
            <ul className="footer-links-list">
              <li>Sector Alpha: Amphitheatre</li>
              <li>Sector Beta: Titan Coliseum</li>
              <li>Sector Gamma: Cyber Dome</li>
              <li>Sector Delta: Turing Hub</li>
              <li>Sector Epsilon: Quantum Lab</li>
            </ul>
          </div>

          {/* Contact & Control Room */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">CENTRAL CONTROL ROOM</h4>
            <div className="contact-item">
              <MapPin size={16} className="cyan-icon" />
              <span>Campus Student Gymkhana, Techfest HQ</span>
            </div>
            <div className="contact-item">
              <Mail size={16} className="cyan-icon" />
              <span>convenor@aetheria.fest</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="cyan-icon" />
              <span>+91 (022) 2576-4000 / +91 99887 76655</span>
            </div>
            <button
              className="scroll-top-btn"
              onClick={scrollToTop}
              onMouseEnter={() => sounds.playHover()}
              data-cursor-text="WARP TO TOP"
            >
              <span>ASCEND TO APEX</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="footer-bottom-bar">
          <p>© 2026 Aetheria Conclave. Crafted for the Pixel Wizard Design Competition.</p>
          <div className="footer-credits">
            <span>INSPIRED BY AETHERIAL RENAISSANCE</span>
            <span className="divider">•</span>
            <span>BUILT WITH REACT & THREE.JS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
