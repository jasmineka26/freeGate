import User from "../../models/User";

interface Props {
  users: User[];
}
const UserTable = ({ users }: Props) => {
  return (
    <div className="flex rounded-xl overflow-hidden">
      <div className="w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ردیف
              </th>
              <th scope="col" className="px-6 py-3">
                نام
              </th>
              <th scope="col" className="px-6 py-3">
                نام کاربری
              </th>
              <th scope="col" className="px-6 py-3">
                کارت واریزی
              </th>
              <th scope="col" className="px-6 py-3">
                دستگاه
              </th>
              <th scope="col" className="px-6 py-3">
                سرور
              </th>
              <th scope="col" className="px-6 py-3">
                تاریخچه
              </th>
              <th scope="col" className="px-6 py-3">
                وضعیت اشتراک
              </th>
              <th scope="col" className="px-6 py-3">
                ترافیک مانده
              </th>
              <th scope="col" className="px-6 py-3">
                روز مانده
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.id}
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.payment_card?.title}</td>
                <td className="px-6 py-4">{user.os}</td>
                <td className="px-6 py-4">{user.server_name}</td>
                <td className="px-6 py-4">نامعلوم</td>
                <td className="px-6 py-4">{user.subscription?.is_active}</td>
                <td className="px-6 py-4">{user.subscription?.remainGB}</td>
                <td className="px-6 py-4">{user.subscription?.remainDays}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
