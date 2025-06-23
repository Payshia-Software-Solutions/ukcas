"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import config from "@/config";
import Sidebar from "../Sidebar";
import AddPayment from "./PaymentForm";
import { useLoader } from "@/app/context/LoaderContext";
import { useRouter } from "next/navigation";
import { FaRegCreditCard, FaDollarSign } from "react-icons/fa";

// Payment type definition
interface Payment {
  id: number;
  institute_id: number;
  description: string;
  amount: number;
  status: "Paid" | "Unpaid";
  reference_id: string;
  type: "credit" | "debit";
  created_by: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  Institute?: { id: number; name: string };
}

// PaymentList component with enhanced UI
const PaymentList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/payment`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Error fetching payments:", err));
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const instituteName = payment.Institute?.name.toLowerCase() || "";
    return (
      instituteName.includes(searchQuery.toLowerCase()) ||
      (payment.reference_id?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      payment.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);
  const startIndex = (currentPage - 1) * paymentsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, startIndex + paymentsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Payments</h2>
        <input
          type="text"
          placeholder="Search payments..."
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-600"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider cursor-pointer select-none">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider cursor-pointer select-none">
                Institute
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider cursor-pointer select-none">
                Type
              </th>
              <th className="px-4 py-3 text-right font-semibold uppercase tracking-wider cursor-pointer select-none">
                Amount (₨)
              </th>
              <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider cursor-pointer select-none">
                Reference ID
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {currentPayments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-gray-400">
                  No payments found.
                </td>
              </tr>
            ) : (
              currentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3">
                    {new Date(payment.created_at).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-3">{payment.Institute?.name || "N/A"}</td>
                  <td className="px-4 py-3 capitalize">{payment.type.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-right">{payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-3">{payment.reference_id || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-6 flex items-center justify-end space-x-4 text-gray-700 text-sm select-none"
          aria-label="Pagination"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="font-semibold">
            {currentPage} - {Math.min(currentPage * paymentsPerPage, filteredPayments.length)} of{" "}
            {filteredPayments.length}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
};

export default function PaymentDashboard() {
  const router = useRouter();
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(false);

    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/payment`);
        const payments: Payment[] = response.data;

        setTotalPayments(payments.length);

        const total = payments.reduce(
          (sum: number, p: Payment) => sum + parseFloat(p.amount.toString() || "0"),
          0
        );
        setTotalAmount(total);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchPayments();
  }, [setLoading]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
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

        {/* Back Link */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 text-xl font-semibold flex items-center mt-6 cursor-pointer"
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
            Payment
          </button>
        </div>

        {/* Title & Button */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-bold">Payment Dashboard</h1>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl shadow hover:bg-gray-800 transition cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Make New Payment
          </button>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
            <div className="text-4xl text-blue-600">
              <FaRegCreditCard />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Payments</p>
              <p className="text-2xl font-bold">{totalPayments}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
            <div className="text-4xl text-green-600">
              <FaDollarSign />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Payment Amount</p>
              <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment list below counters */}
        <PaymentList />

        {/* Modal for Add Payment */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
            {/* Modal with fixed size and overflow handling */}
            <div className="bg-white rounded-md shadow-lg w-[50%] max-w-2xl relative max-h-[50vh] overflow-hidden pl-0 pr-0 pt-0 pb-0">

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer text-xl"
              >
                ✖
              </button>

              {/* Content of the modal */}
              <div className="overflow-y-auto max-h-full">
                <AddPayment onCancel={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Add this function to handle closing the modal
  function handleCloseModal() {
    setIsModalOpen(false);
  }
}
