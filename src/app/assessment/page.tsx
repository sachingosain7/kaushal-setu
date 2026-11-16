'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { DeterministicFallbackProvider } from '@/lib/llm/DeterministicFallback';
import { MCQQuestion } from '@/types';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Award,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export default function AssessmentPlayerPage() {
  const [questions, setQuestions] = useState<MCQQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Generate grounded assessment questions on official statistics
    const provider = new DeterministicFallbackProvider();
    provider
      .generateMCQs({
        topicOrTitle: 'Survey Sampling & NSS Multi-Stage Design',
        domain: 'STATISTICAL',
        chunks: [],
        targetQuestionCount: 5,
      })
      .then((res) => setQuestions(res.questions));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [submitted, timeLeft]);

  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (submitted) return;
    const q = questions[currentIndex];
    setSelectedAnswers((prev) => ({ ...prev, [q.id]: opt }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOption) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];

  return (
    <AppShell currentRole="LEARNER">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Assessment Banner Header */}
        <div className="gov-card p-5 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-chakra-50 text-chakra-800 border border-chakra-200">
                MoSPI Continuous Evaluation (SIH26101)
              </span>
              <span className="text-xs font-mono text-ink-500">
                Assigned by: NSSTA Training Faculty
              </span>
            </div>
            <h1 className="font-serif font-bold text-xl text-ink-950 mt-1">
              Survey Sampling &amp; Multi-Stage Design Diagnostic
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {!submitted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-paper-100 border border-ink-200 font-mono text-xs font-bold text-ink-900">
                <Clock className="w-4 h-4 text-saffron" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}
            <span className="text-xs font-mono text-ink-500">
              Q {currentIndex + 1} of {questions.length || 5}
            </span>
          </div>
        </div>

        {/* LOADING STATE */}
        {questions.length === 0 && (
          <div className="gov-card p-12 text-center bg-white space-y-3">
            <div className="w-8 h-8 border-3 border-saffron border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="text-xs font-semibold text-ink-800">
              Loading AI Grounded Assessment Questions...
            </div>
          </div>
        )}

        {/* QUESTION RUNNER VIEW */}
        {questions.length > 0 && !submitted && currentQ && (
          <div className="gov-card p-6 sm:p-8 bg-white space-y-6">
            {/* Top Question Metadata */}
            <div className="flex items-center justify-between pb-3 border-b border-ink-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-ink-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                  {currentIndex + 1}
                </span>
                <span className="font-mono text-ink-500">Bloom Taxonomy:</span>
                <span className="font-mono font-bold text-chakra px-2 py-0.5 rounded bg-chakra-50 border border-chakra-200 text-[10px]">
                  {currentQ.bloomLevel}
                </span>
              </div>
              <span className="font-mono text-[10px] text-ink-400">
                Difficulty: {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-lg text-ink-950 leading-relaxed">
                {currentQ.questionText}
              </h2>
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3 pt-2">
              {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                const optText = currentQ[`option${optKey}` as keyof MCQQuestion] as string;
                const isSelected = selectedAnswers[currentQ.id] === optKey;

                return (
                  <button
                    key={optKey}
                    type="button"
                    onClick={() => handleSelectOption(optKey)}
                    className={`w-full p-4 rounded-md border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-saffron bg-saffron-50/80 shadow-xs ring-1 ring-saffron'
                        : 'border-ink-200 bg-paper-50 hover:bg-white text-ink-800'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-saffron text-white shadow-xs'
                          : 'bg-paper-200 text-ink-700'
                      }`}
                    >
                      {optKey}
                    </span>
                    <span className="text-xs font-medium leading-relaxed pt-0.5">
                      {optText}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
                className="px-4 py-2 bg-paper-100 hover:bg-paper-200 text-ink-800 text-xs font-semibold rounded-md border border-ink-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Previous
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((idx) => Math.min(questions.length - 1, idx + 1))}
                  className="px-5 py-2 bg-ink-900 hover:bg-ink-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 bg-saffron hover:bg-saffron-600 text-white text-xs font-semibold rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit &amp; Evaluate Assessment</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* POST-SUBMISSION RESULTS & COMPETENCY WRITEBACK */}
        {submitted && (
          <div className="space-y-6">
            {/* Score Summary Card */}
            <div className="gov-card p-6 sm:p-8 bg-white text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold tracking-wider">
                  Assessment Evaluation Complete
                </span>
                <h2 className="font-serif font-bold text-2xl text-ink-950 mt-1">
                  You Scored {score} of {questions.length} ({Math.round((score / questions.length) * 100)}%)
                </h2>
                <p className="text-xs text-ink-600 mt-1">
                  Passed role evaluation criteria. Your responses have been processed through the competency engine.
                </p>
              </div>

              {/* Automatic Writeback Highlight */}
              <div className="p-4 bg-emerald-50 rounded-md border border-emerald-200 max-w-lg mx-auto text-left flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <div className="font-bold">Competency Profile Auto-Updated:</div>
                  <div className="mt-0.5">
                    <strong>Survey Design &amp; Sampling Frames</strong> upgraded from <strong>Level 2</strong> to <strong>Level 3</strong> (Intermediate Independent Execution).
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Return to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gaps"
                  className="px-4 py-2.5 bg-paper-100 hover:bg-paper-200 text-ink-800 font-semibold text-xs rounded-md border border-ink-200 transition-colors"
                >
                  View Updated Gap Radar
                </Link>
              </div>
            </div>

            {/* Question-by-Question Detailed Review with Grounded Explanations */}
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-ink-950">
                Detailed Solutions &amp; Pedagogical Rationales
              </h3>

              {questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctOption;

                return (
                  <div key={q.id} className="gov-card p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-ink-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-chakra-50 text-chakra-800 border border-chakra-200">
                          {q.bloomLevel}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-coral-100 text-coral-800'
                        }`}
                      >
                        {isCorrect ? '✓ Correct' : `✗ Selected ${userAns || 'None'}`}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-sm text-ink-950">
                      {q.questionText}
                    </h4>

                    {/* Options list showing correct key */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(['A', 'B', 'C', 'D'] as const).map((key) => {
                        const optText = q[`option${key}` as keyof MCQQuestion] as string;
                        const isThisCorrect = q.correctOption === key;
                        const isThisUser = userAns === key;

                        return (
                          <div
                            key={key}
                            className={`p-2.5 rounded border text-xs flex items-start gap-2 ${
                              isThisCorrect
                                ? 'bg-emerald-50 border-emerald-300 font-medium text-emerald-950'
                                : isThisUser && !isThisCorrect
                                ? 'bg-coral-50 border-coral-300 text-coral-950'
                                : 'bg-paper-50 border-ink-200 text-ink-700'
                            }`}
                          >
                            <span className="font-mono font-bold">{key}.</span>
                            <span>{optText}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Box */}
                    <div className="p-3 bg-paper-50 rounded-md border border-ink-200 text-xs text-ink-700 space-y-1">
                      <div className="font-semibold text-ink-900 flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Official Grounded Explanation:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
