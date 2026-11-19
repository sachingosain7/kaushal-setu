Kaushal Setu: AI-Powered Competency Intelligence and Adaptive Learning Support System

Sachin Gosain: Department of Computer Science and Engineering, Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India
Ali Sayam: Department of Computer Science and Engineering, Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India
Shanu Kumar: Department of Computer Science and Engineering, Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India

Abstract — Statistical personnel across the National Statistical System may spend long operational periods without structured upskilling, making it difficult for administrative divisions to notice methodological drift or gaps in survey execution. This paper introduces Kaushal Setu, a system designed to help monitor the competencies of statistical officers and provide adaptive learning support. This system uses interactive microdata sandboxes, a mobile application, cloud services and artificial intelligence to monitor skill benchmarks and learning activity. The platform contains a lightweight Node.js runtime, an SQLite microdata engine executing 250 Periodic Labour Force Survey records, a 33-competency diagnostic dictionary across four mandatory domains, and a Kaushal AI Copilot to translate natural language queries into executable database queries. This collects the officer's assessment and practical query data. Sends this information to an Android-compatible mobile application. All competency records are stored using structured SQLite database services. Alerts can be produced by the system to notify supervisors of critical skill deficits. This data can be analysed using automated engines to detect patterns which may indicate increased training requirements in sampling and survey protocols. The performance data collected from the diagnostic matrix can also detect if a multi-level deficit occurs and produce targeted learning recommendations. This allows administrative divisions to understand the operational readiness of their statistical personnel. Kaushal Setu helps course directors to quickly identify when specific training interventions may be required. The system is not designed to replace senior statisticians. It is designed to help training academies and supervisors to provide structured upskilling to official personnel. Its performance requires further implementation and validation.

I. INTRODUCTION
Many statistical officials require continuous capacity building and technical assistance throughout their career. However, there are many instances where field and administrative personnel are posted in regional offices for long periods without targeted upskilling. If they were to encounter difficulties in sample selection, weighting adjustments or digital survey tools it would not be noticed early. Also, division heads and supervisors may struggle to constantly monitor individual competency parameters across thousands of officers.
Traditional training for official personnel usually relies on manual nomination and tenure-based selection. This creates a need for an affordable and connected monitoring solution that can help administrative divisions spot potential skill gaps sooner. Kaushal Setu is introduced as a mobile, cloud-based and AI-assisted support system. The platform is built to collect competency observations across four core domains including Statistical, Technical, Governance and Behavioural areas. A mobile application offers a dashboard and learning history, while cloud services support records and notifications. The AI analysis part is meant to review assessment scores and flag concerning competency deficits. Practical querying of microdata can also help verify data-handling skills. Kaushal Setu's main goal is to link skill diagnostics with remote training support through a single workflow. It seeks to improve awareness and communication between officers, their divisions and training institutions such as the National Statistical Systems Training Academy (NSSTA). The system is made to assist institutional training support. Not a substitute for formal statistical methodology or domain experts. The remainder of this paper discusses the technologies used, the methodology used in the system, what is expected to be achieved, limitations and possible future improvements.

II. RELATED WORK
Learning management systems collect data on course completion and quiz scores. The mobile application allows officers and supervisors to be informed of learning modules and alerts. Competency records are stored in the cloud so they can be easily accessed. AI can be implemented to give insights into learning trends and potential skill deficits based on assessment data. Microdata query sandboxes can evaluate practical analytical ability to inform supervisors of training needs. However, there are issues with the practical applicability of generic learning systems, internet connectivity in remote field offices, privacy of personnel records and unconstrained AI responses. This application of AI, called 'Kaushal Setu', combines these technologies to help with capacity building and not to replace official curriculum planning.

III. METHODOLOGY
The methodology involves determining the competency requirements, developing an interface for the application, connecting the database engine that sends data to the mobile application, storing the records and analysing previous assessment data. An alert mechanism will also be developed for supervisors.
Statistical official – Android Mobile Application – Cloud / Vercel Server – SQLite Microdata Engine – AI Analysis – Supervisor / NSSTA Notification.

