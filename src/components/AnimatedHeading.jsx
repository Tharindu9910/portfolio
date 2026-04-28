'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedHeading({ lines, className, style }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll('.heading-line')
    if (!spans) return

    gsap.fromTo(
      spans,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1,
      }
    )
  }, [])

  return (
    <div ref={containerRef} className={className} style={style}>
      {lines.map((line, i) => (
        <div
          key={i}
          className="heading-line"
          style={{ display: 'block', overflow: 'hidden' }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
    </div>
  )
}
