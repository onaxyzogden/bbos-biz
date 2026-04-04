import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Kanban, Wallet, Users, Building2, Shield, Check, ChevronDown, ArrowRight, Star, LogIn, X, Handshake } from 'lucide-react';
import { MODULES } from '../data/modules';
import { useAuthStore } from '../store/auth-store';
import { genUserId } from '../services/id';
import '../styles/landing.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield, Handshake };

const FAQS = [
  { q: 'What is BBOS?', a: 'BBOS (Barakah Business Operating System) is an all-in-one platform to manage your work, finances, team, and operations — built on principles of ethical stewardship, excellence, and honest reckoning.' },
  { q: 'Is BBOS free to use?', a: 'Yes. The Starter plan is free and includes full access to the Work module with unlimited projects. Pro and Enterprise plans unlock additional modules and advanced features.' },
  { q: 'What makes BBOS different from other project management tools?', a: 'BBOS integrates an optional Islamic governance layer alongside modern business tools. It combines project management, finance, HR, and communication in one system — with built-in ethical guardrails.' },
  { q: 'Can I use BBOS without the Islamic layer?', a: 'Absolutely. During onboarding you choose between the Islamic values path and a universal ethics path. The core business tools work identically either way.' },
  { q: 'What modules are available?', a: 'Work (project management and Kanban boards) is available now. Money, People, Office, and Tech modules are coming soon.' },
  { q: 'Can I export my data?', a: 'Yes. All your data can be exported as JSON at any time from Settings. You own your data completely.' },
];

const WORK_FEATURES = [
  { icon: '📋', title: 'Kanban Boards', desc: 'Drag-and-drop task management with customizable columns' },
  { icon: '✅', title: 'Task Management', desc: 'Subtasks, checklists, priorities, due dates, and tags' },
  { icon: '📊', title: 'Multiple Views', desc: 'Switch between board and list views for any project' },
  { icon: '🔍', title: 'Search & Filter', desc: 'Find any task instantly with Cmd+K search and smart filters' },
  { icon: '📱', title: 'Mobile Ready', desc: 'Full responsive design that works on any device' },
  { icon: '🔒', title: 'Privacy First', desc: 'All data stored locally — your information never leaves your device' },
];

