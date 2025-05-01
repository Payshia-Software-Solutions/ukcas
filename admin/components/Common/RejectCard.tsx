import React, { useState } from "react";
import axios from "axios";
import config from "@/config";

interface RejectCardProps {
  setIsRejectModalOpen: (open: boolean) => void;
  id: string;
  name: string;
  onRejectionSuccess?: () => void;
}

export const RejectCard: React.FC<RejectCardProps> = ({ 
  setIsRejectModalOpen, 
  id, 
  name,
  onRejectionSuccess 
}) => {
  const [isRejected, setIsRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReject = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${config.API_BASE_URL}/accredite/${id}`);
      console.log("Delete response:", response);
      setIsRejected(true);
      if (onRejectionSuccess) {
        onRejectionSuccess();
      }
    } catch (err) {
      setError("Failed to reject the request. Please try again.");
      console.error("Error rejecting request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setIsRejectModalOpen(false);
    setIsRejected(false);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
      {!isRejected ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-[700px] relative">
          <button
            onClick={() => setIsRejectModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            aria-label="Close"
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold mb-4 underline">Warning!</h2>
          <p className="text-black mb-8 text-lg">
            Are you sure #{id} {name} wants to be rejected?
          </p>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              onClick={() => setIsRejectModalOpen(false)}
              className="w-full md:w-40 h-10 border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              className="w-full md:w-40 h-10 bg-red-600 text-white rounded-xl hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-[600px] relative text-center">
          <button
            onClick={handleDone}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            aria-label="Close"
          >
            ✖
          </button>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-700">
              Successfully Deleted
            </h2>
            <p className="text-lg mb-2 text-green-600">
              Institution: <span className="font-bold">&quot;{name}&quot;</span>
            </p>
            <p className="text-lg text-green-600">
              ID: <span className="font-bold">#{id}</span>
            </p>
          </div>
          <p className="text-lg mb-6 text-red-500">
            This institution has been successfully rejected and removed from the system.
          </p>
          <button
            onClick={handleDone}
            className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold"
          >
            Done!
          </button>
        </div>
      )}
    </div>
  );
};
