import { useThresholdStore } from '../store/threshold-store';
import CeremonyGate from '../components/islamic/CeremonyGate';
import { Search, Play, ScrollText, Scale, Sparkles, ArrowRight } from 'lucide-react';
import './IslamicKnowledgePage.css';

const HERO_BG_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC06kViVsyq1707fg7rNa4o_W0pD5iQkkptmL82hMTdZOZ2aKRNjo-QYB1JvE14QlLQy9yz9ZtSKEe-Ptj3WlxFAZ96sv_cSZnwdU-2k5COB7tTd2SjymgWko45kcvDwSYsk6uQN_DgAJfHi9gIynObYucCa5GOy48Xx301oNYPRN1C7lCjddI5OKikD8WofbUi3xh151Br8c_kCoQ6rylZTE5ubW1ONVhDQxbyIjttXDuCWO7dSzPVie0nAXekImT4GScJMUcdHVc4';

const LEARNING_PATHS = [
  {
    id: 'maqasid',
    title: 'Maqasid al-Sharia',
    desc: 'Understanding the ultimate objectives and higher wisdoms behind divine legislation.',
    Icon: Sparkles,
    progress: 74,
    variant: 'gold',
  },
  {
    id: 'seerah',
    title: 'The Prophetic Seerah',
    desc: 'A detailed chronological journey through the life of the Final Messenger.',
    Icon: ScrollText,
    progress: 32,
    variant: 'teal',
  },
  {
    id: 'fiqh',
    title: 'Principles of Fiqh',
    desc: 'Analyzing the methodology of legal deduction and Islamic jurisprudence.',
    Icon: Scale,
    progress: 58,
    variant: 'tertiary',
  },
];

const ACTIVE_PURSUITS = [
  {
    title: 'Principles of Aqidah',
    desc: 'The foundations of belief and theological discourse.',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8-IeHUnvSKXK7Ok-uRtWtS-NcYYKxZHpRe992wnKb5PBb6cd9_qaD3H1PKlyK3_TIUp-cm1h9hF05yzNSuuOGM7UjQjQx7WoYmj4U5UZ8MMmWECZMKO-zdmBtbVblt2Ne0F4Wh8_MKNNpBQdipAaC590SDo4NEr7DwryLMNOdvGRkyW2Vk2Jk0psovf03Z_bCmUgszucdNLKBvFfDyNdcZwh_0sbvCHWp9AbVdJaLLnNpmFQgSnC8fvHMcUFU_kMPiHOZG3sHrb47',
  },
  {
    title: 'The Umayyad Legacy',
    desc: 'Historical expansion and cultural synthesis of the caliphate.',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCv84tHJ-iP3h9LNO2UcxkiRRRpFHBR2gqvqYeJbrrlLY70LX8d_ZBve82cjYRvbl3OvApoLzuTWak-HO1XEZYRYpiVkgp-qtMPMpknc-X3tjKXKwDowVSAcMlyEQ1zuMiyQy8TegC991ryqo2B2qfQ_vvYlWAAugV4H_ShM3-EksREnx93h2CjbdyALWoqvrxa6fTQUZ7dGU63sd5EYMWEYSNgSNeN0fQuqvUFXTpYBSoAHnaJrS0xvxd6HHsKxX4x-og897WYTxFk',
  },
  {
    title: 'Ethics of Disagreement',
    desc: 'Navigating differences in the Islamic intellectual tradition.',
    thumb:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAmW0B38Qt3diz0KYN0juU5BKey3OEXGlg0E8kIKmej-YeOP5ctwAH7OB7xCDkKr3iTTOyNjmM_UcC_oOb2qaH38I-6XEFRQBQd3ZjEBpXOIIR_60PTo8Bsy1xY-FS5Bb1CmY9A3HYmapl18O3kqjldkLBVnbpMvZgUYaZAA6ECEiF4oe34pDk0Q-oXqn4Dvb7EQAExB6sitzFwLbWkW6byWcadIrKYSXELDytPjiSOwD00OAxhKj8SxjI1nFkO-P_TBHTZS8jZEP_z',
  },
];

const CURATED_BOOKS = [
  {
    title: 'The Decisive Treatise',
    author: 'Ibn Rushd',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-7147bDGEcwNvCEAKLekwrQk2mK_YvmcrtxXRCzGGgkArHHLUcgChu2Pxln9i68eAsNEIx1WwKN9ulB2DagU28FG1pA1qo-swWmQG9Mkp9dXIyhEAIkeE4FdoDtewiDgw97q1gu1CeTjaxui_Vh3cuKnZYjOyVqLQAfuTNikq3ekUPhS1r67PSxJ3U6DbKI6kUaCWQ9OpVcQxsF_Y1lVsU3Fx3uxeH-aDPys4MfBpLSvieVXxmzbHzCoOmyUMY4oJrowa193HIEXX',
  },
  {
    title: 'The Alchemy of Happiness',
    author: 'Imam al-Ghazali',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrNonWLgnsr_Y2rXrsPJRVj_dYXy8b7EhYuOX10XEBbpvs98mIck-xlTQo4FN6_TjfpZui-nyzwlka7P0VxYHT6o8j0pWuTjgZpqEBUtu-9xLBxTKIMlIPSxuFn0QuDGQoHfYQ1TS-bTjMVbgmpaG5Pm7UqCdjiQ7lpt8Gtx4FfmFzPlRnDo4JPUChjQDXf5DJ9f2RapW5hkuNkFyRS2zs9Dj3TRJC5u0UP5kDg3CTuVawILHFZPhJNvNsI6fDiqXmzd9YyvDMuMGN',
  },
  {
    title: 'Philosophy of Islamic Law',
    author: 'Ibrahim al-Shatibi',
    cover:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuYilmz4ri19nNHk4-W2A2XkRtYbAPu5BNlRo07j28zqnx6iw8EpzCUC4IM20C_eTWM2SkBKmqFFf5fU8qiDw9apG96v0LipxBqOAkAYg0kZ2-mDXAAW6YoMv_gKxBsRTQXeG7wYOzQRrmP0Lju7zsYpcncUcrepLqBiiR6gkrMeu0plSb654KwprNrOsLwjAsiMR2siW8GS4N-AVp4XheWidSTLFgtyH00tW6FVghDborS_VxzPrCIeC-s1bg1n45yIJ49maACjOY',
  },
];

