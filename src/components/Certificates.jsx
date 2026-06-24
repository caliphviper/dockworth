import { useEffect, useRef, useState } from 'react';
import './Certificates.css';
import cert1 from '../assets/certificate 1.png';
import cert2 from '../assets/certificate 2.png';
import cert3 from '../assets/certificate 3.png';
import cert4 from '../assets/certificate 4.png';
import cert5 from '../assets/certificate 5.png';
import cert6 from '../assets/certificate 6.png';

const certificates = [
  { id: 1, image: cert1, label: 'Certificate 1' },
  { id: 2, image: cert2, label: 'Certificate 2' },
  { id: 3, image: cert3, label: 'Certificate 3' },
  { id: 4, image: cert4, label: 'Certificate 4' },
  { id: 5, image: cert5, label: 'Certificate 5' },
  { id: 6, image: cert6, label: 'Certificate 6' },
];

export default function Certificates() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.cert-card').forEach((el, i) => {
              setTimeout(() => el.classList.add('cert-card--visible'), i * 120);
            });
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

  useEffect(() => {
    const handleKey = e => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const prev = () => setLightbox(c => certificates[(c.id - 2 + certificates.length) % certificates.length]);
  const next = () => setLightbox(c => certificates[c.id % certificates.length]);

  return (
    <section id="certificates" className="section certificates" ref={sectionRef}>
      <div className="container">
        <div className="certificates__header text-center fade-in">
          <span className="section-label">Accreditation</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Certificates &amp; Permits</h2>
          <p className="section-subtitle">
            Our operations are backed by the full complement of regulatory certifications,
            licences and permits required to operate across Nigerian and West African waters.
          </p>
        </div>

        <div className="certificates__grid">
          {certificates.map((cert, i) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{ '--i': i }}
              onClick={() => setLightbox(cert)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setLightbox(cert)}
              aria-label={`View ${cert.label}`}
            >
              <div className="cert-card__inner">
                {/* Decorative corner accents */}
                <span className="cert-card__corner cert-card__corner--tl" />
                <span className="cert-card__corner cert-card__corner--tr" />
                <span className="cert-card__corner cert-card__corner--bl" />
                <span className="cert-card__corner cert-card__corner--br" />

                <div className="cert-card__image-wrap">
                  <img src={cert.image} alt={cert.label} className="cert-card__image" />
                  <div className="cert-card__overlay">
                    <div className="cert-card__overlay-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </div>
                    <span className="cert-card__overlay-text">View Certificate</span>
                  </div>
                </div>

                <div className="cert-card__footer">
                  <div className="cert-card__badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    Verified
                  </div>
                  <span className="cert-card__num">0{cert.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <button className="cert-lightbox__close" onClick={() => setLightbox(null)} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <button className="cert-lightbox__nav cert-lightbox__nav--prev" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">&#8249;</button>
          <button className="cert-lightbox__nav cert-lightbox__nav--next" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">&#8250;</button>
          <div className="cert-lightbox__content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.label} />
            <p className="cert-lightbox__caption">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              {lightbox.label} &mdash; Dockworth Services International Ltd.
            </p>
          </div>
          <div className="cert-lightbox__dots">
            {certificates.map(c => (
              <button
                key={c.id}
                className={`cert-lightbox__dot${c.id === lightbox.id ? ' cert-lightbox__dot--active' : ''}`}
                onClick={e => { e.stopPropagation(); setLightbox(c); }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
