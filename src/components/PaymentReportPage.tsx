import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const PaymentReportPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5">
      <div className="flex p-4 rounded-xl items-center justify-center bg-white shadow-lg">
        <span className="mx-4 text-gray-500">از</span>
        <DatePicker
          className="bg-dark"
          placeholder="Select date start"
          name="start"
          calendar={persian}
          locale={persian_fa}
        />
        <span className="mx-4 text-gray-500">تـــــــــا</span>
        <DatePicker
          className="bg-dark"
          placeholder="Select date end"
          name="end"
          calendar={persian}
          locale={persian_fa}
        />
      </div>
    </div>
  );
};

export default PaymentReportPage;
