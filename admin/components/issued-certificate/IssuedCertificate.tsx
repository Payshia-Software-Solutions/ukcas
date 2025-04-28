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
      <div className="flex flex-col justify-between bg-gray-900 text-white w-64 p-6">
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
                    onClick={() => router.push('/pending-certificate')}
                  >
                    Pending Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/issued-certificate')}
                  >
                    Issued Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/institute-payment')}
                  >
                    Institute Payment
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                    onClick={() => router.push('/create-news')}
                  >
                    Create News
                  </button>
                </div>
              )}
            </div>
            <div>
              <button
                className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span className="text-lg">Records</span>
                <span>{isDashboardOpen ? '▲' : '▼'}</span>
              </button>
              {isDashboardOpen && (
                <div className="ml-4 space-y-2">
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            className="bg-white text-red-600 px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 transition duration-200 w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
