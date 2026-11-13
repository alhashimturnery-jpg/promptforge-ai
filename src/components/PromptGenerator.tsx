"use client";

import { RefObject } from "react";
import {
  Sparkles,
  Trash2,
  Lightbulb,
  Loader2,
  AlertTriangle,
  FolderKanban,
  Languages,
} from "lucide-react";
import { PROMPT_CATEGORIES, PROMPT_LANGUAGES } from "@/lib/constants";
import { PromptCategory, PromptLanguage } from "@/types/prompt";

interface PromptGeneratorProps {
  idea: string;
  onIdeaChange: (value: string) => void;
  category: PromptCategory;
  onCategoryChange: (value: PromptCategory) => void;
  language: PromptLanguage;
  onLanguageChange: (value: PromptLanguage) => void;
  isLoading: boolean;
  error: { message: string; code?: string } | null;
  onGenerate: () => void;
  onClear: () => void;
  textareaRef: RefObject<HTMLTextAreaElement>;
}

export function PromptGenerator({
  idea,
  onIdeaChange,
  category,
  onCategoryChange,
  language,
  onLanguageChange,
  isLoading,
  error,
  onGenerate,
  onClear,
  textareaRef,
}: PromptGeneratorProps) {
  const charCount = idea.length;

  return (
    <section id="generator" className="scroll-mt-24">
      <div className="glass-card rounded-3xl p-5 sm:p-8 relative overflow-hidden">
        {/* Subtle top gradient border accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-blue-500" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <span>Master Prompt Studio</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Enter a rough idea or detailed requirements — AI will architect a complete ChatGPT prompt.
            </p>
          </div>
          <a
            href="#examples"
            className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-purple-500/25 bg-purple-500/10 px-3.5 py-2 text-xs sm:text-sm font-medium text-purple-700 hover:bg-purple-500/20 dark:text-purple-300 transition-colors"
          >
            <Lightbulb className="h-4 w-4" />
            <span>Example Ideas</span>
          </a>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="prompt-category"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
            >
              <FolderKanban className="h-3.5 w-3.5 text-purple-500" />
              <span>Prompt Category</span>
            </label>
            <select
              id="prompt-category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value as PromptCategory)}
              disabled={isLoading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-slate-950/70 dark:text-white transition-all"
            >
              {PROMPT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="prompt-language"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
            >
              <Languages className="h-3.5 w-3.5 text-blue-500" />
              <span>Output Language</span>
            </label>
            <select
              id="prompt-language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as PromptLanguage)}
              disabled={isLoading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-white/10 dark:bg-slate-950/70 dark:text-white transition-all"
            >
              {PROMPT_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label} ({lang.nativeHint})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Input Area */}
        <div className="relative">
          <label htmlFor="idea-input" className="sr-only">
            Describe what you want ChatGPT to do
          </label>
          <textarea
            ref={textareaRef}
            id="idea-input"
            rows={6}
            value={idea}
            onChange={(e) => onIdeaChange(e.target.value)}
            disabled={isLoading}
            placeholder="Describe what you want ChatGPT to do. Explain your idea, project or requirements…"
            className="w-full resize-y min-h-[160px] rounded-2xl border border-slate-200 bg-white/90 p-4 sm:p-5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-slate-950/75 dark:text-white dark:placeholder:text-slate-500 transition-all leading-relaxed"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 px-1">
            <span>Tip: Mention your target audience, tech stack, or business goal for even sharper results.</span>
            <span className="tabular-nums shrink-0 ml-2">{charCount.toLocaleString()} / 8,000</span>
          </div>
        </div>

        {/* Error / Setup Alert */}
        {error && (
          <div
            role="alert"
            className="mt-4 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-200 flex items-start gap-3"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">
                {error.code === "MISSING_API_KEY"
                  ? "Gemini API Key Setup Required"
                  : "Unable to Generate Prompt"}
              </p>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{error.message}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isLoading}
            className="gradient-button inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-sm sm:text-base font-semibold disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Architecting Master Prompt…</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                <span>Generate Master Prompt</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isLoading || !idea}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </section>
  );
}
