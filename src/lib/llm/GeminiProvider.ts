import { BloomLevel, MCQQuestion } from '@/types';
import { GenerationRequest, GenerationResponse, LLMProvider } from './types';
import { DeterministicFallbackProvider } from './DeterministicFallback';

export class GeminiProvider implements LLMProvider {
  private apiKey: string;
  private fallback: DeterministicFallbackProvider;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.fallback = new DeterministicFallbackProvider();
  }

  async generateMCQs(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    const count = request.targetQuestionCount || 5;
    const chunkContext = request.chunks.map((c) => `[CHUNK ${c.id}] (From: ${c.sourceTitle}):\n${c.content}`).join('\n\n---\n\n');

    const prompt = `You are a Senior Statistical Methodologist at MoSPI and an expert exam question author for the Indian Statistical Service (ISS) and Subordinate Statistical Service (SSS).
Generate exactly ${count} high-quality Multiple Choice Questions (MCQs) strictly grounded in the following reference text.

REFERENCE MATERIAL:
${chunkContext}

RULES:
1. Grounding: Questions must be answerable ONLY from the provided text excerpts. Do not fabricate external facts.
2. Structure: 4 options (A, B, C, D) with exactly one correct option.
3. Distractors: Distractors must be plausible statistical concepts/foils, not lazy options like "All of the above" or "None of the above".
4. Bloom Level: Tag each question with one of: REMEMBER, UNDERSTAND, APPLY, ANALYZE, EVALUATE, CREATE.
5. Provide a rigorous explanation citing the source chunk ID.

Output strictly valid JSON with this exact schema:
{
  "quizTitle": "Title of the quiz",
  "questions": [
    {
      "questionText": "Question string",
      "optionA": "Option text",
      "optionB": "Option text",
      "optionC": "Option text",
      "optionD": "Option text",
      "correctOption": "A" | "B" | "C" | "D",
      "explanation": "Detailed rationale",
      "difficulty": "EASY" | "MEDIUM" | "HARD",
      "bloomLevel": "REMEMBER" | "UNDERSTAND" | "APPLY" | "ANALYZE" | "EVALUATE" | "CREATE",
      "sourceChunkRef": "chunk-1"
    }
  ]
}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        console.warn('Gemini API call failed, falling back to deterministic engine');
        return this.fallback.generateMCQs(request);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) return this.fallback.generateMCQs(request);

      const parsed = JSON.parse(rawText);
      const questions: MCQQuestion[] = (parsed.questions || []).map((q: any, idx: number) => ({
        id: `q-${idx + 1}`,
        questionText: q.questionText,
        optionA: q.optionA,
        optionB: q.optionB,
        optionC: q.optionC,
        optionD: q.optionD,
        correctOption: ['A', 'B', 'C', 'D'].includes(q.correctOption) ? q.correctOption : 'A',
        explanation: q.explanation || 'Refer to source excerpt.',
        difficulty: q.difficulty || 'MEDIUM',
        bloomLevel: (q.bloomLevel as BloomLevel) || 'UNDERSTAND',
        sourceChunkRef: q.sourceChunkRef || 'chunk-1',
        sourceSnippet: request.chunks.find((c) => c.id === q.sourceChunkRef)?.content.substring(0, 100),
      }));

      return {
        quizTitle: parsed.quizTitle || `Assessment on ${request.topicOrTitle}`,
        domain: request.domain || 'STATISTICAL',
        questions,
        generatedBy: 'GEMINI_API',
        executionTimeMs: Date.now() - startTime,
      };
    } catch (err) {
      console.warn('Error during Gemini MCQ generation, using fallback:', err);
      return this.fallback.generateMCQs(request);
    }
  }

  async chatStream(messages: any[], officerProfileContext: string): Promise<string> {
    try {
      const systemInstruction = `You are Kaushal Setu AI, a dedicated learning companion for officials in India's Official Statistical System (MoSPI).
Officer Profile Context: ${officerProfileContext}.
Respond constructively with practical guidance referencing MoSPI guidelines, iGOT Karmayogi modules, and NSSTA TPAC calendar workshops. Keep explanations clear, professional, and culturally grounded in public service values.`;

      const contents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemInstruction }] },
            contents,
            generationConfig: { temperature: 0.7 },
          }),
        }
      );

      if (!response.ok) {
        return this.fallback.chatStream(messages, officerProfileContext);
      }

      const data = await response.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text || this.fallback.chatStream(messages, officerProfileContext);
    } catch (err) {
      return this.fallback.chatStream(messages, officerProfileContext);
    }
  }
}
