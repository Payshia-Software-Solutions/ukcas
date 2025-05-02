"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [showCertificateDetails, setShowCertificateDetails] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex flex-col justify-between bg-gray-900 text-white p-6">
        <div>
          <div className="text-2xl md:text-xl font-bold mb-6 text-center md:text-left">
            Company Name
          </div>

          <div className="space-y-4">
            {/* Dashboard Menu */}
            <div>
              <button
                className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-700"
                onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              >
                <span className="text-lg">Dashboard</span>
                <span>{isDashboardOpen ? "▲" : "▼"}</span>
              </button>
              {isDashboardOpen && (
                <div className="ml-4 space-y-2">
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/create-institutes")}
                  >
                    Create Institutes
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/view-content")}
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
                <span>{isTransactionOpen ? "▲" : "▼"}</span>
              </button>
              {isTransactionOpen && (
                <div className="ml-4 space-y-2">
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/pending-certificate")}
                  >
                    Pending Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/issued-certificate")}
                  >
                    Issued Certificates
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/institute-payment")}
                  >
                    Institute Payment
                  </button>
                  <button
                    className="block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left"
                    onClick={() => router.push("/create-news")}
                  >
                    Create News
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Logout */}
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
      <div className="flex-1 p-6 space-y-6">
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-md shadow gap-4">
          <h1 className="text-2xl font-bold text-center md:text-left">
            Dashboard
          </h1>

          <div className="flex items-center space-x-4 justify-center">
            {/* Search */}
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>

            {/* Notifications */}
            <button className="relative">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 01-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                width={500}
                height={300}
                src="/assets/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between text-center md:text-left">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center justify-center space-x-2 text-green-600 text-sm mt-2 md:mt-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Issued Certificate</span>
          </div>
        </div>

        {/* Main Card Section */}
        {!showCertificateDetails ? (
          <div className="bg-white rounded-lg shadow p-6">
            {/* Pending Certificate Table */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-center md:text-left mb-4 md:mb-0">
                Issued Certificate
              </h1>
              <div className="flex flex-wrap gap-2 justify-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border rounded-md px-3 py-2 text-sm focus:outline-none"
                />
                <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                  Filters
                </button>
                <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">
                  Date Range
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Certificate ID</th>
                    <th className="px-6 py-3">Student ID</th>
                    <th className="px-6 py-3">Student Name</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">View</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">01-04-2025</td>
                    <td className="px-6 py-4"># CF-4522-2025-100</td>
                    <td className="px-6 py-4">UK422</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                        Issued
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="flex items-center space-x-1"
                        onClick={() => setShowCertificateDetails(true)}
                      >
                        <Image
                          src="/assets/images/search.png"
                          alt="View"
                          width={20}
                          height={20}
                        />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white border-2 border-blue-400 rounded-lg shadow p-6">
            {/* Certificate Details View */}
            <div className="flex justify-between mb-6">
              <button
                onClick={() => setShowCertificateDetails(false)}
                className="flex items-center text-gray-700 hover:text-black text-lg font-semibold space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Back</span>
              </button>
              <button className="border px-3 py-2 rounded-md text-gray-600 text-sm">
                View Certificate
              </button>
            </div>

            <h1 className="text-2xl mb-4 font-bold">Issued Certificate</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Student ID:</span> UK-422
                </p>
                <p>
                  <span className="font-semibold">
                    Student Name (with Initial):
                  </span>{" "}
                  J. Perera
                </p>
                <p>
                  <span className="font-semibold">Student Name (Full):</span>{" "}
                  John Perera
                </p>
                <p>
                  <span className="font-semibold">Student Grade:</span> A
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  <span className="font-semibold">Certificate ID:</span> #
                  CF-4522-2025-100
                </p>
                <p>
                  <span className="font-semibold">Issued Date:</span> 02 April
                  2025
                </p>
                <p>
                  <span className="font-semibold">Email:</span> xyz@bournem.uk
                </p>
                <p>
                  <span className="font-semibold">Organization/Institute:</span>{" "}
                  Arts University Bournemouth
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button className="w-36 h-12 border-2 border-gray-500 text-gray-600 font-semibold rounded-xl hover:bg-gray-100">
                Reissue Certificate
              </button>
              <button className="w-36 h-12 text-red-600 font-semibold rounded-xl hover:bg-red-100 border-2 border-red-500">
                Cancel Certificate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
