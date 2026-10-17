import React, { useState } from 'react';
import { SCHEDULE_DAYS } from '../data/scheduleData';
import { sounds } from '../utils/soundEngine';
import { Clock, MapPin, Bookmark, Check, Calendar, Bell } from 'lucide-react';

export default function ScheduleSection() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});

  const currentDay = SCHEDULE_DAYS[activeDayIdx];

  const toggleBookmark = (eventId) => {
    sounds.playClick();
    setBookmarkedEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <section id="schedule" className="schedule-section">
      <div className="section-top-glow-divider" />
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-head-deck">
          <div className="section-tag-badge">
            <span className="dot pulse" />
            <span>CHRONO-TIMELINE</span>
          </div>
          <h2 className="section-title">
            FESTIVAL <span className="neon-cyan-text">ITINERARY & TIMETABLE</span>
          </h2>
          <p className="section-subtitle">
            Three days of relentless action. Plan your squad itinerary across hackathons, robotics heats, and pro-nites.
          </p>
        </div>

        {/* Day Selector Buttons */}
        <div className="day-tabs-deck">
          {SCHEDULE_DAYS.map((day, idx) => {
            const isActive = activeDayIdx === idx;
            return (
              <button
                key={day.dayId}
                className={`day-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  sounds.playClick();
                  setActiveDayIdx(idx);
                }}
                onMouseEnter={() => sounds.playHover()}
                data-cursor-text={day.dayNumber}
              >
                <div className="day-tab-content">
                  <span className="day-badge">{day.dayNumber}</span>
                  <strong className="day-date">{day.date}</strong>
                  <span className="day-theme">{day.theme.split(':')[0]}</span>
                </div>
                {isActive && <span className="active-glow-pill" />}
              </button>
            );
          })}
        </div>

        {/* Active Day Theme Banner */}
        <div className="day-theme-banner">
          <Calendar size={18} className="theme-banner-icon" />
          <span className="theme-text">{currentDay.theme}</span>
        </div>

        {/* Timeline Events List */}
        <div className="timeline-container">
          <div className="timeline-spine-line" />

          <div className="timeline-items-list">
            {currentDay.events.map((item, idx) => {
              const eventKey = `${currentDay.dayId}-${idx}`;
              const isBookmarked = !!bookmarkedEvents[eventKey];

              return (
                <div
                  key={idx}
                  className="timeline-item-row"
                  onMouseEnter={() => sounds.playHover()}
                >
                  {/* Time Column */}
                  <div className="timeline-time-col">
                    <div className="time-badge">
                      <Clock size={14} className="clock-icon" />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  {/* Node on spine */}
                  <div className="timeline-node">
                    <div className="node-glow" />
                  </div>

                  {/* Card Content */}
                  <div className="timeline-content-card">
                    <div className="card-top-meta">
                      <span className="event-type-badge">{item.type}</span>
                      <span className="event-tag-pill">{item.tag}</span>
                    </div>

                    <h3 className="timeline-title">{item.title}</h3>

                    <div className="timeline-location-row">
                      <MapPin size={14} className="loc-icon" />
                      <span>{item.venue}</span>
                    </div>

                    <div className="timeline-speaker-row">
                      <span className="speaker-label">Presided by:</span>
                      <span className="speaker-name">{item.speaker}</span>
                    </div>

                    <button
                      className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => toggleBookmark(eventKey)}
                      data-cursor-text={isBookmarked ? 'SAVED' : 'REMIND ME'}
                    >
                      {isBookmarked ? (
                        <>
                          <Check size={14} />
                          <span>REMINDER ACTIVE</span>
                        </>
                      ) : (
                        <>
                          <Bell size={14} />
                          <span>SET ALERT</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
