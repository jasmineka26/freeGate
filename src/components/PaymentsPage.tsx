import moment from "jalali-moment";
import useFetch from "../hooks/useFetch";
import Payment from "../models/payments";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const PaymentsPage = () => {
  const {
    data: payments,
    error,
    loading,
  } = useFetch(client.getPayments, "payments");

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

  const renderItem = (payment: Payment) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {payment.id}
      </td>
      <td className="px-6 py-4">{payment.user.name}</td>
      <td className="px-6 py-4">{payment.paid}</td>
      <td className="px-6 py-4">{payment.dest_card.title}</td>
      <td className="px-6 py-4">
        {moment(moment.from(payment.created_at, "en")).format(
          "HH:mm YYYY/MM/DD"
        )}
      </td>
      <td className="px-6 py-4">???</td>
      <td className="px-6 py-4">{payment.confirmed}</td>
      <td className="px-6 py-4">
        <button onClick={() => console.log("COMING SOON")}>مشاهده</button>
      </td>
      <td className="px-6 py-4">{payment.user_desc}</td>
      <td className="px-6 py-4">{payment.admin_desc}</td>
    </>
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search
        buttonTitle="Manual reg"
        onSearchChange={() => console.log("first")}
      ></Search>
      <Table
        items={payments}
        headerItems={headerItems}
        renderItem={renderItem}
        identifier={(payment) => payment.id}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PaymentsPage;
