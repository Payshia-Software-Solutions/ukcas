"use client";

import Image from "next/image";
import Sidebar from "../Sidebar";
import { useState } from "react";

const tabs = ["Institute Reports", "Student Reports", "Custom Reports"];
const dropdownOptions = ["Overall Summary", "Monthly Report", "Yearly Overview"];

const dummyData = Array(10).fill({
  id: "IN-2175-200",
  name: "Arts University Bournemouth",
  date: "02-04-2025",
  location: "London,UK",
  students: 222,
  certificates: 1022,
});

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Institute Reports");
  const [selectedReport, setSelectedReport] = useState("Choose the Report Title");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md shadow">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 w-full rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>
            <button className="relative">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405M18 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/assets/images/profile.png" alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        {/* Greeting Section */}
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Records </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-6 rounded-md shadow">
          <div className="flex space-x-6 border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-semibold ${activeTab === tab ? "border-b-2 border-gray-500" : "text-gray-500 " } cursor-pointer transition duration-300 hover:text-gray-800`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dropdown & Actions */}
          <div className="flex flex-wrap justify-between mt-6 items-center">
          <p className="text-xs text-gray-400 mt-1">Selected Report: {selectedReport}</p>
            <select
              className=" rounded-md px-4 py-2 text-md bg-white shadow-md ring-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-200"
              onChange={(e) => setSelectedReport(e.target.value)}
            >
              <option>Choose the Report Title</option>
              {dropdownOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>

            <div className="flex space-x-4 ">
              <button className="flex items-center space-x-1 text-md text-gray-500 font-semibold cursor-pointer transition duration-300">
                <span>🗑️</span>
                <span>Delete</span>
              </button>
              <button className="flex items-center space-x-1 text-md text-gray-500 font-semibold cursor-pointer transition duration-300">
                <span>⚙️</span>
                <span>Filters</span>
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
                {dummyData.map((row, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.date}</td>
                    <td className="px-6 py-4">{row.location}</td>
                    <td className="px-6 py-4">{row.students}</td>
                    <td className="px-6 py-4">{row.certificates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
