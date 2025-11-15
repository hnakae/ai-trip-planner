"use client";

import { useSearchParams } from "next/navigation";
import { Itinerary } from "@/lib/types";

export default function CompareClient() {
  const params = useSearchParams();
  const plans: Itinerary = JSON.parse(params.get("plans") || "{}");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="border rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-2">Plan A</h2>
        <pre className="text-sm bg-gray-100 p-2 rounded">
          {JSON.stringify(plans.planA, null, 2)}
        </pre>
        <button className="btn-primary mt-4">Select Plan A</button>
      </div>

      <div className="border rounded-xl p-4 shadow">
        <h2 className="text-xl font-bold mb-2">Plan B</h2>
        <pre className="text-sm bg-gray-100 p-2 rounded">
          {JSON.stringify(plans.planB, null, 2)}
        </pre>
        <button className="btn-primary mt-4">Select Plan B</button>
      </div>
    </div>
  );
}
