// app/api/generate-itinerary/route.ts
import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const itinerary = await generateItinerary(body); // returns { planA, planB }

    return NextResponse.json(itinerary);
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}
