// lib/types.ts

/**
 * A generic place returned by AI or Google Places.
 * Flexible but strongly typed.
 */
export interface Place {
  name: string;
  address?: string;
  rating?: number;
  url?: string;
  placeId?: string;
  priceLevel?: number;
  types?: string[];
  notes?: string;
  distanceMeters?: number;
  latitude?: number;
  longitude?: number;

  // Allow additional AI-generated fields without errors.
  [key: string]: unknown;
}

/**
 * One day's structured itinerary.
 */
export interface DailyPlan {
  date: string;

  breakfast?: Place | null;
  lunch?: Place | null;
  dinner?: Place | null;

  activity?: Place | null;   // parks, aquariums, museums, etc.
  sweets?: Place | null;     // boba, coffee, desserts

  weatherNotes?: string;
  clothing?: string;
  timeSuggestions?: string;

  [key: string]: unknown;
}

/**
 * Combined A/B itinerary returned by the AI.
 */
export interface Itinerary {
  planA: DailyPlan[];
  planB: DailyPlan[];
}

/**
 * The form data submitted by the user in Phase 1.
 */
export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  preferences?: string;

  [key: string]: unknown;
}
