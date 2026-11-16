# Kaushal Setu (कौशल सेतु)
### AI Skill Intelligence & Learning Platform for India's Official Statistical System
**Smart India Hackathon 2026 | Problem Statement ID: SIH26101**  
**Organization:** Ministry of Statistics and Programme Implementation (MoSPI)  
**Department:** Data Informatics & Innovation Division (DIID)  
**Theme:** Smart Education  

---

## 🏛️ Executive Overview

India’s Official Statistical System (OSS), spearheaded by the **Ministry of Statistics and Programme Implementation (MoSPI)**, is modernizing rapidly. The transition from legacy decennial censuses and paper schedules to high-frequency digital data pipelines (CAPI, remote sensing, national accounts modernization, and automated anomaly detection) requires systematic capacity building.

Under the Government of India's flagship **Mission Karmayogi (NPCSCB)** and the **Capacity Building Commission (CBC)**, civil servants are shifting from rule-based to role-based competencies. **Kaushal Setu** bridges this institutional imperative by connecting:
1. **Automated FRAC-based Competency Profiling** across 4 official statistics domains (33 competencies).
2. **Transparent Mathematical Skill-Gap Diagnostics** with plain-language explainability ("Why is this a gap?").
3. **Dual-Stream Personalised Pathway Recommender** uniting self-paced digital micro-courses on **iGOT Karmayogi** with intensive residential masterclasses approved by the **Training Programme Advisory Committee (TPAC)** at the **National Statistical Systems Training Academy (NSSTA)** in Greater Noida.
4. **Intelligent Assessment Engine (Headline Feature)** that extracts, chunks, and synthesises Bloom-stratified MCQs from official manuals with mandatory Trainer-in-the-Loop review.
5. **Interactive Virtual Labs** (in-browser SQL survey playground on synthetic microdata + Monte-Carlo sampling variance simulator).
6. **Institutional Capacity Analytics & Heatmaps** for MoSPI administrative leadership.

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------------------+
|                            CLIENT LAYER (Responsive)                              |
|  Next.js 15+ App Router, React 19, Tailwind CSS, Lucide Icons, Framer Motion       |
|  - Desktop: Collapsible Sidebar, 12-col Fluid Grid, Hairline Borders              |
|  - Mobile: Bottom Sheet Modals, Touch Tab Bar (44px min), Zero Horizontal Scroll  |
|  - Multilingual: English & Hindi (हिन्दी) Devanagari localization                |
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

---

## 🎨 Visual Identity & Design System

Kaushal Setu intentionally rejects generic purple-to-blue dark glassmorphism in favour of a classic, colourful, human-designed administrative aesthetic:
- **Warm Paper Canvas (`#FAF6EE`)**: Daylight-inspired administrative paper texture with subtle jaali lattice geometry (3.5% opacity).
- **Ink Navy (`#14213D`)**: Authoritative structural headings and primary card typography.
- **Saffron (`#F28C28`)**: Primary action buttons and focal highlights.
- **Emerald (`#0F8B6D`)**: Verified competency mastery and progress bars.
- **Indigo Chakra (`#2C3E9E`)**: Core statistical domain branding.
- **Coral Red (`#E4572E`)**: Critical skill-gap alerts and warnings.
- **Signature Bridge Motif**: Visual physical span between Current Level (Left Pillar) and Role Target Level (Right Pillar).

---

## 📋 Compliance & Honesty Matrix (Scope A–N Checklist)

| Req | Feature Description | Status | Implementation Details |
| :---: | :--- | :---: | :--- |
| **A** | **Competency Profile** | **DONE** | Auto-built from Cadre (ISS/SSS), Division (NAD, SDRD, FOD, DIID), designation, and experience. |
| **B** | **4 Competency Domains (33 Total)** | **DONE** | 10 Statistical, 12 Technical, 5 Digital Governance, 6 Behavioural; each on 5 proficiency levels. |
| **C** | **AI Skill-Gap Analysis** | **DONE** | Mathematical gap: $Gap = \max(0, Target - Current)$ with transparent plain-language explanations. |
| **D** | **Personalized Pathway Recommender** | **DONE** | Blended recommendations linking self-paced iGOT courses with NSSTA TPAC residential masterclasses. |
| **E** | **iGOT Integration Layer** | **MOCKED / ADAPTER** | Clean `IgotClient` interface with realistic Sunbird REST schemas (`/api/course/v1/...`) and Jan Parichay SSO mock. Swappable via `IGOT_API_MODE=live`. |
| **F** | **Intelligent Assessment Engine** | **DONE** | Structure-aware chunker, Google Gemini API generator with Zod schema validation, offline fallback, Trainer Studio review, and competency writeback. |
| **G** | **AI Virtual Assistant** | **DONE** | Streaming tutor grounded in MoSPI manuals, iGOT catalogue, and officer profile gaps. |
| **H** | **Adaptive Learning** | **DONE** | Quiz evaluation dynamically writes back to the officer profile, recalculating gaps and recommendations. |
| **I** | **Virtual Labs** | **DONE** | 1. In-browser SQL survey playground on synthetic NSS microdata.<br>2. Monte-Carlo Sampling Error & Bias Simulator. |
| **J** | **Multilingual Engine** | **DONE** | English and Hindi (हिन्दी) localization dictionaries with live switcher and beautiful Devanagari typography. |
| **K** | **Learner Dashboard** | **DONE** | Capability index, bridge gap meters, learning hours, day streaks, and earned badges. |
| **L** | **Admin Dashboard** | **DONE** | 8 Divisions × 4 Domains heatmap, training effectiveness pre/post deltas, and predictive capacity forecasting. |
| **M** | **Trainer Workspace** | **DONE** | Document upload, chunk viewer, AI MCQ generation, review & edit studio, and cohort publishing. |
| **N** | **Security & Compliance** | **DONE** | Role-Based Access Control (Learner, Trainer, Admin), DPDP Act 2023 audit log, no secrets in repo. |

