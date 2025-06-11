"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Image from "next/image";
import Sidebar from "../Sidebar";
import { useRouter } from "next/navigation";
import DataTable, { TableColumn } from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config";
import UserForm from "./UserForm"; 
import { useLoader } from "@/app/context/LoaderContext"

// User type definition
interface User {
  id: number;
  institute_name: string;
  institute_address: string;
  registered_date: string;
  email: string;
}

const UserDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  
  const { setLoading } = useLoader();
  // Fetching user data from the API
  useEffect(() => {
    setLoading(false);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        toast.error("Failed to load users");
      }
    };
    fetchUsers();
  }, [setLoading]);

  // Memoized search input
  const subHeaderComponentMemo = useMemo(() => {
    return (
      <input
        type="text"
        placeholder="Search users..."
        className="px-4 py-2 border rounded-md text-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }, [searchTerm]);

  // Columns definition for DataTable (Filtered only relevant fields)
  const columns: TableColumn<User>[] = [
    {
      name: "Institute Name",
      selector: (row) => row.institute_name,
      sortable: true,
    },
    {
      name: "Institute Address",
      selector: (row) => row.institute_address,
    },
    {
      name: "Registered Date",
      selector: (row) => row.registered_date,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
  ];

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    return (
      user.institute_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.institute_address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <div>
            <h1 className="text-2xl font-bold">Good Morning !</h1>
            <p className="text-sm text-gray-500">04 April 2025</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                width={40}
                height={40}
                src="/assets/images/profile.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-gray-600 text-xl font-semibold flex items-center mt-6 cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            User Dashboard
          </button>
        </div>

        {/* Add New User Button */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
          <h1 className="text-xl font-bold">User Dashboard</h1>
          <button
            className="bg-black text-white px-4 py-2 rounded-xl shadow hover:bg-gray-800 transition cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            + Add New User
          </button>
        </div>

        {/* Data Table for Users */}
        <DataTable
          title="Users"
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
          striped
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
        />
      </div>

      {/* Modal for Add New User */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[80%] max-w-3xl relative max-h-[70vh] overflow-hidden">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer text-xl"
            >
              ✖
            </button>
            <UserForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
