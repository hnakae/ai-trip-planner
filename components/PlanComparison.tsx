// components/PlanComparison.tsx
import { Itinerary } from "@/lib/types";
import PlanViewer from "./PlanViewer";
import { useRouter } from "next/navigation";

interface PlanComparisonProps {
  plans: Itinerary;
}

export default function PlanComparison({ plans }: PlanComparisonProps) {
  const router = useRouter();

  function handleSelectPlan(plan: 'planA' | 'planB') {
    const selectedPlan = plans[plan];
    const q = encodeURIComponent(JSON.stringify(selectedPlan));
    router.push(`/calendar-export?plan=${q}`);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="border rounded-xl p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Plan A</h2>
        <PlanViewer plan={plans.planA} />
        <button onClick={() => handleSelectPlan('planA')} className="btn-primary w-full mt-4">
          Select Plan A
        </button>
      </div>

      <div className="border rounded-xl p-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Plan B</h2>
        <PlanViewer plan={plans.planB} />
        <button onClick={() => handleSelectPlan('planB')} className="btn-primary w-full mt-4">
          Select Plan B
        </button>
      </div>
    </div>
  );
}