export default function IslamicKnowledgePage() {
  const hasCompletedOpening = useThresholdStore(
    (s) => !!s.completedOpening['islamic-knowledge']
  );

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="islamic-knowledge" />;
  }

  return (
    <div className="ik-page font-manrope">
      {/* Sticky Header */}
      <header className="ik-header">
        <div className="ik-header__inner">
          <div className="ik-header__left">
            <span className="ik-header__title">The Sacred Editorial</span>
            <nav className="ik-header__tabs">
              <a className="ik-header__tab" href="#">Maqasid</a>
              <a className="ik-header__tab ik-header__tab--active" href="#">Curations</a>
              <a className="ik-header__tab" href="#">Archives</a>
            </nav>
          </div>
          <div className="ik-header__right">
            <div className="ik-search">
              <Search size={15} className="ik-search__icon" />
              <input
                className="ik-search__input"
                type="text"
                placeholder="Search the Wisdom..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Content Canvas */}
      <div className="ik-canvas">

        {/* Hero: Daily Contemplation */}
        <div
          className="ik-hero"
          style={{ backgroundImage: `url(${HERO_BG_URL})` }}
        >
          <div className="ik-hero__overlay">
            <span className="ik-badge">Daily Contemplation</span>
            <blockquote className="ik-hero__quote">
              "Knowledge is not the abundance of narrations. Knowledge is a light
              that Allah casts into the heart."
            </blockquote>
            <cite className="ik-hero__attr">— Imam Malik ibn Anas</cite>
          </div>
        </div>

        {/* Learning Paths */}
        <section>
          <div className="ik-section-header">
            <div className="ik-section-header__row">
              <h2 className="ik-section-title">Learning Paths</h2>
              <span className="ik-section-subtitle">Core Curriculum</span>
            </div>
            <div className="ik-section-underline" />
          </div>
          <div className="ik-paths-grid">
            {LEARNING_PATHS.map(({ id, title, desc, Icon, progress, variant }) => (
              <div key={id} className={`ik-path-card ik-path-card--${variant}`}>
                <div className="ik-path-card__icon-wrap">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="ik-path-card__title">{title}</h3>
                  <p className="ik-path-card__desc">{desc}</p>
                </div>
                <div className="ik-path-card__footer">
                  <div className="ik-path-card__progress-row">
                    <span className="ik-path-card__progress-label">Progress</span>
                    <span className="ik-path-card__pct">{progress}%</span>
                  </div>
                  <div className="ik-progress-track">
                    <div
                      className={`ik-progress-fill ik-progress-fill--${variant}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Pursuit & Curated Library */}
        <div className="ik-bottom-layout">

          {/* Active Pursuit (5fr) */}
          <div className="ik-pursuit">
            <h2 className="ik-pursuit__title">Active Pursuit</h2>
            <div className="ik-pursuit__underline" />
            <div className="ik-pursuit__list">
              {ACTIVE_PURSUITS.map((item, i) => (
                <div key={i} className="ik-pursuit-item">
                  <div
                    className="ik-pursuit-item__thumb"
                    style={{ backgroundImage: `url(${item.thumb})` }}
                  >
                    <div className="ik-play-btn">
                      <Play size={16} fill="white" strokeWidth={0} />
                    </div>
                  </div>
                  <div className="ik-pursuit-item__info">
                    <p className="ik-pursuit-item__title">{item.title}</p>
                    <p className="ik-pursuit-item__desc">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="ik-pursuit-item__arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Curated Library (7fr) */}
          <div className="ik-library">
            <div className="ik-library__header">
              <h2 className="ik-library__title">Curated Library</h2>
              <a className="ik-library__browse" href="#">
                Expand Collection <ArrowRight size={13} />
              </a>
            </div>
            <div className="ik-library__grid">
              {CURATED_BOOKS.map((book) => (
                <div key={book.title} className="ik-book-card">
                  <div
                    className="ik-book-card__cover"
                    style={{ backgroundImage: `url(${book.cover})` }}
                  />
                  <p className="ik-book-card__title">{book.title}</p>
                  <p className="ik-book-card__author">{book.author}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="ik-footer">
          <span className="ik-footer__brand">The Sacred Editorial</span>
          <span className="ik-footer__copy">Built for the seeker. Guided by Tradition. © 2024</span>
          <div className="ik-footer__links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
          </div>
        </footer>

      </div>
    </div>
  );
}
