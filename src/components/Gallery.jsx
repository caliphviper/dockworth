import { useEffect, useRef, useState } from 'react';
import './Gallery.css';
import newGallery1 from '../assets/New Gallery img 1.PNG';
import newGallery2 from '../assets/New Gallery img 2.PNG';
import newGallery3 from '../assets/New Gallery img 3.png';
import newGallery4 from '../assets/New Gallery img 4.png';

const galleryItems = [
  { src: '/hero-maritime.png',      caption: 'Container operations at Lagos Port',    span: 'wide' },
  { src: '/gallery-offshore.png',   caption: 'Offshore supply vessel operations',      span: 'tall' },
  { src: '/gallery-chandling.png',  caption: 'Ship chandling – loading provisions',    span: 'normal' },
  { src: '/about-team.png',         caption: 'Our operations team at work',            span: 'normal' },
  { src: newGallery1,               caption: 'Maritime operations',                    span: 'wide' },
  { src: newGallery2,               caption: 'Port activities',                        span: 'normal' },
  { src: newGallery3,               caption: 'Offshore operations',                    span: 'tall' },
  { src: newGallery4,               caption: 'Vessel services',                        span: 'normal' },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.gallery-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
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
    const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section id="gallery" className="section section--gray gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery__header text-center fade-in">
          <span className="section-label">Our Operations</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            A glimpse into our daily maritime operations across Nigerian and West African ports.
          </p>
        </div>

        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item gallery-item--${item.span}`}
              onClick={() => setLightbox(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && setLightbox(item)}
              aria-label={`View: ${item.caption}`}
              style={{ '--card-index': i }}
            >
              <img src={item.src} alt={item.caption} className="gallery-item__img" />
              <div className="gallery-item__overlay">
                <div className="gallery-item__overlay-content">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                  <p className="gallery-item__caption">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="gallery__lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Image lightbox"
        >
          <button className="gallery__lightbox-close" aria-label="Close lightbox">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="gallery__lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} />
            <p className="gallery__lightbox-caption">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
