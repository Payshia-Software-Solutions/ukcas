import React from "react";
import { FiSearch, FiEdit } from "react-icons/fi"; // Feather icons

interface ContentRowProps {
  date: string;
  instituteName: string;
  status: "pending" | "active" | "Rejected";
  onView: () => void;
}

const ContentRow: React.FC<ContentRowProps> = ({
  date,
  instituteName,
  status,
  onView,
}) => {
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "pending":
        return "text-blue-600 bg-blue-100";
      case "active":
        return "text-green-600 bg-green-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const renderStatusContent = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <>
            <span className="w-2 h-2 mr-2 bg-blue-500 rounded-full inline-block" />
            Pending
          </>
        );
      case "active":
        return (
          <>
            <FiEdit className="mr-1" />
            Active
          </>
        );
      case "Rejected":
        return <>Rejected</>;
      default:
        return <>{status}</>;
    }
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 text-sm md:text-lg py-4">{date}</td>
      <td className="px-6 py-4 text-sm md:text-lg">{instituteName}</td>
      <td className="px-6 py-4 text-sm md:text-lg">
        <span
          className={`inline-flex items-center px-2 py-1 text-sm font-semibold rounded-full ${getStatusClasses(
            status
          )}`}
        >
          {renderStatusContent(status)}
        </span>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={onView}
          className="flex items-center space-x-2 hover:underline"
        >
          <FiSearch size={20} />
          <span>View</span>
        </button>
      </td>
    </tr>
  );
};

export default ContentRow;
