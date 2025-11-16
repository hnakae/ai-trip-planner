import { getOpenAIClient } from "./openai";
import { DailyPlan, Itinerary } from "./types";

async function generateSinglePlan(
  formData: Record<string, unknown>,
  planIdentifier: "A" | "B"
): Promise<DailyPlan[]> {
  const client = getOpenAIClient();

  const prompt = `
    Given the user's travel preferences, generate a single, complete itinerary named "Plan ${planIdentifier}".

    User Preferences:
    ${JSON.stringify(formData, null, 2)}

    Your response must be a single, valid JSON array of daily plan objects that strictly follows this structure:
    [
      {
        "date": "YYYY-MM-DD",
        "breakfast": { "name": "Restaurant Name", "address": "123 Street, City", "notes": "Why this is a good choice." },
        "lunch": { "name": "Restaurant Name", "address": "123 Street, City", "notes": "Why this is a good choice." },
        "dinner": { "name": "Restaurant Name", "address": "123 Street, City", "notes": "Why this is a good choice." },
        "activity": { "name": "Activity Name", "address": "123 Street, City", "notes": "Why this is a good choice." },
        "sweets": { "name": "Cafe or Shop Name", "address": "123 Street, City", "notes": "Boba, coffee, or dessert spot." },
        "weatherNotes": "Predicted weather for the day (e.g., 'Sunny with a high of 75°F').",
        "clothing": "Clothing recommendations based on weather (e.g., 'Light jacket, comfortable shoes').",
        "timeSuggestions": "Ideal timing for activities (e.g., 'Visit the park in the morning to avoid crowds.')."
      }
    ]

    - The plan should cover all days from the start date to the end date.
    - Ensure all fields in the JSON are filled with relevant, creative, and helpful suggestions.
    - If generating Plan B, make it distinct from a potential Plan A to give the user a real choice.
    - Do not include any text, explanations, or markdown formatting outside of the main JSON array.
  `;

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI travel planner. Your sole purpose is to generate a travel itinerary as a single, valid JSON array. Do not respond with any other text or formatting.",
      },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
  });

  const content = res.choices[0].message.content;
  if (!content) {
    throw new Error(`AI returned an empty response for Plan ${planIdentifier}`);
  }

  try {
    // The AI is asked for an array, but the response_format wraps it in an object.
    // We need to find the key and return the array.
    const parsed = JSON.parse(content);
    const key = Object.keys(parsed)[0];
    return parsed[key];
  } catch (e) {
    console.error(`Failed to parse AI response for Plan ${planIdentifier}:`, content);
    throw new Error("Invalid JSON response from AI");
  }
}

export async function generateItinerary(
  formData: Record<string, unknown>
): Promise<Itinerary> {
  try {
    const [planA, planB] = await Promise.all([
      generateSinglePlan(formData, "A"),
      generateSinglePlan(formData, "B"),
    ]);

    return { planA, planB };
  } catch (error) {
    console.error("Failed to generate itineraries in parallel:", error);
    throw new Error("Could not generate trip plans. Please try again.");
  }
}
