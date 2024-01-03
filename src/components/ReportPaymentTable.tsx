import ReportPayment from "../models/ReportPayment";

interface IProps {
  reports: ReportPayment;
}

const ReportPaymentTable: React.FC<IProps> = ({ reports }) => {
  const owners = reports.owners;
  return (
    <div className="flex flex-col bg-white rounded-xl w-full p-5">
      <div className="flex rounded-xl overflow-hidden shadow-xl">
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 h-full">
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
              {owners.map((owner) => {
                return (
                  <>
                    <tr key={owner.ownerId}>
                      <td
                        rowSpan={2}
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        {owner.ownerId}
                      </td>
                      <td
                        rowSpan={2}
                        className="px-6 py-4  border-gray-200 border-x-2"
                      >
                        {owner.ownerName}
                      </td>
                      <td
                        rowSpan={1}
                        className="px-6 py-4  border-gray-200 border-l-2"
                      >
                        1
                      </td>
                      <td rowSpan={1} className="px-6 py-4">
                        1
                      </td>
                    </tr>
                    <tr className="border-gray-200 border-y-2">
                      <td
                        rowSpan={1}
                        className="px-6 py-4  border-gray-200 border-l-2"
                      >
                        2
                      </td>
                      <td rowSpan={1} className="px-6 py-4"></td>
                    </tr>
                  </>
                );
              })}
              <tr>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">جمع</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPaymentTable;
