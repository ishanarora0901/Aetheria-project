import React from 'react';
import { SPONSORS } from '../data/eventsData';
import { sounds } from '../utils/soundEngine';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="section-top-glow-divider" />
      <div className="section-container">
        <div className="section-head-deck">
          <div className="section-tag-badge">
            <span className="dot pulse" />
            <span>INDUSTRY ALLIANCE</span>
          </div>
          <h2 className="section-title">
            GLOBAL <span className="neon-cyan-text">PARTNERS & SPONSORS</span>
          </h2>
          <p className="section-subtitle">
            Supported by leading frontier tech giants and esports pioneers driving innovation forward.
          </p>
        </div>

        <div className="sponsors-grid">
          {SPONSORS.map((sp, idx) => (
            <div
              key={idx}
              className="sponsor-card"
              onMouseEnter={() => sounds.playHover()}
              data-cursor-text={sp.name}
            >
              <div className="sp-tier-tag">{sp.tier}</div>
              <h3 className="sp-name">{sp.name}</h3>
              <p className="sp-role">{sp.role}</p>
              <div className="sp-glow-corner" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
