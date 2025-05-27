"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddPayment() {
  const router = useRouter();

  const [institutes, setInstitutes] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    institute_id: "",
    description: "",
    amount: "",
    status: "Unpaid",
    reference_id: "",
    type: "debit",
    created_by: "admin",
  });

  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/institute`);
        setInstitutes(response.data);
      } catch (error) {
        console.error("Failed to fetch institutes", error);
        toast.error("Failed to load institutes");
      }
    }
    fetchInstitutes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        institute_id: parseInt(formData.institute_id),
        amount: parseFloat(formData.amount),
      };

      await axios.post(`${config.API_BASE_URL}/payment`, payload);
      toast.success("Payment recorded successfully");
      router.push("/payment");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to record payment");
    }
  };

  const inputStyle =
    "border border-gray-200 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400";

  return (
    <div className="w-full min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Add Payment</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill in all the required fields to record the payment.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Institute */}
            <label className="w-full">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Institute</span>
              <select
                name="institute_id"
                value={formData.institute_id}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select institute</option>
                {institutes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </label>

            {/* Amount */}
            <label className="w-full">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Amount</span>
              <input
                type="number"
                step="0.01"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </label>

            {/* Type */}
            <label className="w-full">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Type</span>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            </label>

            {/* Status */}
            <label className="w-full">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Status</span>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </label>

            {/* Reference ID */}
            <label className="w-full md:col-span-2">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Reference ID</span>
              <input
                type="text"
                name="reference_id"
                placeholder="Enter reference ID"
                value={formData.reference_id}
                onChange={handleChange}
                className={inputStyle}
              />
            </label>

            {/* Description */}
            <label className="w-full md:col-span-2">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">Description</span>
              <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </label>
          </div>

          {/* Submit buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md text-sm cursor-pointer hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
