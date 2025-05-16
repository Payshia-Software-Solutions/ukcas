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
    first_name: "",
    last_name: "",
    institute_id: "",   
    nic: "",
    birthday: "",
    country: "",
    address: "",
    phone_number: "",
    email: "",
    created_by: "admin",
  });

  const [documents, setDocuments] = useState({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(`Input Changed - Field: ${name}, Value: ${value}`);  // Log input changes
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    console.log(`File Changed - Field: ${name}, File:`, files?.[0]);  // Log file input changes
    setDocuments((prev) => ({ ...prev, [name]: files && files[0] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append form fields, converting institute_id to integer string
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "institute_id") {
          const val = parseInt(value as string, 10).toString();
          console.log(`Appending form field: ${key} = ${val}`);
          formDataToSend.append(key, val);
        } else {
          console.log(`Appending form field: ${key} = ${value}`);
          formDataToSend.append(key, value);
        }
      });

      // Append files if any
      Object.entries(documents).forEach(([key, file]) => {
        if (file instanceof File) {
          console.log(`Appending file: ${key}`, file);
          formDataToSend.append(key, file);
        }
      });

      console.log("Sending form data via POST to:", `${config.API_BASE_URL}/student`);
      await axios.post(`${config.API_BASE_URL}/student`, formDataToSend);

      toast.success("Student registered successfully");
      router.back();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to register student");
    }
  };

  const inputStyle = `border border-gray-100 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400`;
  const fileInputStyle = `block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-blue-100`;

  return (
    <div className="w-full min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-2">Student Registration</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill in all the required information
        </p>

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  First Name
                </span>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Last Name
                </span>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Institute
                </span>
                <select
                  name="institute_id"  // <-- Must match backend model field name
                  value={formData.institute_id}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select institute</option>
                  <option value="1">Institute 1</option>
                </select>
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  NIC Number
                </span>
                <input
                  type="text"
                  name="nic"
                  placeholder="Enter NIC number"
                  value={formData.nic}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Birthday
                </span>
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Country
                </span>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  <option value="">Select country</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                </select>
              </label>
              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Address
                </span>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Phone Number
                </span>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Enter phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </label>
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
                />
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Document Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  NIC Front Side
                </span>
                <input
                  type="file"
                  name="nic_front"
                  onChange={handleFileChange}
                  className={fileInputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  NIC Back Side
                </span>
                <input
                  type="file"
                  name="nic_back"
                  onChange={handleFileChange}
                  className={fileInputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  A/L Certificate
                </span>
                <input
                  type="file"
                  name="al_certificate"
                  onChange={handleFileChange}
                  className={fileInputStyle}
                />
              </label>
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  O/L Certificate
                </span>
                <input
                  type="file"
                  name="ol_certificate"
                  onChange={handleFileChange}
                  className={fileInputStyle}
                />
              </label>
              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student Photo
                </span>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className={fileInputStyle}
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
              Submit Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
