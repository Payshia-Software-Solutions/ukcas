"use client";

import Image from "next/image";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["Institute Reports", "Student Reports", "Custom Reports"];
const dropdownOptions = ["Institute Name", "Location", "Institute ID"];

const dummyData = Array(10).fill({
  id: "IN-2175-200",
  name: "Arts University Bournemouth",
  date: "02-04-2025",
  location: "London,UK",
  students: 222,
  certificates: 1022,
});

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Institute Reports");
  
  const [searchQuery, setSearchQuery] = useState("");     // Search input state
  const [filterKeyword, setFilterKeyword] = useState(""); // Applied filter

  // Filtered data based on filterKeyword in institute name (case insensitive)
  const filteredData = dummyData.filter((row) =>
    row.name.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  // Apply filter on button click
  const handleFilter = () => setFilterKeyword(searchQuery);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <div>
            <h1 className="text-2xl font-bold">Good Morning !</h1>
            <p className="text-sm text-gray-500">04 April 2025</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                width={40}
                height={40}
                src="/assets/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 text-xl font-semibold flex items-center mt-6"
          >
            <svg
              className="w-4 h-4 mr-1"
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
            Manage Reports
          </button>
        </div>

        {/* Search Section */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <p className="text-2xl font-bold text-gray-500">Search Institute Reports</p>
        </div>

        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Institute..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-full shadow-sm"
          />
          <button
            onClick={handleFilter}
            className="bg-gray-800 text-white px-5 py-2 rounded-full shadow hover:bg-black transition"
          >
            Filter
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-6 rounded-md shadow">
          <div className="flex space-x-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-semibold ${
                  activeTab === tab
                    ? "border-b-2 border-gray-500"
                    : "text-gray-500"
                } cursor-pointer transition duration-300 hover:text-gray-800`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dropdown & Actions */}
          <div className="flex flex-wrap justify-between mt-6 items-center">
            <p className="text-xs text-gray-400 mt-1">Selected Report:</p>
            <select
              className="rounded-md px-4 py-2 text-md bg-white shadow-md ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-200"
            >
              <option>Choose the Report Title</option>
              {dropdownOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-md text-gray-500 font-semibold cursor-pointer transition duration-300">
                <span>🗑️</span>
                <span>Delete</span>
              </button>
              <button className="flex items-center space-x-1 text-sm text-white bg-gray-300 hover:bg-gray-600 px-3 py-2 rounded text-gray-500 font-semibold cursor-pointer transition duration-300">
                <span>⬇️</span>
                <span>Export as CSV</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-lg text-left text-gray-600">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Institute ID</th>
                  <th className="px-6 py-3 font-semibold">Institute Name</th>
                  <th className="px-6 py-3 font-semibold">Registered Date</th>
                  <th className="px-6 py-3 font-semibold">Location</th>
                  <th className="px-6 py-3 font-semibold">Total Students</th>
                  <th className="px-6 py-3 font-semibold">Total Issued Certificates</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50 "
                  >
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.location}</td>
                    <td className="px-6 py-4">{row.students}</td>
                    <td className="px-6 py-4">{row.certificates}</td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
