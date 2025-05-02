"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ApprovalCard } from "../Common/ApprovalCard";
import { RejectCard } from "../Common/RejectCard";
import config from "@/config";

interface FullFormProps {
  id: string;
}

interface AccrediteData {
  id: string | number;
  name?: string;
  address_line_1?: string;
  address_line_2?: string;
  province?: string;
  country?: string;
  year_of_inception?: number;
  website?: string;
  mini_description_of_instit?: string;
  phone_number?: string;
  email?: string;
  message?: string;
  accredite_status?: string;
  created_by?: string;
  updated_by?: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function FullForm({ id }: FullFormProps) {
  const [data, setData] = useState<AccrediteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Function to format the complete address
  const getFormattedAddress = (data: AccrediteData) => {
    const parts = [
      data.address_line_1,
      data.address_line_2,
      data.province,
      data.country
    ].filter(Boolean);
    
    return parts.join(", ");
  };

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    axios
      .get(`${config.API_BASE_URL}/accredite/${id}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching accredite data:", error);
        setError("Error fetching data");
        setIsLoading(false);
      });
      
  }, [id]);

  // Handle successful approval (callback from ApprovalCard)
  const handleApprovalSuccess = () => {
    // Update local state to reflect the change
    if (data) {
      setData({
        ...data,
        accredite_status: "active"
      });
    }
  };

  // Handle successful rejection
  const handleRejectionSuccess = () => {
    // Just update the local UI state to reflect deletion
    // We'll leave the modal showing its success message
    console.log("Rejection successful, updating UI state");
    // Don't immediately set data to null as it may cause UI issues
    // The modal will handle showing the success message
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (data) {
    return (
      <div className="bg-white p-6 rounded-lg">
        {/* Only the content section, without duplicating headers */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-bold text-gray-700">{data.name || "Institution Name"}</h2>
          <p className="text-sm text-gray-600">Request ID: {data.id}</p>
          <p className="text-sm text-gray-600">
            Status: <span className={`font-medium ${data.accredite_status === "active" ? "text-green-600" : "text-amber-600"}`}>
              {data.accredite_status === "active" ? "Active" : "Pending"}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700">Address:</p>
              <p className="text-gray-600">{getFormattedAddress(data) || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Year of Inception:</p>
              <p className="text-gray-600">{data.year_of_inception || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Profile of Institution:</p>
              <p className="text-gray-600">{data.mini_description_of_instit || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Website:</p>
              <p className="text-gray-600">
                {data.website ? (
                  <a 
                    href={data.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {data.website}
                  </a>
                ) : "Not provided"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700">Phone:</p>
              <p className="text-gray-600">{data.phone_number || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Email:</p>
              <p className="text-gray-600">{data.email || "Not provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Message:</p>
              <p className="text-gray-600">{data.message || "No message provided"}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Created By:</p>
              <p className="text-gray-600">{data.created_by || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setIsRejectModalOpen(true)}
            className="w-36 h-10 border-2 border-red-500 text-red-600 font-semibold rounded-xl hover:bg-red-100"
            disabled={data.accredite_status === "active"}
          >
            Reject
          </button>

          <button 
            className="w-36 h-10 border-2 border-gray-400 text-gray-700 font-semibold rounded-xl hover:bg-gray-100"
            disabled={data.accredite_status === "active"}
          >
            Request more 
          </button>

          <button
            onClick={() => setIsApproveModalOpen(true)}
            className="w-36 h-10 bg-black text-white font-semibold rounded-xl hover:bg-gray-800"
            disabled={data.accredite_status === "active"}
          >
            Approve
          </button>
        </div>

        {/* Approve Modal */}
        {isApproveModalOpen && (
          <ApprovalCard 
            setIsApproveModalOpen={setIsApproveModalOpen} 
            id={data.id.toString()}
            name={data.name || ""}
            onApprovalSuccess={handleApprovalSuccess}
          />
        )}

        {/* Reject Modal */}
        {isRejectModalOpen && (
          <RejectCard 
            setIsRejectModalOpen={setIsRejectModalOpen}
            id={data.id.toString()}
            name={data.name || ""}
            onRejectionSuccess={handleRejectionSuccess}
          />
        )}
      </div>
    );
  }

  return null;
}