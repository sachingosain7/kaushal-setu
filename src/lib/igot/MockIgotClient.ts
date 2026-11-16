import { IgotClient } from './IgotClient';
import { IgotCourseMetadata, IgotEnrollmentResponse, IgotPassbookEntry } from './types';

export const MOCK_IGOT_CATALOGUE: IgotCourseMetadata[] = [
  {
    id: 'igot-c01',
    externalId: 'do_213948501',
    name: 'Survey Sampling Foundations & Field Verification',
    org: 'NSSTA / MoSPI',
    category: 'Statistical Methods',
    duration: 14.5,
    rating: 4.8,
    enrolledCount: 1420,
    competencyMapping: [
      { competencyId: 'stat-01', competencyName: 'Survey Design & Sampling Frames', targetLevel: 3 },
      { competencyId: 'stat-02', competencyName: 'Advanced Sampling Techniques', targetLevel: 3 },
    ],
    posterImage: '/courses/sampling.jpg',
    summary: 'A comprehensive primer on stratified multi-stage designs, probability proportional to size (PPS) sampling, and sampling variance computation in official surveys.',
  },
  {
    id: 'igot-c02',
    externalId: 'do_213948502',
    name: 'System of National Accounts (SNA 2008) in Practice',
    org: 'National Accounts Division (NAD)',
    category: 'Macroeconomic Statistics',
    duration: 22.0,
    rating: 4.9,
    enrolledCount: 890,
    competencyMapping: [
      { competencyId: 'stat-03', competencyName: 'National Accounts (SNA 2008)', targetLevel: 4 },
      { competencyId: 'stat-07', competencyName: 'Industrial Statistics (ASI & IIP)', targetLevel: 3 },
    ],
    posterImage: '/courses/national-accounts.jpg',
    summary: 'Master the compilation of Gross Value Added (GVA), Supply and Use Tables (SUT), input-output matrices, and base year revisions for India.',
  },
  {
    id: 'igot-c03',
    externalId: 'do_213948503',
    name: 'Python for Survey Microdata & Automated Validation',
    org: 'Data Informatics & Innovation Division (DIID)',
    category: 'Data Science & Automation',
    duration: 18.0,
    rating: 4.7,
    enrolledCount: 3120,
    competencyMapping: [
      { competencyId: 'tech-01', competencyName: 'Python for Statistical Computing', targetLevel: 3 },
      { competencyId: 'tech-03', competencyName: 'SQL & Relational Databases', targetLevel: 3 },
    ],
    posterImage: '/courses/python-stats.jpg',
    summary: 'Automate data cleaning, outlier detection, and multiplier calculations on large-scale NSS/PLFS raw data files using Pandas and NumPy.',
  },
  {
    id: 'igot-c04',
    externalId: 'do_213948504',
    name: 'Consumer Price Index (CPI) Compilation & Hedonic Quality Adjustments',
    org: 'Price Statistics Division',
    category: 'Price Indices',
    duration: 12.0,
    rating: 4.6,
    enrolledCount: 640,
    competencyMapping: [
      { competencyId: 'stat-04', competencyName: 'Price Statistics & Index Numbers', targetLevel: 4 },
    ],
    posterImage: '/courses/cpi.jpg',
    summary: 'In-depth coverage of Laspeyres and geometric Mean indices, quote substitution protocols, rent index imputation, and web-scraped price analytics.',
  },
  {
    id: 'igot-c05',
    externalId: 'do_213948505',
    name: 'Digital Personal Data Protection (DPDP) Act 2023 for Official Statisticians',
    org: 'Ministry of Electronics & IT / DoPT',
    category: 'Digital Governance & Law',
    duration: 8.5,
    rating: 4.9,
    enrolledCount: 4210,
    competencyMapping: [
      { competencyId: 'gov-02', competencyName: 'Data Privacy & DPDP Act 2023', targetLevel: 4 },
      { competencyId: 'gov-01', competencyName: 'Cybersecurity & Information Security', targetLevel: 3 },
    ],
    posterImage: '/courses/privacy.jpg',
    summary: 'Statutory compliance requirements for survey respondent confidentiality, anonymization protocols, cross-border transfers, and penalty frameworks.',
  },
  {
    id: 'igot-c06',
    externalId: 'do_213948506',
    name: 'R for Complex Survey Data: The survey Package Masterclass',
    org: 'NSSTA Greater Noida',
    category: 'Statistical Software',
    duration: 16.0,
    rating: 4.8,
    enrolledCount: 1740,
    competencyMapping: [
      { competencyId: 'tech-02', competencyName: 'R for Statistical Analysis & Survey Packages', targetLevel: 4 },
    ],
    posterImage: '/courses/r-survey.jpg',
    summary: 'Using Lumley’s survey package for post-stratification, replicate weights, linearization, and domain estimation with NSS microdata.',
  },
  {
    id: 'igot-c07',
    externalId: 'do_213948507',
    name: 'Leadership & High-Impact Field Survey Administration',
    org: 'LBSNAA / Karmayogi Bharat',
    category: 'Public Administration',
    duration: 10.0,
    rating: 4.7,
    enrolledCount: 2150,
    competencyMapping: [
      { competencyId: 'lead-01', competencyName: 'Leadership & Team Mentoring', targetLevel: 3 },
      { competencyId: 'lead-03', competencyName: 'Survey & Project Management', targetLevel: 4 },
    ],
    posterImage: '/courses/leadership.jpg',
    summary: 'Field operations leadership, crisis mitigation in remote survey districts, enumerator retention, and empathetic governance.',
  },
  {
    id: 'igot-c08',
    externalId: 'do_213948508',
    name: 'UN National Quality Assurance Framework (NQAF) Implementation',
    org: 'DIID MoSPI',
    category: 'Quality Standards',
    duration: 11.5,
    rating: 4.8,
    enrolledCount: 520,
    competencyMapping: [
      { competencyId: 'stat-10', competencyName: 'Data Quality Frameworks (NQAF)', targetLevel: 4 },
      { competencyId: 'stat-09', competencyName: 'Metadata Standards & SDMX', targetLevel: 3 },
    ],
    posterImage: '/courses/nqaf.jpg',
    summary: 'Operationalizing the 19 principles of UN NQAF across survey design, field validation, dissemination, and user trust assessment.',
  },
];