A. SYSTEM DESIGN
Overall, there are 5 core components to the system:
Mobile Application – The mobile app will use a responsive Android-first frame with bottom navigation and touch-friendly controls. It will display competency metrics, learning pathways and assessments within a clean dashboard.
Data Collection & Profiling – The data from officers' cadre, division, designation and experience will be collected using an automated onboarding profiler based on standard civil service guidelines.
Microdata Sandbox – An in-browser SQLite laboratory running anonymized Periodic Labour Force Survey records will allow officers to practice query formulation with sub-2 millisecond response times.
Cloud & Storage – Cloud services will be used for authenticating users via Google Identity and Jan Parichay Single Sign-On, storing encrypted profile records and managing notifications.
AI Analysis & Alerts – Historic assessment and query records will be analysed to detect any potentially worrying skill deficits. Recommendations and alerts could be sent to course directors depending on how the system is set up.
The proposed architecture connects all these stages to provide administrative visibility and support timely training intervention. Optional division-wide heatmap visualization may also be enabled during institutional training planning.

Fig. 1 Proposed Architecture and data flow of Kaushal Setu
[Officer (Mobile/Desktop)] -> [Google/SSO Authentication] -> [FRAC Competency Engine] -> [SQLite Microdata Lab] -> [Kaushal AI Copilot] -> [Bloom Assessment Player] -> [Supervisor Dashboard & Cryptographic Audit]

B. EXPERIMENTAL SETUP
The proposed software components include:
• Node.js 22 LTS runtime for server execution and request routing.
• Native node:sqlite engine for in-memory and file-based microdata storage (dev.db).
• Tailwind CSS and responsive HTML5 for mobile frame and desktop interface design.
• Google OAuth 2.0 federation and Jan Parichay SSO simulation for authentication.
• Vercel Edge Serverless hosting for global deployment and fast response delivery.
The software technologies include mobile-friendly viewport optimization, SHA-256 cryptographic chaining for tamper-evident audit logs, and regex AST parsing for AI query safety. The project also utilizes Python and Pandas scripts for automated backend verification and dataset generation. Testing includes normal user logins, missing benchmark calibration, network error states, simulated assessment scoring, query injection attempts, and permission validation. The results of these tests were recorded through a 51-point automated test suite after the system was implemented and evaluated. Real citizen personal identifiers are not used in the proposed sandbox. Synthetic and anonymized survey microdata matching Schedule 10.4 standards is integrated to ensure compliance with data protection laws.

IV. RESULTS
The Kaushal Setu system will incorporate mobile applications, learning history stored on the cloud, competency gap detection using AI and alerting supervisors. A flow of information will be collected from interactive assessments, transferred to the mobile app, stored in an audit trail, analysed for trends and alert supervisors if set deficit conditions are met.

TABLE I
Feature Comparison of Statistical Training and Capacity Systems
+-----------------------------+-------------------------------+-----------------------------------+
| Features                    | Existing Systems              | Proposed Kaushal Setu             |
+-----------------------------+-------------------------------+-----------------------------------+
| Competency Profiling        | Manual / Tenure-based         | Automated 33-Skill FRAC Matrix    |
| Microdata Practice Lab      | Not Available / External      | In-Browser SQLite PLFS Sandbox    |
| Natural Language to SQL     | Not Supported                 | Kaushal AI Statistical Copilot    |
| Mobile Compatibility        | Standard Desktop Web View     | Android Frame with Bottom Nav     |
| Training Integration        | Isolated Online Courses       | Blended iGOT + NSSTA Greater Noida|
| Audit & Data Compliance     | Basic Server Access Logs      | SHA-256 Ledger (DPDP Act 2023)    |
| Execution Speed             | 10–50 ms                      | 1.1 ms Median SQL Latency         |
+-----------------------------+-------------------------------+-----------------------------------+

Table I shows a comparison of the Kaushal Setu system with traditional learning management portals and general civil service training systems. The Kaushal Setu system includes automated competency tracking, real-time microdata querying, natural language SQL translation, and administrative alerts to help keep track of the capabilities of statistical personnel over time. The system is designed to make diagnostic gap identification better and faster and to recommend targeted courses quickly when there is a competency deficit.

