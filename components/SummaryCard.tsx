// components/SummaryCard.tsx
import React from "react";

interface SummaryCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export default function SummaryCard({ title, children, icon }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="font-bold">{title}</h3>
      </div>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
