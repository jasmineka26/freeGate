import PaymentChart from "./PaymentChart";
import PaymentDashPage from "./PaymentDashPage";
import PaymentReportDash from "./PaymentReportDash";

const Dashboard = () => {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5 text-gray-600 rounded-xl">
      <div className="bg-white rounded-xl overflow-auto h-[50%]">
        <div className="overflow-auto h-full">
          <PaymentDashPage />
        </div>
      </div>
      <div className="flex flex-row w-full h-[50%] gap-5">
        <div className="flex p-2 bg-white justify-center items-center rounded-xl w-[50%] overflow-hidden">
          <div className="scale-90">
            <PaymentChart />
          </div>
        </div>
        <div>
          <div className="flex overflow-auto w-full h-full rounded-xl">
            <PaymentReportDash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