---

## 🚀 One-Command Quick Start & API Inventory

```bash
# 1. Install / Verify (zero external dependencies required)
npm test

# 2. Launch Server
npm start  # or: node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### REST API Endpoints

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Healthcheck and SIH problem ID confirmation |
| `GET` | `/api/sih/metadata` | Official SIH 26101 metadata, MoSPI DIID scope & framework |
| `GET` | `/api/competencies` | Returns all 33 standardized competencies across 4 domains |
| `GET` | `/api/competencies/gaps?userId=user-01` | Mathematical gap analysis, priority ranking, and readiness index |
| `GET` | `/api/recommendations/pathways` | Blended iGOT micro-modules and NSSTA TPAC calendar masterclasses |
| `POST` | `/api/assessment/generate` | Generates Bloom-stratified MCQs from uploaded text with citations |
| `POST` | `/api/assessment/submit` | Dynamically evaluates quiz, updates competency level, and logs audit hash |
| `POST` | `/api/labs/sql/query` | Sandboxed execution of read-only queries on `plfs_microdata_sample` |
| `POST` | `/api/assistant/chat` | AI assistant grounded in MoSPI SDRD, NAD, and DPDP manuals |
| `GET` | `/api/audit/logs` | Immutable audit trail conforming to DPDP Act 2023 |

---

## ⏱️ 5-Minute SIH Presentation Demo Script

1. **Minute 1: The Context & Problem (Landing Page `/`)**
   - Introduce Problem Statement SIH26101 (MoSPI DIID).
   - Point out the signature **Bridge Motif**: Closing the span between an official's current skills and their role target benchmark.
   - Highlight the 1-click **Jan Parichay Government SSO Gateway (`/login`)**.

2. **Minute 2: The Learner Journey (`/dashboard` & `/gaps`)**
   - Log in as **Sachin Gosain (Senior Statistical Officer, DIID)**.
   - Show the **Capability Readiness Index (81%)**, streaks, and learning hours.
   - Click into the **Skill-Gap Matrix (`/gaps`)**: Show the 4 domains and click **"Why is this a gap?"** on *Survey Design & Sampling Frames* to showcase our transparent mathematical explanation.

3. **Minute 3: The Personalised Pathways & iGOT Sync (`/pathways` & `/courses/[id]`)**
   - Demonstrate the dual recommendations:
     - Digital Micro-module on **iGOT Karmayogi**.
     - Residential Masterclass at **NSSTA Greater Noida** approved by **TPAC**.
   - Click **"Enroll & Begin Module"**: Show real-time progress update and instant issuance of a W3C Verifiable Credential to the digital passbook.

4. **Minute 4: The Headline Assessment Engine (`/trainer` & `/assessment`)**
   - Switch to **Ms. Ragini Kumari (Faculty, NSSTA)** in the **Trainer Studio (`/trainer`)**.
   - Show the uploaded *NSS 80th Round Survey Instructions*.
   - View the context-preserving **Semantic Chunks**.
   - Click **"Generate Bloom-Stratified MCQs"**: Show the grounded questions with Bloom levels, citations, and inline editing.
   - Click **"Publish to JSO Induction Batch 2026"**.
   - Switch to the **Learner Assessment Player (`/assessment`)**: Take the quiz, submit, and watch the competency profile automatically update from Level 2 to Level 3!

5. **Minute 5: Virtual Labs & Admin Capacity Analytics (`/labs` & `/admin`)**
   - Open **Virtual Labs (`/labs`)**: Execute SQL queries on synthetic PLFS household microdata and run the Monte-Carlo Sampling Error Simulator.
   - Open **Admin Analytics (`/admin`)**: Show the Division × Domain Heatmap, pre/post training score gains (+33%), and predictive capacity forecasting for upcoming UN SNA revisions.

---

## ❓ Frequently Asked Judge Questions & Answers

**Q1: Is the iGOT Karmayogi integration live or simulated?**  
*Answer:* We have built a production-grade adapter interface (`IgotClient`). In our hackathon submission, it runs in `mock` mode with realistic Sunbird REST schemas (`/api/course/v1/...`) and Parichay SSO tokens. In a live government deployment, setting `IGOT_API_MODE=live` connects directly to Karmayogi Bharat SPV's API gateway without altering application logic.

**Q2: How do you prevent AI hallucinations in assessment quizzes?**  
*Answer:* Our assessment engine uses strict source-grounding prompt constraints requiring every generated MCQ to cite an exact `sourceChunkRef` and quote snippet. Furthermore, we enforce strict Zod JSON schema validation and require a mandatory **Human-in-the-Loop (HITL)** faculty review in the Trainer Studio before any question is dispatched to learners.

**Q3: Why did you include NSSTA TPAC programmes alongside iGOT courses?**  
*Answer:* Complex official statistics (such as Supply-Use Tables or Small Area Estimation) cannot be mastered solely through 15-minute phone videos. By unifying iGOT self-paced digital courses with NSSTA residential training sanctioned by the Training Programme Advisory Committee (TPAC), Kaushal Setu creates a complete, blended capacity ecosystem.

---
*Developed with pride for the Ministry of Statistics & Programme Implementation (MoSPI) · Smart India Hackathon 2026.*
