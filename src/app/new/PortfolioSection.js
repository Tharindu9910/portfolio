'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

/* ─── Syntax-highlighted code rows ─────────────────────────── */
const CODE_ROWS = [
  [['plain','  $ '],['kw','keep-alive'],['plain',': @stream();']],
  [['plain','     '],['kw','machineCluster'],['plain',': ('],['str','distributed'],['plain',');']],
  [['plain','  $ '],['kw','host-redirect'],['plain',': '],['str','"svc and host"'],['plain',';']],
  [['plain','     '],['kw','controller'],['plain',': '],['str','"timed-up"'],['plain',';']],
  [['plain','  $ '],['kw','partitioning'],['plain',': [item or timed-up];']],
  [['plain','  $ '],['kw','patchContainer'],['plain',': [allow or timed-up];']],
  [['plain','  $ mode  $ node  $ ['],['str','"run  or  timed-up"'],['plain','];']],
  [['plain','  $ '],['kw','machineStorage'],['plain',': S (use as $ class);']],
  [['plain','  $ '],['kw','authorizedBuildingStorage'],['plain',': '],['str','"Deploying: S"'],['plain',';']],
  [['plain','  $ module namespace: '],['str','"S or class storage"'],['plain',';']],
  [['plain','  $ '],['kw','reconfirmStorage'],['plain',':  containers: storage--merging-strategy();']],
  [['plain','  $ '],['kw','machineStorage'],['plain',' containers: --containers- --storage (default);']],
  [['plain','     module APPS (1 run (1) instance );']],
  [['plain','  $ monitor APPS.configure.web {1};']],
  [['plain','  $ '],['kw','deploymentStrategy'],['plain',': rolling-update(max=2);']],
  [['plain','     '],['kw','healthCheck'],['plain',': { path: '],['str','"/health"'],['plain',', interval: 30 }']],
  [['plain','  $ '],['kw','autoscale'],['plain',': { min: 2, max: 50, cpu: '],['num','80'],['plain',' };']],
  [['plain','  $ monitor APPS.replica.set { active: '],['num','12'],['plain',' };']],
]

const SEG_COLORS = { kw:'#FFD000', str:'#86efac', num:'#fda4af', plain:'#777' }

