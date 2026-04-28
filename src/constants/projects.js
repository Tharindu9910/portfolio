/**
 * projects.js — Single source of truth for all project data.
 * Add a new object to this array to create a new project page.
 */

export const PROJECTS = [
  {
    id: 'modular-saas-platform',
    caseNumber: '01',
    title: 'MODULAR SAAS PLATFORM',
    shortTitle: 'Modular SaaS',
    tagline:
      'A scalable microservices-based SaaS solution built for enterprise-grade data management and real-time visualization.',
    role: 'Lead Full Stack Engineer',
    timeline: '8 Months (2023)',
    techStack: ['React', 'Flask', 'Neo4j', 'Firestore', 'GCP'],
    heroImage: {
      src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1400&q=80',
      alt: 'Abstract 3D network nodes with glowing gold paths on dark background',
    },
    architecture: {
      body: [
        'The core engine was architected using a <accent>Microservices pattern</accent>. Each functional domain—Identity, Data Orchestration, and Visualization—was encapsulated within its own Flask backend, allowing for independent scaling and deployment.',
        'We leveraged <accent>Neo4j</accent> for managing complex, non-linear relationships between enterprise data entities, while <accent>Firestore</accent> served as our high-performance document store for real-time dashboard updates and collaboration.',
      ],
      code: `  class MicroserviceNode:
    def __init__(self, service_name, db_type):
        self.name = service_name
        self.db = ConnectionPool(db_type)

  graph_engine = Neo4jEngine(uri="bolt://neo4j.prod")
  realtime_sync = FirestoreClient(project="monolith-saas")`,
      codeLabel: 'Architecture.py',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        alt: 'Real-time analytics dashboard showing metrics',
        title: 'Real-time Analytics Dashboard',
        caption: 'Unified telemetry and performance visualization engine.',
      },
      {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80',
        alt: 'Microservices management console interface',
        title: 'Microservices Management Console',
        caption: 'Orchestration interface for distributed service clusters.',
      },
      {
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
        alt: 'Data relationship mapper visualization',
        title: 'Data Relationship Mapper',
        caption: 'Visualizing non-linear entity connections in Neo4j.',
      },
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
        alt: 'Enterprise settings and configuration interface',
        title: 'Global Identity Manager',
        caption: 'Centralized access control and user permissioning module.',
      },
    ],
    challenges: [
      {
        num: '01',
        title: 'Distributed Consistency',
        body: 'Maintaining transactional integrity across distributed Flask services required implementing a sophisticated Saga pattern, ensuring data stayed synchronized between Neo4j and our metadata caches.',
      },
      {
        num: '02',
        title: 'Graph Query Optimization',
        body: 'Complex deep-path queries in Neo4j were initially causing high latency. We optimized Cypher queries and implemented a multi-layered caching strategy that slashed response times by 30%.',
      },
    ],
    challengeImage: {
      src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
      alt: 'Complex data structures with glowing network architecture',
    },
    metrics: [
      { value: '99.9%', label: 'Uptime SLA Maintained' },
      { value: '30%',   label: 'Query Latency Reduction' },
      { value: '15+',   label: 'Microservices on GCP' },
    ],
  },

  {
    id: 'quantum-analytics-engine',
    caseNumber: '02',
    title: 'QUANTUM ANALYTICS ENGINE',
    shortTitle: 'Quantum Analytics',
    tagline:
      'A high-performance event-streaming analytics platform processing billions of data points with sub-second query latency.',
    role: 'Senior Backend Engineer',
    timeline: '6 Months (2023)',
    techStack: ['Go', 'Kafka', 'ClickHouse', 'Kubernetes', 'Terraform'],
    heroImage: {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80',
      alt: 'Abstract circuit board visualization in dark tones',
    },
    architecture: {
      body: [
        'The pipeline ingests events via <accent>Kafka</accent> with strict at-least-once delivery guarantees, fanning them out to domain-specific consumers written in <accent>Go</accent> for maximum throughput.',
        '<accent>ClickHouse</accent> underpins the OLAP layer, delivering sub-second aggregation over hundreds of millions of rows with columnar compression ratios of up to 15x.',
      ],
      code: `  type EventPipeline struct {
    consumer *kafka.Consumer
    store    *clickhouse.Client
  }

  func (p *EventPipeline) Process(ctx context.Context) {
    for msg := range p.consumer.Messages() {
        p.store.BatchInsert(ctx, msg.Payload)
    }
  }`,
      codeLabel: 'Pipeline.go',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        alt: 'Analytics query builder interface',
        title: 'Query Builder Interface',
        caption: 'Drag-and-drop OLAP query construction for non-technical users.',
      },
      {
        src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=80',
        alt: 'Real-time streaming event monitor',
        title: 'Event Stream Monitor',
        caption: 'Live Kafka consumer lag and throughput telemetry.',
      },
      {
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
        alt: 'Cluster resource utilization dashboard',
        title: 'Cluster Resource Dashboard',
        caption: 'Kubernetes pod autoscaling and resource allocation view.',
      },
      {
        src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
        alt: 'Data retention policy configuration screen',
        title: 'Retention Policy Manager',
        caption: 'Tiered storage rules with automated TTL enforcement.',
      },
    ],
    challenges: [
      {
        num: '01',
        title: 'Backpressure Management',
        body: 'Consumer lag during traffic spikes risked data loss. We introduced adaptive batch sizing and a token-bucket rate limiter at the ingestion gateway, flattening spikes without dropping events.',
      },
      {
        num: '02',
        title: 'Schema Evolution',
        body: 'Evolving event schemas across 30+ producers without downtime required adopting Protobuf with a central schema registry and backward-compatible migration tooling in our CI pipeline.',
      },
    ],
    challengeImage: {
      src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=900&q=80',
      alt: 'Abstract data flow visualization',
    },
    metrics: [
      { value: '4B+',  label: 'Events Processed Daily' },
      { value: '<1s',  label: 'P99 Query Latency' },
      { value: '99.7%', label: 'Pipeline Uptime' },
    ],
  },

  {
    id: 'nexus-cloud-core',
    caseNumber: '03',
    title: 'NEXUS CLOUD CORE',
    shortTitle: 'Nexus Cloud',
    tagline:
      'High-throughput distributed infrastructure designed for 10M+ concurrent WebSocket connections with sub-50ms global latency.',
    role: 'Lead Infrastructure Engineer',
    timeline: '10 Months (2022)',
    techStack: ['Kubernetes', 'Go', 'gRPC', 'Redis', 'Prometheus'],
    heroImage: {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&q=80',
      alt: 'Satellite earth view representing global cloud infrastructure',
    },
    architecture: {
      body: [
        'The connection layer is a custom <accent>Go</accent> server using io_uring for non-blocking I/O, sustaining 10M concurrent WebSocket connections per node with sub-1ms p99 dispatch latency.',
        'Cluster coordination runs over <accent>gRPC</accent> with mutual TLS, while <accent>Redis</accent> Cluster handles presence state and pub/sub fan-out across 48 regional edge nodes.',
      ],
      code: `  func NewConnectionHub(cfg Config) *Hub {
    return &Hub{
        conns:  make(map[string]*Conn, cfg.MaxConns),
        pubsub: redis.NewClusterClient(cfg.Redis),
        grpc:   grpc.NewServer(grpc.Creds(cfg.TLS)),
    }
  }

  // HandleMessage fans out to all regional subscribers
  func (h *Hub) HandleMessage(msg *pb.Message) {
    h.pubsub.Publish(ctx, msg.Channel, msg.Payload)
  }`,
      codeLabel: 'Hub.go',
    },
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80',
        alt: 'Global edge node topology map',
        title: 'Edge Node Topology',
        caption: '48-region PoP map with latency heat overlay.',
      },
      {
        src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
        alt: 'Prometheus metrics dashboard',
        title: 'Observability Dashboard',
        caption: 'P50/P95/P99 latency and connection saturation metrics.',
      },
      {
        src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80',
        alt: 'Kubernetes cluster management interface',
        title: 'Cluster Management Console',
        caption: 'Pod autoscaling and rolling deployment interface.',
      },
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        alt: 'WebSocket throughput monitoring screen',
        title: 'Throughput Monitor',
        caption: 'Real-time message rate and connection health tracking.',
      },
    ],
    challenges: [
      {
        num: '01',
        title: 'Head-of-Line Blocking',
        body: 'A single slow consumer stalling a shared event loop was eliminated by moving each connection onto an isolated goroutine with cooperative yielding, achieving true O(1) dispatch times regardless of load.',
      },
      {
        num: '02',
        title: 'Global State Consistency',
        body: 'Presence state across 48 PoPs required a CRDT-based replication model over Redis Cluster, tolerating up to 200ms network partitions without visible inconsistency to end users.',
      },
    ],
    challengeImage: {
      src: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80',
      alt: 'Abstract network topology visualization',
    },
    metrics: [
      { value: '10M+', label: 'Concurrent Connections' },
      { value: '48',   label: 'Global Edge Nodes' },
      { value: '<50ms', label: 'Global P99 Latency' },
    ],
  },
]

/** Helper — look up a project by its URL id */
export function getProjectById(id) {
  return PROJECTS.find((p) => p.id === id) ?? null
}

/** Helper — get next project (wraps around) */
export function getNextProject(currentId) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId)
  return PROJECTS[(idx + 1) % PROJECTS.length]
}
