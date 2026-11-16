'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { BridgeHeroSpan } from '@/components/bridge/BridgeHeroSpan';
import { BridgeMeter } from '@/components/bridge/BridgeMeter';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Target,
  GraduationCap,
  Award,
  Terminal,
  FileSpreadsheet,
  BarChart3,
  Bot,
  Scale,
} from 'lucide-react';

export default function HomePage() {
  const stats = [
    { label: 'Statistical Cadre Covered', value: '150+', sub: 'ISS & SSS Officers' },
    { label: 'MoSPI Divisions Mapped', value: '8', sub: 'NAD, SDRD, FOD, DIID, etc.' },
    { label: 'Competency Framework', value: '33', sub: 'Across 4 Specialized Domains' },
    { label: 'Blended Course Catalogue', value: '75+', sub: 'iGOT Karmayogi + NSSTA TPAC' },
  ];

  const highlights = [
    {
      title: 'Auto-Built Competency Profiles',
      desc: 'Profiles derived dynamically from designation, division posting, years of experience, and historical training records.',
      icon: Target,
      tag: 'FRAC Framework',
      color: 'bg-chakra text-white',
    },
    {
      title: 'Explainable AI Skill Gaps',
      desc: 'Mathematical gap scoring between current mastery and role target benchmarks, with plain-language operational impact reasons.',
      icon: Scale,
      tag: 'Transparent Logic',
      color: 'bg-coral text-white',
    },
    {
      title: 'Unified Pathway Recommender',
      desc: 'Seamlessly merges self-paced digital courses on iGOT Karmayogi with in-person residential workshops at NSSTA Greater Noida.',
      icon: GraduationCap,
      tag: 'iGOT + TPAC',
      color: 'bg-sky-600 text-white',
    },
    {
      title: 'Intelligent Assessment Engine',
      desc: 'Trainers upload survey manuals, PDFs or transcripts; the engine extracts, chunks, and synthesizes Bloom-stratified MCQs with HITL review.',
      icon: FileSpreadsheet,
      tag: 'Trainer Studio',
      color: 'bg-saffron text-white',
    },
    {
      title: 'Interactive Virtual Labs',
      desc: 'Practice SQL queries directly on synthetic NSS microdata and experiment with live Monte-Carlo sampling error simulations.',
      icon: Terminal,
      tag: 'In-Browser Labs',
      color: 'bg-emerald-600 text-white',
    },
    {
      title: 'Institutional Capacity Analytics',
      desc: 'Division × Domain heatmaps, pre/post training score deltas, and predictive capacity forecasting for MoSPI leadership.',
      icon: BarChart3,
      tag: 'MoSPI Admin',
      color: 'bg-ink-900 text-white',
    },
  ];

  return (
    <AppShell hideSidebar>
      <div className="space-y-12">
        {/* Top Hero Section */}
        <section className="relative pt-4 sm:pt-8 pb-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 space-y-5 text-left min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron-50 border border-saffron-200 text-saffron-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-saffron shrink-0" />
                <span>Smart India Hackathon 2026 · Problem Statement ID: SIH26101</span>
              </div>

              <h1 className="fluid-h1 text-ink-950 font-serif font-bold leading-tight tracking-tight">
                Kaushal Setu <span className="text-saffron font-devanagari font-normal">(कौशल सेतु)</span>
                <br />
                <span className="text-chakra text-[0.85em]">AI Skill Intelligence</span> for India&apos;s Official Statistical System.
              </h1>

              <p className="fluid-body text-ink-700 leading-relaxed max-w-2xl">
                A capability intelligence platform built for the <strong>Ministry of Statistics and Programme Implementation (MoSPI)</strong>. Identifies competency gaps, personalises learning across <strong>iGOT Karmayogi</strong> and <strong>NSSTA TPAC</strong> programmes, and empowers trainers to generate grounded assessments from official manuals.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-sm rounded-md shadow-xs transition-colors inline-flex items-center gap-2"
                >
                  <span>Launch Official Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gaps"
                  className="px-5 py-2.5 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-sm rounded-md shadow-xs transition-colors inline-flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-saffron" />
                  <span>Explore Skill-Gap Matrix</span>
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2.5 bg-paper-100 hover:bg-paper-200 text-ink-900 border border-ink-200 font-semibold text-sm rounded-md transition-colors inline-flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-chakra" />
                  <span>Parichay SSO Gateway</span>
                </Link>
              </div>

              {/* Compliance Trust Note */}
              <div className="flex items-center gap-4 text-xs text-ink-500 pt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  CBC FRAC Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  DPDP Act 2023 Audited
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Zero Fabrication Rule
                </span>
              </div>
            </div>

            {/* Right Interactive Bridge Card */}
            <div className="w-full lg:w-[460px] shrink-0">
              <div className="gov-card p-6 space-y-4 relative overflow-hidden bg-white">
                <div className="flex items-center justify-between pb-3 border-b border-ink-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-ink-900 uppercase">
                      Officer Capability Profile
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-saffron-50 text-saffron-800 border border-saffron-200 font-semibold">
                    Sachin Gosain (SSS / DIID)
                  </span>
                </div>

                <div className="text-xs text-ink-600">
                  Target readiness benchmark for <strong>Senior Statistical Officer</strong> in <strong>DIID</strong>:
                </div>

                {/* Sample Live Bridge Meters */}
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] font-semibold text-ink-900 mb-1 flex justify-between">
                      <span>Survey Design &amp; Sampling Frames</span>
                      <span className="text-coral-600 font-mono font-bold">-2 Span</span>
                    </div>
                    <BridgeMeter currentLevel={2} targetLevel={4} />
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-ink-900 mb-1 flex justify-between">
                      <span>National Accounts (SNA 2008)</span>
                      <span className="text-coral-600 font-mono font-bold">-1 Span</span>
                    </div>
                    <BridgeMeter currentLevel={3} targetLevel={4} />
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-ink-900 mb-1 flex justify-between">
                      <span>Python for Survey Microdata</span>
                      <span className="text-emerald-700 font-mono font-bold">✓ Met (L4)</span>
                    </div>
                    <BridgeMeter currentLevel={4} targetLevel={4} />
                  </div>
                </div>

                <Link
                  href="/gaps"
                  className="block text-center text-xs font-semibold text-saffron hover:text-saffron-700 pt-2 transition-colors"
                >
                  View all 33 competencies and priority rankings →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Metric Ticker */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="gov-card p-4 sm:p-5 text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-ink-950 tracking-tight">
                {s.value}
              </div>
              <div className="text-xs font-semibold text-ink-800 mt-1">
                {s.label}
              </div>
              <div className="text-[11px] text-ink-500 mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </section>

        {/* Architectural Journey Bridge Hero */}
        <section className="space-y-3">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-saffron font-bold">
              The 4-Stage Capacity Building Lifecycle
            </span>
            <h2 className="fluid-h2 text-ink-950 font-serif font-bold">
              From Competency Insights to Public Service Impact
            </h2>
          </div>
          <BridgeHeroSpan />
        </section>

        {/* Feature Highlights Grid */}
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-ink-200 pb-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-chakra font-bold">
                End-to-End Capabilities
              </span>
              <h2 className="fluid-h2 text-ink-950 font-serif font-bold">
                Solving the Core MoSPI Problem Statement
              </h2>
            </div>
            <span className="text-xs font-mono text-ink-500">
              6 Integrated Modules · 1 Unified Database
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="gov-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${f.color} shadow-xs`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper-100 text-ink-700 border border-ink-200 font-semibold">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-ink-950">
                      {f.title}
                    </h3>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Role Access Callouts */}
        <section className="gov-card p-6 sm:p-8 bg-paper-50 border-ink-200/90 space-y-5">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-saffron font-bold">
              Role-Based Access Control (RBAC)
            </span>
            <h2 className="fluid-h2 text-ink-950 font-serif font-bold">
              Three Personas. One Seamless Ecosystem.
            </h2>
            <p className="text-xs text-ink-600">
              Select any persona to immediately test their dedicated journey:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <Link
              href="/dashboard"
              className="gov-card p-5 bg-white hover:border-chakra transition-all space-y-2 text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-chakra uppercase">Persona 1</span>
                <span className="w-2 h-2 rounded-full bg-chakra" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 group-hover:text-chakra transition-colors">
                Statistical Official (Learner)
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Review personal competency gaps, enroll in recommended iGOT/TPAC courses, complete virtual labs, and attempt quizzes.
              </p>
              <span className="text-xs font-semibold text-chakra inline-flex items-center gap-1 pt-1">
                Enter as Learner →
              </span>
            </Link>

            <Link
              href="/trainer"
              className="gov-card p-5 bg-white hover:border-saffron transition-all space-y-2 text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-saffron uppercase">Persona 2</span>
                <span className="w-2 h-2 rounded-full bg-saffron" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 group-hover:text-saffron-700 transition-colors">
                NSSTA Faculty (Trainer)
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Upload survey manuals or video transcripts, generate AI MCQs, review &amp; edit questions in Trainer Studio, and publish to cohorts.
              </p>
              <span className="text-xs font-semibold text-saffron inline-flex items-center gap-1 pt-1">
                Enter Trainer Studio →
              </span>
            </Link>

            <Link
              href="/admin"
              className="gov-card p-5 bg-white hover:border-ink-900 transition-all space-y-2 text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-ink-900 uppercase">Persona 3</span>
                <span className="w-2 h-2 rounded-full bg-ink-900" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink-950 group-hover:text-ink-700 transition-colors">
                DG Statistics (Admin)
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed">
                Inspect organizational competency heatmaps across all 8 MoSPI divisions, evaluate pre/post training deltas, and export reports.
              </p>
              <span className="text-xs font-semibold text-ink-900 inline-flex items-center gap-1 pt-1">
                Enter Admin Portal →
              </span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-6 border-t border-ink-200 text-xs text-ink-500 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <div>
            Kaushal Setu (कौशल सेतु) · MoSPI DIID · Smart India Hackathon 2026
          </div>
          <div className="flex items-center gap-4">
            <Link href="/audit" className="hover:text-ink-900 transition-colors">Audit Log</Link>
            <Link href="/design-system" className="hover:text-ink-900 transition-colors">Design System</Link>
            <span className="text-ink-300">|</span>
            <span>Synthetic Demonstration Data</span>
          </div>
        </footer>
      </div>
    </AppShell>
  );
}
