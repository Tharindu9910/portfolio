/**
 * projects.js — Single source of truth for all project data.
 * Add a new object to this array to create a new project page.
 */

export const PROJECTS = [
  {
    id: "epitoni",
    caseNumber: 1,
    title: "<accent>EPITONI</accent> SAAS PLATFORM",
    shortTitle: "Epitoni SaaS",
    tagline:
      "A cloud-native microservices platform bridging consumers and businesses through AI-powered personalization, real-time promotions, and multi-channel engagement — built for scale with a secure, enterprise-grade backend",
    role: "Full Stack Engineer",
    timeline: "15 Months (2024-2025)",
    techStack: ["React", "Flask", "Neo4j", "Firestore", "GCP", "Auth2"],
    heroImage: {
      src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80",
      alt: "Abstract 3D network nodes with glowing gold paths on dark background",
    },
    architecture: {
      body: [
        "The core engine was architected using a <accent>Microservices pattern</accent>. Each functional domain—Identity, Data Orchestration, and Visualization—was encapsulated within its own Flask backend, allowing for independent scaling and deployment.",
        "We leveraged <accent>Neo4j</accent> for managing complex, non-linear relationships between enterprise data entities, while <accent>Firestore</accent> served as our high-performance document store for real-time dashboard updates and collaboration.",
      ],
    },
    techinical_decisions: {
      body: [
        `Epitoni's personalization depends on a follow graph. A relational approach would require expensive multi-join queries to answer "what promotions are relevant to this user right now?" — Neo4j makes it a single Cypher traversal.`,
        `Main node types: (:User), (:Business), and (:Promotion).`,
        `Main relationships: FOLLOWS, LOCKED, and POSTED.`,
        `Only relationship-critical data lives in the graph. Full profiles and analytics stay in Firestore — keeping queries fast and the schema focused.`,
      ],
      image: {
        src: "/projects/epitoni/graph.jpg",
        alt: "Graph database visualization with interconnected nodes and relationships",
      },
    },

    gallery: [
      {
        src: "/projects/epitoni/login.avif",
        alt: "Real-time analytics dashboard showing metrics",
        title: "Real-time Analytics Dashboard",
        caption: "Unified telemetry and performance visualization engine.",
      },
      {
        src: "/projects/epitoni/home.png",
        alt: "Microservices management console interface",
        title: "Microservices Management Console",
        caption: "Orchestration interface for distributed service clusters.",
      },
      {
        src: "/projects/epitoni/businessList.png",
        alt: "Data relationship mapper visualization",
        title: "Data Relationship Mapper",
        caption: "Visualizing non-linear entity connections in Neo4j.",
      },
      {
        src: "/projects/epitoni/businessinfo.png",
        alt: "Enterprise settings and configuration interface",
        title: "Global Identity Manager",
        caption: "Centralized access control and user permissioning module.",
      },
      {
        src: "/projects/epitoni/dashboard1.png",
        alt: "Real-time analytics dashboard showing metrics",
        title: "Real-time Analytics Dashboard",
        caption: "Unified telemetry and performance visualization engine.",
      },
      {
        src: "/projects/epitoni/dashboard2.png",
        alt: "Real-time analytics dashboard showing metrics",
        title: "Real-time Analytics Dashboard",
        caption: "Unified telemetry and performance visualization engine.",
      },
      {
        src: "/projects/epitoni/api1.png",
        alt: "Microservices management console interface",
        title: "Microservices Management Console",
        caption: "Orchestration interface for distributed service clusters.",
      },
      {
        src: "/projects/epitoni/api2.avif",
        alt: "Data relationship mapper visualization",
        title: "Data Relationship Mapper",
        caption: "Visualizing non-linear entity connections in Neo4j.",
      },
      {
        src: "/projects/epitoni/api3.png",
        alt: "Enterprise settings and configuration interface",
        title: "Global Identity Manager",
        caption: "Centralized access control and user permissioning module.",
      },
      {
        src: "/projects/epitoni/api4.jpg",
        alt: "Enterprise settings and configuration interface",
        title: "Global Identity Manager",
        caption: "Centralized access control and user permissioning module.",
      },
    ],
    challenges: [
      {
        num: "01",
        title: "Distributed Consistency",
        body: "Maintaining transactional integrity across distributed Flask services required implementing a sophisticated Saga pattern, ensuring data stayed synchronized between Neo4j and our metadata caches.",
      },
      {
        num: "02",
        title: "Graph Query Optimization",
        body: "Complex deep-path queries in Neo4j were initially causing high latency. We optimized Cypher queries and slashed response times by 30%.",
      },
    ],
    challengeImage: {
      src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80",
      alt: "Complex data structures with glowing network architecture",
    },
    metrics: [
      { value: "99.9%", label: "Uptime SLA Maintained" },
      { value: "30%", label: "Query Latency Reduction" },
      { value: "120+", label: "Microservices on GCP" },
    ],
  },

  {
    id: "neo-ji-agentic-ai",
    caseNumber: 2,
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
    caseNumber: 3,
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
    caseNumber: 4,
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
      src: "/projects/sliit-attendance/challenges.png",
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
