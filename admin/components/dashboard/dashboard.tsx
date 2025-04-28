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
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col justify-between bg-gray-900 text-white p-6">
        <div>
          <div className="text-2xl md:text-xl font-bold mb-6 text-center md:text-left">Company Name</div>
          <div className="space-y-4">
            {/* Dashboard Menu */}
            <div>
              <button
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span className="text-lg">Dashboard</span>
                <span>{isDashboardOpen ? '▲' : '▼'}</span>
              </button>
              {isDashboardOpen && (
                <div className="ml-4 space-y-2">
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push('/create-institutes')}
                  >
                    Create Institutes
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
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
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
                onClick={() => setIsTransactionOpen(!isTransactionOpen)}
              >
                <span className="text-lg">Transaction</span>
                <span>{isTransactionOpen ? '▲' : '▼'}</span>
              </button>
              {isTransactionOpen && (
                <div className="ml-4 space-y-2">
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push('/pending-certificate')}
                  >
                    Pending Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push('/issued-certificate')}
                  >
                    Issued Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push('/institute-payment')}
                  >
                    Institute Payment
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push('/create-news')}
                  >
                    Create News
                  </button>
                </div>
              )}
            </div>

            {/* Records (no sub items yet) */}
            <div>
              <button
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span className="text-lg">Records</span>
                <span>{isDashboardOpen ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            className="w-full bg-white text-red-600 px-4 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

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
