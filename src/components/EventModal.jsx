import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';
import { X, Trophy, Users, MapPin, Calendar, CheckCircle2, ShieldAlert, Sparkles, QrCode, Download, ArrowRight } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [activeTab, setActiveTab] = useState('dossier'); // 'dossier' | 'register' | 'ticket'
  const [formData, setFormData] = useState({
    leaderName: '',
    email: '',
    phone: '',
    college: '',
    department: 'Computer Science & Engg',
    teamName: '',
    discordId: '',
    yearOfStudy: '3rd Year B.Tech',
  });
  const [ticketData, setTicketData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    sounds.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedTicket = {
        passId: `AETH-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        ...formData,
      };
      setTicketData(generatedTicket);
      setActiveTab('ticket');

      sounds.playSuccess();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#00f2fe', '#ff007f', '#ffb347', '#ffffff'],
      });
    }, 600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-cyber-window" onClick={(e) => e.stopPropagation()}>
        {/* Top Window Chrome */}
        <div className="modal-header-deck">
          <div className="modal-title-lockup">
            <span className="dot pulse" />
            <span className="modal-id-tag">DOSSIER // {event.id.toUpperCase()}</span>
          </div>
          <button
            className="modal-close-btn"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            data-cursor-text="CLOSE"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-nav-tabs">
          <button
            className={`modal-tab ${activeTab === 'dossier' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('dossier');
            }}
          >
            BRIEFING & RULES
          </button>
          <button
            className={`modal-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveTab('register');
            }}
          >
            SQUAD REGISTRATION
          </button>
          {ticketData && (
            <button
              className={`modal-tab ${activeTab === 'ticket' ? 'active' : ''}`}
              onClick={() => {
                sounds.playClick();
                setActiveTab('ticket');
              }}
            >
              HOLO-TICKET PASS
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          {/* TAB 1: EVENT DOSSIER */}
          {activeTab === 'dossier' && (
            <div className="dossier-tab-content">
              {/* Hero Banner inside modal */}
              <div className="modal-hero-cover">
                <img
                  src={event.banner.startsWith('http') ? event.banner : `${import.meta.env.BASE_URL}${event.banner.replace(/^\//, '')}`}
                  alt={event.title}
                  className="modal-cover-img"
                />
                <div className="modal-cover-overlay" />
                <div className="modal-hero-details">
                  <span className="modal-tag-chip">{event.tag}</span>
                  <h2 className="modal-event-title">{event.title}</h2>
                  <div className="modal-key-metrics">
                    <div className="metric">
                      <Trophy size={16} className="cyan-icon" />
                      <div>
                        <span className="metric-lbl">Prize Bounty</span>
                        <strong className="metric-val">{event.prizePool}</strong>
                      </div>
                    </div>
                    <div className="metric">
                      <Users size={16} className="cyan-icon" />
                      <div>
                        <span className="metric-lbl">Team Roster</span>
                        <strong className="metric-val">{event.teamSize}</strong>
                      </div>
                    </div>
                    <div className="metric">
                      <Calendar size={16} className="cyan-icon" />
                      <div>
                        <span className="metric-lbl">Date & Time</span>
                        <strong className="metric-val">{event.date}</strong>
                      </div>
                    </div>
                    <div className="metric">
                      <MapPin size={16} className="cyan-icon" />
                      <div>
                        <span className="metric-lbl">Arena Venue</span>
                        <strong className="metric-val">{event.venue}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="modal-section-block">
                <h4 className="block-heading">MISSION OVERVIEW</h4>
                <p className="block-paragraph">{event.fullDesc}</p>
              </div>

              {/* Rounds Breakdown */}
              <div className="modal-section-block">
                <h4 className="block-heading">TOURNAMENT ROUNDS & STRUCTURE</h4>
                <div className="rounds-timeline-list">
                  {event.rounds.map((rnd, i) => (
                    <div key={i} className="round-item-card">
                      <div className="round-number-pill">R0{i + 1}</div>
                      <div className="round-info">
                        <strong className="round-name">{rnd.name}</strong>
                        <p className="round-detail">{rnd.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competition Protocols & Rules */}
              <div className="modal-section-block">
                <h4 className="block-heading">ARENA RULES & PROTOCOLS</h4>
                <ul className="rules-bullet-list">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="rule-bullet">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility & CTA */}
              <div className="dossier-footer-banner">
                <div className="eligibility-notice">
                  <ShieldAlert size={18} className="shield-icon" />
                  <span><strong>Eligibility:</strong> {event.eligibility}</span>
                </div>
                <button
                  className="modal-register-action-btn"
                  onClick={() => {
                    sounds.playClick();
                    setActiveTab('register');
                  }}
                  data-cursor-text="DEPLOY NOW"
                >
                  <Sparkles size={16} />
                  <span>INITIALIZE REGISTRATION</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: INTERACTIVE REGISTRATION FORM */}
          {activeTab === 'register' && (
            <div className="register-tab-content">
              <div className="register-header-brief">
                <h3 className="reg-title">REGISTER SQUAD / PARTICIPANT</h3>
                <p className="reg-subtitle">
                  Enrolling for <strong>{event.title}</strong> • Fee: <span className="free-tag">{event.registrationFee}</span>
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="cyber-form-grid">
                <div className="form-group">
                  <label className="cyber-label">Team Leader / Individual Full Name *</label>
                  <input
                    type="text"
                    name="leaderName"
                    required
                    placeholder="e.g. Aryan Sharma"
                    value={formData.leaderName}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">Official University / College Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. aryan.s@iitb.ac.in"
                    value={formData.email}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">Contact / WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">College / Institute Name *</label>
                  <input
                    type="text"
                    name="college"
                    required
                    placeholder="e.g. Indian Institute of Technology Bombay"
                    value={formData.college}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">Department / Branch *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="cyber-input cyber-select"
                  >
                    <option value="Computer Science & Engg">Computer Science & Engineering (CSE)</option>
                    <option value="AI & Data Science">Artificial Intelligence & Data Science</option>
                    <option value="Electronics & Comm Engg">Electronics & Communication (ECE)</option>
                    <option value="Mechanical / Mechatronics">Mechanical / Mechatronics</option>
                    <option value="Electrical Engineering">Electrical Engineering (EE)</option>
                    <option value="Aerospace / SpaceTech">Aerospace / SpaceTech</option>
                    <option value="Other Engineering Branch">Other Engineering Branch</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="cyber-label">Team / Clan Name</label>
                  <input
                    type="text"
                    name="teamName"
                    placeholder="e.g. CyberVanguard X"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">Discord Tag / In-Game ID</label>
                  <input
                    type="text"
                    name="discordId"
                    placeholder="e.g. phoenix#1337 / RiotID"
                    value={formData.discordId}
                    onChange={handleChange}
                    className="cyber-input"
                  />
                </div>

                <div className="form-group">
                  <label className="cyber-label">Current Year of Study</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="cyber-input cyber-select"
                  >
                    <option value="1st Year B.Tech">1st Year B.Tech / BE</option>
                    <option value="2nd Year B.Tech">2nd Year B.Tech / BE</option>
                    <option value="3rd Year B.Tech">3rd Year B.Tech / BE</option>
                    <option value="4th Year B.Tech">4th Year B.Tech / BE</option>
                    <option value="Postgraduate / Research">M.Tech / MS / PhD</option>
                  </select>
                </div>

                <div className="form-submit-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-submit-btn"
                    data-cursor-text="CONFIRM SQUAD"
                  >
                    {isSubmitting ? (
                      <span>ENCRYPTING CREDENTIALS...</span>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>SUBMIT & MINT HOLO-PASS</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: GENERATED DIGITAL TICKET PASS */}
          {activeTab === 'ticket' && ticketData && (
            <div className="ticket-tab-content">
              <div className="holo-pass-card">
                <div className="pass-watermark">AETHERIA</div>

                <div className="pass-top">
                  <div className="pass-brand">
                    <span className="pass-logo">AETHERIA '26</span>
                    <span className="pass-type-badge">OFFICIAL DELEGATE PASS</span>
                  </div>
                  <div className="pass-barcode">
                    <QrCode size={52} className="qr-code-icon" />
                  </div>
                </div>

                <div className="pass-main">
                  <div className="pass-event-name">{event.title}</div>
                  <div className="pass-grid">
                    <div className="pass-field">
                      <span className="lbl">DELEGATE / LEADER</span>
                      <strong className="val">{ticketData.leaderName}</strong>
                    </div>
                    <div className="pass-field">
                      <span className="lbl">INSTITUTE</span>
                      <strong className="val">{ticketData.college}</strong>
                    </div>
                    <div className="pass-field">
                      <span className="lbl">TEAM CODENAME</span>
                      <strong className="val">{ticketData.teamName || 'SOLO OPERATIVE'}</strong>
                    </div>
                    <div className="pass-field">
                      <span className="lbl">PASS IDENTIFIER</span>
                      <strong className="val pass-id-highlight">{ticketData.passId}</strong>
                    </div>
                    <div className="pass-field">
                      <span className="lbl">ARENA LOCATION</span>
                      <strong className="val">{event.venue}</strong>
                    </div>
                    <div className="pass-field">
                      <span className="lbl">STATUS</span>
                      <strong className="val status-confirmed">VERIFIED & ACCREDITED</strong>
                    </div>
                  </div>
                </div>

                <div className="pass-bottom-strip">
                  <span>SHOW THIS DIGITAL PASS AT SECTOR CHECKPOINT • VALID THROUGH MARCH 27-29, 2026</span>
                </div>
              </div>

              <div className="pass-actions-row">
                <button
                  className="download-pass-btn"
                  onClick={() => {
                    sounds.playClick();
                    alert(`Pass #${ticketData.passId} saved! Present this token at Sector Security.`);
                  }}
                  data-cursor-text="SAVE PASS"
                >
                  <Download size={16} />
                  <span>DOWNLOAD HOLO-PASS TOKEN</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
