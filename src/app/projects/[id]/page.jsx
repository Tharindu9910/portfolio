'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react';
import { PROJECTS } from '../../../constants'

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════════ */
const TECH_STACK = ['React', 'Flask', 'Neo4j', 'Firestore', 'GCP']

const META = [
  { label: 'Role', value: 'Lead Full Stack Engineer', span: 1 },
  { label: 'Timeline', value: '8 Months (2023)', span: 1 },
  { label: 'Tech Stack', value: null, span: 2 },
]

const GALLERY = [
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    alt: 'Real-time analytics dashboard showing metrics',
    title: 'Real-time Analytics Dashboard',
    caption: 'Unified telemetry and performance visualization engine.',
  },
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80',
    alt: 'Microservices management console interface',
    title: 'Microservices Management Console',
    caption: 'Orchestration interface for distributed service clusters.',
  },
  {
    src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
    alt: 'Data relationship mapper visualization',
    title: 'Data Relationship Mapper',
    caption: 'Visualizing non-linear entity connections in Neo4j.',
  },
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    alt: 'Enterprise settings and configuration interface',
    title: 'Global Identity Manager',
    caption: 'Centralized access control and user permissioning module.',
  },
]

const CHALLENGES = [
  {
    num: '01',
    title: 'Distributed Consistency',
    body: 'Maintaining transactional integrity across distributed Flask services required implementing a sophisticated Saga pattern, ensuring data stayed synchronized between Neo4j and our metadata caches.',
  },
  {
    num: '02',
    title: 'Graph Query Optimization',
    body: 'Complex deep-path queries in Neo4j were initially causing high latency. We optimized Cypher queries and implemented a multi-layered caching strategy that slashed response times by 30%.',
  },
]

const METRICS = [
  { value: '99.9%', label: 'Uptime SLA Maintained' },
  { value: '30%', label: 'Query Latency Reduction' },
  { value: '15+', label: 'Microservices on GCP' },
]

const FOOTER_LINKS = [
  { col: ['Github', 'LinkedIn', 'Twitter'] },
  { col: ['Case Studies', 'Documentation', 'Privacy'] },
]

/* ═══════════════════════════════════════════════════════════════
   TINY ATOMS
═══════════════════════════════════════════════════════════════ */
const C = {
  bg: '#0e0e0e',
  bgCard: '#131313',
  bgHigh: '#191a1a',
  bgHigher: '#252626',
  primary: '#fabd00',
  onPrim: '#533d00',
  text: '#e7e5e4',
  muted: '#acabaa',
  border: 'rgba(72,72,72,0.2)',
  borderFaint: 'rgba(72,72,72,0.1)',
}

const font = {
  head: "'Space Grotesk', sans-serif",
  body: "'Manrope', sans-serif",
  label: "'Inter', sans-serif",
}
const label10 = {
  fontFamily: 'Inter,sans-serif', fontWeight: 500, fontSize: '10px',
  letterSpacing: '0.14em', textTransform: 'uppercase',
}

