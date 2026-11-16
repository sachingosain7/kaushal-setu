'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { BridgeMeter } from '@/components/bridge/BridgeMeter';
import { calculateSkillGaps, computeDomainSummaries, computeReadinessIndex } from '@/lib/competencyEngine';
import { generatePersonalizedPathways } from '@/lib/recommender';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Info,
} from 'lucide-react';

export default function DashboardPage() {
  // Demo Officer Profile (Sachin Gosain, SSS / DIID)
  const officer = {
    name: 'Sachin Gosain',
    designation: 'Senior Statistical Officer (SSO)',
    cadre: 'SSS (Subordinate Statistical Service)',
    division: 'Data Informatics & Innovation Division (DIID)',
    learningHours: 38.5,
    streakDays: 6,
    badgesCount: 5,
    qualification: 'M.Sc. Mathematical Statistics',
  };

  // Sample assessment scores
  const sampleScores = [
    { competencyId: 'stat-01', currentLevel: 2, confidence: 0.85 },
    { competencyId: 'stat-02', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'stat-03', currentLevel: 3, confidence: 0.90 },
    { competencyId: 'stat-04', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'tech-01', currentLevel: 4, confidence: 0.95 },
    { competencyId: 'tech-03', currentLevel: 3, confidence: 0.90 },
    { competencyId: 'gov-01', currentLevel: 3, confidence: 0.85 },
    { competencyId: 'gov-02', currentLevel: 2, confidence: 0.75 },
    { competencyId: 'lead-01', currentLevel: 2, confidence: 0.80 },
  ];

  // Role Target Benchmarks for Senior Statistical Officer in DIID
  const sampleBenchmarks = [
    { competencyId: 'stat-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'stat-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'stat-03', targetLevel: 4, weight: 1.3 },
    { competencyId: 'stat-04', targetLevel: 3, weight: 1.2 },
    { competencyId: 'tech-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'tech-03', targetLevel: 4, weight: 1.4 },
    { competencyId: 'gov-01', targetLevel: 4, weight: 1.2 },
    { competencyId: 'gov-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'lead-01', targetLevel: 3, weight: 1.1 },
  ];

  const gaps = calculateSkillGaps(sampleScores, sampleBenchmarks, 'SSS', 'DIID');
  const domainSummaries = computeDomainSummaries(gaps);
  const readinessIndex = computeReadinessIndex(gaps);
  const topGaps = gaps.filter((g) => g.gap > 0).slice(0, 4);
  const pathways = generatePersonalizedPathways(gaps, officer.designation, 'DIID').slice(0, 3);

  const [activeModalGap, setActiveModalGap] = useState<typeof gaps[0] | null>(null);

  return (
    <AppShell currentRole="LEARNER">
      <div className="space-y-6">
        {/* Officer Profile Header Banner */}
        <div className="gov-card p-5 sm:p-6 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-12 h-12 rounded-lg bg-chakra text-white font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-xs">
              SG
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl text-ink-950 truncate">
                  {officer.name}
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Active Learner
                </span>
              </div>
              <p className="text-xs text-ink-600 truncate mt-0.5">
                {officer.designation} · {officer.division}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-ink-500 font-mono mt-1">
                <span>Cadre: {officer.cadre}</span>
                <span>•</span>
                <span>Qual: {officer.qualification}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-ink-100">
            <div className="gov-card px-3 py-2 text-center bg-paper-50 min-w-[80px]">
              <div className="flex items-center justify-center gap-1 text-saffron">
                <Flame className="w-4 h-4 fill-saffron" />
                <span className="font-mono font-bold text-sm text-ink-950">{officer.streakDays}</span>
              </div>
              <span className="text-[10px] text-ink-500 uppercase font-mono">Day Streak</span>
            </div>

            <div className="gov-card px-3 py-2 text-center bg-paper-50 min-w-[80px]">
              <div className="flex items-center justify-center gap-1 text-chakra">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold text-sm text-ink-950">{officer.learningHours}h</span>
              </div>
              <span className="text-[10px] text-ink-500 uppercase font-mono">Hours</span>
            </div>

            <div className="gov-card px-3 py-2 text-center bg-paper-50 min-w-[80px]">
              <div className="flex items-center justify-center gap-1 text-emerald-600">
                <Award className="w-4 h-4" />
                <span className="font-mono font-bold text-sm text-ink-950">{officer.badgesCount}</span>
              </div>
              <span className="text-[10px] text-ink-500 uppercase font-mono">Badges</span>
            </div>
          </div>
        </div>

        {/* Readiness Index & Domain Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Readiness Gauge Card */}
          <div className="gov-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <span className="text-xs font-mono font-bold text-ink-700 uppercase tracking-wider">
                Capability Readiness Index
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* SVG Radial Gauge */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#E2DDD5" strokeWidth="10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#0F8B6D"
                    strokeWidth="10"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * readinessIndex) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-mono font-bold text-ink-950">{readinessIndex}%</span>
                  <span className="text-[10px] text-ink-500 uppercase font-mono">Overall</span>
                </div>
              </div>
              <div className="text-xs text-ink-600 text-center mt-3">
                Current mastery vs target benchmarks for <strong>Senior Statistical Officer</strong>.
              </div>
            </div>

            <Link
              href="/gaps"
              className="block w-full py-2 bg-paper-100 hover:bg-paper-200 text-ink-900 border border-ink-200 text-center font-semibold text-xs rounded-md transition-colors"
            >
              Open Full 33-Skill Radar Matrix →
            </Link>
          </div>

          {/* 4 Domain Averages */}
          <div className="lg:col-span-2 gov-card p-5 bg-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-ink-100">
              <span className="text-xs font-mono font-bold text-ink-700 uppercase tracking-wider">
                Competency Domain Breakdown
              </span>
              <span className="text-[11px] text-ink-500 font-mono">4 Specialized Domains</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {domainSummaries.map((ds) => (
                <div
                  key={ds.domain}
                  className={`p-3.5 rounded-md border ${ds.borderColor} ${ds.accentBg} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-xs text-ink-950">{ds.label}</span>
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded"
                      style={{ color: ds.color }}
                    >
                      {ds.totalGap > 0 ? `-${ds.totalGap} Points Gap` : 'Benchmarked'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-ink-700">
                      <span>Avg Mastery: L{ds.averageCurrent} / 5</span>
                      <span>Target: L{ds.averageTarget}</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-white/80 h-2 rounded-full overflow-hidden border border-ink-200">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(100, (ds.averageCurrent / ds.averageTarget) * 100)}%`,
                          backgroundColor: ds.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Priority Competency Gaps (Bridge Visualizer) */}
        <div className="gov-card p-5 sm:p-6 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ink-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-coral" />
                <h2 className="font-serif font-bold text-base text-ink-950">
                  Priority Competency Gaps for Closing
                </h2>
              </div>
              <p className="text-xs text-ink-600 mt-0.5">
                The bridge indicates the operational span between current assessed mastery and role requirement.
              </p>
            </div>
            <Link
              href="/gaps"
              className="text-xs font-semibold text-chakra hover:text-chakra-700 inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All Gaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topGaps.map((item) => (
              <div key={item.competencyId} className="p-4 rounded-md border border-ink-200/90 bg-paper-50 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-ink-950">
                      {item.name}
                    </h3>
                    <span className="text-[10px] font-mono text-ink-500 uppercase">
                      {item.domain} · Code: {item.code}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModalGap(item)}
                    className="p-1 text-ink-400 hover:text-ink-900 transition-colors"
                    title="Why is this a gap?"
                    aria-label={`Why is ${item.name} a gap?`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>

                {/* Bridge Meter Component */}
                <BridgeMeter currentLevel={item.currentLevel} targetLevel={item.targetLevel} />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] font-mono text-coral-700 font-bold">
                    Priority Score: {item.priorityScore} / 10
                  </span>
                  <Link
                    href={`/pathways?filter=${item.code}`}
                    className="text-xs font-semibold text-saffron hover:text-saffron-700 inline-flex items-center gap-1"
                  >
                    <span>Close Bridge</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Blended Learning Pathways */}
        <div className="gov-card p-5 sm:p-6 bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-ink-100">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <h2 className="font-serif font-bold text-base text-ink-950">
                  Recommended Learning Pathways (iGOT + NSSTA TPAC)
                </h2>
              </div>
              <p className="text-xs text-ink-600 mt-0.5">
                AI personalized courses selected to target your top skill deficits.
              </p>
            </div>
            <Link
              href="/pathways"
              className="text-xs font-semibold text-saffron hover:text-saffron-700"
            >
              Browse Full Catalogue →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pathways.map((course) => (
              <div
                key={course.id}
                className="p-4 rounded-md border border-ink-200 bg-paper-50 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      course.isTpacApproved
                        ? 'bg-chakra text-white'
                        : 'bg-paper-200 text-ink-800 border border-ink-300'
                    }`}>
                      {course.isTpacApproved ? 'NSSTA TPAC Residential' : 'iGOT Karmayogi'}
                    </span>
                    <span className="text-[11px] font-mono text-ink-500">
                      {course.durationHours}h
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-ink-950 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-ink-600 leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-ink-200 space-y-2">
                  <div className="text-[11px] text-ink-700 bg-white p-2 rounded border border-ink-200">
                    <strong className="text-ink-900">Why recommended:</strong> {course.whyRecommended}
                  </div>

                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full py-1.5 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View &amp; Enroll</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* "Why is this a gap?" Modal Dialog */}
      {activeModalGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-ink-200 shadow-dropdown max-w-md w-full p-6 space-y-4">
            <div className="flex items-start justify-between pb-2 border-b border-ink-100">
              <div>
                <span className="text-[10px] font-mono uppercase text-coral font-bold tracking-wider">
                  Gap Explainability Engine
                </span>
                <h3 className="font-serif font-bold text-lg text-ink-950">
                  {activeModalGap.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalGap(null)}
                className="text-ink-400 hover:text-ink-900 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-ink-700">
              <div className="p-3 bg-paper-50 rounded-md border border-ink-200 font-mono text-xs flex justify-between">
                <span>Assessed: <strong>Level {activeModalGap.currentLevel}</strong></span>
                <span>Role Target: <strong>Level {activeModalGap.targetLevel}</strong></span>
                <span className="text-coral-700 font-bold">Deficit: -{activeModalGap.gap}</span>
              </div>

              <div>
                <strong className="text-ink-900 block mb-1">Operational Rationale:</strong>
                <p className="leading-relaxed bg-paper-50 p-3 rounded border border-ink-200">
                  {activeModalGap.explanation}
                </p>
              </div>

              <div>
                <strong className="text-ink-900 block mb-1">Formula &amp; Weighting:</strong>
                <p className="font-mono text-[11px] text-ink-600 bg-ink-50 p-2 rounded border border-ink-200">
                  Priority = (Gap × BenchmarkWeight × 1.5) + (5 - CurrentLevel) × 0.5 = {activeModalGap.priorityScore}/10
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModalGap(null)}
                className="px-4 py-2 bg-paper-100 hover:bg-paper-200 text-ink-800 text-xs font-semibold rounded-md transition-colors"
              >
                Close
              </button>
              <Link
                href={`/pathways?filter=${activeModalGap.code}`}
                onClick={() => setActiveModalGap(null)}
                className="px-4 py-2 bg-saffron hover:bg-saffron-600 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Find Recommended Courses
              </Link>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
