'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Building2,
  Lock,
  ArrowRight,
  User,
  KeyRound,
  CheckCircle2,
  FileCheck2,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'PARICHAY' | 'PERSONA'>('PERSONA');
  const [govEmail, setGovEmail] = useState('sachin.gosain@nic.in');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('492018');

  const demoPersonas = [
    {
      id: 'user-01',
      name: 'Sachin Gosain',
      role: 'LEARNER',
      cadre: 'SSS (Subordinate Statistical Service)',
      designation: 'Senior Statistical Officer',
      division: 'Data Informatics & Innovation Division (DIID)',
      badge: 'Statistical Official',
      avatar: 'SG',
      color: 'bg-chakra text-white',
      border: 'hover:border-chakra',
      dest: '/dashboard',
    },
    {
      id: 'user-02',
      name: 'Ms. Ragini Kumari',
      role: 'TRAINER',
      cadre: 'Central Training Institute Faculty',
      designation: 'Assistant Professor & Course Director',
      division: 'NSSTA Greater Noida',
      badge: 'Training Faculty',
      avatar: 'RK',
      color: 'bg-saffron text-white',
      border: 'hover:border-saffron',
      dest: '/trainer',
    },
    {
      id: 'user-03',
      name: 'Dr. G. P. Samanta',
      role: 'ADMIN',
      cadre: 'Apex Statistical Cadre',
      designation: 'Director General (Statistics) / CSI',
      division: 'MoSPI National Statistical Office',
      badge: 'Cadre Administrator',
      avatar: 'DG',
      color: 'bg-ink-900 text-white',
      border: 'hover:border-ink-900',
      dest: '/admin',
    },
  ];

  const handlePersonaSelect = (dest: string) => {
    // Navigate to role destination
    router.push(dest);
  };

  const handleParichayLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper-100 flex flex-col justify-between p-4 sm:p-6 jaali-pattern">
      {/* Top Header */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-ink-200">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-ink-900 flex items-center justify-center text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 20h18M6 20V8M18 20V8M6 10c6-6 6-6 12 0M10 20v-5M14 20v-5" />
            </svg>
          </div>
          <span className="font-serif font-bold text-lg text-ink-950">Kaushal Setu</span>
        </Link>
        <span className="text-xs font-mono text-ink-500 bg-white px-2.5 py-1 rounded border border-ink-200">
          Jan Parichay SSO Simulator · DoPT / NIC
        </span>
      </header>

      {/* Main Login Container */}
      <main className="max-w-3xl mx-auto w-full my-auto py-8">
        <div className="gov-card p-6 sm:p-8 bg-white space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-2 border-b border-ink-100 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-paper-100 border border-ink-200 text-ink-700 text-xs font-mono font-medium">
              <Building2 className="w-3.5 h-3.5 text-saffron" />
              <span>National Single Sign-On (NSSO / Parichay Gateway)</span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950">
              Sign in to Kaushal Setu
            </h1>
            <p className="text-xs text-ink-600 max-w-md mx-auto">
              Select a pre-configured official demonstration persona for immediate access, or simulate an authentic Jan Parichay government ID authentication.
            </p>

            {/* Mode Switcher Tabs */}
            <div className="inline-flex p-1 bg-paper-100 rounded-md border border-ink-200 text-xs mt-3">
              <button
                type="button"
                onClick={() => setAuthMode('PERSONA')}
                className={`px-4 py-1.5 rounded-sm font-semibold transition-colors ${
                  authMode === 'PERSONA'
                    ? 'bg-ink-900 text-white shadow-xs'
                    : 'text-ink-600 hover:text-ink-950'
                }`}
              >
                1-Click Demo Personas
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('PARICHAY')}
                className={`px-4 py-1.5 rounded-sm font-semibold transition-colors ${
                  authMode === 'PARICHAY'
                    ? 'bg-ink-900 text-white shadow-xs'
                    : 'text-ink-600 hover:text-ink-950'
                }`}
              >
                Parichay Gov SSO Portal
              </button>
            </div>
          </div>

          {/* Tab 1: 1-Click Demo Personas */}
          {authMode === 'PERSONA' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-ink-700">
                Choose an official role to test the complete workflow:
              </div>

              <div className="space-y-3">
                {demoPersonas.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handlePersonaSelect(p.dest)}
                    className={`p-4 rounded-md border border-ink-200 bg-paper-50 hover:bg-white cursor-pointer transition-all ${p.border} shadow-subtle group`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center font-serif font-bold text-sm ${p.color} shrink-0 shadow-xs`}>
                          {p.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-ink-950 truncate">
                              {p.name}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-white border border-ink-200 text-ink-700 font-bold shrink-0">
                              {p.badge}
                            </span>
                          </div>
                          <div className="text-xs text-ink-600 truncate mt-0.5">
                            {p.designation} · {p.division}
                          </div>
                          <div className="text-[11px] text-ink-500 font-mono mt-0.5">
                            Cadre: {p.cadre}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2 text-xs font-semibold text-ink-900 group-hover:text-saffron transition-colors">
                        <span className="hidden sm:inline">Launch {p.role}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Jan Parichay Mock Gateway */}
          {authMode === 'PARICHAY' && (
            <form onSubmit={handleParichayLogin} className="space-y-4 max-w-md mx-auto">
              <div className="bg-paper-50 p-4 rounded-md border border-ink-200 text-xs text-ink-700 space-y-1">
                <div className="font-semibold text-ink-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NIC Parichay SSO Service Active</span>
                </div>
                <p className="text-[11px] text-ink-600">
                  Simulating government identity provider token exchange (`sub`, `cadre`, `mdo`).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Official Email / Gov ID (@nic.in or @gov.in)
                </label>
                <input
                  type="email"
                  value={govEmail}
                  onChange={(e) => setGovEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron font-mono"
                  required
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="w-full py-2.5 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-saffron" />
                  <span>Generate Parichay OTP</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <label className="font-semibold text-ink-900">Enter Received OTP</label>
                      <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Demo OTP: 492018
                      </span>
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron font-mono text-center tracking-widest text-base"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify &amp; Enter Kaushal Setu</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* Statutory Security Footer */}
          <div className="pt-4 border-t border-ink-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ink-500 font-mono gap-2">
            <span>Security: AES-256 JWT Signed Sessions</span>
            <span>Compliance: DPDP Act 2023 &amp; GFR 2017</span>
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="text-center text-xs text-ink-500 font-mono py-2">
        Kaushal Setu · Ministry of Statistics &amp; Programme Implementation · Smart India Hackathon 2026
      </footer>
    </div>
  );
}
