"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import config from "@/config";
import Sidebar from "../Sidebar";
import AddCertificate from "./NewCertificate";
import DataTable, { TableColumn } from "react-data-table-component";
import IssuedCertificateModal from "./ViewCertificate";
import { useLoader } from "@/app/context/LoaderContext"; // ✅ Import Loader Context

interface Certificate {
  id: number;
  student_id: string | number;
  certificate_id: string;
  student_name_initial: string;
  student_name_full: string;
  student_grade: string;
  issued_date: string;
  email: string;
  organization: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [issuedCount, setIssuedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const { setLoading } = useLoader(); // ✅ useLoader hook
  useEffect(() => {
    setLoading(false); // ✅ Turn off preloader after page loads
  }, []);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/certificates`);
        const data: Certificate[] = response.data;

        setCertificates(data);

        const issued = data.filter((c) => c.certificate_id).length;
        const total = data.length;
        const pending = total - issued;

        setIssuedCount(issued);
        setPendingCount(pending);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    };

    fetchCertificates();
  }, []);

  const handleCertificateCreated = () => {
    setIssuedCount((prev) => prev + 1);
    setPendingCount((prev) => (prev > 0 ? prev - 1 : 0));
    setIsModalOpen(false);
  };

  const columns: TableColumn<Certificate>[] = [
    {
      name: "Date",
      selector: (row) => row.issued_date,
      sortable: true,
    },
    {
      name: "Certificate ID",
      selector: (row) => row.certificate_id,
      sortable: true,
    },
    {
      name: "Student ID",
      selector: (row) => row.student_id.toString(),
    },
    {
      name: "Student Name",
      selector: (row) => row.student_name_initial,
    },
    {
      name: "View",
      cell: (row) => (
        <button
          className="text-blue-600 hover:underline text-md cursor-pointer"
          onClick={() => setSelectedCertificate(row)}
        >
          View
        </button>
      ),
      ignoreRowClick: true,
    },
  ];

  const filteredData = certificates.filter((item) =>
    item.certificate_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student_id?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.student_name_initial?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.issued_date?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Search certificates..."
        className="px-4 py-2 border rounded-md text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }, [searchTerm]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-4 md:p-6 space-y-6">
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

        <div className="bg-yellow-50 p-4 rounded-md flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Request Forms</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-black text-white px-4 py-3 text-sm shadow hover:bg-gray-800 transition duration-300 rounded-2xl"
            onClick={() => setIsModalOpen(true)}
          >
            + Create New Certificate
          </button>
        </div>

        <div className="flex justify-center gap-40 mt-6">
          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-120 h-30">
            <Image src="/assets/images/pending.png" alt="Pending" width={50} height={20} className="mr-3" />
            <div>
              <p className="text-sm text-gray-500">Pending Certificates</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-120 h-30">
            <Image src="/assets/images/checklist.png" alt="Issued" width={50} height={20} className="mr-3" />
            <div>
              <p className="text-sm text-gray-500">Issued Certificates</p>
              <p className="text-2xl font-bold">{issuedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <DataTable
            title="Certificates"
            columns={columns}
            data={filteredData}
            pagination
            highlightOnHover
            striped
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-6">Create New Certificate</h2>
            <AddCertificate onSuccess={handleCertificateCreated} />
          </div>
        </div>
      )}

      {selectedCertificate && (
        <IssuedCertificateModal
          certificate={{
            ...selectedCertificate,
            student_id: selectedCertificate.student_id.toString(),
          }}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}
