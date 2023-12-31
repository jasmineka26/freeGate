import useFetch from "../hooks/useFetch";
import Server from "../models/server";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const ServerPages = () => {
  const {
    data: servers,
    error,
    loading,
  } = useFetch(client.getServers, "servers");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان
      </th>
      <th scope="col" className="px-6 py-3">
        آدرس
      </th>
      <th scope="col" className="px-6 py-3">
        پورت پنل
      </th>
      <th scope="col" className="px-6 py-3">
        دسته بندی
      </th>
      <th scope="col" className="px-6 py-3">
        Inbounds
      </th>
      <th scope="col" className="px-6 py-3">
        Configs
      </th>
      <th scope="col" className="px-6 py-3">
        Active Accounts
      </th>
      <th scope="col" className="px-6 py-3">
        وضعیت
      </th>
    </>
  );

  const renderItem = (server: Server) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {server.id}
      </td>
      <td className="px-6 py-4">{server.title}</td>
      <td className="px-6 py-4">{server.address}</td>
      <td className="px-6 py-4">{server.xui_port}</td>
      <td className="px-6 py-4">{server.server_category.title}</td>
      <td className="px-6 py-4">0</td>
      <td className="px-6 py-4">1</td>
      <td className="px-6 py-4">2</td>
      <td className="px-6 py-4">3</td>
    </>
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search buttonTitle="+Add Server" />
      <Table
        items={servers}
        identifier={(server) => server.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ServerPages;
