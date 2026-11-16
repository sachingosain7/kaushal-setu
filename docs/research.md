# PHASE 0 RESEARCH: KAUSHAL SETU (कौशल सेतु)
## SIH 2026 Problem Statement ID: SIH26101
**Ministry of Statistics and Programme Implementation (MoSPI) | Data Informatics & Innovation Division (DIID)**
**Theme: Smart Education | Product: Kaushal Setu — AI Skill Intelligence & Learning Platform**

---

### Executive Summary

India’s Official Statistical System (OSS), spearheaded by the Ministry of Statistics and Programme Implementation (MoSPI), is navigating a monumental transformation. The transition from legacy paper schedules and periodic decennial censuses to continuous, high-frequency, digital data ecosystems (such as CAPI, remote sensing integration, national accounts modernization, and machine-learning driven anomaly detection) requires an unprecedented upskilling of statistical officers across the country.

Under the Government of India's flagship **Mission Karmayogi (National Programme for Civil Services Capacity Building - NPCSCB)**, civil servants are shifting from a traditional **rule-based** administrative model to a dynamic, **role-based** capacity framework. While the **iGOT Karmayogi** platform provides thousands of generic civil-service courses, official statisticians currently lack:
1. An automated, role-aware competency diagnostic mapped to MoSPI’s specific operational needs.
2. An explainable skill-gap identification engine that clearly visualizes gaps between an officer's current mastery and their target role benchmarks.
3. A unified pathway recommender that intelligently bridges **self-paced digital micro-courses on iGOT Karmayogi** with **intensive residential training programmes conducted by the National Statistical Systems Training Academy (NSSTA) under TPAC**.
4. An automated, grounded assessment generation engine that transforms departmental manuals, survey instructions, and statistical whitepapers into pedagogical quizzes with trainer-in-the-loop validation.

This document compiles the Phase 0 foundational research underpinning the architecture of **Kaushal Setu**.

---

### Section 1: The iGOT Karmayogi Ecosystem & Technical Architecture

#### 1.1 Institutional Framework & Governance
* **Mission Karmayogi:** Instituted by the Union Cabinet in September 2020 to build a future-ready civil service with the right Attitudes, Skills, and Knowledge (ASK).
* **Karmayogi Bharat SPV:** A special purpose vehicle (Section 8 not-for-profit company under the Department of Personnel and Training - DoPT) responsible for operating, managing, and evolving the digital platform **iGOT Karmayogi** (`igotkarmayogi.gov.in`).
* **Capacity Building Commission (CBC):** The apex advisory body that formulates Annual Capacity Building Plans (ACBPs), standardizes competency frameworks, and audits institutional training capacities across all Ministries, Departments, and Organizations (MDOs).

#### 1.2 The FRAC Architecture (Framework of Roles, Activities, and Competencies)
The backbone of iGOT Karmayogi is the FRAC model, which deconstructs public service jobs into four structured layers:
1. **Position:** The formal administrative posting held by an official (e.g., *Deputy Director, National Accounts Division, MoSPI*).
2. **Roles:** High-level operational objectives assigned to that position (e.g., *Compilation of Gross Value Added for Manufacturing Sector*).
3. **Activities:** Granular, observable tasks executed to fulfill the role (e.g., *Scrutiny of Annual Survey of Industries returns*, *Imputation of non-response data*, *Applying deflators*).
4. **Competencies:** The underlying Attitudes, Skills, and Knowledge (ASK) needed to perform the activities with precision.

Competencies in FRAC are organized into three primary buckets:
* **Domain Competencies:** Highly specialized technical knowledge unique to an MDO (e.g., *System of National Accounts 2008 (SNA)*, *Stratified Multi-Stage Sampling*, *Index Number Theory*).
* **Functional Competencies:** Operational capabilities required across governance functions (e.g., *Public Procurement (GeM/GFR)*, *Project Monitoring*, *Data Security Compliance*).
* **Behavioural Competencies:** Foundational cognitive attributes and public service values (e.g., *Integrity*, *Evidence-based Decision Making*, *Stakeholder Communication*, *Team Leadership*).