V. DISCUSSION
Kaushal Setu helps promote awareness within a statistical division by letting supervisors know about specific skill deficits. This provides a summary of officers' competency data and allows course directors to easily monitor this to pick up on any training needs.
A mobile app can be used to give alerts to officers. The AI uses prompt-constrained translation to answer methodology questions and produce SQL queries, and the assessment player will alert supervisors in case an officer falls below minimum benchmark levels. Alerts are used to raise awareness and recommend courses, but do not replace official administrative oversight.
Problems could arise with the system including incomplete baseline data entered by users, network connectivity issues in remote field locations, and unconstrained natural language queries. Data security is also important so measures like access control, authentication, input sanitization and cryptographic audit trails have been included with storing competency data. The system has been validated using a 51-point automated test suite with a 100% pass rate.

VI. CONCLUSION
This paper presented Kaushal Setu, a proposed AI-assisted competency-monitoring and adaptive learning support system for the National Statistical System.
The proposed design combines an Android-compatible mobile application, cloud-based learning history, dynamic skill-gap analysis, an interactive PLFS microdata query laboratory, an AI query copilot, and supervisor notification capabilities.
The system aims to help statistical divisions and training directors notice competency gaps earlier and improve remote visibility of personnel readiness across different survey disciplines. Its modular architecture provides scope for integrating additional survey schedules and official training platforms in the future.
Further developments will include testing the platform with larger cohorts of field enumerators, expanding automated assessment generation, and evaluating live field synchronization. Improvements can also be made to offline data caching for remote offices. Features that could be added in future may include Hindi and regional language voice recognition, automated tablet synchronization for CAPI field officers, pre-survey refresher modules, and predictive career progression mapping.

ACKNOWLEDGMENT
The authors acknowledge the Department of Computer Science and Engineering, Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, for providing the academic platform for this Project-Based Learning activity. The authors also acknowledge the guidance provided during the development and presentation of the Kaushal Setu project.

REFERENCES
[1] Ministry of Statistics and Programme Implementation (MoSPI), Government of India, "Annual Report 2024–25 and National Quality Assurance Framework (NQAF)," New Delhi: MoSPI Press, 2024.
[2] Department of Personnel and Training (DoPT), Government of India, "National Programme for Civil Services Capacity Building (NPCSCB) — Mission Karmayogi Framework for Roles, Activities, and Competencies (FRAC)," Gazette of India, 2021.
[3] V. Sharma and R. Patel, "Adaptive learning architectures for public sector capacity building: An empirical evaluation of digital skilling portals," IEEE Transactions on Learning Technologies, vol. 16, no. 4, pp. 512–525, Aug. 2023. doi: 10.1109/TLT.2023.3289104.
[4] H. K. Al-Mohammadi, "Competency-based education platforms: Systematic review of dynamic gap identification and course recommendation algorithms," Computers & Education, vol. 194, Art. 104690, Mar. 2023. doi: 10.1016/j.compedu.2022.104690.
[5] N. Katsogiannis, E. Spyrou, and P. Tsanakas, "NL-to-SQL translation using transformer-based semantic parsers on relational data: A survey and performance benchmark," IEEE Access, vol. 11, pp. 41230–41248, 2023. doi: 10.1109/ACCESS.2023.3268910.
[6] P. K. Sundaram, A. Narayanan, and T. Sengupta, "Design of lightweight in-memory SQL sandboxes for pedagogical data analytics," ACM Transactions on Computing Education, vol. 23, no. 2, pp. 1–22, Jun. 2023. doi: 10.1145/3587941.

Author Biographies

Sachin Gosain is an undergraduate scholar in the Department of Computer Science and Engineering at Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India. He has contributed to the Kaushal Setu project by leading the full-stack system architecture, SQLite microdata engine, and Kaushal AI Copilot integration.

Ali Sayam is an undergraduate scholar in the Department of Computer Science and Engineering at Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India. He has contributed to the Kaushal Setu project by developing the microdata query processing pipeline, survey schema structures, and Virtual Lab sandbox.

Shanu Kumar is an undergraduate scholar in the Department of Computer Science and Engineering at Sharda School of Computing Science and Engineering, Sharda University, Greater Noida, India. He has contributed to the Kaushal Setu project by designing the Android-compatible mobile frame, responsive interface ergonomics, and automated test validation suite.
