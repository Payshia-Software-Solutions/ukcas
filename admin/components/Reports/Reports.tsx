"use client";

import Image from "next/image";
import Sidebar from "../Sidebar";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useLoader } from "@/app/context/LoaderContext";
import axios from "axios";
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

const tabs = [
  "Institute Reports",
  "Student Reports",
  "Payment Reports",
  "Certificate Reports",
] as const;

type Tab = typeof tabs[number];

interface InstituteReport {
  id: number;
  name: string;
  address: string;
  mobile_number: string;
}

interface StudentReport {
  id: number;
  student_id: string;
  first_name: string;
  last_name: string;
  birthday: string;
  nic: string;
  phone_number: string;
  email: string;
  address: string;
}

interface PaymentReport {
  id: number;
  institute_id: number;
  description: string;
  amount: number;
  reference_id: string;
  type: string;
}

interface CertificateReport {
  certificate_id: string;
  student_name_full: string;
  organization: string;
  student_grade: string;
  issued_date: string;
}

type ReportUnion = InstituteReport | StudentReport | PaymentReport | CertificateReport;

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Institute Reports");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [instituteReports, setInstituteReports] = useState<InstituteReport[]>([]);
  const [studentReports, setStudentReports] = useState<StudentReport[]>([]);
  const [paymentReports, setPaymentReports] = useState<PaymentReport[]>([]);
  const [certificateReports, setCertificateReports] = useState<CertificateReport[]>([]);

  const { setLoading } = useLoader();
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (activeTab === "Institute Reports") {
      axios.get("http://localhost:5000/api/v2/institute").then((res) => {
        setInstituteReports(res.data);
      });
    }
    if (activeTab === "Student Reports") {
      axios.get("http://localhost:5000/api/v2/student").then((res) => {
        setStudentReports(res.data);
      });
    }
    if (activeTab === "Payment Reports") {
      axios.get("http://localhost:5000/api/v2/payment").then((res) => {
        setPaymentReports(res.data);
      });
    }
    if (activeTab === "Certificate Reports") {
      axios.get("http://localhost:5000/api/v2/certificates").then((res) => {
        setCertificateReports(res.data);
      });
    }
  }, [activeTab]);

  const getInstituteName = (id: number): string => {
    const inst = instituteReports.find((i) => i.id === id);
    return inst ? inst.name : "Unknown";
  };

  const reportsData: Record<Tab, ReportUnion[]> = {
    "Institute Reports": instituteReports,
    "Student Reports": studentReports,
    "Payment Reports": paymentReports,
    "Certificate Reports": certificateReports,
  };

  const activeReports = reportsData[activeTab];

  let detailTableColumns: string[] = [];
  let detailTableData: string[][] = [];

  if (activeTab === "Institute Reports" && activeReports.length > 0) {
    const selected = activeReports[selectedIndex] as InstituteReport;
    detailTableColumns = ["Institute ID", "Institute Name", "Address", "Phone"];
    detailTableData = [[
      selected.id.toString(),
      selected.name,
      selected.address,
      selected.mobile_number
    ]];
  } else if (activeTab === "Student Reports" && activeReports.length > 0) {
    const selected = activeReports[selectedIndex] as StudentReport;
    detailTableColumns = [
      "Student ID",
      "Name",
      "Birthday",
      "NIC",
      "Phone Number",
      "Email",
      "Address",
    ];
    detailTableData = [[
      selected.student_id,
      `${selected.first_name} ${selected.last_name}`,
      selected.birthday?.split("T")[0] ?? "",
      selected.nic,
      selected.phone_number,
      selected.email,
      selected.address,
    ]];
  } else if (activeTab === "Payment Reports" && activeReports.length > 0) {
    const selected = activeReports[selectedIndex] as PaymentReport;
    detailTableColumns = [
      "Institute Name",
      "Amount",
      "Reference ID",
      "Description",
      "Type"
    ];
    detailTableData = [[
      getInstituteName(selected.institute_id),
      selected.amount.toString(),
      selected.reference_id,
      selected.description,
      selected.type
    ]];
  } else if (activeTab === "Certificate Reports" && activeReports.length > 0) {
    const selected = activeReports[selectedIndex] as CertificateReport;
    detailTableColumns = [
      "Certificate ID",
      "Student Full Name",
      "Organization",
      "Grade",
      "Issued Date"
    ];
    detailTableData = [[
      selected.certificate_id,
      selected.student_name_full,
      selected.organization,
      selected.student_grade,
      selected.issued_date
    ]];
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 space-y-6">
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

        <div className="flex flex-1 gap-6">
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
                      <th className="px-4 py-2 font-semibold">Institute Name</th>
                      <th className="px-4 py-2 font-semibold">Amount</th>
                    </>
                  )}
                  {activeTab === "Certificate Reports" && (
                    <>
                      <th className="px-4 py-2 font-semibold">Certificate ID</th>
                      <th className="px-4 py-2 font-semibold">Student Name</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeReports.map((report, index) => (
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
                        <td className="px-4 py-2">{(report as StudentReport).student_id}</td>
                        <td className="px-4 py-2">{`${(report as StudentReport).first_name} ${(report as StudentReport).last_name}`}</td>
                      </>
                    )}
                    {activeTab === "Payment Reports" && (
                      <>
                        <td className="px-4 py-2">{getInstituteName((report as PaymentReport).institute_id)}</td>
                        <td className="px-4 py-2">{(report as PaymentReport).amount}</td>
                      </>
                    )}
                    {activeTab === "Certificate Reports" && (
                      <>
                        <td className="px-4 py-2">{(report as CertificateReport).certificate_id}</td>
                        <td className="px-4 py-2">{(report as CertificateReport).student_name_full}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md p-6 overflow-auto max-h-[70vh] border border-gray-200">
            {detailTableData.length === 0 ? (
              <p className="text-center text-gray-400 mt-20">No reports available.</p>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  key={activeTab + selectedIndex}
                  className="display"
                  data={detailTableData}
                  options={{
                    paging: true,
                    searching: true,
                    info: true,
                    lengthChange: true,
                    pageLength: 5,
                    ordering: true,
                    destroy: true,
                  }}
                >
                  <thead>
                    <tr>
                      {detailTableColumns.map((col) => (
                        <th
                          key={col}
                          className="bg-gray-400 px-6 py-3 border-r last:border-r-0 whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                </DataTable>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
