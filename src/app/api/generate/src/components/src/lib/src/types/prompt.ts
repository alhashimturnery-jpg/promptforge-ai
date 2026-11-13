export type PromptCategory =
  | "Website Development"
  | "Mobile App Development"
  | "Business Management"
  | "Marketing & SEO"
  | "Content Writing"
  | "Business Planning"
  | "Automation"
  | "Software Development"
  | "Education"
  | "General Purpose"
  | "Other";

export type PromptLanguage =
  | "English"
  | "Urdu"
  | "Roman Urdu"
  | "Arabic"
  | "Hindi";

export interface GeneratedPromptItem {
  id: string;
  idea: string;
  category: PromptCategory;
  language: PromptLanguage;
  masterPrompt: string;
  createdAt: string;
  model?: string;
}

export interface GeneratePromptRequest {
  idea: string;
  category: PromptCategory;
  language: PromptLanguage;
}

export interface GeneratePromptResponse {
  masterPrompt?: string;
  model?: string;
  error?: string;
  code?: "MISSING_API_KEY" | "INVALID_INPUT" | "RATE_LIMIT" | "API_ERROR" | "INVALID_RESPONSE";
}

export interface ExampleIdea {
  id: string;
  title: string;
  category: PromptCategory;
  description: string;
  promptIdea: string;
  iconName: string;
}