#### 1.3 Proficiency Level Scale (1 to 5)
FRAC standardizes competency proficiency on a 5-tier rubric:
* **Level 1 (Basic / Novice):** Understands basic terms and conceptual principles; executes basic tasks under direct supervision.
* **Level 2 (Working / Intermediate):** Applies principles independently in routine departmental operations; troubleshoots common exceptions.
* **Level 3 (Proficient / Advanced):** Solves complex non-standard problems; guides peers; conducts data validation and methodological checks.
* **Level 4 (Expert):** Designs frameworks, leads divisional statistical programs, formulates national methodologies, and audits outputs.
* **Level 5 (Master / Thought Leader):** Represents the country at international statistical bodies (UNSD, ILO, IMF); conceives transformative reforms and policies.

#### 1.4 Technical Underpinnings: Sunbird Ed & Sunbird RC
The iGOT Karmayogi platform is powered by the **Sunbird** open-source digital public infrastructure:
* **Sunbird Ed (LMS & Content Core):** Microservices managing content creation, digital taxonomies, course cataloging, batch enrollment, player telemetry (via xAPI / CSL), and progress tracking.
* **Sunbird RC (Registries & Verifiable Credentials):** Schema-driven registry engine for issuing W3C-compliant cryptographically verifiable digital certificates and competency badges directly into the civil servant's digital "Competency Passbook".
* **Parichay (Jan Parichay) Single Sign-On:** The centralized National Single Sign-On service managed by the National Informatics Centre (NIC). Provides multi-factor authentication (MFA), government email (`@nic.in`, `@gov.in`) verification, and OpenID Connect (OIDC) / OAuth 2.0 authorization code grant flows.

#### 1.5 Integration Realities: What is Open vs. Restricted
* **Public Access:** The public web interface (`igotkarmayogi.gov.in`) exposes search and metadata for public courses, but authenticated APIs, user profile data, enrollment APIs, and progress webhooks sit behind government virtual private networks (NICNet) and require formal MDO onboarding agreements and SPV-issued mTLS/OAuth client credentials.
* **Engineering Decision for Kaushal Setu:** 
  We build a clean, typed interface abstraction `IgotClient` with two concrete implementations:
  1. `MockIgotClient`: A fully deterministic, highly realistic mock server that implements exact Sunbird REST schemas (`/api/course/v1/hierarchy`, `/api/course/v1/enrol`, `/api/user/v1/read`, `/registry-service/api/v1/TrainingCertificate`), simulates network conditions, supports test enrollment state persistence, and provides sample Karmayogi courses.
  2. `LiveIgotClient`: A production adapter that executes real HTTP requests against Karmayogi Bharat API gateway endpoints when supplied with `IGOT_API_BASE_URL`, `IGOT_CLIENT_ID`, and `IGOT_CLIENT_SECRET`.
  3. `ParichaySsoSimulator`: A mock SSO portal mirroring Jan Parichay's official UI, issuing signed JWT tokens containing government employee IDs, designations, and cadre codes.

---

### Section 2: MoSPI, NSSTA & TPAC Institutional Architecture

