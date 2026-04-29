'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */
const STACK = [
  {
    icon: '▣',
    label: 'FRONTEND',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand' , "Flutter"],
  },
  {
    icon: '■',
    label: 'BACKEND',
    items: ['Python / Node.js', 'Flask / FastAPI / Django', 'PostgreSQL', 'MongoDB / Firestore', 'Neo4J'],
  },
  {
    icon: '☁',
    label: 'CLOUD',
    items: ['GCP / AWS Ecosystems', 'Serverless Arch'],
  },
  {
    icon: '⊞',
    label: 'INFRASTRUCTURE',
    items: ['CI/CD Pipelines', 'Docker' ],
  },
]

const EXPERIENCE = [
  {
    period: 'AUG 2024 — PRESENT',
    role: 'Full-Stack Developer',
    company: 'EBridge Solutions',
    summary:
      '',
    achievements: [
      'Designed and developed scalable backend services serving 500+ active users with sub-100ms response times',
      'Improved data retrieval throughput by ~40% through optimized REST APIs and database queries',
      'Developed graph-based data models using Neo4j and Cypher for complex relational data',
      'Implemented secure authentication using JWT, RBAC, and bcrypt password hashing',
      'Containerized applications with Docker and deployed on Google Cloud Run with zero-downtime',
      'Built MQTT-based real-time messaging system using Mosquitto for device communication',
      'Reduced API latency by ~30% through profiling and performance optimization'
    ],
  },
  {
    period: 'FEB 2024 — AUG 2021',
    role: 'Junior Software Engineer',
    company: 'EBridge Solutions',
    summary:
      'Contributed to frontend and mobile application development, delivering production-ready features in an agile environment.',
    achievements: [
      'Developed responsive frontend applications using React.js and Next.js with consistent feature delivery',
      'Built cross-platform mobile modules using Flutter and Riverpod',
      'Actively participated in agile processes including daily scrums and sprint planning',
    ],
  },
]

const CONTACT = [
  { icon: '@',   label: 'SEND EMAIL',          value: 'tharindutkt@gmail.com',      href: 'mailto:tharindutkt@gmail.com' },
  { icon: '</>',  label: 'GITHUB PROFILE',      value: 'github.com/Tharindu9910', href: 'https://github.com/Tharindu9910'  },
  { icon: '↗',   label: 'PROFESSIONAL NETWORK', value: 'linkedin.com/in/tharindu-thennakoon', href:'https://www.linkedin.com/in/tharindu-thennakoon'},
]

/* ═══════════════════════════════════════════════════════════════
   ATOMS
═══════════════════════════════════════════════════════════════ */
function SectionLabel({ text }) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif', fontWeight: 700,
      fontSize: '12px', letterSpacing: '0.25em',
      color: '#FFD000', textTransform: 'uppercase',
      marginBottom: '32px',
    }}>
      {text}
    </p>
  )
}

