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
    created_by: "admin",
    type: "topup", // Changed from 'category' to 'type' to match backend
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Validate form data
    if (!formData.institute_id || !formData.description || !formData.amount || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        institute_id: parseInt(formData.institute_id),
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        type: formData.type,
        created_by: formData.created_by,
      };

      console.log("Submitting payload:", payload); // For debugging

      const response = await axios.post(`${config.API_BASE_URL}/payment`, payload);
      
      toast.success(response.data.message || "Payment recorded successfully");
      
      // Reset form
      setFormData({
        institute_id: "",
        description: "",
        amount: "",
        created_by: "admin",
        type: "topup",
      });
      
      // Navigate back after a short delay to show the success message
      setTimeout(() => {
        router.push("/payment");
      }, 1500);
      
    } catch (error: unknown) {
      console.error("Error submitting form:", error);

      // Type guard for handling error object properly
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else if (error.response?.data?.details) {
          // Handle validation errors
          const errorMessages = error.response.data.details.map(
            (detail: { field: string; message: string }) => 
              `${detail.field}: ${detail.message}`
          ).join(", ");
          toast.error(errorMessages);
        } else {
          toast.error("Failed to record payment. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
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
              <span className="text-sm font-semibold text-gray-700 mb-1 block">
                Institute <span className="text-red-500">*</span>
              </span>
              <select
                name="institute_id"
                value={formData.institute_id}
                onChange={handleChange}
                className={inputStyle}
                required
                disabled={isSubmitting}
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
              <span className="text-sm font-semibold text-gray-700 mb-1 block">
                Amount <span className="text-red-500">*</span>
              </span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className={inputStyle}
                required
                disabled={isSubmitting}
              />
            </label>

            {/* Payment Type */}
            <label className="w-full">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">
                Payment Type <span className="text-red-500">*</span>
              </span>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={inputStyle}
                required
                disabled={isSubmitting}
              >
                <option value="topup">Topup</option>
                <option value="certificate_fee">Certificate Fee</option>
              </select>
            </label>

            {/* Description */}
            <label className="w-full md:col-span-2">
              <span className="text-sm font-semibold text-gray-700 mb-1 block">
                Description <span className="text-red-500">*</span>
              </span>
              <input
                type="text"
                name="description"
                placeholder="Enter payment description"
                value={formData.description}
                onChange={handleChange}
                className={inputStyle}
                required
                disabled={isSubmitting}
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-gray-300 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md text-sm cursor-pointer hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
