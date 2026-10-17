import React, { useState } from 'react';
import { sounds } from '../utils/soundEngine';
import { Building2, Utensils, Wifi, Bus, Shield, HelpCircle, ChevronDown } from 'lucide-react';

export default function AboutSection() {
  const [activeFaq, setActiveFaq] = useState(null);

  const perks = [
    { icon: Building2, title: 'Campus Hostels', desc: 'Secure air-cooled dormitories inside university premises with dedicated security.' },
    { icon: Utensils, title: 'Multi-Cuisine Mess', desc: 'Nutritious breakfast, lunch, high-tea, and dinner provided via digital meal vouchers.' },
    { icon: Wifi, title: 'Gigabit Mesh Wi-Fi', desc: '10 Gbps unthrottled fiber LAN across all hostels, labs, and esports zones.' },
    { icon: Bus, title: 'Free Transit Shuttles', desc: 'Continuous electric shuttles connecting campus entrance, arenas, and railway terminal.' },
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in Aetheria 2026?',
      a: 'Any currently enrolled undergraduate, postgraduate, or diploma student with a valid college ID card is eligible to compete in all hackathons, esports, and technical events.'
    },
    {
      q: 'How does accommodation work for outstation collegiate teams?',
      a: 'Delegates traveling from outside the city can opt for subsidized campus accommodation at ₹350/day including hostel room, bedding, and mess card access.'
    },
    {
      q: 'Can an individual participate in both Esports and B.Tech Hackathons?',
      a: 'Yes, our scheduling matrix is calibrated to ensure that tournament qualifier timings do not conflict with hackathon prototype reviews.'
    },
    {
      q: 'Are hardware kits provided for robotics and workshops?',
      a: 'Yes! Workshop attendees receive high-spec kits and cloud compute GPU vouchers. Combat robotics participants must bring their custom bots following safety check guidelines.'
    }
  ];

  const toggleFaq = (idx) => {
    sounds.playClick();
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <section id="about" className="about-fest-section">
      <div className="section-top-glow-divider" />
      <div className="section-container">
        {/* About Heading */}
        <div className="section-head-deck">
          <div className="section-tag-badge">
            <span className="dot pulse" />
            <span>HOSPITALITY & LOGISTICS</span>
          </div>
          <h2 className="section-title">
            THE AETHERIAN <span className="neon-cyan-text">LEGACY & CAMPUS STAY</span>
          </h2>
          <p className="section-subtitle">
            Welcoming 45,000+ delegates from across the nation with world-class residential facilities, 24/7 security, and high-speed infrastructure.
          </p>
        </div>

        {/* Accommodation Perks Grid */}
        <div className="accommodation-grid">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="perk-card"
                onMouseEnter={() => sounds.playHover()}
              >
                <div className="perk-icon-box">
                  <Icon size={24} className="perk-icon" />
                </div>
                <h4 className="perk-title">{p.title}</h4>
                <p className="perk-desc">{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="faq-wrapper-deck">
          <div className="faq-header">
            <HelpCircle size={20} className="cyan-icon" />
            <h3 className="faq-title">FREQUENTLY ASKED PROTOCOLS (FAQ)</h3>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                  onMouseEnter={() => sounds.playHover()}
                >
                  <div className="faq-question">
                    <span className="q-text">{faq.q}</span>
                    <ChevronDown size={18} className={`chevron-icon ${isOpen ? 'rotate' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
