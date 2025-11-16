// lib/openai.ts
import OpenAI from "openai";

/**
 * Safe OpenAI client instance generator.
 * IMPORTANT:
 * - Do NOT create the client at module load time.
 * - ALWAYS create it inside a function for Next.js builds.
 */
export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY in environment variables");
  }

  return new OpenAI({ apiKey });
}
