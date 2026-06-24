import { useRef, useEffect } from 'react';
import './Partners.css';
import logo1 from '../assets/logo 1.png';
import logo2 from '../assets/logo 2.png';
import logo3 from '../assets/logo 3.png';
import logo4 from '../assets/logo 4.png';
import logo5 from '../assets/logo 5.png';

const partners = [
  { id: 1, name: 'Partner 1', logo: logo1 },
  { id: 2, name: 'Partner 2', logo: logo2 },
  { id: 3, name: 'Partner 3', logo: logo3 },
  { id: 4, name: 'Partner 4', logo: logo4 },
  { id: 5, name: 'Partner 5', logo: logo5 },
];

export default function Partners() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
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

  // Duplicate for seamless infinite scroll
  const track = [...partners, ...partners];

  return (
    <section id="partners" className="section partners" ref={sectionRef}>
      <div className="container">
        <div className="partners__header text-center fade-in">
          <span className="section-label">Collaborations</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Strategic Partners</h2>
          <p className="section-subtitle">
            Working alongside world-class organisations to deliver excellence across every operation.
          </p>
        </div>
      </div>

      <div className="partners__marquee-wrapper fade-in">
        <div className="partners__marquee">
          <div className="partners__track">
            {track.map((partner, i) => (
              <div key={i} className="partners__logo-card">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} />
                ) : (
                  <div className="partners__logo-placeholder">
                    <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="1" y="1" width="46" height="22" rx="3"/>
                      <line x1="8" y1="12" x2="40" y2="12" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="24" cy="12" r="4"/>
                    </svg>
                    <span>{partner.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
