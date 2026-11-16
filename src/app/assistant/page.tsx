'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DeterministicFallbackProvider } from '@/lib/llm/DeterministicFallback';
import {
  Bot,
  Send,
  Sparkles,
  User,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Building2,
} from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string; time: string }[]
  >([
    {
      role: 'assistant',
      content: `Namaste Sachin! I am your **Kaushal Setu AI Learning Companion**, grounded in the official manuals of MoSPI (SDRD, NAD, FOD, DIID) and the iGOT Karmayogi / NSSTA curriculum.\n\nI see you are a **Senior Statistical Officer** in **DIID** with priority skill gaps in **Survey Design & Sampling Frames** and **National Accounts (SNA 2008)**. How can I assist your capacity building today?`,
      time: '14:30',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    'How do I calculate sampling multipliers in a multi-stage stratified survey?',
    'What is the difference between Gross Value Added (GVA) and GDP at market prices?',
    'Which NSSTA TPAC workshop will close my gap in Small Area Estimation (SAE)?',
    'What are the mandatory DPDP Act 2023 compliance steps before publishing microdata?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = {
      role: 'user' as const,
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const fallback = new DeterministicFallbackProvider();
    const replyText = await fallback.chatStream(
      [...messages, userMsg],
      'Officer: Sachin Gosain, SSO, DIID, MoSPI. Gaps: Survey Design L2->L4, National Accounts L3->L4.'
    );

    const assistantMsg = {
      role: 'assistant' as const,
      content: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <AppShell currentRole="LEARNER">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-ink-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-chakra text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg text-ink-950">
                  Kaushal Setu AI Virtual Companion
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  Grounded in MoSPI Manuals
                </span>
              </div>
              <p className="text-xs text-ink-600">
                Contextual tutor aligned with your specific designation, cadre, and competency deficits.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-ink-500 hidden sm:inline">
            Zero Hallucination Protocol
          </span>
        </div>

        {/* Chat History Container */}
        <div className="gov-card p-4 sm:p-6 bg-white min-h-[460px] max-h-[560px] overflow-y-auto space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-md bg-chakra text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    AI
                  </div>
                )}

                <div
                  className={`p-4 rounded-lg max-w-[85%] sm:max-w-[75%] text-xs leading-relaxed space-y-1.5 shadow-subtle ${
                    m.role === 'user'
                      ? 'bg-ink-900 text-white font-medium rounded-tr-none'
                      : 'bg-paper-50 border border-ink-200 text-ink-900 rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">{m.content}</div>
                  <div
                    className={`text-[10px] font-mono text-right ${
                      m.role === 'user' ? 'text-ink-400' : 'text-ink-500'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-md bg-saffron text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                    SG
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-chakra text-white flex items-center justify-center shrink-0 text-xs">
                  AI
                </div>
                <div className="p-3 rounded-lg bg-paper-50 border border-ink-200 text-xs text-ink-600 flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-saffron border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing pedagogical guidance...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="pt-4 border-t border-ink-100 space-y-2">
            <span className="text-[11px] font-mono text-ink-500 block">Suggested Inquiries:</span>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 text-[11px] text-ink-700 bg-paper-100 hover:bg-paper-200 border border-ink-200 rounded-full transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="gov-card p-2 bg-white flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a technical question regarding survey methodology, SNA, or recommended courses..."
            className="flex-1 px-3 py-2 text-xs rounded-md bg-transparent focus:outline-none text-ink-950 font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-40"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </AppShell>
  );
}
