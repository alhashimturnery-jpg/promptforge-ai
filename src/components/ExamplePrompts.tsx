"use client";

import {
  ShoppingBag,
  Users,
  Briefcase,
  Smartphone,
  TrendingUp,
  Bot,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";
import { EXAMPLE_IDEAS } from "@/lib/constants";
import { ExampleIdea } from "@/types/prompt";

interface ExamplePromptsProps {
  onSelectExample: (example: ExampleIdea) => void;
}

function getExampleIcon(iconName: string) {
  switch (iconName) {
    case "ShoppingBag":
      return <ShoppingBag className="h-5 w-5 text-violet-500 dark:text-violet-400" />;
    case "Users":
      return <Users className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    case "Briefcase":
      return <Briefcase className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />;
    case "Smartphone":
      return <Smartphone className="h-5 w-5 text-purple-500 dark:text-purple-400" />;
    case "TrendingUp":
      return <TrendingUp className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
    case "Bot":
    default:
      return <Bot className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
  }
}

export function ExamplePrompts({ onSelectExample }: ExamplePromptsProps) {
  return (
    <section id="examples" className="mt-16 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Quick Start</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Example Ideas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Click any card to auto-fill the generator with a starter concept and matching category.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMPLE_IDEAS.map((example) => (
          <button
            key={example.id}
            type="button"
            onClick={() => onSelectExample(example)}
            className="glass-card group text-left rounded-2xl p-5 hover:border-purple-500/40 dark:hover:border-purple-400/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
                {getExampleIcon(example.iconName)}
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
              {example.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {example.description}
            </p>
            <span className="mt-3 inline-block rounded-full bg-purple-500/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-700 dark:text-purple-300">
              {example.category}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
