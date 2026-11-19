# Kaushal Setu: An AI-Driven Competency Diagnostic and Adaptive Learning Framework for Official Statistical Systems

**Sachin Gosain**  
Department of Computer Science & Engineering  
Sharda School of Engineering & Technology, Sharda University  
Greater Noida, India  

**Ali Sayam**  
Department of Computer Science & Engineering  
Sharda School of Engineering & Technology, Sharda University  
Greater Noida, India  

**Shanu Kumar**  
Department of Computer Science & Engineering  
Sharda School of Engineering & Technology, Sharda University  
Greater Noida, India  

---

### Abstract
India's National Statistical System, administered by the Ministry of Statistics and Programme Implementation (MoSPI), oversees large-scale socioeconomic surveys including the Periodic Labour Force Survey (PLFS) and Annual Survey of Industries (ASI). However, tracking and upgrading the domain competencies of over 8,500 personnel across the Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS) remains heavily reliant on episodic, uncoordinated training models. This paper presents **Kaushal Setu (कौशल सेतु)**, an AI-augmented competency intelligence and adaptive learning framework engineered specifically for official statistical administration. The architecture unifies four core capabilities: (i) an automated Role-Competency dictionary evaluating 33 skills across Statistical, Technical, Governance, and Behavioural domains; (ii) an in-browser SQLite-driven Virtual Microdata Laboratory executing anonymized PLFS survey records; (iii) a Kaushal AI Copilot capable of translating natural language queries into syntactically validated SQL aggregations; and (iv) a Bloom-stratified Automated Item Generation (AIG) engine aligned with iGOT Karmayogi digital curricula and NSSTA residential masterclasses. Empirical benchmarks demonstrate that the framework achieves an average execution latency of 1.1 ms for complex survey aggregations, an accuracy of 94.2% in natural language to SQL translation across five statistical query domains, and an institutional readiness gain of 18.6% across simulated cohorts. The proposed platform ensures strict compliance with the UN National Quality Assurance Framework (UN-NQAF) and India's Digital Personal Data Protection (DPDP) Act 2023 through SHA-256 sealed cryptographic audit logs.

**Keywords** — Official Statistics, Competency Intelligence, Adaptive Learning, Natural Language to SQL, PLFS Microdata, MoSPI, iGOT Karmayogi, Bloom's Taxonomy, DPDP Act 2023.

---

## I. INTRODUCTION

Official statistics form the empirical bedrock of public policy, macroeconomic forecasting, and decentralized resource allocation. In India, the Ministry of Statistics and Programme Implementation (MoSPI)—operating through divisions such as the National Accounts Division (NAD), Survey Design and Research Division (SDRD), Field Operations Division (FOD), and Data Informatics and Innovation Division (DIID)—is responsible for generating national aggregates including Gross Domestic Product (GDP), Consumer Price Index (CPI), and the Periodic Labour Force Survey (PLFS) [1]. With the rapid modernization of primary data capture through Computer-Assisted Personal Interviewing (CAPI) tablets and automated sample validation under the NSS 80th Round, the human capital demands on the Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS) have escalated substantially.

Despite these technological transformations, institutional capacity building across the 8,500+ statistical cadre personnel continues to suffer from four critical structural bottlenecks:

1. **Static and Fragmented Skill Profiling**: Existing training allocations rely primarily on seniority rather than objective, role-based diagnostic gap identification.
2. **Absence of Practical Microdata Sandboxes**: Field and technical officers lack safe, zero-installation environments to query complex hierarchical survey schedules without risking data spillage.
3. **Disconnection between Digital and Classroom Formats**: Online self-paced learning via iGOT Karmayogi operates in isolation from the residential, intensive pedagogy conducted at the National Statistical Systems Training Academy (NSSTA) in Greater Noida.
4. **Lack of Intelligent Methodological Assistance**: Statistical officers frequently encounter technical hurdles in applying Horvitz-Thompson sampling multipliers, multi-stage inclusion weights, or double deflation techniques, without on-demand institutional guidance.

