'use client';

import React from 'react';
import { ArrowRight, CheckCircle2, Award, BookOpen, Brain, Scale } from 'lucide-react';
import Link from 'next/link';

export function BridgeHeroSpan() {
  const pillars = [
    {
      num: '01',
      title: 'Diagnosis',
      sub: 'Role Benchmark vs Actual',
      icon: Scale,
      color: 'bg-chakra text-white',
      border: 'border-chakra/30',
    },
    {
      num: '02',
      title: 'Learning',
      sub: 'iGOT + NSSTA Blended',
      icon: BookOpen,
      color: 'bg-sky-600 text-white',
      border: 'border-sky-400/30',
    },
    {
      num: '03',
      title: 'Practice',
      sub: 'SQL & Sampling Labs',
      icon: Brain,
      color: 'bg-emerald-600 text-white',
      border: 'border-emerald-400/30',
    },
    {
      num: '04',
      title: 'Review',
      sub: 'Grounded AI Assessment',
      icon: Award,
      color: 'bg-saffron text-white',
      border: 'border-saffron/30',
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg border border-ink-200/90 shadow-card p-5 sm:p-7 relative overflow-hidden">
      {/* Subtle Top Architectural Bridge Beam */}
      <div className="flex items-center justify-between pb-4 border-b border-ink-100">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-ink-600">
            Competency Span Architecture · MoSPI Official Statistics Framework
          </span>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-ink-500 bg-paper-100 px-2 py-0.5 rounded border border-ink-200">
          Target Index: 92/100
        </span>
      </div>

      {/* The 4 Journey Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {pillars.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={p.num}
              className="group relative bg-paper-50 rounded-md p-4 border border-ink-200/80 hover:border-ink-400 hover:bg-white transition-all shadow-subtle"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-ink-400 group-hover:text-ink-900 transition-colors">
                  PILLAR {p.num}
                </span>
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${p.color} shadow-xs`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-serif text-base font-semibold text-ink-950 mb-1">
                {p.title}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                {p.sub}
              </p>
              {idx < 3 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white border border-ink-200 rounded-full p-0.5 text-ink-400 shadow-xs">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div className="mt-6 pt-4 border-t border-ink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ink-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Continuous synchronisation with <strong>iGOT Karmayogi</strong> digital passbook &amp; <strong>NSSTA TPAC</strong> schedules</span>
        </div>
        <Link
          href="/gaps"
          className="inline-flex items-center gap-1 font-semibold text-ink-900 hover:text-saffron transition-colors"
        >
          View Live Competency Diagnostics →
        </Link>
      </div>
    </div>
  );
}
