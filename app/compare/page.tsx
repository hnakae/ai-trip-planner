// app/compare/page.tsx
import { Suspense } from "react";
import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xl">Loading plans...</div>}>
      <CompareClient />
    </Suspense>
  );
}
