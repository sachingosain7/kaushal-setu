# ARCHITECTURE PLAN & SPECIFICATION: KAUSHAL SETU (कौशल सेतु)
## SIH 2026 Problem Statement ID: SIH26101
**Organization: MoSPI | Dept: Data Informatics & Innovation Division (DIID)**
**Theme: Smart Education | Product: Kaushal Setu — AI Skill Intelligence & Learning Platform**

---

### 1. System Architecture & Tech Stack Justification

#### 1.1 Architectural Blueprint
```
+-----------------------------------------------------------------------------------+
|                            CLIENT LAYER (Responsive)                              |
|  Next.js 15+ App Router, React 19, Tailwind CSS, Lucide Icons, Framer Motion       |
|  - Desktop: Collapsible Sidebar, 12-col Fluid Grid, Hairline Borders              |
|  - Mobile: Bottom Sheet Modals, Touch Tab Bar (44px min), Zero Horizontal Scroll  |
|  - Multilingual: next-intl / React i18n Context (English + Hindi)                |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|                        API & ORCHESTRATION LAYER (Next.js)                         |
|  - Edge/Server Streaming: AI Assistant & LLM Generation                           |
|  - Zod Validation: Strict request schemas & LLM JSON output guarantees            |
|  - Auth/RBAC: Parichay SSO Simulator + JWT Sessions (Learner, Trainer, Admin)     |
|  - Audit Logger: Security event recording (DPDP Act compliant)                    |
+-----------------------------------------------------------------------------------+
         │                                   │                           │
         ▼                                   ▼                           ▼
+---------------------+             +---------------------+     +-------------------+
|   COMPETENCY &      |             |   ASSESSMENT &      |     |  INTEGRATION &    |
|   RECOMMENDER       |             |   LLM ENGINE        |     |  ADAPTER LAYER    |
| - Math Gap Engine   |             | - Doc Ingestion     |     | - IgotClient      |
| - 4 Domains (33)    |             | - Semantic Chunking |     |   (Mock & Live)   |
| - TF-IDF Recommender|             | - Google Gemini     |     | - NSSTA TPAC      |
| - Bloom's Taxonomy  |             | - Zod Validator     |     |   Calendar Sync   |
+---------------------+             +---------------------+     +-------------------+
         │                                   │                           │
         └───────────────────────────────────┼───────────────────────────┘
                                             │
                                             ▼
+-----------------------------------------------------------------------------------+
|                              PERSISTENCE LAYER                                    |
|  Prisma ORM with SQLite (Local & Zero-Daemon) -> Ready for PostgreSQL/Supabase    |
|  150 Seed Officials across 8 MoSPI Divisions, 65 Courses, 12 TPAC Programmes      |
+-----------------------------------------------------------------------------------+
```

#### 1.2 Technology Decisions & Justification
1. **Frontend + Backend in Next.js App Router (TypeScript):**
   * Eliminates dual-language serialization friction and complex dual-daemon orchestration on evaluation laptops.
   * Native streaming (`ReadableStream`) for real-time generative responses in the AI Tutor and Assessment generator.
   * Full end-to-end type safety from database models down to UI form controls.
2. **Database: SQLite via Prisma ORM:**
   * Zero configuration, zero external database installation required for judges and reviewers to test locally with `npm run setup && npm run dev`.
   * The schema is 100% compliant with standard PostgreSQL/Supabase for production cloud deployment.
3. **AI: Google Gemini API via Provider-Agnostic `LLMProvider`:**
   * Interfaces with Gemini models when `GEMINI_API_KEY` is present.
   * Falls back automatically to an intelligent deterministic generator if no API key is supplied, ensuring the platform never breaks during a live hackathon demonstration.

---

### 2. Database Schema Specification (Prisma / SQL)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  LEARNER
  TRAINER
  ADMIN
}

enum Cadre {
  ISS        // Indian Statistical Service (Group A)
  SSS        // Subordinate Statistical Service (Group B)
  STATE_DES  // State Directorate of Economics & Statistics
}