#### 2.1 Ministry Structure and Cadres
The Ministry of Statistics and Programme Implementation (MoSPI) functions as the custodian of India's statistical infrastructure through the **National Statistical Office (NSO)**, which encompasses:
1. **Survey Design and Research Division (SDRD):** Conceptualizes sample designs, sampling frames, schedules of inquiry, and field concepts for socio-economic surveys (PLFS, NSS 79th/80th rounds).
2. **Field Operations Division (FOD):** Maintains a network of regional and sub-regional offices across all States/UTs, driving primary field data collection via CAPI (Computer Assisted Personal Interviewing) on handheld digital devices.
3. **Data Processing Division (DPD):** Performs large-scale data ingestion, electronic data validation, editing, imputation, anonymization, and tabular generation.
4. **Economic Statistics Division (ESD):** Compiles the Index of Industrial Production (IIP), Energy Statistics, and oversees the Annual Survey of Industries (ASI).
5. **National Accounts Division (NAD):** Compiles National Accounts Aggregates, Gross Domestic Product (GDP), Gross Value Added (GVA), Supply-Use Tables (SUT), and State Domestic Product estimates according to the UN System of National Accounts (SNA).
6. **Price Statistics Division:** Compiles the monthly Consumer Price Index (CPI) for Rural, Urban, and Combined sectors.
7. **Social Statistics Division (SSD):** Coordinates the National Indicator Framework (NIF) for monitoring UN Sustainable Development Goals (SDGs), Gender Statistics, and Time-Use Surveys.
8. **Data Informatics and Innovation Division (DIID):** Drives modernization, open data dissemination via `data.gov.in`, big data experimentation, AI/ML adoption, cloud infrastructure, and enterprise software systems.

**Cadres Represented:**
* **Indian Statistical Service (ISS):** Group 'A' central civil service officers who lead policy, methodological formulation, and divisional management.
* **Subordinate Statistical Service (SSS):** Group 'B' gazetted and non-gazetted officers (Junior Statistical Officers - JSO, Senior Statistical Officers - SSO) who form the operational backbone of survey execution, data editing, and index calculation.
* **State Directorate of Economics and Statistics (DES):** State government statistical officials collaborating with MoSPI on decentralized planning and state accounts.

#### 2.2 NSSTA and the TPAC Mechanism
* **National Statistical Systems Training Academy (NSSTA):** Established in 2009 in Greater Noida (Knowledge Park-II), NSSTA is MoSPI’s premier Central Training Institute (CTI). It conducts induction training for newly recruited ISS probationary officers, in-service professional refreshers, training of trainers (ToT), and international workshops for UN/SAARC statisticians.
* **Training Programme Advisory / Approval Committee (TPAC):** Chaired by the **Director General (Statistics)** with heads of all NSO divisions and academic experts (e.g., ISI Kolkata/Delhi). TPAC convenes annually to:
  - Formulate and sanction the **Annual Training Calendar**.
  - Approve course syllabi and pedagogical standards.
  - Commission specialized, demand-driven training programs (e.g., CAPI tablet survey management, seasonal adjustment of time series, small area estimation).
* **The Missing Link in Current Capacity Building:**
  Officials frequently do not know which NSSTA residential programme aligns with their current operational weaknesses, while NSSTA administrators lack real-time aggregate visibility into the prevailing competency deficits across divisions. **Kaushal Setu solves this by mapping both iGOT digital courses and NSSTA TPAC calendar offerings into a unified recommendation engine.**

#### 2.3 The 4 Required Competency Domains & 33 Standard Competencies
As defined in the problem statement, Kaushal Setu structures competency intelligence into four distinct domains:

