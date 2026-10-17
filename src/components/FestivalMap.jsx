import React, { useState } from 'react';
import { FESTIVAL_SECTORS } from '../data/eventsData';
import { sounds } from '../utils/soundEngine';
import { MapPin, Navigation, Eye, ShieldCheck, Activity } from 'lucide-react';

export default function FestivalMap() {
  const [selectedSector, setSelectedSector] = useState(FESTIVAL_SECTORS[0]);

  return (
    <section id="map" className="arena-map-section">
      <div className="section-top-glow-divider" />
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-head-deck">
          <div className="section-tag-badge">
            <span className="dot pulse" />
            <span>GEO-SPATIAL TELEMETRY</span>
          </div>
          <h2 className="section-title">
            FESTIVAL <span className="neon-cyan-text">CAMPUS RADAR & ARENA MAP</span>
          </h2>
          <p className="section-subtitle">
            Navigate the 5 active festival sectors spanning esports domes, robotic battle cages, and quantum innovation hubs.
          </p>
        </div>

        {/* Map Layout Deck */}
        <div className="holo-map-deck">
          {/* Left: Holographic Arena Blueprint */}
          <div className="holo-blueprint-stage">
            <div className="blueprint-grid-lines" />
            <div className="radar-sweep-scanner" />

            {/* Interactive Sector Nodes */}
            <div className="nodes-container">
              {FESTIVAL_SECTORS.map((sector, idx) => {
                const isSelected = selectedSector.id === sector.id;
                // Position nodes dynamically
                const positions = [
                  { top: '25%', left: '30%' }, // Alpha
                  { top: '35%', left: '72%' }, // Beta
                  { top: '65%', left: '22%' }, // Gamma
                  { top: '70%', left: '60%' }, // Delta
                  { top: '48%', left: '46%' }, // Epsilon (Center)
                ];
                const pos = positions[idx] || { top: '50%', left: '50%' };

                return (
                  <button
                    key={sector.id}
                    className={`sector-node-btn ${isSelected ? 'active' : ''}`}
                    style={pos}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedSector(sector);
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    data-cursor-text={sector.name}
                  >
                    <div className="node-marker">
                      <span className="node-core" />
                      <span className="node-pulse-ring ring-1" />
                      <span className="node-pulse-ring ring-2" />
                    </div>
                    <span className="node-label">{sector.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="blueprint-telemetry-corner">
              <span>GPS GRID: 19°08'00.2"N 72°54'47.9"E</span>
              <span>CALIBRATION: ACTIVE 60 FPS</span>
            </div>
          </div>

          {/* Right: Selected Sector Dossier Display */}
          <div className="sector-dossier-card">
            <div className="dossier-top">
              <div className="sector-id-chip">
                <Navigation size={14} className="cyan-icon" />
                <span>{selectedSector.name.toUpperCase()}</span>
              </div>
              <div className="status-indicator">
                <Activity size={14} className="status-icon" />
                <span>{selectedSector.status}</span>
              </div>
            </div>

            <h3 className="dossier-title">{selectedSector.title}</h3>
            <p className="dossier-desc">{selectedSector.desc}</p>

            <div className="dossier-specs-list">
              <div className="spec-item">
                <span className="spec-label">Capacity Allowance</span>
                <strong className="spec-val">{selectedSector.capacity}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">Active Competitions</span>
                <strong className="spec-val">{selectedSector.eventsCount}</strong>
              </div>
              <div className="spec-item">
                <span className="spec-label">Security Protocol</span>
                <strong className="spec-val">RFID Scanners + Smart Badge</strong>
              </div>
            </div>

            <div className="dossier-buttons-row">
              <button
                className="sector-action-btn"
                onClick={() => {
                  sounds.playClick();
                  const el = document.querySelector('#events');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor-text="VIEW OPERATIONS"
              >
                <span>FILTER ARENA EVENTS</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
