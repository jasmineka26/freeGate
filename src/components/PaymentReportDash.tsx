import { useState } from "react";
import ReportPayment from "../models/ReportPayment";
import client from "../services/client";
import Date from "./Date";
import ReportPaymentTable from "./ReportPaymentTable";

const PaymentReportDash = () => {
  const [report, setReport] = useState<ReportPayment | undefined>(undefined);

  const handleDatePick = async (start: Date, end: Date) => {
    const report = await client.getReportPayments(start, end);
    setReport(report);
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Date onDatePicked={handleDatePick} />
      </div>
      <div className="flex flex-col gap-3 overflow-auto">
        {report && (
          <div>
            <ReportPaymentTable reports={report} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentReportDash;
