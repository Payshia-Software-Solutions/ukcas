"use client";
import { useEffect } from "react";
import { useLoader } from "@/app/context/LoaderContext";
import Sidebar from "@/components/Sidebar";

export default function DashboardContent() {
  const { setLoading } = useLoader();

  useEffect(() => {
  setLoading(false);
}, [setLoading]);


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </main>
    </div>
  );
}
