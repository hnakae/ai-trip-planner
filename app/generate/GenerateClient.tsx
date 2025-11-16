// app/generate/GenerateClient.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function GenerateClient() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    async function generate() {
      const form = JSON.parse(params.get("data") || "{}");

      const result = await fetch("/api/generate-itinerary", {
        method: "POST",
        body: JSON.stringify(form),
      }).then((r) => r.json());

      const encoded = encodeURIComponent(JSON.stringify(result));
      router.push(`/compare?plans=${encoded}`);
    }

    generate();
  }, [params, router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <LoadingSpinner />
      <p className="text-2xl animate-pulse ml-4">Generating Plan A & B...</p>
    </div>
  );
}
