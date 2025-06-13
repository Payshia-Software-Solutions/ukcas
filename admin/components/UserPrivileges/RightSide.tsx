import React from "react";

const dummyPrivileges = [
  { title: "Institute", type: "Master" },
  { title: "News", type: "Master" },
  { title: "Student", type: "Master" },
  { title: "Services", type: "Master" },
  { title: "Payment", type: "Transaction" },
  { title: "Certificate", type: "Transaction" },
  { title: "All Reports", type: "Record" },
  { title: "Users", type: "User Maintenance" },
  { title: "User Privileges", type: "User Maintenance" },
];

interface User {
  account: string;
  name: string;
}

interface RightSideProps {
  user?: User;
}

const RightSide: React.FC<RightSideProps> = ({ user }) => {
  if (!user) return <p className="text-gray-500">Select a user to view privileges.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">User Privileges</h2>
      <div className="mb-4 text-sm text-gray-700">
        <p><strong>Username:</strong> {user.account}</p>
        <p><strong>Name:</strong> {user.name}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm border border-gray-200 rounded">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left border-b">Title</th>
              <th className="p-2 text-left border-b">Type</th>
              <th className="p-2 text-center border-b">Read</th>
              <th className="p-2 text-center border-b">Write</th>
            </tr>
          </thead>
          <tbody>
            {dummyPrivileges.map((priv, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-2 border-b">{priv.title}</td>
                <td className="p-2 border-b">{priv.type}</td>
                <td className="p-2 text-center border-b">
                  <input
                    type="checkbox"
                    className="accent-gray-800"
                    defaultChecked={index % 2 === 0}
                  />
                </td>
                <td className="p-2 text-center border-b">
                  <input
                    type="checkbox"
                    className="accent-gray-800"
                    defaultChecked={index % 3 === 0}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RightSide;
