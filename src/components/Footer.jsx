'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
  const ref = useRef(null)
  const links = [{ label: 'GITGUB', url: "https://github.com/Tharindu9910" }, { label: 'LINKEDIN', url: "https://www.linkedin.com/in/tharindu-thennakoon" }, { label: 'MEDIUM', url: "https://medium.com/@tharindutkt" }]
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(ref.current,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 95%' },
      }
    )
  }, [])

  return (
    <><style>{`@media (max-width: 600px) {
  .footer-inner {
    flex-direction: column-reverse !important;
    align-items: center !important;
    text-align: center !important;
  }
  .footer-links {
    gap: 20px !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
  }
}`}</style>
      <footer
        id="contact"
        ref={ref}
        style={{ background: '#191919', borderTop: '1px solid #232323', padding: '32px 0' }}
      >
        <div className="container">
          <div
            className="footer-inner"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}
          >
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: '#B3B3B3',
              letterSpacing: '0.02em',
            }}>
              © 2026. BUILT BY &lt;T<span className='text-[#FFD000]'>T</span>/&gt;.
            </span>

            <div className="footer-links" style={{ display: 'flex', gap: '32px' }}>
              {links.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#B3B3B3',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = '#FFF'; e.target.style.textDecoration = 'underline' }}
                  onMouseLeave={(e) => { e.target.style.color = '#B3B3B3'; e.target.style.textDecoration = 'none' }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer></>
  )
}
