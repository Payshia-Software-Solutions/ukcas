"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex flex-col justify-between bg-gray-900 text-white w-64 p-6">
        {/* Top section */}
        <div>
          <div className="text-xl font-bold mb-6">Company Name</div>
          <div className="space-y-4">
            {/* Dashboard Menu */}
            <div>
              <button 
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span className="text-lg">Dashboard</span>
                <span>{isDashboardOpen ? '▲' : '▼'}</span>
              </button>
              {isDashboardOpen && (
                <div className="ml-4 space-y-2">
                  <button 
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/create-institutes')}
                  >
                    Create Institutes
                  </button>
                  <button 
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/view-content')}
                  >
                    View Request Forms
                  </button>
                </div>
              )}
            </div>

            {/* Transaction Menu */}
            <div>
              <button 
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsTransactionOpen(!isTransactionOpen)}
              >
                <span className="text-lg">Transaction</span>
                <span>{isTransactionOpen ? '▲' : '▼'}</span>
              </button>
              {isTransactionOpen && (
                <div className="ml-4 space-y-2">
                  <button 
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/transaction')}
                  >
                    Records
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Logout Button */}
        <div className="mt-6">
          <button 
            className="bg-white text-red-600 px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 transition duration-200 w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <p>Welcome to the Admin Dashboard!</p>
        </div>
      </div>
    </div>
  );
}
