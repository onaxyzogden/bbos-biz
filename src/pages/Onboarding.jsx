import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Kanban, Wallet, Users, Building2, Shield, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useSettingsStore } from '../store/settings-store';
import { genUserId } from '../services/id';
import { MODULES } from '../data/modules';
import '../styles/landing.css';

const ICON_MAP = { Kanban, Wallet, Users, Building2, Shield };

const steps = ['Profile', 'Modules', 'Values'];

export default function Onboarding() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const setValuesLayer = useSettingsStore((s) => s.setValuesLayer);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [selectedModules, setSelectedModules] = useState(['work']);
  const [values, setValues] = useState('islamic');

  const toggleModule = (id) => {
    setSelectedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const canNext = step === 0 ? name.trim().length > 0 : true;

  const finish = () => {
    login({
      id: genUserId(),
      name: name.trim(),
      org: org.trim(),
      modules: selectedModules,
      valuesLayer: values,
      createdAt: new Date().toISOString(),
    });
    setValuesLayer(values);
    navigate('/app/work');
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 'var(--space-6)',
    }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
        width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Progress */}
        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
          {steps.map((s, i) => (
            <div key={s} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? 'var(--primary)' : 'var(--bg4)',
              transition: 'background var(--duration) var(--ease)',
            }} />
          ))}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)' }}>
          Step {step + 1} of {steps.length}
        </p>

        {/* Step 0: Profile */}
        {step === 0 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Welcome to BBOS</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)' }}>Tell us about yourself.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--text2)' }}>
                  Your Name *
                </label>
                <input
                  type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" autoFocus
                  style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--text2)' }}>
                  Organization (optional)
                </label>
                <input
                  type="text" value={org} onChange={(e) => setOrg(e.target.value)}
                  placeholder="Your company or team name"
                  style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius)' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Modules */}
        {step === 1 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Choose your modules</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)' }}>Select the areas you want to manage. You can change this later.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {MODULES.map((mod) => {
                const Icon = ICON_MAP[mod.icon];
                const selected = selectedModules.includes(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                      padding: 'var(--space-4)',
                      background: selected ? 'var(--primary-bg)' : 'var(--bg)',
                      border: `1px solid ${selected ? 'var(--primary-border)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius)', cursor: 'pointer',
                      transition: 'all var(--duration) var(--ease)', textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-sm)',
                      background: selected ? 'var(--primary-bg2)' : 'var(--bg3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {Icon && <Icon size={20} style={{ color: mod.color }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                        {mod.name}
                        {!mod.ready && <span style={{ fontSize: '0.7rem', color: 'var(--text3)', marginLeft: 'var(--space-2)', fontWeight: 400 }}>Coming Soon</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{mod.description}</div>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: 'var(--radius-xs)',
                      border: `2px solid ${selected ? 'var(--primary)' : 'var(--border2)'}`,
                      background: selected ? 'var(--primary)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all var(--duration) var(--ease)', flexShrink: 0,
                    }}>
                      {selected && <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Values */}
        {step === 2 && (
          <div className="fade-in">
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Choose your path</h2>
            <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)' }}>
              BBOS offers two framing layers. Both have identical business tools.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { id: 'islamic', title: 'Path A: Islamic Governance', desc: 'Divine attributes, duas, spiritual readiness checks, and Islamic ethical framework guiding every business decision.', icon: <Moon size={20} /> },
                { id: 'universal', title: 'Path B: Universal Ethics', desc: 'The same operational excellence principles expressed in universal language — stewardship, integrity, and purpose.', icon: <Sun size={20} /> },
              ].map((path) => (
                <button
                  key={path.id}
                  onClick={() => setValues(path.id)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                    padding: 'var(--space-5)',
                    background: values === path.id ? 'var(--primary-bg)' : 'var(--bg)',
                    border: `1px solid ${values === path.id ? 'var(--primary-border)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)', cursor: 'pointer',
                    transition: 'all var(--duration) var(--ease)', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 'var(--radius)',
                    background: values === path.id ? 'var(--primary-bg2)' : 'var(--bg3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: values === path.id ? 'var(--primary)' : 'var(--text3)',
                    flexShrink: 0,
                  }}>
                    {path.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>{path.title}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{path.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 'var(--space-8)', gap: 'var(--space-3)',
        }}>
          {step > 0 ? (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {step < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)} disabled={!canNext}>
              Continue <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={finish}>
              Launch BBOS <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
