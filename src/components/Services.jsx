import { useEffect, useRef, useState } from 'react';
import './Services.css';
import marineImg from '../assets/MARINE SERVICES.png';
import engineeringImg from '../assets/ENGINEERING SERVICES.png';
import fabricationImg from '../assets/FABRICATIONCONSTRUCTION  SERVICES.png';
import inspectionImg from '../assets/INSPECTION & ASSET INTERGRITY SERVICES.png';
import assetImg from '../assets/ASSET INTEGRITY MANAGEMENT.png';
import safetyImg from '../assets/SAFETY STUDIES.png';

const services = [
  {
    id: 'marine',
    image: marineImg,
    title: 'Marine Services',
    shortDesc: 'Comprehensive marine operations across Nigerian and West African waters.',
    highlights: [
      'Stevedoring Services',
      'Marine Logistics Services',
      'Offshore Support Services',
      'Port Management',
      'Manpower Supply & Crew Management',
      'Underwater Survey, Inspection & Maintenance',
      'Heavy Duty Equipment Supply, Operations & Maintenance',
      'Marine Consultancy Services',
    ],
  },
  {
    id: 'engineering',
    image: engineeringImg,
    shortDesc: 'End-to-end engineering design and studies for onshore, offshore and deepwater.',
    highlights: [
      'Conceptual Design & Documentation',
      'FEED, DED & Desktop Engineering Studies',
      'Pipeline & Follow-on Engineering',
      'Production, Process & Equipment Conditioning',
      'Fitness for Service (FFS)',
      'Process & Plant Optimization',
      'ICSS Design & FAT Inspection',
      'Dynamic & Steady State Process Simulations',
      'LNG & FLNG Production Systems Design',
      'Production Systems Integration & Reliability',
    ],
  },
  {
    id: 'fabrication',
    image: fabricationImg,
    shortDesc: 'Structural fabrication and construction for marine and industrial facilities.',
    highlights: [
      'Pipeline, Topsides & Hull Side Units',
      'Consoles & Skips',
      'Pressure Vessels & Storage Tanks',
      'Separators & Scrubber Units',
      'LPG Tankers',
      'Landing Jetties',
      'Petroleum Depots',
      'Cooling Units & Towers',
    ],
  },
  {
    id: 'inspection',
    image: inspectionImg,
    shortDesc: 'Full-spectrum NDT and inspection services for critical assets.',
    highlights: [
      'Radiographic Testing (RT)',
      'Ultrasonic Testing (UT) & Thickness Gauging',
      'Magnetic Particle Testing (MT)',
      'Liquid Penetrant Testing (LPT)',
      'Vacuum Box Testing',
      'Third Party & QA/QC Inspection',
      'Welding Inspection',
      'ASNT Level III Consultancy',
      'Corrosion Monitoring & Pipeline Inspection',
    ],
  },
  {
    id: 'asset-integrity',
    image: assetImg,
    shortDesc: 'Risk-based systems to protect and optimise asset performance.',
    highlights: [
      'Risk-Based Inspection',
      'Pipeline Integrity Management System',
      'Structural Integrity Management',
      'Pressurized Equipment Management',
      'Inspection Scheduling Management',
      'Asset Performance Management',
      'Safety Integrity Level (SIS/SIL)',
      'Reliability-Centered Maintenance',
      'Corrosion Management Plan & Risk Assessment',
    ],
  },
  {
    id: 'safety',
    image: safetyImg,
    shortDesc: 'Comprehensive HSE studies and risk assessments for safe operations.',
    highlights: [
      'HAZID & HAZOP',
      'RCFA, C&E Analysis, SIS/SIL',
      'Simultaneous Operations (SIMOPs)',
      'Bow-tie & ALARP Demonstration',
      'Fire & Explosion Risk Assessment',
      'Fire & Gas Mapping Studies',
      'Emergency Systems Survivability Analysis',
      'Evacuation, Escape & Rescue Analysis',
      'Hazardous Area Classification',
      'Basic & Advanced HSE Trainings',
    ],
  },
];

const VISIBLE_COUNT = 4;

export default function Services() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="section section--gray services" ref={sectionRef}>
      <div className="container">
        <div className="services__header text-center fade-in">
          <span className="section-label">What We Offer</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Integrated maritime, engineering and safety services delivered with precision
            and deep regional expertise across West Africa.
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, i) => {
            const isExpanded = expanded[service.id];
            const visibleHighlights = isExpanded
              ? service.highlights
              : service.highlights.slice(0, VISIBLE_COUNT);
            return (
              <div
                key={service.id}
                id={`service-${service.id}`}
                className="service-card fade-in"
                style={{ transitionDelay: `${(i % 3) * 100}ms`, '--card-index': i }}
              >
                <div className="service-card__image">
                  {service.image ? (
                    <img src={service.image} alt={service.title} />
                  ) : (
                    <div className="service-card__image-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <path d="M21 15l-5-5L5 21"/>
                      </svg>
                      <span>Add Image</span>
                    </div>
                  )}
                </div>
                <div className="service-card__body">
                  <h3 className="service-card__title">{service.title}</h3>
                  <p className="service-card__short">{service.shortDesc}</p>
                  <ul className="service-card__highlights">
                    {visibleHighlights.map(h => (
                      <li key={h} className="service-card__highlight">
                        <svg className="service-card__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {service.highlights.length > VISIBLE_COUNT && (
                    <button className="service-card__readmore" onClick={() => toggle(service.id)}>
                      {isExpanded ? 'Show Less ↑' : `+${service.highlights.length - VISIBLE_COUNT} more ↓`}
                    </button>
                  )}
                  <div className="service-card__footer">
                    <a
                      href="#contact"
                      className="service-card__link"
                      onClick={e => {
                        e.preventDefault();
                        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                    >
                      Enquire Now
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