enum Division {
  NAD    // National Accounts Division
  SDRD   // Survey Design and Research Division
  FOD    // Field Operations Division
  DPD    // Data Processing Division
  ESD    // Economic Statistics Division
  SSD    // Social Statistics Division
  PRICE  // Price Statistics Division
  DIID   // Data Informatics and Innovation Division
}

enum Domain {
  STATISTICAL
  TECHNICAL
  DIGITAL_GOVERNANCE
  BEHAVIOURAL
}

enum BloomLevel {
  REMEMBER
  UNDERSTAND
  APPLY
  ANALYZE
  EVALUATE
  CREATE
}

enum CourseType {
  IGOT_DIGITAL
  NSSTA_TPAC_RESIDENTIAL
  VIRTUAL_LAB
}

enum QuizStatus {
  DRAFT
  REVIEWED
  PUBLISHED
  ARCHIVED
}

model User {
  id              String            @id @default(uuid())
  email           String            @unique
  name            String
  designation     String
  cadre           Cadre             @default(SSS)
  division        Division          @default(DIID)
  role            Role              @default(LEARNER)
  experienceYears Int               @default(3)
  qualification   String            @default("M.Sc. Statistics")
  avatar          String?
  learningHours   Float             @default(0.0)
  streakDays      Int               @default(1)
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
  
  competencyScores UserCompetencyScore[]
  enrollments      Enrollment[]
  quizAttempts     QuizAttempt[]
  auditLogs        AuditLog[]
  createdQuizzes   Quiz[]
}

model Competency {
  id          String   @id @default(uuid())
  code        String   @unique // e.g. STAT_SURVEY_DESIGN
  name        String
  domain      Domain
  description String
  maxLevel    Int      @default(5)
  
  benchmarks  RoleBenchmark[]
  userScores  UserCompetencyScore[]
  courseMaps  CourseCompetency[]
}

model RoleBenchmark {
  id           String      @id @default(uuid())
  cadre        Cadre
  designation  String
  division     Division
  competencyId String
  targetLevel  Int         // 1 to 5
  weight       Float       @default(1.0)
  
  competency   Competency  @relation(fields: [competencyId], references: [id], onDelete: Cascade)
  @@unique([cadre, designation, division, competencyId])
}

model UserCompetencyScore {
  id              String      @id @default(uuid())
  userId          String
  competencyId    String
  currentLevel    Int         // 1 to 5
  confidence      Float       @default(0.8)
  lastAssessedAt  DateTime    @default(now())
  assessedVia     String      @default("DIAGNOSTIC") // DIAGNOSTIC, QUIZ, IGOT_SYNC
  
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  competency      Competency  @relation(fields: [competencyId], references: [id], onDelete: Cascade)
  @@unique([userId, competencyId])
}

model Course {
  id               String            @id @default(uuid())
  externalId       String            @unique // e.g. "do_2139485" for iGOT or "TPAC-2026-04"
  title            String
  provider         String            // "iGOT Karmayogi", "NSSTA Greater Noida"
  type             CourseType        @default(IGOT_DIGITAL)
  domain           Domain
  durationHours    Float
  level            Int               // target proficiency (1-5)
  description      String
  syllabus         String            // JSON string of modules
  isTpacApproved   Boolean           @default(false)
  tpacBatchDate    String?           // e.g. "15-26 March 2026"
  tpacSeats        Int?
  
  enrollments      Enrollment[]
  competencies     CourseCompetency[]
}

model CourseCompetency {
  courseId     String
  competencyId String
  gainLevel    Int         @default(1)
  
  course       Course      @relation(fields: [courseId], references: [id], onDelete: Cascade)
  competency   Competency  @relation(fields: [competencyId], references: [id], onDelete: Cascade)
  @@id([courseId, competencyId])
}

model Enrollment {
  id           String      @id @default(uuid())
  userId       String
  courseId     String
  status       String      @default("ENROLLED") // ENROLLED, IN_PROGRESS, COMPLETED
  progressPct  Int         @default(0)
  syncedIgot   Boolean     @default(true)
  certificate  String?
  startedAt    DateTime    @default(now())
  completedAt  DateTime?
  
  user         User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  course       Course      @relation(fields: [courseId], references: [id], onDelete: Cascade)
  @@unique([userId, courseId])
}

