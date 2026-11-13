"use client";

import {
  Copy,
  RefreshCw,
  Pencil,
  Download,
  Check,
  FileText,
  Cpu,
} from "lucide-react";
import { PromptCategory, PromptLanguage } from "@/types/prompt";

interface PromptOutputProps {
  masterPrompt: string;
  category: PromptCategory;
  language: PromptLanguage;
  model?: string;
  isLoading: boolean;
  copied: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onEditInput: () => void;
  onDownload: () => void;
}

export function PromptOutput({
  masterPrompt,
  category,
  language,
  model,
  isLoading,
  copied,
  onCopy,
  onRegenerate,
  onEditInput,
  onDownload,
}: PromptOutputProps) {
  if (!masterPrompt) return null;

  const trimmed = masterPrompt.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const charCount = masterPrompt.length;
  const isRtl = language === "Urdu" || language === "Arabic";

  return (
    <section
      id="output-panel"
      aria-label="Generated Master Prompt"
      className="mt-8 animate-fade-up scroll-mt-24"
    >
      <div className="glass-card rounded-3xl p-5 sm:p-8 border-purple-500/25 dark:border-purple-500/30">
        {/* Header & Metadata */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-200/80 dark:border-white/10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <FileText className="h-3.5 w-3.5" />
                <span>Master Prompt Ready</span>
              </span>
              <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-300">
                {category}
              </span>
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                {language}
              </span>
              {model && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-1 text-xs font-mono text-slate-600 dark:text-slate-300">
                  <Cpu className="h-3 w-3" />
                  {model}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white pt-1">
              Generated ChatGPT Master Prompt
            </h3>
          </div>

          {/* Counts */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            <div className="rounded-xl bg-slate-100 dark:bg-white/5 px-3 py-1.5 tabular-nums">
              <span className="text-slate-400 mr-1.5">Words:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {wordCount.toLocaleString()}
              </span>
            </div>
            <div className="rounded-xl bg-slate-100 dark:bg-white/5 px-3 py-1.5 tabular-nums">
              <span className="text-slate-400 mr-1.5">Characters:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {charCount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onCopy}
            className="gradient-button inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>Regenerate</span>
          </button>

          <button
            type="button"
            onClick={onEditInput}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit Input</span>
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Download TXT</span>
          </button>
        </div>

        {/* Prompt Content Box */}
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 sm:p-6 dark:border-white/10 dark:bg-[#040711]/90 max-h-[600px] overflow-y-auto"
        >
          <pre className="whitespace-pre-wrap break-words font-mono text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
            {masterPrompt}
          </pre>
        </div>
      </div>
    </section>
  );
}
