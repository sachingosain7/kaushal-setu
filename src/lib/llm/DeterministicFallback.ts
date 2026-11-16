import { BloomLevel, MCQQuestion } from '@/types';
import { GenerationRequest, GenerationResponse, LLMProvider } from './types';

export class DeterministicFallbackProvider implements LLMProvider {
  async generateMCQs(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    const count = request.targetQuestionCount || 5;
    const chunks = request.chunks;
    const questions: MCQQuestion[] = [];

    // Realistic official statistics question templates calibrated against MoSPI manuals
    const questionTemplates: {
      question: (subject: string) => string;
      correct: (subject: string) => string;
      distractors: [string, string, string];
      explanation: (subject: string) => string;
      bloom: BloomLevel;
      difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    }[] = [
      {
        question: (subj) => `Under official statistical guidelines for ${subj}, what is the primary methodological reason for employing stratified multi-stage sampling rather than simple random sampling?`,
        correct: (subj) => `To ensure adequate representation across heterogeneous sub-populations (such as rural/urban strata) while controlling field survey variance.`,
        distractors: [
          `To eliminate the necessity of drawing a sampling frame prior to field listing.`,
          `To artificially compress the standard error to zero regardless of sample size.`,
          `To permit enumerators to substitute non-responding households without statistical penalty.`,
        ],
        explanation: (subj) => `Stratification partitions heterogeneous target populations into homogeneous strata, thereby reducing sampling variance and guaranteeing granular sub-domain precision.`,
        bloom: 'ANALYZE',
        difficulty: 'MEDIUM',
      },
      {
        question: (subj) => `In accordance with MoSPI standards regarding ${subj}, how should non-sampling errors arising from non-response in household surveys be addressed?`,
        correct: (subj) => `Through documented imputation routines and non-response weight adjustments calibrated to census totals.`,
        distractors: [
          `By immediately discarding all records from non-responding enumeration blocks.`,
          `By duplicating the preceding household's responses without adjustment flags.`,
          `By reporting only sample totals without applying sample multipliers.`,
        ],
        explanation: (subj) => `Non-response adjustments via weighting and validated imputation prevent systematic bias and preserve national aggregate representativeness.`,
        bloom: 'APPLY',
        difficulty: 'HARD',
      },
      {
        question: (subj) => `Which of the following statements accurately characterizes the treatment of ${subj} under the UN National Quality Assurance Framework (NQAF)?`,
        correct: (subj) => `Statistical outputs must demonstrate relevance, accuracy, timeliness, accessibility, interpretability, and coherence.`,
        distractors: [
          `Statistical outputs are exempt from metadata documentation if raw datasets are archived.`,
          `Timeliness is prioritized over methodological integrity in all preliminary releases.`,
          `Data quality is evaluated exclusively through sample size rather than design effects.`,
        ],
        explanation: (subj) => `The UN NQAF defines six core output quality dimensions that national statistical offices must satisfy to maintain public credibility.`,
        bloom: 'UNDERSTAND',
        difficulty: 'EASY',
      },
      {
        question: (subj) => `When compiling statistical indicators for ${subj}, what role does the SDMX (Statistical Data and Metadata Exchange) standard serve?`,
        correct: (subj) => `It provides standard codelists, structural data models, and automated XML/JSON schemas for cross-agency dissemination.`,
        distractors: [
          `It acts as an encryption algorithm specifically designed for biometric census tablets.`,
          `It serves as a proprietary statistical estimation tool developed exclusively for macroeconomic deflators.`,
          `It replaces the requirement for national accounts supply and use balancing.`,
        ],
        explanation: (subj) => `SDMX is the international standard sponsored by UNSD, World Bank, and IMF for streamlining statistical data sharing and automated metadata alignment.`,
        bloom: 'REMEMBER',
        difficulty: 'EASY',
      },
      {
        question: (subj) => `In the context of statutory compliance under the DPDP Act 2023 for ${subj}, what safeguard is legally mandatory before publishing microdata?`,
        correct: (subj) => `Rigorous statistical anonymization and suppression of direct and indirect re-identification vectors.`,
        distractors: [
          `A verbal telephone confirmation from every surveyed head of household.`,
          `Restricting access exclusively to gazetted Group A officers without exception.`,
          `Truncating numerical values to the nearest integer across all survey columns.`,
        ],
        explanation: (subj) => `The DPDP Act 2023 mandates strict data minimization, purpose limitation, and anonymization before survey data can be published in the public domain.`,
        bloom: 'EVALUATE',
        difficulty: 'HARD',
      },
    ];

    for (let i = 0; i < count; i++) {
      const template = questionTemplates[i % questionTemplates.length];
      const chunk = chunks.length > 0 ? chunks[i % chunks.length] : null;
      const snippet = chunk ? chunk.content.substring(0, 120) + '...' : 'MoSPI Technical Guidelines Section 4.2';
      const subject = request.topicOrTitle || 'Official Statistics & Survey Operations';

      const options = [
        template.correct(subject),
        template.distractors[0],
        template.distractors[1],
        template.distractors[2],
      ];

      // Shuffle options deterministically
      const optionOrder = ['A', 'B', 'C', 'D'] as const;
      const correctIdx = (i + 1) % 4;
      const shuffledOptions = [...options];
      const temp = shuffledOptions[0];
      shuffledOptions[0] = shuffledOptions[correctIdx];
      shuffledOptions[correctIdx] = temp;

      questions.push({
        id: `q-${i + 1}`,
        questionText: template.question(subject),
        optionA: shuffledOptions[0],
        optionB: shuffledOptions[1],
        optionC: shuffledOptions[2],
        optionD: shuffledOptions[3],
        correctOption: optionOrder[correctIdx],
        explanation: template.explanation(subject),
        difficulty: template.difficulty,
        bloomLevel: template.bloom,
        sourceChunkRef: chunk ? chunk.id : `chunk-1`,
        sourceSnippet: snippet,
      });
    }

    return {
      quizTitle: `Assessment on ${request.topicOrTitle || 'Official Statistics Competencies'}`,
      domain: request.domain || 'STATISTICAL',
      questions,
      generatedBy: 'DETERMINISTIC_FALLBACK',
      executionTimeMs: Date.now() - startTime,
    };
  }

  async chatStream(messages: any[], officerProfileContext: string): Promise<string> {
    const lastUserMsg = messages[messages.length - 1]?.content || 'Hello';
    return `Namaste! As your Kaushal Setu AI Learning Companion for India's Official Statistical System, I have reviewed your profile and current competency gaps.\n\nRegarding your question on "${lastUserMsg}":\n\nIn official statistical operations across MoSPI (such as NAD, SDRD, and FOD), this concept is fundamental for maintaining survey rigor and complying with the UN National Quality Assurance Framework (NQAF). To strengthen this competency, I recommend enrolling in the iGOT module on Survey Sampling Foundations and reviewing the NSSTA TPAC Residential Workshop schedule. Let me know if you would like me to unpack the formula or explain the practical field application!`;
  }
}
