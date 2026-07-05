import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      headlineRef.current?.classList.add('hero__headline--visible');
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (href) => {
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg" style={{ backgroundImage: 'url(/hero-maritime.png)' }} />
      <div className="hero__overlay" />

      {/* Water wave effect */}
      <div className="hero__water">
        <svg className="hero__wave hero__wave--1" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave1" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"/>
          </defs>
          <use href="#wave1" x="48" y="0" />
          <use href="#wave1" x="48" y="3" />
          <use href="#wave1" x="48" y="5" />
        </svg>
        <svg className="hero__wave hero__wave--2" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave2" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"/>
          </defs>
          <use href="#wave2" x="48" y="0" />
          <use href="#wave2" x="48" y="3" />
        </svg>
        <svg className="hero__wave hero__wave--3" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
          <defs>
            <path id="wave3" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"/>
          </defs>
          <use href="#wave3" x="48" y="0" />
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />

      {/* Content */}
      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Nigeria & West Africa's Premier Maritime Partner
        </div>

        <h1 ref={headlineRef} className="hero__headline">
          <span className="hero__headline-line">Navigating</span>
          <span className="hero__headline-line hero__headline-line--gold">Excellence</span>
          <span className="hero__headline-line">Across West Africa</span>
        </h1>

        <p className="hero__description">
          Dockworth Services International Limited delivers world class maritime solutions
          from port agency and ship cargo handling to offshore support and services with over two decades of
          trusted performance across Nigerian and West African waters.
        </p>

        <div className="hero__ctas">
          <a
            href="#services"
            className="btn btn--primary hero__btn"
            onClick={(e) => { e.preventDefault(); handleScroll('#services'); }}
          >
            Explore Services
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#about"
            className="btn btn--secondary hero__btn"
            onClick={(e) => { e.preventDefault(); handleScroll('#about'); }}
          >
            Read About Us
          </a>
        </div>

        {/* Quick stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-number">25+</span>
            <span className="hero__stat-label">Years Operating</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">20+</span>
            <span className="hero__stat-label">Projects Completed</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-number">0</span>
            <span className="hero__stat-label">Ports Served</span>
          </div>
          
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Scroll to explore</span>
        <div className="hero__scroll-line">
          <div className="hero__scroll-dot" />
        </div>
      </div>
    </section>
  );
}
