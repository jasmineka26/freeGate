import moment from "jalali-moment";
import { useCallback, useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import Payment from "../models/payments";
import useApi from "../useApi";
import CreateManualPayment from "./CreateManualPayment";
import Search from "./Search";
import Table from "./Table";

const PaymentsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    request: getPayments,
    loading: paymentsLoading,
    error: paymentsError,
    data: payments,
    setData: setPayments,
  } = useApi("getPayments");

  const {
    request: getUsers,
    loading: userLoadin,
    error: userError,
    data: users,
  } = useApi("getUsers");

  const {
    request: getCards,
    loading: cardsLoading,
    error: cardsError,
    data: cards,
  } = useApi("getCards");

  const {
    request: getPackes,
    loading: packesLoading,
    error: packsError,
    data: packes,
  } = useApi("getPackes");
  const loading =
    paymentsLoading || cardsLoading || userLoadin || packesLoading;
  const error = paymentsError || userError || cardsError || packsError;

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        کاربر
      </th>
      <th scope="col" className="px-6 py-3">
        هزینه سرویس
      </th>
      <th scope="col" className="px-6 py-3">
        کارت مقصد
      </th>
      <th scope="col" className="px-6 py-3">
        تاریخ
      </th>
      <th scope="col" className="px-6 py-3">
        وضعیت
      </th>
      <th scope="col" className="px-6 py-3">
        شماره پیگیری
      </th>
      <th scope="col" className="px-6 py-3">
        رسید پرداخت
      </th>
      <th scope="col" className="px-6 py-3">
        توضیحات کاربر
      </th>
      <th scope="col" className="px-6 py-3">
        توضیحات مدیر
      </th>
    </>
  );

  const renderItem = (payment: Payment, index: number = 1) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </td>
      <td className="px-6 py-4">{payment.user.name}</td>
      <td className="px-6 py-4">{payment.paid}</td>
      <td className="px-6 py-4">{payment.dest_card.title}</td>
      <td className="px-6 py-4">
        {moment(moment.from(payment.created_at, "en")).format(
          "YYYY/MM/DD HH:mm "
        )}
      </td>
      <td className="px-6 py-4 w-full font-bold">
        {payment.confirmed === 1 ? (
          <div className="text-green-500 w-full"> تایید شده </div>
        ) : (
          <div className="text-red-500"> عدم تایید </div>
        )}
      </td>
      <td className="px-6 py-4">{payment.id}</td>
      <td className="px-6 py-4">
        <button onClick={() => console.log("COMING SOON")}>مشاهده</button>
      </td>
      <td className="px-6 py-4">{payment.user_desc}</td>
      <td className="px-6 py-4">{payment.admin_desc}</td>
    </>
  );

  const handleFilter = useCallback((data: Payment[], searchTerm: string) => {
    const filtered = data.filter((user) => user.user.name.includes(searchTerm));
    return filtered;
  }, []);

  const { filteredItems: filteredUsers, setSearchTerm } = useSearch(
    payments,
    handleFilter
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getPayments();
    getCards();
    getUsers();
    getPackes();
  }, [getPayments, getCards, getUsers, getPackes]);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search
        buttonTitle="Manual reg"
        onSearchChange={setSearchTerm}
        onAddClick={handleOpen}
      ></Search>
      <Table
        items={filteredUsers}
        headerItems={headerItems}
        renderItem={renderItem}
        identifier={(payment) => payment.id}
        loading={loading}
        error={error}
      />
      {payments && cards && users && packes && (
        <CreateManualPayment
          isOpen={isOpen}
          onClose={handleClose}
          onPaymentAdded={(payment) => {
            setPayments([...payments, payment]);
          }}
          cards={cards}
          users={users}
          packes={packes}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
