"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PromptGenerator } from "@/components/PromptGenerator";
import { PromptOutput } from "@/components/PromptOutput";
import { ExamplePrompts } from "@/components/ExamplePrompts";
import { PromptHistory } from "@/components/PromptHistory";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { Toast, ToastState } from "@/components/Toast";
import { HISTORY_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/constants";
import {
  ExampleIdea,
  GeneratedPromptItem,
  GeneratePromptResponse,
  PromptCategory,
  PromptLanguage,
} from "@/types/prompt";

export default function HomePage() {
  const [isDark, setIsDark] = useState(true);
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState<PromptCategory>("Website Development");
  const [language, setLanguage] = useState<PromptLanguage>("English");
  const [masterPrompt, setMasterPrompt] = useState("");
  const [activeModel, setActiveModel] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<GeneratedPromptItem[]>([]);
  const [toast, setToast] = useState<ToastState | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3200);
  }, []);

  // Load theme & history from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      const shouldBeDark = savedTheme ? savedTheme === "dark" : true;
      setIsDark(shouldBeDark);
      document.documentElement.classList.toggle("dark", shouldBeDark);

      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch {
      // Ignore storage access errors in restricted environments
    }
  }, []);

  const persistHistory = useCallback((items: GeneratedPromptItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage quota errors
    }
  }, []);

  const handleToggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextDark ? "dark" : "light");
    } catch {
      // Ignore storage errors
    }
  };

  const handleGenerate = async () => {
    const trimmedIdea = idea.trim();
    if (!trimmedIdea) {
      setError({
        code: "INVALID_INPUT",
        message: "Please describe your idea or requirements before clicking Generate Master Prompt.",
      });
      textareaRef.current?.focus();
      return;
    }

    setError(null);
    setIsLoading(true);
    setCopied(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: trimmedIdea,
          category,
          language,
        }),
      });

      const data: GeneratePromptResponse = await res.json().catch(() => ({
        code: "INVALID_RESPONSE",
        error: "Received an invalid response from the server.",
      }));

      if (!res.ok || !data.masterPrompt) {
        setError({
          code: data.code || "API_ERROR",
          message: data.error || "Failed to generate Master Prompt. Please try again.",
        });
        return;
      }

      setMasterPrompt(data.masterPrompt);
      setActiveModel(data.model);

      const newItem: GeneratedPromptItem = {
        id:
          typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        idea: trimmedIdea,
        category,
        language,
        masterPrompt: data.masterPrompt,
        createdAt: new Date().toISOString(),
        model: data.model,
      };

      const updatedHistory = [newItem, ...history].slice(0, 50);
      persistHistory(updatedHistory);
      showToast("Master Prompt generated and saved to history!");

      setTimeout(() => {
        document.getElementById("output-panel")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch {
      setError({
        code: "API_ERROR",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setIdea("");
    setError(null);
    textareaRef.current?.focus();
  };

  const copyText = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleCopyOutput = async () => {
    if (!masterPrompt) return;
    const ok = await copyText(masterPrompt);
    if (ok) {
      setCopied(true);
      showToast("Full Master Prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } else {
      showToast("Could not copy to clipboard. Please copy manually.", "error");
    }
  };

  const handleDownloadTxt = () => {
    if (!masterPrompt) return;
    const blob = new Blob([masterPrompt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    link.href = url;
    link.download = `promptforge-${slug}-master-prompt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Downloaded Master Prompt as .txt");
  };

  const handleEditInput = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 300);
  };

  const handleSelectExample = (example: ExampleIdea) => {
    setIdea(example.promptIdea);
    setCategory(example.category);
    setError(null);
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 300);
  };

  const handleOpenHistoryItem = (item: GeneratedPromptItem) => {
    setIdea(item.idea);
    setCategory(item.category);
    setLanguage(item.language);
    setMasterPrompt(item.masterPrompt);
    setActiveModel(item.model);
    setError(null);
    setTimeout(() => {
      document.getElementById("output-panel")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCopyHistoryItem = async (item: GeneratedPromptItem) => {
    const ok = await copyText(item.masterPrompt);
    if (ok) {
      showToast("Saved Master Prompt copied to clipboard!");
    } else {
      showToast("Could not copy to clipboard.", "error");
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const filtered = history.filter((item) => item.id !== id);
    persistHistory(filtered);
    showToast("Prompt removed from history.");
  };

  const handleClearAllHistory = () => {
    persistHistory([]);
    showToast("All prompt history cleared.");
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Ambient AI Gradient Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[820px] rounded-full bg-purple-600/15 dark:bg-purple-600/20 blur-[130px]" />
        <div className="absolute top-1/3 -right-32 h-[420px] w-[420px] rounded-full bg-blue-600/10 dark:bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 h-[380px] w-[380px] rounded-full bg-cyan-500/10 dark:bg-indigo-600/15 blur-[120px]" />
      </div>

      <Navbar
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        historyCount={history.length}
      />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-10">
        <HeroSection />

        <PromptGenerator
          idea={idea}
          onIdeaChange={setIdea}
          category={category}
          onCategoryChange={setCategory}
          language={language}
          onLanguageChange={setLanguage}
          isLoading={isLoading}
          error={error}
          onGenerate={handleGenerate}
          onClear={handleClear}
          textareaRef={textareaRef}
        />

        <PromptOutput
          masterPrompt={masterPrompt}
          category={category}
          language={language}
          model={activeModel}
          isLoading={isLoading}
          copied={copied}
          onCopy={handleCopyOutput}
          onRegenerate={handleGenerate}
          onEditInput={handleEditInput}
          onDownload={handleDownloadTxt}
        />

        <ExamplePrompts onSelectExample={handleSelectExample} />

        <PromptHistory
          history={history}
          onOpen={handleOpenHistoryItem}
          onCopy={handleCopyHistoryItem}
          onDelete={handleDeleteHistoryItem}
          onClearAll={handleClearAllHistory}
        />

        <AboutSection />
      </main>

      <Footer />

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
