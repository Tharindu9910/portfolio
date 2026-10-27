/**
 * projects.js — Single source of truth for all project data.
 * Add a new object to this array to create a new project page.
 */

// Update this whenever the site content changes — shown in the footer.
export const LAST_UPDATED = "OCT 2026";

export const PROJECTS = [
  {
    id: "hellmann-wms",
    caseNumber: 1,
    title: "<accent>HELLMANN</accent> WAREHOUSE WORKFLOW PLATFORM",
    shortTitle: "Hellmann Workflow",
    status: "In Rollout · Phase 1",
    tagline:
      "An event-sourced workflow platform that tracks every purchase order through 11 stages across 9 operational teams of a third-party logistics warehouse, replacing spreadsheet coordination and verbal hand-offs with live tablet, desktop and overhead-screen workflows",
    role: "Software Engineer (Team Member)",
    timeline: "2026 — Phased rollout in progress",
    techStack: ["Python", "FastAPI", "SQLAlchemy (async)", "PostgreSQL", "React", "TypeScript", "WebSockets", "RabbitMQ", "Docker", "Cloud Run"],
    heroImage: {
      src: "/projects/hellmann/workflow.svg",
      alt: "Purchase order workflow across warehouse teams",
    },
    architecture: {
      body: [
        "Before the platform, nobody could see where a purchase order sat on the floor: picks were confirmed verbally, hand-offs happened between shifts by word of mouth and routing was worked out by hand from a shared spreadsheet. The platform gives each of the 9 teams the same lifecycle — <accent>Queue → Accepted → Ongoing → Finished</accent> — on tablet operator screens, desktop control panels, overhead TV boards and reports, all updated live over WebSockets.",
        "The backend is split into three services: a FastAPI <accent>api</accent> that runs the workflow engine and serves REST and WebSocket traffic, a <accent>worker</accent> that consumes RabbitMQ for notifications and background jobs, and an <accent>integration</accent> service that is the only component allowed to reach the internet. State is <accent>event-sourced</accent>: nothing is updated in place, every action is appended to an events table in PostgreSQL and current state is rebuilt by replaying it. The 11 stages, their routing rules, preconditions and escalations live in a versioned <accent>YAML workflow definition</accent>, so changing the process is a config change, not a code change.",
      ],
    },
    rollout: [
      { title: "Requirements & prototype", body: "Operational pain points — no live PO visibility, verbal hand-offs, manual routing — turned into system requirements and a screen-by-screen prototype.", state: "done" },
      { title: "Core engine & 9 team workflows", body: "Event store, YAML workflow engine, per-team screens, dashboards and reports.", state: "done" },
      { title: "Test deployment with client IT", body: "Cloud Run test environment validated against real operational data.", state: "done" },
      { title: "Phase 1 — live alongside Excel", body: "Early teams run their work in the platform while the legacy spreadsheet process continues in parallel.", state: "current" },
      { title: "UAT & full cutover", body: "Acceptance testing, then retiring the spreadsheet process team by team.", state: "planned" },
      { title: "Phase 2 — WMS integration", body: "Direct integration with the warehouse management system and further client workflows on the same engine.", state: "planned" },
    ],
    rolloutNote: "Running live with early teams while the legacy spreadsheet process continues in parallel.",
    techinical_decisions: {
      body: [
        "<accent>Partial releases.</accent> The unit that moves through the floor is a release of a purchase order, not the order itself, and the PO status is a rollup over its releases. One order can be in Pick, Split and Loading at the same time — the way the warehouse really works.",
        "<accent>Undo by appending, never deleting.</accent> Reversing a bad planning upload writes compensating events instead of UPDATE or DELETE, and a test asserts it. If the floor has already started the work, undo raises a reconciliation task instead of silently rewriting history.",
        "<accent>Idempotent spreadsheet ingest.</accent> During the parallel run, planning data still arrives as spreadsheets. Uploads are keyed by file hash, so a re-upload never creates duplicate work.",
        "<accent>Ping, then re-fetch.</accent> The server pushes a lightweight \"changed\" signal over WebSockets and screens re-fetch with debouncing, rather than streaming full payloads — keeping dozens of tablets and TV boards consistent with one source of truth. Workflow preconditions run through a whitelisted expression evaluator, never eval.",
      ],
      image: {
        src: "/projects/hellmann/architecture.svg",
        alt: "System architecture: React clients, FastAPI api service, PostgreSQL event store, RabbitMQ worker and integration service",
      },
    },
    contributions: [
      { title: "Requirements gathering", body: "Took part in requirements and planning meetings, translating operational pain points into system requirements." },
      { title: "Tablet operator screens", body: "React and TypeScript screens taking work from queue to finished, with hold and rollback." },
      { title: "Bulk actions & reports", body: "Bulk actions with live progress, and a reports page with CSV and Excel export." },
      { title: "API & queries", body: "FastAPI endpoints and PostgreSQL queries behind dashboards and reports, covered by automated backend tests." },
      { title: "Carton weight verification", body: "A FastAPI webhook service validating scale scans against per-carton baselines within a configurable tolerance — atomic, out-of-order-safe writes feeding live bay screens, quarantine for unregistered scales, config changes without redeploys, an offline test suite and a CLI simulator, on Cloud Run with structured logging." },
      { title: "Live team-card counts", body: "Live per-team counts on the operations console, refreshed by WebSocket pings with no polling, a per-user cache and no stale numbers — handling StrictMode double-mounts, hidden tabs and request coalescing." },
    ],
    gallery: [],
    challenges: [
      {
        num: "01",
        title: "Running Beside the Old Process",
        body: "The platform goes live team by team while spreadsheets keep running. Idempotent uploads, reversible undo and reconciliation tasks keep both worlds consistent, so a team can adopt it without the rest of the floor changing how it works.",
      },
      {
        num: "02",
        title: "Live Screens Under Load",
        body: "A live dashboard exhausted the database connection pool during testing. A lighter endpoint, a short shared replay cache, a fallback poll and a warm minimum instance took median response from 4.4s to 0.09s.",
      },
      {
        num: "03",
        title: "Out-of-Order Scale Data",
        body: "Floor scales post weights over webhooks with no ordering guarantee. Writes are atomic and order-safe, and scans from unknown scales are quarantined rather than dropped — no data loss, no wrong reading on a bay screen.",
      },
    ],
    challengeImage: {
      src: "/projects/hellmann/workflow.svg",
      alt: "Purchase order workflow across warehouse teams with supervisor escalation",
    },
    metrics: [
      { value: "11", label: "Workflow Stages" },
      { value: "9", label: "Operational Teams" },
      { value: "<1s", label: "Live Update Target" },
    ],
  },
  {
    id: "lumina",
    caseNumber: 2,
    title: "<accent>VOICE AI</accent> & FACIAL ENGINE",
    shortTitle: "Lumina Voice & Face",
    tagline:
      "The real-time voice agent and facial animation engine I built as one component of Lumina, a larger client platform. Users just talk, in any of 97 languages, and a 3D avatar answers with live lip-sync, emotion and gaze driven by the AI's streaming speech.",
    role: "Software Engineer — Voice Agent & Facial Engine (Lumina)",
    timeline: "2026",
    techStack: ["TypeScript", "React", "three.js", "Web Audio API", "Web Workers", "Gemini Live API", "Python", "FastAPI", "SQLModel", "PostgreSQL", "Cloud Run", "Firebase Hosting"],
    heroImage: {
      src: "/projects/lumina/card.svg",
      alt: "Audio waveform turning into facial animation channels",
    },
    architecture: {
      body: [
        "Every design choice starts from <accent>latency</accent>. Audio streams directly between the browser and the <accent>Gemini Live API</accent> with no server relay — relaying would have added roughly 280ms to every turn. The FastAPI backend only mints <accent>short-lived, single-use ephemeral tokens</accent> with the session configuration locked server-side, so the browser can talk to the model but cannot change who the model is. Nothing on the voice path is ever awaited, and a cold start can only ever land on the token request, never mid-conversation.",
        "Around that hot path the backend does the operational work: <accent>versioned prompts</accent> with an admin console (edit, history, restore), hashed API keys with origin allowlists and per-minute and monthly quotas, a transcript and metrics ingest that answers 202 immediately and is written in batches by a background writer, and <accent>per-turn cost tracking</accent> priced from the provider's real usage data. A WebSocket side channel streams the rolling transcript to a lightweight \"director\" model that returns affect and gaze cues for the face.",
      ],
    },
    techinical_decisions: {
      body: [
        "<accent>Phoneme-anchored lip-sync.</accent> Text supplies which sound is spoken; audio supplies when. Server-side grapheme-to-phoneme produces IPA phones, and a duration-explicit semi-Markov Viterbi forced aligner places them on the streaming audio. If alignment fails the engine degrades gracefully — acoustic-only, then neutral — instead of freezing the mouth.",
        "<accent>A mixer, not layers fighting each other.</accent> No layer writes final values. Lip-sync, emotion, gaze, blink and idle each contribute to 167 facial channels, and per-channel policies (additive-clamped, reflex-max, speech-dominant) resolve conflicts before constraints and spring smoothing — so a smile never breaks a lip closure.",
        "<accent>Avatar independence.</accent> The engine contains no three.js and no avatar-specific code. It talks to an AvatarAdapter contract, runs headless in Node, and every tunable lives in calibration data — a new character needs an adapter and a calibration file, not an engine change.",
        "<accent>Real-time discipline.</accent> The engine runs at 60Hz with zero per-frame allocation (preallocated typed arrays, dirty masks). Timing is sampled from the audio clock, not accumulated frame time, so the mouth never drifts from the voice. The debug UI reads a shared bus at 20Hz, keeping React off the hot path entirely.",
      ],
      image: {
        src: "/projects/lumina/architecture.svg",
        alt: "Architecture: browser streams audio directly to the Gemini Live API; FastAPI backend issues ephemeral tokens and handles prompts, keys, quotas, transcripts and cost",
      },
    },
    contributionsTitle: "Engineering Range",
    contributions: [
      { title: "Real-Time Audio & DSP", body: "16kHz PCM capture, gapless 24kHz playback scheduling, FFT feature extraction in a Web Worker ahead of playback, and VAD turn-taking tuned against latency budgets." },
      { title: "Speech & Linguistics", body: "IPA phonemization, a viseme taxonomy, coarticulation modelling with per-viseme resistance, and a forced aligner that works on streaming speech in any language." },
      { title: "3D Graphics & Animation", body: "three.js morph targets and bone routing, plus GLB tooling that inventories a rig, measures mouth and eye geometry in millimetres, and shrinks the model from 142 MiB to ~17 MB." },
      { title: "AI Integration", body: "Gemini Live API sessions with ephemeral tokens, a secondary director model for affect and gaze, context compression for long conversations, and latency-first configuration." },
      { title: "Backend & Data", body: "FastAPI and SQLModel services: prompt versioning with an admin UI, API keys and quotas, and a non-blocking transcript and metrics pipeline on PostgreSQL." },
      { title: "Cloud & Cost", body: "Cloud Run and a Firebase Hosting CDN with secrets in Secret Manager, and per-turn cost reconciliation against the provider's billing data." },
    ],
    galleryCaptions: true,
    gallery: [
      {
        src: "/projects/lumina/aperture-timeline.png",
        alt: "Chart of rendered mouth aperture over a session, with agent speaking turns highlighted",
        title: "Diagnosing Lip-Sync From Rendered Frames",
        caption: "Mouth aperture measured from rendered video, turn by turn.",
        fit: "contain",
      },
      {
        src: "/projects/lumina/modulation-spectrum.png",
        alt: "Modulation spectrum of mouth movement compared with the syllabic band",
        title: "Modulation Spectrum vs. Syllabic Band",
        caption: "Movement peaked near 1Hz — far below the 4–6Hz rhythm of speech.",
        fit: "contain",
      },
    ],
    challenges: [
      {
        num: "01",
        title: "The Mouth Wasn't Speaking",
        body: "An early lip-sync looked busy but wrong. Measuring mouth aperture from rendered frames showed movement peaking around 1Hz while syllables arrive at 4–6Hz. That finding drove the rebuild around phoneme anchoring and coarticulation.",
      },
      {
        num: "02",
        title: "Interruptions Mid-Word",
        body: "When a user cuts in, audio playback, the viseme timeline and the five-state conversation machine all reset together, so the avatar stops speaking mid-word and visibly starts listening instead of mouthing words that were never played.",
      },
      {
        num: "03",
        title: "Animation State Bugs",
        body: "The three.js animation mixer snapped the rig back to a T-pose between clips — fixed by posing it at the clip's first keyframe before playback. A state-machine fall-through made the avatar look away mid-sentence; gaze is now driven explicitly per conversation state.",
      },
    ],
    challengeImage: {
      src: "/projects/lumina/engine.svg",
      alt: "Facial performance engine pipeline from audio and transcript to avatar adapter",
    },
    metrics: [
      { value: "97", label: "Languages" },
      { value: "60Hz", label: "Facial Performance" },
      { value: "~280ms", label: "Saved per Turn" },
    ],
  },
  {
    id: "epitoni",
    caseNumber: 3,
    title: "<accent>EPITONI</accent> SAAS PLATFORM",
    shortTitle: "Epitoni SaaS",
    tagline:
      "A serverless customer-engagement platform that lets local businesses publish promotions, run loyalty programs and reach opted-in customers — matched by interest through a Neo4j graph of tags",
    role: "Full Stack Developer (Primary Engineer)",
    timeline: "14 Months (Aug 2024 - Sep 2025)",
    techStack: ["React", "Redux Toolkit", "Python", "Cloud Functions", "API Gateway", "Firestore", "Neo4j", "Firebase Auth"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80",
      alt: "Abstract 3D network nodes with glowing gold paths on dark background",
    },
    architecture: {
      body: [
        "Epitoni is fully <accent>serverless</accent> on Google Cloud. A React business portal and a customer mobile app call a single <accent>API Gateway</accent> (OpenAPI 2.0 with Firebase JWT auth), which routes to 77 small Python Cloud Functions grouped by domain — auth, promotions, credits, loyalty, groups, get-notified, check-ins, interest graph and messaging — each deployed and scaled independently.",
        "Persistence is polyglot: <accent>Firestore</accent> holds transactional data split across 11 domain databases, while <accent>Neo4j Aura</accent> holds the interest graph that drives targeting. Functions also call each other — a promotion push calls the Credits service to check and deduct its fee, and OTP validation calls the graph service to create the new user's node.",
      ],
    },
    techinical_decisions: {
      body: [
        `Epitoni's targeting depends on an interest graph. Businesses, promotions and customers are tagged (malls, hobbies, shopping preferences) and linked in Neo4j, so "which offers are relevant to this user?" is a single Cypher traversal instead of an expensive multi-join query.`,
        `Main node types: (:User), (:Business), (:Promotion) and (:Tag). Main relationships: FOLLOWS, LOCKED, POSTED and tag links.`,
        `Graph writes are idempotent — tags and relationships use Cypher MERGE, so repeated calls never duplicate nodes or edges. A user's graph node is created as soon as their OTP sign-up is validated.`,
        `Only relationship-critical data lives in the graph. Profiles, promotions, loyalty points and logs stay in Firestore — keeping queries fast and the schema focused.`,
      ],
      image: {
        src: "/projects/epitoni/neo4j-graph.png",
        alt: "Graph database visualization with interconnected nodes and relationships",
      },
    },

    gallery: [
      {
        src: "/projects/epitoni/login.avif",
        alt: "Epitoni business portal sign-in screen",
        title: "Business Portal Sign-In",
        caption: "Email and Google sign-in backed by Firebase Authentication.",
      },
      {
        src: "/projects/epitoni/home.png",
        alt: "Epitoni business portal home page",
        title: "Business Portal Home",
        caption: "Entry point to register businesses, manage listings and create customer groups.",
      },
      {
        src: "/projects/epitoni/businessList.png",
        alt: "Grid of registered businesses with status badges",
        title: "Business Listings",
        caption: "All businesses an owner manages, with active and suspended status.",
      },
      {
        src: "/projects/epitoni/businessInfo.png",
        alt: "Business profile with promotion credits and promotions",
        title: "Promotions & Credits",
        caption: "General, personalized and spontaneous promos, paid for with pay-per-push credits.",
      },
      {
        src: "/projects/epitoni/dashboard1.png",
        alt: "Analytics dashboard with donut charts for promotion engagement",
        title: "Analytics Dashboard",
        caption: "Promotion locks, clicks and referral sources visualized with Nivo charts.",
      },
      {
        src: "/projects/epitoni/dashboard2.png",
        alt: "Line charts of follower growth and business clicks over time",
        title: "Growth Trends",
        caption: "Follower growth and business clicks tracked over time.",
      },
      {
        src: "/projects/epitoni/api1.png",
        alt: "Loyalty points API console with secret keys",
        title: "Loyalty Points API",
        caption: "Businesses manage API secrets and add or redeem customer points from their own systems.",
      },
      {
        src: "/projects/epitoni/api2.avif",
        alt: "Add Points API request and JSON response",
        title: "Try the API",
        caption: "Interactive console to send EARN requests and inspect the JSON response.",
      },
      {
        src: "/projects/epitoni/api3.png",
        alt: "Add Points API usage guide",
        title: "API Guide",
        caption: "Plain-language guide to required inputs and returned transaction data.",
      },
      {
        src: "/projects/epitoni/api4.jpg",
        alt: "Add Points API reference with endpoint, headers and JWT payload",
        title: "API Reference",
        caption: "Endpoint, headers and JWT payload for authenticated Cloud Function calls.",
      },
    ],
    challenges: [
      {
        num: "01",
        title: "Service-to-Service Billing",
        body: "Every promotion push had to be paid for. The push service calls the Credits service to check the business's balance and deduct its fee, handling FREE versus paid credit types and returning clear errors when the balance is insufficient.",
      },
      {
        num: "02",
        title: "Consistency Across 77 Functions",
        body: "Each function verifies the Firebase token, validates input with Pydantic models that reject unknown fields, raises typed errors and writes structured Cloud Logging. That common code was copied into each function — a shared package and a CI/CD pipeline are the next step.",
      },
    ],
    challengeImage: {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80",
      alt: "Complex data structures with glowing network architecture",
    },
    metrics: [
      { value: "77", label: "Serverless Cloud Functions" },
      { value: "11", label: "Firestore Databases" },
      { value: "~50K", label: "Lines of Code Shipped" },
    ],
  },

  {
    id: "neo-ji-agentic-ai",
    caseNumber: 4,
    title: "<accent>NEO-JI</accent> AGENTIC AI",
    shortTitle: "Agentic AI",
    tagline:
      "A drop-in conversational AI widget for any website — voice, text, and real-time chat in one script tag.",
    role: "Full Stack Engineer",
    timeline: "3 Months(Ongoing)",
    techStack: [
      "Preact",
      "Shadow DOM",
      "Python",
      "Flask",
      "WebSockets",
      "Deepgram",
      "OpenAI GPT",
      "JWT",
      "OTP / MFA",
      "Google Cloud Platform",
      "CDN",
    ],
    heroImage: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80",
      alt: "Abstract circuit board visualization in dark tones",
    },
    architecture: {
      body: [
        "Neo-Ji is built as a <accent>two-layer system</accent>: a lightweight embeddable frontend widget and a Python Flask backend that orchestrates AI, voice, and session services.",
        "The frontend widget is built with <accent>Preact</accent> and bundled for CDN distribution. It uses <accent>Shadow DOM</accent> to fully isolate its styles and scripts from the host page, ensuring zero CSS or JS conflicts regardless of the site it is embedded on. Website owners integrate it via a <accent>single script tag</accent> with no build step or framework dependency required.",
        "The backend is a <accent>Flask API server</accent> deployed on <accent>Google Cloud Platform</accent>. It manages <accent>WebSocket connections</accent> for real-time bidirectional messaging, routes conversation turns to the <accent>OpenAI GPT API</accent>, and handles <accent>Deepgram</accent> speech-to-text and text-to-speech streams for voice interaction.",
        "<accent>Async processing</accent> was implemented across read/write operations to handle concurrent users without bottlenecks, resulting in a <accent>35% improvement in API throughput</accent>.",
      ],
    },
    techinical_decisions: {
      body: [
        "Preact over React: Preact was chosen for the widget layer due to its significantly smaller bundle size (~3kb vs ~45kb), which is critical for a CDN-distributed embed that must load fast on any third-party site.",
        "Shadow DOM for style isolation: Rather than relying on CSS namespacing or scoped classes, Shadow DOM provides hard browser-level encapsulation. This was the only reliable way to guarantee the widget renders correctly across arbitrary host pages with unknown stylesheets.",
        "WebSockets over HTTP polling: Polling introduced visible lag in conversational turns. A persistent WebSocket connection eliminated this, achieving under 50ms message latency and making the chat feel instant.",
        "Deepgram for voice: Deepgram was selected over alternatives for its streaming STT accuracy and low-latency TTS, enabling a full duplex voice experience directly in the browser widget without requiring any native app or plugin.",
      ],
      image: {
        src: "/projects/widget/widget_architecture.png",
        alt: "Graph database visualization with interconnected nodes and relationships",
      },
    },
    gallery: [
      {
        src: "/projects/widget/w2-center.png",
        alt: "Analytics query builder interface",
        title: "Query Builder Interface",
        caption:
          "Drag-and-drop OLAP query construction for non-technical users.",
      },
    ],
    challenges: [
      {
        num: "01",
        title: "Style isolation across unknown host pages",
        body: "Embedding a widget on arbitrary third-party websites means encountering unpredictable CSS environments. Standard scoped class approaches were unreliable. Shadow DOM was adopted to enforce hard browser-level style encapsulation, preventing leakage in both directions and ensuring the widget always renders correctly regardless of the host page's stylesheet.",
      },
      {
        num: "02",
        title: "Achieving real-time latency at scale",
        body: "Early prototypes used HTTP polling for message delivery, which introduced noticeable lag between user input and AI response. Switching to a persistent WebSocket architecture eliminated the overhead of repeated handshakes, reducing round-trip message latency to under 50ms. Async processing was also applied across Flask endpoints to prevent I/O blocking under concurrent sessions, improving overall API throughput by 35%.",
      },
    ],
    challengeImage: {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=80",
      alt: "Abstract data flow visualization",
    },
    metrics: [
      { value: "<50ms", label: "Message latency via WebSockets" },
      { value: "95%+", label: "Voice transcription accuracy" },
      { value: "35%", label: "Improvement in API throughput" },
    ],
  },

  {
    id: "realtime-messaging-mqtt",
    caseNumber: 5,
    title: "<accent>Real-Time</accent> Messaging System",
    shortTitle: "MQTT Chat Backend",
    tagline:
      "Low-latency, encrypted, production-grade chat infrastructure built on MQTT and Google Cloud.",
    role: "Tech Lead & Backend Architect",
    timeline: "2025",
    techStack: [
      "MQTT (Mosquitto)",
      "Google Compute Engine",
      "Google Cloud Run",
      "Python",
      "Flutter",
      "Firebase Authentication",
      "Firestore",
      "ECC + AES Cryptography",
      "TLS (port 8883)",
    ],
    heroImage: {
      src: "",
      alt: "MQTT real-time messaging system architecture on Google Cloud",
    },
    architecture: {
      body: [
        "The system is built on a <accent>publish-subscribe model</accent> using the <accent>MQTT protocol</accent>, chosen for its lightweight footprint and low-latency characteristics ideal for mobile chat applications.",

        "A <accent>Mosquitto MQTT broker</accent> is deployed on <accent>Google Compute Engine</accent> with a high-availability configuration, serving as the central message routing layer for all client communication.",

        "Mobile clients (Flutter — iOS and Android) connect to the broker over MQTT with <accent>TLS</accent> on port 8883, ensuring <accent>transport-level security</accent> for all connections.",

        "Topics are structured as <accent>users/{userId}/inbox</accent>, enabling direct message delivery to individual user inboxes with clean separation between conversations.",

        "A <accent>Python-based microservice</accent> deployed on <accent>Google Cloud Run</accent> acts as the backend API layer, handling message publishing, topic management, and business logic via REST endpoints.",

        "<accent>Firebase Authentication</accent> is used on the client side to manage user identity and secure access before any broker interaction.",

        "All messages are persisted to <accent>Firestore</accent>, providing a reliable message history layer decoupled from the broker's transient delivery model.",
      ],
    },
    techinical_decisions: {
      body: [
        "MQTT was chosen over WebSockets or HTTP long-polling due to its native pub-sub model, minimal protocol overhead, and proven performance in mobile-first, real-time communication scenarios.",
        "Mosquitto was selected as the broker for its lightweight resource footprint, mature TLS support, and straightforward deployment on Compute Engine without managed service overhead.",
        "Cloud Run was used for the microservice layer to keep the backend stateless and auto-scalable, avoiding the cost of always-on compute for API operations.",
        "The topic schema users/{userId}/inbox was deliberately kept flat and user-centric to simplify subscription management on mobile clients and avoid over-engineering topic hierarchies.",
        "Hybrid ECC + AES encryption was chosen for end-to-end security — ECC provides efficient asymmetric key exchange without the overhead of RSA, while AES handles fast symmetric encryption of message payloads, making the scheme both secure and performant on mobile devices.",
        "Firestore was selected as the persistence layer for its real-time sync capabilities, schemaless flexibility, and native integration with the Firebase ecosystem already used for authentication.",
      ],
      image: {
        src: "/projects/chat/chat-architecture.png",
        alt: "Technical architecture decision diagram for MQTT messaging system",
      },
    },
    gallery: [],
    challenges: [
      {
        num: "01",
        title: "ECC Key Exchange Between Mobile Clients",
        body: "The most technically demanding aspect of the project was implementing secure ECC key pair generation and exchange between two Flutter mobile clients. This required designing a flow where each client generates its own ECC key pair, securely shares the public key via the backend, and derives a shared secret to seed AES encryption — all without exposing private keys at any point in the pipeline. Achieving this correctly in Flutter required careful selection of cryptographic libraries and rigorous validation of the key exchange sequence.",
      },
      {
        num: "02",
        title: "Broker Security Without a Managed Auth Layer",
        body: "Integrating Firebase Authentication with Mosquitto required bridging two systems that don't natively communicate. Firebase handles client identity, but Mosquitto has no built-in Firebase plugin. The solution involved enforcing authentication at the Cloud Run API layer and securing broker access through TLS and credential management, creating a layered security model without modifying the broker core.",
      }
    ],
    challengeImage: {
      src: "",
      alt: "ECC key exchange flow diagram between Flutter mobile clients",
    },
    metrics: [
      {
        label: "Message Delivery Latency",
        value: "<100ms",
        description:
          "End-to-end message delivery latency measured in production across mobile clients.",
      },
      {
        label: "Encryption Standard",
        value: "ECC + AES",
        description:
          "Hybrid end-to-end encryption applied to all message payloads — zero plaintext transmission.",
      },
      {
        label: "Transport Security",
        value: "TLS 8883",
        description:
          "All broker connections secured via MQTT over TLS on port 8883.",
      },
    ],
  },
  {
    id: "sliit-attendance-system",
    caseNumber: 6,
    title: "<accent>Real-Time</accent> Attendance Management System",
    shortTitle: "Attendance System",
    tagline:
      "Real-time face recognition-driven attendance tracking with rule-based logic for 11 attendance scenarios",
    role: "Full-Stack Developer",
    timeline: "1–2 Months",
    techStack: [
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Python",
      "MongoDB",
      "Motor",
      "Pydantic",
      "Webhook Integration",
    ],
    heroImage: {
      src: "/projects/sliit-attendance/hero.png",
      alt: "SLIIT Attendance Management System dashboard overview",
    },
    architecture: {
      body: [
        "The system follows an <accent>event-driven architecture</accent> where a teammate's face recognition service pushes <accent>real-time recognition events</accent> to a webhook endpoint on the FastAPI backend. Each event is immediately ingested, validated via <accent>Pydantic models</accent>, and persisted to <accent>MongoDB</accent> through Motor — the async MongoDB driver — ensuring no blocking I/O on the main thread.",

        "The backend exposes 45+ <accent>async REST API endpoints</accent> organized around core domain entities: teachers, students, courses, groups, lecture halls, schedules, attendance, simulation, and reports. All endpoints use <accent>async/await</accent>, allowing the server to handle concurrent requests without thread contention.",

        "MongoDB stores 12 collections including raw attendance events, calculated attendance records, presence sessions, and simulation logs. <accent>Compound indexes</accent> on frequently queried fields (student ID, course code, date) were benchmarked before and after, resulting in approximately <accent>50% reduction in query response times</accent>.",

        "The <accent>Next.js (App Router)</accent> frontend communicates with the backend via REST, rendering 10 pages including a <accent>real-time attendance dashboard</accent>, a simulation module for hardware-free testing, and a comprehensive reports page with <accent>PDF/Excel export</accent> capabilities.",
      ],
    },

    techinical_decisions: {
      body: [
        "Motor over PyMongo: Since all FastAPI endpoints are async, using the synchronous PyMongo driver would have blocked the event loop on every database call. Motor provides a native async interface to MongoDB, keeping the entire request pipeline non-blocking.",
        "Rule-based logic engine over ML: Attendance classification (late arrival, early exit, unauthorized access, back-to-back lectures, multiple exits etc.) was implemented as a deterministic rule engine rather than a model. This made behavior predictable, auditable, and easy to adjust thresholds (e.g. grace period, late threshold) via environment config without retraining.",
        "Simulation module as a first-class feature: Rather than mocking data in tests, a dedicated simulation endpoint and frontend page were built to create attendance events without camera hardware. And also used 2 cameras during the POC phase and made stakeholder demonstrations straightforward.",
        "Webhook-based ingestion over polling: The face recognition service pushes events to the backend the moment a face is recognized, rather than the backend polling on an interval. This keeps attendance records up to date in real time and reduces unnecessary load.",
      ],
      image: {
        src: "/projects/sliit-attendance/architecture.png",
        alt: "Technical architecture diagram for SLIIT Attendance Management System",
      },
    },
    gallery: [],
    challenges: [
      {
        num: "01",
        title: "Handling 11 Attendance Scenarios Without Ambiguity",
        body: "Attendance is rarely binary. A student might arrive late, leave early, take a break, attend a back-to-back lecture, or enter an unauthorized hall. Each combination needed a distinct classification with clear, non-overlapping rules. The challenge was designing a logic engine where edge cases didn't bleed into each other — solved by processing events in strict chronological order per student per day, applying rule priority, and flagging ambiguous records for manual review.",
      },
      {
        num: "02",
        title: "Real-Time Webhook Ingestion Without Performance Degradation",
        body: "During active lecture periods, multiple cameras could push recognition events simultaneously. Using synchronous database writes would have created a bottleneck. By making every API endpoint async and using Motor for non-blocking MongoDB writes, the backend could process concurrent webhook payloads without queuing delays or dropped events.",
      },
    ],
    challengeImage: {
      src: "",
      alt: "Attendance scenario classification logic diagram",
    },
    metrics: [
      {
        label: "Query Time Reduction",
        value: "~50%",
        description:
          "Measured before and after adding compound MongoDB indexes on student ID, course code, and date fields",
      },
      {
        label: "Attendance Scenarios",
        value: "11",
        description:
          "Distinct scenarios handled by the rule-based logic engine including late arrivals, early exits, unauthorized access, and back-to-back lectures",
      },
      {
        label: "API Endpoints",
        value: "45+",
        description:
          "Async REST endpoints covering all domain entities — teachers, students, courses, halls, schedules, attendance, simulation, and reports",
      },
      {
        label: "Frontend Pages",
        value: "10",
        description:
          "Next.js App Router pages including real-time dashboard, simulation module, and comprehensive analytics reports",
      },
    ],
  },

  {
    id: "saniro-erp",
    caseNumber: 7,
    title: "<accent>SANIRO</accent> MULTI-BRANCH ERP",
    shortTitle: "Saniro ERP",
    tagline:
      "A custom ERP for a three-branch steel fabrication and roofing business. It replaced paper job cards with one system for orders, payments, branch stock and the workshop floor, so every sheet of steel and every hour of labour is tracked and billed correctly.",
    role: "Full Stack Engineer (Two-Engineer Team)",
    timeline: "3 Months (Aug 2026 - Oct 2026)",
    techStack: ["TypeScript", "NestJS", "PostgreSQL", "TypeORM", "React 19", "TanStack Query", "TanStack Router", "Zod", "SSE", "pg-boss", "Playwright", "Turborepo"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80",
      alt: "Abstract network nodes on dark background",
    },
    architecture: {
      body: [
        "Saniro ERP is a <accent>TypeScript monorepo</accent> (pnpm workspaces + Turborepo) with a <accent>NestJS</accent> API, a <accent>React 19</accent> web app and a shared contract package. The shared package holds every enum, Zod schema, order state machine and error code, so the API and the UI can never drift apart.",
        "The API is split into 16 domain modules (job cards, roofing orders, payments, ledger, inventory, stock transfers, price list, gate passes, workers, permissions and more) over a <accent>PostgreSQL</accent> schema of 37 tables. Each module follows controller, service and repository layers. Every input is validated with Zod at the boundary and every failure returns a stable error code.",
        "A job card (the customer's order) holds many <accent>work orders</accent>, one per operation: cut, bend, pipe bending, sheet rolling or coil cutting. Each work order carries its measurements in a JSONB spec block and is priced from a central rate table. A line with no matching rate becomes a customized job that a supervisor prices by hand.",
        "Seven roles, from cashier and supervisor to head-office auditor, see screens filtered to their branch and permissions. Queues update live over <accent>Server-Sent Events</accent>, and background jobs run on <accent>pg-boss</accent> inside Postgres, so PostgreSQL is the only infrastructure the system needs.",
      ],
    },
    techinical_decisions: {
      body: [
        `<accent>One database, no Redis.</accent> Background jobs use pg-boss in Postgres, live updates are in-process SSE and caching is in memory. For a business of this size that removes a whole class of moving parts while still meeting the under-3-second queue refresh target.`,
        `<accent>Money is integers, and the ledger is append-only.</accent> All amounts are stored as cents. A payment and its ledger entry are written in one transaction, and only the LedgerService may write to the ledger. A job card cannot close until its balance due is exactly zero.`,
        `<accent>Branch isolation is enforced on the server.</accent> The branch is never taken from the request body; it comes from the user's role. Head-office roles can read every branch, but any write they attempt on branch work is refused with a 403. Watching and transacting stay separate.`,
        `<accent>Concurrency is handled in the data layer.</accent> Every write sends the record's version (optimistic locking), create calls carry a client request ID so retries never create duplicates, and the database itself checks that stock can never go below zero.`,
      ],
    },
    gallery: [],
    challenges: [
      {
        num: "01",
        title: "Stock Promised Twice",
        body: "Stock was only checked when work started, so two paid orders could count on the same sheets. We added a reservation layer that holds stock as soon as an order is saved (available = on hand − reserved) and consumes the hold when the line starts. Shortages need an audited branch override. A backfill script and an integrity check (reserved = sum of open holds) moved existing orders over safely.",
      },
      {
        num: "02",
        title: "Rules That Disagreed",
        body: "The approved prototype, the data model and the PRD's 26 business rules conflicted in several places, such as whether unpaid orders could reach the workshop. Each conflict was resolved with the product owner and written up as a numbered decision record, so both engineers built on the same rules and the reasoning is still there for whoever maintains the system next.",
      },
    ],
    challengeImage: {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80",
      alt: "Complex data structures with glowing network architecture",
    },
    metrics: [
      { value: "26", label: "Business Rules Enforced" },
      { value: "310+", label: "Automated API & E2E Tests" },
      { value: "79", label: "REST Endpoints Across 16 Modules" },
    ],
  },
];

/** Helper — look up a project by its URL id */
export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id) ?? null;
}

/** Helper — get next project (wraps around) */
export function getNextProject(currentId) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  return PROJECTS[(idx + 1) % PROJECTS.length];
}
