'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { MOCK_IGOT_CATALOGUE } from '@/lib/igot/MockIgotClient';
import { NSSTA_TPAC_PROGRAMMES } from '@/lib/recommender';
import {
  GraduationCap,
  Calendar,
  Clock,
  CheckCircle2,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  FileText,
  Play,
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;

  // Search course in iGOT or TPAC
  const tpacCourse = NSSTA_TPAC_PROGRAMMES.find((c) => c.id === courseId || c.externalId === courseId);
  const igotCourse = MOCK_IGOT_CATALOGUE.find((c) => c.id === courseId || c.externalId === courseId);

  const course = tpacCourse || {
    id: igotCourse?.id || 'igot-c01',
    externalId: igotCourse?.externalId || 'do_213948501',
    title: igotCourse?.name || 'Survey Sampling Foundations & Field Verification',
    provider: `${igotCourse?.org || 'NSSTA / MoSPI'} (iGOT Karmayogi)`,
    type: 'IGOT_DIGITAL' as const,
    domain: 'STATISTICAL' as const,
    durationHours: igotCourse?.duration || 14.5,
    level: 3,
    description: igotCourse?.summary || 'Comprehensive primer on stratified sampling designs in official statistics.',
    syllabus: [
      { title: 'Unit 1: Sampling Frame Construction & Non-Sampling Error Controls', durationMins: 180 },
      { title: 'Unit 2: Probability Proportional to Size (PPS) Implementation', durationMins: 240 },
      { title: 'Unit 3: Replicate Weight Calculation & Domain Variance Estimation', durationMins: 300 },
      { title: 'Unit 4: Hands-on Practical with Synthetic NSS Microdata', durationMins: 150 },
    ],
    isTpacApproved: false,
    tpacBatchDate: undefined,
    tpacSeats: undefined,
    competencyGain: [
      { competencyCode: 'STAT_SURVEY_DESIGN', competencyName: 'Survey Design & Sampling Frames', gainLevel: 1 },
      { competencyCode: 'STAT_SAMPLING_TECHNIQUES', competencyName: 'Advanced Sampling Techniques', gainLevel: 1 },
    ],
  };

  const [progress, setProgress] = useState(0);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSimulateProgress = () => {
    if (!enrolled) {
      setEnrolled(true);
      setProgress(35);
      return;
    }
    if (progress < 100) {
      const next = Math.min(100, progress + 35);
      setProgress(next);
      if (next >= 100) setCompleted(true);
    }
  };

  return (
    <AppShell currentRole="LEARNER">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-ink-500">
          <Link href="/pathways" className="hover:text-ink-900 transition-colors">Pathways</Link>
          <span>/</span>
          <span className="text-ink-900 font-semibold">{course.title}</span>
        </div>

        {/* Hero Card */}
        <div className="gov-card p-6 sm:p-8 bg-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded inline-block ${
                course.isTpacApproved
                  ? 'bg-chakra text-white shadow-xs'
                  : 'bg-saffron-100 text-saffron-800 border border-saffron-200'
              }`}
            >
              {course.isTpacApproved ? 'NSSTA TPAC Approved Masterclass' : 'iGOT Karmayogi Digital'}
            </span>

            <div className="flex items-center gap-3 text-xs font-mono text-ink-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {course.durationHours} Hours Total
              </span>
              <span>•</span>
              <span>Target Level: L{course.level}</span>
            </div>
          </div>

          <div>
            <h1 className="font-serif font-bold text-2xl text-ink-950">
              {course.title}
            </h1>
            <div className="text-xs font-mono text-ink-500 mt-1 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-ink-400" />
              <span>Provider: {course.provider}</span>
              <span>(External ID: {course.externalId})</span>
            </div>
            <p className="text-xs text-ink-700 leading-relaxed mt-3">
              {course.description}
            </p>
          </div>

          {/* TPAC Calendar Dates */}
          {course.isTpacApproved && course.tpacBatchDate && (
            <div className="p-4 bg-chakra-50 border border-chakra-200 rounded-md text-xs text-chakra-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-chakra" />
                <div>
                  <div className="font-bold">Next Residential Batch: {course.tpacBatchDate}</div>
                  <div className="text-[11px] text-chakra-800">Venue: NSSTA Campus, Knowledge Park-II, Greater Noida</div>
                </div>
              </div>
              <span className="text-xs font-mono bg-white text-chakra px-3 py-1 rounded border border-chakra-200 font-bold self-start sm:self-auto">
                {course.tpacSeats} Seats Available
              </span>
            </div>
          )}

          {/* Competency Gain Callout */}
          <div className="p-4 bg-paper-50 rounded-md border border-ink-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-ink-500 font-bold">
              Target Competencies Credited Upon Completion:
            </span>
            <div className="flex flex-wrap gap-2">
              {course.competencyGain.map((g) => (
                <span
                  key={g.competencyCode}
                  className="px-2.5 py-1 rounded-md bg-white border border-ink-200 text-xs font-medium text-ink-900 flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{g.competencyName} (+{g.gainLevel} Level)</span>
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Enrollment / Progress Simulator */}
          <div className="pt-2 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2 space-y-1">
              <div className="flex justify-between text-xs font-mono text-ink-600">
                <span>Learning Progress:</span>
                <span className="font-bold text-ink-950">{progress}%</span>
              </div>
              <div className="w-full bg-paper-200 h-2.5 rounded-full overflow-hidden border border-ink-200">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {!completed ? (
                <button
                  type="button"
                  onClick={handleSimulateProgress}
                  className="w-full sm:w-auto px-5 py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{enrolled ? 'Simulate Progress (+35%)' : 'Enroll & Begin Module'}</span>
                </button>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-emerald-100 text-emerald-900 font-bold text-xs border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>W3C Credential Synced to Passbook!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Syllabus Outline */}
        <div className="gov-card p-6 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-ink-100">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-chakra" />
              <h2 className="font-serif font-bold text-base text-ink-950">
                Course Curriculum &amp; Modules ({course.syllabus.length} Units)
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-500">
              Verified by TPAC Syllabus Committee
            </span>
          </div>

          <div className="space-y-3">
            {course.syllabus.map((unit, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-md border border-ink-200 bg-paper-50 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-ink-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-ink-950">{unit.title}</span>
                </div>
                <span className="font-mono text-ink-500 text-[11px] shrink-0">
                  {Math.round(unit.durationMins / 60)} hrs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
