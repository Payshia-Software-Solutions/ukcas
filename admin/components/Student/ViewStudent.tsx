"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import config from "@/config";

interface Student {
  id: string;
  first_name: string;
  last_name: string;
  institute_id?: string;
  institute?: { name: string };
  country: string;
  student_id?: string;
  nic?: string;
  birthday?: string;
  address?: string;
  phone_number?: string;
  email?: string;
  photo?: string;
}

const StudentList = ({ searchQuery }: { searchQuery: string }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const studentsPerPage = 6;

  useEffect(() => {
    axios
      .get(`${config.API_BASE_URL}/student`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  // Filter students by searchQuery
  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCloseModal = () => setSelectedStudent(null);

  return (
    <div className="p-6">
      <h2 className="text-lg text-gray-500 mb-4">Show All Students</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                {student.photo ? (
                  <Image
                    src={student.photo}
                    alt="Student Photo"
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder.png"
                    alt="Placeholder"
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-md font-bold text-gray-700">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-sm text-gray-600">
                  <strong>Student Id:</strong> {student.student_id ? student.student_id : "N/A"} <br />
                  <strong>Institute:</strong> {student.institute?.name || "XYZ Institute"} <br />
                  <strong>Country:</strong> {student.country || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="text-gray-600 hover:text-black text-sm px-3 py-1 rounded border flex items-center gap-1"
                onClick={() => setSelectedStudent(student)}
              >
                <FaEye size={14} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Student View Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                {selectedStudent.photo ? (
                  <Image
                    src={selectedStudent.photo}
                    alt="Student Photo"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder.png"
                    alt="Placeholder"
                    width={40}
                    height={40}
                  />
                )}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {selectedStudent.first_name} {selectedStudent.last_name}
              </h2>
              <p className="text-sm text-gray-600">
                {selectedStudent.student_id ? selectedStudent.student_id : "N/A"} <br />
                {selectedStudent.institute?.name || "XYZ Institute"}
              </p>
            </div>

            <div className="mt-6 space-y-2 text-sm text-gray-700">
              <p><strong>NIC Number:</strong> {selectedStudent.nic || "-"}</p>
              <p><strong>Birth Day:</strong> {selectedStudent.birthday || "-"}</p>
              <p><strong>Address:</strong> {selectedStudent.address || "-"}</p>
              <p><strong>Institute:</strong> {selectedStudent.institute?.name || "-"}</p>
              <p><strong>Phone:</strong> {selectedStudent.phone_number || "-"}</p>
              <p><strong>Email:</strong> {selectedStudent.email || "-"}</p>
            </div>

            <div className="mt-4 flex justify-center gap-2">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm">NIC Images</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm">A/L Certificate</button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm">O/L Certificate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
