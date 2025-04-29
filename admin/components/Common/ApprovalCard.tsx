import React, { useState } from "react";
import axios from "axios";

interface ApprovalCardProps {
  setIsApproveModalOpen: (open: boolean) => void;
  id: string;
  name?: string;
  onApprovalSuccess?: () => void;
}

export const ApprovalCard: React.FC<ApprovalCardProps> = ({
  setIsApproveModalOpen,
  id,
  name = "Institution",
  onApprovalSuccess,
}) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApprove = async () => {
    setIsLoading(true);
    setError("");

    try {
      console.log(`Attempting to update accreditation status for ID: ${id}`);

      const payload = {
        id: parseInt(id),
        status: "active",
        updated_by: "admin@example.com", // Replace with actual logged-in user
      };

      const response = await axios.put(
        `http://localhost:5000/api/v2/accredite/${id}/status`,
        payload
      );

      console.log("API response:", response);

      setIsApproved(true);
      if (onApprovalSuccess) {
        onApprovalSuccess();
      }
    } catch (err: unknown) {
      console.error("Error updating status:", err);

      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error("Response data:", err.response.data);
          console.error("Response status:", err.response.status);
          setError(
            `Server error (${err.response.status}): ${
              JSON.stringify(err.response.data) || "Unknown error"
            }`
          );
        } else if (err.request) {
          console.error("No response received:", err.request);
          setError("No response from server. Please check your connection.");
        } else {
          console.error("Axios error message:", err.message);
          setError(`Axios error: ${err.message}`);
        }
      } else if (err instanceof Error) {
        console.error("Generic error:", err.message);
        setError(`Error: ${err.message}`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDone = () => {
    setIsApproveModalOpen(false);
    setIsApproved(false);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm z-50">
      {!isApproved ? (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-[700px] relative">
          <button
            onClick={() => setIsApproveModalOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            aria-label="Close"
            disabled={isLoading}
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold mb-4">Warning!</h2>
          <p className="text-black mb-8 text-lg">
            Are you sure you want to approve #{id} {name} and add it to the
            system?
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="w-full md:w-40 h-10 border-2 border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleApprove}
              className={`w-full md:w-40 h-10 ${
                isLoading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
              } text-white rounded-xl flex items-center justify-center`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Confirm"
              )}
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
          <h2 className="text-2xl font-bold mb-2 text-gray-700">"{name}"</h2>
          <p className="text-lg mb-6 text-gray-500">
            Successfully added to the system.
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
