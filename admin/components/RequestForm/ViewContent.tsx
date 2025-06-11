"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import FullForm from "./FullForm";
import config from "@/config";
import Sidebar from "../Sidebar";
import { useLoader } from "@/app/context/LoaderContext"; // ✅ Step 5: Import useLoader
import NewForm from "./NewForm";  // Import the NewForm component

import "datatables.net-dt/css/dataTables.dataTables.css";

const DataTable = dynamic(
  async () => {
    const dtReact = await import("datatables.net-react");
    const dtNet = await import("datatables.net-dt");

    dtReact.default.use(dtNet.default);
    return dtReact.default;
  },
  { ssr: false }
);

type Institute = {
  id: number;
  name: string;
  accredite_status: string;
  created_at: string;
};

export default function Dashboard() {
  const [isAddInstituteModalOpen, setIsAddInstituteModalOpen] = useState(false);  // Modal state for Add New Institute
  const [isViewInstituteModalOpen, setIsViewInstituteModalOpen] = useState(false); // Modal state for View Institute
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);

  const { setLoading } = useLoader(); // ✅ Step 5: Get setLoading from context

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/accredite`);
        const allData = response.data;
        setInstitutes(allData);
        setPendingCount(allData.filter((i: Institute) => i.accredite_status === "pending").length);
        setActiveCount(allData.filter((i: Institute) => i.accredite_status === "active").length);
        setLoading(false); // ✅ Step 5: Hide preloader after data is fetched
      } catch (error) {
        console.error("Error fetching accreditation data:", error);
        setLoading(false); // ✅ ensure loader hides on error too
      }
    };

    fetchInstitutes();
  }, [setLoading]);

  const isValidStatus = (status: string): status is "pending" | "active" | "Rejected" => {
    return ["pending", "active", "Rejected"].includes(status);
  };

  const filteredInstitutes = institutes.filter((inst) =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 w-full rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/assets/images/profile.png"
                alt="Profile"
                width={40}
                height={40}
              />
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

        {/* Add New Institute Button */}
        <div className="flex justify-between items-center w-full space-x-4 w-1/3">
          <div></div>
          <button
            className="bg-black text-white px-4 py-3 text-sm shadow hover:bg-gray-800 transition duration-300 rounded-2xl mr-10 cursor-pointer"
            onClick={() => setIsAddInstituteModalOpen(true)} // Open the Add New Institute Modal
          >
            + Add New Institute
          </button>
        </div>

        {/* Counter Section */}
        <div className="flex justify-start gap-10 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-130 h-28">
            <Image
              src="/assets/images/pending.png"
              alt="Pending"
              width={50}
              height={20}
              className="mr-3"
            />
            <div>
              <p className="text-sm text-gray-500">Pending Institute</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-130 h-28">
            <Image
              src="/assets/images/checklist.png"
              alt="Active"
              width={50}
              height={20}
              className="mr-3"
            />
            <div>
              <p className="text-sm text-gray-500">Active Institute</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </div>
        </div>

        {/* DataTable */}
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <DataTable
            className="display"
            options={{
              paging: true,
              searching: false,
              info: false,
              lengthChange: false,
              pageLength: 10,
              ordering: true,
              order: [[0, "asc"]],
            }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Organization/Institute</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {filteredInstitutes.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td>{item.name}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        item.accredite_status === "active"
                          ? "bg-green-400"
                          : item.accredite_status === "pending"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    >
                      {isValidStatus(item.accredite_status)
                        ? item.accredite_status
                        : "pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="text-blue-600 underline"
                      onClick={() => {
                        setSelectedInstitute(item);
                        setIsViewInstituteModalOpen(true); // Open the View Institute Modal
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      </div>

      {/* Modal for Add New Institute Form */}
      {isAddInstituteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddInstituteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer text-xl"
            >
              ✖
            </button>
            <NewForm />
          </div>
        </div>
      )}

      {/* Modal for View Institute Form */}
      {isViewInstituteModalOpen && selectedInstitute && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsViewInstituteModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6">Institute Details</h2>
            {/* FullForm Component for viewing selected institute */}
            <FullForm id={selectedInstitute.id.toString()} />
          </div>
        </div>
      )}
    </div>
  );
}
