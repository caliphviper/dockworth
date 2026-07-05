import { useEffect, useRef } from 'react';
import './History.css';

const projects = [
  { sn: 1,  year: 2025, title: 'Resolution of Entanglement of Mooring hawser Pickup Line and Export Hose at ERHA', client: 'ESSO',            status: 'Completed' },
  { sn: 2,  year: 2020, title: 'Port development Project, Baro, Niger State.',                                    client: 'NPA',             status: 'On-going' },
  { sn: 3,  year: 2018, title: 'Manpower Supply Services',                                                        client: 'NPA',             status: 'On-going' },
  { sn: 4,  year: 2013, title: 'Provision of Dock Labour Services',                                               client: 'MOBIL',           status: 'On-going' },
  { sn: 5,  year: 2013, title: 'Provision of Dock Labour Services',                                               client: 'WAPS',            status: 'Completed' },
  { sn: 6,  year: 2010, title: 'Provision of Dock Labour Services',                                               client: 'TIGER SHIPPING',  status: 'Completed' },
  { sn: 7,  year: 2013, title: 'Provision of Dock Labour Services',                                               client: 'TIGER SHIPPING',  status: 'Completed' },
  { sn: 8,  year: 2013, title: 'Provision of Dock Labour Services',                                               client: 'SHIP & SHORE',    status: 'Completed' },
  { sn: 9,  year: 2008, title: 'Provision of Dock Labour Services',                                               client: 'ORION MARINE',    status: 'Completed' },
  { sn: 10, year: 2005, title: 'Provision of Dock Labour Services',                                               client: 'ADDAX PETROLEUM', status: 'Completed' },
  { sn: 11, year: 2005, title: 'Provision of Dock Labour Services',                                               client: 'ECO MARINE',      status: 'Completed' },
  { sn: 12, year: 2005, title: 'SBM Maintenance',                                                                 client: 'OANDO',           status: 'Completed' },
  { sn: 13, year: 2003, title: 'Provision of Dock Labour Services',                                               client: 'NIPCO/PMAN',      status: 'Completed' },
];

export default function History() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.timeline-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 100);
          });
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="history" className="section history" ref={sectionRef}>
      <div className="container">
        <div className="history__header text-center">
          <span className="section-label">Our Journey</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">History of Operation</h2>
          <h3 className="section-subtitle" style={{fontWeight:700, color:'var(--color-navy)'}}>Projects History</h3>
          <p className="section-subtitle">
            Over two decades of building trust, expanding capabilities and delivering excellence across West African waters.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline__line" />
          {projects.map((p, i) => (
            <div key={p.sn} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
              <div className="timeline-item__content">
                <span className="timeline-item__year">{p.year}</span>
                <h3 className="timeline-item__title">{p.title}</h3>
                <div className="timeline-item__meta">
                  <span className="ph-badge ph-badge--client">{p.client}</span>
                  <span className={`ph-badge ph-badge--${p.status === 'On-going' ? 'ongoing' : 'completed'}`}>{p.status}</span>
                </div>
              </div>
              <div className="timeline-item__dot">
                <div className="timeline-item__dot-inner" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
