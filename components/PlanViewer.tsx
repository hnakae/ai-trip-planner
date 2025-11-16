// components/PlanViewer.tsx
import { DailyPlan, Place } from "@/lib/types";
import SummaryCard from "./SummaryCard";

interface PlanViewerProps {
  plan: DailyPlan[];
}

function PlaceDetails({ place }: { place: Place | null | undefined }) {
  if (!place) return <p className="text-gray-500">Not specified</p>;
  return (
    <div>
      <p className="font-semibold">{place.name}</p>
      {place.address && <p className="text-xs text-gray-600">{place.address}</p>}
      {place.notes && <p className="mt-1 text-xs">{place.notes}</p>}
    </div>
  );
}

export default function PlanViewer({ plan }: PlanViewerProps) {
  if (!plan || plan.length === 0) {
    return <p>No plan available.</p>;
  }

  return (
    <div className="space-y-6">
      {plan.map((day, index) => (
        <div key={index} className="p-4 border rounded-lg">
          <h3 className="text-lg font-bold mb-4">
            Day {index + 1} ({new Date(day.date).toLocaleDateString()})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryCard title="Breakfast">
              <PlaceDetails place={day.breakfast} />
            </SummaryCard>
            <SummaryCard title="Lunch">
              <PlaceDetails place={day.lunch} />
            </SummaryCard>
            <SummaryCard title="Dinner">
              <PlaceDetails place={day.dinner} />
            </SummaryCard>
            <SummaryCard title="Activity">
              <PlaceDetails place={day.activity} />
            </SummaryCard>
            <SummaryCard title="Sweets">
              <PlaceDetails place={day.sweets} />
            </SummaryCard>
            <SummaryCard title="Weather">
              <p>{day.weatherNotes}</p>
            </SummaryCard>
            <SummaryCard title="Clothing">
              <p>{day.clothing}</p>
            </SummaryCard>
            <SummaryCard title="Time Suggestions">
              <p>{day.timeSuggestions}</p>
            </SummaryCard>
          </div>
        </div>
      ))}
    </div>
  );
}
