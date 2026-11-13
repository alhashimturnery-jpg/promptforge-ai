# PROMPTFORGE AI – ChatGPT Master Prompt Generator

PROMPTFORGE AI is a Next.js, TypeScript, and Tailwind CSS web application that converts simple ideas or rough requirements into structured, copy-paste-ready **ChatGPT Master Prompts** using the Google Gemini API on a secure server-side route.

## Features

- **11-Part Master Prompt Engine**: Expands ideas into Role & Expertise, Project Overview, Objectives, Detailed Requirements, Functional Requirements, Design, Technical Requirements, Workflow, Rules & Restrictions, Output Format, and Quality Checklist.
- **11 Domain Categories**: Website Development, Mobile App Development, Business Management, Marketing & SEO, Content Writing, Business Planning, Automation, Software Development, Education, General Purpose, and Other.
- **5 Output Languages**: English, Urdu, Roman Urdu, Arabic, and Hindi (with automatic RTL support for Urdu and Arabic).
- **Interactive Output Panel**: Copy full prompt with toast confirmation, Regenerate, Edit Input, Download `.txt`, plus live Word and Character counts.
- **Local Prompt History**: Automatically saves generated prompts in browser `localStorage` with Open, Copy, Delete, and Clear All actions.
- **Clickable Example Cards**: Pre-fills starter ideas for E-commerce, CRM, Employee Management, Mobile Apps, Marketing Strategy, and AI Chatbots.
- **Dark / Light Theme Toggle**: Premium dark navy AI SaaS aesthetic by default with a responsive theme toggle.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI & Styling**: React 18, Tailwind CSS, Lucide React Icons
- **AI Backend**: Google Gemini API via server-side `/api/generate` route

## Environment Variables

Create a `.env.local` file in the root directory (see `.env.example`):

```env
GEMINI_API_KEY=your_actual_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

- `GEMINI_API_KEY` *(Required)*: Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).
- `GEMINI_MODEL` *(Optional)*: Defaults to `gemini-2.5-flash`. Change this anytime without editing code.

## Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and paste your `GEMINI_API_KEY`.
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. **Test production build**:
   ```bash
   npm run build
   npm start
   ```

## Deploying to Vercel

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PROMPTFORGE AI"
   git branch -M main
   git remote add origin https://github.com/<your-username>/promptforge-ai.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and click **Add New → Project**.
3. Import your `promptforge-ai` GitHub repository.
4. In **Environment Variables**, add:
   - `GEMINI_API_KEY` = your Gemini API key
   - `GEMINI_MODEL` = `gemini-2.5-flash` (optional)
5. Click **Deploy**. Vercel will automatically build and host the site.