function HR() {
  return <div style={{ width:'100%', height:'1px', background:'#1c1c1c', margin:'64px 0' }} />
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function ResumePage() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.rp-back',     { opacity:0, x:-12 }, { opacity:1, x:0, duration:0.4 })
      .fromTo('.rp-name',     { opacity:0, y:48  }, { opacity:1, y:0, duration:0.75 }, '-=0.1')
      .fromTo('.rp-tagline',  { opacity:0, y:24  }, { opacity:1, y:0, duration:0.55 }, '-=0.35')
      .fromTo('.rp-meta',     { opacity:0        }, { opacity:1,       duration:0.5  }, '-=0.25')

    // Scroll sections
    gsap.utils.toArray('.rp-section').forEach(el => {
      gsap.fromTo(el,
        { opacity:0, y:30 },
        { opacity:1, y:0, duration:0.65, ease:'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' } }
      )
    })

    gsap.fromTo('.exp-entry',
      { opacity:0, y:22 },
      { opacity:1, y:0, duration:0.6, stagger:0.18, ease:'power3.out',
        scrollTrigger: { trigger: '.journal-section', start: 'top 80%' } }
    )
  }, [])

  /* Shared text styles */
  const label10 = {
    fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'10px',
    letterSpacing:'0.14em', textTransform:'uppercase',
  }

  return (
    <>
      {/* ── Global scoped responsive CSS ── */}
      <style>{`
  .rp-wrap { max-width:1240px; margin:0 auto; padding:0 48px; }
  .stack-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
  .exp-grid { display:grid; grid-template-columns:1fr 2fr; gap:40px; }
  .bottom-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; }
  .stack-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; }

  @media (max-width: 960px) {
    .stack-grid  { grid-template-columns:repeat(2,1fr) !important; gap:28px !important; }
    .exp-grid    { grid-template-columns:1fr !important; gap:14px !important; }
    .bottom-grid { grid-template-columns:1fr !important; gap:40px !important; }
    .rp-hero-row { flex-direction:column !important; align-items:flex-start !important; gap:20px !important; }
    .rp-meta     { text-align:left !important; flex-direction:row !important; gap:40px !important; align-items:center !important; }
  }
  @media (max-width: 600px) {
    .rp-wrap      { padding:0 20px !important; }
    .stack-grid   { grid-template-columns:1fr !important; gap:22px !important; }
    .rp-name      { font-size:clamp(36px,12vw,60px) !important; }
    .stack-header { flex-direction:column !important; gap:16px !important; }
    .resume-btn   { width:100% !important; justify-content:center !important; }
    .rp-hero-row  { margin-bottom:40px !important; }
    .rp-meta      { flex-direction:column !important; gap:20px !important; width:100% !important; }
    .rp-tagline   { max-width:100% !important; font-size:14px !important; }
    .rp-meta-btn  { width:100% !important; text-align:center !important; display:block !important; }
  .rp-meta-items { flex-direction:row !important; gap:32px !important; }
  }
`}</style>

      <div style={{ background:'#111', minHeight:'100vh', paddingTop:'80px' }}>
        <div className="rp-wrap">

          {/* ── BACK ── */}
          <div className="rp-back" style={{ paddingTop:'36px', marginBottom:'44px' }}>
            <Link href="/" style={{
              ...label10, color:'#444', textDecoration:'none',
              display:'inline-flex', alignItems:'center', gap:'8px',
              transition:'color 0.2s',
            }}
            onMouseEnter={e=>e.currentTarget.style.color='#888'}
            onMouseLeave={e=>e.currentTarget.style.color='#444'}
            >← BACK TO HOME
            </Link>
          </div>

          {/* ══ HERO ═══════════════════════════════════════════ */}
          <div className="rp-hero-row" style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'flex-start', gap:'32px', marginBottom:'64px',
          }}>
            {/* Name + tagline */}
            <div style={{ flex:'1 1 60px', minWidth:0 }}>
              <h1 className="rp-name" style={{
                fontFamily:'Oswald,sans-serif', fontWeight:700,
                fontSize:'clamp(52px,8.5vw,96px)',
                lineHeight:0.93, letterSpacing:'-0.03em',
                color:'#FFF', textTransform:'uppercase',
                marginBottom:'22px',
              }}>
                ABOUT<span style={{ color:'#FFD000' }}>.</span>ME
                <span style={{ color:'#FFD000', fontSize:'0.85em' }}>.</span>
              </h1>
              <p className="rp-tagline" style={{
                fontFamily:'Inter,sans-serif', fontWeight:400,
                fontSize:'clamp(13px,1.5vw,15.5px)', color:'#777',
                lineHeight:1.7, maxWidth:'420px',
              }}>
                Full-Stack Engineer crafting{' '}
                <strong style={{ color:'#DDD', fontWeight:600 }}>
                  high-concurrency distributed systems
                </strong>{' '}
                and precision-engineered frontends.
              </p>
            </div>

            {/* Availability / Base */}
            <div className="rp-meta" style={{
  display:'flex', flexDirection:'column', gap:'22px',
  textAlign:'right', paddingTop:'6px', flexShrink:0,
}}>
  <div style={{ display:'flex', gap:'40px' }} className="rp-meta-items">
    <div>
      <p style={{ ...label10, color:'#333', marginBottom:'5px' }}>AVAILABILITY</p>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:'14px', fontWeight:600, color:'#FFD000' }}>
        Open for Work
      </p>
    </div>
    <div>
      <p style={{ ...label10, color:'#333', marginBottom:'5px' }}>BASE</p>
      <p style={{ fontFamily:'Inter,sans-serif', fontSize:'14px', color:'#BBB' }}>
        SriLanka, CMB
      </p>
    </div>
  </div>
  <button onClick={()=>{
         window.location.href='https://drive.google.com/uc?export=download&id=1BXEZ9GyIpTQHSMXA-NmbLz7R53lLHRbE'
        }} className="btn btn-primary rp-meta-btn">
    DOWNLOAD RESUME
  </button>
