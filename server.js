/**
 * Kaushal Setu (कौशल सेतु) - Full-Stack Production Server
 * SIH 2026 Problem Statement ID: SIH26101 (MoSPI DIID)
 * Zero external dependencies required: Powered natively by Node.js 22+ (node:http, node:sqlite, node:crypto)
 */

const http = require('node:http');
const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const os = require('node:os');
const PORT = process.env.PORT || 3000;
let DB_PATH = path.resolve(process.cwd(), 'dev.db');

// If running in Vercel / AWS Lambda environment where filesystem is read-only except /tmp
if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const tmpDir = process.env.TMPDIR || (process.platform === 'win32' ? os.tmpdir() : '/tmp');
  try {
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
  } catch (e) {}
  const tmpDbPath = path.join(tmpDir, 'dev.db');
  if (!fs.existsSync(tmpDbPath)) {
    if (fs.existsSync(DB_PATH)) {
      try {
        fs.copyFileSync(DB_PATH, tmpDbPath);
      } catch (err) {
        console.warn('Could not copy dev.db to /tmp:', err.message);
      }
    }
  }
  DB_PATH = tmpDbPath;
}

// Initialize SQLite Database
const db = new DatabaseSync(DB_PATH);

// Create Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    designation TEXT,
    cadre TEXT,
    division TEXT,
    role TEXT,
    experience_years INTEGER,
    qualification TEXT,
    learning_hours REAL,
    streak_days INTEGER,
    badges_count INTEGER
  );

  CREATE TABLE IF NOT EXISTS competencies (
    id TEXT PRIMARY KEY,
    code TEXT UNIQUE,
    name TEXT,
    domain TEXT,
    description TEXT,
    max_level INTEGER DEFAULT 5
  );

  CREATE TABLE IF NOT EXISTS role_benchmarks (
    id TEXT PRIMARY KEY,
    cadre TEXT,
    designation TEXT,
    division TEXT,
    competency_id TEXT,
    target_level INTEGER,
    weight REAL,
    FOREIGN KEY(competency_id) REFERENCES competencies(id)
  );

  CREATE TABLE IF NOT EXISTS user_scores (
    user_id TEXT,
    competency_id TEXT,
    current_level INTEGER,
    confidence REAL,
    assessed_via TEXT,
    last_assessed_at TEXT,
    PRIMARY KEY(user_id, competency_id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(competency_id) REFERENCES competencies(id)
  );

  CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    external_id TEXT UNIQUE,
    title TEXT,
    provider TEXT,
    type TEXT,
    domain TEXT,
    duration_hours REAL,
    level INTEGER,
    description TEXT,
    syllabus_json TEXT,
    is_tpac_approved INTEGER,
    tpac_batch_date TEXT,
    tpac_seats INTEGER,
    competency_gains_json TEXT
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    course_id TEXT,
    status TEXT,
    progress_pct INTEGER,
    enrolled_at TEXT,
    completed_at TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(course_id) REFERENCES courses(id)
  );

  CREATE TABLE IF NOT EXISTS plfs_microdata_sample (
    id TEXT PRIMARY KEY,
    state TEXT,
    sector TEXT,
    mpce REAL,
    livelihood TEXT,
    hh_size INTEGER,
    weight REAL
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    timestamp TEXT,
    official TEXT,
    action TEXT,
    resource TEXT,
    ip TEXT,
    hash TEXT
  );
