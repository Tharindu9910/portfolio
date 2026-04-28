'use client'

/* ─── Data ───────────────────────────────────────────────────── */
const STACK = [
  {
    icon: '▣',
    label: 'FRONTEND',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL / Three.js'],
  },
  {
    icon: '▦',
    label: 'BACKEND',
    items: ['Node.js / Go', 'GraphQL / gRPC', 'PostgreSQL', 'Redis / Kafka'],
  },
  {
    icon: '☁',
    label: 'CLOUD',
    items: ['AWS Ecosystem', 'Serverless Arch', 'Terraform', 'Kubernetes'],
  },
  {
    icon: '⊞',
    label: 'INFRASTRUCTURE',
    items: ['CI/CD Pipelines', 'Docker / K8s', 'Observability', 'Security Audit'],
  },
]

const EXPERIENCE = [
  {
    period: '2021 — PRESENT',
    title: 'Senior Software Engineer',
    company: 'QUANTUM SYSTEMS LAB',
    summary:
      'Spearheading the core architecture for a real-time data streaming platform processing 2M+ events per second. Implementing precision-tuned TypeScript microservices and cloud-native infrastructure.',
    points: [
      'Refactored legacy monolith into a service-oriented architecture, reducing infrastructure costs by 40%.',
      'Developed a custom internal UI framework using Tailwind and Radix UI to standardize design across 12 product squads.',
    ],
  },
  {
    period: '2018 — 2021',
    title: 'Full-Stack Developer',
    company: 'NEO-LOGIC SOLUTIONS',
    summary:
      'Owned the development of multiple high-traffic SaaS applications. Focused on reactive state management and end-to-end type safety across the entire stack.',
    points: [
      'Engineered a white-label e-commerce solution used by 50+ enterprise clients globally.',
      'Implemented automated CI/CD pipelines using GitHub Actions, decreasing deployment time from 1 hour to 12 minutes.',
    ],
  },
]

const CONTACT = [
  {
    icon: '@',
    label: 'SEND EMAIL',
    value: 'hello@architect.fs',
    href: 'mailto:hello@architect.fs',
  },
  {
    icon: '</>',
    label: 'GITHUB PROFILE',
    value: 'github.com/architect_fs',
    href: 'https://github.com',
  },
  {
    icon: '↗',
    label: 'PROFESSIONAL NETWORK',
    value: 'linkedin.com/in/architectfs',
    href: 'https://linkedin.com',
  },
]

/* ─── Section heading (spaced yellow letters) ─────────────────── */
function SectionLabel({ text }) {
  return (
    <p className="font-inter text-accent text-[11px] font-semibold tracking-[0.25em] uppercase mb-8">
      {text}
    </p>
  )
}

