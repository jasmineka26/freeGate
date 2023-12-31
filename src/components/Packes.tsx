import useFetch from "../hooks/useFetch";
import Packes from "../models/packes";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const PackesPages = () => {
  const {
    data: packes,
    error,
    loading,
  } = useFetch(client.getPackes, "packages");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان
      </th>
      <th scope="col" className="px-6 py-3">
        دسته بندی سرور
      </th>
      <th scope="col" className="px-6 py-3">
        مدت اعتبار
      </th>
      <th scope="col" className="px-6 py-3">
        حجم
      </th>
      <th scope="col" className="px-6 py-3">
        قیمت
      </th>
    </>
  );

  const renderItem = (packes: Packes) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {packes.id}
      </td>
      <td className="px-6 py-4">{packes.title}</td>
      <td className="px-6 py-4">{packes.server_category.title}</td>
      <td className="px-6 py-4">{packes.duration}</td>
      <td className="px-6 py-4">{packes.traffic}</td>
      <td className="px-6 py-4">{packes.price}</td>
    </>
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search buttonTitle="+Add config" />
      <Table
        items={packes}
        identifier={(packe) => packe.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default PackesPages;
