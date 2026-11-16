'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { BridgeMeter } from '@/components/bridge/BridgeMeter';
import { BridgeHeroSpan } from '@/components/bridge/BridgeHeroSpan';
import {
  Palette,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Layers,
  Sliders,
  Terminal,
  ShieldCheck,
  Languages,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [demoCurrent, setDemoCurrent] = useState(2);
  const [demoTarget, setDemoTarget] = useState(4);

  const colors = [
    { name: 'Warm Paper (Canvas)', hex: '#FAF6EE', role: 'Default Background', border: true },
    { name: 'Ink Navy', hex: '#14213D', role: 'Primary Structure & Text' },
    { name: 'Saffron', hex: '#F28C28', role: 'Primary Action & Accent' },
    { name: 'Emerald', hex: '#0F8B6D', role: 'Mastery & Progress' },
    { name: 'Indigo Chakra', hex: '#2C3E9E', role: 'Statistical Domain' },
    { name: 'Sky Cyan', hex: '#0284C7', role: 'Technical Domain' },
    { name: 'Amber Gold', hex: '#D97706', role: 'Behavioural & Managerial' },
    { name: 'Coral Red', hex: '#E4572E', role: 'Critical Gap Alert' },
  ];

  const domains = [
    { name: 'Statistical Domain', count: 10, bg: 'bg-[#EEF2FF]', border: 'border-[#C7D2FE]', text: 'text-[#2C3E9E]', sample: 'Survey Design, National Accounts (SNA), Price Statistics' },
    { name: 'Technical Domain', count: 12, bg: 'bg-[#F0F9FF]', border: 'border-[#BAE6FD]', text: 'text-[#0284C7]', sample: 'Python, R, SQL, Stata, GIS Mapping, CAPI Tools' },
    { name: 'Digital Governance', count: 5, bg: 'bg-[#F1F5F9]', border: 'border-[#CBD5E1]', text: 'text-[#14213D]', sample: 'Cybersecurity, DPDP Act 2023, Digital Signatures, MeghRaj' },
    { name: 'Behavioural & Managerial', count: 6, bg: 'bg-[#FFFBEB]', border: 'border-[#FDE68A]', text: 'text-[#D97706]', sample: 'Leadership, Strategic Communication, Survey Management' },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b border-ink-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-saffron font-bold mb-1">
            <Palette className="w-4 h-4" />
            <span>Living Design System &amp; Component Specification</span>
          </div>
          <h1 className="fluid-h1 text-ink-950 font-serif">
            Kaushal Setu Visual Identity System
          </h1>
          <p className="fluid-body text-ink-600 mt-2 max-w-3xl">
            A classic, disciplined, daylight-inspired design language purpose-built for India’s Official Statistical System. Rejecting generic dark-mode AI templates in favour of crisp editorial typography, warm administrative paper tones, semantic domain colours, and the architectural bridge motif.
          </p>
        </div>

        {/* Section 1: Color Palette */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-chakra" />
            <h2 className="fluid-h2 text-ink-900 font-serif">1. Color Foundation &amp; Semantics</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                className="gov-card p-3.5 space-y-2"
              >
                <div
                  className={`w-full h-16 rounded-sm shadow-xs ${c.border ? 'border border-ink-300' : ''}`}
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <div className="font-semibold text-xs text-ink-900">{c.name}</div>
                  <div className="text-[11px] font-mono text-ink-500">{c.hex}</div>
                  <div className="text-[11px] text-ink-600 mt-0.5">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 4 Competency Domain Tags */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="fluid-h2 text-ink-900 font-serif">2. The 4 Official Statistics Competency Domains</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {domains.map((d) => (
              <div
                key={d.name}
                className={`p-4 rounded-md border ${d.border} ${d.bg} space-y-2`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-serif font-bold text-sm ${d.text}`}>{d.name}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border ${d.border}`}>
                    {d.count} Competencies
                  </span>
                </div>
                <p className="text-xs text-ink-700">
                  <strong>Scope:</strong> {d.sample}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Signature Bridge Motif */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-saffron" />
            <h2 className="fluid-h2 text-ink-900 font-serif">3. Signature Bridge Motif (Interactive)</h2>
          </div>
          <p className="text-xs text-ink-600 max-w-2xl">
            A competency deficit is visually conceptualized as a physical architectural span. Use the sliders below to test how the Bridge widget dynamically updates between Current Level and Role Target Level.
          </p>

          <div className="gov-card p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-ink-100 text-xs">
              <div>
                <label className="font-semibold text-ink-900 block mb-1">
                  Adjust Current Assessed Level: <span className="font-mono text-saffron text-sm font-bold">L{demoCurrent}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={demoCurrent}
                  onChange={(e) => setDemoCurrent(Number(e.target.value))}
                  className="w-full accent-ink-900 cursor-pointer"
                />
              </div>
              <div>
                <label className="font-semibold text-ink-900 block mb-1">
                  Adjust Target Benchmark: <span className="font-mono text-saffron text-sm font-bold">L{demoTarget}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={demoTarget}
                  onChange={(e) => setDemoTarget(Number(e.target.value))}
                  className="w-full accent-saffron cursor-pointer"
                />
              </div>
            </div>

            {/* Rendered Live Bridge Meters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-ink-700 mb-1">Full Architectural Bridge Display:</div>
                <BridgeMeter currentLevel={demoCurrent} targetLevel={demoTarget} />
              </div>
              <div className="space-y-3">
                <div className="text-xs font-semibold text-ink-700">Compact Inline Table Variant:</div>
                <div className="p-4 bg-paper-50 rounded-md border border-ink-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink-900">Survey Design &amp; Sampling Frames</span>
                    <BridgeMeter currentLevel={demoCurrent} targetLevel={demoTarget} compact />
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-ink-200">
                    <span className="font-medium text-ink-900">National Accounts (SNA 2008)</span>
                    <BridgeMeter currentLevel={4} targetLevel={4} compact />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Bridge Journey Hero Span */}
          <div className="mt-4">
            <div className="text-xs font-semibold text-ink-700 mb-2">Macro Learning Journey Bridge (Hero Component):</div>
            <BridgeHeroSpan />
          </div>
        </section>

        {/* Section 4: Typography & Microcopy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-ink-800" />
            <h2 className="fluid-h2 text-ink-900 font-serif">4. Typography &amp; Multilingual Devanagari Rendering</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="gov-card p-5 space-y-3">
              <span className="text-[10px] font-mono uppercase text-ink-400 font-bold">English (Editorial Serif + Humanist Sans)</span>
              <h3 className="font-serif text-xl font-bold text-ink-950">
                Transforming India’s Official Statistics through Evidence-led Capacity.
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-sans">
                The National Statistical Systems Training Academy (NSSTA) and iGOT Karmayogi empower civil servants with verifiable competencies, continuous micro-learning, and automated diagnostic intelligence.
              </p>
              <div className="font-mono text-xs text-ink-700 bg-paper-100 p-2 rounded border border-ink-200">
                ID: ISS-2026-FOD-0492 | Score: 87.4% | Rank: #4
              </div>
            </div>

            <div className="gov-card p-5 space-y-3">
              <span className="text-[10px] font-mono uppercase text-ink-400 font-bold">हिन्दी (Noto Sans Devanagari)</span>
              <h3 className="font-serif text-xl font-bold text-ink-950 font-devanagari">
                साक्ष्य-आधारित क्षमता निर्माण द्वारा भारत की आधिकारिक सांख्यिकी का सशक्तिकरण।
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-devanagari">
                राष्ट्रीय सांख्यिकी प्रणाली प्रशिक्षण अकादमी (एनएसएसटीए) एवं आईगॉट कर्मयोगी सिविल सेवकों को सत्यापन योग्य दक्षताओं, सतत सूक्ष्म-अधिगम और स्वचालित नैदानिक आसूचना से सशक्त बनाते हैं।
              </p>
              <div className="font-mono text-xs text-ink-700 bg-paper-100 p-2 rounded border border-ink-200">
                पद: कनिष्ठ सांख्यिकी अधिकारी | प्रभाग: राष्ट्रीय लेखा प्रभाग
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Buttons & Interactive Controls */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-chakra" />
            <h2 className="fluid-h2 text-ink-900 font-serif">5. Buttons &amp; Interactive Controls</h2>
          </div>
          <div className="gov-card p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 bg-saffron hover:bg-saffron-600 text-white font-medium text-xs rounded-md shadow-xs transition-colors">
                Primary Action (Saffron)
              </button>
              <button className="px-4 py-2 bg-ink-900 hover:bg-ink-800 text-white font-medium text-xs rounded-md shadow-xs transition-colors">
                Secondary Structural (Ink Navy)
              </button>
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-md shadow-xs transition-colors">
                Success / Publish (Emerald)
              </button>
              <button className="px-4 py-2 bg-paper-100 hover:bg-paper-200 text-ink-800 border border-ink-200 font-medium text-xs rounded-md transition-colors">
                Outline / Neutral
              </button>
              <button className="px-4 py-2 bg-coral hover:bg-coral-600 text-white font-medium text-xs rounded-md shadow-xs transition-colors">
                Alert / Destructive
              </button>
              <button disabled className="px-4 py-2 bg-ink-100 text-ink-400 cursor-not-allowed font-medium text-xs rounded-md">
                Disabled State
              </button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
