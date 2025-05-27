"use client";

import React, { useEffect } from "react";
import { useLoader } from "@/app/context/LoaderContext";
import Sidebar from "../Sidebar"; // ✅ Import loader context
import Image from "next/image"; // ✅ Import Image component

const PaymentNew = () => {
  const { setLoading } = useLoader(); // ✅ useLoader hook

  useEffect(() => {
    setLoading(false); // ✅ Turn off loader when page loads
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
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
        </div>
    </div>
  );
};
export default PaymentNew;
