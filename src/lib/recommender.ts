import { CompetencyScoreWithBenchmark, CourseItem, Domain } from '@/types';
import { MOCK_IGOT_CATALOGUE } from './igot/MockIgotClient';

export const NSSTA_TPAC_PROGRAMMES: CourseItem[] = [
  {
    id: 'tpac-01',
    externalId: 'TPAC-2026-01',
    title: 'Advanced Sampling Methods & Small Area Estimation (SAE)',
    provider: 'NSSTA Greater Noida (TPAC Approved)',
    type: 'NSSTA_TPAC_RESIDENTIAL',
    domain: 'STATISTICAL',
    durationHours: 60.0,
    level: 4,
    description: 'Residential executive masterclass at NSSTA campus covering empirical Bayes, Fay-Herriot models, and multi-stage survey variance under TPAC syllabus 2026.',
    syllabus: [
      { title: 'Module 1: Complex Survey Sampling Foundations', durationMins: 360 },
      { title: 'Module 2: Small Area Estimation in Official Statistics', durationMins: 480 },
      { title: 'Module 3: R Application with survey and sae Packages', durationMins: 480 },
      { title: 'Module 4: Practical Capstone with NSS Microdata', durationMins: 480 },
    ],
    isTpacApproved: true,
    tpacBatchDate: '16–27 March 2026',
    tpacSeats: 35,
    competencyGain: [
      { competencyCode: 'STAT_SAMPLING_TECHNIQUES', competencyName: 'Advanced Sampling Techniques', gainLevel: 2 },
      { competencyCode: 'STAT_SURVEY_DESIGN', competencyName: 'Survey Design & Sampling Frames', gainLevel: 1 },
      { competencyCode: 'TECH_R_LANG', competencyName: 'R for Statistical Analysis & Survey Packages', gainLevel: 1 },
    ],
  },
  {
    id: 'tpac-02',
    externalId: 'TPAC-2026-02',
    title: 'National Accounts Modernization & Supply-Use Tables (SUT)',
    provider: 'NSSTA Greater Noida (TPAC Approved)',
    type: 'NSSTA_TPAC_RESIDENTIAL',
    domain: 'STATISTICAL',
    durationHours: 45.0,
    level: 4,
    description: 'In-person residential training for NAD and state DES officials on compilation of Gross Value Added, financial sector balancing, and SNA 2025 transition.',
    syllabus: [
      { title: 'Module 1: Sequence of Accounts in SNA 2008', durationMins: 300 },
      { title: 'Module 2: SUT Compilation & Balancing Algorithms', durationMins: 420 },
      { title: 'Module 3: Deflators & Double Deflation Methodology', durationMins: 360 },
    ],
    isTpacApproved: true,
    tpacBatchDate: '06–17 April 2026',
    tpacSeats: 30,
    competencyGain: [
      { competencyCode: 'STAT_NATIONAL_ACCOUNTS', competencyName: 'National Accounts (SNA 2008)', gainLevel: 2 },
      { competencyCode: 'STAT_INDUSTRIAL_STATS', competencyName: 'Industrial Statistics (ASI & IIP)', gainLevel: 1 },
    ],
  },
  {
    id: 'tpac-03',
    externalId: 'TPAC-2026-03',
    title: 'Computer Assisted Personal Interviewing (CAPI) & Field Automation',
    provider: 'NSSTA Greater Noida (TPAC Approved)',
    type: 'NSSTA_TPAC_RESIDENTIAL',
    domain: 'TECHNICAL',
    durationHours: 35.0,
    level: 3,
    description: 'Field operations hands-on workshop on questionnaire scripting, automated validation rules, GPS geotagging, and sync architectures.',
    syllabus: [
      { title: 'Module 1: CAPI Architecture & CSPro/ODK Setup', durationMins: 300 },
      { title: 'Module 2: Scripting Logic & Dynamic Validation Rules', durationMins: 420 },
      { title: 'Module 3: Real-Time Monitoring & Anomaly Detection', durationMins: 360 },
    ],
    isTpacApproved: true,
    tpacBatchDate: '11–20 May 2026',
    tpacSeats: 40,
    competencyGain: [
      { competencyCode: 'TECH_OPEN_DATA', competencyName: 'Open Data Standards & CAPI Tools', gainLevel: 2 },
      { competencyCode: 'GOV_CYBERSECURITY', competencyName: 'Cybersecurity & Information Security', gainLevel: 1 },
    ],
  },
  {
    id: 'tpac-04',
    externalId: 'TPAC-2026-04',
    title: 'Executive Leadership & Strategic Communication for Senior Statisticians',
    provider: 'NSSTA & LBSNAA Joint Programme',
    type: 'NSSTA_TPAC_RESIDENTIAL',
    domain: 'BEHAVIOURAL',
    durationHours: 30.0,
    level: 4,
    description: 'Targeted for ISS Directors and Joint Directors: high-stakes Cabinet briefing, crisis communication during index revisions, and transformational leadership.',
    syllabus: [
      { title: 'Module 1: Evidence-Based Policy Translation', durationMins: 240 },
      { title: 'Module 2: Managing Parliamentary & Media Queries', durationMins: 240 },
      { title: 'Module 3: Leading Large-Scale Survey Field Networks', durationMins: 240 },
    ],
    isTpacApproved: true,
    tpacBatchDate: '01–06 June 2026',
    tpacSeats: 25,
    competencyGain: [
      { competencyCode: 'LEAD_COMMUNICATION', competencyName: 'Strategic Communication & Policy Briefing', gainLevel: 2 },
      { competencyCode: 'LEAD_TEAM_LEADERSHIP', competencyName: 'Leadership & Team Mentoring', gainLevel: 1 },
      { competencyCode: 'LEAD_DECISION_MAKING', competencyName: 'Evidence-based Decision Making', gainLevel: 1 },
    ],
  },
];

