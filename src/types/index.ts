export type Domain = 'STATISTICAL' | 'TECHNICAL' | 'DIGITAL_GOVERNANCE' | 'BEHAVIOURAL';

export type Cadre = 'ISS' | 'SSS' | 'STATE_DES';

export type Division = 'NAD' | 'SDRD' | 'FOD' | 'DPD' | 'ESD' | 'SSD' | 'PRICE' | 'DIID';

export type Role = 'LEARNER' | 'TRAINER' | 'ADMIN';

export type BloomLevel = 'REMEMBER' | 'UNDERSTAND' | 'APPLY' | 'ANALYZE' | 'EVALUATE' | 'CREATE';

export type CourseType = 'IGOT_DIGITAL' | 'NSSTA_TPAC_RESIDENTIAL' | 'VIRTUAL_LAB';

export type QuizStatus = 'DRAFT' | 'REVIEWED' | 'PUBLISHED' | 'ARCHIVED';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  designation: string;
  cadre: Cadre;
  division: Division;
  role: Role;
  experienceYears: number;
  qualification: string;
  avatar?: string;
  learningHours: number;
  streakDays: number;
}

export interface CompetencyItem {
  id: string;
  code: string;
  name: string;
  domain: Domain;
  description: string;
  maxLevel: number;
}

export interface CompetencyScoreWithBenchmark {
  competencyId: string;
  code: string;
  name: string;
  domain: Domain;
  description: string;
  currentLevel: number; // 1 to 5
  targetLevel: number;  // 1 to 5
  gap: number;          // targetLevel - currentLevel (min 0)
  weight: number;
  priorityScore: number;
  confidence: number;
  lastAssessedAt: string;
  assessedVia: string;
  explanation: string;
}

export interface DomainSummary {
  domain: Domain;
  label: string;
  totalCompetencies: number;
  averageCurrent: number;
  averageTarget: number;
  totalGap: number;
  color: string;
  accentBg: string;
  borderColor: string;
}

export interface CourseItem {
  id: string;
  externalId: string;
  title: string;
  provider: string; // 'iGOT Karmayogi' | 'NSSTA Greater Noida'
  type: CourseType;
  domain: Domain;
  durationHours: number;
  level: number;
  description: string;
  syllabus: { title: string; durationMins: number }[];
  isTpacApproved: boolean;
  tpacBatchDate?: string;
  tpacSeats?: number;
  competencyGain: { competencyCode: string; competencyName: string; gainLevel: number }[];
  matchScore?: number;
  whyRecommended?: string;
}

export interface MCQQuestion {
  id: string;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  bloomLevel: BloomLevel;
  sourceChunkRef?: string;
  sourceSnippet?: string;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  domain: Domain;
  division?: Division;
  status: QuizStatus;
  targetCohort?: string;
  questions: MCQQuestion[];
  createdById: string;
  createdAt: string;
}
