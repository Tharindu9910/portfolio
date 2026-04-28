'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  {
    num: '01',
    title: 'SYSTEM DESIGN',
    desc: 'Distributed architectures and microservices built for 99.9% uptime.',
  },
  {
    num: '02',
    title: 'FRONTEND EXCELLENCE',
    desc: 'Crafting immersive user interfaces with React, Next.js, and precision TailwindCSS.',
  },
  {
    num: '03',
    title: 'BACKEND SCALABILITY',
    desc: 'Robust server-side logic using Python, Node.js, Nest.js, and complex database schemas.',
  },
  {
    num: '04',
    title: 'MOBILE FIRST',
    desc: 'Native-quality cross-platform experiences via Flutter.',
  },
]

export default function FeatureGrid() {
  const gridRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    const items = gridRef.current?.querySelectorAll('.feature-item')
    if (!items) return
    gsap.fromTo(items,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      }
    )
  }, [])

  return (
    <section style={{ background: '#111111', padding: '0 0 var(--section-gap)' }}>
      <div className="container">
        <div style={{ borderTop: '1px solid #232323', paddingTop: '64px' }}>
          <div
            ref={gridRef}
            className="feature-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}
          >
            {features.map((f) => (
              <div key={f.num} className="feature-item">
                <span style={{
                  fontFamily: 'Oswald, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  color: '#FFD000',
                  display: 'block',
                  marginBottom: '14px',
                }}>
                  {f.num}
                </span>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '12px',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  color: '#B3B3B3',
                  lineHeight: 1.65,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
