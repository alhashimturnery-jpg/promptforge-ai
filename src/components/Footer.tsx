import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/70 dark:border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            PROMPTFORGE AI
          </span>
          <span>— ChatGPT Master Prompt Generator</span>
        </div>
        <p className="text-center sm:text-right">
          Built with Next.js, TypeScript, Tailwind CSS &amp; Gemini API.
        </p>
      </div>
    </footer>
  );
}
