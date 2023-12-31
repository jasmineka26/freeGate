import useFetch from "../hooks/useFetch";
import Config from "../models/Config";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const ConfigPages = () => {
  const {
    data: configs,
    error,
    loading,
  } = useFetch(client.getConfigs, "configs");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان نمایشی
      </th>
      <th scope="col" className="px-6 py-3">
        آدرس
      </th>
      <th scope="col" className="px-6 py-3">
        SNI
      </th>
      <th scope="col" className="px-6 py-3">
        سایر تنظیمات
      </th>
    </>
  );

  const renderItem = (config: Config) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {config.id}
      </td>
      <td className="px-6 py-4">{config.title}</td>
      <td className="px-6 py-4">{config.user_title}</td>
      <td className="px-6 py-4">{config.address}</td>
      <td className="px-6 py-4">{config.sni}</td>
      <td className="px-6 py-4">{config.settings}</td>
    </>
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search buttonTitle="+Add config" />
      <Table
        items={configs}
        identifier={(config) => config.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ConfigPages;
