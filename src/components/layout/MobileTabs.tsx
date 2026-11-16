'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  LayoutDashboard,
  Target,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  FileSpreadsheet,
  Terminal,
  Bot,
  BarChart3,
  ShieldAlert,
  Palette,
} from 'lucide-react';

export function MobileTabs() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { href: '/gaps', label: t.nav.gaps, icon: Target },
    { href: '/pathways', label: t.nav.pathways, icon: GraduationCap },
    { href: '/assessment', label: t.nav.assessment, icon: Sparkles },
  ];

  const drawerItems = [
    { href: '/trainer', label: t.nav.trainer, icon: FileSpreadsheet, tag: 'Trainer' },
    { href: '/labs', label: t.nav.labs, icon: Terminal, tag: 'Interactive' },
    { href: '/assistant', label: t.nav.assistant, icon: Bot, tag: 'AI' },
    { href: '/admin', label: t.nav.admin, icon: BarChart3, tag: 'MoSPI Admin' },
    { href: '/audit', label: t.nav.audit, icon: ShieldAlert, tag: 'Compliance' },
    { href: '/design-system', label: t.nav.designSystem, icon: Palette, tag: 'Design' },
  ];

  return (
    <>
      {/* Slide-up Bottom Drawer on Mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative bg-white rounded-t-xl border-t border-ink-200 p-5 shadow-2xl z-10 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <span className="font-serif font-bold text-base text-ink-950">
                All Kaushal Setu Modules
              </span>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-paper-100 flex items-center justify-center text-ink-600 hover:text-ink-900"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex flex-col p-3 rounded-md border text-left transition-all ${
                      isActive
                        ? 'bg-ink-900 text-white border-ink-900 font-semibold'
                        : 'bg-paper-50 border-ink-200 text-ink-800 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-saffron' : 'text-ink-600'}`} />
                      <span className={`text-[10px] font-mono px-1 py-0.2 rounded ${
                        isActive ? 'bg-ink-800 text-white' : 'bg-paper-200 text-ink-700'
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                    <span className="text-xs font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar for Mobile */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xs border-t border-ink-200/90 shadow-dropdown pb-[env(safe-area-inset-bottom)]"
        aria-label="Mobile navigation"
      >
        <div className="grid grid-cols-5 h-16 items-center">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center h-full min-w-[44px] min-h-[44px] transition-colors ${
                  isActive ? 'text-saffron font-bold' : 'text-ink-600 hover:text-ink-900'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] leading-tight truncate px-1">{tab.label}</span>
              </Link>
            );
          })}

          {/* More Toggle */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className={`flex flex-col items-center justify-center h-full min-w-[44px] min-h-[44px] transition-colors ${
              drawerOpen ? 'text-saffron font-bold' : 'text-ink-600 hover:text-ink-900'
            }`}
            aria-label="Open more modules drawer"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
