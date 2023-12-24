import React, { useEffect, useState } from "react";
import Search from "./users/Search";
import AddButton from "./users/AddButton";
import client from "../services/client";
import User from "../models/User";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
    <div className="flex w-screen h-screen justify-center items-center bg-slate-400">
      <div className="flx flex-col w-[80%] h-[90%] ">
        <div className="flex items-center  justify-between">
          <AddButton />
          <Search />
        </div>
        <div className="pt-3">
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
