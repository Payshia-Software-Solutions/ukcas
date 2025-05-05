"use client";

import React from "react";
import Sidebar from "../Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

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
          Manage Events
        </button>

        {/* Form & Preview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Create New Service */}
           <LeftSide/>

          {/* Right: Current Services */}
          <RightSide/>
        </div>
      </div>
    </div>
  );
};

export default Services;
