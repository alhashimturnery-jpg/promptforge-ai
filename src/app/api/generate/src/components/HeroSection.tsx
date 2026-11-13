import { Sparkles, ArrowDown, Layers, ShieldCheck, Globe } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-14 pb-10 sm:pt-20 sm:pb-14 text-center"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-purple-500 dark:text-purple-400" />
          <span>AI-Powered ChatGPT Master Prompt Architect</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
          Turn Your Ideas Into{" "}
          <span className="gradient-text">Powerful ChatGPT Prompts.</span>
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Transform simple ideas into professional, detailed and intelligent AI
          instructions.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#generator"
            className="gradient-button inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm sm:text-base font-semibold"
          >
            <span>Start Generating</span>
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#examples"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-5 py-3 text-sm sm:text-base font-medium text-slate-700 hover:bg-slate-100 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            <span>Explore Examples</span>
          </a>
        </div>

        {/* Subtle Feature Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-violet-500" />
            <span>11-Section Master Blueprint</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-blue-500" />
            <span>5 Output Languages</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-cyan-500" />
            <span>Secure Server-Side Gemini Engine</span>
          </div>
        </div>
      </div>
    </section>
  );
}
