import { useEffect, useRef } from 'react';
import './About.css';

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Integrity',
    desc: 'We operate with transparency, honesty and the highest ethical standards in every engagement.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Reliability',
    desc: 'Our clients trust us to deliver on time, every time — no matter the complexity of the operation.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Excellence',
    desc: 'We set the benchmark for maritime services quality across Nigeria and the West African sub-region.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Partnership',
    desc: 'We build lasting relationships with clients, treating every vessel and cargo as our own responsibility.'
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container about__inner">
        {/* Image Column */}
        <div className="about__image-col fade-in-left">
          <div className="about__image-wrapper">
            <img src="/about-team.png" alt="Dockworth maritime operations team" className="about__image" />
            <div className="about__image-badge">
              <span className="about__badge-number">25+</span>
              <span className="about__badge-label">Years of Maritime Excellence</span>
            </div>
            <div className="about__image-accent" />
          </div>
        </div>

        {/* Text Column */}
        <div className="about__text-col">
          <div className="fade-in">
            <span className="section-label">About Us</span>
            <div className="gold-divider" />
            <h2 className="section-title">
              Nigeria's Trusted Maritime <span className="about__title-accent">Services Partner</span>
            </h2>
          </div>

          <p className="about__lead fade-in">
            Dockworth Services International Limited is a private limited liability company incorporated
            in Nigeria and wholly owned by Nigerians. We carry out maritime and allied business across
            Nigeria and the West African sub-region with an unwavering commitment to excellence.
          </p>

          <p className="about__body fade-in">
            Established over two decades ago, we have grown to become one of the region's most dependable
            maritime service providers. Our team of seasoned professionals brings deep industry expertise,
            strong regulatory relationships with NIMASA and other port authorities, and an operational
            network spanning Nigeria's major port corridors.
          </p>

          <div className="about__mission fade-in">
            <div className="about__mission-item">
              <h4 className="about__mission-title">Our Mission</h4>
              <p className="about__mission-text">
                To provide exceptional maritime services that empower shipping companies, offshore operators,
                and cargo owners to operate efficiently and confidently across West African waters.
              </p>
            </div>
            <div className="about__mission-item">
              <h4 className="about__mission-title">Our Vision</h4>
              <p className="about__mission-text">
                To be the leading integrated maritime services company in West Africa, recognised for
                innovation, reliability and deep regional expertise.
              </p>
            </div>
          </div>

          {/* Values grid */}
          <div className="about__values">
            {values.map((v, i) => (
              <div key={v.title} className="about__value fade-in" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="about__value-icon">{v.icon}</div>
                <div>
                  <h5 className="about__value-title">{v.title}</h5>
                  <p className="about__value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
