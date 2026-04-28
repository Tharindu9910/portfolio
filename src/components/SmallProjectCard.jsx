import { useState, useEffect, useRef } from "react";

const colors = {
  surface: "#0e0e0e",
  surfaceLow: "#131313",
  surfaceHigh: "#1f2020",
  primary: "#fabd00",
  primaryDim: "#c49200",
  onPrimary: "#533d00",
  onSurface: "#e7e5e4",
  onSurfaceVariant: "#a09e9c",
  outline: "rgba(160,158,156,0.15)",
};

const projects = [
  {
    id: "01",
    title: "QUANTUM\nLEDGER",
    titleOutline: false,
    description:
      "A high-fidelity fintech dashboard engineered for real-time asset tracking. Solved the challenge of rendering 60fps WebGL data visualizations alongside complex React state management for millisecond-latency updates.",
    tags: ["NEXT.JS 14", "THREE.JS", "TAILWINDCSS", "TANSTACK QUERY"],
    align: "left",
    imgSide: "right",
    imgSrc: null,
    imgStyle: { background: "radial-gradient(ellipse at 60% 40%, #2a2a2a 0%, #0e0e0e 80%)" },
  },
  {
    id: "02",
    title: "NEURAL\nCANVAS",
    titleOutline: false,
    description:
      "An AI-driven design system generator that translates natural language into CSS variables. Developed a custom parser for token generation and integrated a robust drag-and-drop interface using React-Aria for peak accessibility.",
    tags: ["TYPESCRIPT", "OPENAI API", "FRAMER MOTION"],
    align: "right",
    imgSide: "left",
    imgSrc: null,
    imgStyle: { background: "radial-gradient(ellipse at 30% 50%, #1e1e1e 0%, #0e0e0e 80%)" },
  },
  {
    id: "03",
    title: "VOID\nKERNEL",
    titleOutline: true,
    description:
      "A browser-based IDE and terminal emulator with zero-latency input. Leveraged SharedArrayBuffer and Web Workers to ensure complex code compilation tasks never block the main UI thread, maintaining a buttery-smooth 120Hz refresh rate.",
    tags: ["WEBASSEMBLY", "RUST", "XTERM.JS"],
    align: "left",
    imgSide: "right",
    imgSrc: null,
    imgStyle: { background: "radial-gradient(ellipse at 70% 60%, #181818 0%, #0e0e0e 80%)" },
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0, style = {} }) {
  const [ref, visible] = useIntersection(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SlideIn({ children, from = "left", delay = 0, style = {} }) {
  const [ref, visible] = useIntersection(0.1);
  const dx = from === "left" ? "-60px" : "60px";
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${dx})`,
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ProjectTitle({ title, outline }) {
  const lines = title.split("\n");
  return (
    <div style={{ lineHeight: 0.88, marginBottom: "1.5rem" }}>
      {lines.map((line, i) => (
        <div key={i}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3.5rem, 10vw, 7.5rem)",
              letterSpacing: "-0.03em",
              display: "block",
              color: i === 1 && outline ? "transparent" : colors.onSurface,
              WebkitTextStroke: i === 1 && outline ? `2px ${colors.onSurface}` : "none",
              textStroke: i === 1 && outline ? `2px ${colors.onSurface}` : "none",
            }}
          >
            {line}
          </span>
        </div>
      ))}
    </div>
  );
}

function Tag({ label }) {
  return (
    <span
      style={{
        display: "inline-block",
        background: colors.surfaceHigh,
        color: colors.onSurfaceVariant,
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.625rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        padding: "5px 10px",
        borderRadius: "100px",
        border: `1px solid ${colors.outline}`,
      }}
    >
      {label}
    </span>
  );
}

function CTAButton({ children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: hovered ? "#e0aa00" : colors.primary,
        color: colors.onPrimary,
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        padding: "14px 24px",
        border: "none",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "background 0.2s ease, transform 0.15s ease",
        transform: hovered ? "translateX(4px)" : "none",
        marginTop: "2rem",
      }}
    >
      {children}
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <path d="M1 5h12M8 1l5 4-5 4" stroke={colors.onPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function AbstractImage({ style, id }) {
  const shapes = [
    { cx: 60, cy: 55, r: 45, opacity: 0.07 },
    { cx: 80, cy: 30, r: 25, opacity: 0.05 },
    { cx: 30, cy: 75, r: 30, opacity: 0.06 },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {shapes.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" fillOpacity={s.opacity} />
        ))}
        {id === "01" && (
          <>
            <ellipse cx="75" cy="40" rx="18" ry="28" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.12" />
            <ellipse cx="70" cy="55" rx="25" ry="18" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.08" />
            <ellipse cx="80" cy="35" rx="12" ry="20" fill="none" stroke="white" strokeWidth="0.4" strokeOpacity="0.1" />
          </>
        )}
        {id === "02" && (
          <>
            {[...Array(8)].map((_, i) => (
              <rect key={i} x={10 + i * 10} y={30 + (i % 3) * 12} width="6" height="6" fill="white" fillOpacity={0.04 + i * 0.007} rx="0.5" />
            ))}
            {[...Array(5)].map((_, i) => (
              <rect key={i} x={15 + i * 10} y={55 + (i % 2) * 8} width="6" height="6" fill="white" fillOpacity={0.03 + i * 0.008} rx="0.5" />
            ))}
          </>
        )}
        {id === "03" && (
          <>
            <path d="M20 80 Q50 20 80 60" stroke="white" strokeOpacity="0.08" strokeWidth="0.8" fill="none" />
            <path d="M15 70 Q45 15 85 55" stroke="white" strokeOpacity="0.05" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}

export function SmallProjectCard({ project, index }) {
  const isLeft = project.align === "left";
  const isEven = index % 2 === 1;
  const bgColor = index % 2 === 0 ? colors.surface : colors.surfaceLow;

  return (
    <section
      style={{
        background: bgColor,
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <SlideIn from={isLeft ? "left" : "right"} delay={0}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: colors.primary,
                fontWeight: 600,
                marginBottom: "1.5rem",
                marginTop: 0,
              }}
            >
              PROJECT_{project.id}
            </p>
          </SlideIn>

          <SlideIn from={isLeft ? "left" : "right"} delay={80}>
            <ProjectTitle title={project.title} outline={project.titleOutline} />
          </SlideIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <FadeUp delay={160}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "clamp(0.875rem, 2vw, 1rem)",
                    lineHeight: 1.75,
                    color: colors.onSurfaceVariant,
                    marginTop: 0,
                    marginBottom: "1.5rem",
                    maxWidth: "520px",
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "0.25rem" }}>
                  {project.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <CTAButton>GO TO LIVE DEPLOYMENT</CTAButton>
              </FadeUp>
            </div>

            <FadeUp delay={240} style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: colors.surfaceHigh,
                }}
              >
                <AbstractImage style={project.imgStyle} id={project.id} />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .project-inner-${index} {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCardDesktop({ project, index }) {
  const isLeft = project.align === "left";
  const bgColor = index % 2 === 0 ? colors.surface : colors.surfaceLow;

  return (
    <section
      style={{
        background: bgColor,
        padding: "clamp(5rem, 8vw, 9rem) clamp(2rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isLeft ? "1fr 1fr" : "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {isLeft ? (
          <>
            <div>
              <SlideIn from="left" delay={0}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: colors.primary,
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                    marginTop: 0,
                  }}
                >
                  PROJECT_{project.id}
                </p>
              </SlideIn>
              <SlideIn from="left" delay={60}>
                <ProjectTitle title={project.title} outline={project.titleOutline} />
              </SlideIn>
              <FadeUp delay={140}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: colors.onSurfaceVariant,
                    marginTop: 0,
                    marginBottom: "1.5rem",
                    maxWidth: "480px",
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {project.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <CTAButton>GO TO LIVE DEPLOYMENT</CTAButton>
              </FadeUp>
            </div>
            <SlideIn from="right" delay={100}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: colors.surfaceHigh,
                }}
              >
                <AbstractImage style={project.imgStyle} id={project.id} />
              </div>
            </SlideIn>
          </>
        ) : (
          <>
            <SlideIn from="left" delay={100}>
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  borderRadius: "4px",
                  overflow: "hidden",
                  background: colors.surfaceHigh,
                }}
              >
                <AbstractImage style={project.imgStyle} id={project.id} />
              </div>
            </SlideIn>
            <div style={{ textAlign: "right" }}>
              <SlideIn from="right" delay={0}>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: colors.primary,
                    fontWeight: 600,
                    marginBottom: "1.25rem",
                    marginTop: 0,
                  }}
                >
                  PROJECT_{project.id}
                </p>
              </SlideIn>
              <SlideIn from="right" delay={60}>
                <ProjectTitle title={project.title} outline={project.titleOutline} />
              </SlideIn>
              <FadeUp delay={140}>
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: "0.95rem",
                    lineHeight: 1.8,
                    color: colors.onSurfaceVariant,
                    marginTop: 0,
                    marginBottom: "1.5rem",
                    marginLeft: "auto",
                    maxWidth: "480px",
                  }}
                >
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "flex-end" }}>
                  {project.tags.map((t) => <Tag key={t} label={t} />)}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <CTAButton>GO TO LIVE DEPLOYMENT</CTAButton>
                </div>
              </FadeUp>
            </div>
          </>
        )}
      </div>
    </section>
  );
}



function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// export default function App() {
//   const isMobile = useIsMobile();

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700;800&family=Manrope:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         html { scroll-behavior: smooth; }
//         body { background: ${colors.surface}; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: ${colors.surface}; }
//         ::-webkit-scrollbar-thumb { background: ${colors.surfaceHigh}; border-radius: 2px; }
//       `}</style>

//       <div style={{ background: colors.surface, minHeight: "100vh" }}>
//         <NavBar />
//         <HeroSection />

//         <div>
//           {projects.map((project, i) =>
//             isMobile
//               ? <SmallProjectCard key={project.id} project={project} index={i} />
//               : <ProjectCardDesktop key={project.id} project={project} index={i} />
//           )}
//         </div>

//         <footer
//           style={{
//             background: colors.surfaceLow,
//             padding: "4rem clamp(1.5rem, 5vw, 5rem)",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "1.5rem",
//           }}
//         >
//           <span
//             style={{
//               fontFamily: "'Space Grotesk', sans-serif",
//               fontWeight: 700,
//               fontSize: "1.25rem",
//               letterSpacing: "-0.02em",
//               color: colors.onSurface,
//             }}
//           >
//             DEV<span style={{ color: colors.primary }}>.</span>
//           </span>
//           <p
//             style={{
//               fontFamily: "'Inter', sans-serif",
//               fontSize: "0.65rem",
//               letterSpacing: "0.08em",
//               color: colors.onSurfaceVariant,
//               margin: 0,
//             }}
//           >
//             © 2025 — BUILT WITH CRAFT
//           </p>
//         </footer>
//       </div>
//     </>
//   );
// }