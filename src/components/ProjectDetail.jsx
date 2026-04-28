'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ─────────────────────────────────────────────────────────────
   Navbar
───────────────────────────────────────────────────────────── */
function ProjectNav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`proj-nav${scrolled ? ' scrolled' : ''}`}>
      <span className="proj-nav__logo">MONOLITH</span>

      <div className="proj-nav__links">
        {['Work', 'Expertise', 'Process', 'About'].map((item, i) => (
          <Link
            key={item}
            href="/"
            className={`proj-nav__link${i === 0 ? ' proj-nav__link--active' : ''}`}
          >
            {item}
          </Link>
        ))}
      </div>

      <Link href="/" className="proj-nav__cta">Start Project</Link>
    </nav>
  )
}

/* ─────────────────────────────────────────────────────────────
   Utility: parse body strings — <accent>text</accent> → span
───────────────────────────────────────────────────────────── */
function ArchParagraph({ text }) {
  const parts = text.split(/(<accent>.*?<\/accent>)/g)
  return (
    <p className="proj-arch-text">
      {parts.map((part, i) => {
        const match = part.match(/^<accent>(.*)<\/accent>$/)
        return match
          ? <span key={i} className="accent">{match[1]}</span>
          : <span key={i}>{part}</span>
      })}
    </p>
  )
}

