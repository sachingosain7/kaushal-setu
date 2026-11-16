'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { chunkText, TextChunk } from '@/lib/assessment/chunker';
import { DeterministicFallbackProvider } from '@/lib/llm/DeterministicFallback';
import { MCQQuestion } from '@/types';
import {
  FileSpreadsheet,
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  Edit3,
  Trash2,
  Send,
  Eye,
  AlertCircle,
  HelpCircle,
  Clock,
  Layers,
  BookOpen,
  Check,
} from 'lucide-react';

export default function TrainerStudioPage() {
  const [activeStep, setActiveStep] = useState<'UPLOAD' | 'CHUNKS' | 'REVIEW' | 'PUBLISHED'>('UPLOAD');
  const [docTitle, setDocTitle] = useState('NSS 80th Round Socio-Economic Survey Instructions.pdf');
  const [docDomain, setDocDomain] = useState('STATISTICAL');
  const [rawText, setRawText] = useState(
    `NATIONAL STATISTICAL OFFICE (NSO)
SURVEY DESIGN AND RESEARCH DIVISION (SDRD)
INSTRUCTIONS TO FIELD STAFF FOR HOUSEHOLD SOCIO-ECONOMIC SURVEYS

Section 1: General Sampling Design
The sample design adopted for the 80th round is a stratified multi-stage design. The first stage units (FSU) are the Census villages in rural areas and the Urban Frame Survey (UFS) blocks in urban areas. The ultimate stage units (USU) are the households.
Large FSUs having an approximate present population of 1200 or more are divided into a suitable number of sub-units called hamlet-groups in rural areas and sub-blocks in urban areas to ensure that field listing remains operationally manageable.

Section 2: Selection of Households and Sampling Weights
From each selected FSU, households are stratified into three Second Stage Strata (SSS) based on household consumer expenditure and livelihood indicators. The sample households are drawn by simple random sampling without replacement (SRSWOR).
To generate unbiased national estimates, multiplier weights are calculated as the inverse of the inclusion probability at each stage. Field investigators must strictly record non-response codes (Code 1: Informant absent, Code 2: Refusal, Code 3: Natural calamity) to permit post-survey non-sampling error calibration and imputation.

Section 3: Data Quality & UN NQAF Standards
All field data collection on CAPI handheld devices must pass electronic consistency checks before transmission to the Data Processing Division (DPD). The UN National Quality Assurance Framework (NQAF) principles mandate complete metadata logging and transparent declaration of imputation rates.`
  );

  const [chunks, setChunks] = useState<TextChunk[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<MCQQuestion[]>([]);
  const [selectedCohort, setSelectedCohort] = useState('JSO Induction Batch 2026 (NSSTA)');
  const [editingQId, setEditingQId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle Chunking
  const handleProceedToChunks = () => {
    const res = chunkText(rawText, docTitle);
    setChunks(res);
    setActiveStep('CHUNKS');
  };

  // Handle AI MCQ Generation
  const handleGenerateMCQs = async () => {
    setIsGenerating(true);
    // Use fallback / local LLM orchestrator
    const fallback = new DeterministicFallbackProvider();
    const result = await fallback.generateMCQs({
      topicOrTitle: docTitle,
      domain: docDomain,
      chunks,
      targetQuestionCount: 5,
    });
    setGeneratedQuestions(result.questions);
    setIsGenerating(false);
    setActiveStep('REVIEW');
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    setGeneratedQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Update question
  const handleUpdateQuestion = (id: string, updatedText: string) => {
    setGeneratedQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: updatedText } : q))
    );
    setEditingQId(null);
  };

  return (
    <AppShell currentRole="TRAINER">
      <div className="space-y-6">
        {/* Studio Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-ink-200 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-saffron" />
              <span className="text-xs font-mono font-bold text-saffron uppercase tracking-wider">
                NSSTA Faculty Authoring Suite
              </span>
            </div>
            <h1 className="font-serif font-bold text-2xl text-ink-950 mt-1">
              Intelligent Assessment &amp; MCQ Studio
            </h1>
            <p className="text-xs text-ink-600 mt-0.5">
              Transform official survey manuals, whitepapers and video transcripts into Bloom-stratified pedagogical quizzes with Human-in-the-Loop review.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1 bg-paper-100 p-1 rounded-md border border-ink-200 text-xs font-mono">
            <span className={`px-2.5 py-1 rounded ${activeStep === 'UPLOAD' ? 'bg-ink-900 text-white font-bold' : 'text-ink-500'}`}>
              1. Document
            </span>
            <span className="text-ink-300">→</span>
            <span className={`px-2.5 py-1 rounded ${activeStep === 'CHUNKS' ? 'bg-ink-900 text-white font-bold' : 'text-ink-500'}`}>
              2. Chunking
            </span>
            <span className="text-ink-300">→</span>
            <span className={`px-2.5 py-1 rounded ${activeStep === 'REVIEW' ? 'bg-ink-900 text-white font-bold' : 'text-ink-500'}`}>
              3. Review Studio
            </span>
            <span className="text-ink-300">→</span>
            <span className={`px-2.5 py-1 rounded ${activeStep === 'PUBLISHED' ? 'bg-emerald-600 text-white font-bold' : 'text-ink-500'}`}>
              4. Published
            </span>
          </div>
        </div>

        {/* STEP 1: DOCUMENT UPLOAD & TRANSCRIPT INGESTION */}
        {activeStep === 'UPLOAD' && (
          <div className="gov-card p-6 bg-white space-y-5">
            <div className="border-b border-ink-100 pb-3">
              <h2 className="font-serif font-bold text-lg text-ink-950">
                Step 1: Upload Learning Material or Paste Transcript
              </h2>
              <p className="text-xs text-ink-600 mt-0.5">
                Supported formats: PDF manuals, DOCX circulars, PPTX training slides, or raw video/lecture transcripts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Document / Material Title
                </label>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white font-mono text-ink-900 focus:outline-none focus:border-saffron"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-900 mb-1">
                  Target Competency Domain
                </label>
                <select
                  value={docDomain}
                  onChange={(e) => setDocDomain(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron"
                >
                  <option value="STATISTICAL">Statistical Domain (Survey Design, SNA, CPI)</option>
                  <option value="TECHNICAL">Technical Domain (Python, R, SQL, GIS)</option>
                  <option value="DIGITAL_GOVERNANCE">Digital Governance (DPDP Act, Cyber Security)</option>
                  <option value="BEHAVIOURAL">Behavioural &amp; Managerial (Leadership, Ethics)</option>
                </select>
              </div>
            </div>

            {/* Drag & Drop Simulation Dropzone */}
            <div className="border-2 border-dashed border-ink-200 rounded-lg p-6 text-center bg-paper-50 space-y-2">
              <Upload className="w-8 h-8 text-saffron mx-auto" />
              <div className="text-xs font-semibold text-ink-900">
                Drag and drop PDF/DOCX manual or browse files
              </div>
              <p className="text-[11px] text-ink-500">
                Sample loaded: NSS 80th Round Instructions to Field Staff (MoSPI SDRD)
              </p>
            </div>

            {/* Raw Text / Transcript Area */}
            <div>
              <label className="block text-xs font-semibold text-ink-900 mb-1">
                Extracted Text / Pasted Video Transcript
              </label>
              <textarea
                rows={9}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                className="w-full p-3 text-xs font-mono rounded-md border border-ink-200 bg-white text-ink-900 focus:outline-none focus:border-saffron leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleProceedToChunks}
                className="px-5 py-2.5 bg-ink-900 hover:bg-ink-800 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Structure &amp; Chunk Text</span>
                <Layers className="w-4 h-4 text-saffron" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHUNKING PREVIEW */}
        {activeStep === 'CHUNKS' && (
          <div className="gov-card p-6 bg-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-ink-100">
              <div>
                <h2 className="font-serif font-bold text-lg text-ink-950">
                  Step 2: Context-Preserving Semantic Chunks
                </h2>
                <p className="text-xs text-ink-600 mt-0.5">
                  Extracted into <strong>{chunks.length} semantic chunks</strong> with 150-token sliding overlap to preserve mathematical and legal clauses.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep('UPLOAD')}
                className="text-xs text-ink-500 hover:text-ink-900 font-mono"
              >
                ← Back to Upload
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {chunks.map((chk) => (
                <div key={chk.id} className="p-4 rounded-md border border-ink-200 bg-paper-50 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-ink-500">
                    <span className="font-bold text-ink-900">{chk.id.toUpperCase()}</span>
                    <span>~{chk.tokenCountEstimate} tokens</span>
                  </div>
                  <p className="text-xs text-ink-700 line-clamp-6 leading-relaxed font-mono">
                    {chk.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-ink-100 flex items-center justify-between">
              <span className="text-xs font-mono text-ink-500">
                Grounding Engine: Google Gemini API with Zod Schema Validation
              </span>
              <button
                type="button"
                disabled={isGenerating}
                onClick={handleGenerateMCQs}
                className="px-5 py-2.5 bg-saffron hover:bg-saffron-600 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span>Generating Grounded MCQs...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Bloom-Stratified MCQs</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TRAINER REVIEW & EDIT STUDIO (HUMAN-IN-THE-LOOP) */}
        {activeStep === 'REVIEW' && (
          <div className="space-y-5">
            <div className="gov-card p-5 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-saffron font-bold">
                  Human-in-the-Loop Review Gate
                </span>
                <h2 className="font-serif font-bold text-xl text-ink-950 mt-0.5">
                  Review &amp; Approve Questions ({generatedQuestions.length} Generated)
                </h2>
                <p className="text-xs text-ink-600">
                  Every AI-synthesized question is cited to its source chunk. Faculty may edit options, verify keys, or discard questions before publishing.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="px-3 py-2 text-xs rounded-md border border-ink-200 bg-paper-50 text-ink-900 font-mono"
                >
                  <option value="JSO Induction Batch 2026 (NSSTA)">Assign: JSO Induction Batch 2026</option>
                  <option value="NAD Officers (Macro Accounts)">Assign: NAD Officers (Macro Accounts)</option>
                  <option value="FOD Regional Field Staff">Assign: FOD Regional Field Staff</option>
                </select>

                <button
                  type="button"
                  onClick={() => setActiveStep('PUBLISHED')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Quiz to Cohort</span>
                </button>
              </div>
            </div>

            {/* Generated Question Cards */}
            <div className="space-y-4">
              {generatedQuestions.map((q, idx) => (
                <div key={q.id} className="gov-card p-5 bg-white space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-md bg-ink-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-chakra-50 text-chakra-800 border border-chakra-200">
                        Bloom: {q.bloomLevel}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-paper-100 text-ink-700 border border-ink-200">
                        {q.difficulty}
                      </span>
                      <span className="text-xs font-mono text-ink-400">
                        Source: {q.sourceChunkRef}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="p-1.5 rounded text-coral hover:bg-coral-50 transition-colors"
                        title="Discard Question"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  {editingQId === q.id ? (
                    <div className="space-y-2">
                      <textarea
                        defaultValue={q.questionText}
                        id={`edit-${q.id}`}
                        rows={2}
                        className="w-full p-2 text-xs font-medium rounded border border-ink-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const val = (document.getElementById(`edit-${q.id}`) as HTMLTextAreaElement)?.value;
                          if (val) handleUpdateQuestion(q.id, val);
                        }}
                        className="px-3 py-1 bg-ink-900 text-white text-xs font-semibold rounded"
                      >
                        Save Question Text
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-base text-ink-950">
                        {q.questionText}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setEditingQId(q.id)}
                        className="text-xs text-ink-400 hover:text-ink-900 font-mono"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                      const optText = q[`option${optKey}` as keyof MCQQuestion] as string;
                      const isCorrect = q.correctOption === optKey;
                      return (
                        <div
                          key={optKey}
                          className={`p-3 rounded-md border flex items-start gap-2.5 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                              : 'bg-paper-50 border-ink-200 text-ink-700'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${
                              isCorrect ? 'bg-emerald-600 text-white' : 'bg-ink-200 text-ink-800'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span className="leading-relaxed">{optText}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation & Citation */}
                  <div className="p-3 bg-paper-50 rounded-md border border-ink-200 text-xs text-ink-700 space-y-1">
                    <div className="font-semibold text-ink-900 flex items-center gap-1.5 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pedagogical Explanation:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: PUBLISHED SUCCESS CONFIRMATION */}
        {activeStep === 'PUBLISHED' && (
          <div className="gov-card p-8 bg-white text-center max-w-lg mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="font-serif font-bold text-2xl text-ink-950">
              Assessment Successfully Published!
            </h2>
            <p className="text-xs text-ink-600 leading-relaxed">
              The quiz <strong>Assessment on {docTitle}</strong> ({generatedQuestions.length} questions) has been published to <strong>{selectedCohort}</strong>. Learner responses will automatically calibrate their competency passbook.
            </p>

            <div className="pt-3 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveStep('UPLOAD')}
                className="px-4 py-2 bg-paper-100 hover:bg-paper-200 text-ink-800 text-xs font-semibold rounded-md border border-ink-200 transition-colors"
              >
                Create Another Assessment
              </button>
              <a
                href="/assessment"
                className="px-4 py-2 bg-saffron hover:bg-saffron-600 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Test Player Experience →
              </a>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
