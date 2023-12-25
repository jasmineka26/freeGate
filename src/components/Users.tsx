import React, { useEffect, useState } from "react";
import User from "../models/User";
import Search from "./users/Search";
import client from "../services/client";
import UserTable from "./users/UsersTable";

const Users: React.FC = () => {
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
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search />
        <UserTable users={users} />
      </div>
    </>
  );
};

export default Users;
