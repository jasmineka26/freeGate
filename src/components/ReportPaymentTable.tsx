import ReportPayment from "../models/ReportPayment";

interface IProps {
  reports: ReportPayment;
}

const ReportPaymentTable: React.FC<IProps> = ({ reports }) => {
  const owners = reports.owners;
  return (
    <div className="flex flex-col bg-white rounded-xl w-full p-5">
      <div className="flex rounded-xl shadow-xl overflow-auto">
        <div className="w-full max-h-[500px]">
          <table className="w-full text-left rtl:text-right text-gray-500 text-xs">
            <thead>
              <tr className="bg-slate-800 text-gray-400 text-center">
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>
                <th scope="col" className="px-6 py-3">
                  مدیر کارت
                </th>
                <th scope="col" className="px-6 py-3">
                  کارت
                </th>
                <th scope="col" className="px-6 py-3">
                  مجموع واریزی ها
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {owners.map(({ cards, ownerId, ownerName, total }) => {
                return cards.map((c, i) => (
                  <tr>
                    {i === 0 && (
                      <>
                        <td
                          className="px-6 py-4 text-gray-900 border-gray-200 border-l-2 border-b-2"
                          rowSpan={cards.length}
                        >
                          {ownerId}
                        </td>
                        <td
                          className="px-6 py-4 border-gray-200 border-b-2"
                          rowSpan={cards.length}
                        >
                          {ownerName + " - " + total.toLocaleString()}
                        </td>
                      </>
                    )}
                    <td className="px-6 py-4  border-gray-200 border-x-2 border-b-2">
                      {c.title}
                    </td>
                    <td className="px-6 py-4 border-gray-200 border-b-2">
                      {c.total.toLocaleString()}
                    </td>
                  </tr>
                ));
              })}
              <tr>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4  border-gray-200 border-l-2 font-black">
                  جمــــــــع:
                </td>
                <td className="px-6 py-4">{reports.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPaymentTable;
