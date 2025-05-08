"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Services = () => {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newsCount, setNewsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // search input
  const [filterKeyword, setFilterKeyword] = useState(""); // applied filter

  // Fetch news count on load
  useEffect(() => {
    fetch("http://localhost:5000/api/v2/news")
      .then((res) => res.json())
      .then((data) => setNewsCount(data.length))
      .catch((err) => console.error("Error fetching news count:", err));
  }, []);

  const handleCreate = () => setShowCreateModal(true);
  const handleNewsCreated = () => setNewsCount((prev) => prev + 1);
  const handleNewsDeleted = () => setNewsCount((prev) => Math.max(0, prev - 1));
  const handleFilter = () => setFilterKeyword(searchQuery); // Apply filter

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
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
            onClick={() => router.push("/dashborad")}
            className="text-gray-600 text-xl font-semibold flex items-center mt-6"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Manage News
          </button>
        </div>

        {/* Counter Section */}
        <div className="flex justify-between items-center w-full">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-1/3">
            <div className="text-4xl">
              <Image
                src="/assets/images/speaker2.png"
                alt="Dashboard"
                width={50}
                height={20}
                className="mr-3"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Published Content</p>
              <p className="text-2xl font-bold">{newsCount}</p>
            </div>
          </div>
          <button
            className="bg-black text-white px-4 py-3 text-sm shadow hover:bg-gray-800 transition duration-300 rounded-2xl mr-10 cursor-pointer"
            onClick={handleCreate}
          >
            + Create New News
          </button>
        </div>

        {/* Search + Filter */}
        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search News..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-full shadow-sm"
          />
          <button
            onClick={handleFilter}
            className="bg-gray-800 text-white px-5 py-2 rounded-full shadow hover:bg-black transition"
          >
            Filter
          </button>
        </div>

        {/* Show News List */}
        <div className="mt-8">
          <RightSide filterKeyword={filterKeyword}/>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                ×
              </button>
              <LeftSide onCreateSuccess={handleNewsCreated} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
