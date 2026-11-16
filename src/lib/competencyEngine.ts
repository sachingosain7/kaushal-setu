import { CompetencyScoreWithBenchmark, Domain, DomainSummary, RoleBenchmark, UserCompetencyScore } from '@/types';
import { COMPETENCY_DICTIONARY, DOMAIN_META } from './competencyDictionary';

export interface RawScoreInput {
  competencyId: string;
  currentLevel: number;
  confidence?: number;
  assessedVia?: string;
  lastAssessedAt?: string;
}

export function calculateSkillGaps(
  userScores: RawScoreInput[],
  benchmarks: { competencyId: string; targetLevel: number; weight: number }[],
  cadre: string = 'SSS',
  division: string = 'DIID'
): CompetencyScoreWithBenchmark[] {
  const benchmarkMap = new Map(benchmarks.map((b) => [b.competencyId, b]));
  const scoreMap = new Map(userScores.map((s) => [s.competencyId, s]));

  return COMPETENCY_DICTIONARY.map((comp) => {
    const bm = benchmarkMap.get(comp.id);
    const score = scoreMap.get(comp.id);

    // Default target: 3 if not specified in role benchmark
    const targetLevel = bm?.targetLevel ?? 3;
    const weight = bm?.weight ?? 1.0;
    const currentLevel = score?.currentLevel ?? 1;
    const gap = Math.max(0, targetLevel - currentLevel);
    const confidence = score?.confidence ?? 0.8;
    const lastAssessedAt = score?.lastAssessedAt ?? new Date().toISOString();
    const assessedVia = score?.assessedVia ?? 'DIAGNOSTIC';

    // Transparent Priority Score (0 to 10 scale)
    const priorityScore = parseFloat((gap * weight * 1.5 + (5 - currentLevel) * 0.5).toFixed(1));

    // Plain English Explainability
    let explanation = '';
    if (gap === 0) {
      explanation = `Target achieved (Level ${currentLevel} of ${targetLevel}). Officer meets role benchmark for ${cadre} officers in ${division}.`;
    } else if (gap >= 2) {
      explanation = `Critical Operational Gap: Target requires Level ${targetLevel} (Expert/Advanced execution) for ${division} operations, but current assessed level is Level ${currentLevel}. Immediate priority for TPAC / iGOT learning.`;
    } else {
      explanation = `Moderate Gap: Requires moving from Level ${currentLevel} to Level ${targetLevel}. Targeted practice modules recommended to close the bridge.`;
    }

    return {
      competencyId: comp.id,
      code: comp.code,
      name: comp.name,
      domain: comp.domain,
      description: comp.description,
      currentLevel,
      targetLevel,
      gap,
      weight,
      priorityScore,
      confidence,
      lastAssessedAt,
      assessedVia,
      explanation,
    };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}

export function computeDomainSummaries(items: CompetencyScoreWithBenchmark[]): DomainSummary[] {
  const domains: Domain[] = ['STATISTICAL', 'TECHNICAL', 'DIGITAL_GOVERNANCE', 'BEHAVIOURAL'];

  return domains.map((domain) => {
    const filtered = items.filter((i) => i.domain === domain);
    const total = filtered.length;
    const sumCurrent = filtered.reduce((acc, c) => acc + c.currentLevel, 0);
    const sumTarget = filtered.reduce((acc, c) => acc + c.targetLevel, 0);
    const sumGap = filtered.reduce((acc, c) => acc + c.gap, 0);

    const averageCurrent = total > 0 ? parseFloat((sumCurrent / total).toFixed(1)) : 0;
    const averageTarget = total > 0 ? parseFloat((sumTarget / total).toFixed(1)) : 0;
    const meta = DOMAIN_META[domain];

    return {
      domain,
      label: meta.label,
      totalCompetencies: total,
      averageCurrent,
      averageTarget,
      totalGap: sumGap,
      color: meta.color,
      accentBg: meta.bg,
      borderColor: meta.border,
    };
  });
}

export function computeReadinessIndex(items: CompetencyScoreWithBenchmark[]): number {
  if (items.length === 0) return 0;
  const totalTargetPoints = items.reduce((acc, i) => acc + i.targetLevel, 0);
  const totalCurrentCapped = items.reduce((acc, i) => acc + Math.min(i.currentLevel, i.targetLevel), 0);
  return Math.round((totalCurrentCapped / totalTargetPoints) * 100);
}
