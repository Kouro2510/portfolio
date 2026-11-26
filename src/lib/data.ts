export const profile = {
  name: "Le Thanh Phuong",
  role: "Full-Stack Developer",
  location: "Tan Binh, Ho Chi Minh City",
  email: "thanhphuong2510.work@gmail.com",
  phone: "0933 083 958",
  phoneHref: "tel:+84933083958",
  github: "github.com/Kouro2510",
  githubHref: "https://github.com/Kouro2510",
  cv: "/Le-Thanh-Phuong-CV.pdf",
  roles: [
    "Full-Stack Developer",
    "NestJS · Laravel",
    "React 19 · Next.js",
    "Flutter · Wearables",
    "Kubernetes & ArgoCD",
  ],
  intro:
    "I ship B2B platforms, internal tools, Web3 products and wearable health apps end to end — from database schema and API design to React/Next.js and Flutter clients and Kubernetes delivery.",
  statement:
    "Four years of taking systems from schema to production. Backend in NestJS and Laravel, frontend in React 19 and Next.js, mobile in Flutter with smartwatch and Polar integrations, infrastructure as code with Kustomize, ArgoCD and Bitbucket Pipelines. Comfortable owning a system alone when needed, and working in teams of up to twelve.",
};

export const stats = [
  { value: 4, suffix: "", label: "years shipping to production" },
  { value: 15, suffix: "+", label: "services on the GitOps platform" },
  { value: 370, suffix: "+", label: "infrastructure commits since 08/2026" },
  { value: 700, suffix: "+", label: "URLs regression-tested, zero PHP errors" },
];

export const achievements = [
  {
    tag: "GitOps",
    metric: "15+ services",
    title: "Kubernetes platform for a Web3 ecosystem",
    body: "Maintain and extend the Kubernetes/GitOps platform for NestJS, Java Spring Boot and React services: Kustomize overlays, ArgoCD applications and CI/CD for every repo — 370+ infrastructure commits since 08/2026.",
  },
  {
    tag: "Wearables",
    metric: "Watch + Polar",
    title: "Two wearable health & fitness apps",
    body: "Shipped Airnix and Fulfit end to end (Flutter + NestJS): smartwatches via HealthKit, Health Connect and BLE, Polar sensors via the Polar BLE SDK and AccessLink — all behind one device-agnostic data layer for body metrics, calories, workouts and gym training.",
  },
  {
    tag: "From scratch",
    metric: "6 weeks",
    title: "Admin CMS for an AI astrology social app",
    body: "Built the CMS from zero (135 of 214 commits): astrology rules, AI prompt management, SNS moderation, roles and 3-language i18n.",
  },
  {
    tag: "Security",
    metric: "PHP 7.4 → 8.2",
    title: "Incident review & production upgrades",
    body: "Ran a security incident review of a self-hosted 6-node cluster running 22 PHP workloads, then upgraded 4 production WordPress sites with 700+ URLs regression-tested and zero PHP errors.",
  },
  {
    tag: "Solo ownership",
    metric: "2.5 years",
    title: "B2B supplier portal, end to end",
    body: "Designed and ran the portal alone (Laravel + Next.js), replacing manual catalog updates with Excel/CSV bulk ingestion and near-real-time price sync via queues and webhooks.",
  },
];

