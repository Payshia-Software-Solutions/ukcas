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

// ✅ Payment type definition
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
}

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

        {/* Modal for Add Payment */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
              >
                ✖
              </button>
              <h2 className="text-2xl font-bold mb-4">Make New Payment</h2>
              <AddPayment />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
