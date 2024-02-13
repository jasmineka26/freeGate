import moment from "jalali-moment";
import { useEffect } from "react";
import Payment from "../models/payments";
import useApi from "../useApi";
import Table from "./Table";
import paymentGif from "../assets/850 Cactus Plant Lottie Animations - Free in Lottie JSON, dotLottie, GIF.gif";
import { Image } from "@chakra-ui/react";

const PaymentDashPage = () => {
  const {
    request: getPayments,
    loading: paymentsLoading,
    error: paymentsError,
    data: payments,
  } = useApi("getPayments");

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
        className="px-4 py-2 font-medium text-gray-700 dark:text-white"
      >
        {index + 1}
      </td>
      <td className="px-4 py-4">{payment.user.name}</td>
      <td className="px-4 py-4">{payment.paid}</td>
      <td className="px-4 py-4">{payment.dest_card.title}</td>
      <td className="px-4 py-4">
        {moment(moment.from(payment.created_at, "en")).format(
          "YYYY/MM/DD HH:mm "
        )}
      </td>
      <td className="px-4 py-4 font-bold">
        {payment.confirmed === 1 ? (
          <div className="text-green-500 w-full"> تایید شده </div>
        ) : (
          <div className="text-red-500"> عدم تایید </div>
        )}
      </td>
      <td className="px-4 py-4">{payment.id}</td>
      <td className="px-4 py-4">
        <button onClick={() => console.log("COMING SOON")}>مشاهده</button>
      </td>
      <td className="px-4 py-4 ">
        {<div className="flex overflow-auto">payment.user_desc</div>}
      </td>
      <td className="px-4 py-4 overflow-auto">{payment.admin_desc}</td>
    </>
  );
  const filtered = payments?.filter((p) => p.confirmed === 0);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  return (
    <div className="bg-white h-full">
      {filtered?.length ? (
        <Table
          items={filtered}
          headerItems={headerItems}
          renderItem={renderItem}
          identifier={(payment) => payment.id}
          loading={paymentsLoading}
          error={paymentsError}
          onTryAgain={getPayments}
        />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Image
              className="w-40 h-40"
              src={paymentGif}
              alt="پـرداختـی موجـود نیست"
            />
            <div className="text-gray-500">پـرداختـی موجـود نیست</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentDashPage;
