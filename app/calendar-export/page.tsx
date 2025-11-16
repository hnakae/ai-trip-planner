// app/calendar-export/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { DailyPlan } from "@/lib/types";
import { createIcsString } from "@/lib/calendar";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link"; // Import Link

function CalendarExportClient() {
  const params = useSearchParams();
  const planJson = params.get("plan");

  function handleDownload() {
    if (!planJson) return;

    try {
      const plan: DailyPlan[] = JSON.parse(planJson);
      const icsString = createIcsString(plan);

      if (icsString) {
        const blob = new Blob([icsString], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "trip-itinerary.ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Failed to generate or download ICS file:", error);
      alert("There was an error creating the calendar file.");
    }
  }

  if (!planJson) {
    return (
      <div className="text-center p-10">
        <p>No plan data found to export.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto text-center py-20 space-y-4">
      <h1 className="text-3xl font-bold">Export Your Itinerary</h1>
      <p>Your trip plan is ready to be added to your calendar.</p>
      <button onClick={handleDownload} className="btn-primary">
        Download .ICS File
      </button>
      <Link href="/" className="btn-secondary block mt-4">
        Back to Home
      </Link>
    </div>
  );
}

export default function CalendarExportPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CalendarExportClient />
    </Suspense>
  );
}