export const skills = [
  {
    group: "Backend",
    items: [
      "TypeScript / Node.js",
      "NestJS",
      "CQRS",
      "TypeORM",
      "Prisma",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "REST API design",
      "RBAC & SSO auth",
      "BullMQ",
      "Laravel Queues",
      "Webhooks",
      "Socket.IO",
      "Java Spring Boot",
    ],
  },
  {
    group: "Frontend",
    items: [
      "React 19",
      "Next.js",
      "Vite",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "TailwindCSS",
      "Ant Design Pro",
      "i18n (ICU)",
      "wagmi",
      "WordPress theming",
    ],
  },
  {
    group: "Mobile & Wearables",
    items: [
      "Flutter (Dart)",
      "BLE sensor streaming",
      "Apple HealthKit",
      "Google Health Connect",
      "Polar BLE SDK",
      "Polar AccessLink API",
      "Offline-first sync",
      "FCM push",
    ],
  },
  {
    group: "Data",
    items: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Neo4j",
      "Redis",
      "Schema design",
      "Indexing",
      "Query & cache optimization",
    ],
  },
  {
    group: "DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "Kustomize",
      "Kubespray",
      "ArgoCD GitOps",
      "Bitbucket Pipelines",
      "AWS ECR",
      "GCP Artifact Registry",
      "New Relic",
      "Grafana",
      "Tempo",
    ],
  },
  {
    group: "Integrations",
    items: [
      "Stripe",
      "Slack API",
      "Google Gemini API",
      "Firebase",
      "AWS S3 / CloudFront",
      "Payment gateways",
      "Polygon NFT metadata",
      "Excel / CSV ingestion",
    ],
  },
];

export const marquee = [
  "NestJS",
  "Laravel",
  "React 19",
  "Next.js",
  "Flutter",
  "Kubernetes",
  "ArgoCD",
  "PostgreSQL",
  "Redis",
  "Docker",
  "TypeScript",
  "MongoDB",
  "Stripe",
];

export type Project = {
  title: string;
  period: string;
  team: string;
  stack: string[];
  summary?: string;
  bullets: string[];
};

export type Job = {
  company: string;
  role: string;
  place: string;
  period: string;
  projects: Project[];
};

