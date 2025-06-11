"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddStudent() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    institute_name: "",
    email: "",
    password: "",
    reEnterPassword: "",
    registered_date: "",
    institute_address: "",
    created_by: "admin",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    if (formData.password !== formData.reEnterPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validatePassword()) return;

    try {
      // Build clean payload object
      const payload = {
        institute_name: formData.institute_name,
        email: formData.email,
        password: formData.password,
        registered_date: formData.registered_date || new Date().toISOString(),
        institute_address: formData.institute_address,
        created_by: formData.created_by,
      };

      await axios.post(`${config.API_BASE_URL}/user`, payload);

      toast.success("User registered successfully");
      router.push("/user");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to register user");
    }
  };

  const inputStyle =
    "border border-gray-100 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400";

  return (
    <div className="w-full min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-2">User Registration</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill in all the required information
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Profile Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institute Name */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Institute Name
                </span>
                <input
                  type="text"
                  name="institute_name"
                  placeholder="Enter institute name"
                  value={formData.institute_name}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Email */}
              <label className="w-full">
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

              {/* Password */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Re-Enter Password */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Re-Enter Password
                </span>
                <input
                  type="password"
                  name="reEnterPassword"
                  placeholder="Re-enter password"
                  value={formData.reEnterPassword}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

              {/* Registered Date */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Registered Date
                </span>
                <input
                  type="date"
                  name="registered_date"
                  value={formData.registered_date}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </label>

              {/* Institute Address */}
              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Institute Address
                </span>
                <input
                  type="text"
                  name="institute_address"
                  placeholder="Enter full address"
                  value={formData.institute_address}
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
              className="px-6 py-2 bg-gray-200 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md text-sm cursor-pointer hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
