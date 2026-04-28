'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════════ */
const TECH_STACK = ['React', 'Flask', 'Neo4j', 'Firestore', 'GCP']

const META = [
  { label: 'Role',      value: 'Lead Full Stack Engineer', span: 1 },
  { label: 'Timeline',  value: '8 Months (2023)',          span: 1 },
  { label: 'Tech Stack', value: null,                      span: 2 },
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
  { value: '30%',   label: 'Query Latency Reduction' },
  { value: '15+',   label: 'Microservices on GCP' },
]

const FOOTER_LINKS = [
  { col: ['Github', 'LinkedIn', 'Twitter'] },
  { col: ['Case Studies', 'Documentation', 'Privacy'] },
]

/* ═══════════════════════════════════════════════════════════════
   TINY ATOMS
═══════════════════════════════════════════════════════════════ */
const C = {
  bg:       '#0e0e0e',
  bgCard:   '#131313',
  bgHigh:   '#191a1a',
  bgHigher: '#252626',
  primary:  '#fabd00',
  onPrim:   '#533d00',
  text:     '#e7e5e4',
  muted:    '#acabaa',
  border:   'rgba(72,72,72,0.2)',
  borderFaint: 'rgba(72,72,72,0.1)',
}

const font = {
  head: "'Space Grotesk', sans-serif",
  body: "'Manrope', sans-serif",
  label: "'Inter', sans-serif",
}

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 32px',
      background: scrolled ? 'rgba(14,14,14,0.85)' : 'rgba(14,14,14,0.4)',
      backdropFilter: 'blur(20px)',
      transition: 'background 0.3s',
      borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
    }}>
      <span style={{ fontFamily: font.head, fontWeight: 700, fontSize: '20px',
        letterSpacing: '-0.04em', color: C.primary }}>MONOLITH</span>

      {/* Desktop links */}
      <div className="nav-links" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {['Work', 'Expertise', 'Process', 'About'].map((item, i) => (
          <a key={item} href="#" style={{
            fontFamily: font.head, fontWeight: 700, fontSize: '13px',
            letterSpacing: '-0.02em', textTransform: 'uppercase',
            color: i === 0 ? C.primary : C.muted,
            textDecoration: 'none',
            borderBottom: i === 0 ? `2px solid ${C.primary}` : 'none',
            paddingBottom: i === 0 ? '4px' : '0',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => { if(i>0) e.currentTarget.style.color = C.text }}
          onMouseLeave={e => { if(i>0) e.currentTarget.style.color = C.muted }}
          >{item}</a>
        ))}
      </div>

      <button style={{
        fontFamily: font.head, fontWeight: 700, fontSize: '13px',
        letterSpacing: '-0.02em', textTransform: 'uppercase',
        background: C.primary, color: C.onPrim,
        padding: '10px 24px', border: 'none', cursor: 'pointer',
        transition: 'transform 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >Start Project</button>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ProjectPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Hero
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.pp-label',   { opacity:0, y:12 }, { opacity:1, y:0, duration:0.4 })
      .fromTo('.pp-h1',      { opacity:0, y:50 }, { opacity:1, y:0, duration:0.8 }, '-=0.1')
      .fromTo('.pp-desc',    { opacity:0, y:20 }, { opacity:1, y:0, duration:0.55 }, '-=0.4')
      .fromTo('.pp-meta',    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5 }, '-=0.3')
      .fromTo('.pp-hero-img',{ opacity:0       }, { opacity:1,       duration:0.7 }, '-=0.2')

    // Scroll sections
    gsap.utils.toArray('.pp-reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity:0, y:28 },
        { opacity:1, y:0, duration:0.65, ease:'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%' } }
      )
    })

    // Metrics count-up feel
    gsap.utils.toArray('.metric-val').forEach(el => {
      gsap.fromTo(el,
        { opacity:0, scale:0.85 },
        { opacity:1, scale:1, duration:0.6, ease:'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 88%' } }
      )
    })
  }, [])

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
        <Navbar />

        <main style={{ paddingTop: '128px', paddingBottom: '96px' }}>
          <div className="pp-wrap">

            {/* ══ HERO ══════════════════════════════════════════ */}
            <header style={{ marginBottom: '96px' }}>
              <div style={{ marginBottom: '64px' }}>
                <span className="pp-label" style={{
                  fontFamily: font.label, fontSize: '13px', fontWeight: 500,
                  letterSpacing: '0.2em', color: C.primary,
                  textTransform: 'uppercase', display: 'block', marginBottom: '16px',
                }}>Case Study / 01</span>

                <h1 className="pp-h1" style={{
                  fontFamily: font.head, fontWeight: 700,
                  fontSize: 'clamp(44px, 7vw, 88px)',
                  letterSpacing: '-0.04em', lineHeight: 1.0,
                  color: C.text, textTransform: 'uppercase',
                  marginBottom: '24px',
                }}>MODULAR SAAS<br />PLATFORM</h1>

                <p className="pp-desc" style={{
                  fontFamily: font.body, fontSize: 'clamp(16px, 2vw, 22px)',
                  color: C.muted, lineHeight: 1.65, maxWidth: '720px',
                }}>
                  A scalable microservices-based SaaS solution built for enterprise-grade
                  data management and real-time visualization.
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
                  <span style={{ fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '8px' }}>Role</span>
                  <span style={{ fontFamily: font.body, fontSize: '16px', fontWeight: 500 }}>
                    Lead Full Stack Engineer
                  </span>
                </div>
                <div style={{ padding: '32px', borderRight: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '8px' }}>Timeline</span>
                  <span style={{ fontFamily: font.body, fontSize: '16px', fontWeight: 500 }}>
                    8 Months (2023)
                  </span>
                </div>
                <div style={{ padding: '32px' }}>
                  <span style={{ fontFamily: font.label, fontSize: '10px', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted,
                    display: 'block', marginBottom: '10px' }}>Tech Stack</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {TECH_STACK.map(t => (
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
            <section className="pp-hero-img pp-reveal" style={{ marginBottom: '128px' }}>
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
            </section>

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
                  <p style={{ fontFamily: font.body, fontSize: '17px', color: C.muted, lineHeight: 1.75 }}>
                    The core engine was architected using a{' '}
                    <span style={{ color: C.primary }}>Microservices pattern</span>. Each functional
                    domain—Identity, Data Orchestration, and Visualization—was encapsulated within
                    its own Flask backend, allowing for independent scaling and deployment.
                  </p>
                  <p style={{ fontFamily: font.body, fontSize: '17px', color: C.muted, lineHeight: 1.75 }}>
                    We leveraged <span style={{ color: C.primary }}>Neo4j</span> for managing
                    complex, non-linear relationships between enterprise data entities, while{' '}
                    <span style={{ color: C.primary }}>Firestore</span> served as our
                    high-performance document store for real-time dashboard updates and collaboration.
                  </p>
                </div>

                {/* Code block */}
                <div style={{
                  background: '#000', padding: '28px',
                  borderLeft: `2px solid rgba(72,72,72,0.25)`,
                  overflow: 'hidden',
                }}>
                  {/* Window dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(237,127,100,0.4)' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(250,189,0,0.4)' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(172,171,170,0.2)' }} />
                    <span style={{
                      fontFamily: font.label, fontSize: '10px', color: 'rgba(172,171,170,0.4)',
                      letterSpacing: '0.18em', textTransform: 'uppercase', marginLeft: '12px',
                    }}>Architecture.py</span>
                  </div>
                  <code style={{
                    display: 'block', fontFamily: "'Fira Code','Courier New',monospace",
                    fontSize: '13px', lineHeight: 1.8, color: 'rgba(231,229,228,0.75)',
                    whiteSpace: 'pre',
                  }}>
{`  `}<span style={{ color: C.primary }}>class</span>{` MicroserviceNode:
    `}<span style={{ color: C.primary }}>def</span>{` __init__(self, service_name, db_type):
        self.name = service_name
        self.db = ConnectionPool(db_type)

  graph_engine = Neo4jEngine(uri=`}<span style={{ color: C.primary }}>"bolt://neo4j.prod"</span>{`)
  realtime_sync = FirestoreClient(project=`}<span style={{ color: C.primary }}>"monolith-saas"</span>{`)`}
                  </code>
                </div>
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
                  {['←', '→'].map((arrow, i) => (
                    <button key={i} style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      border: `1px solid rgba(72,72,72,0.5)`,
                      background: 'transparent', color: C.muted,
                      fontSize: '16px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.color = C.primary }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(72,72,72,0.5)'; e.currentTarget.style.color = C.muted }}
                    >{arrow}</button>
                  ))}
                </div>
              </div>

              <div className="gallery-grid">
                {GALLERY.map(img => (
                  <div key={img.title} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                    className="gallery-item"
                  >
                    <div style={{
                      aspectRatio: '16/10', overflow: 'hidden',
                      background: C.bgHigh, border: `1px solid ${C.borderFaint}`,
                      position: 'relative',
                    }}>
                      <Image
                        src={img.src} alt={img.alt} fill
                        style={{
                          objectFit: 'cover', opacity: 0.8,
                          filter: 'grayscale(100%)',
                          transition: 'filter 0.7s, opacity 0.7s',
                        }}
                        sizes="(max-width: 600px) 100vw, 50vw"
                        className="gallery-img"
                      />
                    </div>
                    <div>
                      <h4 style={{
                        fontFamily: font.head, fontSize: '15px', fontWeight: 700,
                        letterSpacing: '-0.02em', textTransform: 'uppercase',
                        color: C.text, marginBottom: '4px',
                      }}>{img.title}</h4>
                      <p style={{
                        fontFamily: font.label, fontSize: '12px', color: C.muted,
                        letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.65,
                      }}>{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ══ TECHNICAL CHALLENGES ══════════════════════════ */}
            <section className="pp-reveal" style={{ marginBottom: '128px' }}>
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
                    {CHALLENGES.map(c => (
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
                {METRICS.map(m => (
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
            <section className="pp-reveal" style={{
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
                  >QUANTUM ANALYTICS ENGINE</h2>
                </div>
                <div style={{
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
                >→</div>
              </div>
            </section>

          </div>{/* /pp-wrap */}
        </main>

        {/* ══ FOOTER ════════════════════════════════════════════ */}
        <footer style={{
          background: '#0a0a0a', width: '100%',
          padding: '80px 0',
          borderTop: '1px solid rgba(38,38,38,0.5)',
        }}>
          <div className="pp-wrap footer-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <span style={{
                fontFamily: font.head, fontWeight: 900, fontSize: '17px',
                color: C.primary, letterSpacing: '-0.02em',
              }}>MONOLITH ARCHITECT</span>
              <p style={{
                fontFamily: font.body, fontSize: '13px', letterSpacing: '0.04em',
                color: '#555', lineHeight: 1.7, maxWidth: '320px',
              }}>
                Engineering digital infrastructure with architectural precision
                and surgical code execution.
              </p>
              <p style={{ fontFamily: font.body, fontSize: '13px', color: '#444' }}>
                © 2024 MONOLITH ARCHITECT. ENGINEERED WITH PRECISION.
              </p>
            </div>
            <div className="footer-links-grid">
              {FOOTER_LINKS.map((group, gi) => (
                <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {group.col.map(link => (
                    <a key={link} href="#" style={{
                      fontFamily: font.body, fontSize: '13px', letterSpacing: '0.04em',
                      color: '#555', textDecoration: 'none', transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = C.primary}
                    onMouseLeave={e => e.currentTarget.style.color = '#555'}
                    >{link}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </footer>

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
          .next-proj-row { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </>
  )
}