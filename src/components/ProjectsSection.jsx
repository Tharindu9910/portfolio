'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Card from './Card'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    tabs: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'WebSockets', 'Event Sourcing'],
    image: '/projects/hellmann/workflow.svg',
    imageAlt: 'Purchase order workflow across warehouse teams',
    badge: 'In Rollout · Phase 1',
    title: 'Hellmann Warehouse Workflow Platform',
    description:
      'Event-sourced platform tracking purchase orders through 11 stages across 9 warehouse teams for a 3PL operation, replacing spreadsheet and verbal hand-offs with live tablet and overhead-screen workflows.',
    linkText: 'VIEW CASE STUDY',
  },
  {
    id: 2,
    tabs: ['Gemini Live API', 'TypeScript', 'three.js', 'Web Audio', 'FastAPI', 'Cloud Run'],
    image: '/projects/lumina/card.svg',
    imageAlt: 'Audio waveform turning into facial animation channels',
    title: 'Real-Time Voice AI & Facial Engine',
    description:
      'The voice and face component of the Lumina platform: a voice agent streaming audio browser-to-model in 97 languages, and a from-scratch, avatar-independent engine that turns live AI speech into 60 Hz lip-sync, emotion, gaze and blink.',
    linkText: 'VIEW CASE STUDY',
  },
  {
    id: 3,
    tabs: ['React', 'Python', 'Serverless', 'Neo4J', 'Firestore', 'GCP', 'Firebase Auth'],
    showCode: false,
    image: '/projects/epitoni/epitoni-home.png',
    title: 'Epitoni',
    description:
      'Serverless engagement platform for local businesses: promotions, loyalty, groups and opt-in alerts, targeted through a Neo4j interest graph. 77 Python Cloud Functions behind API Gateway.',
    linkText: 'SYSTEM SPECS',
  },
  { id:4,
    tabs: ['React', 'Flask', 'Microservices', 'GCP' , 'Websocket', 'Docker' ],
    image: '/projects/widget/neo-ji-home.png',
    imageAlt: 'Abstract 3D stacked layers architecture',
    title: 'Neo-Ji',
    description:
      'Conversational AI with task execution and multi-channel delivery.',
    linkText: 'VIEW CASE STUDY',
  },
  {
    id:5,
    tabs: ['Flask', 'GCP', "Linux", 'Docker', 'Cryptography'],
    image: '/projects/chat/chat-home.png',
    imageAlt: 'Network circuit visualization dark',
    title: 'Neo Chat',
    description:
      'MQTT-Based Real-Time Secure Chat Platform with End-to-End Encryption and Low-Latency Messaging for Enterprise Communication.',
    linkText: 'ARCHITECTURE SPECS',
  },
  {
    id:6,
    tabs: ['FastAPI', 'Next.js', 'Webhook'],
    image: '/projects/attendance/attendance-mgt.png',
    imageAlt: 'Circular radar scan from space',
    title: 'Real-Time Attendance Management System',
    description:
      'Real-Time Attendance Management System with Facial Recognition and Report Generation for Educational Institutions.',
    linkText: 'FULL BREAKDOWN',
  },
  {
    id: 7,
    tabs: ['NestJS', 'React', 'PostgreSQL', 'TypeScript', 'SSE', 'Playwright'],
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80',
    imageAlt: 'Abstract network nodes on dark background',
    title: 'Saniro ERP',
    description:
      'Multi-branch ERP for a steel fabrication and roofing business: job cards, payments, branch stock and the workshop floor in one system, with 7 roles and 26 business rules enforced on the server.',
    linkText: 'CASE STUDY',
  },
]

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Section heading
    gsap.fromTo(
      sectionRef.current?.querySelector('.portfolio-heading'),
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    )

    // Cards
    const cards = cardsRef.current?.querySelectorAll('.portfolio-card')
    if (cards) {
      gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.75, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
        }
      )
    }
  }, [])

  return (
    <section
      id="project-list"
      ref={sectionRef}
      style={{ background: '#111111', padding: 'var(--section-gap) 0' }}
    >
      <div className="container">
        {/* Header */}
        <div className="portfolio-heading" style={{ marginBottom: '52px' }}>
          <div className="section-label">
            <div className="section-label__bar" />
            <span className="section-label__text">PROJECTS</span>
          </div>

          <div
            className="portfolio-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '20px',
            }}
          >
            <h2 style={{
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              lineHeight: 1.03,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              textTransform: 'uppercase',
            }}>
              PROJECTS<br />that make an impact
            </h2>

            <a
              href="#"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '13px',
                color: '#B3B3B3',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#B3B3B3')}
            >
              TECHNICAL ARCHIVE →
            </a>
          </div>
        </div>

        {/* 2×2 card grid */}
        <div
          ref={cardsRef}
          className="portfolio-grid !pb-5"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}
        >
          {projects.map((p) => (
            <div key={p.id} className="portfolio-card" style={{ display: 'flex' }}>
              <Link href={`/projects/${p.id}`}><Card {...p} /></Link>
            </div>
          ))}
        </div>
        <Link href='/more' className="card flex justify-center items-center w-full h-full" >More Projects</Link>
      </div>
    </section>
  )
}
