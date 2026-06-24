import dockworthLogo from '../assets/dockworth-logo.png';
import './Footer.css';

const currentYear = new Date().getFullYear();

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Management', href: '#management' },
  { label: 'History', href: '#history' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Coverage', href: '#scope' },
  { label: 'Clientele', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer section--navy-mid">
      <div className="container">
        <div className="footer__top">
          {/* Brand Col */}
          <div className="footer__col footer__brand">
            <a href="#home" className="footer__logo">
              <img src={dockworthLogo} alt="Dockworth Services International Limited" className="footer__logo-img" />
            </a>
            <p className="footer__desc">
              Nigeria's premier maritime company providing port agency, ship chandling, marine logistics, offshore support and vessel operations across West Africa.
            </p>
          </div>

          {/* Nav Col */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__nav">
              {navLinks.slice(0, 5).map(link => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="footer__col">
            <h4 className="footer__heading">More Pages</h4>
            <ul className="footer__nav">
              {navLinks.slice(5).map(link => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications / Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Regulatory Compliance</h4>
            <p className="footer__desc" style={{ marginBottom: '1rem' }}>
              We operate in full compliance with Nigerian and international maritime regulations.
            </p>
            <div className="footer__badges">
              <div className="footer__badge">NIMASA Registered</div>
              <div className="footer__badge">NPA Approved</div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {currentYear} Dockworth Services International Limited. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
