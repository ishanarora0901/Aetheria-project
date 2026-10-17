import React, { useState } from 'react';
import { Home, Calendar, Gamepad2, GraduationCap, Clock, MapPin, Info, PhoneCall } from 'lucide-react';
import { sounds } from '../utils/soundEngine';

export default function LeftNavDock() {
  const [activeItem, setActiveItem] = useState('home');

  const dockLinks = [
    { id: 'home', icon: Home, label: 'Home Base', target: '#hero' },
    { id: 'events', icon: Calendar, label: 'Competitions', target: '#events' },
    { id: 'esports', icon: Gamepad2, label: 'Esports Arena', target: '#esports' },
    { id: 'workshops', icon: GraduationCap, label: 'Workshops', target: '#workshops' },
    { id: 'schedule', icon: Clock, label: 'Schedule', target: '#schedule' },
    { id: 'map', icon: MapPin, label: 'Campus Map', target: '#map' },
    { id: 'about', icon: Info, label: 'About Fest', target: '#about' },
  ];

  const handleClick = (e, item) => {
    e.preventDefault();
    setActiveItem(item.id);
    sounds.playClick();
    const el = document.querySelector(item.target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="left-cyber-dock" aria-label="Quick Access Sidebar">
      <div className="dock-glass-rail">
        <div className="dock-header-mark">
          <span className="dot pulse" />
          <span className="rail-label">SYS.NAV</span>
        </div>

        <nav className="dock-nav-list">
          {dockLinks.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            return (
              <a
                key={item.id}
                href={item.target}
                className={`dock-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={() => sounds.playHover()}
                onClick={(e) => handleClick(e, item)}
                data-cursor-text={item.label}
              >
                <div className="icon-wrapper">
                  <IconComponent size={19} />
                </div>
                <span className="dock-tooltip">{item.label}</span>
                {isActive && <span className="active-glow-indicator" />}
              </a>
            );
          })}
        </nav>

        <div className="dock-footer-code">
          <span>SEC.07</span>
        </div>
      </div>
    </aside>
  );
}
