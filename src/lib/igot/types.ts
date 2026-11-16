export interface IgotCourseMetadata {
  id: string;
  externalId: string;
  name: string;
  org: string;
  category: string;
  duration: number; // in hours
  rating: number;
  enrolledCount: number;
  competencyMapping: {
    competencyId: string;
    competencyName: string;
    targetLevel: number;
  }[];
  posterImage: string;
  summary: string;
}

export interface IgotEnrollmentResponse {
  enrollmentId: string;
  courseId: string;
  userId: string;
  status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  enrolledAt: string;
}

export interface IgotPassbookEntry {
  competencyCode: string;
  competencyName: string;
  certifiedLevel: number;
  issuedAt: string;
  verifiableCredentialUrl: string;
  issuerOrg: string;
}