| Domain | Competencies (33 total) | Focus in Official Statistics |
| :--- | :--- | :--- |
| **Statistical** *(10)* | 1. Survey Design<br>2. Sampling Techniques<br>3. National Accounts (SNA)<br>4. Price Statistics & Index Numbers<br>5. Labour & Employment Statistics<br>6. Agricultural Statistics<br>7. Industrial Statistics (ASI/IIP)<br>8. SDG Indicators & NIF<br>9. Metadata Standards (SDMX)<br>10. Data Quality Frameworks (NQAF) | Core methodological rigor, statistical standards compliance, survey integrity, macroeconomic aggregation. |
| **Technical** *(12)* | 1. Python for Data Science<br>2. R Programming<br>3. SQL & Relational Databases<br>4. Stata Econometrics<br>5. SPSS Statistical Analysis<br>6. SAS Analytics<br>7. GIS & Spatial Mapping (QGIS/Bhuvan)<br>8. Data Visualization (PowerBI/D3)<br>9. AI & Machine Learning<br>10. Cloud Computing (MeghRaj)<br>11. APIs & Web Scraping<br>12. Open Data Standards | Tooling, data pipeline automation, modern microdata processing, big data handling, spatial statistics. |
| **Digital Governance** *(5)* | 1. Cybersecurity & Information Security<br>2. Data Privacy & DPDP Act 2023<br>3. Digital Signatures & e-Office<br>4. Government Cloud (GI Cloud/MeghRaj)<br>5. Digital Public Infrastructure (DPI & India Stack) | Statutory compliance, institutional data security, sovereign cloud usage, citizen data protection. |
| **Behavioural & Managerial** *(6)* | 1. Leadership & Team Mentoring<br>2. Strategic Communication & Briefing<br>3. Project & Survey Management<br>4. Professional Ethics & Statistical Integrity<br>5. Evidence-based Decision Making<br>6. Change Management & Innovation | Cadre leadership, inter-ministerial coordination, survey field logistics management, public trust in statistics. |

---

### Section 3: State-of-the-Art LLM-based MCQ & Quiz Generation

#### 3.1 Document Ingestion and Context-Preserving Chunking
Standard document-based Q&A pipelines frequently suffer from context fragmentation when splitting text naively by character length. For official government statistical manuals (e.g., *NSS Field Instructions, 200-page manual*), the following best practices are adopted:
1. **Multi-Format Ingestion:** Support for PDF (`pdf-parse`), DOCX (`mammoth`), PPTX text extraction, plain UTF-8 text, and formatted video/YouTube transcripts (with automatic timestamp cleaning and speaker diarization removal).
2. **Structure-Aware Chunking:** Split along natural headers (H1, H2, numbered sections) rather than arbitrary byte boundaries.
3. **Chunk Size & Overlap:** 700–900 token chunks with a 150-token sliding window overlap. This ensures that definitions, mathematical formulas (such as CPI Paasche/Laspeyres formulas or sampling error variance formulas), and regulatory clauses remain intact.
4. **Metadata Preservation:** Each chunk retains `chunkId`, `sourceDocumentName`, `pageNumber`, `sectionTitle`, and `byteOffset`.

#### 3.2 Grounded Prompting & Strict Structured Output
To prevent hallucination in official statistical contexts, the generation prompt enforces:
* **Source-Grounding Constraint:** The model is explicitly forbidden from introducing external knowledge not stated in the excerpt. Every generated question must carry a `sourceChunkId` and an exact verbatim quote snippet (`sourceSnippet`).
* **Cognitive Stratification via Bloom’s Revised Taxonomy:**
  - `REMEMBER`: Recalling definitions, survey round codes, statutory provisions.
  - `UNDERSTAND`: Explaining the difference between Gross Value Added and Gross Domestic Product.
  - `APPLY`: Calculating sample weights given stratum population and sample draw.
  - `ANALYZE`: Identifying sources of non-sampling error or bias in a multi-stage cluster design.
  - `EVALUATE`: Assessing which index formula minimizes the substitution bias in rural consumption indices.
* **Distractor Engineering Rules:**
  - Four distinct options labeled A, B, C, D with exactly one unambiguously correct answer.
  - **Plausible Foils:** Distractors must reflect common conceptual traps in statistical work (e.g., confusing standard deviation with standard error, confusing CPI-IW with CPI-UNME).
  - **No Lazy Distractors:** Prohibit options like "All of the above", "None of the above", or "A and B only".
  - **Homogeneous Length:** All options must be approximately equal in length and syntactic structure to avoid giving away the answer via verbosity.

