'use client';

import React, { useState } from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { MobileTabs } from './MobileTabs';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

interface AppShellProps {
  children: React.ReactNode;
  currentRole?: string;
  hideSidebar?: boolean;
}

export function AppShell({ children, currentRole = 'LEARNER', hideSidebar = false }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-paper-100 text-ink-950 antialiased selection:bg-saffron-100 selection:text-saffron-900">
        <TopNav currentRole={currentRole} />

        <div className="flex-1 flex w-full relative">
          {!hideSidebar && (
            <Sidebar
              collapsed={collapsed}
              onToggleCollapse={() => setCollapsed(!collapsed)}
              currentRole={currentRole}
            />
          )}

          <main className="flex-1 min-w-0 pb-20 md:pb-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>

        <MobileTabs />
      </div>
    </LanguageProvider>
  );
}
