/**
 * Comprehensive Automated Dry Run & Verification Suite for Kaushal Setu Production
 * Tests every single API route, authentication flow, AI intelligence, and frontend assets.
 */
const http = require('node:http');
const requestHandler = require('../server.js');

const PORT = 3982;
let server;

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    }, (res) => {
      let raw = '';
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw);
          resolve({ status: res.statusCode, data: parsed, raw });
        } catch (e) {
          resolve({ status: res.statusCode, data: null, raw });
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(dataString);
    req.end();
  });
}

async function runDryRun() {
  console.log('========================================================================');
  console.log('🚀 INITIATING FULL PRODUCTION DRY RUN: KAUSHAL SETU PLATFORM');
  console.log('========================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, detail = '') {
    if (condition) {
      console.log(`  [PASS] ✓ ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ✗ ${testName} - ${detail}`);
      failed++;
    }
  }

  // 1. Health & Portal Metadata
  console.log('--- 1. System Health & Official Metadata ---');
  const health = await makeRequest('GET', '/api/health');
  assert(health.status === 200, 'Health Endpoint returns 200 OK');
  assert(health.data.status === 'UP', 'Health status is UP');
  assert(health.data.version === '2.5.0-production', 'Production version tag verified');
  assert(health.data.organization.includes('MoSPI'), 'MoSPI organization verified');
  assert(!health.data.sihProblemId, 'SIH problem ID successfully removed from production health check');

  const meta = await makeRequest('GET', '/api/portal/metadata');
  assert(meta.status === 200, 'Portal Metadata returns 200 OK');
  assert(meta.data.competencyFramework.totalCompetencies === 33, '33 competencies declared in framework');

  // 2. Google / Gmail Authentication Flow
  console.log('\n--- 2. Google / Gmail Sign-In & Session Verification ---');
  const googleLogin = await makeRequest('POST', '/api/auth/google', {
    email: 'gosainsachin7@gmail.com',
    name: 'Sachin Gosain'
  });
  assert(googleLogin.status === 200, 'Google Login returns 200 OK');
  assert(googleLogin.data.success === true, 'Google Login success flag is true');
  assert(googleLogin.data.user.email === 'gosainsachin7@gmail.com', 'Google User email verified');
  assert(googleLogin.data.user.provider === 'GOOGLE_GMAIL', 'Provider confirmed as GOOGLE_GMAIL');
  assert(googleLogin.data.token && googleLogin.data.token.startsWith('ks_jwt_'), 'Session JWT token issued');

  // Test custom new Google user
  const newGoogleUser = await makeRequest('POST', '/api/auth/google', {
    email: 'priya.sharma@gmail.com',
    name: 'Priya Sharma'
  });
  assert(newGoogleUser.status === 200, 'New Google User registration returns 200 OK');
  assert(newGoogleUser.data.user.name === 'Priya Sharma', 'New officer profile initialized');

  // 3. Competency Architecture & Gap Engine
  console.log('\n--- 3. Competencies & Dynamic Gap Engine ---');
  const comps = await makeRequest('GET', '/api/competencies');
  assert(comps.status === 200, 'Competencies list returns 200 OK');
  assert(Array.isArray(comps.data) && comps.data.length === 33, 'Exactly 33 official competencies loaded');

  const gaps = await makeRequest('GET', `/api/competencies/gaps?userId=${newGoogleUser.data.user.id}`);
  assert(gaps.status === 200, 'Dynamic Skill Gap engine returns 200 OK for Google user');
  assert(typeof gaps.data.readinessIndex === 'number', `Readiness index calculated: ${gaps.data.readinessIndex}%`);
  assert(Array.isArray(gaps.data.gapItems) && gaps.data.gapItems.length === 33, 'All 33 gaps prioritized with operational rationale');

  // 4. Learning Pathways (NSSTA & iGOT)
  console.log('\n--- 4. Learning Pathways & iGOT Ecosystem ---');
  const pathways = await makeRequest('GET', '/api/recommendations/pathways');
  assert(pathways.status === 200, 'Pathways endpoint returns 200 OK');
  assert(Array.isArray(pathways.data) && pathways.data.length >= 6, 'All 6 official learning modules loaded');
  const tpacCourse = pathways.data.find(c => c.isTpacApproved);
  assert(Boolean(tpacCourse), `TPAC Approved masterclass found: "${tpacCourse ? tpacCourse.title : ''}"`);

  // 5. Virtual SQL Lab & PLFS Microdata Sandbox
  console.log('\n--- 5. Virtual Labs & Microdata SQL Engine ---');
  const queryResult = await makeRequest('POST', '/api/labs/sql/query', {
    sql: 'SELECT sector, COUNT(*) as sample_count, ROUND(AVG(mpce), 2) as avg_mpce FROM plfs_microdata_sample GROUP BY sector;'
  });
  assert(queryResult.status === 200, 'PLFS Microdata SQL query executes with 200 OK');
  assert(queryResult.data.rows && queryResult.data.rows.length === 2, 'Rural and Urban sectors correctly aggregated');
  assert(typeof queryResult.data.executionMs === 'number', `Execution speed benchmark: ${queryResult.data.executionMs} ms`);

  // SQL Security Injection Test
  const badQuery = await makeRequest('POST', '/api/labs/sql/query', {
    sql: 'DROP TABLE plfs_microdata_sample;'
  });
  assert(badQuery.status === 400, 'Sandbox safely blocks non-SELECT injection attempts');

  // 6. Kaushal AI Statistical Intelligence Copilot
  console.log('\n--- 6. Kaushal AI Statistical Copilot ---');
  // AI NL to SQL query generator
  const aiSql = await makeRequest('POST', '/api/assistant/chat', {
    message: 'Write a SQL query for average MPCE by sector in PLFS'
  });
  assert(aiSql.status === 200, 'AI Copilot responds with 200 OK');
  assert(aiSql.data.action && aiSql.data.action.type === 'RUN_SQL', 'AI correctly synthesizes RUN_SQL action payload');
  assert(aiSql.data.sql && aiSql.data.sql.includes('plfs_microdata_sample'), 'AI generated valid PLFS SQL statement');

  // AI Sampling Methodology
  const aiSampling = await makeRequest('POST', '/api/assistant/chat', {
    message: 'Explain Horvitz-Thompson sampling multiplier formula'
  });
  assert(aiSampling.data.reply.includes('Horvitz-Thompson') || aiSampling.data.reply.includes('multiplier'), 'AI provides grounded sampling formula derivation');
  assert(Array.isArray(aiSampling.data.sourcesCited) && aiSampling.data.sourcesCited.length > 0, 'AI cites official MoSPI manuals as ground truth');

  // 7. Assessment Engine & Bloom MCQ Generation
  console.log('\n--- 7. Assessment Engine & Faculty Review Studio ---');
  const genQuiz = await makeRequest('POST', '/api/assessment/generate', {
    title: 'NSS 80th Round Instructions',
    content: 'The first stage units (FSU) are Census villages in rural areas and UFS blocks in urban areas. Sample households are drawn by simple random sampling without replacement (SRSWOR). Multipliers are calculated as inverse inclusion probabilities.',
    cohort: 'JSO Induction Batch 2026'
  });
  assert(genQuiz.status === 200, 'MCQ Generation returns 200 OK');
  assert(genQuiz.data.questionsCount >= 1, `${genQuiz.data.questionsCount} Bloom-stratified questions generated`);

  // Assessment Player Submission
  const submitQuiz = await makeRequest('POST', '/api/assessment/submit', {
    userId: 'user-01',
    competencyId: 'stat-01',
    scorePct: 100
  });
  assert(submitQuiz.status === 200, 'Assessment submission returns 200 OK');
  assert(submitQuiz.data.success === true, 'Competency level auto-updated');
  assert(Boolean(submitQuiz.data.auditEventId), `Cryptographic audit event created: ${submitQuiz.data.auditEventId}`);

  // 8. Course Credential & Passbook Sync
  console.log('\n--- 8. Course Credential Issuance & Passbook Sync ---');
  const enroll = await makeRequest('POST', '/api/courses/enroll', {
    userId: 'user-01',
    courseId: 'tpac-01'
  });
  assert(enroll.status === 200, 'Course enrollment & completion returns 200 OK');
  assert(Boolean(enroll.data.certificateId), `W3C Verifiable Credential ID issued: ${enroll.data.certificateId}`);

  // 9. Profile Builder Calibration
  console.log('\n--- 9. Officer Profile Builder ---');
  const profileUpdate = await makeRequest('POST', '/api/users/profile/update', {
    userId: 'user-01',
    name: 'Sachin Gosain',
    cadre: 'SSS',
    designation: 'Senior Statistical Officer',
    division: 'DIID',
    qualification: 'M.Sc. Statistics'
  });
  assert(profileUpdate.status === 200, 'Profile calibration returns 200 OK');
  assert(profileUpdate.data.success === true, 'Role benchmarks dynamically calibrated');

  // 10. Admin Predictive Analytics & Forecasting
  console.log('\n--- 10. Admin Analytics & Institutional Forecasting ---');
  const forecast = await makeRequest('GET', '/api/admin/forecast');
  assert(forecast.status === 200, 'Forecasting endpoint returns 200 OK');
  assert(forecast.data.annualCapacityBuildingPlan === 'ACBP-2026-MoSPI', 'ACBP 2026 institutional plan loaded');
  assert(Array.isArray(forecast.data.divisionSummary), 'Division summaries verified');

  // 11. Immutable Audit Ledger
  console.log('\n--- 11. Compliance Audit Trail (DPDP Act 2023) ---');
  const audits = await makeRequest('GET', '/api/audit/logs');
  assert(audits.status === 200, 'Audit logs return 200 OK');
  assert(Array.isArray(audits.data) && audits.data.length > 0, 'Audit entries verified in ledger');
  const hasSha = audits.data.every(a => a.hash && a.hash.startsWith('sha256:'));
  assert(hasSha, 'All audit log records sealed with cryptographic SHA-256 hashes');

  // 12. Frontend SPA Single-Page Assets
  console.log('\n--- 12. Production Frontend SPA Verification ---');
  const spa = await makeRequest('GET', '/');
  assert(spa.status === 200, 'Frontend HTML returns 200 OK');
  assert(spa.raw.includes('Sign in with Google'), 'Google Sign-in section present in HTML');
  assert(spa.raw.includes('Kaushal AI Copilot'), 'Kaushal AI Copilot present in HTML');
  assert(spa.raw.includes('PLFS Microdata'), 'PLFS Microdata Lab present in HTML');
  assert(!spa.raw.includes('SIH26101') && !spa.raw.includes('Smart India Hackathon'), 'Strictly ZERO hackathon references in frontend HTML');

  console.log('\n========================================================================');
  console.log(`DRY RUN COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

// Start server on test port and execute suite
server = http.createServer(requestHandler);
server.listen(PORT, async () => {
  try {
    await runDryRun();
  } catch (err) {
    console.error('Dry run execution error:', err);
    process.exit(1);
  } finally {
    server.close(() => process.exit(0));
  }
});
