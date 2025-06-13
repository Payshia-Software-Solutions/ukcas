import React, { useEffect, useState } from "react";
import { useLoader } from "@/app/context/LoaderContext";
import Sidebar from "../Sidebar";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import axios from "axios";
import config from "@/config";
import { FaUsers } from "react-icons/fa";

// Define a type for selected user
type UserData = {
  id: number;
  email: string;
  name: string;
  account: string;
  role: string;
};

const NewUserPrivileges = () => {
  const { setLoading } = useLoader();
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  useEffect(() => {
    setLoading(false);

    const fetchUserCount = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/user`);
        setUserCount(response.data.length);
      } catch (error) {
        console.error("Error fetching user count", error);
      }
    };

    fetchUserCount();
  }, [setLoading]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <h1 className="text-2xl font-bold">Create New User Privileges</h1>
        </div>

        {/* Counter Section */}
       <div className="bg-white p-6 rounded-2xl shadow flex items-center space-x-4 w-130 h-28">
          <div className="bg-gray-100 p-3 rounded-full text-gray-700">
            <FaUsers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Registered Users</p>
            <h2 className="text-xl font-bold">{userCount}</h2>
          </div>
        </div>


        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Card */}
          <div className="bg-white rounded-md shadow p-4">
            <LeftSide onSelectUser={setSelectedUser} />
          </div>

          {/* Right Card */}
          <div className="bg-white rounded-md shadow p-4">
            <RightSide user={selectedUser ?? undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserPrivileges;
