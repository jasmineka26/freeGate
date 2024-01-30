import { useState } from "react";
import client from "../services/client";
import Date from "./Date";
import PaymentChart from "./PaymentChart";
import ReportPaymentTable from "./ReportPaymentTable";
import ReportPayment from "../models/ReportPayment";

const PaymentReportPage = () => {
  const [report, setReport] = useState<ReportPayment | undefined>(undefined);

  const handleDatePick = async (start: Date, end: Date) => {
    const report = await client.getReportPayments(start, end);
    setReport(report);
    console.log(report);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Date onDatePicked={handleDatePick} />
      <div className="flex w-full h-full bg-gray-200 rounded-xl gap-5 overflow-auto">
        <div className="flex flex-col rounded-xl shadow-lg bg-white w-[50%] overflow-auto justify-center items-center p-5">
          {report && <ReportPaymentTable reports={report} />}
        </div>
        <div className="flex rounded-xl shadow-lg bg-white w-[50%] items-center justify-center overflow-hidden">
          <PaymentChart />
        </div>
      </div>
    </div>
  );
};

export default PaymentReportPage;