/* ─── Divider ─────────────────────────────────────────────────── */
function Divider() {
  return <div className="w-full h-px bg-[#1e1e1e] my-16" />
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function ResumePage() {
  return (
    <div className="bg-[#111111] min-h-screen font-inter text-white">
      <div className="max-w-[780px] mx-auto px-6 sm:px-10 lg:px-12 py-10">

        {/* ── Back link ── */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[#555] hover:text-white transition-colors duration-200 text-[11px] tracking-[0.1em] uppercase font-medium mb-12"
        >
          <span>←</span> BACK TO PORTFOLIO
        </a>

        {/* ══════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 mb-12">
          {/* Left: name + tagline */}
          <div className="flex-1">
            <h1 className="font-oswald font-bold text-[clamp(44px,9vw,80px)] leading-[0.95] tracking-[-0.03em] uppercase text-white mb-6">
              ARCHITECT
              <span className="text-white">.</span>
              FS
              <span className="text-accent">.</span>
            </h1>
            <p className="text-[15px] text-[#888] leading-[1.65] max-w-[380px]">
              Senior Full-Stack Engineer crafting{' '}
              <strong className="text-white font-semibold">
                high-concurrency distributed systems
              </strong>{' '}
              and precision-engineered frontends.
            </p>
          </div>

          {/* Right: availability + base */}
          <div className="flex flex-row sm:flex-col gap-6 sm:gap-4 sm:text-right shrink-0">
            <div>
              <p className="text-[9px] tracking-[0.18em] text-[#444] uppercase mb-1">
                AVAILABILITY
              </p>
              <p className="text-[13px] text-white font-medium">Open for Contracts</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.18em] text-[#444] uppercase mb-1">BASE</p>
              <p className="text-[13px] text-white font-medium">San Francisco, CA</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            STACK_CORE
        ══════════════════════════════════════════════════════ */}
        <section className="mb-4">
          <SectionLabel text="STACK_CORE" />

          {/* Full Resume button — floats right on desktop */}
          <div className="hidden sm:flex justify-end mb-8 -mt-16">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-accent hover:bg-[#FFC300] text-[#111] text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 rounded transition-colors duration-150"
            >
              <span>↓</span> FULL RESUME
            </a>
          </div>

          {/* 4-column stack grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {STACK.map((col) => (
              <div key={col.label}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent text-[13px]">{col.icon}</span>
                  <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#777]">
                    {col.label}
                  </span>
                </div>
                <ul className="space-y-[10px]">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="text-[13px] text-[#aaa] hover:text-white transition-colors duration-150 cursor-default"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile resume button */}
          <a
            href="#"
            className="sm:hidden mt-8 inline-flex items-center gap-2 bg-accent text-[#111] text-[11px] font-bold tracking-[0.1em] uppercase px-5 py-3 rounded"
          >
            <span>↓</span> FULL RESUME
          </a>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            JOURNAL.EXP
        ══════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel text="JOURNAL.EXP" />

          <div className="space-y-16">
            {EXPERIENCE.map((job, ji) => (
              <div key={ji} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
                {/* Left column */}
                <div>
                  <p className="text-[11px] text-accent tracking-[0.08em] font-medium mb-3">
                    {job.period}
                  </p>
                  <h3 className="font-oswald font-bold text-[22px] text-white uppercase tracking-[-0.01em] leading-[1.1] mb-2">
                    {job.title}
                  </h3>
                  <p className="text-[10px] text-[#555] tracking-[0.12em] uppercase font-medium">
                    {job.company}
                  </p>
                </div>

                {/* Right column */}
                <div>
                  <p className="text-[13.5px] text-[#888] leading-[1.7] mb-6">
                    {job.summary}
                  </p>
                  <ul className="space-y-4">
                    {job.points.map((pt, pi) => (
                      <li key={pi} className="flex gap-4">
                        <span className="text-accent text-[10px] font-bold tracking-[0.05em] mt-[3px] shrink-0 w-4">
                          {String(pi + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[13px] text-[#888] leading-[1.65]">{pt}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════
            ACADEMIC + DIRECT.CH  (two columns on desktop)
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* ── ACADEMIC ── */}
          <section>
            <SectionLabel text="ACADEMIC" />

            <div>
              <p className="text-[11px] text-accent tracking-[0.08em] font-medium mb-3">
                2014 — 2018
              </p>
              <h3 className="font-oswald font-bold text-[20px] text-white leading-[1.1] mb-2">
                B.S. Computer Science
              </h3>
              <p className="text-[12px] text-[#555] mb-6 leading-[1.5]">
                Stanford University — Specialization in Distributed Systems &amp; HCI
              </p>

              {/* Quote block */}
              <div className="border-l-2 border-[#2a2a2a] pl-5 mt-8">
                <p className="text-[12px] text-[#666] italic leading-[1.75]">
                  &ldquo;Focusing on the intersection of human-computer interaction and scalable
                  back-end engineering to create meaningful digital experiences.&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ── DIRECT.CH ── */}
          <section>
            <SectionLabel text="DIRECT.CH" />

            <div className="space-y-3">
              {CONTACT.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center gap-4 bg-[#161616] hover:bg-[#1c1c1c] border border-[#1e1e1e] hover:border-[#2d2d2d] rounded-xl px-4 py-4 transition-all duration-200"
                >
                  {/* Icon box */}
                  <div className="w-9 h-9 rounded-lg bg-[#1e1e1e] group-hover:bg-accent group-hover:text-[#111] text-accent flex items-center justify-center text-[12px] font-bold transition-all duration-200 shrink-0">
                    {c.icon}
                  </div>
                  {/* Text */}
                  <div>
                    <p className="text-[9px] tracking-[0.15em] text-[#444] uppercase mb-[2px]">
                      {c.label}
                    </p>
                    <p className="text-[13px] text-[#ccc] group-hover:text-white transition-colors duration-200 font-medium">
                      {c.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom padding */}
        <div className="h-20" />
      </div>
    </div>
  )
}