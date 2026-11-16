import { IgotCourseMetadata, IgotEnrollmentResponse, IgotPassbookEntry } from './types';

export interface IgotClient {
  searchCourses(query?: string, domain?: string): Promise<IgotCourseMetadata[]>;
  getCourseDetails(courseId: string): Promise<IgotCourseMetadata | null>;
  enrollUser(userId: string, courseId: string): Promise<IgotEnrollmentResponse>;
  syncProgress(userId: string, courseId: string, progressPct: number): Promise<{ success: boolean; completed: boolean }>;
  getCompetencyPassbook(userId: string): Promise<IgotPassbookEntry[]>;
}
