// app/new-trip/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    preferences: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit() {
    const q = encodeURIComponent(JSON.stringify(form));
    router.push(`/generate?data=${q}`);
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold">Create New Trip</h1>

      <input name="destination" placeholder="Destination" className="input" onChange={handleChange} />

      <input type="date" name="startDate" className="input" onChange={handleChange} />
      <input type="date" name="endDate" className="input" onChange={handleChange} />

      <input name="budget" placeholder="Budget" className="input" onChange={handleChange} />

      <input name="preferences" placeholder="Preferences (e.g., Thai, parks)" className="input" onChange={handleChange} />

      <button onClick={submit} className="btn-primary w-full">Generate Itinerary</button>
    </div>
  );
}