model Quiz {
  id              String         @id @default(uuid())
  title           String
  description     String
  domain          Domain
  division        Division?
  sourceFileName  String?
  sourceSnippet   String?
  status          QuizStatus     @default(DRAFT)
  targetCohort    String?
  createdById     String
  createdAt       DateTime       @default(now())
  
  creator         User           @relation(fields: [createdById], references: [id], onDelete: Cascade)
  questions       QuizQuestion[]
  attempts        QuizAttempt[]
}

model QuizQuestion {
  id             String      @id @default(uuid())
  quizId         String
  questionText   String
  optionA        String
  optionB        String
  optionC        String
  optionD        String
  correctOption  String      // "A", "B", "C", or "D"
  explanation    String
  difficulty     String      @default("MEDIUM") // EASY, MEDIUM, HARD
  bloomLevel     BloomLevel  @default(UNDERSTAND)
  sourceChunkRef String?
  orderIndex     Int         @default(0)
  
  quiz           Quiz        @relation(fields: [quizId], references: [id], onDelete: Cascade)
}

model QuizAttempt {
  id             String      @id @default(uuid())
  quizId         String
  userId         String
  score          Int
  totalQuestions Int
  percentage     Float
  passed         Boolean
  answersJson    String      // JSON of chosen options
  feedback       String
  attemptedAt    DateTime    @default(now())
  
  quiz           Quiz        @relation(fields: [quizId], references: [id], onDelete: Cascade)
  user           User        @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AuditLog {
  id         String   @id @default(uuid())
  userId     String?
  action     String   // e.g. "AUTH_LOGIN", "COMPETENCY_EVALUATED", "QUIZ_PUBLISHED"
  resource   String
  ipAddress  String   @default("10.20.1.104")
  details    String   // JSON string
  timestamp  DateTime @default(now())
  
  user       User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
}
```

---

### 3. API Route Inventory & Contracts

| Endpoint | Method | Role | Description |
| :--- | :---: | :---: | :--- |
| `/api/auth/login` | POST | Public | Parichay SSO mock or password authentication |
| `/api/auth/switch-role` | POST | Public | One-click persona switcher (Learner, Trainer, Admin) |
| `/api/auth/me` | GET | All | Current authenticated session details |
| `/api/competencies` | GET | All | Complete dictionary of 4 domains & 33 competencies |
| `/api/competencies/profile` | GET/PUT | Learner | Fetch/update official's current competency profile |
| `/api/competencies/gap-analysis`| GET | Learner/Admin | Computed mathematical skill gaps with ranking & explanation |
| `/api/recommendations/pathways` | GET | Learner | Blended recommendations (iGOT micro-courses + NSSTA TPAC calendar) |
| `/api/igot/courses` | GET | All | Mocked Sunbird course catalog listing |
| `/api/igot/enroll` | POST | Learner | Enroll in an iGOT course (records in local DB & mock client) |
| `/api/igot/sync-progress` | POST | Learner | Telemetry sync from iGOT player back into Kaushal Setu |
| `/api/assessment/upload-doc` | POST | Trainer | Parse uploaded PDF, DOCX, TXT or pasted transcript |
| `/api/assessment/generate` | POST | Trainer | Chunk text & trigger Google Gemini / Fallback MCQ generator |
| `/api/assessment/quizzes` | GET/POST | Trainer/All | List draft/published quizzes; save new quiz |
| `/api/assessment/quizzes/[id]` | GET/PUT/DEL | Trainer | Review, edit, discard or approve questions in Trainer Studio |
| `/api/assessment/quizzes/[id]/publish`| POST | Trainer | Publish quiz to designated cohorts |
| `/api/assessment/quizzes/[id]/attempt`| POST | Learner | Submit quiz responses, calculate score, write back competency |
| `/api/assistant/chat` | POST | All | Streaming conversational AI grounded in official statistics & learner profile |
| `/api/labs/sql/query` | POST | Learner | In-browser/server query runner on synthetic NSS microdata |
| `/api/labs/sampling/simulate`| POST | Learner | Monte-Carlo sampling variance & bias calculator |
| `/api/admin/heatmap` | GET | Admin | Division x Domain aggregate competency matrix |
| `/api/admin/forecast` | GET | Admin | Predictive capacity building forecasting model |
| `/api/admin/export` | GET | Admin | CSV/PDF data export for ministry reporting |
| `/api/audit/logs` | GET | Admin | View immutable security and compliance audit trail |

---

### 4. Design System Tokens & Bridge Motif Specification

#### 4.1 Color System (Hex & Semantic Application)
* **Background Canvas:** Warm Paper `#FAF6EE` (Dark: `#0B132B`)
* **Primary Structural Text & Headers:** Ink Navy `#14213D` (Dark: `#E2E8F0`)
* **Primary Interactive Actions & Accents:** Saffron `#F28C28`
* **Success, Progress & Mastery:** Emerald `#0F8B6D`
* **Gap Warning & Critical Deficit:** Coral `#E4572E`
* **Domain Specific Colors (Consistent Everywhere):**
  - **Statistical Domain:** Indigo Chakra `#2C3E9E` (Tag bg: `#EEF2FF`, border: `#C7D2FE`)
  - **Technical Domain:** Sky Cyan `#0284C7` (Tag bg: `#F0F9FF`, border: `#BAE6FD`)
  - **Digital Governance Domain:** Deep Slate `#334155` (Tag bg: `#F8FAFC`, border: `#CBD5E1`)
  - **Behavioural & Managerial Domain:** Warm Amber `#D97706` (Tag bg: `#FFFBEB`, border: `#FDE68A`)

#### 4.2 Typography & Fluid Scaling
* **Headings:** Editorial Serif — `Newsreader`, `Fraunces` or `Merriweather` (`font-serif`)
* **Interface Body & Controls:** Humanist Sans — `Plus Jakarta Sans`, `Manrope` (`font-sans`)
* **Data, Identifiers & Scores:** Technical Monospace — `JetBrains Mono` (`font-mono`)
* **Devanagari (Hindi):** `Noto Sans Devanagari`
* **Fluid Clamp Scales:**
  - `h1`: `clamp(2rem, 4vw + 1rem, 3.25rem)`
  - `h2`: `clamp(1.5rem, 2.5vw + 0.75rem, 2.25rem)`
  - `body`: `clamp(1rem, 0.5vw + 0.875rem, 1.125rem)`

#### 4.3 The Signature "Bridge" Motif
A competency deficit is visually conceptualized as a physical architectural span:
* **Left Pillar:** `Current Level` (e.g., Level 2 - Intermediate)
* **Right Pillar:** `Role Target Level` (e.g., Level 4 - Expert)
* **The Bridge Span:** The computed gap ($Target - Current = 2$).
* **Closing the Span:** Recommended learning modules (iGOT + NSSTA) are displayed as bridge keystones that assemble under the span as learning hours and quiz attempts are completed.
* **Jaali Accent:** Subtle 4% opacity geometric jaali grid in hero backgrounds and card trims.

#### 4.4 Strict Responsive & Non-Overlap Rules
* `min-w-0` on every flex and grid child.
* Never fixed pixel widths on layout containers; always `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
* Desktop: Fixed 260px collapsible sidebar with independent scrolling main area.
* Mobile: Bottom tab bar (height 64px, touch targets 48x48px) + slide-up drawer sheets for menus and modals.
* Z-Index Token Hierarchy:
  - Content: `z-0`
  - Sticky Headers: `z-30`
  - Sidebar: `z-40`
  - Modal Backdrop: `z-50`
  - Modal Content: `z-60`
  - Toast Notifications: `z-70`

---

### 5. Page Map & User Journeys

1. **`/` — Landing & Mission Overview:**
   Hero with interactive bridge span, MoSPI DIID alignment, 4-mandate journey, dynamic stats ticker, role selector quick-access.
2. **`/login` — Parichay SSO Gateway Simulator:**
   Mock Jan Parichay government SSO interface with OTP simulation, role selector (Officer Sachin, Trainer Ragini, Admin DG Statistics), and bypass options.
3. **`/onboarding` — Automated Profile Builder:**
   Interactive wizard: Cadre selection, Division mapping, automated target benchmark generation, initial diagnostic questionnaire.
4. **`/dashboard` — Official's Learner Dashboard:**
   Capability readiness index, bridge gap quick cards, learning hours counter, streak tracker, weekly goals, recent quiz attempts.
5. **`/gaps` — Deep Skill-Gap Report:**
   Interactive Radar Chart across 4 domains, gap priority table, "Why is this a gap?" explainability drawer, instant link to pathways.
6. **`/pathways` — Personalized Pathway Recommender:**
   Dual-stream recommendations: iGOT digital courses + NSSTA TPAC calendar workshops with "Why Recommended" AI rationale.
7. **`/courses/[id]` — Course Details & iGOT Viewer:**
   Syllabus breakdown, provider metadata, competency gain preview, mock enrollment and progress simulator.
8. **`/assessment` — Learner Assessment Player:**
   Live MCQ player, timer, instant question-by-question feedback with source citations, Bloom's level indicators, post-test competency update summary.
9. **`/trainer` — Trainer Studio (Headline Feature):**
   Multi-format document upload (PDF, DOCX, TXT, video transcript), chunk viewer, LLM MCQ generator, question review & edit interface, cohort publishing.
10. **`/labs` — Virtual Labs:**
    - Lab 1: Interactive SQL Microdata Playground (execute queries on synthetic PLFS survey data).
    - Lab 2: Monte-Carlo Sampling Error & Bias Simulator (visualize variance reduction with sample size & stratification).
11. **`/assistant` — AI Virtual Assistant:**
    Streaming conversational tutor grounded in MoSPI manuals, iGOT catalogue, and the officer's specific competency gaps.
12. **`/admin` — Institutional Analytics & Capacity Dashboard:**
    Division × Domain heatmap, pre/post training score delta, capacity demand forecasting model, cohort filters, CSV/PDF export.
13. **`/audit` — Security & Compliance Audit Log:**
    DPDP Act compliance records, session audits, assessment logs, tamper-evident timeline.
14. **`/design-system` — Living Design System Showcase:**
    Visual reference for typography, color palette, bridge widgets, form controls, charts, and responsive states.

---

### 6. Implementation Milestones

* [x] **Phase 0:** Research & Blueprint (`docs/research.md`, `docs/plan.md`)
* [ ] **Milestone 1:** Next.js Project Foundation, Design Tokens, Tailwind, Nav Shell, Design System Showcase (`/design-system`)
* [ ] **Milestone 2:** Prisma Schema, SQLite Setup, Realistic Seed Data (150 Officials, 65 Courses, 12 TPAC Programs), Parichay SSO Auth & RBAC
* [ ] **Milestone 3:** Competency Engine & Transparent Skill-Gap Report (`/gaps`, Radar Chart, Bridge Visualizer)
* [ ] **Milestone 4:** Personalized Pathway Recommender (`/pathways`) & iGOT / NSSTA Adapter Layer (`IgotClient`)
* [ ] **Milestone 5:** Intelligent Assessment Engine (`/trainer`, Document Parser, Chunking, Gemini API with Zod Validation & Fallback, Assessment Player)
* [ ] **Milestone 6:** Learner Dashboard (`/dashboard`) & Admin Capacity Analytics Heatmap (`/admin`)
* [ ] **Milestone 7:** Virtual Labs (`/labs`), AI Virtual Assistant (`/assistant`), Multilingual Switcher (English / हिन्दी)
* [ ] **Milestone 8:** Comprehensive Mobile & Desktop Verification, Overlap Testing, Unit Tests, SIH Pitch & Demo Script

---
*Ready to begin execution of Milestone 1.*
