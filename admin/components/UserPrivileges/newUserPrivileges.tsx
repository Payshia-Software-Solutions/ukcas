import React, { useEffect } from "react";
import { useLoader } from "@/app/context/LoaderContext";
import Sidebar from "../Sidebar";

// ✅ Rename to PascalCase (starts with uppercase)
const NewUserPrivileges = () => {
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]); // ✅ Include setLoading as dependency

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <div>
            <h1 className="text-2xl font-bold">Create New User Privileges</h1>
          </div>
        </div>
        {/* Content */}
      </div>
    </div>
  );
};

export default NewUserPrivileges;
