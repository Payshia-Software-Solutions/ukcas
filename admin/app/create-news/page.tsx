// app/dashboard/page.tsx
"use client";
import CreateNews from '@/components/Create-News/CreateNews';

export default function DashboardPage() {


  return (
    <div className="min-h-screen bg-gray-100">
      <CreateNews />
    </div>
  );
}