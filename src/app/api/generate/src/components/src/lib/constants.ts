import { ExampleIdea, PromptCategory, PromptLanguage } from "@/types/prompt";

export const PROMPT_CATEGORIES: PromptCategory[] = [
  "Website Development",
  "Mobile App Development",
  "Business Management",
  "Marketing & SEO",
  "Content Writing",
  "Business Planning",
  "Automation",
  "Software Development",
  "Education",
  "General Purpose",
  "Other",
];

export const PROMPT_LANGUAGES: { value: PromptLanguage; label: string; nativeHint: string }[] = [
  { value: "English", label: "English", nativeHint: "EN" },
  { value: "Urdu", label: "Urdu", nativeHint: "اردو" },
  { value: "Roman Urdu", label: "Roman Urdu", nativeHint: "Roman" },
  { value: "Arabic", label: "Arabic", nativeHint: "العربية" },
  { value: "Hindi", label: "Hindi", nativeHint: "हिन्दी" },
];

export const EXAMPLE_IDEAS: ExampleIdea[] = [
  {
    id: "ecommerce-website",
    title: "Create an E-commerce Website",
    category: "Website Development",
    description: "Full-featured online store with product catalog, cart, checkout, and admin dashboard.",
    promptIdea:
      "Build a modern e-commerce website for selling automotive spare parts and accessories with product search, category filters, shopping cart, order tracking, and an admin inventory dashboard.",
    iconName: "ShoppingBag",
  },
  {
    id: "crm-system",
    title: "Build a CRM System",
    category: "Business Management",
    description: "Customer relationship platform for leads, pipelines, follow-ups, and analytics.",
    promptIdea:
      "Build a customer relationship management (CRM) web application for a growing B2B service company to track leads, sales pipelines, client communication history, and automated follow-up reminders.",
    iconName: "Users",
  },
  {
    id: "employee-management",
    title: "Create an Employee Management System",
    category: "Business Management",
    description: "Staff directory, attendance tracking, leave approvals, and payroll calculations.",
    promptIdea:
      "Create an employee management system with staff profiles, daily attendance tracking, shift scheduling, leave request approvals, and monthly salary calculation.",
    iconName: "Briefcase",
  },
  {
    id: "mobile-app",
    title: "Develop a Mobile Application",
    category: "Mobile App Development",
    description: "Cross-platform iOS & Android app with smooth onboarding, notifications, and sync.",
    promptIdea:
      "Develop a cross-platform mobile application for booking car maintenance and lathe workshop appointments, featuring service selection, real-time slot availability, digital invoices, and push notifications.",
    iconName: "Smartphone",
  },
  {
    id: "marketing-strategy",
    title: "Create a Business Marketing Strategy",
    category: "Marketing & SEO",
    description: "90-day growth plan covering SEO, paid ads, social content, and conversion funnels.",
    promptIdea:
      "Create a comprehensive 90-day digital marketing and local SEO strategy to generate qualified leads, improve Google Maps visibility, and increase repeat customers for a local service business.",
    iconName: "TrendingUp",
  },
  {
    id: "ai-chatbot",
    title: "Build an AI Chatbot",
    category: "Automation",
    description: "Intelligent 24/7 customer support assistant with FAQ knowledge and lead capture.",
    promptIdea:
      "Build an AI-powered customer support chatbot that answers product and pricing questions from a knowledge base, qualifies incoming leads, and hands off complex requests to a human agent.",
    iconName: "Bot",
  },
];

export const HISTORY_STORAGE_KEY = "promptforge_ai_history_v1";
export const THEME_STORAGE_KEY = "promptforge_ai_theme_v1";
