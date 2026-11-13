import { Cpu, CheckCircle2, Layers, Zap } from "lucide-react";

const MASTER_SECTIONS = [
  "1. Role & Expertise",
  "2. Project Overview",
  "3. Main Objectives",
  "4. Detailed Requirements",
  "5. Functional Requirements",
  "6. Design Requirements",
  "7. Technical Requirements",
  "8. Execution Workflow",
  "9. Rules & Restrictions",
  "10. Output Format",
  "11. Quality Checklist",
];

export function AboutSection() {
  return (
    <section id="about" className="mt-16 scroll-mt-24">
      <div className="glass-card rounded-3xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
              <Cpu className="h-3.5 w-3.5" />
              <span>Why Master Prompts?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Stop Getting Generic ChatGPT Answers.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              A single-line prompt like <span className="font-mono text-xs bg-slate-200/70 dark:bg-white/10 px-2 py-0.5 rounded">&ldquo;Create a website for my business&rdquo;</span> forces AI to guess your goals, audience, architecture, and quality bar.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              PROMPTFORGE AI uses Gemini on a secure server-side engine to expand your rough idea into a structured, domain-aware Master Prompt—complete with role framing, constraints, workflow, and a verification checklist.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 p-3.5">
                <Zap className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Intelligent Expansion
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Fills in missing technical and structural details without inventing fake facts.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 rounded-2xl border border-slate-200/70 dark:border-white/10 bg-slate-50/70 dark:bg-white/5 p-3.5">
                <Layers className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Copy-Paste Ready
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Formatted cleanly so you can paste directly into ChatGPT or export as TXT.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 11-Section Blueprint Card */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-100/70 dark:bg-[#040711]/80 p-5 sm:p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-4">
              11-Part Master Prompt Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MASTER_SECTIONS.map((sec) => (
                <div
                  key={sec}
                  className="flex items-center gap-2 rounded-xl bg-white/80 dark:bg-white/5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-white/5"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
