"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Projects data array ─── */
const PROJECTS = [
  {
    id: "01",
    label: "PROJECT_01",
    title: ["AGRO", "WEB"],
    titleOutline: false,
    description:
      "A modern, high-performance web platform designed for the agro industry, delivering a seamless user experience across all devices. The application focuses on fast load times with optimized media, smooth interactive scrolling, and clean, user-friendly navigation. Built with strong emphasis on performance, accessibility, and discoverability, it ensures efficient content delivery, responsive layouts, and reliable deployment. The project also integrates essential communication features and is structured to scale while maintaining speed and usability.",
    tags: ["NEXT.JS 15", "GSAP","FRAMER MOTION","TAILWINDCSS", "SEO", "FIGMA"],
    videoSrc: "/smallProjects/project-agro.webm",
    url: "https://www.tharulagro.com/",
    align: "left",
    bg: "#0e0e0e",
  },
  {
    id: "02",
    label: "PROJECT_02",
    title: ["FUTURE", "BEVERAGES"],
    titleOutline: false,
    description:
      "A fast, fully static website for Ceylon Future Beverages, a Sri Lankan company turning native botanicals into functional drinks. Floating 3D cans move with the scroll and a 3D carousel rotates through each flavour, all drawn on one shared WebGL canvas that stays smooth on mid-range phones. Every product page is generated from a single content source, with a mixed-pack builder that pre-fills the enquiry form. The whole site is served as static files from GoDaddy hosting, and still ships with structured data, a strict security policy and an evidence-rated page on gotu kola.",
    tags: ["ASTRO 7", "THREE.JS", "GSAP", "TAILWINDCSS 4", "TYPESCRIPT", "SEO"],
    videoSrc: "/smallProjects/project-beverages.webm",
    align: "right",
    url: "https://www.ceylonfuturebeverages.com/",
    bg: "#131313",
  },
  {
    id: "03",
    label: "PROJECT_03",
    title: ["STREET", "& SEAM"],
    titleOutline: true,
    description:
      "A custom Shopify storefront for a streetwear brand, built on the Dawn theme with no frameworks, packages or build step. Seven new merchant-editable sections, bottom-sheet menus and filters and a dual-handle price slider make the store feel native on a phone. The brand was taken through PayHere's merchant application, with the store's policies and pages prepared to pass its review, and the gateway was then connected to Shopify checkout for local payments. Custom domain setup and a Theme Editor training package for staff completed the hand-off.",
    tags: ["SHOPIFY", "LIQUID", "JAVASCRIPT", "CSS", "PLAYWRIGHT", "PAYHERE"],
    videoSrc: "/smallProjects/project-sns.webm",
    url: "",
    align: "left",
    bg: "#0e0e0e",
  },
  {
    id: "04",
    label: "PROJECT_04",
    title: ["NEX", "ONE"],
    titleOutline: false,
    description:
      "A marketing website for NexOne, an ERP for distributors, wholesalers and multi-outlet retailers that connects orders, stock, warehousing, dispatch and invoicing in one system. The static Astro build pairs scroll-driven GSAP motion with lightweight React islands for the platform explorer, industry tabs and contact form, plus dedicated pages for each ERP module. Animations adapt to Save-Data and slow connections, and hover-based prefetching keeps navigation instant.",
    tags: ["ASTRO 7", "REACT 19", "GSAP", "TAILWINDCSS 4", "TYPESCRIPT", "SEO"],
    videoSrc: "/smallProjects/project-nex.webm",
    url: "",
    align: "right",
    bg: "#131313",
  },
  {
    id: "05",
    label: "PROJECT_05",
    title: ["ILMA", "OGA"],
    titleOutline: true,
    description:
      "The website and content platform for the ILMA International Old Girls' Association, a not-for-profit alumni network. Projects, events, overseas chapters, blogs, membership and sports are all managed through a Sanity Studio embedded in the site, with live content updates and draft previews. Built on Next.js 16 with Cache Components, the site is server-rendered by default with fully typed GROQ queries and smooth motion-driven reveals.",
    tags: ["NEXT.JS 16", "SANITY CMS", "TYPESCRIPT", "MOTION", "TAILWINDCSS 4"],
    videoSrc: "/smallProjects/project-illma.webm",
    url: "",
    align: "left",
    bg: "#0e0e0e",
  },
//   {
//     id: "03",
//     label: "PROJECT_03",
//     title: ["VOID", "KERNEL"],
//     titleOutline: true,
//     description:
//       "A browser-based IDE and terminal emulator with zero-latency input. Leveraged SharedArrayBuffer and Web Workers to ensure complex code compilation tasks never block the main UI thread, maintaining a buttery-smooth 120Hz refresh rate.",
//     tags: ["WEBASSEMBLY", "RUST", "XTERM.JS"],
//     videoSrc: "/videos/project-03.mp4",
//     align: "left",
//     bg: "#0e0e0e",
//   },
];

