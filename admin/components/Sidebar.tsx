"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState<boolean>(false);
  const [isRecordOpen, setIsRecordOpen] = useState<boolean>(false);

  const currentPath = usePathname(); // Get the current URL path

  const handleLogout = (): void => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  const handleTransactionClick = () => {
    setIsTransactionOpen(!isTransactionOpen);
    setIsRecordOpen(false); // Close Records dropdown when Transaction is clicked
  };

  const handleRecordClick = () => {
    setIsRecordOpen(!isRecordOpen);
    setIsTransactionOpen(false); // Close Transaction dropdown when Records is clicked
  };

  return (
    <div className="w-full md:w-64 flex flex-col justify-between bg-gray-900 text-white p-6">
      <div>
        <div className="text-xl font-bold mb-6 text-center md:text-left">
          Company Name
        </div>

        <div className="space-y-6"> {/* Increased space-y value here */}
          {/* Dashboard Menu */}
          <div>
            <button
              onClick={() => router.push("/dashboard")}
              className={`flex items-center justify-start w-full p-2 rounded-md hover:bg-gray-700 ${
                currentPath === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              <Image
                src="/assets/images/dashboard.png"
                alt="Dashboard"
                width={25}
                height={20}
                className="mr-3"
              />
              <span className="text-lg">Dashboard</span>
            </button>
          </div>

          <div>
            <button
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              className={`flex items-center justify-start w-full p-2 rounded-md hover:bg-gray-700  ${
                currentPath.includes("create-institutes") ||
                currentPath.includes("view-content") ||
                currentPath.includes("manage-services") ||
                currentPath.includes("news")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Image
                src="/assets/images/home.png"
                alt="Dashboard"
                width={25}
                height={20}
                className="mr-3"
              />
              <span className="text-lg">Master</span>
              <span className="ml-auto">{isDashboardOpen ? "▲" : "▼"}</span>
            </button>
            {isDashboardOpen && (
              <div className="space-y-4 pl-4"> {/* Increased space-y value here */}
                <button
                  onClick={() => router.push("/view-content")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex ${
                    currentPath === "/view-content" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/institute.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Institutes
                </button>
                <button
                  onClick={() => router.push("/news")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/news" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/speaker.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Manage News
                </button>
                <button
                  onClick={() => router.push("/student")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/student" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/student.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Student
                </button>
                <button
                  onClick={() => router.push("/manage-services")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/manage-services" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/repairing-service.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Manage Services
                </button>
                
              </div>
            )}
          </div>

          {/* Transaction Menu */}
          <div>
            <button
              onClick={handleTransactionClick}
              className={`flex items-center justify-start w-full p-2 rounded-md hover:bg-gray-700 ${
                currentPath.includes("pending-certificate") ||
                currentPath.includes("issued-certificate") ||
                currentPath.includes("institute-payment") ||
                currentPath.includes("create-news")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Image
                src="/assets/images/coin.png"
                alt="Dashboard"
                width={27}
                height={20}
                className="mr-3"
              />
              <span className="text-lg">Transaction</span>
              <span className="ml-auto">{isTransactionOpen ? "▲" : "▼"}</span>
            </button>
            {isTransactionOpen && (
              <div className="space-y-4 pl-4"> {/* Increased space-y value here */}
                <button
                  onClick={() => router.push("")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex ${
                    currentPath === "/pending-certificate" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/cash-payment.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Payments
                </button>
                <button
                  onClick={() => router.push("/certificate")}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/issued-certificate" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/diploma.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Certificates
                </button>
              </div>
            )}
          </div>

          {/* Records Menu */}
          <div>
            <button
              onClick={handleRecordClick}
              className={`flex items-center justify-start w-full p-2 rounded-md hover:bg-gray-700 ${
                currentPath.includes("institute-report") ||
                currentPath.includes("student-report") ||
                currentPath.includes("payment-report") ||
                currentPath.includes("creditors")
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              <Image
                src="/assets/images/bar-chart.png"
                alt="Dashboard"
                width={27}
                height={20}
                className="mr-3"
              />
              <span className="text-lg">Records</span>
              <span className="ml-auto">{isRecordOpen ? "▲" : "▼"}</span>
            </button>
            {isRecordOpen && (
              <div className="space-y-4 pl-4"> {/* Increased space-y value here */}
                <button
                  onClick={() => {
                    router.push("/institute-report");
                    setIsRecordOpen(false); // Close the dropdown after item click
                  }}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left mt-5 flex ${
                    currentPath === "/institute-report" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/organization.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Institute Report
                </button>
                <button
                  onClick={() => {
                    router.push("/student-report");
                    setIsRecordOpen(false); // Close the dropdown after item click
                  }}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/student-report" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/education.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Student Report
                </button>
                <button
                  onClick={() => {
                    router.push("/payment-report");
                    setIsRecordOpen(false); // Close the dropdown after item click
                  }}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/payment-report" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/plan.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Payment Report
                </button>
                <button
                  onClick={() => {
                    router.push("/creditors");
                    setIsRecordOpen(false); // Close the dropdown after item click
                  }}
                  className={`block w-full p-2 text-gray-300 hover:bg-gray-700 rounded-md text-left flex ${
                    currentPath === "/creditors" ? "bg-gray-700" : ""
                  }`}
                >
                  <Image
                    src="/assets/images/money.png"
                    alt="Dashboard"
                    width={27}
                    height={20}
                    className="mr-3"
                  />
                  Creditors
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
          className="bg-white text-red-600 px-10 py-3 rounded-2xl text-lg font-semibold hover:bg-red-200 w-full flex items-center justify-center space-x-2"
        >
          <Image
            src="/assets/images/logout.png"
            alt="Logout"
            width={25}
            height={20}
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
