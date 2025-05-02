// app/dashboard/page.tsx
"use client";
import Records from '@/components/Records/Records';

export default function DashboardPage() {


  return (
    <div className="min-h-screen bg-gray-100">
      <Records />
    </div>
  );
}