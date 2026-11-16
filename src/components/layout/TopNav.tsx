'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Bell, ShieldCheck, UserCircle2, Sparkles, Building2 } from 'lucide-react';

interface TopNavProps {
  onToggleSidebar?: () => void;
  currentRole?: string;
}

export function TopNav({ onToggleSidebar, currentRole = 'LEARNER' }: TopNavProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-xs border-b border-ink-200/90 shadow-subtle">
      {/* Top Ministry Ribbon */}
      <div className="bg-ink-950 text-paper-200 text-[11px] px-4 py-1 flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 truncate">
          <Building2 className="w-3.5 h-3.5 text-saffron shrink-0" />
          <span className="truncate">GOVERNMENT OF INDIA · MoSPI · DIID · SMART INDIA HACKATHON 2026 (SIH26101)</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-ink-300">DEMO ENVIRONMENT</span>
          <span className="px-1.5 py-0.2 bg-saffron text-ink-950 font-bold rounded text-[10px]">
            SYNTHETIC DATA
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Custom Bridge Brand Mark */}
            <div className="w-9 h-9 rounded-md bg-ink-900 border border-ink-700 flex items-center justify-center text-white shadow-xs group-hover:bg-saffron group-hover:border-saffron transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 20h18" />
                <path d="M6 20V8" />
                <path d="M18 20V8" />
                <path d="M6 10c6-6 6-6 12 0" />
                <path d="M10 20v-5" />
                <path d="M14 20v-5" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-lg text-ink-950 tracking-tight leading-none">
                  {t.appTitle}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  v2.0
                </span>
              </div>
              <span className="text-[10px] text-ink-500 truncate max-w-[190px] sm:max-w-xs leading-tight">
                Skill Intelligence for Official Statistics
              </span>
            </div>
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <LanguageSwitcher />

          {/* Role Pill Switcher */}
          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1.5 rounded-md bg-paper-100 hover:bg-paper-200 border border-ink-200 text-ink-800 transition-colors"
            title="Switch User Role or Sign in with Parichay SSO"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-chakra" />
            <span>Role: <strong>{currentRole}</strong></span>
          </Link>

          {/* Quick Profile / Sign-in */}
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-ink-900 hover:bg-ink-800 text-white shadow-xs transition-colors"
            aria-label="User Profile and Parichay SSO"
          >
            <UserCircle2 className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
