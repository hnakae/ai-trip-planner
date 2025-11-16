"use client";

import { useSearchParams } from "next/navigation";
import { Itinerary } from "@/lib/types";
import PlanComparison from "@/components/PlanComparison";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CompareClient() {
  const params = useSearchParams();
  const plansJson = params.get("plans");

  if (!plansJson) {
    // If plansJson is not immediately available, show a spinner.
    // This might happen if there's a very brief delay in searchParams being ready,
    // or if the user navigated here incorrectly.
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
        <p className="text-xl ml-4">Loading plans...</p>
      </div>
    );
  }

  try {
    const plans: Itinerary = JSON.parse(plansJson);

    if (!plans || (!plans.planA && !plans.planB)) {
      throw new Error("Invalid plan structure");
    }

    return <PlanComparison plans={plans} />;
  } catch (error) {
    console.error("Failed to parse plans:", error);
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500">
            Could not load itinerary plans.
          </p>
          <p className="text-sm text-gray-500">
            The data might be corrupted. Please try generating the trip again.
          </p>
        </div>
      </div>
    );
  }
}
