// lib/ai.ts
import OpenAI from "openai";
import { Itinerary } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateItinerary(formData: Record<string, unknown>): Promise<Itinerary> {
  const prompt = `
You are an expert travel planner. Generate TWO different itineraries (Plan A and Plan B)
based on the user's input:

${JSON.stringify(formData, null, 2)}

Return JSON with this shape:
{
  "planA": [...],
  "planB": [...]
}`;

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(completion.choices[0].message.content || "{}");
}