export class MockIgotClient implements IgotClient {
  private enrollments: Map<string, IgotEnrollmentResponse> = new Map();
  private passbooks: Map<string, IgotPassbookEntry[]> = new Map();

  async searchCourses(query?: string, domain?: string): Promise<IgotCourseMetadata[]> {
    let result = [...MOCK_IGOT_CATALOGUE];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      );
    }
    return result;
  }

  async getCourseDetails(courseId: string): Promise<IgotCourseMetadata | null> {
    return MOCK_IGOT_CATALOGUE.find((c) => c.id === courseId || c.externalId === courseId) || null;
  }

  async enrollUser(userId: string, courseId: string): Promise<IgotEnrollmentResponse> {
    const key = `${userId}-${courseId}`;
    if (this.enrollments.has(key)) {
      return this.enrollments.get(key)!;
    }
    const record: IgotEnrollmentResponse = {
      enrollmentId: `enr_${Math.random().toString(36).substring(2, 9)}`,
      courseId,
      userId,
      status: 'ENROLLED',
      progress: 0,
      enrolledAt: new Date().toISOString(),
    };
    this.enrollments.set(key, record);
    return record;
  }

  async syncProgress(userId: string, courseId: string, progressPct: number): Promise<{ success: boolean; completed: boolean }> {
    const key = `${userId}-${courseId}`;
    const record = this.enrollments.get(key) || {
      enrollmentId: `enr_${Math.random().toString(36).substring(2, 9)}`,
      courseId,
      userId,
      status: 'IN_PROGRESS',
      progress: progressPct,
      enrolledAt: new Date().toISOString(),
    };

    record.progress = progressPct;
    const completed = progressPct >= 100;
    if (completed) {
      record.status = 'COMPLETED';
      // Append verifiable badge to passbook
      const course = await this.getCourseDetails(courseId);
      if (course) {
        const userPassbook = this.passbooks.get(userId) || [];
        for (const mapping of course.competencyMapping) {
          userPassbook.push({
            competencyCode: mapping.competencyId,
            competencyName: mapping.competencyName,
            certifiedLevel: mapping.targetLevel,
            issuedAt: new Date().toISOString(),
            verifiableCredentialUrl: `https://igotkarmayogi.gov.in/credentials/vc_${Math.random().toString(36).substring(2, 10)}`,
            issuerOrg: course.org,
          });
        }
        this.passbooks.set(userId, userPassbook);
      }
    } else {
      record.status = 'IN_PROGRESS';
    }
    this.enrollments.set(key, record);
    return { success: true, completed };
  }

  async getCompetencyPassbook(userId: string): Promise<IgotPassbookEntry[]> {
    return this.passbooks.get(userId) || [
      {
        competencyCode: 'STAT_SURVEY_DESIGN',
        competencyName: 'Survey Design & Sampling Frames',
        certifiedLevel: 2,
        issuedAt: '2025-10-14T09:30:00Z',
        verifiableCredentialUrl: 'https://igotkarmayogi.gov.in/credentials/vc_demo89127',
        issuerOrg: 'NSSTA Greater Noida',
      },
      {
        competencyCode: 'GOV_CYBERSECURITY',
        competencyName: 'Cybersecurity & Information Security',
        certifiedLevel: 3,
        issuedAt: '2025-12-05T14:15:00Z',
        verifiableCredentialUrl: 'https://igotkarmayogi.gov.in/credentials/vc_demo44210',
        issuerOrg: 'DoPT / NIC',
      },
    ];
  }
}

export const igotClient: IgotClient = new MockIgotClient();
