"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "../Sidebar";

export default function Dashboard() {
  const router = useRouter();
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveSuccessModal, setIsApproveSuccessModal] = useState(false);
  const [isRejectSuccessModal, setIsRejectSuccessModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleRejectDone = () => {
    setIsRejectSuccessModal(false);
    router.push("/view-content");
  };

  const handleApproveDone = () => {
    setIsApproveSuccessModal(false);
    router.push("/view-content");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col p-4 md:p-6 space-y-6">
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
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>

            {/* Notifications */}
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.866-2.239-7-5-7S8 7.134 8 11v3.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 01-6 0v-1m6 0H9"
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
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Request Forms</span>
          </div>
        </div>

        {/* Request Form Details */}
        <div className="flex flex-col bg-white p-6 rounded-lg shadow space-y-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-500">
                Arts University Bournemouth
              </h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-semibold">
                Request ID: #0001
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700 text-xl">Address:</p>
                <p className="text-gray-600">
                  7 Fern Barrow, Wallisdown, Poole BH12 5HH, United Kingdom
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-xl">
                  Name of Head / Authorized Signatory:
                </p>
                <p className="text-gray-600">Mr. Lisa Mann</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-xl">
                  Profile of Institution:
                </p>
                <p className="text-gray-600">
                  Arts University Bournemouth is a public university in Poole,
                  England, specializing in art, architecture, film, performance,
                  and design.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-700 text-xl">Phone:</p>
                <p className="text-gray-600">+44 1202 533011</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-xl">Email:</p>
                <p className="text-gray-600">xyz@bournem.uk</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-xl">
                  Accreditation Details:
                </p>
                <div className="flex items-center space-x-2">
                  <button className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 5.293a1 1 0 010 1.414L8.414 15.586a1 1 0 01-1.414 0l-4.293-4.293a1 1 0 111.414-1.414L8 13.586l8.293-8.293a1 1 0 011.414 0z" />
                    </svg>
                    View PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setIsRejectModalOpen(true)}
              className="w-48 h-12 border-2 border-red-500 text-red-600 font-semibold rounded-xl hover:bg-red-100"
            >
              Reject
            </button>

            <button className="w-48 h-12 border-2 border-gray-400 text-gray-700 font-semibold rounded-xl hover:bg-gray-100">
              Request more Details
            </button>

            <button
              onClick={() => setIsApproveModalOpen(true)}
              className="w-48 h-12 bg-black text-white font-semibold rounded-xl hover:bg-gray-800"
            >
              Approve
            </button>
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {isApproveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-[700px] relative">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Warning !</h2>
            <p className="text-black mb-8 text-lg">
              Are you sure #0001 Arts University Bournemouth wants to add to the
              System?
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                onClick={() => setIsApproveModalOpen(false)}
                className="w-full md:w-40 h-10 border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsApproveModalOpen(false);
                  setIsApproveSuccessModal(true);
                }}
                className="w-full md:w-40 h-10 bg-black text-white rounded-xl hover:bg-gray-800"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve Success Modal */}
      {isApproveSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-[600px] relative text-center">
            <button
              onClick={() => setIsApproveSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2 text-gray-700">
              "Arts University Bournemouth"
            </h2>
            <p className="text-lg mb-6 text-gray-500">Successfully added.</p>
            <button
              onClick={handleApproveDone}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold"
            >
              Done!
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-[700px] relative">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 underline">Warning !</h2>
            <p className="text-black mb-8 text-lg">
              Are you sure #0001 Arts University Bournemouth wants to be
              rejected?
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="w-full md:w-40 h-10 border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setIsRejectSuccessModal(true);
                }}
                className="w-full md:w-40 h-10 bg-red-600 text-white rounded-xl hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Success Modal */}
      {isRejectSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-[600px] relative text-center">
            <button
              onClick={() => setIsRejectSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2 text-red-600">
              "Arts University Bournemouth"
            </h2>
            <p className="text-lg mb-6 text-red-500">Successfully Rejected.</p>
            <button
              onClick={handleRejectDone}
              className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold"
            >
              Done!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
