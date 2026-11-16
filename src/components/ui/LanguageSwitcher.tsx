'use client';

import React from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1.5 bg-paper-200/80 border border-ink-200 px-2.5 py-1 rounded-md text-xs font-medium text-ink-900">
      <Languages className="w-3.5 h-3.5 text-saffron" />
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          language === 'en'
            ? 'bg-ink-900 text-white font-semibold shadow-xs'
            : 'text-ink-600 hover:text-ink-900'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-ink-300">|</span>
      <button
        type="button"
        onClick={() => setLanguage('hi')}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          language === 'hi'
            ? 'bg-ink-900 text-white font-semibold shadow-xs'
            : 'text-ink-600 hover:text-ink-900'
        }`}
        aria-label="Switch to Hindi (हिन्दी)"
      >
        हिन्दी
      </button>
    </div>
  );
}