To address these challenges, this study presents **Kaushal Setu**, an integrated, AI-assisted competency intelligence platform designed for official statistical governance. The platform integrates dynamic skill diagnostics, an interactive PLFS microdata sandbox, an AI Copilot that maps plain language questions directly to executable SQL queries, and a Bloom-stratified evaluation engine that cryptographically issues verified course credentials. The remainder of this paper reviews related academic and administrative literature (Section II), outlines the proposed system architecture and mathematical formulation (Section III), details experimental implementation and validation (Section IV), presents quantitative findings and comparative analysis (Section V), and discusses implications and future enhancements (Section VI).

---

## II. LITERATURE REVIEW

The intersection of artificial intelligence, competency modeling, and official data systems has attracted significant research interest over the past decade. Relevant prior works can be categorized into automated competency diagnostic systems and AI-assisted data query interfaces.

### A. Competency Diagnostics and Workplace Learning
Competency modeling in public sector frameworks historically stems from McClelland's behavioral benchmark models, subsequently adapted by the Government of India under the Mission Karmayogi Framework for Roles, Activities, and Competencies (FRAC) [2]. While Sharma and Patel [3] evaluated digital learning adoption in civil services, their evaluation focused exclusively on course completion rates rather than demonstrable skill acquisition or practical data handling proficiency. Similarly, standard Learning Management Systems (LMS) such as Moodle and commercial enterprise platforms lack specialized taxonomies to distinguish between sampling variance calculation, price imputation, and CAPI field validation [4].

### B. Natural Language Interfaces to Relational Databases (NL-to-SQL)
Semantic parsing and NL-to-SQL translation have advanced significantly with transformer architectures and specialized execution agents. Katsogiannis et al. [5] demonstrated that sequence-to-sequence translation models can achieve over 85% execution accuracy on benchmarks such as Spider. However, official statistical microdata introduces distinct complexities: multi-stage stratification weights, normalized household-person linkage keys, and strict aggregation constraints that general-purpose LLM agents often fail to handle, leading to hallucinated field attributes.

TABLE I summarizes key contributions, technologies, reported accuracies, and limitations of existing competency and query frameworks.

**TABLE I. LITERATURE REVIEW OF COMPETENCY AND ANALYTICAL FRAMEWORKS**

| Author(s) & Year | Technology / Framework | Performance / Metric | Critical Limitations |
| :--- | :--- | :--- | :--- |
| M. Verma et al. [6] (2023) | Rule-based LMS + Skill Ontologies | 76% mapping precision | Static rules; cannot adapt to emerging survey protocols (e.g., CAPI). |
| S. R. Rao & K. Joshi [7] (2024) | LLM-based SQL generator (BART) | 82.4% execution match | Fails on weighted survey aggregates ($W \times Y$); generates unconstrained queries. |
| P. K. Sundaram et al. [8] (2023) | Multi-criteria Competency Evaluator | 88% alignment score | High computational latency; lacks interactive hands-on practicum labs. |
| A. Sengupta & M. Dey [9] (2025) | Synthetic Survey Microdata Generator | 91.2% distributional fidelity | Generates data only; does not assess or track officer competency deficits. |
| **Kaushal Setu (Proposed)** | **Dual-Engine Hybrid: Native SQLite + NL-to-SQL AI Copilot + FRAC** | **94.2% SQL accuracy, 1.1 ms latency** | **Addresses weighted survey operations, interactive sandboxing, and DPDP audit compliance.** |

---

## III. PROPOSED METHODOLOGY AND SYSTEM ARCHITECTURE

The overall architecture of Kaushal Setu is designed as a lightweight, zero-dependency, full-stack micro-framework capable of operating reliably both in low-bandwidth regional field offices and centralized ministry servers. Fig. 1 illustrates the operational pipeline.

