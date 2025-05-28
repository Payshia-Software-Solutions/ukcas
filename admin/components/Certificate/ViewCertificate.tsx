"use client";

import React from "react";
import { FaDownload, FaFileAlt } from "react-icons/fa";

interface Certificate {
  student_id: string;
  student_name_initial: string;
  student_name_full: string;
  student_grade: string;
  certificate_id: string;
  issued_date: string;
  email: string;
  organization: string;
}

export default function IssuedCertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl border-2 border-blue-200 relative">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Issued Certificate
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {/* Left Side */}
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Student ID:</strong> <span className="font-semibold">{certificate.student_id}</span>
            </p>
            <p>
              <strong>Student Name (with Initial):</strong>{" "}
              <span className="font-semibold">{certificate.student_name_initial}</span>
            </p>
            <p>
              <strong>Student Name (Full):</strong>{" "}
              <span className="font-semibold">{certificate.student_name_full}</span>
            </p>
            <p>
              <strong>Student Grade:</strong> <span className="font-semibold">{certificate.student_grade}</span>
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Certificate ID:</strong>{" "}
              <span className="font-semibold"># {certificate.certificate_id}</span>
            </p>
            <p>
              <strong>Issued Date:</strong>{" "}
              <span className="font-semibold">{certificate.issued_date}</span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span className="font-semibold">{certificate.email}</span>
            </p>
            <p>
              <strong>Organization / Institute:</strong>{" "}
              <span className="font-semibold">{certificate.organization}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm">
            <FaFileAlt /> View Certificate
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded hover:bg-gray-100 text-sm">
            <FaDownload /> Download
          </button>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-between items-center mt-8 px-2">
          <button className="border-2 border-black px-6 py-2 rounded-xl text-black font-medium hover:bg-gray-100">
            Re-issue Certificate
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700">
            Cancel Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
