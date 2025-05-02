"use client";

import Sidebar from '@/components//Sidebar'; // ✅ Import Sidebar
export default function Dashboard() {
 
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar /> {/* ✅ Add Sidebar component here */}

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Dashboard</h1>
          <p className="text-center md:text-left">Welcome to the Admin Dashboard!</p>
        </div>
      </div>
    </div>
  );
}
