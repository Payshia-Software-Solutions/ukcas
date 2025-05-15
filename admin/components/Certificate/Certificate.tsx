"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
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
  const [, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstitute,] = useState<Institute | null>(null);
  const [, setShowFullForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [pendingCount, setPendingCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/accredite`)
      .then((response) => {
        const allData = response.data;
        setInstitutes(allData);
        setPendingCount(allData.filter((i: Institute) => i.accredite_status === "pending").length);
        setActiveCount(allData.filter((i: Institute) => i.accredite_status === "active").length);
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



  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

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
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/assets/images/profile.png" alt="Profile" width={40} height={40} />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Request Forms</span>
          </div>
        </div>

        {/* Counter Section */}
        <div className="flex justify-center gap-40 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-100 h-40">
            <div className="text-4xl">
              <Image src="/assets/images/pending.png" alt="Pending" width={50} height={20} className="mr-3" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Institute</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-100 h-40">
            <div className="text-4xl">
              <Image src="/assets/images/checklist.png" alt="Active" width={50} height={20} className="mr-3" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Institute</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </div>
        </div>

        {/* Search Institute */}
        <div className="flex items-center justify-center mt-6 mb-4">
          <p className="text-2xl font-bold text-gray-500">Search Certificate</p>
        </div>

        {/* Search + Filter */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="text"
            placeholder="Search Certificate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-full shadow-sm"
          />
          <button className="bg-gray-800 text-white px-5 py-2 rounded-full shadow hover:bg-black transition">
            Filter
          </button>
        </div>

        {/* Request Table */}
        <div className="bg-white rounded-lg shadow p-6">
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
              
            </table>
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
            <div className="mb-6">
              <p className="text-base font-semibold text-gray-700">
                Organization/Institute: <span className="font-normal text-gray-500">{selectedInstitute.name}</span>
              </p>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
