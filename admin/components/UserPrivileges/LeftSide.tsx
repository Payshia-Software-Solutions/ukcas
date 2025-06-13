import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FaPen } from "react-icons/fa";

type UserData = {
  id: number;
  email: string;
  name: string;
  account: string;
  role: string;
};

interface LeftSideProps {
  onSelectUser: (user: UserData) => void;
}

const userData: UserData[] = [
  { id: 5, email: "dulajhansana123@gmail.com", name: "Dulaj Hansana", account: "Admin", role: "Admin" },
];

const customStyles = {
  headCells: {
    style: {
      fontWeight: "bold",
      backgroundColor: "#f3f4f6",
    },
  },
  rows: {
    style: {
      backgroundColor: "#ffffff",
    },
  },
};

const LeftSide: React.FC<LeftSideProps> = ({ onSelectUser }) => {
  const [filterText, setFilterText] = useState("");

  const filteredData = useMemo(() => {
    return userData.filter(
      (item) =>
        item.email.toLowerCase().includes(filterText.toLowerCase()) ||
        item.name.toLowerCase().includes(filterText.toLowerCase()) ||
        item.account.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText]);

  const columns = [
    {
      name: "Action",
      cell: (row: UserData) => (
        <button
          className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded cursor-pointer"
          onClick={() => onSelectUser(row)}
          title="Edit Privileges"
        >
          <FaPen size={12} />
        </button>
      ),
      width: "80px",
      center: true,
    },
    {
      name: "Email",
      cell: (row: UserData) => (
        <div>
          <div className="font-medium text-black">{row.email}</div>
          <div className="text-sm text-gray-600">{row.name}</div>
          <div className="text-xs mt-1">
            <span
              className={`px-2 py-0.5 rounded text-white ${
                row.role === "Admin"
                  ? "bg-gray-800"
                  : row.role === "Cashier"
                  ? "bg-blue-500"
                  : row.role === "Steward"
                  ? "bg-blue-400"
                  : "bg-blue-600"
              }`}
            >
              {row.role}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      selector: (row: UserData) => row.email,
      grow: 2,
    },
    {
      name: "Account #",
      selector: (row: UserData) => row.account,
      sortable: true,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">User Accounts</h2>
      <div className="rounded-md overflow-hidden border border-gray-200 bg-white shadow-sm">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          customStyles={customStyles}
          highlightOnHover
          dense
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search by email..."
              className="w-full max-w-sm px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          }
        />
      </div>
    </div>
  );
};

export default LeftSide;