</div>
          </div>

          <HR />

          {/* ══ STACK_CORE ═════════════════════════════════════ */}
          <div className="rp-section">
            <SectionLabel text="STACK_CORE" />
            <div className="stack-header">
              {/* 4-col grid */}
              <div className="stack-grid" style={{ flex:1 }}>
                {STACK.map(col => (
                  <div key={col.label}>
                    <div style={{
                      display:'flex', alignItems:'center', gap:'7px', marginBottom:'16px',
                    }}>
                      <span style={{ color:'#FFD000', fontSize:'11px' }}>{col.icon}</span>
                      <span style={{
                        fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'10.5px',
                        color:'#EEE', letterSpacing:'0.14em', textTransform:'uppercase',
                      }}>{col.label}</span>
                    </div>
                    {col.items.map(item => (
                      <p key={item} style={{
                        fontFamily:'Inter,sans-serif', fontSize:'13.5px',
                        color:'#757474', lineHeight:1, marginBottom:'13px',
                        transition:'color 0.15s',
                      }}
                      onMouseEnter={e=>e.currentTarget.style.color='#999'}
                      onMouseLeave={e=>e.currentTarget.style.color='#757474'}
                      >{item}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Resume download — sits right of the grid */}
              <div style={{ paddingLeft:'32px', flexShrink:0 }}>
                <a href="#" className="resume-btn" style={{
                  fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:'11px',
                  letterSpacing:'0.1em', textTransform:'uppercase',
                  background:'#FFD000', color:'#111',
                  padding:'12px 22px', borderRadius:'3px',
                  textDecoration:'none', display:'inline-flex',
                  alignItems:'center', gap:'8px',
                  transition:'background 0.2s', whiteSpace:'nowrap',
                }}
                onMouseEnter={e=>e.currentTarget.style.background='#FFC300'}
                onMouseLeave={e=>e.currentTarget.style.background='#FFD000'}
                >↓ FULL RESUME</a>
              </div>
            </div>
          </div>

          <HR />

          {/* ══ JOURNAL.EXP ════════════════════════════════════ */}
          <div className="rp-section journal-section">
            <SectionLabel text="JOURNAL.EXP" />

            <div style={{ display:'flex', flexDirection:'column' }}>
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-entry exp-grid" style={{
                  paddingBottom:'52px',
                  borderBottom: i < EXPERIENCE.length - 1 ? '1px solid #191919' : 'none',
                  marginBottom: i < EXPERIENCE.length - 1 ? '52px' : '0',
                }}>
                  {/* Left */}
                  <div>
                    <p style={{
                      ...label10, color:'#FFD000', marginBottom:'10px',
                    }}>{exp.period}</p>
                    <h3 style={{
                      fontFamily:'Inter,sans-serif', fontWeight:700,
                      fontSize:'clamp(17px,2vw,23px)',
                      color:'#FFF', lineHeight:1.2, marginBottom:'7px',
                    }}>{exp.role}</h3>
                    <p style={{ ...label10, color:'#878686' }}>{exp.company}</p>
                  </div>

                  {/* Right */}
                  <div>
                    <p style={{
                      fontFamily:'Inter,sans-serif', fontSize:'13.5px',
                      color:'#878686', lineHeight:1.72, marginBottom:'22px',
                    }}>{exp.summary}</p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                      {exp.achievements.map((ach, ai) => (
                        <div key={ai} style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
                          <span style={{
                            ...label10, color:'#FFD000', minWidth:'18px', paddingTop:'2px',
                          }}>0{ai + 1}</span>
                          <p style={{
                            fontFamily:'Inter,sans-serif', fontSize:'13px',
                            color:'#757474', lineHeight:1.68,
                          }}>{ach}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <HR />

          {/* ══ ACADEMIC + DIRECT.CH ═══════════════════════════ */}
          <div className="rp-section bottom-grid" style={{ paddingBottom:'96px' }}>

            {/* ACADEMIC */}
            <div>
              <SectionLabel text="ACADEMIC" />
              <p style={{ ...label10, color:'#FFD000', marginBottom:'8px' }}>
                2021 — 2024
              </p>
              <h3 style={{
                fontFamily:'Inter,sans-serif', fontWeight:700,
                fontSize:'20px', color:'#FFF', marginBottom:'7px',
              }}>B.Sc. in Physical Science (ICT)</h3>
              <p style={{
                fontFamily:'Inter,sans-serif', fontSize:'13px', color:'#555',
                lineHeight:1.6, marginBottom:'32px',
              }}>
                University of Sri Jayewardenepura
              </p>

              {/* Quote */}
              <div style={{
                borderLeft:'2px solid #FFD000', paddingLeft:'18px',
              }}>
                <p style={{
                  fontFamily:'Inter,sans-serif', fontStyle:'italic',
                  fontSize:'13px', color:'#444', lineHeight:1.75,
                }}>
                  • Proficient in Software Development principles, Networking fundamentals, and optimized Data Structures.
                </p>
                <p style={{
                  fontFamily:'Inter,sans-serif', fontStyle:'italic',
                  fontSize:'13px', color:'#444', lineHeight:1.75,
                }}>
                  • Strong background in higher mathematics, including Linear Algebra, Calculus, and Complex Analysis.
                </p>
              </div>
            </div>

            {/* DIRECT.CH */}
            <div>
              <SectionLabel text="DIRECT.CH" />
              <div style={{ display:'flex', flexDirection:'column' }}>
                {CONTACT.map((c, i) => (
                  <a key={i} href={c.href} style={{
                    display:'flex', alignItems:'center', gap:'16px',
                    padding:'14px 12px',
                    borderBottom:'1px solid #181818',
                    textDecoration:'none',
                    borderRadius:'6px',
                    transition:'background 0.15s',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,208,0,0.04)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}
                  >
                    {/* Icon */}
                    <div style={{
                      width:'40px', height:'40px',
                      background:'#191919', borderRadius:'6px',
                      display:'flex', alignItems:'center',
                      justifyContent:'center', flexShrink:0,
                      border:'1px solid #222',
                    }}>
                      <span style={{
                        fontFamily:'monospace', fontSize:'11px', color:'#FFD000',
                        fontWeight:700,
                      }}>{c.icon}</span>
                    </div>
                    <div>
                      <p style={{
                        ...label10, color:'#333', marginBottom:'3px', fontSize:'9px',
                      }}>{c.label}</p>
                      <p style={{
                        fontFamily:'Inter,sans-serif', fontSize:'14px',
                        fontWeight:500, color:'#CCC',
                      }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
          {/* /bottom-grid */}

        </div>{/* /rp-wrap */}
      </div>
    </>
  )
}