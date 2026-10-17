import React, { useState, useMemo } from 'react';
import { CATEGORIES, EVENTS_DATA } from '../data/eventsData';
import { sounds } from '../utils/soundEngine';
import { Trophy, Users, MapPin, Search, ArrowRight, Zap, Sparkles, Filter } from 'lucide-react';

export default function EventsSection({ onSelectEvent }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="events" className="events-hub-section">
      <div className="section-top-glow-divider" />
      <div className="section-container">
        {/* Section Header */}
        <div className="section-head-deck">
          <div className="section-tag-badge">
            <span className="dot pulse" />
            <span>OPERATIONAL SECTORS</span>
          </div>
          <h2 className="section-title">
            COMPETITIVE <span className="neon-cyan-text">ARENAS & HACKATHONS</span>
          </h2>
          <p className="section-subtitle">
            Deploy your team across collegiate esports, high-octane combat robotics, 36-hour AI builds, and algorithmic showdowns.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="events-control-bar">
          <div className="category-tabs-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                }}
                onMouseEnter={() => sounds.playHover()}
                data-cursor-text={cat.label}
              >
                <span className="tab-label">{cat.label}</span>
                {cat.id === 'esports' && <span className="tab-pill">LAN</span>}
                {cat.id === 'btech' && <span className="tab-pill hack">36H</span>}
                {activeCategory === cat.id && <span className="tab-active-indicator" />}
              </button>
            ))}
          </div>

          <div className="search-box-cyber">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search event, esports, tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cyber-input"
            />
          </div>
        </div>

        {/* Event Cards Grid with 3D Tilt Effect */}
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <TiltCard
              key={event.id}
              event={event}
              onSelect={() => {
                sounds.playModalOpen();
                onSelectEvent(event);
              }}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="empty-results-box">
            <Filter size={32} className="empty-icon" />
            <h3>NO MATCHING OPERATIONS FOUND</h3>
            <p>Try clearing your search query or selecting another operational category.</p>
            <button
              className="reset-filter-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                sounds.playClick();
              }}
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// 3D Tilt Card Component with Dynamic Glare & Perspective
function TiltCard({ event, onSelect }) {
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.08s ease-out',
    });

    setGlareStyle({
      opacity: 0.28,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(0, 242, 254, 0.45) 0%, rgba(255, 0, 128, 0.15) 40%, transparent 70%)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
    });
    setGlareStyle({ opacity: 0 });
  };

  return (
    <div
      className="event-card-wrapper"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => sounds.playHover()}
      onClick={onSelect}
      data-cursor-text="VIEW INTEL"
    >
      <div className="event-card-inner">
        {/* Dynamic Glare Reflection Overlay */}
        <div className="card-glare-overlay" style={glareStyle} />

        {/* Card Header & Media */}
        <div className="card-image-box">
          <img
            src={event.banner.startsWith('http') ? event.banner : `${import.meta.env.BASE_URL}${event.banner.replace(/^\//, '')}`}
            alt={event.title}
            className="card-banner-img"
            loading="lazy"
          />
          <div className="card-image-gradient" />

          {/* Badges */}
          <div className="card-top-badges">
            <span className="card-tag-badge">{event.tag}</span>
            <span className="card-difficulty-badge">{event.difficulty}</span>
          </div>

          <div className="card-prize-banner">
            <Trophy size={15} className="prize-icon" />
            <span className="prize-amount">{event.prizePool}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <h3 className="card-event-title">{event.title}</h3>
          <p className="card-short-desc">{event.shortDesc}</p>

          <div className="card-meta-list">
            <div className="meta-row">
              <Users size={14} className="meta-icon" />
              <span>{event.teamSize}</span>
            </div>
            <div className="meta-row">
              <MapPin size={14} className="meta-icon" />
              <span>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Card Footer Button */}
        <div className="card-footer">
          <div className="seats-indicator">
            <span className="dot pulse red" />
            <span className="seats-text">{event.seatsLeft} Slots Left</span>
          </div>
          <button className="card-inspect-btn">
            <span>DOSSIER</span>
            <ArrowRight size={14} className="arrow-icon" />
          </button>
        </div>

        {/* Futuristic Corner Tech Accents */}
        <div className="corner-accent top-left" />
        <div className="corner-accent top-right" />
        <div className="corner-accent bottom-left" />
        <div className="corner-accent bottom-right" />
      </div>
    </div>
  );
}
