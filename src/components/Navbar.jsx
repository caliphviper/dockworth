import { useState, useEffect } from 'react';
import dockworthLogo from '../assets/dockworth-logo.png';
import './Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Management', href: '#management' },
  { label: 'History', href: '#history' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header id="navbar" className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a href="#home" className="navbar__logo" onClick={() => handleNavClick('#home')}>
          <img src={dockworthLogo} alt="Dockworth Services International Limited" className="navbar__logo-img" />
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA + Hamburger */}
        <div className="navbar__actions">
          <a
            href="#contact"
            className="btn btn--primary navbar__cta"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
          >
            Get In Touch
          </a>
          <button
            id="mobile-menu-toggle"
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__mobile-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn btn--primary navbar__mobile-cta"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Get In Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
