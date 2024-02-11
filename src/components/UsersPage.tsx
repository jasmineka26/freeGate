import { useCallback, useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import Inbound from "../models/Inbound";
import User from "../models/User";
import Payment from "../models/payments";
import client from "../services/client";
import useApi from "../useApi";
import CreateSubscription from "./CreateSubscription";
import CreateUserModal from "./CreateUserModal";
import Search from "./Search";
import Table from "./Table";
import PaymentsHistory from "./historyPayments";

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedInbounds, setSelectedInbounds] = useState<
    Inbound[] | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSitu, setIsOpenSitu] = useState(false);
  const [isOpenHistoryPayments, setIsOpenHistoryPayments] = useState(false);
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const {
    request: getUsers,
    loading: userLoadin,
    error: userError,
    data: users,
    setData: setUsers,
  } = useApi("getUsers");
  const {
    request: getCards,
    loading: cardsLoading,
    error: cardsError,
    data: cards,
  } = useApi("getCards");
  const {
    request: getServers,
    loading: serversLoading,
    error: serversError,
    data: servers,
  } = useApi("getServers");

  const handleOnUserClicked = async (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
    const inbounds = await client.getInboundsByServerId(
      Number(user.server_id ? user.server_id : 0)
    );
    setSelectedInbounds(inbounds);
  };

  const handleOnSortedUsersClicked = () => {
    const orderMultiplier = ascendingOrder ? 1 : -1;
    const sortedUsers = [...users!].sort((a, b) => {
      return orderMultiplier * a.name.localeCompare(b.name);
    });
    setUsers(sortedUsers);
    setAscendingOrder(!ascendingOrder);
  };

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th
        scope="col"
        className="px-6 py-3"
        onClick={handleOnSortedUsersClicked}
      >
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
  const handleUserSituetionDialogOpen = (user: User | null) => {
    setSelectedUser(user);
    setIsOpenSitu(true);
  };
  const handleOnHistoryClicked = async (user: User | null) => {
    const paymentsHistory = await client.getPaymentsHistory(Number(user?.id));
    setPayments(paymentsHistory);
    setIsOpenHistoryPayments(true);
  };

  const renderItem = (user: User, index: number = 0) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {index + 1}
      </td>
      <td className="px-6 py-4">{user.name}</td>
      <td
        className="px-6 py-4  hover:text-blue-700 hover:font-bold"
        onClick={() => handleOnUserClicked(user)}
      >
        {user.username}
      </td>
      <td className="px-6 py-4">{user.payment_card?.title}</td>
      <td className="px-6 py-4 text-xl">
        {user.os === "android" ? "🤖" : "🍎"}
      </td>
      <td className="px-6 py-4">{user.server_name}</td>
      <td className="px-6 py-4">
        <button
          className="hover:text-blue-700 hover:font-bold"
          onClick={() => handleOnHistoryClicked(user)}
        >
          مشاهده
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          style={{ color: user.subscription?.is_active ? "green" : "red" }}
          onClick={() => handleUserSituetionDialogOpen(user)}
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
    setIsOpenHistoryPayments(false);
  };

  useEffect(() => {
    getUsers();
    getCards();
    getServers();
  }, [getUsers, getCards, getServers]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search
          buttonTitle="+Add User"
          onSearchChange={setSearchTerm}
          onAddClick={() => handleUserDialogOpen(null)}
        />
        {}
        <Table
          items={filteredUsers}
          identifier={(user) => user.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={userLoadin || cardsLoading || serversLoading}
          error={userError || cardsError || serversError}
          onTryAgain={getUsers}
        />
      </div>

      {users && cards && servers && (
        <CreateUserModal
          selectedUser={selectedUser}
          selectedInbounds={selectedInbounds}
          users={users}
          servers={servers}
          isOpen={isOpen}
          onClose={handleClose}
          cards={cards}
          onUserAdded={(newUser) => {
            setUsers((prevUsers) => [...prevUsers!, newUser]);
            setSelectedUser(newUser);
          }}
          onUserUpdated={(updatedUser) => {
            setUsers((prevUsers) =>
              prevUsers!.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
              )
            );
          }}
        />
      )}
      {/* TODO:complet this feat */}
      <CreateSubscription
        isOpen={isOpenSitu}
        onClose={handleClose}
        selectedUser={selectedUser}
      />
      <PaymentsHistory
        isOpen={isOpenHistoryPayments}
        onClose={handleClose}
        selectedPayments={payments}
      />
    </>
  );
};

export default UsersPage;
