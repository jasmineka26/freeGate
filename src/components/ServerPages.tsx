import { TrashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Server from "../models/Server";
import client from "../services/client";
import CreateServerModal from "./CreatServerModal";
import Search from "./Search";
import Table from "./Table";

const ServerPages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    serverId: 0,
  });
  const {
    data: servers,
    setData: setServer,
    error,
    loading,
  } = useFetch(client.getServers, "servers");
  const { data: categoreis } = useFetch(client.getCategories, "categoreis");

  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const handleDelete = (serverId: number) => {
    setDeleteConfirmation({
      isOpen: true,
      serverId,
    });
  };

  const handleConfirmDelete = async () => {
    const { serverId } = deleteConfirmation;
    try {
      await client.deleteServer(serverId);
      const updatedServers = servers.filter((server) => server.id !== serverId);
      setServer(updatedServers);
    } catch (error) {
      console.error("Error deleting server:", error);
    }

    setDeleteConfirmation({
      isOpen: false,
      serverId: 0,
    });
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({
      isOpen: false,
      serverId: 0,
    });
  };

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

  const renderItem = (server: Server, index: number = 1) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index + 1}
      </td>
      <td
        className="px-6 py-4 hover:text-blue-700 hover:font-bold"
        onClick={() => {
          setSelectedServer(server);
          setIsOpen(true);
        }}
      >
        {server.title}
      </td>
      <td className="px-6 py-4">{server.address}</td>
      <td className="px-6 py-4">{server.xui_port}</td>
      <td className="px-6 py-4">{server.server_category?.title}</td>
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
        <TrashIcon
          className="w-5 h-5 hover:text-red-700"
          onClick={() => handleDelete(server.id)}
        />
      </td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedServer(null);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search buttonTitle="+Add server" onAddClick={handleOpen} />
        <Table
          items={servers}
          identifier={(server) => server.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreateServerModal
        isOpen={isOpen}
        onClose={handleClose}
        onServerAdded={(server) => {
          setServer([...servers, server]);
        }}
        categoreis={categoreis}
        selectedServer={selectedServer}
      />
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md">
            <p className="text-lg font-semibold mb-3">
              سرور و تمام اکانت ها و بکاپ های آن پاک خواهد شد. ادامه می‌دهید؟
            </p>
            <div className="flex justify-end gap-5">
              <button
                className="mr-2 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServerPages;
