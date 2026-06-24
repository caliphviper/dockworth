import { useEffect, useRef } from 'react';
import './History.css';

const milestones = [
  {
    year: '2000',
    title: 'Company Founded',
    desc: 'Dockworth Services International Limited was incorporated in Nigeria as a private limited liability company, wholly owned by Nigerians.',
  },
  {
    year: '2003',
    title: 'First Major Port Agency Contract',
    desc: 'Secured our first major port agency agreement with an international shipping line, establishing our reputation in Lagos Port Complex.',
  },
  {
    year: '2007',
    title: 'Ship Chandling Division Launched',
    desc: 'Expanded operations into ship chandling, offering comprehensive provisions and stores delivery to vessels across Apapa and Tin Can Island ports.',
  },
  {
    year: '2010',
    title: 'West Africa Regional Expansion',
    desc: 'Extended our service network beyond Nigeria, establishing operational partnerships across Ghana, Côte d\'Ivoire and Cameroon.',
  },
  {
    year: '2014',
    title: 'Offshore Support Services',
    desc: 'Launched our offshore logistics division to serve the growing oil and gas sector, providing supply vessel coordination and offshore bunkering.',
  },
  {
    year: '2018',
    title: 'Digital Operations Platform',
    desc: 'Deployed a real-time digital cargo tracking and reporting system, significantly improving transparency and client communication.',
  },
  {
    year: '2022',
    title: '500+ Projects Milestone',
    desc: 'Celebrated the successful completion of over 500 major maritime projects, cementing our position as a regional industry leader.',
  },
  {
    year: '2025',
    title: 'Continued Growth & Innovation',
    desc: 'Ongoing expansion of service capabilities, team and regional coverage as we look ahead to the next chapter of Dockworth\'s journey.',
  },
];

export default function History() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.timeline-item').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="history" className="section history" ref={sectionRef}>
      <div className="container">
        <div className="history__header text-center fade-in">
          <span className="section-label">Our Journey</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">History of Operation</h2>
          <p className="section-subtitle">
            Over two decades of building trust, expanding capabilities and delivering excellence across West African waters.
          </p>
        </div>

        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
              <div className="timeline-item__content">
                <span className="timeline-item__year">{m.year}</span>
                <h3 className="timeline-item__title">{m.title}</h3>
                <p className="timeline-item__desc">{m.desc}</p>
              </div>
              <div className="timeline-item__dot">
                <div className="timeline-item__dot-inner" />
              </div>
            </div>
          ))}
          <div className="timeline__line" />
        </div>
      </div>
    </section>
  );
}
