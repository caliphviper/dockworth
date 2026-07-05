import { useEffect, useRef, useState } from 'react';
import './HSEPolicy.css';

const commitments = [
  'Take foremost account of the health, safety and environment of all personnel, others, and property that may be affected during our operations.',
  'Ensure and be committed to providing safe and healthy working conditions for the prevention of work-related injury and ill health.',
  'Ensure HSE policy is communicated to all employees and stakeholders throughout the organisation.',
  'Fulfil legal requirements and eliminate OH&S hazards while reducing associated risks.',
  'Provide information, instructions and trainings to enable all workers to work safely.',
  'Ensure continuous attention to all environmental matters to prevent any possible environmental damage.',
  'Ensure the security of life and properties of employees, clients, visitors and members of the public.',
  'Supervise workers to ensure work activities are performed safely.',
  'Involve employees in health and safety decisions through consultation and cooperation.',
  'Recognize and reward those who contribute to improved HSE performance.',
];

const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Health',
    desc: 'Protecting the physical and mental wellbeing of every person in our operations.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Safety',
    desc: 'Zero tolerance for unsafe practices every task, every site, every time.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Environment',
    desc: 'Pursuing the goal of no harm to the environment in which we operate.',
  },
];

export default function HSEPolicy() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const VISIBLE = 5;

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

  const visible = expanded ? commitments : commitments.slice(0, VISIBLE);

  return (
    <section id="hse-policy" className="section hse" ref={sectionRef}>
      <div className="hse__bg" />
      <div className="container">

        {/* Header */}
        <div className="hse__header text-center fade-in">
          <span className="section-label">Compliance</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title section-title--light">HSE Policy</h2>
          <p className="section-subtitle section-subtitle--light">
            Health, Safety &amp; Environment is at the core of everything we do
            a commitment enforced at the highest level of our organisation.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="hse__pillars fade-in">
          {pillars.map((p, i) => (
            <div key={p.title} className="hse__pillar" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="hse__pillar-icon">{p.icon}</div>
              <h4 className="hse__pillar-title">{p.title}</h4>
              <p className="hse__pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Policy intro */}
        <div className="hse__intro fade-in">
          <div className="hse__intro-bar" />
          <p>
            This policy addresses the Health, Safety and Environmental risks of our operations
            and the potential impact on employees, with strong management commitment at the highest
            level. This policy reflects good working practices and shall be made mandatory by anyone
            doing business with us.
          </p>
        </div>

        {/* Commitments */}
        <div className="hse__commitments fade-in">
          <h3 className="hse__commitments-title">Our Commitments</h3>
          <div className="hse__commitments-grid">
            {visible.map((c, i) => (
              <div key={i} className="hse__commitment">
                <div className="hse__commitment-num">0{i + 1}</div>
                <p className="hse__commitment-text">{c}</p>
              </div>
            ))}
          </div>
          {commitments.length > VISIBLE && (
            <button className="hse__toggle" onClick={() => setExpanded(e => !e)}>
              {expanded ? 'Show Less ↑' : `+${commitments.length - VISIBLE} more commitments ↓`}
            </button>
          )}
        </div>

        {/* Footer statement */}
        <div className="hse__statement fade-in">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p>
            Dockworth Services International Limited is committed to ensuring that this Health,
            Safety and Environmental Policy is communicated to all employees, all persons working
            under the control of the company, customers and other interested parties.
          </p>
        </div>

      </div>
    </section>
  );
}
