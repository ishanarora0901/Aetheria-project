import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/soundEngine';

export default function CustomCursor() {
  const canvasRef = useRef(null);
  const rocketRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isActive, setIsActive] = useState(false);

  // References for continuous animation without re-mounting useEffect
  const isBoostingRef = useRef(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates and physics
    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let currentAngle = -45; // Start pointing top-right
    let targetAngle = -45;
    let speed = 0;
    let hasMoved = false;

    // Rocket exhaust particle system
    const particles = [];

    class ExhaustParticle {
      constructor(x, y, angleRad, boost) {
        // Spawn right at the rocket's twin engine exhaust
        const offsetDist = 18;
        this.x = x - Math.sin(angleRad) * offsetDist + (Math.random() - 0.5) * 8;
        this.y = y + Math.cos(angleRad) * offsetDist + (Math.random() - 0.5) * 8;

        // Eject backwards relative to heading
        const ejectAngle = angleRad + Math.PI / 2 + (Math.random() - 0.5) * 0.5;
        const velocity = boost ? Math.random() * 5 + 3.5 : Math.random() * 2.8 + 1.2;
        this.vx = Math.cos(ejectAngle) * velocity;
        this.vy = Math.sin(ejectAngle) * velocity;

        this.size = boost ? Math.random() * 1.6 + 0.8 : Math.random() * 1.0 + 0.5;
        this.life = 1;
        this.decay = boost ? 0.05 : 0.06;

        // Clean tech sparks
        const colors = [
          'rgba(0, 242, 254, ',   // Cyan plasma
          'rgba(255, 179, 71, ',  // Golden amber
          'rgba(255, 255, 255, '  // White spark
        ];
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.92;
        this.vy *= 0.92;
        this.size *= 0.90;
        this.life -= this.decay;
      }

      draw(c) {
        if (this.life <= 0) return;
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, Math.max(this.size, 0.4), 0, Math.PI * 2);
        c.fillStyle = `${this.colorPrefix}${this.life.toFixed(2)})`;
        c.fill();
        c.restore();
      }
    }

    let lastMoveTime = Date.now();
    let animId;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (hasMoved) {
        // Smooth lerp movement towards actual mouse position
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        currentX += dx * 0.38;
        currentY += dy * 0.38;
        speed = Math.sqrt(dx * dx + dy * dy);

        // Turn the rocket in the direction of motion!
        if (speed > 1.2) {
          lastMoveTime = Date.now();
          targetAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        } else if (Date.now() - lastMoveTime > 1000) {
          // Gently return to idle flight posture
          targetAngle = -45;
        }

        // Smooth angle rotation with 360 wrap
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff < -180) angleDiff += 360;
        while (angleDiff > 180) angleDiff -= 360;
        currentAngle += angleDiff * 0.22;

        const angleRad = (currentAngle * Math.PI) / 180;
        const boost = isBoostingRef.current;

        // Subtle formal exhaust micro-spark (no bubble trail)
        if (speed > 2.2 || boost) {
          const spawnCount = boost ? 2 : (Math.random() < 0.4 ? 1 : 0);
          for (let i = 0; i < spawnCount; i++) {
            particles.push(new ExhaustParticle(currentX, currentY, angleRad, boost));
          }
        }

        // Update and draw existing particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.update();
          p.draw(ctx);
          if (p.life <= 0) particles.splice(i, 1);
        }

        // Update rocket element position & rotation
        if (rocketRef.current) {
          rocketRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${currentAngle}deg)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Mouse listeners
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        currentX = e.clientX;
        currentY = e.clientY;
        setIsActive(true);
        document.body.classList.add('has-custom-cursor');
      }
    };

    const handleMouseDown = () => {
      isBoostingRef.current = true;
      sounds.playClick();
      // Burst 3 subtle sparks instead of 15 bubbles
      const angleRad = (currentAngle * Math.PI) / 180;
      for (let i = 0; i < 3; i++) {
        particles.push(new ExhaustParticle(currentX, currentY, angleRad, true));
      }
    };

    const handleMouseUp = () => {
      isBoostingRef.current = false;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'button, a, input, select, textarea, [role="button"], .interactive, .event-card-wrapper, .day-tab-btn, .ws-enroll-btn, .category-tab-btn'
      );
      if (target) {
        setIsHovered(true);
        isHoveredRef.current = true;
        const tag = target.getAttribute('data-cursor-text') || 'ENGAGE';
        setHoverText(tag);
      } else {
        setIsHovered(false);
        isHoveredRef.current = false;
        setHoverText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []); // Run ONCE on mount

  return (
    <>
      {/* Canvas for rocket thruster flame & particle smoke trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999998,
        }}
      />

      {/* Cyber Rocket / Starship Cursor */}
      <div
        ref={rocketRef}
        className={`cyber-rocket-cursor ${isActive ? 'is-visible' : ''} ${isHovered ? 'hover-target' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          display: isActive ? 'block' : 'none',
        }}
      >
        <div className="rocket-sprite">
          {/* High-Definition Cyber Starship / Rocket SVG */}
          <svg
            width="42"
            height="42"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: 'translate(-50%, -50%)',
              filter: 'drop-shadow(0 0 8px #00f2fe) drop-shadow(0 0 16px rgba(255, 120, 0, 0.7))',
            }}
          >
            {/* Animated twin thruster flames */}
            <path
              className="rocket-flame-left"
              d="M20 37 L21.5 46 L23 37 Z"
              fill="#ff5500"
            />
            <path
              className="rocket-flame-right"
              d="M25 37 L26.5 46 L28 37 Z"
              fill="#ff9900"
            />
            <path
              className="rocket-flame-core"
              d="M22.5 37 L24 43 L25.5 37 Z"
              fill="#00f2fe"
            />

            {/* Swept delta wings */}
            <path
              d="M10 30 L17 18 L18 36 L8 39 Z"
              fill="#0c1833"
              stroke="#00f2fe"
              strokeWidth="1.8"
            />
            <path
              d="M38 30 L31 18 L30 36 L40 39 Z"
              fill="#0c1833"
              stroke="#00f2fe"
              strokeWidth="1.8"
            />

            {/* Wingtip glowing lasers */}
            <circle cx="8" cy="39" r="1.8" fill="#ffb347" />
            <circle cx="40" cy="39" r="1.8" fill="#ffb347" />

            {/* Fuselage / Rocket body */}
            <path
              d="M24 2 C20 10 17 20 17 36 L24 38 L31 36 C31 20 28 10 24 2 Z"
              fill="url(#fuselageGrad)"
              stroke="#00f2fe"
              strokeWidth="2"
            />

            {/* Glowing Cockpit Glass */}
            <path
              d="M24 8 C22.5 13 22 17 22 21 L26 21 C26 17 25.5 13 24 8 Z"
              fill="#00f2fe"
              opacity="0.95"
            />

            {/* Center Neon Racing Stripe */}
            <line x1="24" y1="22" x2="24" y2="34" stroke="#ffb347" strokeWidth="2" />

            {/* Gradients */}
            <defs>
              <linearGradient id="fuselageGrad" x1="17" y1="2" x2="31" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" />
                <stop offset="0.3" stopColor="#13274f" />
                <stop offset="1" stopColor="#060c1c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Hover Target Reticle */}
          {isHovered && (
            <div className="rocket-target-reticle">
              <span className="reticle-bracket tl" />
              <span className="reticle-bracket tr" />
              <span className="reticle-bracket bl" />
              <span className="reticle-bracket br" />
            </div>
          )}

          {/* Tooltip Tag */}
          {hoverText && (
            <div className="rocket-hud-tooltip">
              <span>{hoverText}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
