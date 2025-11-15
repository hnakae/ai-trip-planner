import OpenAI from "openai";
import { Itinerary } from "./types";

export async function generateItinerary(
  formData: Record<string, unknown>
): Promise<Itinerary> {
  
  // Create client at runtime (NOT at module load time)
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const prompt = `
Generate two itineraries...
${JSON.stringify(formData, null, 2)}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