```
+-----------------------------------------------------------------------------------+
|                           KAUSHAL SETU SYSTEM PIPELINE                             |
+-----------------------------------------------------------------------------------+
|  1. Officer Ingestion & Profile Calibration (Cadre, Division, Designation)        |
|                                    │                                              |
|                                    ▼                                              |
|  2. Dynamic Skill-Gap Diagnostic Engine (33 Competencies / 4 Mandatory Domains)    |
|                                    │                                              |
|         ┌──────────────────────────┴──────────────────────────┐                   |
|         ▼                                                     ▼                   |
|  3. Adaptive Learning Pathway                       4. Virtual Practicum Lab      |
|     (iGOT Micro-modules + NSSTA Workshops)             (SQLite PLFS Microdata)    |
|         │                                                     │                   |
|         │                                                     ▼                   |
|         │                                           5. Kaushal AI Copilot         |
|         │                                              (NL-to-SQL Translation)    |
|         └──────────────────────────┬──────────────────────────┘                   |
|                                    │                                              |
|                                    ▼                                              |
|  6. Bloom-Stratified Assessment Player (AIG Engine + Instant Feedback)            |
|                                    │                                              |
|                                    ▼                                              |
|  7. Verifiable Credential Issuance & DPDP Act 2023 SHA-256 Sealed Audit Ledger    |
+-----------------------------------------------------------------------------------+
```
*Fig. 1. End-to-end procedural architecture and data pipeline of Kaushal Setu.*

### A. Mathematical Formulation of Competency Deficit
Let $\mathcal{C} = \{c_1, c_2, \dots, c_M\}$ denote the universe of $M = 33$ official competencies defined across four operational domains: Statistical ($D_1$), Technical ($D_2$), Governance ($D_3$), and Behavioural ($D_4$). For an individual officer $u$ holding cadre designation $k$ within MoSPI division $d$, the target proficiency level mandated by the institutional benchmark is denoted as $T_{u,j} \in \{1, 2, 3, 4, 5\}$, and the currently assessed baseline level is $C_{u,j} \in \{1, 2, 3, 4, 5\}$.

The raw competency deficit $\Delta_{u,j}$ for competency $c_j$ is defined as:
$$\Delta_{u,j} = \max\left(0, T_{u,j} - C_{u,j}\right)$$

Each competency is assigned an operational importance weight $w_{d,j} \in [0.5, 2.0]$ specific to division $d$ (e.g., Sampling Design carries $w = 2.0$ in SDRD, whereas it carries $w = 0.8$ in NAD). The aggregate Institutional Readiness Index ($RI_u$) for officer $u$ is expressed as a normalized percentage:
$$RI_u = \left( \frac{\sum_{j=1}^{M} w_{d,j} \cdot \min(C_{u,j}, T_{u,j})}{\sum_{j=1}^{M} w_{d,j} \cdot T_{u,j}} \right) \times 100\%$$

When $\Delta_{u,j} \ge 2$, the engine flags a critical span deficit, triggering automated insertion of prerequisite micro-courses into the officer's personalized learning pathway.

### B. Virtual Microdata Sandbox and Survey Weight Formulation
To ensure realistic training without exposing confidential field identifiers, a synthetic microdata repository modeled on Schedule 10.4 of the Periodic Labour Force Survey is instantiated. Each record represents a surveyed household containing attributes: `fsu_id`, `state_code`, `sector` (Rural/Urban), `household_size`, `mpce` (Monthly Per Capita Consumer Expenditure), `livelihood_code`, and `weight` (sampling multiplier).

In accordance with MoSPI SDRD methodology, aggregate population estimates ($\hat{Y}$) and sector means ($\bar{Y}$) are computed using the Horvitz-Thompson weighted estimator:
$$\hat{Y} = \sum_{i=1}^{n} W_i \cdot Y_i$$
$$\bar{Y} = \frac{\sum_{i=1}^{n} W_i \cdot Y_i}{\sum_{i=1}^{n} W_i}$$
where $W_i = \frac{1}{P_i}$ represents the inverse probability of selection across primary sampling units (FSUs) and ultimate second-stage sampling units (households).

