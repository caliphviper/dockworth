import { useEffect, useRef } from 'react';
import './OrgChart.css';

const Node = ({ label, level, delay = 0 }) => (
  <div className={`org-node org-node--l${level} fade-in`} style={{ transitionDelay: `${delay}ms` }}>
    {label}
  </div>
);

export default function OrgChart() {
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
    <section id="org-chart" className="section org-chart-section" ref={sectionRef}>
      <div className="container">
        <div className="org-chart__header text-center fade-in">
          <span className="section-label">Structure</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Organisational Chart</h2>
          <p className="section-subtitle">
            A clear hierarchy built for operational excellence and accountability at every level.
          </p>
        </div>

        <div className="org-tree">

          {/* Level 1 — Board */}
          <div className="org-level">
            <Node label="Board of Directors" level={1} delay={0} />
          </div>
          <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '100ms' }} />

          {/* Level 2 — MD */}
          <div className="org-level">
            <Node label="Managing Director" level={2} delay={150} />
          </div>
          <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '250ms' }} />

          {/* Level 3 — GM */}
          <div className="org-level">
            <Node label="General Manager" level={2} delay={300} />
          </div>

          {/* Branch line to 4 depts */}
          <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '400ms' }} />

          {/* Level 4 — Departments */}
          <div className="org-level org-level--departments">
            <div className="org-dept">
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '450ms' }} />
              <Node label="Finance" level={3} delay={500} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '600ms' }} />
              <Node label="Accountant" level={4} delay={650} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '750ms' }} />
              <Node label="Wages Clerk" level={4} delay={800} />
            </div>

            <div className="org-dept">
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '450ms' }} />
              <Node label="Logistics" level={3} delay={520} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '620ms' }} />
              <Node label="Foreman" level={4} delay={670} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '770ms' }} />
              <Node label="Supervisors" level={4} delay={820} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '920ms' }} />
              <Node label="Dockworkers" level={4} delay={970} />
            </div>

            <div className="org-dept">
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '450ms' }} />
              <Node label="Operations" level={3} delay={540} />
              <div className="org-connector org-connector--branch-2 fade-in" style={{ transitionDelay: '640ms' }}>
                <span /><span />
              </div>
              <div className="org-level org-level--sub">
                <div className="org-dept">
                  <Node label="Allocation Officer" level={4} delay={700} />
                  <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '800ms' }} />
                  <Node label="Operation Record Clerks" level={4} delay={850} />
                </div>
                <div className="org-dept">
                  <Node label="Nurse (First Aid)" level={4} delay={720} />
                </div>
              </div>
            </div>

            <div className="org-dept">
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '450ms' }} />
              <Node label="HSE" level={3} delay={560} />
              <div className="org-connector org-connector--single fade-in" style={{ transitionDelay: '660ms' }} />
              <Node label="Gear Store Man" level={4} delay={710} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
