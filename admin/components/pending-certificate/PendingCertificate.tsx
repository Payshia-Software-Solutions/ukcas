"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

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

      {/* Main Content */}
      <div className="flex flex-col flex-1 p-6 space-y-6">
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-md shadow">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>

            {/* Notification Bell */}
            <button className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 01-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/assets/images/profile.png" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="bg-yellow-50 p-4 rounded-md flex items-center justify-between">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Pending Certificate</span>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Pending Certificate</h1>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md px-3 py-2 text-sm focus:outline-none"
              />
              <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">Filters</button>
              <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">Date Range</button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Certificate ID</th>
                  <th scope="col" className="px-6 py-3">Student ID</th>
                  <th scope="col" className="px-6 py-3">Student Name</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">View</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">01-04-2025</td>
                  <td className="px-6 py-4"># CF-4522-2025-100</td>
                  <td className="px-6 py-4">UK422</td>
                  <td className="px-6 py-4">John Doe</td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className='cursor-pointer'>
                      <Image src="/assets/images/search.png" alt="View" width={20} height={20} />
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">&lt;</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">...</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">9</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">10</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
