import test from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = 'http://localhost:3000';

test('SIH 26101 Metadata Verification', async () => {
  const res = await fetch(`${BASE_URL}/api/sih/metadata`);
  assert.equal(res.status, 200);
  const data = await res.json();
  
  assert.equal(data.problemStatementId, '26101');
  assert.equal(data.organization, 'MoSPI');
  assert.equal(data.department, 'Data Informatics & Innovation Division (DIID)');
  assert.equal(data.theme, 'Smart Education');
  assert.ok(data.datasetLinks.includes('nssta.gov.in'));
  assert.ok(data.datasetLinks.includes('mospi.gov.in'));
  assert.equal(data.competencyFramework.totalCompetencies, 33);
  assert.deepEqual(data.competencyFramework.domains, [
    'STATISTICAL',
    'TECHNICAL',
    'DIGITAL_GOVERNANCE',
    'BEHAVIOURAL'
  ]);
});

test('Assessment Generator with Grounded Bloom Taxonomy', async () => {
  const payload = {
    title: 'NSS 80th Round Sampling',
    content: 'The first stage units (FSU) are Census villages in rural areas. Large FSUs are divided into hamlet-groups to prevent listing fatigue.',
    cohort: 'JSO Induction Batch 2026'
  };

  const res = await fetch(`${BASE_URL}/api/assessment/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.questionsCount >= 1);
  const q1 = data.questions[0];
  assert.ok(['ANALYZE', 'APPLY', 'EVALUATE'].includes(q1.bloomLevel));
  assert.equal(q1.options.length, 4);
  const correctOptions = q1.options.filter(o => o.isCorrect);
  assert.equal(correctOptions.length, 1);
  assert.ok(q1.sourceChunk.length > 10);
});

test('Assessment Submission & Audit Ledger Integrity', async () => {
  const submitRes = await fetch(`${BASE_URL}/api/assessment/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'user-01', competencyId: 'stat-01', scorePct: 100 })
  });

  assert.equal(submitRes.status, 200);
  const submitData = await submitRes.json();
  assert.equal(submitData.success, true);
  assert.ok(submitData.auditEventId.startsWith('EVT-'));
  assert.ok(submitData.readinessIndex > 0);

  // Verify that audit log records this event
  const auditRes = await fetch(`${BASE_URL}/api/audit/logs`);
  const audits = await auditRes.json();
  const found = audits.find(a => a.id === submitData.auditEventId);
  assert.ok(found, 'Audit event must exist in statutory ledger');
  assert.equal(found.action, 'ASSESSMENT_COMPLETED');
});

test('Virtual Lab SQLite Sandbox Security', async () => {
  // Test valid SELECT query
  const validRes = await fetch(`${BASE_URL}/api/labs/sql/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'SELECT sector, COUNT(*) as count FROM plfs_microdata_sample GROUP BY sector' })
  });
  assert.equal(validRes.status, 200);
  const validData = await validRes.json();
  assert.equal(validData.rows.length, 2);

  // Test dangerous non-SELECT injection prevention
  const badRes = await fetch(`${BASE_URL}/api/labs/sql/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: 'DROP TABLE plfs_microdata_sample' })
  });
  assert.equal(badRes.status, 400);
  const badData = await badRes.json();
  assert.ok(badData.error.includes('Only SELECT queries'));
});

test('AI Assistant Grounded MoSPI Methodological Guidance', async () => {
  const res = await fetch(`${BASE_URL}/api/assistant/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'How are survey weights calculated in multi stage sampling?' })
  });
  assert.equal(res.status, 200);
  const data = await res.json();
  assert.ok(data.reply.includes('Horvitz-Thompson') || data.reply.includes('multiplier'));
  assert.ok(data.sourcesCited.includes('MoSPI SDRD Survey Manual'));
});
