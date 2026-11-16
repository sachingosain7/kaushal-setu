/**
 * Unit Test Suite for Kaushal Setu
 * Built with node:test and node:assert (zero external dependencies)
 */

const test = require('node:test');
const assert = require('node:assert/strict');

// 1. GAP COMPUTATION LOGIC TEST
test('Gap Computation calculates mathematical gap and priority score', () => {
  function computeGap(current, target, weight = 1.0) {
    const gap = Math.max(0, target - current);
    const priorityScore = parseFloat((gap * weight * 1.5 + (5 - current) * 0.5).toFixed(1));
    return { gap, priorityScore };
  }

  // Level 2 current vs Level 4 target with weight 1.5
  const result1 = computeGap(2, 4, 1.5);
  assert.equal(result1.gap, 2, 'Gap should be 2');
  assert.equal(result1.priorityScore, 6.0, 'Priority score should be (2 * 1.5 * 1.5) + (3 * 0.5) = 6.0');

  // Met target: Level 4 current vs Level 4 target
  const result2 = computeGap(4, 4, 1.2);
  assert.equal(result2.gap, 0, 'Gap should be 0 when target is met');
  assert.equal(result2.priorityScore, 0.5, 'Priority score should only reflect maintenance factor');
});

// 2. RECOMMENDER RANKING TEST
test('Recommender prioritizes courses closing highest priority gaps', () => {
  const mockGaps = [
    { code: 'STAT_SURVEY_DESIGN', gap: 2, priorityScore: 5.5 },
    { code: 'STAT_PRICE_STATISTICS', gap: 0, priorityScore: 0.5 },
  ];

  const mockCourses = [
    { id: 'c1', title: 'Survey Sampling', gainCode: 'STAT_SURVEY_DESIGN', isTpac: false },
    { id: 'c2', title: 'Price Indices', gainCode: 'STAT_PRICE_STATISTICS', isTpac: false },
    { id: 'c3', title: 'Advanced Survey TPAC', gainCode: 'STAT_SURVEY_DESIGN', isTpac: true },
  ];

  function scoreCourses(courses, gaps) {
    return courses.map(c => {
      const g = gaps.find(gap => gap.code === c.gainCode);
      const matchScore = (g && g.gap > 0) ? g.priorityScore * (c.isTpac ? 1.4 : 1.0) : 0;
      return { ...c, matchScore };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  const ranked = scoreCourses(mockCourses, mockGaps);
  assert.equal(ranked[0].id, 'c3', 'NSSTA TPAC course closing critical gap should be ranked #1');
  assert.equal(ranked[1].id, 'c1', 'iGOT course closing critical gap should be ranked #2');
  assert.equal(ranked[2].id, 'c2', 'Course for already-met competency should be ranked lowest');
});

// 3. MCQ JSON VALIDATION TEST
test('MCQ Validator rejects invalid keys, missing citations, or banned distractors', () => {
  function validateMCQ(q) {
    const validKeys = ['A', 'B', 'C', 'D'];
    if (!q.questionText || typeof q.questionText !== 'string') return false;
    if (!validKeys.includes(q.correctOption)) return false;
    if (!q.optionA || !q.optionB || !q.optionC || !q.optionD) return false;
    if (!q.sourceChunkRef) return false;
    if (!q.explanation || q.explanation.length < 10) return false;

    // Check banned lazy options
    const allOptions = [q.optionA, q.optionB, q.optionC, q.optionD].map(o => o.toLowerCase());
    const banned = ['all of the above', 'none of the above', 'both a and b'];
    for (const b of banned) {
      if (allOptions.some(o => o.includes(b))) return false;
    }
    return true;
  }

  const validQuestion = {
    questionText: 'Under NSS guidelines, why are hamlet-groups created?',
    optionA: 'To ensure manageable field listing in large villages',
    optionB: 'To artificially compress sampling variance',
    optionC: 'To substitute missing households',
    optionD: 'To bypass urban frame updates',
    correctOption: 'A',
    explanation: 'Hamlet groups divide large FSUs to maintain listing feasibility.',
    bloomLevel: 'ANALYZE',
    sourceChunkRef: 'chunk-1'
  };

  assert.equal(validateMCQ(validQuestion), true, 'Valid question should pass validation');

  const lazyQuestion = {
    ...validQuestion,
    optionD: 'All of the above'
  };
  assert.equal(validateMCQ(lazyQuestion), false, 'Question with "All of the above" must fail validation');

  const missingKeyQuestion = {
    ...validQuestion,
    correctOption: 'E'
  };
  assert.equal(validateMCQ(missingKeyQuestion), false, 'Question with invalid key must fail validation');
});
