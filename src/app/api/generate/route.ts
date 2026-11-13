export const maxDuration = 60;
import { NextRequest, NextResponse } from "next/server";
import {
  buildMasterPromptSystemInstruction,
  buildUserPromptPayload,
} from "@/lib/masterPromptSystem";
import { PROMPT_CATEGORIES, PROMPT_LANGUAGES } from "@/lib/constants";
import {
  GeneratePromptRequest,
  GeneratePromptResponse,
  PromptCategory,
  PromptLanguage,
} from "@/types/prompt";

const VALID_LANGUAGES = new Set(PROMPT_LANGUAGES.map((l) => l.value));
const VALID_CATEGORIES = new Set<PromptCategory>(PROMPT_CATEGORIES);

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "MISSING_API_KEY",
          error:
            "Gemini API key is not configured. Add GEMINI_API_KEY to your .env.local file (for local development) or in Vercel Project Settings > Environment Variables.",
        },
        { status: 503 }
      );
    }

    let body: Partial<GeneratePromptRequest>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "INVALID_INPUT",
          error: "Invalid JSON request body.",
        },
        { status: 400 }
      );
    }

    const idea = typeof body.idea === "string" ? body.idea.trim() : "";
    if (!idea) {
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "INVALID_INPUT",
          error: "Please enter your idea or requirements before generating a Master Prompt.",
        },
        { status: 400 }
      );
    }

    if (idea.length < 5) {
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "INVALID_INPUT",
          error: "Your idea is too short. Please provide at least a few words describing what you want ChatGPT to do.",
        },
        { status: 400 }
      );
    }

    if (idea.length > 8000) {
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "INVALID_INPUT",
          error: "Input exceeds the 8,000-character limit. Please shorten your description slightly.",
        },
        { status: 400 }
      );
    }

    const category: PromptCategory =
      body.category && VALID_CATEGORIES.has(body.category)
        ? body.category
        : "General Purpose";

    const language: PromptLanguage =
      body.language && VALID_LANGUAGES.has(body.language)
        ? body.language
        : "English";

    const model = process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 58000);
    let geminiRes: Response;
    try {
      geminiRes = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: buildMasterPromptSystemInstruction(category, language),
              },
            ],
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: buildUserPromptPayload(idea, category, language),
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 2500,
          },
        }),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timeoutId);
      const isAbort = err instanceof Error && err.name === "AbortError";
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "API_ERROR",
          error: isAbort
            ? "The AI request timed out. Please try again."
            : "Network error while contacting the Gemini API. Please check your connection and try again.",
        },
        { status: 504 }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    if (!geminiRes.ok) {
      const errorData = await geminiRes.json().catch(() => null);
      const upstreamMessage =
        errorData?.error?.message || `Gemini API returned status ${geminiRes.status}.`;

      if (geminiRes.status === 429) {
        return NextResponse.json<GeneratePromptResponse>(
          {
            code: "RATE_LIMIT",
            error:
              "Gemini API rate limit reached. Please wait a moment and try again.",
          },
          { status: 429 }
        );
      }

      if (geminiRes.status === 401 || geminiRes.status === 403) {
        return NextResponse.json<GeneratePromptResponse>(
          {
            code: "API_ERROR",
            error:
              "Gemini API key was rejected. Please verify your GEMINI_API_KEY in environment variables.",
          },
          { status: 401 }
        );
      }

      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "API_ERROR",
          error: upstreamMessage,
        },
        { status: geminiRes.status >= 500 ? 502 : 400 }
      );
    }

    const data = await geminiRes.json();
    const parts = data?.candidates?.[0]?.content?.parts;
    const generatedText = Array.isArray(parts)
      ? parts
          .map((p: { text?: string }) => (typeof p?.text === "string" ? p.text : ""))
          .join("")
          .trim()
      : "";

    if (!generatedText) {
      const finishReason = data?.candidates?.[0]?.finishReason;
      return NextResponse.json<GeneratePromptResponse>(
        {
          code: "INVALID_RESPONSE",
          error: finishReason
            ? `The AI did not return a prompt (reason: ${finishReason}). Try rephrasing your idea.`
            : "The AI returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json<GeneratePromptResponse>({
      masterPrompt: generatedText,
      model,
    });
  } catch {
    return NextResponse.json<GeneratePromptResponse>(
      {
        code: "API_ERROR",
        error: "An unexpected server error occurred while generating your prompt.",
      },
      { status: 500 }
    );
  }
}
