"use client"; // Ensure this component is client-side only

import { useState } from "react";
import { useRouter } from "next/router"; // Use useRouter for routing

const Sidebar: React.FC = () => {
  const router = useRouter(); // Get the router instance
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState<boolean>(false);

  const handleLogout = (): void => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  // Check if router is ready (can happen during SSR)
  if (!router.isReady) {
    return null; // Don't render the sidebar if router is not ready yet
  }

  return (
    <div className="w-full md:w-64 flex flex-col justify-between bg-gray-900 text-white p-6">
      <div>
        <div className="text-xl font-bold mb-6 text-center md:text-left">
          Company Name
        </div>

        <div className="space-y-4">
          {/* Dashboard Menu */}
          <div>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
            >
              <span className="text-lg">Dashboard</span>
              <span>{isDashboardOpen ? "▲" : "▼"}</span>
            </button>
            {isDashboardOpen && (
              <div className="ml-2 md:ml-4 space-y-2">
                <button
                  onClick={() => router.push("/create-institutes")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Create Institutes
                </button>
                <button
                  onClick={() => router.push("/test")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  View Request Forms
                </button>
              </div>
            )}
          </div>

          {/* Transaction Menu */}
          <div>
            <button
              onClick={() => setIsTransactionOpen(!isTransactionOpen)}
              className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
            >
              <span className="text-lg">Transaction</span>
              <span>{isTransactionOpen ? "▲" : "▼"}</span>
            </button>
            {isTransactionOpen && (
              <div className="ml-2 md:ml-4 space-y-2">
                <button
                  onClick={() => router.push("/pending-certificate")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Pending Certificates
                </button>
                <button
                  onClick={() => router.push("/issued-certificate")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Issued Certificates
                </button>
                <button
                  onClick={() => router.push("/institute-payment")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Institute Payment
                </button>
                <button
                  onClick={() => router.push("/create-news")}
                  className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md"
                >
                  Create News
                </button>
              </div>
            )}
          </div>

          {/* Records */}
          <div>
            <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700">
              <span className="text-lg">Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-white text-red-600 px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
