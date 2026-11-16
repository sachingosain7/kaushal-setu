'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  LayoutDashboard,
  Target,
  GraduationCap,
  Sparkles,
  FileSpreadsheet,
  Terminal,
  Bot,
  BarChart3,
  ShieldAlert,
  Palette,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  currentRole?: string;
}

export function Sidebar({ collapsed = false, onToggleCollapse, currentRole = 'LEARNER' }: SidebarProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard, role: 'ALL' },
    { href: '/gaps', label: t.nav.gaps, icon: Target, role: 'ALL' },
    { href: '/pathways', label: t.nav.pathways, icon: GraduationCap, role: 'ALL' },
    { href: '/assessment', label: t.nav.assessment, icon: Sparkles, role: 'ALL' },
    { href: '/trainer', label: t.nav.trainer, icon: FileSpreadsheet, role: 'TRAINER' },
    { href: '/labs', label: t.nav.labs, icon: Terminal, role: 'ALL' },
    { href: '/assistant', label: t.nav.assistant, icon: Bot, role: 'ALL' },
    { href: '/admin', label: t.nav.admin, icon: BarChart3, role: 'ADMIN' },
    { href: '/audit', label: t.nav.audit, icon: ShieldAlert, role: 'ADMIN' },
    { href: '/design-system', label: t.nav.designSystem, icon: Palette, role: 'ALL' },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-ink-200/90 transition-all duration-300 z-20 shrink-0 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
      style={{ minHeight: 'calc(100vh - 4rem)' }}
    >
      {/* Sidebar Header & Collapse Toggle */}
      <div className="p-3 border-b border-ink-100 flex items-center justify-between">
        {!collapsed && (
          <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-ink-400">
            SYSTEM MODULES
          </span>
        )}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded text-ink-500 hover:text-ink-900 hover:bg-paper-100 transition-colors ml-auto"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          const isTrainerSpecial = item.role === 'TRAINER';
          const isAdminSpecial = item.role === 'ADMIN';

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-all ${
                isActive
                  ? 'bg-ink-900 text-white font-semibold shadow-xs'
                  : 'text-ink-700 hover:bg-paper-100 hover:text-ink-950'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-saffron' : 'text-ink-500 group-hover:text-ink-900'
                }`}
              />
              {!collapsed && (
                <span className="truncate flex-1 flex items-center justify-between">
                  <span>{item.label}</span>
                  {isTrainerSpecial && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-saffron-100 text-saffron-700 rounded font-bold">
                      TRN
                    </span>
                  )}
                  {isAdminSpecial && (
                    <span className="text-[9px] font-mono px-1 py-0.2 bg-chakra-100 text-chakra-700 rounded font-bold">
                      ADM
                    </span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* External Integration Links */}
      {!collapsed && (
        <div className="p-3 border-t border-ink-100 bg-paper-50 m-2 rounded-md text-[11px] space-y-2">
          <div className="font-semibold text-ink-900 flex items-center justify-between">
            <span>External Ecosystem</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <a
            href="https://igotkarmayogi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-ink-600 hover:text-ink-900 transition-colors"
          >
            <span>iGOT Karmayogi</span>
            <ExternalLink className="w-3 h-3 text-ink-400" />
          </a>
          <a
            href="https://nssta.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between text-ink-600 hover:text-ink-900 transition-colors"
          >
            <span>NSSTA (TPAC Calendar)</span>
            <ExternalLink className="w-3 h-3 text-ink-400" />
          </a>
        </div>
      )}
    </aside>
  );
}
