import React, { useEffect, useState } from "react";
import User from "../models/User";
import Search from "./users/Search";
import client from "../services/client";
import UserTable from "./users/UsersTable";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

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

  useEffect(() => {
    const filtered = users.filter((user) => {
      return user.username.includes(searchTerm);
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search onSearchChange={handleSearchChange} />
        <UserTable users={filteredUsers} />
      </div>
    </>
  );
};

export default Users;
