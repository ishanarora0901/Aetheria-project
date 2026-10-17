import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEngine';
import { X, Shield, Lock, Mail, User, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sounds.playClick();
    setSuccess(true);
    sounds.playSuccess();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });

    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({ name: name || 'Aetherian Operative', email: email || 'operative@aetheria.fest' });
      }
      setSuccess(false);
      onClose();
    }, 1200);
  };

  const handleDemoLogin = () => {
    setEmail('delegate@iitb.ac.in');
    setName('Aloy Horizon');
    sounds.playClick();
    setSuccess(true);
    sounds.playSuccess();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });

    setTimeout(() => {
      if (onAuthSuccess) {
        onAuthSuccess({ name: 'Aloy Horizon', email: 'delegate@iitb.ac.in' });
      }
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-cyber-window auth-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-deck">
          <div className="modal-title-lockup">
            <Shield size={16} className="cyan-icon" />
            <span className="modal-id-tag">AUTHENTICATION GATEWAY // SEC.01</span>
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

        <div className="auth-card-body">
          {success ? (
            <div className="auth-success-state">
              <CheckCircle2 size={54} className="success-icon" />
              <h3>ACCESS GRANTED</h3>
              <p>Welcome to Aetheria '26 Conclave. Biometric and credential handshake confirmed.</p>
            </div>
          ) : (
            <>
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    sounds.playClick();
                    setMode('login');
                  }}
                >
                  DELEGATE LOGIN
                </button>
                <button
                  className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
                  onClick={() => {
                    sounds.playClick();
                    setMode('signup');
                  }}
                >
                  NEW REGISTRATION
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {mode === 'signup' && (
                  <div className="form-group">
                    <label className="cyber-label">Full Name</label>
                    <div className="input-with-icon">
                      <User size={16} className="field-icon" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Aloy Sobeck"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="cyber-input"
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="cyber-label">University / College Email</label>
                  <div className="input-with-icon">
                    <Mail size={16} className="field-icon" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. delegate@iitb.ac.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="cyber-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="cyber-label">Security Access Key / Password</label>
                  <div className="input-with-icon">
                    <Lock size={16} className="field-icon" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="cyber-input"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cyber-submit-btn auth-submit-btn"
                  data-cursor-text="SUBMIT"
                >
                  <Sparkles size={16} />
                  <span>{mode === 'login' ? 'AUTHORIZE ACCESS' : 'MINT DELEGATE IDENTITY'}</span>
                </button>

                <div className="auth-demo-divider">
                  <span>OR INSTANT BYPASS</span>
                </div>

                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="demo-quick-login-btn"
                  data-cursor-text="1-CLICK DEMO"
                >
                  1-CLICK DEMO DELEGATE PASS
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