/* ─────────────────────────────────────────────────────────────
   Code block — splits keyword/string tokens on render
───────────────────────────────────────────────────────────── */
function CodeBlock({ code, label }) {
  // Very light tokeniser: highlight strings in quotes and Go/Py keywords
  const tokenise = (line) => {
    const tokens = []
    let remaining = line
    const RULES = [
      { re: /(".*?"|'.*?')/,            cls: 'proj-code-str' },
      { re: /\b(class|def|func|return|type|struct|for|range|make)\b/, cls: 'proj-code-kw' },
    ]
    let safetyLimit = 0
    while (remaining.length && safetyLimit++ < 200) {
      let earliest = null
      for (const rule of RULES) {
        const m = remaining.match(rule.re)
        if (m && (earliest === null || m.index < earliest.index)) {
          earliest = { ...m, cls: rule.cls }
        }
      }
      if (!earliest) { tokens.push({ text: remaining, cls: null }); break }
      if (earliest.index > 0)
        tokens.push({ text: remaining.slice(0, earliest.index), cls: null })
      tokens.push({ text: earliest[0], cls: earliest.cls })
      remaining = remaining.slice(earliest.index + earliest[0].length)
    }
    return tokens
  }

  return (
    <div className="proj-code-wrap">
      {/* Window chrome */}
      <div className="proj-code-dots">
        <span className="proj-code-dot" style={{ background: 'rgba(237,127,100,0.4)' }} />
        <span className="proj-code-dot" style={{ background: 'rgba(250,189,0,0.4)' }} />
        <span className="proj-code-dot" style={{ background: 'rgba(172,171,170,0.2)' }} />
        <span className="proj-code-filelabel">{label}</span>
      </div>

      <pre className="proj-code-pre">
        {code.split('\n').map((line, li) => (
          <div key={li}>
            {tokenise(line).map((tok, ti) =>
              tok.cls
                ? <span key={ti} className={tok.cls}>{tok.text}</span>
                : <span key={ti}>{tok.text}</span>
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Main component — accepts a `project` prop from the data list
───────────────────────────────────────────────────────────── */
export default function ProjectDetail({ project, nextProject }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    /* Hero entrance */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo('.proj-back',       { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.4 })
      .fromTo('.proj-case-label', { opacity: 0, y: 10  }, { opacity: 1, y: 0, duration: 0.35 }, '-=0.1')
      .fromTo('.proj-h1',         { opacity: 0, y: 52  }, { opacity: 1, y: 0, duration: 0.78 }, '-=0.15')
      .fromTo('.proj-tagline',    { opacity: 0, y: 22  }, { opacity: 1, y: 0, duration: 0.55 }, '-=0.42')
      .fromTo('.proj-meta-grid',  { opacity: 0, y: 18  }, { opacity: 1, y: 0, duration: 0.5  }, '-=0.3')
      .fromTo('.proj-hero-img',   { opacity: 0         }, { opacity: 1,        duration: 0.7  }, '-=0.2')

    /* Scroll-triggered reveals */
    gsap.utils.toArray('.proj-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 87%' },
        }
      )
    })

    /* Metrics pop-in */
    gsap.utils.toArray('.proj-metric-value').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.82 },
        {
          opacity: 1, scale: 1, duration: 0.58, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: el, start: 'top 89%' },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [project.id])

  return (
    <div style={{ background: '#0e0e0e', color: '#e7e5e4', minHeight: '100vh' }}>
      <ProjectNav />

      <main style={{ paddingTop: '116px' }}>
        <div className="proj-wrap">

          {/* ── Back link ─────────────────────────────────── */}
          <Link href="/" className="proj-back">
            ← Back to Portfolio
          </Link>

          {/* ══ HERO ════════════════════════════════════════ */}
          <header style={{ marginBottom: '80px' }}>
            <span className="proj-case-label">Case Study / {project.caseNumber}</span>

            <h1 className="proj-h1">{project.title}</h1>

            <p className="proj-tagline">{project.tagline}</p>

            {/* Meta bento */}
            <div className="proj-meta-grid">
              <div className="proj-meta-cell">
                <span className="proj-meta-label">Role</span>
                <span className="proj-meta-value">{project.role}</span>
              </div>
              <div className="proj-meta-cell">
                <span className="proj-meta-label">Timeline</span>
                <span className="proj-meta-value">{project.timeline}</span>
              </div>
              <div className="proj-meta-cell">
                <span className="proj-meta-label">Tech Stack</span>
                <div style={{ marginTop: '4px' }}>
                  {project.techStack.map((t) => (
                    <span key={t} className="proj-tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* ══ HERO IMAGE ══════════════════════════════════ */}
          <div className="proj-hero-img proj-section">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              fill
              priority
              style={{ objectFit: 'cover', opacity: 0.58, mixBlendMode: 'luminosity' }}
              sizes="100vw"
            />
            <div className="proj-hero-img__overlay" />
          </div>

          {/* ══ ARCHITECTURE ════════════════════════════════ */}
          <section className="proj-section proj-reveal proj-arch-grid">
            {/* Sticky label */}
            <div className="proj-arch-sticky">
              <h2 className="proj-section-title">THE<br />ARCHITECTURE</h2>
              <div className="proj-section-bar" />
            </div>

            {/* Content */}
            <div>
              <div className="proj-arch-body">
                {project.architecture.body.map((para, i) => (
                  <ArchParagraph key={i} text={para} />
                ))}
              </div>
              <CodeBlock
                code={project.architecture.code}
                label={project.architecture.codeLabel}
              />
            </div>
          </section>

          {/* ══ INTERFACE GALLERY ═══════════════════════════ */}
          <section className="proj-section proj-reveal">
            <div className="proj-gallery-header">
              <div style={{ maxWidth: '540px' }}>
                <h2 className="proj-section-title">INTERFACE GALLERY</h2>
                <div className="proj-section-bar" />
                <p className="proj-gallery-desc">
                  Precision-engineered user interfaces designed for complex data orchestration
                  and high-performance visual analysis.
                </p>
              </div>
              <div className="proj-gallery-arrows">
                <button className="proj-gallery-arrow" aria-label="Previous">←</button>
                <button className="proj-gallery-arrow" aria-label="Next">→</button>
              </div>
            </div>

            <div className="proj-gallery-grid">
              {project.gallery.map((item) => (
                <div key={item.title} className="proj-gallery-item">
                  <div className="proj-gallery-thumb">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <p className="proj-gallery-item-title">{item.title}</p>
                    <p className="proj-gallery-item-caption">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══ TECHNICAL CHALLENGES ════════════════════════ */}
          <section className="proj-section proj-reveal">
            <div className="proj-challenges-grid">
              {/* Left — text */}
              <div className="proj-challenges-left">
                <h2 className="proj-section-title">TECHNICAL<br />CHALLENGES</h2>
                <div className="proj-challenges-list">
                  {project.challenges.map((c) => (
                    <div key={c.num}>
                      <p className="proj-challenge-num">{c.num}. {c.title}</p>
                      <p className="proj-challenge-body">{c.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — image */}
              <div className="proj-challenges-img">
                <Image
                  src={project.challengeImage.src}
                  alt={project.challengeImage.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 960px) 100vw, 50vw"
                />
                <div className="proj-challenges-tint" />
              </div>
            </div>
          </section>

          {/* ══ METRICS ═════════════════════════════════════ */}
          <section className="proj-section proj-reveal" style={{ marginBottom: '160px' }}>
            <p className="proj-metrics-eyebrow">IMPACT &amp; METRICS</p>
            <div className="proj-metrics-grid">
              {project.metrics.map((m) => (
                <div key={m.label} className="proj-metric-card">
                  <span className="proj-metric-value">{m.value}</span>
                  <span className="proj-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ══ NEXT PROJECT ════════════════════════════════ */}
          {nextProject && (
            <div className="proj-next proj-reveal">
              <div>
                <span className="proj-next__eyebrow">Next Project</span>
                <Link href={`/projects/${nextProject.id}`} className="proj-next__title">
                  {nextProject.title}
                </Link>
              </div>
              <Link href={`/projects/${nextProject.id}`} className="proj-next__arrow">
                →
              </Link>
            </div>
          )}

        </div>{/* /proj-wrap */}
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════ */}
      <footer className="proj-footer">
        <div className="proj-wrap proj-footer-grid">
          <div>
            <span className="proj-footer__logo">MONOLITH ARCHITECT</span>
            <p className="proj-footer__desc">
              Engineering digital infrastructure with architectural precision
              and surgical code execution.
            </p>
            <p className="proj-footer__copy">
              © 2024 MONOLITH ARCHITECT. ENGINEERED WITH PRECISION.
            </p>
          </div>
          <div className="proj-footer-links">
            {[
              ['Github', 'LinkedIn', 'Twitter'],
              ['Case Studies', 'Documentation', 'Privacy'],
            ].map((col, i) => (
              <div key={i} className="proj-footer-col">
                {col.map((link) => (
                  <a key={link} href="#" className="proj-footer-link">{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
