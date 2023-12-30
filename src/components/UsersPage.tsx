import { useCallback } from "react";
import User from "../models/User";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";

const UsersPage = () => {
  const { data: users, error, loading } = useFetch(client.getUsers, "users");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        نام
      </th>
      <th scope="col" className="px-6 py-3">
        نام کاربری
      </th>
      <th scope="col" className="px-6 py-3">
        کارت واریزی
      </th>
      <th scope="col" className="px-6 py-3">
        دستگاه
      </th>
      <th scope="col" className="px-6 py-3">
        سرور
      </th>
      <th scope="col" className="px-6 py-3">
        تاریخچه پرداخت
      </th>
      <th scope="col" className="px-6 py-3">
        وضعیت اشتراک
      </th>
      <th scope="col" className="px-6 py-3">
        ترافیک مانده
      </th>
      <th scope="col" className="px-6 py-3">
        روز مانده
      </th>
    </>
  );

  const renderItem = (user: User) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {user.id}
      </td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.username}</td>
      <td className="px-6 py-4">{user.payment_card?.title}</td>
      <td className="px-6 py-4">{user.os}</td>
      <td className="px-6 py-4">{user.server_name}</td>
      <td className="px-6 py-4">نامعلوم</td>
      <td className="px-6 py-4">{user.subscription?.is_active}</td>
      <td className="px-6 py-4">{user.subscription?.remainGB}</td>
      <td className="px-6 py-4">{user.subscription?.remainDays}</td>
    </>
  );

  const handleFilter = useCallback((data: User[], searchTerm: string) => {
    const filtered = data.filter((user) => user.username.includes(searchTerm));
    return filtered;
  }, []);

  const { filteredItems: filteredUsers, setSearchTerm } = useSearch(
    users,
    handleFilter
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search onSearchChange={setSearchTerm} />
      <Table
        items={filteredUsers}
        identifier={(user) => user.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default UsersPage;