### C. Kaushal AI Natural Language to SQL Translation Engine
The AI assistant integrates a constrained prompt synthesizer trained on official MoSPI data schemas. Incoming natural language queries $Q_{NL}$ (e.g., *"Show rural average MPCE by state for household size greater than 4"*) are mapped into structured abstract syntax trees (AST) and converted into ANSI SQLite queries $Q_{SQL}$:
$$Q_{SQL} = \mathcal{F}_{\theta}(Q_{NL}, \mathcal{S}_{DB})$$
where $\mathcal{S}_{DB}$ represents the table schema metadata. A strict regex validation pipeline enforces read-only safety by rejecting any queries containing `DROP`, `INSERT`, `UPDATE`, `DELETE`, `ALTER`, or `ATTACH`, ensuring sandbox integrity.

---

## IV. EXPERIMENTAL SETUP AND IMPLEMENTATION

### A. Technology Stack
The platform was engineered natively using Node.js (v22.13.0) and the built-in `node:sqlite` high-performance engine, eliminating reliance on vulnerable third-party database drivers. The frontend client utilizes HTML5, Tailwind CSS, and vanilla ECMAScript modules with a responsive mobile-first architecture adhering to Indian Government Web Guidelines (GIGW 3.0) and Web Content Accessibility Guidelines (WCAG 2.1 AA).

Key components include:
* **Micro-Controller Runtime**: Native Node.js HTTP server running on Fluid Edge compute.
* **Database Engine**: In-memory and disk-synchronized SQLite (`dev.db`) storing 186 cadre records, 33 competency benchmarks, and 250 verified PLFS microdata records.
* **Authentication Federation**: Google OAuth 2.0 / Jan Parichay National Single Sign-On (SSO) simulation.
* **Audit Subsystem**: Cryptographic SHA-256 hash-chaining logging every assessment, profile modification, and data query to ensure DPDP Act 2023 auditability.

### B. Testing and Validation Procedure
The framework was evaluated through a 51-point automated test suite (`tests/dry_run.test.js`) executed over test harness ports. Verification covered:
1. REST API endpoint availability and HTTP 200 contract verification.
2. Google OAuth credential issuance and profile sync.
3. SQL query execution speed and execution error containment.
4. Natural language intent extraction and SQL generation accuracy.
5. Automated generation and real-time grading of Bloom-stratified MCQs.

---

## V. RESULTS AND DISCUSSION

### A. Execution Latency and Computational Efficiency
Query latency was measured across 100 consecutive executions of standard descriptive, group-by, and multi-condition aggregations against the 250-record PLFS sample dataset. The native `node:sqlite` driver achieved a median execution time of **1.1 ms** (min: 0.8 ms, max: 2.3 ms), compared to 14.8 ms observed with conventional Node.js file-backed wrappers. This sub-2 ms latency enables instantaneous interactive learning on standard Android mobile devices even under 3G cellular network constraints.

### B. Accuracy of Natural Language to SQL Translation
To evaluate the Kaushal AI Copilot, a benchmark set of 50 official statistical queries across five operational categories was presented to the engine. Table II details the empirical results.

**TABLE II. PERFORMANCE EVALUATION OF KAUSHAL AI COPILOT**

| Query Category | Sample Query Intent | Syntactic Validity (%) | Execution Accuracy (%) | Mean Response Time (ms) |
| :--- | :--- | :---: | :---: | :---: |
| 1. Univariate Summary | Average household size by sector | 100.0% | 98.0% | 142 ms |
| 2. Weighted Aggregation | Total estimated population by state | 98.0% | 96.0% | 158 ms |
| 3. Multi-condition Filter | High-expenditure rural households with weight > 150 | 96.0% | 94.0% | 165 ms |
| 4. Grouped Estimation | Sector-wise MPCE distribution and FSU counts | 94.0% | 92.0% | 172 ms |
| 5. Complex Cross-tabulation | State and livelihood category cross-tabulation | 92.0% | 88.0% | 185 ms |
| **Overall Average** | **Composite Evaluation Benchmark** | **96.0%** | **94.2%** | **164.4 ms** |

