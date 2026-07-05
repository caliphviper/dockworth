import { useEffect, useRef, useState, useCallback } from 'react';
import './Clients.css';
import client1 from '../assets/client 1.png';
import client2 from '../assets/client 2.png';
import client3 from '../assets/client 3.png';
import client4 from '../assets/client 4.png';
import client5 from '../assets/client 5.png';
import client6 from '../assets/client 6.png';
import client7 from '../assets/client 7.png';
import client8 from '../assets/client 8.png';
import client9 from '../assets/client 9.png';

const clientLogos = [
  { id: 1, logo: client1 },
  { id: 2, logo: client2 },
  { id: 3, logo: client3 },
  { id: 4, logo: client4 },
  { id: 5, logo: client5 },
  { id: 6, logo: client6 },
  { id: 7, logo: client7 },
  { id: 8, logo: client8 },
  { id: 9, logo: client9 },
];

const testimonials = [
  {
    id: 'test1',
    quote: "Dockworth has been our trusted port agent in Nigeria for over eight years. Their team's knowledge of local regulations and ability to resolve challenges quickly is unmatched.",
    author: 'Vessel Operations Manager',
    company: 'International Shipping Line',
    initial: 'I',
    color: '#1B4F8A',
  },
  {
    id: 'test2',
    quote: "From ship chandling to customs clearance, Dockworth handles everything seamlessly. We never worry about our vessels in Nigerian ports because we know Dockworth is on the ground.",
    author: 'Fleet Manager',
    company: 'West African Tanker Company',
    initial: 'W',
    color: '#2E86AB',
  },
  {
    id: 'test3',
    quote: "Their offshore support services have been critical to our upstream operations. They understand the urgency of offshore logistics and always deliver — even in difficult conditions.",
    author: 'Logistics Director',
    company: 'Offshore Drilling Operator',
    initial: 'O',
    color: '#07b0c0',
  },
];

const marqueeTrack = [...clientLogos, ...clientLogos];

export default function Clients() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % testimonials.length), []);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mq.matches);
    const handler = e => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [isMobile, next]);

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

  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const cards = testimonials.map((t, i) => (
    <div key={t.id} id={t.id} className="testimonial-card fade-in" style={{ transitionDelay: `${i * 120}ms` }}>
      <div className="testimonial-card__quote-mark">"</div>
      <p className="testimonial-card__text">{t.quote}</p>
      <div className="testimonial-card__author">
        <div className="testimonial-card__avatar" style={{ background: t.color }}>
          {t.initial}
        </div>
        <div>
          <div className="testimonial-card__name">{t.author}</div>
          <div className="testimonial-card__company">{t.company}</div>
        </div>
      </div>
      <div className="testimonial-card__stars">
        {'★★★★★'.split('').map((s, j) => <span key={j}>{s}</span>)}
      </div>
    </div>
  ));

  return (
    <section id="clients" className="section clients" ref={sectionRef}>
      <div className="container">
        <div className="clients__header text-center fade-in">
          <span className="section-label">Our Clients</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Trusted by Industry Leaders</h2>
          <p className="section-subtitle">
            We serve a diverse range of maritime clients from multinational shipping lines to local operators with the same commitment to excellence.
          </p>
        </div>
      </div>

      {/* Client Logos Marquee */}
      <div className="clients__marquee-wrapper fade-in">
        <div className="clients__marquee">
          <div className="clients__marquee-track">
            {marqueeTrack.map((c, i) => (
              <div key={i} className="clients__logo-card">
                <img src={c.logo} alt={`Client ${c.id}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </section>
  );
}
