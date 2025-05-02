"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ContentRow from "./ContentRow";
import FullForm from "./FullForm";
import config from "@/config";
import Sidebar from "../Sidebar";

type Institute = {
  id: number;
  name: string;
  accredite_status: string;
  created_at: string;
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [showFullForm, setShowFullForm] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/accredite`)
      .then((response) => {
        setInstitutes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accreditation data:", error);
      });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setShowFullForm(false);
    }
  }, [isModalOpen]);

  const isValidStatus = (status: string): status is "pending" | "active" | "Rejected" => {
    return ["pending", "active", "Rejected"].includes(status);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 space-y-6">
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-md shadow space-y-4 md:space-y-0">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405M18 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159"
                />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

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
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Request Forms</span>
          </div>
        </div>

        {/* Request Forms Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <h1 className="text-2xl font-bold">Request Forms</h1>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md px-3 py-2 text-sm focus:outline-none"
              />
              <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">Filters</button>
              <button className="border px-3 py-2 rounded-md text-sm hover:bg-gray-100">Date Range</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Organization/Institute</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">View</th>
                </tr>
              </thead>
              <tbody>
                {institutes.map((item) => (
                  <ContentRow
                    key={item.id}
                    date={new Date(item.created_at).toLocaleDateString()}
                    instituteName={item.name}
                    status={isValidStatus(item.accredite_status) ? item.accredite_status : "pending"}
                    onView={() => {
                      setSelectedInstitute(item);
                      setIsModalOpen(true);
                      setShowFullForm(false);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center items-center mt-6 flex-wrap gap-2">
            {[1, 2, "...", 9, 10].map((num, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 border rounded ${
                  num === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedInstitute && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-6">Request Form</h2>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
              <div className="text-base font-semibold text-gray-700">
                Request ID:{" "}
                <span className="font-normal text-gray-500">#{selectedInstitute.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-semibold text-gray-700">Status:</span>
                <div className="flex items-center text-blue-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-1"></span>
                  <span className="text-sm font-semibold">{selectedInstitute.accredite_status}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-base font-semibold text-gray-700">
                Organization/Institute:{" "}
                <span className="font-normal text-gray-500">{selectedInstitute.name}</span>
              </p>
            </div>

            {showFullForm ? (
              <FullForm id={selectedInstitute.id.toString()} />
            ) : (
              <div className="flex justify-center">
                <button
                  className="px-6 py-2 rounded-md border border-blue-500 text-blue-700 font-semibold shadow-sm hover:bg-blue-50"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowFullForm(true);
                  }}
                >
                  View Details
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