const formatText = (text) => {
  // Splits the string by the <accent> tags
  const parts = text.split(/(<accent>.*?<\/accent>)/g);

  return parts.map((part, i) => {
    if (part.startsWith('<accent>')) {
      // Strip the tags and wrap in a styled span
      const content = part.replace('<accent>', '').replace('</accent>', '');
      return <span key={i} style={{ color: '#FFD000' }}>{content}</span>;
    }
    return part;
  });
};

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ProjectPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const project = PROJECTS.find((p) => p.caseNumber == id);
  const index = PROJECTS.findIndex((p) => p.caseNumber == id);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const gallery = PROJECTS[index]?.gallery || [];

  const handleNext = () => {
    if (startIndex + itemsPerPage < gallery.length) {
      setStartIndex(prev => prev + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(prev => prev - itemsPerPage);
    }
  };

  const visibleItems = gallery.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Hero
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.pp-label', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 })
      .fromTo('.pp-h1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.1')
      .fromTo('.pp-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.4')
      .fromTo('.pp-meta', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
      .fromTo('.pp-hero-img', { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.2')

    // Scroll sections
    gsap.utils.toArray('.pp-reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%' }
        }
      )
    })

    // Metrics count-up feel
    gsap.utils.toArray('.metric-val').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })
  }, [])

  if (!project) return <h1>Project not found</h1>;
  return (
    <>
      {/* ── Google Fonts + scoped responsive CSS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #fabd00; color: #533d00; }

        .pp-wrap { max-width: 1280px; margin: 0 auto; padding: 0 48px; }

        .meta-grid  { display: grid; grid-template-columns: 1fr 1fr 2fr; }
        .arch-grid  { display: grid; grid-template-columns: 4fr 8fr; gap: 48px; align-items: start; }
        .gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; }
        .footer-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .footer-links-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .nav-links { display: flex; }
        .challenge-grid { display: grid; grid-template-columns: 1fr 1fr; }

        @media (max-width: 900px) {
          .pp-wrap    { padding: 0 28px; }
          .meta-grid  { grid-template-columns: 1fr 1fr; }
          .meta-grid > div:last-child { grid-column: span 2; }
          .arch-grid  { grid-template-columns: 1fr; gap: 24px; }
          .arch-sticky { position: static !important; }
          .gallery-grid { gap: 20px; }
          .challenge-grid { grid-template-columns: 1fr; }
          .metrics-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .footer-grid  { grid-template-columns: 1fr; gap: 40px; }
          .pp-h1 { font-size: clamp(40px, 10vw, 72px) !important; }
        }
        @media (max-width: 600px) {
          .pp-wrap    { padding: 0 18px; }
          .meta-grid  { grid-template-columns: 1fr; }
          .meta-grid > div:last-child { grid-column: span 1; }
          .gallery-grid { grid-template-columns: 1fr; }
          .metrics-grid { grid-template-columns: 1fr; }
          .footer-links-grid { grid-template-columns: 1fr; gap: 16px; }
          .nav-links { display: none !important; }
          .pp-h1 { font-size: clamp(36px, 12vw, 52px) !important; }
          .next-proj-title { font-size: clamp(32px, 10vw, 52px) !important; }
        }
      `}</style>

      <div style={{ background: C.bg, color: C.text, fontFamily: font.body, minHeight: '100vh' }}>

        <main style={{ paddingTop: '128px', paddingBottom: '96px' }}>
          <div className="pp-wrap">
            {/* ── BACK ── */}
            <div className="rp-back" style={{ paddingTop: '0px', marginBottom: '10px' }}>
              <Link href="/#projects" style={{
                ...label10, color: '#444', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#888'}
                onMouseLeave={e => e.currentTarget.style.color = '#444'}
              >← BACK TO HOME
              </Link>
            </div>
            {/* ══ HERO ══════════════════════════════════════════ */}
            <header style={{ marginBottom: '96px' }}>
              <div style={{ marginBottom: '64px' }}>
                <span className="pp-label" style={{
                  fontFamily: font.label, fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.2em', color: C.primary,
                  textTransform: 'uppercase', display: 'block', marginBottom: '16px',
                }}>Case Study / {id}</span>

                <h1 className="pp-h1" style={{

                  fontFamily: 'Oswald,sans-serif', fontWeight: 700,
                  fontSize: 'clamp(52px,8.5vw,96px)',
                  lineHeight: 0.93, letterSpacing: '-0.03em',
                  color: '#FFF', textTransform: 'uppercase',
                  marginBottom: '22px',
                }}>  {formatText(PROJECTS[index]?.title)}<span style={{ color: '#FFD000' }}>.</span></h1>

                <p className="pp-desc" style={{
                  fontFamily: font.body, fontSize: 'clamp(16px, 2vw, 22px)',
                  color: C.muted, lineHeight: 1.65, maxWidth: '720px',
                }}>
                  {PROJECTS[index]?.tagline}
                </p>
              </div>

              {/* Meta bento */}
              <div className="pp-meta meta-grid" style={{
                background: 'rgba(72,72,72,0.06)',
                border: `1px solid ${C.border}`,
              }}>
                <div style={{
                  padding: '32px', borderRight: `1px solid ${C.border}`,
                  borderLeft: `2px solid rgba(250,189,0,0.25)`,
                }}>
                  <span style={{
                    fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '8px'
                  }}>Role</span>
                  <span style={{ fontFamily: font.body, fontSize: '16px', fontWeight: 500 }}>
                    {PROJECTS[index]?.role}
                  </span>
                </div>
                <div style={{ padding: '32px', borderRight: `1px solid ${C.border}` }}>
                  <span style={{
                    fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '8px'
                  }}>Timeline</span>
                  <span style={{ fontFamily: font.body, fontSize: '16px', fontWeight: 500 }}>
                    {PROJECTS[index]?.timeline}
                  </span>
                </div>
                <div style={{ padding: '32px' }}>
                  <span style={{
                    fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '10px'
                  }}>Tech Stack</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {PROJECTS[index]?.techStack.map(t => (
                      <span key={t} style={{
                        background: C.bgHigher, color: C.muted,
                        padding: '4px 12px', borderRadius: '999px',
                        fontFamily: font.label, fontSize: '11px',
                        textTransform: 'uppercase', letterSpacing: '0.04em',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </header>

            {/* ══ MAIN VISUAL ═══════════════════════════════════ */}
            {/* <section className="pp-hero-img pp-reveal" style={{ marginBottom: '128px' }}>
              <div style={{
                position: 'relative', aspectRatio: '16/9',
                overflow: 'hidden', background: C.bgHigher,
              }}>
                <Image
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80"
                  alt="Abstract 3D network nodes with glowing gold paths on dark background"
                  fill
                  priority
                  style={{ objectFit: 'cover', opacity: 0.6, mixBlendMode: 'luminosity' }}
                  sizes="100vw"
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, #0e0e0e 0%, transparent 50%)',
                }} />
              </div>
            </section> */}

            {/* ══ THE ARCHITECTURE ══════════════════════════════ */}
            <section className="pp-reveal arch-grid" style={{ marginBottom: '128px' }}>
              {/* Sticky heading */}
              <div className="arch-sticky" style={{ position: 'sticky', top: '112px' }}>
                <h2 style={{
                  fontFamily: font.head, fontWeight: 700, fontSize: '36px',
                  letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.text,
                }}>THE<br />ARCHITECTURE</h2>
                <div style={{ width: '48px', height: '4px', background: C.primary, marginTop: '16px' }} />
              </div>

              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{
                  background: C.bgCard, padding: '40px',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                }}>
                  {PROJECTS[index]?.architecture.body.map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: font.body,
                        fontSize: '17px',
                        color: C.muted,
                        lineHeight: 1.75
                      }}
                    >
                      {formatText(paragraph)}
                    </p>
                  ))}
                </div>

              </div>
            </section>

            {/* ══ THE ARCHITECTURE ══════════════════════════════ */}
            <section
            className="arch-section"
              style={{
                display: 'grid',
                gridTemplateColumns: '5fr 3fr', // This creates the 3:1 ratio
                gap: '64px',                   // Space between content and heading
                alignItems: 'start',           // Prevents content from stretching vertically
                padding: '80px 0'
              }}
            >


              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{
                  background: C.bgCard, padding: '40px',
                  display: 'flex', flexDirection: 'column', gap: '20px',
                }}>

                  <p
                    style={{
                      fontFamily: font.body,
                      fontSize: '17px',
                      color: C.muted,
                      lineHeight: 1.75
                    }}
                  >
                    {PROJECTS[index]?.techinical_decisions?.body?.map((paragraph, i) => (
                      <p
                        key={i}
                        style={{
                          fontFamily: font.body,
                          fontSize: '17px',
                          color: C.muted,
                          lineHeight: 1.75
                        }}
                      >
                        {formatText(paragraph)}
                      </p>
                    ))}
                  </p>

                </div>

                {/* Code block */}

                <div style={{
                  position: 'relative', aspectRatio: '16/9',
                  overflow: 'hidden', background: C.bgHigher,
                }}>
                  <Image
                    src={PROJECTS[index]?.techinical_decisions?.image?.src || 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80'}
                    alt="Abstract 3D network nodes with glowing gold paths on dark background"
                    fill
                    priority
                    style={{ objectFit: 'center', opacity: 1 }}
                    sizes="100vw"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, #0e0e0e 0%, transparent 20%)',
                  }} />
                </div>



              </div>
              {/* Sticky heading */}
              <div className="arch-sticky" style={{ position: 'sticky', top: '112px', alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{
                  textAlign: 'right',
                  fontFamily: font.head, fontWeight: 700, fontSize: '36px',
                  letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.text,
                }}>Key  <br />Technical Decisions</h2>
                <div style={{ width: '48px', height: '4px', background: C.primary, marginTop: '16px' }} />
              </div>
            </section>

            {/* ══ INTERFACE GALLERY ══════════════════════════════ */}
            <section className="pp-reveal" style={{ marginBottom: '128px' }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-end', marginBottom: '64px',
                flexWrap: 'wrap', gap: '24px',
              }}>
                <div style={{ maxWidth: '580px' }}>
                  <h2 style={{
                    fontFamily: font.head, fontWeight: 700, fontSize: '36px',
                    letterSpacing: '-0.03em', textTransform: 'uppercase',
                    color: C.text, marginBottom: '12px',
                  }}>INTERFACE GALLERY</h2>
                  <div style={{ width: '48px', height: '4px', background: C.primary, marginBottom: '20px' }} />
                  <p style={{ fontFamily: font.body, fontSize: '16px', color: C.muted, lineHeight: 1.7 }}>
                    Precision-engineered user interfaces designed for complex data orchestration
                    and high-performance visual analysis.
                  </p>
                </div>

                {/* Nav arrows */}
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    onClick={handlePrev}
                    disabled={startIndex === 0}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: `1px solid rgba(72,72,72,0.5)`,
                      background: 'transparent',
                      color: startIndex === 0 ? '#555' : C.muted,
                      fontSize: '16px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >←</button>

                  <button
                    onClick={handleNext}
                    disabled={startIndex + itemsPerPage >= gallery.length}
                    style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: `1px solid rgba(72,72,72,0.5)`,
                      background: 'transparent',
                      color: startIndex + itemsPerPage >= gallery.length ? '#555' : C.muted,
                      fontSize: '16px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >→</button>
                </div>
              </div>

              <div className="gallery-grid">
                {visibleItems.map((img, i) => (
                  <div
                    key={`${img.title}-${i}`}
                    style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    className="gallery-item"
                  >
                    <div style={{
                      aspectRatio: '16/10',
                      overflow: 'hidden',
                      background: C.bgHigh,
                      border: `1px solid ${C.borderFaint}`,
                      position: 'relative',
                    }}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        style={{
                          objectFit: 'cover',
                          opacity: 0.8,
                          transition: 'filter 0.7s, opacity 0.7s',
                        }}
                        sizes="(max-width: 600px) 100vw, 50vw"
                        className="gallery-img"
                      />
                    </div>

                    {/* <div>
          <h4 style={{
            fontFamily: font.head,
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: C.text,
            marginBottom: '4px',
          }}>{img.title}</h4>

          <p style={{
            fontFamily: font.label,
            fontSize: '12px',
            color: C.muted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.65,
          }}>{img.caption}</p>
        </div> */}
                  </div>
                ))}
              </div>
            </section>

            {/* ══ TECHNICAL CHALLENGES ══════════════════════════ */}
            <section className="arch-section" s style={{
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
    gap: '64px',
    alignItems: 'start',
    padding: '80px 0'
  }}>
              <div className="challenge-grid" style={{ background: C.bgCard }}>
                {/* Left: text */}
                <div style={{
                  padding: 'clamp(32px,5vw,80px)',
                  borderRight: `1px solid ${C.borderFaint}`,
                }}>
                  <h2 style={{
                    fontFamily: font.head, fontWeight: 700, fontSize: '26px',
                    letterSpacing: '-0.03em', textTransform: 'uppercase',
                    color: C.text, marginBottom: '32px',
                  }}>TECHNICAL<br />CHALLENGES</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    {PROJECTS[index]?.challenges.map(c => (
                      <div key={c.num}>
                        <h3 style={{
                          fontFamily: font.label, fontSize: '11px', fontWeight: 500,
                          color: C.primary, letterSpacing: '0.18em', textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}>{c.num}. {c.title}</h3>
                        <p style={{
                          fontFamily: font.body, fontSize: '14px',
                          color: C.muted, lineHeight: 1.72,
                        }}>{c.body}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: image */}
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '320px' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80"
                    alt="Complex data structures with glowing network architecture"
                    fill
                    style={{
                      objectFit: 'cover', opacity: 0.45,
                      transition: 'transform 0.7s',
                    }}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="challenge-img"
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `rgba(250,189,0,0.03)`,
                    transition: 'background 0.5s',
                  }} />
                </div>
              </div>
            </section>

            {/* ══ METRICS ════════════════════════════════════════ */}
            <section className="pp-reveal" style={{ marginBottom: '192px' }}>
              <p style={{
                fontFamily: font.head, fontSize: '12px', fontWeight: 700,
                letterSpacing: '0.4em', textTransform: 'uppercase',
                color: C.muted, textAlign: 'center', marginBottom: '64px',
              }}>IMPACT &amp; METRICS</p>

              <div className="metrics-grid">
                {PROJECTS[index]?.metrics.map(m => (
                  <div key={m.label} style={{
                    background: C.bgHigh, padding: '48px 32px',
                    textAlign: 'center', display: 'flex', flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <span className="metric-val" style={{
                      fontFamily: font.head, fontWeight: 700,
                      fontSize: 'clamp(44px, 6vw, 64px)',
                      color: C.primary, display: 'block', marginBottom: '8px',
                      letterSpacing: '-0.04em',
                    }}>{m.value}</span>
                    <span style={{
                      fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                      letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ══ NEXT PROJECT ═══════════════════════════════════ */}
            {index + 1 < (PROJECTS.length) ? (<><section className="pp-reveal" style={{
              borderTop: `1px solid rgba(72,72,72,0.2)`, paddingTop: '96px',
              cursor: 'pointer',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '32px',
              }} className="next-proj-row">
                <div>
                  <span style={{
                    fontFamily: font.label, fontSize: '13px', color: C.muted,
                    letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block',
                    marginBottom: '16px',
                  }}>Next Project</span>
                  <h2 className="next-proj-title" style={{
                    fontFamily: font.head, fontWeight: 700,
                    fontSize: 'clamp(36px, 6vw, 72px)',
                    letterSpacing: '-0.04em', textTransform: 'uppercase',
                    color: C.text, transition: 'color 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = C.primary}
                    onMouseLeave={e => e.currentTarget.style.color = C.text}
                  >{formatText(PROJECTS[index + 1]?.title)}</h2>
                </div>
                <a href={`/projects/${parseInt(id) + 1}`} style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  border: `1px solid rgba(250,189,0,0.25)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '28px', color: C.text,
                  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
                  flexShrink: 0,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = C.primary
                    e.currentTarget.style.borderColor = C.primary
                    e.currentTarget.style.color = C.onPrim
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(250,189,0,0.25)'
                    e.currentTarget.style.color = C.text
                  }}
                >→</a>
              </div>
            </section></>) : (<p></p>)}

          </div>{/* /pp-wrap */}
        </main>

      </div>

      {/* Gallery image hover effect via global style */}
      <style>{`
        .gallery-item:hover .gallery-img {
          filter: grayscale(0%) !important;
          opacity: 1 !important;
        }
        .challenge-grid:hover .challenge-img {
          transform: scale(1.05);
        }
        @media (max-width: 600px) {
          .arch-section {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
          padding: 48px 0 !important;
        }
        .arch-sticky {
          position: static !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          order: -1 !important;
        }
        .arch-sticky h2 {
          text-align: left !important;
          font-size: 28px !important;
        }
              }
      `}</style>
    </>
  )
}