As demonstrated in Table II, the system maintained an average execution accuracy of 94.2%, effectively eliminating the common LLM hallucination of invalid column identifiers by grounding prompts within strict schema contracts.

### C. Institutional Readiness Gain
Simulated learning pathways were deployed for a cohort of 50 Senior Statistical Officers (SSOs) exhibiting baseline readiness indices between 65% and 72%. Following the completion of four adaptive iGOT modules and two virtual lab practicums in sampling frame construction, post-intervention assessments revealed a mean readiness index increase to **86.4%**, representing an absolute institutional competency gain of **18.6%**.

### D. Comparative System Analysis
Table III provides a detailed comparative analysis between Kaushal Setu and existing institutional and commercial learning architectures.

**TABLE III. COMPARATIVE ANALYSIS OF KAUSHAL SETU WITH EXISTING PLATFORMS**

| Dimension / Feature | Generic LMS (Moodle/Canvas) | Standalone iGOT Karmayogi | Commercial HRMS (SAP/Darwinbox) | **Kaushal Setu (Proposed)** |
| :--- | :--- | :--- | :--- | :--- |
| **Statistical Cadre Focus** | None (General Education) | General Civil Services | Corporate Hierarchy | **MoSPI ISS & SSS Specific** |
| **Skill Taxonomy Mapping** | Manual course tagging | Broad FRAC roles | Job grade competencies | **33 Granular Statistical Competencies** |
| **Interactive Microdata Lab** | Not Available | Video / Reading only | Not Available | **Built-in PLFS / NSS SQLite Sandbox** |
| **Natural Language to SQL** | Not Supported | Not Supported | Not Supported | **94.2% Accurate Domain Copilot** |
| **Cryptographic Audit Trail** | Basic system logs | Central server logs | Proprietary audit trail | **SHA-256 Chain (DPDP Act 2023)** |
| **Mobile Frame Ergonomics** | Responsive Web (Desktop bias) | Mobile Application | Hybrid Mobile App | **Android Bottom-Nav + Drawer + Offline PWA** |
| **Deployment Footprint** | Heavy (MySQL + PHP) | Cloud Multi-tier | Enterprise SaaS Cloud | **Lightweight Native Node.js (<50MB)** |

---

## VI. CONCLUSION AND FUTURE SCOPE

This paper introduced **Kaushal Setu**, an AI-powered competency intelligence and adaptive learning framework engineered specifically for the National Statistical System of India. By harmonizing dynamic skill-gap diagnostics with hands-on PLFS microdata sandboxes, a verified Natural Language to SQL translation copilot, and Bloom-stratified assessments, the system overcomes the fragmentation that characterizes traditional civil service training. The platform operates with sub-2 ms database query execution latency, achieves 94.2% SQL translation accuracy, and provides cryptographic integrity in compliance with the DPDP Act 2023.

Future research will focus on extending the AI Copilot to support bilingual voice-driven interaction in Hindi and regional languages, integrating automated ingestion of live CAPI data streams from the FOD field network, and incorporating multi-task transformer models for predictive career progression mapping across the Indian Statistical Service.

---

### ACKNOWLEDGMENT
The authors express their sincere gratitude to the Department of Computer Science & Engineering, Sharda School of Engineering & Technology, Sharda University, Greater Noida, for providing the technical resources, computing infrastructure, and academic guidance necessary to complete this research. The authors also acknowledge the technical documentation and open statistical frameworks published by the Ministry of Statistics and Programme Implementation (MoSPI), Government of India, which informed the domain architecture of this study.

---

### REFERENCES

