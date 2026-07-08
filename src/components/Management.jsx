import { useEffect, useRef, useState, useCallback } from 'react';
import './Management.css';

const team = [
  {
    id: 'chairman',
    initials: 'MB',
    name: 'Alh. (Dr.) Mohammed A. Bambado',
    title: 'Chairman/CEO',
    bio: 'A seasoned professional and visionary with over 3 decades of experience in Maritime, Port and Oil & Gas industry operations management, Project Management, and Drilling services across Africa, Europe and Asia. Winner of Africa\'s Business Leader of the Year 2012 and 2013. Alumnus of the University of Maiduguri.',
    color: '#0A1628',
  },
  {
    id: 'gov-dir',
    initials: 'AB',
    name: 'Mal. Aliyu Abubakar Bambado',
    title: 'Governing Director',
    bio: 'Over 20 years of experience in maritime operations. Holds a Master\'s Degree in Transportation Management from the World Maritime University. Has played a significant role in repositioning the company\'s service delivery through continuous improvement, training, innovation and strict compliance with safety regulations.',
    color: '#1B4F8A',
  },
  {
    id: 'ed-bd',
    initials: 'EO',
    name: 'Barr. Efioita Okon Ephraim',
    title: 'Executive Director - Business Development',
    bio: 'Holds an OND in Estate Management, B.Sc. in Economics, PGD in Port and Shipping Management, M.Sc. in Transport, LLB and BL. Served at the Nigerian Ports Authority for 35 years, retiring as General Manager, and later served as General Manager at Ports and Terminal Operators Nigeria Ltd.',
    color: '#2E86AB',
  },
  {
    id: 'ed-me',
    initials: 'PO',
    name: 'Capt. Peter Adeniyi Olajubu',
    title: 'Executive Director - Marine & Engineering Services',
    bio: 'An enthusiastic Maritime Professional with 40+ years of experience. Skilled in Offshore Terminal Management, Tanker clearance, Ship handling, SPM and Tandem Mooring, Crude Oil and Gas Export System Management, and Marine Navigation. Previously Senior Mooring Master at Chevron Nigeria Limited.',
    color: '#07b0c0',
  },
    
  {
    id: 'maritime',
    initials: 'EM',
    name: 'Mr. Emmanuel Maiguwa Gankino',
    title: 'Maritime Expert',
    bio: 'Founder and CEO with over 21 years of experience in Ship Management, Maritime Security, ISM code, Ports Operations and International Shipping. Serving President of the Maritime Security Providers\' Association of Nigeria (MASPAN) and President of the Alumni of Maritime Academy of Nigeria Oron (AMANO).',
    color: '#051497',
  },
  {
    id: 'ed-pt',
    initials: 'DA',
    name: 'Mr. Durojaiye Ayodele',
    title: 'Executive Director - Ports & Terminals Operations',
    bio: 'Alumni of University of Wales, Cardiff, with B.Sc. in International Studies and M.Sc. Maritime Studies specialising in Ports & Shipping. Appointed General Manager, Managing Director\'s Office in 2023, overseeing port management and Export Processing Terminals operations.',
    color: '#0A1628',
  },
  {
    id: 'qhse-mgr',
    initials: 'EJ',
    name: 'Mr. Elijah Ekpe J.',
    title: 'QHSE Manager',
    bio: 'A seasoned QHSE professional with over 15 years of experience across EPC projects, upstream oil and gas, marine, construction, and manufacturing industries. Certified QHSE Lead Auditor, authorized OSHAcademy USA trainer in Nigeria, and member of the Institute of Safety Professionals of Nigeria. Winner of the prestigious AFRISafe Award for outstanding contributions to health, safety, quality, and wellbeing.',
    color: '#1B4F8A',
  },
  {
    id: 'field-eng-1',
    initials: 'SU',
    name: 'Mr. Sunday Nnah Udoka',
    title: 'Field Engineer 1',
    bio: 'A highly experienced Marine and Mechanical Engineer with over 20 years of expertise in offshore and onshore oil and gas operations. Specializes in Single Point Mooring (SPM) systems, marine hose management, subsea engineering logistics, offshore rigging, and asset integrity management. Has held key positions with SPDC (Bonga FPSO and Sea Eagle FPSO), Nigerian Agip Oil Company, and SPDC Bonny Terminal.',
    color: '#2E86AB',
  },
  {
    id: 'field-eng-2',
    initials: 'CD',
    name: 'Mr. Clifford Tamuno-Ibime Dexterity',
    title: 'Field Engineer 2',
    bio: 'A Petroleum Engineer with over six years of experience in oil and gas, subsea engineering, project management, process instrumentation, quality assurance, logistics, and CNG operations. Holds an M.Tech and B.Eng in Petroleum Engineering from Rivers State University and the University of Port Harcourt respectively. Graduate Member of the Nigerian Society of Engineers and published researcher in drilling fluids and nanoparticle applications.',
    color: '#07b0c0',
  },
];

