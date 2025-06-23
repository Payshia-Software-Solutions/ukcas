"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import config from "@/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Accept onSuccess prop to trigger counter update
export default function AddCertificate({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) {

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
    created_by: "admin",
  });

  const [institutes, setInstitutes] = useState<{ id: number; name: string }[]>([]);
  const [students, setStudents] = useState<{ id: number; student_id: string }[]>([]);
  const [loadingInstitutes, setLoadingInstitutes] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Fetch institutes
  useEffect(() => {
    const fetchInstitutes = async () => {
      setLoadingInstitutes(true);
      try {
        const response = await axios.get(`${config.API_BASE_URL}/institute`);
        setInstitutes(response.data);
      } catch (error) {
        console.error("Failed to fetch institutes:", error);
        toast.error("Failed to load institutes");
      } finally {
        setLoadingInstitutes(false);
      }
    };
    fetchInstitutes();
  }, []);

  // Fetch students by institute
  useEffect(() => {
    const fetchStudents = async (instituteId: number) => {
      setLoadingStudents(true);
      try {
        const response = await axios.get(
          `${config.API_BASE_URL}/student/institute/${instituteId}`
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to load students");
        setStudents([]);
      } finally {
        setLoadingStudents(false);
      }
    };

    if (formData.organization) {
      const selectedInstitute = institutes.find(
        (inst) => inst.name === formData.organization
      );
      if (selectedInstitute) {
        fetchStudents(selectedInstitute.id);
      } else {
        setStudents([]);
      }
      setFormData((prev) => ({ ...prev, student_id: "" }));
    }
  }, [formData.organization, institutes]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${config.API_BASE_URL}/certificates`, formData);

      toast.success("Certificate created successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // ✅ Trigger parent state update
      if (onSuccess) onSuccess();

      setTimeout(() => {
        router.push("/certificate");
      }, 2000);
    } catch (error) {
      console.error("Error submitting certificate form:", error);
      toast.error("Failed to create certificate", {
        position: "top-right",
      });
    }
  };

  const inputStyle =
    "border border-gray-100 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400";

  return (
    <div className="w-full min-h-screen p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-2">Certificate Creation</h2>
        <p className="text-sm text-gray-500 mb-6">
          Please fill in all the required information
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">
              Certificate Details
            </h3>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institute Dropdown */}
              <label className="w-full md:col-span-1">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Organization / Institute
                </span>
                <select
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">
                    {loadingInstitutes ? "Loading institutes..." : "Select Institute"}
                  </option>
                  {institutes.map((inst) => (
                    <option key={inst.id} value={inst.name}>
                      {inst.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Student Dropdown */}
              <label className="w-full">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student ID
                </span>
                <select
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                  disabled={!formData.organization || loadingStudents}
                >
                  <option value="">
                    {loadingStudents
                      ? "Loading students..."
                      : !formData.organization
                      ? "Select institute first"
                      : "Select Student ID"}
                  </option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.student_id}
                    </option>
                  ))}
                </select>
              </label>

              {/* Other Fields */}
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

              <label className="w-full md:col-span-2">
                <span className="text-sm font-semibold text-gray-700 mb-1 block">
                  Student Name (Full)
                </span>
                <input
                  type="text"
                  name="student_name_full"
                  placeholder="e.g. John Perera"
                  value={formData.student_name_full}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </label>

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
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-200 rounded-md text-sm cursor-pointer hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-md text-sm cursor-pointer hover:bg-gray-800 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