export const jobs: Job[] = [
  {
    company: "Metagrit",
    role: "Full-Stack Developer",
    place: "Ho Chi Minh City",
    period: "06/2025 — present",
    projects: [
      {
        title: "Web3 Account & Rewards Platform",
        period: "08/2026 — present",
        team: "Team of 8",
        stack: [
          "NestJS",
          "React 19",
          "Java Spring Boot",
          "MySQL",
          "Redis",
          "Kubernetes",
          "ArgoCD",
          "AWS ECR",
        ],
        summary:
          "Account management system (token distribution, staking, OTC), a walk-to-earn mobile app, an NFT marketplace and SSO.",
        bullets: [
          "Maintain and extend the Kubernetes/GitOps platform: Kustomize bases with staging and production overlays and ArgoCD applications for 15+ services — core API, background jobs, data mining, SSO, marketplace and walk-to-earn microservices.",
          "Built Bitbucket Pipelines CI/CD for Java (Maven), NestJS and React repos: Docker images to AWS ECR, selective builds from git diff, automated manifest bumps and ArgoCD sync.",
          "Shipped core API features: email sign-up proxied to SSO with self-service account deletion, admin v2 auth with RBAC, Universal/App Links deeplinks, NFT marketplace sync with Polygon minting metadata, walk-to-earn activity sync and walk-reward CMS APIs with Swagger docs.",
          "Delivered the account web app v2 screens in React 19 with TanStack Query, ICU i18n and wagmi: sign-up with password policy, paginated activity history, asset views and app/web sync status.",
        ],
      },
      {
        title: "AI Astrology Social App",
        period: "06/2026 — 08/2026",
        team: "Team of 6",
        stack: [
          "NestJS (CQRS)",
          "TypeORM",
          "MongoDB",
          "Neo4j",
          "Redis / BullMQ",
          "Socket.IO",
          "Google Gemini",
          "Ant Design Pro",
        ],
        summary:
          "Astrology-based personality and social app with AI daily fortunes, relationship compatibility analysis, mascots and a social feed.",
        bullets: [
          "Built the admin CMS from scratch (135 of 214 commits): astrology rules (MBTI, Ten Gods, zodiac), daily fortunes, AI prompt management, SNS analytics and moderation, system admin and roles, 3-language i18n.",
          "Moved AI prompts from code into database-driven Handlebars templates with per-language versions and migrations; built the AI relationship-compatibility analysis with admin audit history.",
          "Implemented RBAC with cached permissions, mascot/trait/appearance CRUD with automatic image cleanup, and the analytics dashboard endpoint.",
          "Added observability (New Relic APM, Grafana error and APM dashboards, Tempo traces) and Kubernetes manifests with Gitflow-validated pipelines and ArgoCD sync for the CMS.",
        ],
      },
      {
        title: "Landing-page Platform on Kubernetes",
        period: "04/2026 — present",
        team: "Solo",
        stack: [
          "WordPress",
          "Next.js",
          "Docker",
          "Kubernetes (Kubespray)",
          "ArgoCD",
          "Bitbucket Pipelines",
        ],
        bullets: [
          "Containerized and deployed 7 client landing sites with a shared Kustomize base, ArgoCD applications and per-site CI/CD; migrated sites from subpaths to root domains with reverse-proxy HTTPS handling.",
          "Ran the 10/2026 security review of the self-hosted 6-node cluster (22 PHP containers) with read-only incident-response scans of pods and nodes; isolated one suspected compromised pod and reported findings and remediation to management.",
          "Upgraded 4 production WordPress sites from PHP 7.4 to 8.2.35 and WordPress 7.1.3 to close RCE advisories, regression-testing 700+ URLs with zero PHP errors.",
        ],
      },
      {
        title: "Fulfit — Fitness & Gym Training App",
        period: "01/2026 — 05/2026",
        team: "Team of 6",
        stack: [
          "Flutter",
          "NestJS",
          "PostgreSQL",
          "Polar BLE SDK",
          "Polar AccessLink",
          "Apple HealthKit",
          "Google Health Connect",
        ],
        summary:
          "Fitness and gym-training app that connects both smartwatches and Polar heart-rate sensors and watches.",
        bullets: [
          "Architected a device-agnostic integration layer (one adapter each for Polar, HealthKit and Health Connect) that normalizes heart rate, RR intervals, steps and calories into one data model, so new devices plug in without touching business logic.",
          "Integrated Polar end to end: real-time heart-rate and RR-interval streaming over the Polar BLE SDK during live workouts with auto-reconnect and offline buffering, plus OAuth2 AccessLink cloud sync with webhooks for exercises, daily activity and sleep.",
          "Built live workout and gym sessions: heart-rate zones, training load, HR-based calories, set/rep/weight logs and personal records.",
          "Deduplicated workouts recorded by the watch and Polar at the same time (source priority and time-window merge), keeping calorie and activity totals accurate across devices.",
        ],
      },
      {
        title: "Entertainment & Merchant Advertising Platform",
        period: "12/2025 — 05/2026",
        team: "Team of 12",
        stack: ["NestJS", "Next.js", "MySQL", "MongoDB", "Stripe"],
        summary:
          "Mobile platform combining entertainment, a social network and advertising for merchant shops.",
        bullets: [
          "Designed the advertising contract model and merchant dashboard for creating and monitoring ad campaigns; integrated Stripe for monthly subscription billing and ad-spend invoicing.",
          "Built core social features (feed, content delivery, community interactions) with real-time updates, plus a gacha-style reward system (drop probability, inventory) and a slot mini-game backend (real-time state, payout logic).",
        ],
      },
      {
        title: "Internal HRM System",
        period: "10/2025 — 12/2025",
        team: "Team of 4",
        stack: ["NestJS", "Next.js", "PostgreSQL", "Slack API"],
        bullets: [
          "Designed PostgreSQL schemas and business logic for daily attendance, leave requests with automatic annual-leave balance calculation, and monthly timesheet aggregation — replacing manual spreadsheets.",
          "Built Slack notification triggers for leave requests, approvals and timesheet events so managers approve without opening the app.",
        ],
      },
      {
        title: "Airnix — Smart Health & Wearable App",
        period: "09/2025 — 01/2026",
        team: "Team of 5",
        stack: [
          "Flutter",
          "NestJS",
          "PostgreSQL",
          "Redis / BullMQ",
          "BLE",
          "Apple HealthKit",
          "Google Health Connect",
        ],
        summary:
          "Health app that connects to smartwatches to track body metrics, calories, daily activity, workouts and gym training.",
        bullets: [
          "Built the Flutter app for iOS and Android: smartwatch pairing over BLE, background sync from HealthKit and Health Connect, and dashboards for heart rate, SpO2, sleep, steps and body composition (weight, BMI, body fat).",
          "Designed the NestJS ingestion API and a PostgreSQL time-series schema with hourly, daily and weekly rollups; idempotent batch uploads keep offline replays from the watch from double-counting.",
          "Built the calorie engine: BMR (Mifflin-St Jeor) plus activity energy from heart rate and MET values, per-session burn for running, cycling and gym workouts, and daily intake-versus-burn balance; weekly progress reports pushed via FCM from BullMQ jobs.",
        ],
      },
      {
        title: "Digital-Asset Trading Platform & Vehicle Service Booking",
        period: "06/2025 — 10/2025",
        team: "Teams of 2–4",
        stack: [
          "NestJS",
          "Laravel",
          "PostgreSQL",
          "MySQL",
          "Next.js",
          "React",
          "Angular",
        ],
        bullets: [
          "Trading platform: designed the trading engine architecture and PostgreSQL transaction ledger for a real-time digital-asset platform, keeping balances consistent under concurrent trades; built the admin CMS for deposit/withdrawal review and cash-flow monitoring, and the SEO-optimized Next.js landing page.",
          "Booking platform: built the end-to-end vehicle camera installation booking flow and staff scheduling CMS in Laravel; added a database caching layer for booking-heavy pages.",
        ],
      },
    ],
  },
  {
    company: "NhanhTravel",
    role: "Full-Stack Developer",
    place: "Ho Chi Minh City",
    period: "07/2022 — 06/2025",
    projects: [
      {
        title: "Enterprise Tourism Management Platform",
        period: "07/2022 — 06/2025",
        team: "Team of 10",
        stack: ["Laravel", "MySQL", "Redis"],
        summary:
          "Core HRM, KPI tracking and a central API serving web and mobile clients for a tourism operator.",
        bullets: [
          "Built modular REST APIs with role-based access control protecting HR and enterprise data; maintained versioned, documented APIs consumed by the mobile team.",
          "Designed and normalized the multi-tenant MySQL schema; tuned indexes and execution plans on the heaviest reports.",
          "Cut response time on KPI and report pages with Redis caching, eager loading and chunked processing during peak traffic.",
          "Integrated payment gateways, analytics and geolocation providers with idempotent webhook handling and retry-safe sync.",
        ],
      },
      {
        title: "B2B Supplier Portal",
        period: "01/2023 — 06/2025",
        team: "Solo",
        stack: ["Laravel", "Next.js", "MySQL"],
        summary:
          "B2B portal where third-party suppliers manage wholesale catalogs and tiered pricing themselves.",
        bullets: [
          "Owned the system end to end for 2.5 years: Laravel REST backend, Next.js dashboard, deployment and support — removing manual catalog updates for the internal team.",
          "Built Excel/CSV bulk ingestion for pricing, stock thresholds and product metadata, tuned to run concurrent bulk updates without locking inventory tables.",
          "Propagated supplier price changes to the core platform in near real time via Laravel Queues and webhooks; scoped every supplier to its own data with RBAC and API tokens.",
        ],
      },
    ],
  },
];

export const education = {
  school: "Nguyen Tat Thanh University",
  degree: "Bachelor of Information Technology",
  period: "09/2019 — 02/2023",
  note: "Classification: Good",
  languages: [
    {
      name: "English",
      level:
        "Reads technical documentation and writes code, commits and docs in English daily",
    },
    { name: "Vietnamese", level: "Native" },
  ],
};
