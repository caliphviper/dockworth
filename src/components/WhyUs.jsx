import { useEffect, useRef } from 'react';
import './WhyUs.css';

const reasons = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Deep Local Expertise',
    desc: 'Unrivalled knowledge of Nigerian port regulations, NIMASA requirements, NPA procedures and the unique operational landscape of West African maritime trade.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: '24/7 Operational Support',
    desc: 'Ships don\'t operate 9-to-5, and neither do we. Our operations team is available around the clock to handle vessel calls, emergencies and time-critical cargo movements.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Experienced Team',
    desc: 'Our senior staff bring decades of maritime industry experience spanning port operations, ship management, customs brokerage and offshore logistics.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Modern Technology',
    desc: 'Real-time cargo tracking, digital documentation and online reporting portals keep our clients informed at every step of the operation.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Fully Compliant',
    desc: 'We maintain full compliance with NIMASA, NPA, Nigerian Customs Service and all applicable international maritime regulations, giving clients complete peace of mind.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'On-Time Delivery',
    desc: 'We understand that time is money in maritime operations. Our track record of punctual service delivery minimises port stay and keeps your schedule on target.',
  },
];

export default function WhyUs() {
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

  return (
    <section id="why-us" className="section section--navy-mid why-us" ref={sectionRef}>
      <div className="why-us__pattern" />
      <div className="container">
        <div className="why-us__header text-center fade-in">
          <span className="section-label">Our Advantage</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title section-title--light">Why Choose Dockworth?</h2>
          <p className="section-subtitle section-subtitle--light">
            What sets us apart in Nigeria's competitive maritime services landscape.
          </p>
        </div>

        <div className="why-us__grid">
          {reasons.map((r, i) => (
            <div key={r.title} className="why-card fade-in" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
              <div className="why-card__icon">{r.icon}</div>
              <h3 className="why-card__title">{r.title}</h3>
              <p className="why-card__desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
