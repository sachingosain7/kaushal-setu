'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import {
  User,
  Building2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Layers,
  ShieldCheck,
} from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Sachin Gosain');
  const [cadre, setCadre] = useState('SSS');
  const [designation, setDesignation] = useState('Senior Statistical Officer (SSO)');
  const [division, setDivision] = useState('DIID');
  const [experience, setExperience] = useState('4');
  const [qualification, setQualification] = useState('M.Sc. Mathematical Statistics');

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <AppShell currentRole="LEARNER" hideSidebar>
      <div className="max-w-2xl mx-auto py-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1 pb-4 border-b border-ink-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-100 text-xs font-mono text-ink-700">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span>FRAC Competency Profile Generator</span>
          </div>
          <h1 className="font-serif font-bold text-2xl text-ink-950">
            Setup Official Statistical Profile
          </h1>
          <p className="text-xs text-ink-600">
            Under Mission Karmayogi, competency benchmarks are tailored directly to your administrative cadre, posting division, and service tenure.
          </p>
        </div>

        {/* Stepper Wizard Form */}
        <div className="gov-card p-6 sm:p-8 bg-white space-y-5">
          <form onSubmit={handleComplete} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Full Name of Official
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white font-medium text-ink-900 focus:outline-none focus:border-saffron"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Statistical Cadre
                </label>
                <select
                  value={cadre}
                  onChange={(e) => setCadre(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron"
                >
                  <option value="SSS">Subordinate Statistical Service (SSS - Group B)</option>
                  <option value="ISS">Indian Statistical Service (ISS - Group A)</option>
                  <option value="STATE_DES">State Directorate of Economics &amp; Statistics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Designation / Post
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white font-medium text-ink-900 focus:outline-none focus:border-saffron"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Current MoSPI Division
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron"
                >
                  <option value="DIID">Data Informatics &amp; Innovation Division (DIID)</option>
                  <option value="NAD">National Accounts Division (NAD)</option>
                  <option value="SDRD">Survey Design and Research Division (SDRD)</option>
                  <option value="FOD">Field Operations Division (FOD)</option>
                  <option value="DPD">Data Processing Division (DPD)</option>
                  <option value="ESD">Economic Statistics Division (ESD)</option>
                  <option value="PRICE">Price Statistics Division</option>
                  <option value="SSD">Social Statistics Division (SSD)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Years in Service
                </label>
                <input
                  type="number"
                  min="0"
                  max="40"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Highest Statistical Qualification
                </label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 font-medium"
                  required
                />
              </div>
            </div>

            {/* Target Benchmark Generation Preview */}
            <div className="p-4 bg-paper-50 rounded-md border border-ink-200 space-y-2 pt-3">
              <span className="text-[11px] font-mono uppercase text-ink-500 font-bold">
                Auto-Generated FRAC Target Benchmarks Preview:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-ink-700">
                <div className="p-2 bg-white rounded border border-ink-200">
                  Statistical Domain: <strong>Level 4 Target</strong>
                </div>
                <div className="p-2 bg-white rounded border border-ink-200">
                  Technical Domain: <strong>Level 4 Target</strong>
                </div>
                <div className="p-2 bg-white rounded border border-ink-200">
                  Digital Governance: <strong>Level 3 Target</strong>
                </div>
                <div className="p-2 bg-white rounded border border-ink-200">
                  Behavioural: <strong>Level 3 Target</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Save Profile &amp; Generate Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
