import { LLMProvider } from './types';
import { GeminiProvider } from './GeminiProvider';
import { DeterministicFallbackProvider } from './DeterministicFallback';

export function getLLMProvider(): LLMProvider {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey.trim().length > 0 && apiKey !== 'your_gemini_api_key_here') {
    return new GeminiProvider(apiKey.trim());
  }
  return new DeterministicFallbackProvider();
}
