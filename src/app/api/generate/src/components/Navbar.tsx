"use client";

import { useState } from "react";
import { Sparkles, Sun, Moon, Menu, X } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  historyCount: number;
}

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Generate Prompt", href: "#generator" },
  { label: "Prompt History", href: "#history" },
  { label: "About", href: "#about" },
];

export function Navbar({ isDark, onToggleTheme, historyCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 dark:border-white/10 bg-white/75 dark:bg-[#050814]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            PROMPTFORGE <span className="gradient-text">AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            >
              <span>{link.label}</span>
              {link.href === "#history" && historyCount > 0 && (
                <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-300">
                  {historyCount}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-slate-200/70 dark:border-white/10 bg-white/95 dark:bg-[#080d1f]/95 px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
            >
              <span>{link.label}</span>
              {link.href === "#history" && historyCount > 0 && (
                <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs font-semibold text-purple-600 dark:text-purple-300">
                  {historyCount}
                </span>
              )}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
