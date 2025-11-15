// app/generate/page.tsx

import { Suspense } from "react";
import GenerateClient from "./GenerateClient";

export default function GeneratePage() {
  return (
    <Suspense fallback={<div className="p-6 text-xl">Generating your trip...</div>}>
      <GenerateClient />
    </Suspense>
  );
}
