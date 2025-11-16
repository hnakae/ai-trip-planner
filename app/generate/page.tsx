// app/generate/page.tsx

import { Suspense } from "react";
import GenerateClient from "./GenerateClient";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GeneratePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner />
          <p className="text-2xl animate-pulse ml-4">Generating Plan A & B...</p>
        </div>
      }
    >
      <GenerateClient />
    </Suspense>
  );
}
