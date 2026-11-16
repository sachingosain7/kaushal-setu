'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { calculateSkillGaps } from '@/lib/competencyEngine';
import { generatePersonalizedPathways } from '@/lib/recommender';
import { CourseItem } from '@/types';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  Building2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function PathwaysPage() {
  const [providerFilter, setProviderFilter] = useState<'ALL' | 'IGOT' | 'TPAC'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});

  // Mock baseline scores for Sachin Gosain
  const sampleScores = [
    { competencyId: 'stat-01', currentLevel: 2 },
    { competencyId: 'stat-02', currentLevel: 2 },
    { competencyId: 'stat-03', currentLevel: 3 },
    { competencyId: 'stat-04', currentLevel: 2 },
    { competencyId: 'tech-01', currentLevel: 4 },
    { competencyId: 'tech-03', currentLevel: 3 },
  ];

  const sampleBenchmarks = [
    { competencyId: 'stat-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'stat-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'stat-03', targetLevel: 4, weight: 1.3 },
    { competencyId: 'stat-04', targetLevel: 3, weight: 1.2 },
    { competencyId: 'tech-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'tech-03', targetLevel: 4, weight: 1.4 },
  ];

  const gaps = calculateSkillGaps(sampleScores, sampleBenchmarks, 'SSS', 'DIID');
  const allPathways = generatePersonalizedPathways(gaps, 'Senior Statistical Officer', 'DIID');

  const filtered = allPathways.filter((c) => {
    const matchesProvider =
      providerFilter === 'ALL' ||
      (providerFilter === 'TPAC' && c.isTpacApproved) ||
      (providerFilter === 'IGOT' && !c.isTpacApproved);

    const matchesSearch =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesProvider && matchesSearch;
  });

  const handleEnroll = (courseId: string) => {
    setEnrolledCourses((prev) => ({ ...prev, [courseId]: true }));
  };

  return (
    <AppShell currentRole="LEARNER">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-ink-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
                Personalized Learning Architecture
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950 mt-1">
              Dual-Stream Capacity Pathways
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">
              Harmonizing self-paced <strong>iGOT Karmayogi</strong> digital modules with intensive residential <strong>NSSTA TPAC</strong> programmes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-paper-100 text-ink-700 px-3 py-1.5 rounded border border-ink-200">
              Synced with Karmayogi Bharat API Gateway
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="gov-card p-4 bg-white flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setProviderFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                providerFilter === 'ALL'
                  ? 'bg-ink-900 text-white shadow-xs'
                  : 'bg-paper-100 text-ink-700 hover:bg-paper-200 border border-ink-200'
              }`}
            >
              All Pathways ({allPathways.length})
            </button>
            <button
              type="button"
              onClick={() => setProviderFilter('TPAC')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                providerFilter === 'TPAC'
                  ? 'bg-chakra text-white shadow-xs'
                  : 'bg-chakra-50 text-chakra-700 hover:bg-chakra-100 border border-chakra-200'
              }`}
            >
              NSSTA TPAC Residential
            </button>
            <button
              type="button"
              onClick={() => setProviderFilter('IGOT')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                providerFilter === 'IGOT'
                  ? 'bg-saffron text-white shadow-xs'
                  : 'bg-saffron-50 text-saffron-700 hover:bg-saffron-100 border border-saffron-200'
              }`}
            >
              iGOT Karmayogi Digital
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pathways, tools, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-ink-200 bg-paper-50 text-ink-900 focus:outline-none focus:border-ink-900 font-mono"
            />
          </div>
        </div>

        {/* Pathways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => {
            const isEnrolled = !!enrolledCourses[course.id];
            return (
              <div
                key={course.id}
                className="gov-card p-5 bg-white flex flex-col justify-between space-y-4 hover:border-ink-400 transition-all"
              >
                <div className="space-y-3">
                  {/* Top Badge & Duration */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        course.isTpacApproved
                          ? 'bg-chakra text-white shadow-xs'
                          : 'bg-saffron-100 text-saffron-800 border border-saffron-200'
                      }`}
                    >
                      {course.isTpacApproved ? 'NSSTA TPAC Masterclass' : 'iGOT Micro-Module'}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-ink-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.durationHours} hrs</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-serif font-bold text-base text-ink-950 leading-snug">
                      {course.title}
                    </h3>
                    <div className="text-[11px] font-mono text-ink-500 mt-0.5">
                      Provider: {course.provider}
                    </div>
                    <p className="text-xs text-ink-600 leading-relaxed mt-2 line-clamp-3">
                      {course.description}
                    </p>
                  </div>

                  {/* TPAC Schedule Dates if Residential */}
                  {course.isTpacApproved && course.tpacBatchDate && (
                    <div className="p-2.5 bg-chakra-50 border border-chakra-200 rounded-md text-xs text-chakra-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-chakra" />
                        <span className="font-semibold">{course.tpacBatchDate}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-chakra-200">
                        {course.tpacSeats} Seats Left
                      </span>
                    </div>
                  )}

                  {/* AI "Why Recommended" Box */}
                  <div className="p-3 bg-paper-50 rounded-md border border-ink-200 text-xs text-ink-700 space-y-1">
                    <div className="font-semibold text-ink-900 flex items-center gap-1 text-[11px]">
                      <Sparkles className="w-3 h-3 text-saffron" />
                      <span>Why Recommended for Your Role:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {course.whyRecommended}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 border-t border-ink-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/courses/${course.id}`}
                    className="text-xs font-semibold text-ink-700 hover:text-ink-950"
                  >
                    View Syllabus →
                  </Link>

                  {isEnrolled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Enrolled &amp; Synced</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleEnroll(course.id)}
                      className="px-3.5 py-1.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors inline-flex items-center gap-1"
                    >
                      <span>Enroll in Module</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