export default function Landing() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const login = useAuthStore((s) => s.login);
  const [activeTab, setActiveTab] = useState('work');
  const [openFaq, setOpenFaq] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  const handleLogin = () => {
    if (!loginName.trim()) return;
    login({
      id: genUserId(),
      name: loginName.trim(),
      email: loginEmail.trim(),
      org: '',
      modules: ['work'],
      valuesLayer: 'islamic',
      createdAt: new Date().toISOString(),
    });
    setShowLogin(false);
    navigate('/app');
  };

  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <Link to="/" className="landing-logo">
          <div className="logo-icon">B</div>
          BBOS
        </Link>
        <ul className="landing-nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
        <div className="landing-nav-actions">
          {user ? (
            <Link to="/app" className="btn btn-primary">
              Go to Dashboard <ArrowRight size={16} />
            </Link>
          ) : (
            <>
              <button className="btn btn-ghost" onClick={() => setShowLogin(true)} style={{ fontSize: '0.9rem' }}>
                <LogIn size={16} /> Sign In
              </button>
              <Link to="/get-started" className="btn btn-primary">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="expense-form-overlay" style={{ zIndex: 300 }}>
          <div className="expense-form-modal" style={{ maxWidth: 400 }}>
            <div className="expense-form-header">
              <h3>Sign In to BBOS</h3>
              <button className="expense-form-close" onClick={() => setShowLogin(false)}><X size={18} /></button>
            </div>
            <div className="expense-form-body">
              <div className="expense-form-field">
                <label>Name *</label>
                <input value={loginName} onChange={(e) => setLoginName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                  placeholder="Your name" autoFocus />
              </div>
              <div className="expense-form-field">
                <label>Email (optional)</label>
                <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                  placeholder="you@example.com" />
              </div>
            </div>
            <div className="expense-form-footer">
              <button className="btn btn-ghost" onClick={() => setShowLogin(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleLogin} disabled={!loginName.trim()}
                style={{ opacity: loginName.trim() ? 1 : 0.4 }}>
                Sign In <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="hero-section">
        <div className="hero-badge">
          <Star size={14} /> Barakah Business Operating System
        </div>
        <h1 className="hero-title">
          Run your business with <span className="highlight">clarity and purpose</span>
        </h1>
        <p className="hero-subtitle">
          For <span className="tag">business owners</span>, <span className="tag">operators</span>, and <span className="tag">growing teams</span> who want one system to manage work, money, people, and operations — built on principles of excellence.
        </p>
        <div className="hero-cta">
          <Link to="/get-started" className="btn btn-primary btn-lg">
            Get Started Free <ArrowRight size={18} />
          </Link>
          <a href="#features" className="btn btn-secondary btn-lg">See Features</a>
        </div>
        <div className="hero-modules">
          {MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon];
            return (
              <div key={mod.id} className="hero-module-chip">
                {Icon && <Icon size={16} style={{ color: mod.color }} />}
                {mod.name}
                {!mod.ready && <span style={{ fontSize: '0.7rem', color: 'var(--text3)', fontWeight: 600 }}>SOON</span>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <p className="section-label">Modules</p>
        <h2 className="section-title">Everything your business needs</h2>
        <p className="section-subtitle">
          Five integrated modules to replace the chaos of multiple disconnected tools.
        </p>

        <div className="feature-tabs">
          {MODULES.map((mod) => {
            const Icon = ICON_MAP[mod.icon];
            return (
              <button
                key={mod.id}
                className={`feature-tab ${activeTab === mod.id ? 'active' : ''}`}
                onClick={() => setActiveTab(mod.id)}
              >
                {Icon && <Icon size={16} />} {mod.name}
                {!mod.ready && <span style={{ fontSize: '0.65rem', background: 'var(--bg4)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>Soon</span>}
              </button>
            );
          })}
        </div>

        <div className="feature-content">
          <div className="feature-preview">
            <div className="feature-preview-placeholder">
              {activeTab === 'work'
                ? '[ Kanban Board Preview ]'
                : `[ ${MODULES.find(m => m.id === activeTab)?.name} — Coming Soon ]`
              }
            </div>
          </div>
          <div className="feature-list">
            {activeTab === 'work' ? (
              WORK_FEATURES.map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon" style={{ background: 'var(--primary-bg)', fontSize: '1.2rem' }}>
                    {f.icon}
                  </div>
                  <div>
                    <h4>{f.title}</h4>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))
            ) : (
              MODULES.find(m => m.id === activeTab)?.features.map((f, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon" style={{ background: 'var(--primary-bg)' }}>
                    <Check size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div><h4>{f}</h4><p>Coming soon</p></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <p className="section-label">Pricing</p>
        <h2 className="section-title">Simple, transparent pricing</h2>
        <p className="section-subtitle">Start free. Upgrade when you need more.</p>

        <div className="pricing-cards">
          <div className="pricing-card">
            <div className="plan-name">Starter</div>
            <div className="plan-price">Free</div>
            <div className="plan-desc">Everything you need to get started</div>
            <ul className="pricing-features">
              {['Unlimited projects', 'Kanban boards & list views', 'Subtasks & checklists', 'Search & filters', 'Data export', 'Islamic governance layer'].map((f, i) => (
                <li key={i}><Check size={16} /> {f}</li>
              ))}
            </ul>
            <Link to="/get-started" className="btn btn-primary" style={{ width: '100%' }}>Get Started</Link>
          </div>

          <div className="pricing-card featured">
            <div className="plan-name">Pro</div>
            <div className="plan-price">$19<span>/month</span></div>
            <div className="plan-desc">For growing teams and businesses</div>
            <ul className="pricing-features">
              {['Everything in Starter', 'Money module', 'People module', 'Office module', 'Advanced analytics', 'Priority support'].map((f, i) => (
                <li key={i}><Check size={16} /> {f}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{ width: '100%' }} disabled>Coming Soon</button>
          </div>

          <div className="pricing-card">
            <div className="plan-name">Enterprise</div>
            <div className="plan-price">Custom</div>
            <div className="plan-desc">For organizations with custom needs</div>
            <ul className="pricing-features">
              {['Everything in Pro', 'Tech module', 'Custom integrations', 'White-glove onboarding', 'SLA guarantee', 'Dedicated support'].map((f, i) => (
                <li key={i}><Check size={16} /> {f}</li>
              ))}
            </ul>
            <button className="btn btn-secondary" style={{ width: '100%' }} disabled>Contact Us</button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to run your business with purpose?</h2>
        <p>Join operators who manage their work with clarity, ethics, and excellence.</p>
        <Link to="/get-started" className="btn btn-primary btn-lg">
          Get Started Free <ArrowRight size={18} />
        </Link>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">Frequently asked questions</h2>
        <div style={{ marginTop: 'var(--space-8)' }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-question ${openFaq === i ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                <ChevronDown size={20} />
              </button>
              {openFaq === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="landing-logo" style={{ marginBottom: 'var(--space-3)' }}>
              <div className="logo-icon">B</div>
              BBOS
            </div>
            <p>Barakah Business Operating System.<br />Built with tawakkul.</p>
          </div>
          <div className="footer-col">
            <h6>Product</h6>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h6>Modules</h6>
            <ul>
              {MODULES.map((m) => (
                <li key={m.id}><a href="#features">{m.name}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h6>Resources</h6>
            <ul>
              <li><a href="#faq">Documentation</a></li>
              <li><a href="#faq">Privacy</a></li>
              <li><a href="#faq">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} BBOS. All rights reserved.</span>
          <span>Future of Business. With Purpose.</span>
        </div>
      </footer>
    </div>
  );
}
