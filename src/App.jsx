import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeftNavDock from './components/LeftNavDock';
import CustomCursor from './components/CustomCursor';
import HeroScene3D from './components/HeroScene3D';
import HeroBanner from './components/HeroBanner';
import EventsSection from './components/EventsSection';
import WorkshopsSection from './components/WorkshopsSection';
import FestivalMap from './components/FestivalMap';
import ScheduleSection from './components/ScheduleSection';
import AboutSection from './components/AboutSection';
import SponsorsSection from './components/SponsorsSection';
import Footer from './components/Footer';
import EventModal from './components/EventModal';
import AuthModal from './components/AuthModal';
import { EVENTS_DATA } from './data/eventsData';

export default function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const handleToggleOverclock = () => {
    setIsOverclocked((prev) => !prev);
  };

  const handleSelectWorkshop = (ws) => {
    // Convert workshop to event modal format if selected from workshops section
    const matchingEvent = EVENTS_DATA.find((e) => e.title.includes(ws.title.split(':')[0])) || {
      id: ws.id,
      title: ws.title,
      category: 'workshops',
      tag: ws.badge,
      prizePool: ws.fee,
      teamSize: 'Individual Seat',
      date: ws.date,
      venue: 'Sector Epsilon - Holodeck',
      banner: `${import.meta.env.BASE_URL}assets/hero-citadel.jpg`,
      difficulty: 'Certified',
      registrationFee: ws.fee,
      seatsLeft: ws.seatsLeft,
      shortDesc: ws.desc,
      fullDesc: `${ws.desc} Directed by ${ws.instructor} (${ws.role}).`,
      rounds: ws.topics.map((t, i) => ({ name: `Module 0${i + 1}`, detail: t })),
      rules: ['Laptops recommended.', 'Official course completion certificate and materials will be provided.'],
      eligibility: 'All students and developers welcome.'
    };
    setSelectedEvent(matchingEvent);
  };

  return (
    <div className={`app-root ${isOverclocked ? 'theme-overclock' : ''}`}>
      {/* Dynamic Stardust Cursor & Reticle */}
      <CustomCursor />

      {/* Top Futuristic Navigation Deck */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Left Navigation Dock */}
      <LeftNavDock />

      {/* Main Experience Flow */}
      <main className="main-content-flow">
        {/* Hero Section with 3D WebGL Canvas */}
        <div className="hero-viewport-wrapper">
          <HeroScene3D
            isOverclocked={isOverclocked}
            onCoreClick={handleToggleOverclock}
          />
          <HeroBanner
            isOverclocked={isOverclocked}
            onToggleOverclock={handleToggleOverclock}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        </div>

        {/* Competitions & Esports Showcase */}
        <EventsSection onSelectEvent={setSelectedEvent} />

        {/* Dedicated Industry Masterclasses */}
        <WorkshopsSection onSelectWorkshop={handleSelectWorkshop} />

        {/* Interactive Holographic Campus Map */}
        <FestivalMap />

        {/* Chronological 3-Day Itinerary */}
        <ScheduleSection />

        {/* Hostels & Hospitality */}
        <AboutSection />

        {/* Sponsors & Partners Marquee */}
        <SponsorsSection />

        {/* Cyber Footer */}
        <Footer />
      </main>

      {/* Event Details & Registration Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Sign In & Delegate Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(profile) => setUserProfile(profile)}
      />
    </div>
  );
}
