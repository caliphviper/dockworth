import { useEffect, useRef } from 'react';
import './Scope.css';

const regions = [
  { name: 'Lagos', ports: ['Apapa Port Complex', 'Tin Can Island Port', 'Lekki Deep Sea Port'], flag: '🇳🇬', primary: true },
  { name: 'Port Harcourt', ports: ['Old Port (PHC)', 'Onne Port & Free Zone', 'Bonny Terminal'], flag: '🇳🇬', primary: true },
  { name: 'Warri / Delta', ports: ['Warri Port', 'Sapele Port', 'Koko Port'], flag: '🇳🇬', primary: true },
  { name: 'Ghana', ports: ['Tema Port', 'Takoradi Port', 'Offshore Terminals'], flag: '🇬🇭', primary: false },
  { name: "Côte d'Ivoire", ports: ['Port of Abidjan', 'San-Pédro Port'], flag: '🇨🇮', primary: false },
  { name: 'Cameroon', ports: ['Port of Douala', 'Kribi Deep Sea Port'], flag: '🇨🇲', primary: false },
];

const capabilities = [
  'Vessel clearance at all NIMASA-registered ports',
  'Offshore terminal operations in the Niger Delta',
  'Onne Free Zone logistics handling',
  'Cross-border freight across ECOWAS corridors',
  'Multilingual operations team (English, French, Yoruba, Hausa, Igbo)',
  'NIMASA, NPA and Nigerian Customs liaison nationwide',
];

export default function Scope() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="scope" className="section section--dark scope" ref={sectionRef}>
      <div className="scope__bg" />
      <div className="container scope__inner">
        {/* Header */}
        <div className="scope__header text-center fade-in">
          <span className="section-label">Coverage</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title section-title--light">Scope of Operations</h2>
          <p className="section-subtitle section-subtitle--light">
            Operating across Nigeria's major port corridors and extending throughout the West African sub-region.
          </p>
        </div>

        <div className="scope__content">
          {/* Regions Grid */}
          <div className="scope__regions fade-in-left">
            <h3 className="scope__regions-title">Our Active Regions</h3>
            <div className="scope__regions-grid">
              {regions.map(r => (
                <div key={r.name} className={`scope__region ${r.primary ? 'scope__region--primary' : ''}`}>
                  <div className="scope__region-header">
                    <span className="scope__region-flag">{r.flag}</span>
                    <div>
                      <span className="scope__region-name">{r.name}</span>
                      {r.primary && <span className="scope__region-badge">Primary Hub</span>}
                    </div>
                  </div>
                  <ul className="scope__region-ports">
                    {r.ports.map(p => (
                      <li key={p} className="scope__region-port">
                        <span className="scope__port-dot" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="scope__capabilities fade-in-right">
            <h3 className="scope__cap-title">Operational Capabilities</h3>
            <p className="scope__cap-intro">
              Our deep regional presence enables us to navigate complex regulatory environments,
              multilingual trade corridors and time-sensitive maritime operations with confidence.
            </p>
            <ul className="scope__cap-list">
              {capabilities.map(c => (
                <li key={c} className="scope__cap-item">
                  <div className="scope__cap-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  {c}
                </li>
              ))}
            </ul>

            <div className="scope__cta-box">
              <p>Operating in a port not listed? Get in touch — we have partner networks across the continent.</p>
              <a
                href="#contact"
                className="btn btn--primary"
                onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
