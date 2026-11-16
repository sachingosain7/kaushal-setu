'use client';

import React from 'react';
import { Domain } from '@/types';

interface BridgeMeterProps {
  currentLevel: number; // 1 to 5
  targetLevel: number;  // 1 to 5
  domain?: Domain;
  compact?: boolean;
}

export function BridgeMeter({ currentLevel, targetLevel, domain, compact = false }: BridgeMeterProps) {
  const gap = Math.max(0, targetLevel - currentLevel);
  const isClosed = gap === 0;

  // Percentage height for pillars
  const currentHeightPct = Math.min(100, (currentLevel / 5) * 100);
  const targetHeightPct = Math.min(100, (targetLevel / 5) * 100);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-xs font-mono">
          <span className="font-semibold text-ink-900 bg-paper-200 px-1.5 py-0.5 rounded border border-ink-200">
            L{currentLevel}
          </span>
          <span className="text-ink-400">→</span>
          <span className="font-semibold text-ink-700 bg-ink-100 px-1.5 py-0.5 rounded border border-ink-200">
            L{targetLevel}
          </span>
        </div>
        {gap > 0 ? (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-coral-50 text-coral-700 border border-coral-200">
            -{gap} Span
          </span>
        ) : (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            ✓ Met
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 bg-paper-50 rounded-md border border-ink-200/80">
      <div className="flex items-center justify-between text-xs mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-ink-900" />
          <span className="font-medium text-ink-700">Current: Level {currentLevel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-saffron" />
          <span className="font-medium text-ink-900">Target: Level {targetLevel}</span>
        </div>
      </div>

      {/* Visual Architectural Bridge Representation */}
      <div className="relative h-14 w-full flex items-end justify-between px-4 pt-2">
        {/* Left Pillar: Current Level */}
        <div className="flex flex-col items-center">
          <div
            className="w-4 bg-ink-900 rounded-t-sm transition-all duration-500 shadow-xs"
            style={{ height: `${Math.max(20, currentHeightPct * 0.45)}px` }}
          />
          <span className="text-[10px] font-mono font-bold text-ink-900 mt-1">L{currentLevel}</span>
        </div>

        {/* The Bridge Arch / Span */}
        <div className="flex-1 mx-2 relative flex flex-col items-center justify-center">
          {/* Bridge cable / deck */}
          <div className="w-full relative h-4 flex items-center">
            <div className="w-full border-t-2 border-dashed border-ink-300" />
            {isClosed ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  Bridge Closed
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-coral-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {gap} Level Span
                </span>
              </div>
            )}
          </div>
          <div className="text-[10px] text-ink-500 mt-0.5">
            {isClosed ? 'Role mastery achieved' : 'Requires targeted modules'}
          </div>
        </div>

        {/* Right Pillar: Target Benchmark */}
        <div className="flex flex-col items-center">
          <div
            className="w-4 bg-saffron rounded-t-sm transition-all duration-500 shadow-xs"
            style={{ height: `${Math.max(20, targetHeightPct * 0.45)}px` }}
          />
          <span className="text-[10px] font-mono font-bold text-saffron-700 mt-1">L{targetLevel}</span>
        </div>
      </div>
    </div>
  );
}
