'use client';

import React, { useState, ChangeEvent } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ServiceFormData {
  title: string;
  category: string;
  description: string;
  img_url: string;
  created_by: string;
  updated_by: string;
}

interface LeftSideProps {
  onCreateSuccess: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ onCreateSuccess }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    category: "",
    description: "",
    img_url: "",
    created_by: "admin_user",
    updated_by: "admin_user",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.files?.[0]?.name || "";
    if (fileName) {
      setFormData((prev) => ({
        ...prev,
        img_url: fileName,
      }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/v2/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Service created successfully!");
      onCreateSuccess(); // Keep if you need to update the list or counter
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to create service.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl text-gray-600 font-bold mb-4">
        Create New Service
      </h2>

      {/* Title */}
      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">
          Service Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter title here"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white shadow-md"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">
          Service Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <option value="">Choose Category</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Consulting">Consulting</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">
          Title Image
        </label>
        <div className="flex items-center space-x-4 bg-[#fff7e6] p-3 rounded-lg">
          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center border border-dashed shadow-sm">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3v18h18" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-md text-gray-500 mb-1">
              Please upload square image, size less than 100KB
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              className="border px-3 py-1 w-full rounded-lg text-sm bg-white"
            />
            <p className="text-xs text-gray-500 mt-1">
              Current image:{" "}
              {formData.img_url ? formData.img_url.split("/").pop() : "No file selected"}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold text-xl text-gray-500 mb-1">
          Service Description
        </label>
        <Editor
              apiKey="bcmoy3sawjsp7clc7s2dwfar6vmlq11b4mvsxok6bwh2q08b"
              value={formData.description}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "lists", "link", "image", "charmap", "preview", "anchor",
                  "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | formatselect | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help"
              }}
              onEditorChange={handleEditorChange}
            />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`w-full ${
          isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-black"
        } text-white text-xl font-semibold py-3 rounded-xl shadow-md`}
      >
        {isSubmitting ? "Submitting..." : "Done !"}
      </button>
    </div>
  );
};

export default LeftSide;