/* ─── Intersection reveal hook ─── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Animated wrappers ─── */
function FadeUp({ children, delay = 0, style }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(36px)",
      transition: `opacity .75s cubic-bezier(.16,1,.3,1) ${delay}ms,transform .75s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

function SlideX({ children, from = "left", delay = 0, style }) {
  const [ref, v] = useReveal();
  const tx = from === "left" ? "-48px" : "48px";
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateX(0)" : `translateX(${tx})`,
      transition: `opacity .85s cubic-bezier(.16,1,.3,1) ${delay}ms,transform .85s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

/* ─── Video: plays on hover, rewinds frame-by-frame on leave ─── */
function ProjectVideo({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef(null);
  const rewindRef = useRef(null);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    // eslint-disable-next-line react-hooks/immutability
    return () => cancelAll();
  }, []);

  const cancelAll = () => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(rewindRef.current);
  };

  const startPlay = () => {
    cancelAll();
    setPlaying(true);
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().catch(() => {});
  };

  const stopPlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    setPlaying(false);

    const rewind = () => {
      if (!videoRef.current) return;
      if (videoRef.current.currentTime <= 0.016) {
        videoRef.current.currentTime = 0;
        return;
      }
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 0.05);
      rewindRef.current = setTimeout(rewind, 16);
    };
    rewind();
  };

  const handleTap = () => {
    playing ? stopPlay() : startPlay();
  };

  // Desktop handlers
  const handleEnter = () => !isMobile && startPlay();
  const handleLeave = () => !isMobile && stopPlay();

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={isMobile ? handleTap : undefined}
      style={{
        width: "100%",
        aspectRatio: "1264/720",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "#0a0a0a",
        WebkitTapHighlightColor: "transparent", // removes grey flash on iOS
      }}
    >
      {/* Play/Pause hint icon */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: playing ? 0 : 1,
        transition: "opacity .35s ease",
        pointerEvents: "none",
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(250,189,0,0.1)",
          border: "1.5px solid rgba(250,189,0,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
        }}>
          {/* Show pause icon when playing on mobile, play icon otherwise */}
          {playing && isMobile ? (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <rect x="1" y="1" width="4" height="14" rx="1" fill="#fabd00"/>
              <rect x="9" y="1" width="4" height="14" rx="1" fill="#fabd00"/>
            </svg>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 1.5l11 6.5L2 14.5V1.5z" fill="#fabd00"/>
            </svg>
          )}
        </div>
      </div>

      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"        // only loads thumbnail on mobile, saves data
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          transition: "filter .4s ease",
          filter: playing ? "brightness(1)" : "brightness(0.55)",
        }}
      />
    </div>
  );
}

/* ─── Chip ─── */
function Chip({ label }) {
  return (
    <span style={{
      fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
      letterSpacing: "0.07em", color: "#9a9896",
      background: "#1f2020", border: "1px solid rgba(160,158,156,.12)",
      padding: "4px 10px", borderRadius: 100, display: "inline-block",
    }}>{label}</span>
  );
}

/* ─── CTA Button ─── */
function CTABtn({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank" rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        background: h ? "#e0aa00" : "#fabd00",
        color: "#533d00",
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
        padding: "13px 22px", border: "none", borderRadius: 1, cursor: "pointer",
        transition: "background .18s, transform .15s",
        transform: h ? "translateX(3px)" : "none",
        marginTop: 24, whiteSpace: "nowrap",
      }}
    >
      {children}
      <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
        <path d="M1 4.5h11M8 1l4 3.5L8 8" stroke="#533d00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ─── Project title lines ─── */
function ProjectTitle({ lines, outline }) {
  return (
    <h2 style={{ lineHeight: 0.88, marginBottom: 28 }}>
      {lines.map((line, i) => {
        const isOutlined = outline && i === lines.length - 1;
        return (
          <span key={i} style={{
            display: "block",
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
            fontSize: "clamp(52px,9vw,96px)", letterSpacing: "-0.03em",
            color: isOutlined ? "transparent" : "#e7e5e4",
            WebkitTextStroke: isOutlined ? "2px #e7e5e4" : undefined,
          }}>{line}</span>
        );
      })}
    </h2>
  );
}

/* ─── Project section ─── */
function ProjectSection({ project }) {
  const isLeft = project.align === "left";

  const textCol = (
    <div style={{ textAlign: isLeft ? "left" : "right" }}>
      <SlideX from={isLeft ? "left" : "right"} delay={0}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.14em", color: "#fabd00", marginBottom: 20,
        }}>{project.label}</p>
        <ProjectTitle lines={project.title} outline={project.titleOutline} />
      </SlideX>
      <FadeUp delay={120}>
        <p style={{
          fontFamily: "'Manrope', sans-serif", fontSize: "clamp(13px,1.5vw,15px)",
          lineHeight: 1.75, color: "#9a9896",
          maxWidth: 440, marginBottom: 18,
          marginLeft: isLeft ? 0 : "auto",
        }}>{project.description}</p>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          justifyContent: isLeft ? "flex-start" : "flex-end",
        }}>
          {project.tags.map(t => <Chip key={t} label={t} />)}
        </div>
        {project.url && (
          <div style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end" }}>
            <CTABtn href={project.url}>GO TO LIVE DEPLOYMENT</CTABtn>
          </div>
        )}
      </FadeUp>
    </div>
  );

  const videoCol = (
    <SlideX from={isLeft ? "right" : "left"} delay={100}>
      <ProjectVideo src={project.videoSrc} />
    </SlideX>
  );

  return (
    <section style={{ background: project.bg, padding: "80px clamp(24px,5vw,80px)" }}>
      <div className="project-grid" style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "clamp(32px,5vw,80px)",
        alignItems: "center",
      }}>
        {isLeft ? (
          <>
            {textCol}
            {videoCol}
          </>
        ) : (
          <>
            <div style={{ order: 0 }}>{videoCol}</div>
            <div style={{ order: 1 }}>{textCol}</div>
          </>
        )}
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Page() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Manrope:wght@400;500&family=Inter:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; background: #0e0e0e; }
        body { background: #0e0e0e; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1f2020; }
        @media (max-width: 600px) {
  .project-grid {
    display: flex !important;
    flex-direction: column !important;
  }
  .project-text { order: 2 !important; text-align: left !important; }
  .project-video { order: 1 !important; }
}
      `}</style>
      <main className="!pt-10" style={{ background: "#0e0e0e" }}>
        {PROJECTS.map(p => (
          <ProjectSection key={p.id} project={p} />
        ))}
      </main>
    </>
  );
}