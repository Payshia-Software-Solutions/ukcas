"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLoader } from "@/app/context/LoaderContext";
import Sidebar from "@/components/Sidebar";
import config from "@/config";


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

// Type definitions for data structures
interface Institute {
  id: number;
  name: string;
  accredite_status: string;
  created_at: string;
}

interface Payment {
  id: number;
  amount: number;
  status: string;
  type: string;
  created_at: string;
}

interface Certificate {
  id: number;
  certificate_id: string;
  student_name_initial: string;
  issued_date: string;
}

interface Service {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

interface DashboardStats {
  totalInstitutes: number;
  activeInstitutes: number;
  pendingInstitutes: number;
  totalPayments: number;
  totalPaymentAmount: number;
  totalCertificates: number;
  issuedCertificates: number;
  pendingCertificates: number;
  totalServices: number;
  publishedServices: number;
}

export default function DashboardContent() {
  const { setLoading } = useLoader();
  const [searchTerm, setSearchTerm] = useState("");
  const [institutes, setInstitutes] = useState<Institute[]>([]);

  const [stats, setStats] = useState<DashboardStats>({
    totalInstitutes: 0,
    activeInstitutes: 0,
    pendingInstitutes: 0,
    totalPayments: 0,
    totalPaymentAmount: 0,
    totalCertificates: 0,
    issuedCertificates: 0,
    pendingCertificates: 0,
    totalServices: 0,
    publishedServices: 0,
  });
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingState(true);
        
        // Fetch all data concurrently
        const [
          institutesResponse,
          paymentsResponse,
          certificatesResponse,
          servicesResponse
        ] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/accredite`),
          axios.get(`${config.API_BASE_URL}/payment`),
          axios.get(`${config.API_BASE_URL}/certificates`),
          axios.get(`${config.API_BASE_URL}/service`)
        ]);

        // Process institutes data
        const allInstitutes: Institute[] = institutesResponse.data;
        setInstitutes(allInstitutes);
        const activeInstitutes = allInstitutes.filter(inst => inst.accredite_status === "active").length;
        const pendingInstitutes = allInstitutes.filter(inst => inst.accredite_status === "pending").length;

        // Process payments data
        const payments: Payment[] = paymentsResponse.data;
        const totalPaymentAmount = payments.reduce((sum, payment) => sum + parseFloat(payment.amount.toString() || "0"), 0);

        // Process certificates data
        const certificates: Certificate[] = certificatesResponse.data;
        const issuedCertificates = certificates.filter(cert => cert.certificate_id).length;
        const pendingCertificates = certificates.length - issuedCertificates;

        // Process services data
        const services: Service[] = servicesResponse.data;
        const publishedServices = services.filter(service => service.status === "published" || service.status === "active").length;

        setStats({
          totalInstitutes: allInstitutes.length,
          activeInstitutes,
          pendingInstitutes,
          totalPayments: payments.length,
          totalPaymentAmount,
          totalCertificates: certificates.length,
          issuedCertificates,
          pendingCertificates,
          totalServices: services.length,
          publishedServices,
        });

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoadingState(false);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setLoading]);

  const isValidStatus = (status: string): status is "pending" | "active" | "Rejected" => {
    return ["pending", "active", "Rejected"].includes(status);
  };

  // Filter only pending institutes
  const pendingInstitutes = institutes.filter((inst) => 
    inst.accredite_status === "pending" && 
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const counterCards = [
    {
      title: "Total Registered Institutes",
      count: stats.totalInstitutes,
      icon: "/assets/images/checklist.png",
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      title: "Active Student Registrations",
      count: stats.activeInstitutes,
      icon: "/assets/images/checklist.png",
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      title: "Total Certifications Issued",
      count: stats.issuedCertificates,
      icon: "/assets/images/checklist.png",
      bgColor: "bg-white",
      textColor: "text-black"
    },
    {
      title: "Pending Institute Requests",
      count: stats.pendingInstitutes,
      icon: "/assets/images/pending.png",
      bgColor: "bg-white",
      textColor: "text-black"
    }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl font-semibold text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Card Bar */}
        <div className="bg-white rounded-md shadow p-4 m-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387-1.414 1.414-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z" />
                </svg>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              <Image
                src="/assets/images/profile.png"
                alt="Profile"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Greeting Section */}
        <div className="bg-yellow-50 p-4 mx-6 rounded-md flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-lg font-bold">Hi, Good morning!</h2>
          <div className="flex items-center text-green-600 text-sm space-x-1">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 20v-6h4v6h5v-8h3L10 0 2 12h3v8z" />
            </svg>
            <span>Dashboard / Request Forms</span>
          </div>
        </div>

        {/* Main Counter Cards - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 mb-6">
          {counterCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:scale-105`}
            >
              <div className="w-16 h-16 mb-4 flex items-center justify-center">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
              <p className={`text-3xl font-bold ${card.textColor}`}>{card.count}</p>
            </div>
          ))}
        </div>

        {/* System Overview Section */}
        <div className="mx-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{stats.totalInstitutes}</div>
                <div className="text-sm text-gray-500">Total Institutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{stats.issuedCertificates}</div>
                <div className="text-sm text-gray-500">Certificates Issued</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">${stats.totalPaymentAmount.toFixed(0)}</div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Institutes DataTable */}
        <div className="mx-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Pending Institute Requests</h3>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                {stats.pendingInstitutes} Pending
              </span>
            </div>
            
            {pendingInstitutes.length > 0 ? (
              <DataTable
                className="display"
                options={{
                  paging: true,
                  searching: false,
                  info: false,
                  lengthChange: false,
                  pageLength: 10,
                  ordering: true,
                  order: [[0, "desc"]], // Sort by date descending (newest first)
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Organization/Institute</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingInstitutes.map((item) => (
                    <tr key={item.id}>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>{item.name}</td>
                      <td>
                        <span className="px-2 py-1 rounded text-white bg-yellow-400">
                          {isValidStatus(item.accredite_status)
                            ? item.accredite_status
                            : "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-lg font-medium">No Pending Institutes</div>
                <div className="text-sm">All institute requests have been processed</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}