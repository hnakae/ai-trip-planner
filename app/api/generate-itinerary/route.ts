import { NextResponse } from "next/server";
import { generateItinerary } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await generateItinerary(body);
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate itinerary" },
      { status: 500 }
    );
  }
}

