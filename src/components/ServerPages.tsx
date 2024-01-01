import { TrashIcon } from "@heroicons/react/24/solid";
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
      <th scope="col" className="px-6 py-3"></th>
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
      <td className="px-6 py-4">
        {server.inbounds.map((inbound) => inbound.title).join(", ")}
      </td>
      <td className="px-6 py-4">
        <div>
          {server.inbounds.map((inbound) => (
            <div key={inbound.id}>
              <span className="font-bold">{inbound.title} : </span>
              {inbound.configs.map((config, index) => (
                <span key={config.id}>
                  {config.title}
                  {index < inbound.configs.length - 1 && ", "}
                </span>
              ))}
            </div>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        {server.inbounds.map((inbound) => (
          <div key={inbound.id}>
            <span>
              {inbound.title} : {inbound.active_accounts}
            </span>
          </div>
        ))}
      </td>
      <td className="text-red-700 px-6 py-4">آفلاین</td>
      <td className=" px-6 py-4">
        <TrashIcon className="w-5 h-5 hover:text-red-700" />
      </td>
    </>
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search buttonTitle="+Add config" />
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
