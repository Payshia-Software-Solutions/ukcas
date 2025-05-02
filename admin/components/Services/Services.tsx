"use client";

import React from "react";
import Sidebar from "../Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Services = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white p-4 rounded-md shadow">
          <h1 className="text-2xl font-bold">Good Morning !</h1>
          <p className="text-sm text-gray-500 mt-1 md:mt-0">04 April 2025</p>
          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 w-full rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <button
          onClick={() => router.push("/dashborad")}
          className="text-sm text-gray-600 text-xl font-semibold  flex items-center cursor-pointer transition duration-300"
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
          Manage Services
        </button>

        {/* Form & Preview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Create New Service */}
          <div className="bg-yellow-50 p-6  rounded-2xl space-y-4 shadow-md">
            <h2 className="text-2xl text-gray-600 font-bold mb-4">Create New Service</h2>

            <div>
              <label className="block font-semibold text-xl text-gray-500 mb-1">Service Title</label>
              <input
                type="text"
                placeholder="Enter title here"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
              />
            </div>

            <div>
              <label className="block font-semibold text-xl text-gray-500 mb-1">Service Category</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option>Choose Category</option>
                <option>Education</option>
                <option>Healthcare</option>
                <option>Consulting</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-xl text-gray-500 mb-1">Title Image</label>
              <div className="flex items-center space-x-4 bg-[#fff7e6] p-3 rounded-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-md text-gray-500 mb-1">Please upload square image, size less than 100KB</p>
                  <input
                    type="file"
                    className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-xl text-gray-500 mb-1">Service Description</label>
              <textarea
                rows={5}
                placeholder="Type Description"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
              ></textarea>
            </div>

            <button className="w-full bg-gray-900 hover:bg-black text-white text-xl font-semibold py-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2">
              Done !
            </button>
          </div>

          {/* Right: Current Services */}
          <div className="bg-yellow-50 p-6 rounded-lg space-y-4 shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-600">Current Services</h2>
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl shadow p-4 flex items-start space-x-4 hover:shadow-md transition shadow-lg cursor-pointer"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center border shadow-s,">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3v18h18"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">Service 1</h3>
                  <p className="text-sm text-gray-600">
                    The United Kingdom has a diverse landscape of institutions,
                    including renowned...
                  </p>
                  <a href="#" className="text-blue-600 text-xs font-semibold hover:underline justify-end flex items-center mt-2">
                    See more &gt;&gt;
                  </a>
                </div>
              </div>
            ))}
            <button className="text-gray-500 font-semibold text-md flex items-center justify-center w-full mt-4 cursor-pointer hover:text-gray-600 transition duration-300">
              Load More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 9l-7 7-7-7"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
