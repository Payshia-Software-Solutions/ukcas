"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address_line_1: "",
    address_line_2: "",
    province: "",
    country: "",
    year_of_inception: "",
    website: "",
    mini_description_of_instit: "",
    phone_number: "",
    email: "",
    accredite_status: "active", // Default to "pending" for client-side submission
    created_by: "admin", // Hardcoded or use dynamic value
  });

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form data
  const validateForm = () => {
    if (
      !formData.name ||
      !formData.address_line_1 ||
      !formData.province ||
      !formData.country ||
      !formData.year_of_inception ||
      !formData.website ||
      !formData.mini_description_of_instit ||
      !formData.phone_number ||
      !formData.email
    ) {
      toast.warn("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/v2/accredite", formData);

      console.log("Response:", response.data);
      toast.success("Accreditation request sent successfully!");

      // Reset form after successful submission
      setFormData({
        name: "",
        address_line_1: "",
        address_line_2: "",
        province: "",
        country: "",
        year_of_inception: "",
        website: "",
        mini_description_of_instit: "",
        phone_number: "",
        email: "",
        accredite_status: "pending", // Reset to "pending" after submission
        created_by: "admin", // Reset to "admin" after submission
      });
    } catch (error) {
      toast.error("Failed to send accreditation request. Please try again.");
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error response:", error.response);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <h2 className="text-2xl font-semibold text-center mb-6">Add New Institute</h2>

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name of Organisation / Institute</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line 1</label>
            <input
              type="text"
              name="address_line_1"
              value={formData.address_line_1}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Address Line 2</label>
            <input
              type="text"
              name="address_line_2"
              value={formData.address_line_2}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Province / City / State</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Year of Inception</label>
            <input
              type="number"
              name="year_of_inception"
              value={formData.year_of_inception}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Brief Description of Institution</label>
            <textarea
              name="mini_description_of_instit"
              value={formData.mini_description_of_instit}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-black text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewForm;
