import { useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
import useSearch from "../hooks/useSearch";
import User from "../models/User";
import client from "../services/client";
import CreateSubscription from "./CreateSubscription";
import CreateUserModal from "./CreateUserModal";
import Search from "./Search";
import Table from "./Table";

const UsersPage = () => {
  const {
    data: users,
    setData: setUsers,
    error,
    loading,
  } = useFetch(client.getUsers, "users");
  const { data: cards } = useFetch(client.getCards, "cards");
  const { data: servers } = useFetch(client.getServers, "servers");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSitu, setIsOpenSitu] = useState(false);

  const handleOnUserClicked = async (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

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

  const handleUserDialogOpen = (user: User | null) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const renderItem = (user: User) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {user.id}
      </td>
      <td className="px-6 py-4">{user.name}</td>
      <td
        className="px-6 py-4  hover:text-blue-700 hover:font-bold"
        onClick={() => handleOnUserClicked(user)}
      >
        {user.username}
      </td>
      <td className="px-6 py-4">{user.payment_card?.title}</td>
      <td className="px-6 py-4">{user.os}</td>
      <td className="px-6 py-4">{user.server_name}</td>
      <td className="px-6 py-4">نامعلوم</td>
      <td className="px-6 py-4">
        <button
          style={{ color: user.subscription?.is_active ? "green" : "red" }}
          onClick={() => handleUserDialogOpen(user)}
        >
          {user.subscription?.is_active ? "فعــال" : "ایجــاد"}
        </button>
      </td>
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

  const handleClose = () => {
    setIsOpen(false);
    setSelectedUser(null);
    setIsOpenSitu(false);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search
          buttonTitle="+Add User"
          onSearchChange={setSearchTerm}
          onAddClick={() => handleUserDialogOpen(null)}
        />
        <Table
          items={filteredUsers}
          identifier={(user) => user.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>

      <CreateUserModal
        selectedUser={selectedUser}
        users={users}
        servers={servers}
        isOpen={isOpen}
        onClose={handleClose}
        cards={cards}
        onUserAdded={(newUser) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
        }}
        onUserUpdated={(updatedUser) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
        }}
      />

      <CreateSubscription
        isOpen={isOpenSitu}
        onClose={handleClose}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default UsersPage;
