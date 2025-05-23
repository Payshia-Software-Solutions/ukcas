"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCertificate() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    student_id: "",
    certificate_id: "",
    student_name_initial: "",
    issued_date: "",
    student_name_full: "",
    email: "",
    student_grade: "",
    organization: "",
    created_by: "admin"
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // If your API expects JSON, use JSON.stringify, else use FormData if file upload needed
      await axios.post(`${config.API_BASE_URL}/certificates`, formData);

      toast.success("Certificate created successfully");
      router.push("/certificates");
    } catch (error) {
      console.error("Error submitting certificate form:", error);
      toast.error("Failed to create certificate");
    }
  };

  const inputStyle =
    "border border-gray-100 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400";

  return (
    <div className="w-full min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Certificate Creation</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill in all the required information
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Certificate Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student ID */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student ID
                </span>
                <input
                  type="text"
                  name="student_id"
                  placeholder="Enter Student ID"
                  value={formData.student_id}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Certificate ID */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Certificate ID
                </span>
                <input
                  type="text"
                  name="certificate_id"
                  placeholder="Enter Certificate ID"
                  value={formData.certificate_id}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Student Name (with Initial) */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student Name (with Initial)
                </span>
                <input
                  type="text"
                  name="student_name_initial"
                  placeholder="e.g. J. Perera"
                  value={formData.student_name_initial}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Issued Date */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Issued Date
                </span>
                <input
                  type="date"
                  name="issued_date"
                  value={formData.issued_date}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Student Name (Full) */}
              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student Name (Full)
                </span>
                <input
                  type="text"
                  name="student_name_full"
                  placeholder="e.g. Jhon Perera"
                  value={formData.student_name_full}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Email */}
              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Student Grade */}
              <label className="w-full md:col-span-1">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student Grade
                </span>
                <input
                  type="text"
                  name="student_grade"
                  placeholder="Enter grade"
                  value={formData.student_grade}
                  onChange={handleChange}
                  className={inputStyle}
                  maxLength={2}
                  required
                />
              </label>

              {/* Organization / Institute */}
              <label className="w-full md:col-span-1">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Organization / Institute
                </span>
                <input
                  type="text"
                  name="organization"
                  placeholder="Enter organization or institute"
                  value={formData.organization}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md text-sm"
            >
              Submit Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