function CodeBlock() {
  return (
    <div style={{
      background:'#0b0b0b', borderRadius:'10px', padding:'16px 18px',
      flex:1, overflow:'hidden', position:'relative', minHeight:0,
    }}>
      <div style={{
        fontFamily:"'Fira Code','Courier New',monospace",
        fontSize:'10px', lineHeight:'1.72', whiteSpace:'pre', overflow:'hidden',
      }}>
        {CODE_ROWS.map((segs, ri) => (
          <div key={ri}>
            <span style={{ color:'#2d2d2d', userSelect:'none', marginRight:'14px',
              display:'inline-block', width:'16px', textAlign:'right' }}>
              {ri + 1}
            </span>
            {segs.map(([type, text], si) => (
              <span key={si} style={{ color: SEG_COLORS[type] || '#777' }}>{text}</span>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, height:'48px',
        background:'linear-gradient(transparent,#0b0b0b)', pointerEvents:'none',
      }}/>
    </div>
  )
}

/* ─── Tag pills (square, yellow-active) ─────────────────────── */
function Tags({ tabs, activeStyle = false }) {
  const [active, setActive] = useState(0)
  return (
    <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
      {tabs.map((tab, i) => (
        activeStyle
          ? (
            <button key={tab} onClick={() => setActive(i)} style={{
              fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'10px',
              letterSpacing:'0.07em', textTransform:'uppercase',
              padding:'3px 9px', borderRadius:'3px', border:'none',
              background: active===i ? '#FFD000' : '#1d1d1d',
              color: active===i ? '#111' : '#666',
              cursor:'pointer', transition:'all 0.15s',
            }}>{tab}</button>
          ) : (
            <span key={tab} style={{
              fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'10px',
              color:'#999', letterSpacing:'0.08em', textTransform:'uppercase',
            }}>{tab} {i < tabs.length - 1 && <span style={{ color:'#333', marginLeft:'2px' }}>·</span>}</span>
          )
      ))}
    </div>
  )
}

/* ─── Bottom link row ───────────────────────────────────────── */
function LinkRow({ linkText, indexLabel }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <a href="#" style={{
        fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'11px',
        color:'#888', textDecoration:'none', letterSpacing:'0.1em',
        textTransform:'uppercase', display:'flex', alignItems:'center', gap:'5px',
        transition:'color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.color='#FFF'}
      onMouseLeave={e => e.currentTarget.style.color='#888'}
      >
        {linkText} ↗
      </a>
      {indexLabel && (
        <span style={{
          fontFamily:'Inter,sans-serif', fontSize:'10px',
          color:'#2a2a2a', letterSpacing:'0.1em', textTransform:'uppercase',
        }}>{indexLabel}</span>
      )}
    </div>
  )
}

/* ─── Card base style ───────────────────────────────────────── */
function useCardHover() {
  const [h, setH] = useState(false)
  return [h, { onMouseEnter:()=>setH(true), onMouseLeave:()=>setH(false) }]
}
const CARD_BASE = (hovered) => ({
  background:'#151515',
  border:`1px solid ${hovered ? '#282828' : '#1c1c1c'}`,
  borderRadius:'14px',
  transition:'border-color 0.2s, box-shadow 0.2s',
  boxShadow: hovered ? '0 4px 32px rgba(255,208,0,0.05)' : 'none',
  overflow:'hidden',
})

/* ─── CARD TYPE A: code + text (tall left) ──────────────────── */
function CardA({ tabs, title, description, linkText, indexLabel }) {
  const [h, handlers] = useCardHover()
  return (
    <div {...handlers} style={{
      ...CARD_BASE(h), padding:'22px', display:'flex',
      flexDirection:'column', gap:'16px', height:'100%', minHeight:'500px',
    }}>
      <Tags tabs={tabs} activeStyle={true} />
      <CodeBlock />
      <div>
        <h3 style={{
          fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:'21px',
          color:'#FFF', textTransform:'uppercase', letterSpacing:'-0.01em', marginBottom:'8px',
        }}>{title}</h3>
        <p style={{
          fontFamily:'Inter,sans-serif', fontSize:'13px', color:'#777',
          lineHeight:1.65, marginBottom:'18px',
        }}>{description}</p>
        <LinkRow linkText={linkText} indexLabel={indexLabel} />
      </div>
    </div>
  )
}

/* ─── CARD TYPE B: image fills + text below (tall right) ────── */
function CardB({ tabs, image, imageAlt, title, description, linkText, indexLabel }) {
  const [h, handlers] = useCardHover()
  return (
    <div {...handlers} style={{
      ...CARD_BASE(h), padding:'22px', display:'flex',
      flexDirection:'column', height:'100%', minHeight:'500px',
    }}>
      <div style={{ marginBottom:'16px' }}>
        <Tags tabs={tabs} activeStyle={true} />
      </div>
      {/* image */}
      <div style={{
        position:'relative', flex:1, borderRadius:'10px',
        overflow:'hidden', background:'#080808', minHeight:'220px', marginBottom:'20px',
      }}>
        <Image
          src={image} alt={imageAlt} fill
          style={{ objectFit:'cover', opacity:0.5, filter:'grayscale(15%) contrast(1.15)' }}
          sizes="(max-width:768px) 100vw, 50vw"
        />
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to bottom,rgba(21,21,21,0) 40%,rgba(21,21,21,0.9) 100%)',
        }}/>
      </div>
      <div>
        <h3 style={{
          fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:'21px',
          color:'#FFF', textTransform:'uppercase', letterSpacing:'-0.01em', marginBottom:'8px',
        }}>{title}</h3>
        <p style={{
          fontFamily:'Inter,sans-serif', fontSize:'13px', color:'#777',
          lineHeight:1.65, marginBottom:'18px',
        }}>{description}</p>
        <LinkRow linkText={linkText} indexLabel={indexLabel} />
      </div>
    </div>
  )
}

/* ─── CARD TYPE C: thumbnail left + text right (short bottom) ─ */
function CardC({ tabs, image, imageAlt, title, description, linkText }) {
  const [h, handlers] = useCardHover()
  return (
    <div {...handlers} style={{ ...CARD_BASE(h), padding:'22px' }}>
      <div className="card-small-inner" style={{ display:'flex', gap:'18px', alignItems:'flex-start' }}>
        {/* thumbnail */}
        <div className="card-small-thumb" style={{
          position:'relative', width:'108px', height:'108px',
          borderRadius:'10px', overflow:'hidden', flexShrink:0, background:'#080808',
        }}>
          <Image
            src={image} alt={imageAlt} fill
            style={{ objectFit:'cover', opacity:0.45, filter:'grayscale(20%) contrast(1.15)' }}
            sizes="120px"
          />
          <div style={{
            position:'absolute', inset:0,
            background:'linear-gradient(135deg,transparent 40%,rgba(21,21,21,0.7))',
          }}/>
        </div>
        {/* text */}
        <div style={{ flex:1, minWidth:0 }}>
          <Tags tabs={tabs} activeStyle={false} />
          <h3 style={{
            fontFamily:'Oswald,sans-serif', fontWeight:700, fontSize:'19px',
            color:'#FFF', textTransform:'uppercase', letterSpacing:'-0.01em',
            margin:'8px 0 8px',
          }}>{title}</h3>
          <p style={{
            fontFamily:'Inter,sans-serif', fontSize:'12.5px', color:'#777',
            lineHeight:1.6, marginBottom:'12px',
          }}>{description}</p>
          <a href="#" style={{
            fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:'10px',
            color:'#FFD000', textDecoration:'none', letterSpacing:'0.12em',
            textTransform:'uppercase', transition:'opacity 0.2s',
          }}
          onMouseEnter={e=>e.currentTarget.style.opacity='0.6'}
          onMouseLeave={e=>e.currentTarget.style.opacity='1'}
          >{linkText}</a>
        </div>
      </div>
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export default function PortfolioSection() {
  const secRef  = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(secRef.current?.querySelector('.p-heading'),
      { y:28, opacity:0 },
      { y:0, opacity:1, duration:0.7, ease:'power3.out',
        scrollTrigger:{ trigger:secRef.current, start:'top 84%' } }
    )
    ;[row1Ref,row2Ref].forEach(r => {
      const cards = r.current?.querySelectorAll('.p-card')
      if(!cards) return
      gsap.fromTo(cards,
        { y:44, opacity:0, scale:0.97 },
        { y:0, opacity:1, scale:1, duration:0.7, ease:'power3.out', stagger:0.13,
          scrollTrigger:{ trigger:r.current, start:'top 86%' } }
      )
    })
  }, [])

  return (
    <section id="experience" ref={secRef}
      style={{ background:'#111111', padding:'80px 0 96px' }}
    >
      <div className="portfolio-section-inner"
        style={{ maxWidth:'1240px', margin:'0 auto', padding:'0 48px' }}
      >
        {/* Header */}
        <div className="p-heading" style={{ marginBottom:'40px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
            <div style={{ width:'32px', height:'2px', background:'#FFD000', flexShrink:0 }}/>
            <span style={{
              fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'12px',
              color:'#FFD000', letterSpacing:'0.14em', textTransform:'uppercase',
            }}>PORTFOLIO</span>
          </div>
          <div style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'flex-end', flexWrap:'wrap', gap:'16px',
          }}>
            <h2 style={{
              fontFamily:'Oswald,sans-serif', fontWeight:700,
              fontSize:'clamp(38px,5.5vw,64px)', lineHeight:0.97,
              letterSpacing:'-0.025em', color:'#FFF', textTransform:'uppercase',
            }}>
              CORE SYSTEM<br/>ARCHITECTURE
            </h2>
            <a href="#" style={{
              fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:'12px',
              color:'#555', textDecoration:'none', letterSpacing:'0.1em',
              textTransform:'uppercase', display:'flex', alignItems:'center',
              gap:'5px', transition:'color 0.2s', paddingBottom:'4px', flexShrink:0,
            }}
            onMouseEnter={e=>e.currentTarget.style.color='#999'}
            onMouseLeave={e=>e.currentTarget.style.color='#555'}
            >
              TECHNICAL ARCHIVE →
            </a>
          </div>
        </div>

        {/* Row 1 – two tall cards */}
        <div ref={row1Ref} className="portfolio-row">
          <div className="p-card" style={{ display:'flex' }}>
            <CardA
              tabs={['KUBERNETES','GO','GRPC']}
              title="NEXUS CLOUD CORE"
              description="High-throughput distributed infrastructure designed for 10M+ concurrent websocket connections with sub-50ms global latency."
              linkText="SYSTEM SPECS"
              indexLabel="01 / ARCH"
            />
          </div>
          <div className="p-card" style={{ display:'flex' }}>
            <CardB
              tabs={['RUST','POSTGRESBOL']}
              image="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=900&q=80"
              imageAlt="Dark abstract 3D stacked architecture layers"
              title="APEX LEDGER"
              description="Real-time financial reconciliation engine processing billions in volume with ACID-compliant transactional integrity."
              linkText="VIEW CASE STUDY"
              indexLabel="02 / FIN"
            />
          </div>
        </div>

        {/* Row 2 – two short cards */}
        <div ref={row2Ref} className="portfolio-row-sm">
          <div className="p-card">
            <CardC
              tabs={['GRAPHQL','NODE.JS']}
              image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"
              imageAlt="Dark circuit board network visualization"
              title="VANGUARD API"
              description="Unified data gateway serving 15+ internal services with automated schema generation and rate-limiting."
              linkText="ARCHITECTURE SPECS"
            />
          </div>
          <div className="p-card">
            <CardC
              tabs={['REACT NATIVE','AWS LAMBDA']}
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
              imageAlt="Circular radar scan from space"
              title="TITAN MOBILE"
              description="High-performance cross-platform logistics application with offline-first synchronization for field engineers."
              linkText="FULL BREAKDOWN"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
