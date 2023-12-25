import React, { useEffect, useState } from "react";
import User from "../models/User";
import client from "../services/client";
import Search from "./users/Search";

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    client
      .getUsers()
      .then((res) => {
        setUsers(res);
        console.log(res);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col w-full bg-slate-400">
      <div>
        <div className="p-5">
          <Search />
        </div>
        <div className="flex bg-slate-200 rounded-xl ">
          <div>
            <h2 className="text-2xl font-bold mb-4">User List</h2>
          </div>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
