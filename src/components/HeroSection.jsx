'use client'
import { useEffect, useRef,useState } from 'react'
import { gsap } from 'gsap'
import ScrollLabel from './ScrollLabel'
import Image from 'next/image'

export default function HeroSection() {
  const subtextRef = useRef(null)
  const buttonsRef = useRef(null)
  const labelRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const line4Ref = useRef(null)
  const line5Ref = useRef(null)
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(labelRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
      .fromTo(
        [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current, line5Ref.current],
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
        '-=0.2'
      )
      .fromTo(subtextRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      )
      .fromTo(buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      )
  }, [])

  const headingStyle = {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 700,
    lineHeight: 0.97,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    display: 'block',
  }

  return (
    <section
      id="projects"
      style={{
        background: '#111111',
        minHeight: '100vh',
        paddingTop: '10px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        className="container"
        style={{ paddingTop: 'var(--section-gap)', paddingBottom: 'var(--section-gap)', position: 'relative' }}
      >
        {/* Yellow section label */}
        <div ref={labelRef} className="section-label">
          <div className="section-label__bar" />
          <span className="section-label__text">SOFTWARE ENGINEER</span>
        </div>

        {/* 3-line heading */}
        <div
  className='flex flex-col lg:flex-row lg:justify-between'
  style={{ marginBottom: '44px' }}
>
  {/* Headings block — full width on mobile */}
  <div className='flex flex-col w-full lg:min-w-[700px]'>
    <span
      ref={line1Ref}
      className="hero-heading"
      style={{ ...headingStyle, fontSize: 'clamp(32px, 8.5vw, 96px)', color: '#FFFFFF' }}
    >
      ARCHITECTING
    </span>
    <span
      ref={line2Ref}
      className="hero-heading"
      style={{ ...headingStyle, fontSize: 'clamp(52px, 10vw, 126px)', color: '#4a4a4a' }}
    >
      FULL-STACK
    </span>
    <span
      ref={line3Ref}
      className="hero-heading"
      style={{ ...headingStyle, fontSize: 'clamp(32px, 8.5vw, 96px)', color: '#FFFFFF' }}
    >
      SOLUTIONS
    </span>
  </div>

  {/* Image + line — row on mobile, aligned end on desktop */}
  <div className='flex items-end justify-end lg:justify-end w-full lg:max-w-[400px] mt-6 lg:mt-0'>
    <div
      ref={line4Ref}
      className='border-b-2 border-yellow-300 h-full'
      style={{ width: 'clamp(60px, 15vw, 200px)' }}
    />
    <div
      ref={line5Ref}
      className='relative rounded-full overflow-hidden filter grayscale flex-shrink-0'
      style={{ width: 'clamp(72px, 15vw, 120px)', height: 'clamp(72px, 15vw, 120px)' }}
    >
      <Image
        src="/LinkedInT.png"
        alt="me"
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 72px, 120px"
      />
    </div>
  </div>
</div>

        {/* Bottom row */}
        <div
          className="hero-bottom"
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '32px' }}
        >
          <p
            ref={subtextRef}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '17px',
              color: '#B3B3B3',
              lineHeight: 1.65,
              maxWidth: '480px',
            }}
          >
            Hi, I'm Tharindu Thennakoon. A Full-stack software engineer. I'm Transforming ideas into
            production-ready applications across web, mobile, and cloud with a focus on performance,
            security, and real-world impact.
          </p>

          <div ref={buttonsRef} className="hero-buttons" style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <a href="#project-list" className="btn btn-primary">
              EXPLORE PROJECTS <span>→</span>
            </a>
            <a href="/resume" className="btn btn-ghost">
              VIEW RESUME <span>→</span>
            </a>
          </div>
        </div>

        <ScrollLabel />
      </div>
    </section>
  )
}