export function generatePersonalizedPathways(
  gaps: CompetencyScoreWithBenchmark[],
  officerRole: string = 'Senior Statistical Officer',
  division: string = 'SDRD'
): CourseItem[] {
  // Map iGOT courses to CourseItem format
  const igotCourses: CourseItem[] = MOCK_IGOT_CATALOGUE.map((c) => ({
    id: c.id,
    externalId: c.externalId,
    title: c.name,
    provider: `${c.org} (iGOT Karmayogi)`,
    type: 'IGOT_DIGITAL',
    domain: (c.category.includes('Macro') || c.category.includes('Statistical') || c.category.includes('Price')
      ? 'STATISTICAL'
      : c.category.includes('Software') || c.category.includes('Data')
      ? 'TECHNICAL'
      : c.category.includes('Governance') || c.category.includes('Law')
      ? 'DIGITAL_GOVERNANCE'
      : 'BEHAVIOURAL') as Domain,
    durationHours: c.duration,
    level: 3,
    description: c.summary,
    syllabus: [
      { title: 'Core Principles & Overview', durationMins: 90 },
      { title: 'Practical Hands-on Walkthrough', durationMins: 180 },
      { title: 'Assessment & Credential Issuance', durationMins: 45 },
    ],
    isTpacApproved: false,
    competencyGain: c.competencyMapping.map((m) => ({
      competencyCode: m.competencyId,
      competencyName: m.competencyName,
      gainLevel: 1,
    })),
  }));

  const allCourses = [...NSSTA_TPAC_PROGRAMMES, ...igotCourses];

  // Rank courses based on match with top priority gaps
  const scored = allCourses.map((course) => {
    let matchScore = 0;
    const matchingGaps: string[] = [];

    for (const gain of course.competencyGain) {
      const gapItem = gaps.find((g) => g.code === gain.competencyCode || g.competencyId === gain.competencyCode);
      if (gapItem && gapItem.gap > 0) {
        matchScore += gapItem.priorityScore * gain.gainLevel * (course.isTpacApproved ? 1.4 : 1.0);
        matchingGaps.push(`${gapItem.name} (Gap: -${gapItem.gap})`);
      }
    }

    let whyRecommended = '';
    if (matchingGaps.length > 0) {
      whyRecommended = `Addresses critical gaps in: ${matchingGaps.join(', ')}. Essential for ${officerRole} duties in ${division}.`;
    } else {
      whyRecommended = `Recommended for continuous professional development in ${course.domain.toLowerCase()} competencies.`;
    }

    return {
      ...course,
      matchScore: parseFloat(matchScore.toFixed(1)),
      whyRecommended,
    };
  });

  return scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}
