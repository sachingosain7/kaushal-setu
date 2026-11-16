'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { BridgeMeter } from '@/components/bridge/BridgeMeter';
import { calculateSkillGaps, computeDomainSummaries } from '@/lib/competencyEngine';
import { Domain } from '@/types';
import {
  Target,
  Filter,
  Info,
  ArrowUpDown,
  Search,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export default function SkillGapsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalGap, setActiveModalGap] = useState<any | null>(null);

  // Mock baseline scores for Sachin Gosain
  const sampleScores = [
    { competencyId: 'stat-01', currentLevel: 2, confidence: 0.85 },
    { competencyId: 'stat-02', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'stat-03', currentLevel: 3, confidence: 0.90 },
    { competencyId: 'stat-04', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'stat-05', currentLevel: 3, confidence: 0.85 },
    { competencyId: 'stat-07', currentLevel: 2, confidence: 0.75 },
    { competencyId: 'stat-09', currentLevel: 1, confidence: 0.70 },
    { competencyId: 'stat-10', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'tech-01', currentLevel: 4, confidence: 0.95 },
    { competencyId: 'tech-02', currentLevel: 2, confidence: 0.75 },
    { competencyId: 'tech-03', currentLevel: 3, confidence: 0.90 },
    { competencyId: 'tech-07', currentLevel: 1, confidence: 0.65 },
    { competencyId: 'gov-01', currentLevel: 3, confidence: 0.85 },
    { competencyId: 'gov-02', currentLevel: 2, confidence: 0.75 },
    { competencyId: 'gov-03', currentLevel: 4, confidence: 0.95 },
    { competencyId: 'lead-01', currentLevel: 2, confidence: 0.80 },
    { competencyId: 'lead-02', currentLevel: 3, confidence: 0.85 },
    { competencyId: 'lead-03', currentLevel: 2, confidence: 0.75 },
    { competencyId: 'lead-04', currentLevel: 4, confidence: 0.90 },
  ];

  const sampleBenchmarks = [
    { competencyId: 'stat-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'stat-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'stat-03', targetLevel: 4, weight: 1.3 },
    { competencyId: 'stat-04', targetLevel: 3, weight: 1.2 },
    { competencyId: 'stat-05', targetLevel: 4, weight: 1.2 },
    { competencyId: 'stat-07', targetLevel: 4, weight: 1.3 },
    { competencyId: 'stat-09', targetLevel: 3, weight: 1.1 },
    { competencyId: 'stat-10', targetLevel: 4, weight: 1.4 },
    { competencyId: 'tech-01', targetLevel: 4, weight: 1.5 },
    { competencyId: 'tech-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'tech-03', targetLevel: 4, weight: 1.4 },
    { competencyId: 'tech-07', targetLevel: 3, weight: 1.2 },
    { competencyId: 'gov-01', targetLevel: 4, weight: 1.2 },
    { competencyId: 'gov-02', targetLevel: 4, weight: 1.4 },
    { competencyId: 'gov-03', targetLevel: 4, weight: 1.0 },
    { competencyId: 'lead-01', targetLevel: 3, weight: 1.2 },
    { competencyId: 'lead-02', targetLevel: 4, weight: 1.3 },
    { competencyId: 'lead-03', targetLevel: 4, weight: 1.4 },
    { competencyId: 'lead-04', targetLevel: 4, weight: 1.5 },
  ];

  const allGaps = calculateSkillGaps(sampleScores, sampleBenchmarks, 'SSS', 'DIID');
  const summaries = computeDomainSummaries(allGaps);

  // Filter items
  const filteredGaps = allGaps.filter((item) => {
    const matchesDomain = selectedDomain === 'ALL' || item.domain === selectedDomain;
    const matchesQuery =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesQuery;
  });

  return (
    <AppShell currentRole="LEARNER">
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-ink-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-pulse" />
              <span className="text-xs font-mono font-bold text-coral uppercase tracking-wider">
                Competency Intelligence
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950 mt-1">
              Official Skill-Gap Diagnostic Matrix
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">
              Comparative analysis of current assessed mastery versus MoSPI role benchmarks for <strong>Senior Statistical Officer</strong> (DIID).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/pathways"
              className="px-4 py-2 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Recommended Pathways</span>
            </Link>
          </div>
        </div>

        {/* 4 Domain Tabs Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {summaries.map((s) => (
            <button
              key={s.domain}
              type="button"
              onClick={() => setSelectedDomain(selectedDomain === s.domain ? 'ALL' : s.domain)}
              className={`p-3 rounded-md border text-left transition-all ${
                selectedDomain === s.domain
                  ? 'border-ink-900 bg-white ring-2 ring-ink-900 shadow-card'
                  : `${s.borderColor} ${s.accentBg} hover:bg-white`
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-serif font-bold text-ink-950 truncate">{s.label}</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-white border border-ink-200">
                  {s.totalCompetencies}
                </span>
              </div>
              <div className="text-[11px] font-mono text-ink-600 flex justify-between mt-2">
                <span>Avg: L{s.averageCurrent}</span>
                <span className="font-bold text-coral-700">Gap: -{s.totalGap} pts</span>
              </div>
            </button>
          ))}
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="gov-card p-3 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search competencies or codes (e.g. STAT_SURVEY)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-md border border-ink-200 bg-paper-50 text-ink-900 focus:outline-none focus:border-ink-900 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-mono text-ink-600">
            <span>Showing: <strong>{filteredGaps.length}</strong> of {allGaps.length} competencies</span>
            {selectedDomain !== 'ALL' && (
              <button
                type="button"
                onClick={() => setSelectedDomain('ALL')}
                className="text-saffron font-bold hover:underline ml-2"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Competency Gap List / Table */}
        <div className="gov-card bg-white overflow-hidden">
          {/* Table Header for Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-ink-100 bg-paper-50 text-[11px] font-mono font-bold text-ink-600 uppercase tracking-wider">
            <div className="col-span-4">Competency Name &amp; Description</div>
            <div className="col-span-2">Domain</div>
            <div className="col-span-3 text-center">Bridge Span (Current → Target)</div>
            <div className="col-span-1 text-center">Priority</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-ink-100">
            {filteredGaps.map((item) => (
              <div
                key={item.competencyId}
                className="p-4 hover:bg-paper-50 transition-colors flex flex-col md:grid md:grid-cols-12 md:gap-4 items-start md:items-center gap-3"
              >
                {/* Column 1: Info */}
                <div className="md:col-span-4 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-sm text-ink-950 truncate">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs text-ink-600 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                  <span className="text-[10px] font-mono text-ink-400 mt-1 block">
                    CODE: {item.code}
                  </span>
                </div>

                {/* Column 2: Domain */}
                <div className="md:col-span-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper-100 text-ink-800 border border-ink-200">
                    {item.domain}
                  </span>
                </div>

                {/* Column 3: Bridge Meter */}
                <div className="md:col-span-3 w-full">
                  <BridgeMeter currentLevel={item.currentLevel} targetLevel={item.targetLevel} compact />
                </div>

                {/* Column 4: Priority */}
                <div className="md:col-span-1 w-full md:text-center">
                  <span className={`text-xs font-mono font-bold ${item.priorityScore >= 4 ? 'text-coral-700' : 'text-ink-600'}`}>
                    {item.priorityScore}
                  </span>
                </div>

                {/* Column 5: Action & Explainability */}
                <div className="md:col-span-2 w-full flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalGap(item)}
                    className="p-1.5 rounded text-ink-500 hover:text-ink-900 hover:bg-paper-100 transition-colors"
                    title="Why is this a gap?"
                    aria-label={`Explain gap for ${item.name}`}
                  >
                    <Info className="w-4 h-4 text-ink-600" />
                  </button>

                  <Link
                    href={`/pathways?filter=${item.code}`}
                    className="px-2.5 py-1 bg-ink-900 hover:bg-ink-800 text-white text-xs font-semibold rounded transition-colors inline-flex items-center gap-1"
                  >
                    <span>Bridge</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why is this a gap? Modal */}
      {activeModalGap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-ink-200 shadow-dropdown max-w-md w-full p-6 space-y-4">
            <div className="flex items-start justify-between pb-2 border-b border-ink-100">
              <div>
                <span className="text-[10px] font-mono uppercase text-coral font-bold tracking-wider">
                  Operational Gap Explainability
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
                <span>Current: <strong>Level {activeModalGap.currentLevel}</strong></span>
                <span>Role Target: <strong>Level {activeModalGap.targetLevel}</strong></span>
                <span className="text-coral-700 font-bold">Span Deficit: -{activeModalGap.gap}</span>
              </div>

              <div>
                <strong className="text-ink-900 block mb-1">Impact on MoSPI Operations:</strong>
                <p className="leading-relaxed bg-paper-50 p-3 rounded border border-ink-200">
                  {activeModalGap.explanation}
                </p>
              </div>

              <div>
                <strong className="text-ink-900 block mb-1">Scoring Methodology:</strong>
                <p className="font-mono text-[11px] text-ink-600 bg-ink-50 p-2 rounded border border-ink-200">
                  Calculated as: Gap ({activeModalGap.gap}) × Role Weight ({activeModalGap.weight}) × 1.5 + (5 - CurrentLevel) × 0.5 = {activeModalGap.priorityScore} / 10
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
                View Targeted Pathways
              </Link>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