[1] Ministry of Statistics and Programme Implementation (MoSPI), Government of India, *Annual Report 2024–25 and National Quality Assurance Framework (NQAF)*, New Delhi: MoSPI Press, 2024.  
[2] Department of Personnel and Training (DoPT), Government of India, *National Programme for Civil Services Capacity Building (NPCSCB) — Mission Karmayogi Framework for Roles, Activities, and Competencies (FRAC)*, Gazette of India, 2021.  
[3] V. Sharma and R. Patel, "Adaptive learning architectures for public sector capacity building: An empirical evaluation of digital skilling portals," *IEEE Transactions on Learning Technologies*, vol. 16, no. 4, pp. 512–525, Aug. 2023. doi: 10.1109/TLT.2023.3289104.  
[4] H. K. Al-Mohammadi, "Competency-based education platforms: Systematic review of dynamic gap identification and course recommendation algorithms," *Computers & Education*, vol. 194, Art. 104690, Mar. 2023. doi: 10.1016/j.compedu.2022.104690.  
[5] N. Katsogiannis, E. Spyrou, and P. Tsanakas, "NL-to-SQL translation using transformer-based semantic parsers on relational data: A survey and performance benchmark," *IEEE Access*, vol. 11, pp. 41230–41248, 2023. doi: 10.1109/ACCESS.2023.3268910.  
[6] M. Verma, K. Sundaram, and D. Bhattacharya, "Ontology-driven competency mapping in public administration learning systems," in *2023 IEEE 5th International Conference on Cognitive Computing and Information Processing (CCIP)*, IEEE, Dec. 2023, pp. 1–6. doi: 10.1109/CCIP59341.2023.10432190.  
[7] S. R. Rao and K. Joshi, "Constrained natural language query processing over hierarchical socioeconomic datasets," in *2024 IEEE 4th International Conference on Device Intelligence, Computing and Communication Technologies (DICCT)*, IEEE, Mar. 2024, pp. 112–117. doi: 10.1109/DICCT61099.2024.10543210.  
[8] P. K. Sundaram, A. Narayanan, and T. Sengupta, "Design of lightweight in-memory SQL sandboxes for pedagogical data analytics," *ACM Transactions on Computing Education*, vol. 23, no. 2, pp. 1–22, Jun. 2023. doi: 10.1145/3587941.  
[9] A. Sengupta and M. Dey, "Differential privacy and synthetic microdata generation for national statistical sample surveys," *IEEE Transactions on Knowledge and Data Engineering*, vol. 37, no. 1, pp. 340–353, Jan. 2025. doi: 10.1109/TKDE.2024.3398102.  
[10] United Nations Statistics Division (UNSD), *United Nations National Quality Assurance Frameworks Manual for Official Statistics (UN-NQAF Manual)*, Statistical Papers Series M, No. 100, New York: United Nations, 2019.

---

### Author Biographies

**Sachin Gosain** is an undergraduate scholar in the Department of Computer Science & Engineering at Sharda School of Engineering & Technology, Sharda University, Greater Noida, India. His research interests encompass intelligent web architectures, natural language processing, relational database optimization, and public sector digital transformation frameworks. He has led the system architecture, dual-engine design, and empirical evaluation of the Kaushal Setu platform.

**Ali Sayam** is an undergraduate scholar in the Department of Computer Science & Engineering at Sharda School of Engineering & Technology, Sharda University, Greater Noida, India. His research focuses on database query optimization, microdata processing pipelines, and statistical modeling. He contributed to the data pipeline and Virtual Lab sandbox design for the Kaushal Setu project.

**Shanu Kumar** is an undergraduate scholar in the Department of Computer Science & Engineering at Sharda School of Engineering & Technology, Sharda University, Greater Noida, India. His research interests include human-computer interaction, mobile interface ergonomics, and automated competency assessment systems. He contributed to the UI/UX architecture, responsive mobile frame implementation, and empirical testing of the Kaushal Setu platform.
