"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "../Sidebar";

export default function IssuedCertificate() {
  const [showCertificateDetails, setShowCertificateDetails] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

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

            {/* Notification */}
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
                  d="M15 17h5l-1.405-1.405M18 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/assets/images/profile.png"
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center justify-between text-center md:text-left">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center justify-center space-x-2 text-green-600 text-sm mt-2 md:mt-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Issued Certificate</span>
          </div>
        </div>

        {/* Certificate Table or Details */}
        {!showCertificateDetails ? (
          <div className="bg-white rounded-lg shadow p-6">
            {/* Table Header */}
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

            {/* Table */}
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
            {/* Header */}
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
                <p><span className="font-semibold">Student ID:</span> UK-422</p>
                <p><span className="font-semibold">Student Name (with Initial):</span> J. Perera</p>
                <p><span className="font-semibold">Student Name (Full):</span> John Perera</p>
                <p><span className="font-semibold">Student Grade:</span> A</p>
              </div>

              <div className="space-y-4">
                <p><span className="font-semibold">Certificate ID:</span> # CF-4522-2025-100</p>
                <p><span className="font-semibold">Issued Date:</span> 02 April 2025</p>
                <p><span className="font-semibold">Email:</span> xyz@bournem.uk</p>
                <p><span className="font-semibold">Organization/Institute:</span> Arts University Bournemouth</p>
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
