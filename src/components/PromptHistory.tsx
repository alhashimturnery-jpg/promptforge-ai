"use client";

import { useState } from "react";
import {
  History,
  Copy,
  Trash2,
  FolderOpen,
  Clock,
  AlertCircle,
} from "lucide-react";
import { GeneratedPromptItem } from "@/types/prompt";

interface PromptHistoryProps {
  history: GeneratedPromptItem[];
  onOpen: (item: GeneratedPromptItem) => void;
  onCopy: (item: GeneratedPromptItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function PromptHistory({
  history,
  onOpen,
  onCopy,
  onDelete,
  onClearAll,
}: PromptHistoryProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  const handleClearClick = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    onClearAll();
    setConfirmClear(false);
  };

  return (
    <section id="history" className="mt-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <History className="h-3.5 w-3.5" />
            <span>Saved Locally</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Prompt History
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Your generated Master Prompts are automatically saved in your browser.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClearClick}
            className={`inline-flex items-center gap-2 self-start sm:self-auto rounded-xl border px-4 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              confirmClear
                ? "border-rose-500 bg-rose-600 text-white hover:bg-rose-500"
                : "border-rose-500/30 bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:text-rose-300"
            }`}
          >
            {confirmClear ? (
              <>
                <AlertCircle className="h-4 w-4" />
                <span>Click Again to Confirm Clear All</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Clear All History</span>
              </>
            )}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass-card rounded-3xl p-8 sm:p-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 mb-3">
            <History className="h-6 w-6" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No saved prompts yet
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Generate your first Master Prompt above and it will appear here for quick access, copying, and reuse.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item) => {
            const formattedDate = new Date(item.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article
                key={item.id}
                className="glass-card rounded-2xl p-5 flex flex-col justify-between gap-4 hover:border-blue-500/35 transition-colors"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-purple-500/15 px-2.5 py-0.5 text-[11px] font-medium text-purple-700 dark:text-purple-300">
                        {item.category}
                      </span>
                      <span className="rounded-full bg-blue-500/15 px-2.5 py-0.5 text-[11px] font-medium text-blue-700 dark:text-blue-300">
                        {item.language}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      {formattedDate}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {item.idea}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 font-mono leading-relaxed">
                    {item.masterPrompt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200/70 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => onOpen(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600/15 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-600/25 dark:text-purple-300 transition-colors cursor-pointer"
                  >
                    <FolderOpen className="h-3.5 w-3.5" />
                    <span>Open</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onCopy(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    aria-label="Delete prompt from history"
                    className="ml-auto inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
