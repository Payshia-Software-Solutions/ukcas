"use client";

import Image from "next/image";
import Sidebar from "../Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["Institute Reports", "Student Reports", "Payment Reports"] as const;
type Tab = typeof tabs[number];

interface InstituteReport {
  id: string;
  name: string;
  date: string;
  location: string;
  students: number;
  certificates: number;
}

interface StudentReport {
  id: string;
  name: string;
  registeredDate: string;
  course: string;
  status: string;
}

interface PaymentReport {
  id: string;
  title: string;
  description: string;
}

const reportsData: Record<Tab, InstituteReport[] | StudentReport[] | PaymentReport[]> = {
  "Institute Reports": [
    {
      id: "IN-2175-200",
      name: "Arts University Bournemouth",
      date: "02-04-2025",
      location: "London, UK",
      students: 222,
      certificates: 1022,
    },
    {
      id: "IN-2175-201",
      name: "Tech University",
      date: "01-12-2024",
      location: "New York, USA",
      students: 150,
      certificates: 800,
    },
  ],
  "Student Reports": [
    {
      id: "ST-1001",
      name: "John Doe",
      registeredDate: "01-02-2025",
      course: "Computer Science",
      status: "Active",
    },
    {
      id: "ST-1002",
      name: "Jane Smith",
      registeredDate: "15-03-2025",
      course: "Business Management",
      status: "Graduated",
    },
  ],
  "Payment Reports": [
    {
      id: "PA-9001",
      title: "Payment Report 1",
      description: "Description of custom report 1",
    },
    {
      id: "PA-9002",
      title: "Payment Report 2",
      description: "Description of custom report 2",
    },
  ],
};

export default function ReportsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Institute Reports");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const activeReports = reportsData[activeTab];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
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

        {/* Tabs */}
        <div className="flex space-x-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 font-semibold cursor-pointer transition ${
                activeTab === tab
                  ? "border-b-2 border-gray-500 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setSelectedIndex(0);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main content: Left list + Right details */}
        <div className="flex flex-1 gap-6">
          {/* Left side: report list */}
          <div className="w-1/3 bg-white rounded-lg shadow-md overflow-y-auto max-h-[70vh] border border-gray-200">
            <table className="min-w-full text-left text-gray-700">
              <thead className="bg-gray-400 sticky top-0">
                <tr>
                  {activeTab === "Institute Reports" && (
                    <>
                      <th className="px-4 py-2 font-semibold">Institute ID</th>
                      <th className="px-4 py-2 font-semibold">Institute Name</th>
                    </>
                  )}
                  {activeTab === "Student Reports" && (
                    <>
                      <th className="px-4 py-2 font-semibold">Student ID</th>
                      <th className="px-4 py-2 font-semibold">Student Name</th>
                    </>
                  )}
                  {activeTab === "Payment Reports" && (
                    <>
                      <th className="px-4 py-2 font-semibold">Report ID</th>
                      <th className="px-4 py-2 font-semibold">Title</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(activeReports as any[]).map(
                  (report: InstituteReport | StudentReport | PaymentReport, index: number) => (
                    <tr
                      key={index}
                      className={`cursor-pointer hover:bg-gray-100 ${
                        selectedIndex === index ? "bg-gray-200 font-semibold" : ""
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      {activeTab === "Institute Reports" && (
                        <>
                          <td className="px-4 py-2">{(report as InstituteReport).id}</td>
                          <td className="px-4 py-2">{(report as InstituteReport).name}</td>
                        </>
                      )}
                      {activeTab === "Student Reports" && (
                        <>
                          <td className="px-4 py-2">{(report as StudentReport).id}</td>
                          <td className="px-4 py-2">{(report as StudentReport).name}</td>
                        </>
                      )}
                      {activeTab === "Payment Reports" && (
                        <>
                          <td className="px-4 py-2">{(report as PaymentReport).id}</td>
                          <td className="px-4 py-2">{(report as PaymentReport).title}</td>
                        </>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Right side: details as horizontal table */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-auto max-h-[70vh] border border-gray-200">
            {activeReports.length === 0 ? (
              <p className="text-center text-gray-400 mt-20">No reports available.</p>
            ) : (
              <table className="min-w-full text-left text-gray-700 border border-gray-300 rounded-md">
                <thead className="bg-gray-400">
                  <tr>
                    {activeTab === "Institute Reports" && (
                      <>
                        <th className="px-6 py-3 border-r">Institute Name</th>
                        <th className="px-6 py-3 border-r">Institute ID</th>
                        <th className="px-6 py-3 border-r">Registered Date</th>
                        <th className="px-6 py-3 border-r">Location</th>
                        <th className="px-6 py-3 border-r">Total Students</th>
                        <th className="px-6 py-3">Total Issued Certificates</th>
                      </>
                    )}
                    {activeTab === "Student Reports" && (
                      <>
                        <th className="px-6 py-3 border-r">Student Name</th>
                        <th className="px-6 py-3 border-r">Student ID</th>
                        <th className="px-6 py-3 border-r">Registered Date</th>
                        <th className="px-6 py-3 border-r">Course</th>
                        <th className="px-6 py-3">Status</th>
                      </>
                    )}
                    {activeTab === "Payment Reports" && (
                      <>
                        <th className="px-6 py-3 border-r">Title</th>
                        <th className="px-6 py-3">Description</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {activeTab === "Institute Reports" && (
                      <>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as InstituteReport).name}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as InstituteReport).id}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as InstituteReport).date}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as InstituteReport).location}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as InstituteReport).students}</td>
                        <td className="px-6 py-3">{(activeReports[selectedIndex] as InstituteReport).certificates}</td>
                      </>
                    )}
                    {activeTab === "Student Reports" && (
                      <>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as StudentReport).name}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as StudentReport).id}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as StudentReport).registeredDate}</td>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as StudentReport).course}</td>
                        <td className="px-6 py-3">{(activeReports[selectedIndex] as StudentReport).status}</td>
                      </>
                    )}
                    {activeTab === "Payment Reports" && (
                      <>
                        <td className="px-6 py-3 border-r">{(activeReports[selectedIndex] as PaymentReport).title}</td>
                        <td className="px-6 py-3">{(activeReports[selectedIndex] as PaymentReport).description}</td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
