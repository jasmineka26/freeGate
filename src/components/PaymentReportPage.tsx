import Date from "./Date";
import PaymentChart from "./PaymentChart";

const PaymentReportPage = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Date />
      <div className="flex w-full h-full bg-gray-200 rounded-xl gap-5">
        <div className="flex rounded-xl shadow-lg bg-white w-[50%]">111</div>
        <div className="flex rounded-xl shadow-lg bg-white w-[50%] items-center justify-center">
          <PaymentChart />
        </div>
      </div>
    </div>
  );
};

export default PaymentReportPage;
