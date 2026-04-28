'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: '80px',
          background: '#111111',
          borderBottom: '1px solid #232323',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {/* Logo */}
          <a href={'#'}><span style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: '24px',
            color: '#FFFFFF',
            letterSpacing: '-0.02em',
          }}>
          &lt;T<span className='text-[#FFD000]'>T</span>/&gt;
          </span></a>

          {/* Center links */}
          <div className="nav-center" style={{ display: 'flex', gap: '48px' }}>
            {/* {['PROJECTS', 'EXPERIENCE', 'CONTACT'].map((link) => (
              <a key={link} href={`/${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            ))} */}
            <Link key={1} href={`/#`} className="nav-link">
                HOME
              </Link>
             <Link key={2} href={`/#project-list`} className="nav-link">
                PROJECTS
              </Link>
              <Link key={3} href={`/contact`} className="nav-link">
                CONTACT
              </Link>
          </div>

          {/* Resume CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="/resume"
              className="nav-resume btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              RESUME
            </a>
            {/* Hamburger */}
            
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {['PROJECTS', 'EXPERIENCE', 'CONTACT'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: '18px' }}
          >
            {link}
          </a>
        ))}
        <a href="#" className="btn btn-primary" style={{ width: 'fit-content' }}>RESUME</a>
      </div>
    </>
  )
}
