import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const contactInfo = [
  {
    id: 'phone',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.6 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l.98-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
      </svg>
    ),
    label: 'Phone',
    value: '+234 803 755 1756',
    href: 'tel:+2348037551756',
  },
  {
    id: 'email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'dockworthservices@gmail.com',
    href: 'mailto:dockworthservices@gmail.com',
  },

  {
    id: 'email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'info@dockworthservicesint.com',
    href: 'mailto:info@dockworthservicesint.com',
  },
  {
    id: 'location',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Address',
    value: '7b, Pelewura way, Apapa Lagos, Nigeria',
    href: 'https://maps.google.com/?q=Lagos,Nigeria',
  },
  {
    id: 'hours',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Operations',
    value: '24/7 — Round the Clock',
    href: null,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in').forEach((el, i) => {
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

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: form.name,
        from_email: form.email,
        company: form.company,
        service: form.service,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setStatus('success');
        setForm({ name: '', email: '', company: '', service: '', message: '' });
      })
      .catch(() => setStatus('error'));
  };

  return (
    <section id="contact" className="section contact" ref={sectionRef}>
      <div className="container contact__inner">
        {/* Info Column */}
        <div className="contact__info fade-in-left">
          <span className="section-label">Get In Touch</span>
          <div className="gold-divider" />
          <h2 className="section-title">Let's Work Together</h2>
          <p className="contact__intro">
            Whether you need a port agent, ship chandling, cargo logistics or offshore support —
            our team is ready to assist. Reach out and we'll respond promptly.
          </p>

          <div className="contact__details">
            {contactInfo.map(c => (
              <div key={c.id} className="contact__detail">
                <div className="contact__detail-icon">{c.icon}</div>
                <div className="contact__detail-body">
                  <span className="contact__detail-label">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="contact__detail-value contact__detail-value--link" target={c.id === 'location' ? '_blank' : undefined} rel="noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span className="contact__detail-value">{c.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact__social">
            <span className="contact__social-label">Follow Us</span>
            <div className="contact__social-links">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact__social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="contact__social-link" aria-label="Twitter / X">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="contact__form-col fade-in-right">
          <div className="contact__form-card">
            <h3 className="contact__form-title">Send Us a Message</h3>
            {status === 'error' && (
              <div className="contact__error">
                Something went wrong. Please try again or email us directly.
                <button className="btn btn--outline" onClick={() => setStatus('idle')}>Try Again</button>
              </div>
            )}
            {status === 'success' ? (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. A member of our team will contact you shortly.</p>
                <button className="btn btn--outline" onClick={() => setStatus('idle')}>Send Another</button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Full Name *</label>
                    <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="John Smith" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address *</label>
                    <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} className="form-input" placeholder="john@company.com" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-company" className="form-label">Company</label>
                    <input id="contact-company" type="text" name="company" value={form.company} onChange={handleChange} className="form-input" placeholder="Your company name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-service" className="form-label">Service Required</label>
                    <select id="contact-service" name="service" value={form.service} onChange={handleChange} className="form-input form-select">
                      <option value="">Select a service…</option>
                      <option value="port-agency">Port Agency Services</option>
                      <option value="ship-chandling">Ship Chandling</option>
                      <option value="marine-logistics">Marine Logistics</option>
                      <option value="vessel-ops">Vessel Operations</option>
                      <option value="offshore">Offshore Support</option>
                      <option value="consultancy">Maritime Consultancy</option>
                      <option value="other">Other / General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                    placeholder="Tell us about your requirements, vessel details, timeline, etc."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  id="contact-submit"
                  className="btn btn--primary contact__submit"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? (
                    <><span className="contact__spinner" />Sending…</>
                  ) : (
                    <>Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
