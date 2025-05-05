// app/dashboard/page.tsx
"use client";
import DashboardContent from '@/components/dashboard/dashboard';

export default function DashboardPage() {


  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardContent />
    </div>
  );
}