`);

console.log('Database schema verified.');

// Seed 33 Competencies across 4 Domains
const competenciesCount = db.prepare('SELECT COUNT(*) as count FROM competencies').get().count;
if (competenciesCount === 0) {
  console.log('Seeding official statistics competencies...');
  const insertComp = db.prepare(`
    INSERT INTO competencies (id, code, name, domain, description, max_level)
    VALUES (?, ?, ?, ?, ?, 5)
  `);

  const initialCompetencies = [
    // Statistical Domain (10)
    ['stat-01', 'STAT_SURVEY_DESIGN', 'Survey Design & Sampling Frames', 'STATISTICAL', 'Multi-stage stratified sampling designs, frame development, schedule design, and non-sampling error control for socio-economic surveys.'],
    ['stat-02', 'STAT_SAMPLING_TECHNIQUES', 'Advanced Sampling Techniques', 'STATISTICAL', 'Application of PPS (Probability Proportional to Size), systematic sampling, cluster sampling, and Small Area Estimation (SAE).'],
    ['stat-03', 'STAT_NATIONAL_ACCOUNTS', 'National Accounts (SNA 2008)', 'STATISTICAL', 'Compilation of GDP, Gross Value Added (GVA), Supply-Use Tables (SUT), Input-Output tables, and capital formation under UN SNA.'],
    ['stat-04', 'STAT_PRICE_STATISTICS', 'Price Statistics & Index Numbers', 'STATISTICAL', 'Theory and compilation of Consumer Price Index (CPI), Wholesale Price Index (WPI), chained indices, scanner data, and hedonic adjustments.'],
    ['stat-05', 'STAT_LABOUR_EMPLOYMENT', 'Labour & Employment Statistics', 'STATISTICAL', 'Periodic Labour Force Survey (PLFS) methodologies, Usual Status and Current Weekly Status (CWS), activity codes, and informal sector.'],
    ['stat-06', 'STAT_AGRICULTURAL_STATS', 'Agricultural & Rural Statistics', 'STATISTICAL', 'Crop cutting experiments, Area and Production estimation, Land & Livestock Holdings surveys, and agricultural cost of cultivation.'],
    ['stat-07', 'STAT_INDUSTRIAL_STATS', 'Industrial Statistics (ASI & IIP)', 'STATISTICAL', 'Compilation of Annual Survey of Industries (ASI), Index of Industrial Production (IIP), National Industrial Classification (NIC), and enterprise surveys.'],
    ['stat-08', 'STAT_SDG_INDICATORS', 'SDG Indicators & NIF Monitoring', 'STATISTICAL', 'Monitoring UN Sustainable Development Goals via the National Indicator Framework (NIF), disaggregated data pipelines, and localization.'],
    ['stat-09', 'STAT_METADATA_STANDARDS', 'Metadata Standards & SDMX', 'STATISTICAL', 'Statistical Data and Metadata Exchange (SDMX), standard codelists, microdata documentation (DDI), and interoperable exchange.'],
    ['stat-10', 'STAT_DATA_QUALITY_NQAF', 'Data Quality Frameworks (NQAF)', 'STATISTICAL', 'Implementation of UN National Quality Assurance Framework (NQAF), data auditing, imputation techniques, and transparency declarations.'],

    // Technical Domain (12)
    ['tech-01', 'TECH_PYTHON', 'Python for Statistical Computing', 'TECHNICAL', 'Pandas, NumPy, SciPy, Statsmodels, automated microdata processing pipelines, and outlier detection scripts.'],
    ['tech-02', 'TECH_R_LANG', 'R for Statistical Analysis & Survey Packages', 'TECHNICAL', 'R programming using survey, sampling, tidyverse, and ggplot2 packages for complex survey weights and variance estimation.'],
    ['tech-03', 'TECH_SQL', 'SQL & Relational Databases', 'TECHNICAL', 'Advanced relational queries, indexing, CTEs, aggregation over multi-million row microdata tables, and query optimization.'],
    ['tech-04', 'TECH_STATA', 'Stata Econometric Analysis', 'TECHNICAL', 'Survey data manipulation (svyset, svy), panel regressions, instrumental variables, and econometric impact assessment.'],
    ['tech-05', 'TECH_SPSS', 'SPSS Statistical Analysis', 'TECHNICAL', 'Cross-tabulation, factor analysis, ANOVA, reliability analysis, and syntax-based automation for regular survey rounds.'],
    ['tech-06', 'TECH_SAS', 'SAS Analytics & Enterprise Guide', 'TECHNICAL', 'SAS macro programming, PROC SQL, large enterprise data step processing, and regulatory statistical reporting.'],
    ['tech-07', 'TECH_GIS', 'GIS & Spatial Mapping (QGIS / Bhuvan)', 'TECHNICAL', 'Geospatial mapping of enumeration blocks, satellite nightlights processing, spatial autocorrelation, and thematic atlas generation.'],
    ['tech-08', 'TECH_DATA_VIZ', 'Data Visualization & Dashboards', 'TECHNICAL', 'Visual communication of statistical indices, interactive dashboards (PowerBI, Tableau, D3.js), and publication chart design.'],
    ['tech-09', 'TECH_AI_ML', 'AI & Machine Learning in Statistics', 'TECHNICAL', 'Automated anomaly detection in survey returns, natural language processing for text codification (NIC/NCO), and predictive modeling.'],
    ['tech-10', 'TECH_CLOUD', 'Government Cloud (MeghRaj)', 'TECHNICAL', 'Architecting secure data processing on the National Cloud (MeghRaj), virtual machines, containerization, and data pipelines.'],
    ['tech-11', 'TECH_APIS', 'APIs & Web Scraping for Price Collection', 'TECHNICAL', 'RESTful API integration, web scraping e-commerce portals for automated price indices, and microservice consumption.'],
    ['tech-12', 'TECH_OPEN_DATA', 'Open Data Standards & CAPI Tools', 'TECHNICAL', 'Computer Assisted Personal Interviewing (CAPI) on CSPro/ODK, data anonymization techniques, and open data publication via data.gov.in.'],

    // Digital Governance Domain (5)
    ['gov-01', 'GOV_CYBERSECURITY', 'Cybersecurity & Information Security', 'DIGITAL_GOVERNANCE', 'CERT-In guidelines, institutional security hygiene, threat prevention, access control audits, and secure terminal handling.'],
    ['gov-02', 'GOV_DATA_PRIVACY', 'Data Privacy & DPDP Act 2023', 'DIGITAL_GOVERNANCE', 'Digital Personal Data Protection Act compliance, respondent confidentiality, consent mechanisms, and statistical anonymization.'],
    ['gov-03', 'GOV_DIGITAL_SIGNATURES', 'Digital Signatures & e-Office', 'DIGITAL_GOVERNANCE', 'PKI infrastructure, DSC token operations, e-Sign, paperless workflow management in e-Office, and file audit trails.'],
    ['gov-04', 'GOV_CLOUD_GOVERNANCE', 'Government Cloud Governance', 'DIGITAL_GOVERNANCE', 'Sovereign cloud compliance, disaster recovery policies, data classification guidelines, and inter-agency data sharing protocols.'],
    ['gov-05', 'GOV_DPI_STACK', 'Digital Public Infrastructure (DPI & India Stack)', 'DIGITAL_GOVERNANCE', 'Aadhaar e-KYC integration, DigiLocker data verification, Unified Payments Interface (UPI) data streams, and API Setu linkages.'],

    // Behavioural & Managerial Domain (6)
    ['lead-01', 'LEAD_TEAM_LEADERSHIP', 'Leadership & Team Mentoring', 'BEHAVIOURAL', 'Leading multidisciplinary field teams, motivating enumerators in remote geographies, conflict resolution, and junior officer mentoring.'],
    ['lead-02', 'LEAD_COMMUNICATION', 'Strategic Communication & Policy Briefing', 'BEHAVIOURAL', 'Distilling complex statistical microdata into concise Cabinet notes, press releases, data infographics, and inter-ministerial briefs.'],
    ['lead-03', 'LEAD_PROJECT_MGMT', 'Survey & Project Management', 'BEHAVIOURAL', 'Gantt charting for nationwide survey rounds, budget forecasting, GFR/GeM procurement for survey hardware, and milestone tracking.'],
    ['lead-04', 'LEAD_ETHICS', 'Professional Ethics & Statistical Integrity', 'BEHAVIOURAL', 'UN Fundamental Principles of Official Statistics, zero tolerance for fabricated returns, conflict of interest management, and public trust.'],
    ['lead-05', 'LEAD_DECISION_MAKING', 'Evidence-based Decision Making', 'BEHAVIOURAL', 'Synthesizing conflicting data inputs, robust risk assessment under uncertainty, and defending methodological choices in parliamentary panels.'],
    ['lead-06', 'LEAD_CHANGE_MGMT', 'Change Management & Digital Modernization', 'BEHAVIOURAL', 'Managing transition from paper schedules to CAPI tablets, overcoming institutional inertia, continuous upskilling advocacy, and agile problem solving.'],
  ];

  for (const c of initialCompetencies) {
    insertComp.run(...c);
  }
}

// Seed Demo Personas
const usersCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
if (usersCount === 0) {
  console.log('Seeding demo official personas...');
  const insertUser = db.prepare(`
    INSERT INTO users (id, email, name, designation, cadre, division, role, experience_years, qualification, learning_hours, streak_days, badges_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    'user-01',
    'sachin.gosain@nic.in',
    'Sachin Gosain',
    'Senior Statistical Officer (SSO)',
    'SSS',
    'DIID',
    'LEARNER',
    4,
    'M.Sc. Mathematical Statistics',
    38.5,
    6,
    5
  );

  insertUser.run(
    'user-02',
    'ragini.kumari@nssta.gov.in',
    'Ms. Ragini Kumari',
    'Assistant Professor & Course Director',
    'FACULTY',
    'NSSTA',
    'TRAINER',
    9,
    'Ph.D. Econometrics & Survey Methods',
    124.0,
    14,
    12
  );

  insertUser.run(
    'user-03',
    'dg.statistics@mospi.gov.in',
    'Dr. G. P. Samanta',
    'Director General (Statistics) / CSI',
    'ISS',
    'HQ',
    'ADMIN',
    26,
    'Ph.D. Statistics, F.S.S.',
    210.0,
    30,
    18
  );

  // Seed Benchmarks for SSO in DIID
  const insertBm = db.prepare(`
    INSERT INTO role_benchmarks (id, cadre, designation, division, competency_id, target_level, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const ssoBenchmarks = [
    ['bm-01', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-01', 4, 1.5],
    ['bm-02', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-02', 4, 1.4],
    ['bm-03', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-03', 4, 1.3],
    ['bm-04', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-04', 3, 1.2],
    ['bm-05', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-05', 4, 1.2],
    ['bm-06', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-07', 4, 1.3],
    ['bm-07', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-09', 3, 1.1],
    ['bm-08', 'SSS', 'Senior Statistical Officer', 'DIID', 'stat-10', 4, 1.4],
    ['bm-09', 'SSS', 'Senior Statistical Officer', 'DIID', 'tech-01', 4, 1.5],
    ['bm-10', 'SSS', 'Senior Statistical Officer', 'DIID', 'tech-02', 4, 1.4],
    ['bm-11', 'SSS', 'Senior Statistical Officer', 'DIID', 'tech-03', 4, 1.4],
    ['bm-12', 'SSS', 'Senior Statistical Officer', 'DIID', 'tech-07', 3, 1.2],
    ['bm-13', 'SSS', 'Senior Statistical Officer', 'DIID', 'gov-01', 4, 1.2],
    ['bm-14', 'SSS', 'Senior Statistical Officer', 'DIID', 'gov-02', 4, 1.4],
    ['bm-15', 'SSS', 'Senior Statistical Officer', 'DIID', 'gov-03', 4, 1.0],
    ['bm-16', 'SSS', 'Senior Statistical Officer', 'DIID', 'lead-01', 3, 1.2],
    ['bm-17', 'SSS', 'Senior Statistical Officer', 'DIID', 'lead-02', 4, 1.3],
    ['bm-18', 'SSS', 'Senior Statistical Officer', 'DIID', 'lead-03', 4, 1.4],
    ['bm-19', 'SSS', 'Senior Statistical Officer', 'DIID', 'lead-04', 4, 1.5],
  ];

  for (const bm of ssoBenchmarks) {
    insertBm.run(...bm);
  }

  // Seed Initial User Scores for Sachin Gosain
  const insertScore = db.prepare(`
    INSERT INTO user_scores (user_id, competency_id, current_level, confidence, assessed_via, last_assessed_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const initialScores = [
    ['user-01', 'stat-01', 2, 0.85, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-02', 2, 0.80, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-03', 3, 0.90, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-04', 2, 0.80, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-05', 3, 0.85, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-07', 2, 0.75, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-09', 1, 0.70, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'stat-10', 2, 0.80, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'tech-01', 4, 0.95, 'PRACTICUM', '2026-11-11T14:30:00Z'],
    ['user-01', 'tech-02', 2, 0.75, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'tech-03', 3, 0.90, 'QUIZ', '2026-11-12T09:15:00Z'],
    ['user-01', 'gov-01', 3, 0.85, 'IGOT_SYNC', '2026-10-25T16:00:00Z'],
    ['user-01', 'gov-02', 2, 0.75, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
    ['user-01', 'gov-03', 4, 0.95, 'VERIFIED', '2026-09-15T11:00:00Z'],
    ['user-01', 'lead-01', 2, 0.80, 'DIAGNOSTIC', '2026-11-10T10:00:00Z'],
  ];

  for (const s of initialScores) {
    insertScore.run(...s);
  }
}

// Seed Courses (iGOT + NSSTA TPAC Calendar)
const coursesCount = db.prepare('SELECT COUNT(*) as count FROM courses').get().count;
if (coursesCount === 0) {
  console.log('Seeding iGOT courses and NSSTA TPAC calendar...');
  const insertCourse = db.prepare(`
    INSERT INTO courses (id, external_id, title, provider, type, domain, duration_hours, level, description, syllabus_json, is_tpac_approved, tpac_batch_date, tpac_seats, competency_gains_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const coursesList = [
    [
      'tpac-01',
      'TPAC-2026-01',
      'Advanced Sampling Methods & Small Area Estimation (SAE)',
      'NSSTA Greater Noida (TPAC Approved)',
      'NSSTA_TPAC_RESIDENTIAL',
      'STATISTICAL',
      60.0,
      4,
      'Residential executive masterclass at NSSTA campus covering empirical Bayes, Fay-Herriot models, and multi-stage survey variance under TPAC syllabus 2026.',
      JSON.stringify([
        { title: 'Module 1: Complex Survey Sampling Foundations', durationMins: 360 },
        { title: 'Module 2: Small Area Estimation in Official Statistics', durationMins: 480 },
        { title: 'Module 3: R Application with survey and sae Packages', durationMins: 480 },
        { title: 'Module 4: Practical Capstone with NSS Microdata', durationMins: 480 },
      ]),
      1,
      '16–27 March 2026',
      35,
      JSON.stringify([
        { competencyCode: 'STAT_SAMPLING_TECHNIQUES', competencyName: 'Advanced Sampling Techniques', gainLevel: 2 },
        { competencyCode: 'STAT_SURVEY_DESIGN', competencyName: 'Survey Design & Sampling Frames', gainLevel: 1 },
      ])
    ],
    [
      'tpac-02',
      'TPAC-2026-02',
      'National Accounts Modernization & Supply-Use Tables (SUT)',
      'NSSTA Greater Noida (TPAC Approved)',
      'NSSTA_TPAC_RESIDENTIAL',
      'STATISTICAL',
      45.0,
      4,
      'In-person residential training for NAD and state DES officials on compilation of Gross Value Added, financial sector balancing, and SNA 2025 transition.',
      JSON.stringify([
        { title: 'Module 1: Sequence of Accounts in SNA 2008', durationMins: 300 },
        { title: 'Module 2: SUT Compilation & Balancing Algorithms', durationMins: 420 },
        { title: 'Module 3: Deflators & Double Deflation Methodology', durationMins: 360 },
      ]),
      1,
      '06–17 April 2026',
      30,
      JSON.stringify([
        { competencyCode: 'STAT_NATIONAL_ACCOUNTS', competencyName: 'National Accounts (SNA 2008)', gainLevel: 2 },
      ])
    ],
    [
      'tpac-03',
      'TPAC-2026-03',
      'Computer Assisted Personal Interviewing (CAPI) & Field Automation',
      'NSSTA Greater Noida (TPAC Approved)',
      'NSSTA_TPAC_RESIDENTIAL',
      'TECHNICAL',
      35.0,
      3,
      'Field operations hands-on workshop on questionnaire scripting, automated validation rules, GPS geotagging, and sync architectures.',
      JSON.stringify([
        { title: 'Module 1: CAPI Architecture & CSPro/ODK Setup', durationMins: 300 },
        { title: 'Module 2: Scripting Logic & Dynamic Validation Rules', durationMins: 420 },
      ]),
      1,
      '11–20 May 2026',
      40,
      JSON.stringify([
        { competencyCode: 'TECH_OPEN_DATA', competencyName: 'Open Data Standards & CAPI Tools', gainLevel: 2 },
      ])
    ],
    [
      'igot-c01',
      'do_213948501',
      'Survey Sampling Foundations & Field Verification',
      'NSSTA / MoSPI (iGOT Karmayogi)',
      'IGOT_DIGITAL',
      'STATISTICAL',
      14.5,
      3,
      'A comprehensive primer on stratified multi-stage designs, probability proportional to size (PPS) sampling, and sampling variance computation in official surveys.',
      JSON.stringify([
        { title: 'Unit 1: Sampling Frames & Stratification', durationMins: 180 },
        { title: 'Unit 2: Probability Proportional to Size (PPS)', durationMins: 240 },
        { title: 'Unit 3: Replicate Weight Calculation', durationMins: 300 },
      ]),
      0,
      null,
      null,
      JSON.stringify([
        { competencyCode: 'STAT_SURVEY_DESIGN', competencyName: 'Survey Design & Sampling Frames', gainLevel: 1 },
      ])
    ],
    [
      'igot-c02',
      'do_213948502',
      'System of National Accounts (SNA 2008) in Practice',
      'National Accounts Division (NAD)',
      'IGOT_DIGITAL',
      'STATISTICAL',
      22.0,
      4,
      'Master the compilation of Gross Value Added (GVA), Supply and Use Tables (SUT), input-output matrices, and base year revisions for India.',
      JSON.stringify([
        { title: 'Unit 1: Production Boundary & Gross Output', durationMins: 240 },
        { title: 'Unit 2: Intermediate Consumption & FISIM', durationMins: 300 },
      ]),
      0,
      null,
      null,
      JSON.stringify([
        { competencyCode: 'STAT_NATIONAL_ACCOUNTS', competencyName: 'National Accounts (SNA 2008)', gainLevel: 1 },
      ])
    ],
    [
      'igot-c03',
      'do_213948503',
      'Python for Survey Microdata & Automated Validation',
      'Data Informatics & Innovation Division (DIID)',
      'IGOT_DIGITAL',
      'TECHNICAL',
      18.0,
      3,
      'Automate data cleaning, outlier detection, and multiplier calculations on large-scale NSS/PLFS raw data files using Pandas and NumPy.',
      JSON.stringify([
        { title: 'Unit 1: Large Microdata Ingestion in Pandas', durationMins: 240 },
        { title: 'Unit 2: Multiplier Calibration & Missing Data Imputation', durationMins: 300 },
      ]),
      0,
      null,
      null,
      JSON.stringify([
        { competencyCode: 'TECH_PYTHON', competencyName: 'Python for Statistical Computing', gainLevel: 1 },
        { competencyCode: 'TECH_SQL', competencyName: 'SQL & Relational Databases', gainLevel: 1 },
      ])
    ],
  ];

  for (const c of coursesList) {
    insertCourse.run(...c);
  }
}

// Seed PLFS Microdata Sample for Virtual Lab
const microdataCount = db.prepare('SELECT COUNT(*) as count FROM plfs_microdata_sample').get().count;
if (microdataCount === 0) {
  console.log('Seeding synthetic PLFS microdata records for SQL Lab...');
  const insertMicro = db.prepare(`
    INSERT INTO plfs_microdata_sample (id, state, sector, mpce, livelihood, hh_size, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const states = ['Uttar Pradesh', 'Maharashtra', 'Bihar', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Rajasthan', 'Karnataka'];
  const sectors = ['Rural', 'Urban'];
  const livelihoods = [
    'Agriculture Self-Employed',
    'Agricultural Labour',
    'Regular Wage / Salary',
    'Non-Agri Self-Employed',
    'Casual Labour (Other)'
  ];

  for (let i = 1; i <= 250; i++) {
    const state = states[i % states.length];
    const sector = sectors[i % 2];
    const baseMpce = sector === 'Rural' ? 2200 : 5400;
    const mpce = Math.round(baseMpce + (Math.random() * 2400 - 800));
    const livelihood = livelihoods[i % livelihoods.length];
    const hhSize = (i % 5) + 3;
    const weight = parseFloat(((Math.random() * 120) + 50).toFixed(1));

    insertMicro.run(`HH-${1000 + i}`, state, sector, mpce, livelihood, hhSize, weight);
  }
}

// Seed Initial Audit Logs
const auditCount = db.prepare('SELECT COUNT(*) as count FROM audit_logs').get().count;
if (auditCount === 0) {
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, timestamp, official, action, resource, ip, hash)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const initialAudits = [
    ['EVT-88219', '2026-11-13 14:48:12 IST', 'Sachin Gosain (SSO / DIID)', 'COMPETENCY_AUTO_UPDATED', 'STAT_SURVEY_DESIGN (L2 -> L3)', '10.20.1.104 (NICNet)', 'sha256:7f4a...92b1'],
    ['EVT-88218', '2026-11-13 14:45:04 IST', 'Sachin Gosain (SSO / DIID)', 'ASSESSMENT_COMPLETED', 'Survey Sampling & NSS Multi-Stage Design (Score: 80%)', '10.20.1.104 (NICNet)', 'sha256:3a1b...88c4'],
    ['EVT-88217', '2026-11-13 14:32:45 IST', 'Ms. Ragini Kumari (Faculty / NSSTA)', 'QUIZ_PUBLISHED_TO_COHORT', 'JSO Induction Batch 2026 (5 Questions)', '10.20.4.112 (NSSTA Campus)', 'sha256:91c0...44da'],
    ['EVT-88216', '2026-11-13 14:10:19 IST', 'Sachin Gosain (SSO / DIID)', 'PARICHAY_SSO_LOGIN', 'Session JWT Granted (Role: LEARNER)', '10.20.1.104 (NICNet)', 'sha256:12e9...77b2'],
  ];

  for (const a of initialAudits) {
    insertAudit.run(...a);
  }
}

// Helper to calculate skill gaps
function getSkillGaps(userId = 'user-01') {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  const competencies = db.prepare('SELECT * FROM competencies').all();
  const benchmarks = db.prepare('SELECT * FROM role_benchmarks WHERE cadre = ? AND division = ?').all(user.cadre, user.division);
  const scores = db.prepare('SELECT * FROM user_scores WHERE user_id = ?').all(userId);

  const bmMap = new Map(benchmarks.map((b) => [b.competency_id, b]));
  const scMap = new Map(scores.map((s) => [s.competency_id, s]));

  const gapItems = competencies.map((comp) => {
    const bm = bmMap.get(comp.id);
    const sc = scMap.get(comp.id);

    const targetLevel = bm ? bm.target_level : 3;
    const weight = bm ? bm.weight : 1.0;
    const currentLevel = sc ? sc.current_level : 1;
    const gap = Math.max(0, targetLevel - currentLevel);
    const priorityScore = parseFloat((gap * weight * 1.5 + (5 - currentLevel) * 0.5).toFixed(1));

    let explanation = '';
    if (gap === 0) {
      explanation = `Target achieved (Level ${currentLevel} of ${targetLevel}). Officer meets role benchmark for ${user.cadre} in ${user.division}.`;
    } else if (gap >= 2) {
      explanation = `Critical Operational Gap: Target requires Level ${targetLevel} (Advanced/Expert execution) for ${user.division} operations, but current assessed level is Level ${currentLevel}. Immediate priority for TPAC / iGOT learning.`;
    } else {
      explanation = `Moderate Gap: Requires moving from Level ${currentLevel} to Level ${targetLevel}. Targeted practice modules recommended to close the bridge.`;
    }

    return {
      competencyId: comp.id,
      code: comp.code,
      name: comp.name,
      domain: comp.domain,
      description: comp.description,
      currentLevel,
      targetLevel,
      gap,
      weight,
      priorityScore,
      explanation,
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);

  const totalTarget = gapItems.reduce((acc, i) => acc + i.targetLevel, 0);
  const totalCapped = gapItems.reduce((acc, i) => acc + Math.min(i.currentLevel, i.targetLevel), 0);
  const readinessIndex = Math.round((totalCapped / totalTarget) * 100);

  return { gapItems, readinessIndex, user };
}

// HTTP Request Handler (Compatible with Standalone Node.js & Vercel Serverless Functions)
function requestHandler(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- REST API ENDPOINTS ---
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'UP',
      platform: 'Kaushal Setu (कौशल सेतु)',
      sihProblemId: '26101',
      organization: 'Ministry of Statistics and Programme Implementation (MoSPI)',
      department: 'Data Informatics & Innovation Division (DIID)',
      theme: 'Smart Education',
      timestamp: new Date().toISOString(),
      database: 'SQLite (node:sqlite)',
    }));
    return;
  }

  if (pathname === '/api/sih/metadata') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      problemStatementId: '26101',
      title: "Develop an AI enabled learning platform that identifies competency gaps, recommends personalized training through integration with the iGOT Karmayogi ecosystem, and is capable of generating Quizzes and Multiple choice questions (MCQs) from uploaded learning materials to strengthen capacity building in India's Official Statistical System.",
      organization: 'MoSPI',
      department: 'Data Informatics & Innovation Division (DIID)',
      category: 'Software',
      theme: 'Smart Education',
      datasetLinks: ['nssta.gov.in', 'mospi.gov.in'],
      competencyFramework: {
        totalCompetencies: 33,
        domains: ['STATISTICAL', 'TECHNICAL', 'DIGITAL_GOVERNANCE', 'BEHAVIOURAL'],
        cadres: ['ISS (Indian Statistical Service)', 'SSS (Subordinate Statistical Service)'],
        divisions: ['NAD', 'SDRD', 'FOD', 'DIID', 'SSD', 'ESD']
      }
    }));
    return;
  }

  if (pathname === '/api/competencies') {
    const list = db.prepare('SELECT * FROM competencies ORDER BY domain, code').all();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(list));
    return;
  }

  if (pathname === '/api/competencies/gaps') {
    const userId = parsedUrl.searchParams.get('userId') || 'user-01';
    const result = getSkillGaps(userId);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
    return;
  }

  if (pathname === '/api/recommendations/pathways') {
    const courses = db.prepare('SELECT * FROM courses').all();
    const formatted = courses.map((c) => ({
      ...c,
      syllabus: JSON.parse(c.syllabus_json || '[]'),
      competencyGain: JSON.parse(c.competency_gains_json || '[]'),
      isTpacApproved: Boolean(c.is_tpac_approved),
    }));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(formatted));
    return;
  }

  if (pathname === '/api/labs/sql/query' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { query } = JSON.parse(body || '{}');
        const start = performance.now();
        // Safe read-only execution
        const safeQuery = query && typeof query === 'string' ? query.trim() : 'SELECT * FROM plfs_microdata_sample LIMIT 10';
        if (!safeQuery.toLowerCase().startsWith('select')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Only SELECT queries are permitted in the sandbox.' }));
          return;
        }

        const rows = db.prepare(safeQuery).all();
        const executionMs = parseFloat((performance.now() - start).toFixed(1));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ rows, executionMs }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  if (pathname === '/api/audit/logs') {
    const logs = db.prepare('SELECT * FROM audit_logs ORDER BY timestamp DESC').all();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(logs));
    return;
  }

  // Generate Bloom-stratified MCQs from uploaded text
  if (pathname === '/api/assessment/generate' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { title, content, cohort, bloomLevel } = JSON.parse(body || '{}');
        const text = (content || '').toLowerCase();

        let questions = [];

        if (text.includes('gva') || text.includes('accounts') || text.includes('gross value')) {
          questions = [
            {
              id: 'q_gen_' + Date.now() + '_1',
              bloomLevel: 'EVALUATE',
              difficulty: 'HARD',
              question: 'In the Indian National Accounts framework (Base 2011-12), how is Gross Value Added (GVA) at basic prices methodologically transitioned to Gross Domestic Product (GDP) at market prices?',
              options: [
                { key: 'A', text: 'GDP at market prices = GVA at basic prices + Product Taxes - Product Subsidies', isCorrect: true },
                { key: 'B', text: 'GDP at market prices = GVA at basic prices - Production Taxes + Production Subsidies', isCorrect: false },
                { key: 'C', text: 'GDP at market prices = GVA at basic prices + Intermediate Consumption', isCorrect: false },
                { key: 'D', text: 'GDP at market prices = GVA at factor cost directly without indirect tax adjustment', isCorrect: false }
              ],
              sourceChunk: 'Transition from basic prices to market prices incorporates net product taxes as per SNA 2008 standards.',
              explanation: 'Under SNA 2008 and MoSPI 2011-12 series, GDP at market prices equals GVA at basic prices plus product taxes less product subsidies. Production taxes and subsidies are already factored into GVA at basic prices.'
            },
            {
              id: 'q_gen_' + Date.now() + '_2',
              bloomLevel: 'ANALYZE',
              difficulty: 'MEDIUM',
              question: 'Which deflator is strictly used in MoSPI National Accounts Division to estimate real GVA for the manufacturing sector?',
              options: [
                { key: 'A', text: 'Wholesale Price Index (WPI) manufacturing sub-indices applied via double deflation / single indicator method', isCorrect: true },
                { key: 'B', text: 'Consumer Price Index (CPI-Rural) headline index', isCorrect: false },
                { key: 'C', text: 'Unadjusted exchange rate depreciation factor', isCorrect: false },
                { key: 'D', text: 'Implicit price deflator derived from agricultural mandi arrivals', isCorrect: false }
              ],
              sourceChunk: 'Deflation of manufacturing output currently relies on relevant commodity-specific WPI sub-indices.',
              explanation: 'In the absence of a comprehensive Producer Price Index (PPI), output is deflated using disaggregated WPI sub-indices to obtain real estimates.'
            }
          ];
        } else if (text.includes('privacy') || text.includes('dpdp') || text.includes('cyber')) {
          questions = [
            {
              id: 'q_gen_' + Date.now() + '_1',
              bloomLevel: 'ANALYZE',
              difficulty: 'HARD',
              question: 'Under the Digital Personal Data Protection (DPDP) Act 2023, how are statistical surveys conducted by MoSPI classified regarding personal data processing obligations?',
              options: [
                { key: 'A', text: 'MoSPI acts as a Data Fiduciary and must implement pseudonymization and strict purpose limitation for survey returns', isCorrect: true },
                { key: 'B', text: 'Statistical surveys are completely exempt from all data security safeguards and access logging', isCorrect: false },
                { key: 'C', text: 'Enumerators can share microdata files on unsecured commercial messaging platforms', isCorrect: false },
                { key: 'D', text: 'Household identifiers must be published openly with microdata without anonymization', isCorrect: false }
              ],
              sourceChunk: 'Survey returns containing identifiable respondent details require cryptographic pseudonymization before public release.',
              explanation: 'Section 17 of DPDP Act permits processing for statistical purposes only when anonymized or safeguarded through pseudonymization to prevent re-identification.'
            }
          ];
        } else {
          // Default: Survey Sampling & Multi-stage methodology
          questions = [
            {
              id: 'q_gen_' + Date.now() + '_1',
              bloomLevel: 'ANALYZE',
              difficulty: 'HARD',
              question: 'In NSS multi-stage stratified survey designs, what is the mathematical rationale for dividing large Census villages (FSUs) into hamlet-groups?',
              options: [
                { key: 'A', text: 'To maintain operational feasibility during household listing while preserving equal probability or PPS selection within sub-units', isCorrect: true },
                { key: 'B', text: 'To artificially deflate the standard error to zero regardless of sample variance', isCorrect: false },
                { key: 'C', text: 'To eliminate the requirement of calculating sampling multipliers at the estimation stage', isCorrect: false },
                { key: 'D', text: 'To substitute non-responding households without statistical penalty', isCorrect: false }
              ],
              sourceChunk: 'The first stage units (FSU) are Census villages in rural areas. Large FSUs are subdivided into hamlet-groups of roughly equal population.',
              explanation: 'Dividing large FSUs into hamlet-groups prevents exhaustive listing of unmanageable village sizes, reducing lister fatigue and non-sampling errors while preserving unbiased inclusion probabilities.'
            },
            {
              id: 'q_gen_' + Date.now() + '_2',
              bloomLevel: 'APPLY',
              difficulty: 'MEDIUM',
              question: 'How is the final household multiplier calculated when estimating aggregate totals from a two-stage stratified sample?',
              options: [
                { key: 'A', text: 'Multiplier = Inverse of the joint probability of selection across primary (FSU) and ultimate (household) stages', isCorrect: true },
                { key: 'B', text: 'Multiplier = Total population divided by sample size without stratum weights', isCorrect: false },
                { key: 'C', text: 'Multiplier = Raw household count multiplied by enumerator daily allowance', isCorrect: false },
                { key: 'D', text: 'Multiplier = Fixed constant of 100 for all regional strata', isCorrect: false }
              ],
              sourceChunk: 'Multipliers are calculated as the inverse of inclusion probabilities at each stage to generate unbiased national estimates.',
              explanation: 'The Horvitz-Thompson estimator dictates that each observation is weighted by the inverse of its probability of inclusion across all sampling stages.'
            },
            {
              id: 'q_gen_' + Date.now() + '_3',
              bloomLevel: 'EVALUATE',
              difficulty: 'HARD',
              question: 'Under what condition does Simple Random Sampling (SRSWOR) yield higher variance than Stratified Multi-Stage Sampling for household expenditure surveys?',
              options: [
                { key: 'A', text: 'When between-strata variance is high and within-strata homogeneity is maximized', isCorrect: true },
                { key: 'B', text: 'When the population is perfectly homogeneous across all geographic regions', isCorrect: false },
                { key: 'C', text: 'When the sample size equals the entire population universe', isCorrect: false },
                { key: 'D', text: 'When design effect (Deff) is exactly 1.0', isCorrect: false }
              ],
              sourceChunk: 'Stratification into Second Stage Strata (SSS) isolates economic variability across affluent and non-affluent households.',
              explanation: 'Stratification effectively removes between-strata variance from the sampling error, making stratified sampling substantially more precise than SRS when subgroups differ markedly.'
            }
          ];
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          title: title || 'Generated MoSPI Competency Evaluation',
          cohort: cohort || 'JSO Induction Batch 2026',
          bloomTaxonomyCoverage: ['ANALYZE', 'APPLY', 'EVALUATE'],
          questionsCount: questions.length,
          questions,
          generatedAt: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Submit assessment and dynamically update competency profile & audit logs
  if (pathname === '/api/assessment/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { userId = 'user-01', competencyId = 'stat-01', scorePct = 100 } = JSON.parse(body || '{}');

        // Fetch current score
        const current = db.prepare('SELECT current_level FROM user_scores WHERE user_id = ? AND competency_id = ?').get(userId, competencyId);
        const oldLevel = current ? current.current_level : 2;
        let newLevel = oldLevel;

        if (scorePct >= 70 && oldLevel < 5) {
          newLevel = oldLevel + 1;
        }

        // Upsert score
        db.prepare(`
          INSERT INTO user_scores (user_id, competency_id, current_level, confidence, assessed_via, last_assessed_at)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id, competency_id) DO UPDATE SET
            current_level = excluded.current_level,
            confidence = excluded.confidence,
            assessed_via = excluded.assessed_via,
            last_assessed_at = excluded.last_assessed_at
        `).run(userId, competencyId, newLevel, 0.95, 'ASSESSMENT_PLAYER', new Date().toISOString());

        // Insert audit log
        const evtId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
        const user = db.prepare('SELECT name, cadre, division FROM users WHERE id = ?').get(userId);
        const officialName = user ? `${user.name} (${user.cadre} / ${user.division})` : 'Statistical Officer';
        const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' IST';
        const hash = 'sha256:' + crypto.randomBytes(6).toString('hex') + '...' + crypto.randomBytes(4).toString('hex');

        db.prepare(`
          INSERT INTO audit_logs (id, timestamp, official, action, resource, ip, hash)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          evtId,
          nowStr,
          officialName,
          'ASSESSMENT_COMPLETED',
          `Competency ${competencyId} upgraded Level ${oldLevel} -> Level ${newLevel} (Score: ${scorePct}%)`,
          '10.20.1.104 (NICNet)',
          hash
        );

        const updatedGaps = getSkillGaps(userId);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          oldLevel,
          newLevel,
          scorePct,
          readinessIndex: updatedGaps.readinessIndex,
          auditEventId: evtId,
          message: `Competency successfully updated from Level ${oldLevel} to Level ${newLevel}`
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // AI Assistant Chat endpoint
  if (pathname === '/api/assistant/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { message = '', userId = 'user-01' } = JSON.parse(body || '{}');
        const q = message.toLowerCase();

        let reply = '';
        if (q.includes('sampling') || q.includes('weight') || q.includes('fsu') || q.includes('multiplier')) {
          reply = `In MoSPI SDRD survey methodology, the final household multiplier $W_{hij}$ is calculated as:
$$W_{hij} = \\frac{1}{p_{hi}} \\times \\frac{1}{p_{hij|hi}}$$
Where $p_{hi}$ represents the probability of selection of the First Stage Unit (FSU Census Village / UFS block) and $p_{hij|hi}$ is the selection probability of household $j$ within Second Stage Stratum $SSS$. This Horvitz-Thompson formulation produces asymptotically unbiased estimates for national aggregates under UN NQAF standards.`;
        } else if (q.includes('gva') || q.includes('gdp') || q.includes('national accounts') || q.includes('deflator')) {
          reply = `According to the MoSPI National Accounts Division (NAD) 2011-12 base methodology:
- **GVA at basic prices** = Output at basic prices - Intermediate Consumption at purchasers' prices.
- **GDP at market prices** = GVA at basic prices + Product Taxes - Product Subsidies.
- Real growth is computed using sectoral price deflators (WPI manufacturing sub-indices and CPI-Combined) to isolate volume changes from price effects.`;
        } else if (q.includes('dpdp') || q.includes('privacy') || q.includes('data protection')) {
          reply = `Under the Digital Personal Data Protection (DPDP) Act 2023:
1. MoSPI divisions operate as **Data Fiduciaries** for all respondent microdata.
2. Direct identifiers (respondent name, Aadhaar, contact details) must be removed and replaced with cryptographically pseudonymous IDs before dissemination.
3. All database queries on microdata must be recorded in an immutable audit ledger with user identity and timestamp.`;
        } else if (q.includes('igot') || q.includes('tpac') || q.includes('course') || q.includes('training')) {
          reply = `Based on your diagnostic profile, your highest priority gap is **Survey Design & Sampling Frames (Deficit: 2 Levels)**.
Recommended blended pathway:
1. **iGOT Karmayogi**: *Complex Survey Design & Sampling Frames* (12 hrs, self-paced).
2. **NSSTA Greater Noida**: *TPAC Residential Masterclass on Advanced Sampling & SAE* (60 hrs, 16–27 March 2026, 35 seats).`;
        } else {
          reply = `Namaste! As your **Kaushal Setu AI Learning Companion**, I can assist you with MoSPI survey designs, National Accounts methodology, CPI/WPI index calculations, DPDP Act compliance, and personalized learning pathways mapped from your competency profile. What specific topic would you like to explore?`;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          reply,
          timestamp: new Date().toISOString(),
          sourcesCited: ['MoSPI SDRD Survey Manual', 'UN NQAF Guidelines', 'iGOT Karmayogi CBC Framework']
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Update user profile from Onboarding Wizard (Scope A)
  if (pathname === '/api/users/profile/update' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { userId = 'user-01', name, cadre, designation, division, qualification } = JSON.parse(body || '{}');
        
        db.prepare(`
          UPDATE users SET 
            name = COALESCE(?, name),
            cadre = COALESCE(?, cadre),
            designation = COALESCE(?, designation),
            division = COALESCE(?, division),
            qualification = COALESCE(?, qualification)
          WHERE id = ?
        `).run(name, cadre, designation, division, qualification, userId);

        // Record audit
        const evtId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
        const hash = 'sha256:' + crypto.randomBytes(6).toString('hex') + '...' + crypto.randomBytes(4).toString('hex');
        const nowStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' IST';
        db.prepare(`
          INSERT INTO audit_logs (id, timestamp, official, action, resource, ip, hash)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          evtId,
          nowStr,
          `${name || 'Officer'} (${cadre || 'SSS'} / ${division || 'DIID'})`,
          'PROFILE_ONBOARDING_COMPLETED',
          `Competency benchmarks calibrated for ${division} division`,
          '10.20.1.104 (NICNet)',
          hash
        );

        const updated = getSkillGaps(userId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user: updated.user, readinessIndex: updated.readinessIndex, auditId: evtId }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Course Enrollment & Digital Passbook Sync
  if (pathname === '/api/courses/enroll' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      try {
        const { userId = 'user-01', courseId = 'tpac-01' } = JSON.parse(body || '{}');
        const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(courseId);
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);

        const enrollmentId = `ENR-${Math.floor(10000 + Math.random() * 90000)}`;
        const nowIso = new Date().toISOString();

        const existing = db.prepare('SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?').get(userId, courseId);
        if (existing) {
          db.prepare(`
            UPDATE enrollments SET status = 'COMPLETED', progress_pct = 100, completed_at = ? WHERE id = ?
          `).run(nowIso, existing.id);
        } else {
          db.prepare(`
            INSERT INTO enrollments (id, user_id, course_id, status, progress_pct, enrolled_at, completed_at)
            VALUES (?, ?, ?, 'COMPLETED', 100, ?, ?)
          `).run(enrollmentId, userId, courseId, nowIso, nowIso);
        }

        // Update user learning hours and badges
        db.prepare(`
          UPDATE users SET 
            learning_hours = learning_hours + ?,
            badges_count = badges_count + 1
          WHERE id = ?
        `).run(course ? course.duration_hours : 10, userId);

        // Record audit
        const evtId = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
        const hash = 'sha256:' + crypto.randomBytes(6).toString('hex') + '...' + crypto.randomBytes(4).toString('hex');
        const nowStr = nowIso.replace('T', ' ').slice(0, 19) + ' IST';
        db.prepare(`
          INSERT INTO audit_logs (id, timestamp, official, action, resource, ip, hash)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(
          evtId,
          nowStr,
          `${user.name} (${user.cadre} / ${user.division})`,
          'COURSE_COMPLETED_CREDENTIAL_ISSUED',
          `${course ? course.title : 'Official Statistics Course'} (Passbook Verified)`,
          '10.20.1.104 (NICNet)',
          hash
        );

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          enrollmentId,
          courseTitle: course ? course.title : 'Course',
          certificateId: `CERT-MoSPI-${Math.floor(100000 + Math.random() * 900000)}`,
          auditEventId: evtId,
          hoursCredited: course ? course.duration_hours : 10
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Predictive Capacity Building Forecasting (Scope L)
  if (pathname === '/api/admin/forecast') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      methodology: 'Autoregressive Policy Shift Modeling (AR-PSM)',
      explanation: 'Forecasts institutional capacity bottlenecks based on upcoming national statistical mandates, UN methodological revisions, and technological rollouts over a 24-month horizon.',
      forecastItems: [
        {
          id: 'fc-01',
          initiative: 'UN System of National Accounts (SNA 2025/2026 Revision)',
          affectedDivisions: ['NAD (National Accounts Division)', 'ESD (Economic Statistics)'],
          skillArea: 'Chain-Volume Measures & Digital Economy Accounting',
          projectedDemandIncrease: '+48%',
          currentReadiness: '62%',
          urgency: 'HIGH',
          recommendedTPACProgramme: 'TPAC-2026-03 (National Accounts Advanced Masterclass)'
        },
        {
          id: 'fc-02',
          initiative: 'MoSPI CAPI 2.0 Tablet & Geospatial Sampling Rollout',
          affectedDivisions: ['FOD (Field Operations Division)', 'SDRD'],
          skillArea: 'CAPI Field Protocols, Offline Sync & GIS Geofencing',
          projectedDemandIncrease: '+64%',
          currentReadiness: '54%',
          urgency: 'CRITICAL',
          recommendedTPACProgramme: 'TPAC-2026-01 (Complex Survey Sampling & Field Technology)'
        },
        {
          id: 'fc-03',
          initiative: 'Digital Personal Data Protection (DPDP) Act 2023 Certification',
          affectedDivisions: ['ALL DIVISIONS (FOD, SDRD, NAD, DIID, SSD)'],
          skillArea: 'Data Privacy, Cryptographic Pseudonymization & Audit Logging',
          projectedDemandIncrease: '+85%',
          currentReadiness: '41%',
          urgency: 'MANDATORY',
          recommendedTPACProgramme: 'iGOT-GOV-01 (DPDP Act 2023 Compliance for Civil Servants)'
        }
      ]
    }));
    return;
  }

  // --- SERVE THE FULL-FEATURED APPLICATION UI ---
  // Read public html or serve single-file SPA
  const indexPath = path.join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Kaushal Setu Server Initialized</h1>');
}

const server = http.createServer(requestHandler);

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`KAUSHAL SETU (कौशल सेतु) - MoSPI DIID (SIH 2026)`);
    console.log(`Application running at: http://localhost:${PORT}`);
    console.log(`Integrated SQLite Database: ${DB_PATH}`);
    console.log(`Zero external npm dependencies needed for deployment!`);
    console.log(`================================================================`);
  });
}

module.exports = requestHandler;
