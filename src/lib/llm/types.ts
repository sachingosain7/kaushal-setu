import { BloomLevel, MCQQuestion } from '@/types';
import { TextChunk } from '../assessment/chunker';

export interface GenerationRequest {
  topicOrTitle: string;
  domain: string;
  chunks: TextChunk[];
  targetQuestionCount?: number;
  bloomLevels?: BloomLevel[];
}

export interface GenerationResponse {
  quizTitle: string;
  domain: string;
  questions: MCQQuestion[];
  generatedBy: 'GEMINI_API' | 'DETERMINISTIC_FALLBACK';
  executionTimeMs: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LLMProvider {
  generateMCQs(request: GenerationRequest): Promise<GenerationResponse>;
  chatStream(messages: ChatMessage[], officerProfileContext: string): Promise<ReadableStream<Uint8Array> | string>;
}
