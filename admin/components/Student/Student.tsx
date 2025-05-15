"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddStudent from "../Student/Form";

const Services = () => {
  const router = useRouter();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [, setNewsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setFilterKeyword] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v2/news")
      .then((res) => res.json())
      .then((data) => setNewsCount(data.length))
      .catch((err) => console.error("Error fetching news count:", err));
  }, []);

  const handleCreate = () => setShowCreateModal(true);
  const handleCloseModal = () => setShowCreateModal(false);
  const handleFilter = () => setFilterKeyword(searchQuery);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 space-y-6 relative">
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
            Student
          </button>
        </div>

        <div className="flex justify-between items-center w-full space-x-4 w-1/3">
          <div></div>
          <button
            className="bg-black text-white px-4 py-3 text-sm shadow hover:bg-gray-800 transition duration-300 rounded-2xl mr-10 cursor-pointer"
            onClick={handleCreate}
          >
            + Add New Student
          </button>
        </div>

        <div className="flex items-center justify-center mt-6 mb-4">
          <p className="text-2xl font-bold text-gray-500">Search Student</p>
        </div>

        <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Student..."
            className="w-full md:w-1/2 px-4 py-2 border rounded-full shadow-sm"
          />
          <button
            onClick={handleFilter}
            className="bg-gray-800 text-white px-5 py-2 rounded-full shadow hover:bg-black transition"
          >
            Filter
          </button>
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-gray-900/50 backdrop-blur-sm z-50">
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] p-6">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
              >
                ✖
              </button>
              <AddStudent />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;