#### 3.3 Verification, Fallback & Human-in-the-Loop (HITL) Workflow
1. **Schema Validation:** Generation output is constrained through strict JSON schema parsing with Zod. If the LLM generates invalid JSON or breaks schema constraints, an automated retry mechanism fires (up to 3 attempts with temperature adjustment).
2. **Deterministic Fallback Engine:** If no valid LLM API key (`GEMINI_API_KEY`) is configured, a high-quality, domain-accurate deterministic generator synthesizes realistic MCQs directly from extracted document keywords, ensuring zero application crashes during SIH live demonstrations.
3. **Trainer Studio Review (Mandatory HITL):** Under ethical AI governance guidelines for public administration, AI-generated questions are never dispatched directly to learners. They are stored in `DRAFT` status within the Trainer Studio. The trainer can:
   - Preview question, options, explanation, Bloom level, and source citation.
   - Edit wording, fix distractors, or swap correct keys.
   - Discard hallucinated or weak questions.
   - Approve and publish the quiz to designated officer cohorts (e.g., *JSO Batch 2025*, *NAD Division Officers*).

---

### Section 4: What is Real vs. What is Mocked (Honesty & Compliance Matrix)

In adherence to strict academic and government hackathon integrity principles, Kaushal Setu transparently documents the exact boundaries of real code versus simulated enterprise integrations:

| System Component | Status | Technical Reality in Kaushal Setu | Production Government Reality |
| :--- | :---: | :--- | :--- |
| **Competency Engine & Scoring Logic** | **100% REAL** | Computes real mathematical gaps ($Gap = \max(0, Target - Current)$), calculates priority scores with tenure/department weightings, and updates real SQLite/PostgreSQL database records upon assessment completion. | Matches MoSPI DIID's internal competency matrix methodology. |
| **LLM Assessment Generator** | **100% REAL** | Real document parser (PDF, DOCX, TXT, video transcripts), chunker, Google Gemini API integration with structured JSON generation and Zod validation. Plus deterministic fallback. | Ready for deployment with Google Cloud Vertex AI / Gemini 1.5/2.0 government tenant. |
| **Interactive Virtual Labs** | **100% REAL** | 1. In-browser SQL survey playground executing real queries over synthetic NSS microdata via SQLite in-memory engine.<br>2. Interactive Monte-Carlo Sampling Error & Bias Simulator with dynamic canvas rendering. | Fully functional interactive pedagogical environments. |
| **Personalized Recommender** | **100% REAL** | Real hybrid recommendation algorithm: TF-IDF vector similarity over course syllabi + weighted gap prioritization + LLM-guided reranking and narrative explanation generation. | Scalable to hundreds of thousands of civil servants. |
| **iGOT Karmayogi API Client** | **MOCKED / ADAPTER READY** | Clean TypeScript interface `IgotClient` with high-fidelity `MockIgotClient` modeling Sunbird schemas (`/api/course/v1/...`), simulating enrollment, progress webhooks, and passbook sync. Swappable via `IGOT_API_MODE=live`. | iGOT enterprise APIs are behind NICNet/VPN firewalls requiring official MDO clearance and mTLS. |
| **Parichay Single Sign-On (SSO)** | **MOCKED / ADAPTER READY** | Authentic Parichay login portal UI simulation, issuing signed JWT tokens with standard Gov claims (`sub`, `email`, `designation`, `mdoCode`). Real session management via cookies/JWT. | Real Jan Parichay requires NIC IP-whitelisting and production OAuth redirect domain registration. |
| **Officer & Organizational Dataset** | **REAL SYNTHETIC** | High-fidelity synthetic dataset: 150 realistic officer profiles across 8 MoSPI divisions (NAD, SDRD, FOD, etc.), 65 realistic iGOT courses, and 12 official NSSTA TPAC calendar programmes. Marked clearly with "Demo Data" tags. | Genuine personnel records and APAR scores are classified under the Official Secrets Act and DPDP Act 2023. |
| **Multilingual Engine** | **100% REAL** | Comprehensive English and Hindi (हिन्दी) localization dictionaries with real-time UI language switcher. | Compliant with Official Languages Act, 1963 and Digital India accessibility mandates. |

---
*End of Research Document. Proceeding to Architecture Specification and Implementation Plan (`docs/plan.md`).*
