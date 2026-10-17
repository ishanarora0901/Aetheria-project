import React from 'react';
import { sounds } from '../utils/soundEngine';
import { Award, BookOpen, Clock, Users, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function WorkshopsSection({ onSelectWorkshop }) {
  const workshops = [
    {
      id: 'ws-ue5',
      title: 'UNREAL ENGINE 5: NEXT-GEN WORLDBUILDING',
      instructor: 'Vikramaditya Roy',
      role: 'Principal Technical Director, Epic Games Alumni',
      date: 'March 27, 2026 • 10:00 AM - 4:00 PM',
      badge: 'OFFICIALLY CERTIFIED',
      fillPercent: 88,
      seatsLeft: '12 Seats Left',
      desc: 'Hands-on training in Nanite mesh virtualization, Lumen real-time global illumination, and cinematic PCG level design.',
      topics: ['Nanite Asset Virtualization', 'Lumen Dynamic Lighting', 'Blueprints Gameplay Controller', 'VFX Niagara Systems'],
      fee: '₹499 (Toolkits Included)',
    },
    {
      id: 'ws-genai',
      title: 'AGENTIC AI: TRANSFORMERS & MULTI-AGENT SWARMS',
      instructor: 'Dr. Evelyn Vance',
      role: 'Senior Staff Research Scientist, AI Fellow',
      date: 'March 28, 2026 • 11:00 AM - 5:00 PM',
      badge: '$100 CLOUD CREDITS',
      fillPercent: 94,
      seatsLeft: '4 Seats Left',
      desc: 'Master the transition from static LLMs to autonomous agentic reasoning pipelines with LangGraph, tool calling, and RAG.',
      topics: ['Attention & KV Cache Architecture', 'Function Calling & Tool Synthesis', 'Multi-Agent State Graphs', 'Self-Healing Code Pipelines'],
      fee: '₹599 (Credits Included)',
    },
    {
      id: 'ws-cybersec',
      title: 'OFFENSIVE ZERO-DAY & REVERSE ENGINEERING',
      instructor: 'Karan Mehra (K0D3X)',
      role: 'Red Team Lead & DEFCON CTF Finalist',
      date: 'March 29, 2026 • 10:30 AM - 3:30 PM',
      badge: 'HANDS-ON LAB',
      fillPercent: 79,
      seatsLeft: '21 Seats Left',
      desc: 'Deep dive into x86/ARM disassembly with Ghidra, memory corruption exploits, bypass mechanisms, and kernel hooking.',
      topics: ['Ghidra Binary Decompilation', 'Buffer Overflow Exploits', 'Bypassing ASLR & DEP', 'Smart Contract Auditing'],
      fee: '₹449 (Lab Access)',
    },
  ];

  return (
    <section id="workshops" className="workshops-section">
      <div className="section-top-glow-divider gold" />
      <div className="section-container">
        {/* Section Heading */}
        <div className="section-head-deck">
          <div className="section-tag-badge gold-badge">
            <span className="dot pulse gold" />
            <span>EXECUTIVE MASTERCLASSES</span>
          </div>
          <h2 className="section-title">
            INDUSTRY-LED <span className="neon-amber-text">INTENSIVE BOOTCAMPS</span>
          </h2>
          <p className="section-subtitle">
            Acquire industry-grade competencies directly from global leads at Epic Games, DeepMind, and elite cyber defense units.
          </p>
        </div>

        {/* Workshops Cards */}
        <div className="workshops-grid">
          {workshops.map((ws) => (
            <div
              key={ws.id}
              className="workshop-card"
              onMouseEnter={() => sounds.playHover()}
            >
              <div className="ws-top-banner">
                <span className="ws-badge-pill">{ws.badge}</span>
                <span className="ws-fee-tag">{ws.fee}</span>
              </div>

              <div className="ws-header">
                <h3 className="ws-title">{ws.title}</h3>
                <div className="ws-instructor-lockup">
                  <div className="avatar-placeholder">
                    {ws.instructor.charAt(0)}
                  </div>
                  <div>
                    <h4 className="instructor-name">{ws.instructor}</h4>
                    <span className="instructor-role">{ws.role}</span>
                  </div>
                </div>
              </div>

              <p className="ws-desc">{ws.desc}</p>

              {/* Topics Pills */}
              <div className="ws-topics-list">
                {ws.topics.map((t, idx) => (
                  <span key={idx} className="ws-topic-chip">
                    <CheckCircle size={12} className="check-icon" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              {/* Seat Capacity Gauge */}
              <div className="ws-capacity-gauge">
                <div className="gauge-labels">
                  <span className="gauge-lbl">Seats Booked</span>
                  <span className="gauge-val">{ws.seatsLeft}</span>
                </div>
                <div className="gauge-track">
                  <div
                    className="gauge-fill"
                    style={{ width: `${ws.fillPercent}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                className="ws-enroll-btn"
                onClick={() => {
                  sounds.playClick();
                  onSelectWorkshop(ws);
                }}
                data-cursor-text="ENROLL PASS"
              >
                <span>CLAIM SEAT & WORKSHOP KIT</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
