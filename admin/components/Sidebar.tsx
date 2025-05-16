"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FiGrid,
  FiHome,
  FiUsers,
  FiSpeaker,
  FiUser,
  FiSettings,
  FiDollarSign,
  FiCreditCard,
  FiBarChart2,
  FiBook,
  FiFileText,
  FiLogOut,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState<boolean>(false);
  const [isRecordOpen, setIsRecordOpen] = useState<boolean>(false);

  const currentPath = usePathname();

  const handleLogout = (): void => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleTransactionClick = () => {
    setIsTransactionOpen(!isTransactionOpen);
    setIsRecordOpen(false);
  };

  const handleRecordClick = () => {
    setIsRecordOpen(!isRecordOpen);
    setIsTransactionOpen(false);
  };

  return (
    <div className="w-full md:w-64 flex flex-col justify-between bg-gray-900 text-white p-6">
      <div>
        <div className="text-xl font-bold mb-6 text-center md:text-left">
          Company Name
        </div>

        <div className="space-y-6">
          {/* Dashboard Menu */}
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className={`flex items-center justify-start w-full p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                currentPath === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <FiGrid className="mr-3" size={20} />
              <span className="text-lg">Dashboard</span>
            </button>
          </div>

          {/* Master Menu */}
          <div>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className={`flex items-center justify-start w-full p-2 rounded-md cursor-pointer hover:bg-gray-700  ${
                currentPath.includes("create-institutes") ||
                currentPath.includes("view-content") ||
                currentPath.includes("manage-services") ||
                currentPath.includes("news")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <FiHome className="mr-3" size={20} />
              <span className="text-lg">Master</span>
              <span className="ml-auto">
                {isDashboardOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {isDashboardOpen && (
              <div className="space-y-4 pl-4">
                <button
                  onClick={() => router.push("/view-content")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex cursor-pointer items-center ${
                    currentPath === "/view-content" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiUsers className="mr-3" size={20} />
                  Institutes
                </button>
                <button
                  onClick={() => router.push("/news")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex cursor-pointer items-center ${
                    currentPath === "/news" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiSpeaker className="mr-3" size={20} />
                  Manage News
                </button>
                <button
                  onClick={() => router.push("/student")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex cursor-pointer items-center ${
                    currentPath === "/student" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiUser className="mr-3" size={20} />
                  Student
                </button>
                <button
                  onClick={() => router.push("/manage-services")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex cursor-pointer items-center ${
                    currentPath === "/manage-services" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiSettings className="mr-3" size={20} />
                  Manage Services
                </button>
              </div>
            )}
          </div>

          {/* Transaction Menu */}
          <div>
            <button
              onClick={handleTransactionClick}
              className={`flex items-center justify-start w-full p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                currentPath.includes("pending-certificate") ||
                currentPath.includes("issued-certificate") ||
                currentPath.includes("institute-payment") ||
                currentPath.includes("create-news")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <FiDollarSign className="mr-3" size={20} />
              <span className="text-lg">Transaction</span>
              <span className="ml-auto">
                {isTransactionOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {isTransactionOpen && (
              <div className="space-y-4 pl-4">
                <button
                  onClick={() => router.push("")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex cursor-pointer items-center ${
                    currentPath === "/pending-certificate" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiCreditCard className="mr-3" size={20} />
                  Payments
                </button>
                <button
                  onClick={() => router.push("/certificate")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex cursor-pointer items-center ${
                    currentPath === "/issued-certificate" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiBook className="mr-3" size={20} />
                  Certificates
                </button>
              </div>
            )}
          </div>

          {/* Records Menu */}
          <div>
            <button
              onClick={handleRecordClick}
              className={`flex items-center justify-start w-full p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                currentPath.includes("institute-report") ||
                currentPath.includes("student-report") ||
                currentPath.includes("payment-report") ||
                currentPath.includes("creditors")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <FiBarChart2 className="mr-3" size={20} />
              <span className="text-lg">Records</span>
              <span className="ml-auto">
                {isRecordOpen ? <FiChevronUp /> : <FiChevronDown />}
              </span>
            </button>
            {isRecordOpen && (
              <div className="space-y-4 pl-4">
                <button
                  onClick={() => {
                    router.push("/reports");
                    setIsRecordOpen(false);
                  }}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex  cursor-pointer items-center ${
                    currentPath === "/institute-report" ? "bg-gray-700" : ""
                  }`}
                >
                  <FiFileText className="mr-3" size={20} />
                  All Reports
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-white text-red-600 px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 w-full flex items-center justify-center space-x-2 cursor-pointer"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