export default function Management() {
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const autoPlayRef = useRef(null);

  const toggleExpand = (id) => {
    setPaused(true);
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const truncate = (text, id) => {
    const words = text.split(' ');
    if (words.length <= 28 || expanded[id]) return text;
    return words.slice(0, 28).join(' ') + '...';
  };

  const useCarousel = !isDesktop || team.length > 4;

  const itemsPerView = isDesktop ? 4 : 1;
  const totalSlides = Math.ceil(team.length / itemsPerView);
  const slideWidth = isDesktop ? 100 : 82;

  const next = useCallback(() => setCurrent(c => (c + 1) % totalSlides), [totalSlides]);
  const prev = () => setCurrent(c => (c - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');
    setIsDesktop(mq.matches);
    const handler = e => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!useCarousel || paused) return;
    autoPlayRef.current = setInterval(next, 3500);
    return () => clearInterval(autoPlayRef.current);
  }, [useCarousel, next, paused]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const cards = team.map((member, i) => (
    <div key={member.id} id={`team-${member.id}`} className="team-card fade-in" style={{ transitionDelay: `${i * 110}ms` }}>
      <div className="team-card__avatar" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)` }}>
        <span className="team-card__initials">{member.initials}</span>
        <div className="team-card__avatar-ring" />
      </div>
      <div className="team-card__body">
        <h3 className="team-card__name">{member.name}</h3>
        <span className="team-card__title">{member.title}</span>
        <p className="team-card__bio">{truncate(member.bio, member.id)}</p>
        {member.bio.split(' ').length > 28 && (
          <button className="team-card__readmore" onClick={() => toggleExpand(member.id)}>
            {expanded[member.id] ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <section id="management" className="section management" ref={sectionRef}>
      <div className="container">
        <div className="management__header text-center fade-in">
          <span className="section-label">Leadership</span>
          <div className="gold-divider gold-divider--center" />
          <h2 className="section-title">Executive Management</h2>
          <p className="section-subtitle">
            Seasoned maritime professionals guiding Dockworth's mission of excellence across West Africa.
          </p>
        </div>

        <div
          className="management__carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="management__arrow management__arrow--prev" onClick={prev}>&#8249;</button>
          <button className="management__arrow management__arrow--next" onClick={next}>&#8250;</button>
          <div className="management__carousel-overflow">
          <div
            className="management__carousel-track"
            style={{ transform: `translateX(-${current * slideWidth}%)` }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {isDesktop
              ? Array.from({ length: totalSlides }, (_, si) => (
                  <div key={si} className="management__slide">
                    {team.slice(si * 4, si * 4 + 4).map((member, i) => (
                      <div key={member.id} id={`team-${member.id}`} className="team-card fade-in" style={{ transitionDelay: `${i * 110}ms` }}>
                        <div className="team-card__avatar" style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)` }}>
                          <span className="team-card__initials">{member.initials}</span>
                          <div className="team-card__avatar-ring" />
                        </div>
                        <div className="team-card__body">
                          <h3 className="team-card__name">{member.name}</h3>
                          <span className="team-card__title">{member.title}</span>
                          <p className="team-card__bio">{truncate(member.bio, member.id)}</p>
                          {member.bio.split(' ').length > 28 && (
                            <button className="team-card__readmore" onClick={() => toggleExpand(member.id)}>
                              {expanded[member.id] ? 'Read Less' : 'Read More'}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              : cards}
          </div>
          </div>
          <div className="management__dots">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                className={`management__dot${i === current ? ' management__dot--active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
