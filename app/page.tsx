import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-100 to-purple-100 text-gray-800">
      <h1 className="text-5xl font-extrabold mb-6 text-center leading-tight">
        AI Trip Planner
      </h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Let AI craft your perfect adventure. Generate personalized itineraries in seconds.
      </p>
      <Link href="/new-trip" className="btn-primary px-8 py-3 text-lg">
        Create New Trip
      </Link>
    </div>
  );
}
