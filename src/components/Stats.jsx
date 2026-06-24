import { useEffect, useRef, useState } from 'react';
import './Stats.css';

const stats = [
  { number: 25, suffix: '+', label: 'Years of Operation', desc: 'Trusted since the early 2000s' },
  { number: 500, suffix: '+', label: 'Projects Completed', desc: 'Vessel calls, cargo movements & more' },
  { number: 12, suffix: '+', label: 'Active Ports Served', desc: 'Across Nigeria and West Africa' },
  { number: 100, suffix: '+', label: 'Client Companies', desc: 'From SMEs to multinationals' },
];

function useCounter(target, duration = 2000, started) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

function StatItem({ stat, started, index }) {
  const count = useCounter(stat.number, 2000, started);
  return (
    <div className="stats__item fade-in" style={{ transitionDelay: `${index * 150}ms` }}>
      <div className="stats__number">
        <span className="stats__count">{count}</span>
        <span className="stats__suffix">{stat.suffix}</span>
      </div>
      <div className="stats__label">{stat.label}</div>
      <div className="stats__desc">{stat.desc}</div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  return (
    <section className="stats section--dark" ref={sectionRef}>
      <div className="stats__bg-pattern" />
      <div className="container stats__inner">
        <div className="stats__header text-center">
          <span className="section-label">Our Track Record</span>
          <h2 className="section-title section-title--light">
            Decades of Proven Maritime Performance
          </h2>
        </div>
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} started={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
