'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import {
  BarChart3,
  Download,
  Filter,
  TrendingUp,
  Building2,
  Users,
  Award,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [selectedCadre, setSelectedCadre] = useState<'ALL' | 'ISS' | 'SSS'>('ALL');
  const [exported, setExported] = useState(false);

  // 8 MoSPI Divisions x 4 Competency Domains Heatmap Data
  const heatmapData = [
    { division: 'National Accounts Division (NAD)', stat: 4.2, tech: 3.5, gov: 3.8, lead: 3.9, staff: 28, readiness: 86 },
    { division: 'Survey Design & Research (SDRD)', stat: 4.5, tech: 3.8, gov: 3.2, lead: 3.6, staff: 24, readiness: 88 },
    { division: 'Field Operations Division (FOD)', stat: 3.2, tech: 2.8, gov: 3.4, lead: 3.2, staff: 46, readiness: 68 },
    { division: 'Data Processing Division (DPD)', stat: 3.6, tech: 4.4, gov: 3.9, lead: 3.1, staff: 22, readiness: 82 },
    { division: 'Economic Statistics Division (ESD)', stat: 3.9, tech: 3.2, gov: 3.5, lead: 3.4, staff: 18, readiness: 78 },
    { division: 'Price Statistics Division', stat: 4.1, tech: 3.6, gov: 3.7, lead: 3.5, staff: 15, readiness: 84 },
    { division: 'Social Statistics Division (SSD)', stat: 3.8, tech: 3.1, gov: 3.6, lead: 3.7, staff: 14, readiness: 76 },
    { division: 'Data Informatics & Innovation (DIID)', stat: 3.7, tech: 4.6, gov: 4.2, lead: 3.8, staff: 19, readiness: 91 },
  ];

  // Pre vs Post Training Effectiveness
  const effectivenessData = [
    { programme: 'Advanced Sampling & SAE (TPAC)', pre: 52, post: 84, delta: '+32%' },
    { programme: 'National Accounts & SUT 2026', pre: 58, post: 89, delta: '+31%' },
    { programme: 'Python for Survey Microdata', pre: 44, post: 81, delta: '+37%' },
    { programme: 'DPDP Act 2023 Compliance', pre: 61, post: 93, delta: '+32%' },
  ];

  const handleExportCSV = () => {
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const getColorClass = (val: number) => {
    if (val >= 4.0) return 'bg-emerald-100 text-emerald-900 border-emerald-200';
    if (val >= 3.3) return 'bg-sky-50 text-sky-900 border-sky-200';
    return 'bg-coral-50 text-coral-900 border-coral-200 font-bold';
  };

  return (
    <AppShell currentRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-ink-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-900" />
              <span className="text-xs font-mono font-bold text-ink-700 uppercase tracking-wider">
                MoSPI Institutional Intelligence
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950 mt-1">
              Organization-Wide Competency Heatmap &amp; Forecasting
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">
              Strategic oversight across 186 officers in 8 divisions to plan Annual Capacity Building Plans (ACBP 2026-27).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{exported ? 'Report Exported (CSV)' : 'Export ACBP Report'}</span>
            </button>
          </div>
        </div>

        {/* Macro Cadre Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="gov-card p-4 bg-white">
            <span className="text-[11px] font-mono text-ink-500 uppercase">Total Statistical Personnel</span>
            <div className="text-2xl font-mono font-bold text-ink-950 mt-1">186</div>
            <span className="text-[10px] text-ink-600 font-mono">150 SSS · 36 ISS Cadre</span>
          </div>

          <div className="gov-card p-4 bg-white">
            <span className="text-[11px] font-mono text-ink-500 uppercase">National Readiness Index</span>
            <div className="text-2xl font-mono font-bold text-emerald-700 mt-1">81.4%</div>
            <span className="text-[10px] text-emerald-800 font-bold">+6.2% since Q2</span>
          </div>

          <div className="gov-card p-4 bg-white">
            <span className="text-[11px] font-mono text-ink-500 uppercase">TPAC In-Person Trainees</span>
            <div className="text-2xl font-mono font-bold text-chakra mt-1">68</div>
            <span className="text-[10px] text-ink-600 font-mono">NSSTA Greater Noida Campus</span>
          </div>

          <div className="gov-card p-4 bg-white">
            <span className="text-[11px] font-mono text-ink-500 uppercase">Critical Deficit Area</span>
            <div className="text-2xl font-mono font-bold text-coral-700 mt-1">FOD Field Staff</div>
            <span className="text-[10px] text-coral-700 font-bold">CAPI &amp; Sampling Gaps</span>
          </div>
        </div>

        {/* DIVISION X DOMAIN COMPETENCY HEATMAP */}
        <div className="gov-card p-5 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ink-100 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-chakra" />
                <h2 className="font-serif font-bold text-base text-ink-950">
                  Division × Domain Competency Matrix (Level 1–5 Scale)
                </h2>
              </div>
              <p className="text-xs text-ink-600 mt-0.5">
                Cells indicate average assessed competency level. Coral highlighting flags divisions falling below role target benchmarks.
              </p>
            </div>

            {/* Cadre Filter Buttons */}
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-ink-400">Cadre:</span>
              <button
                type="button"
                onClick={() => setSelectedCadre('ALL')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  selectedCadre === 'ALL' ? 'bg-ink-900 text-white' : 'bg-paper-100 text-ink-700'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setSelectedCadre('ISS')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  selectedCadre === 'ISS' ? 'bg-ink-900 text-white' : 'bg-paper-100 text-ink-700'
                }`}
              >
                ISS (Group A)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCadre('SSS')}
                className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                  selectedCadre === 'SSS' ? 'bg-ink-900 text-white' : 'bg-paper-100 text-ink-700'
                }`}
              >
                SSS (Group B)
              </button>
            </div>
          </div>

          {/* Responsive Heatmap Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-paper-50 border-b border-ink-200 text-ink-700 uppercase font-bold">
                <tr>
                  <th className="p-3">Division</th>
                  <th className="p-3 text-center">Statistical (10)</th>
                  <th className="p-3 text-center">Technical (12)</th>
                  <th className="p-3 text-center">Digital Gov (5)</th>
                  <th className="p-3 text-center">Behavioural (6)</th>
                  <th className="p-3 text-center">Staff</th>
                  <th className="p-3 text-right">Readiness</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {heatmapData.map((row) => (
                  <tr key={row.division} className="hover:bg-paper-50 transition-colors">
                    <td className="p-3 font-sans font-semibold text-ink-950">
                      {row.division}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded border text-[11px] ${getColorClass(row.stat)}`}>
                        L{row.stat}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded border text-[11px] ${getColorClass(row.tech)}`}>
                        L{row.tech}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded border text-[11px] ${getColorClass(row.gov)}`}>
                        L{row.gov}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded border text-[11px] ${getColorClass(row.lead)}`}>
                        L{row.lead}
                      </span>
                    </td>
                    <td className="p-3 text-center text-ink-600">
                      {row.staff}
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-bold text-ink-950">{row.readiness}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRE/POST TRAINING EFFECTIVENESS & FORECASTING MODEL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Training Effectiveness Pre vs Post */}
          <div className="gov-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-ink-100">
              <span className="text-xs font-mono font-bold text-ink-700 uppercase tracking-wider">
                Training Impact: Pre vs Post Assessment Scores
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                +33% Avg Gain
              </span>
            </div>

            <div className="space-y-3">
              {effectivenessData.map((item) => (
                <div key={item.programme} className="p-3 bg-paper-50 rounded-md border border-ink-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink-900">
                    <span>{item.programme}</span>
                    <span className="text-emerald-700 font-mono font-bold">{item.delta} Gain</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-ink-600">
                    <span>Pre-Test: {item.pre}%</span>
                    <div className="flex-1 bg-ink-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.post}%` }}
                      />
                    </div>
                    <span className="font-bold text-ink-900">Post-Test: {item.post}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Predictive Capacity Forecasting Model */}
          <div className="gov-card p-5 bg-white space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-ink-100">
              <span className="text-xs font-mono font-bold text-ink-700 uppercase tracking-wider">
                Predictive Capacity Demand Forecasting (2026–2028)
              </span>
              <Sparkles className="w-4 h-4 text-saffron" />
            </div>

            <div className="p-3.5 bg-paper-50 rounded-md border border-ink-200 text-xs text-ink-700 space-y-2">
              <div className="font-semibold text-ink-950 font-serif text-sm">
                Forecasting Model Methodology:
              </div>
              <p className="leading-relaxed text-[11px]">
                Built on a multi-variable regression model projecting upcoming official statistical initiatives:
                <br />
                $Demand_{competency} = \alpha (CadreRetirements) + \beta (DigitalSurveyExpansion) + \gamma (UN\_SNA\_Revision)$
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-md border border-coral-200 bg-coral-50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-coral-950">High Future Deficit: Small Area Estimation (SAE)</div>
                  <div className="text-[11px] text-coral-800">Driven by district-level SDG indicator disaggregation demands.</div>
                </div>
                <span className="text-xs font-mono font-bold text-coral-700 shrink-0">+48 Seats</span>
              </div>

              <div className="p-3 rounded-md border border-sky-200 bg-sky-50 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-sky-950">High Future Deficit: AI Anomaly Detection in CAPI</div>
                  <div className="text-[11px] text-sky-800">Field automated outlier detection before DPD transmission.</div>
                </div>
                <span className="text-xs font-mono font-bold text-sky-700 shrink-0">+65 Seats</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
