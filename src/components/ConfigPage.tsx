import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Config from "../models/Config";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";
import CreateConfigModal from "./CreateConfigModal";

const ConfigPages = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<Config | null>(null);
  const {
    data: configs,
    setData: setConfig,
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

  const renderItem = (config: Config, index: number = 1) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400"
      >
        {index + 1}
      </td>
      <td
        className="px-6 py-4  hover:text-blue-700 hover:font-bold"
        onClick={() => {
          setSelectedConfig(config);
          setIsOpen(true);
        }}
      >
        {config.title}
      </td>
      <td className="px-6 py-4">{config.user_title}</td>
      <td className="px-6 py-4">{config.address}</td>
      <td className="px-6 py-4">{config.sni}</td>
      <td className="px-6 py-4 flex justify-center items-center">
        {<div className=" h-14 w-96 overflow-y-auto">{config.settings}</div>}
      </td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedConfig(null);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search buttonTitle="+Add config" onAddClick={handleOpen} />
        <Table
          items={configs}
          identifier={(config) => config.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreateConfigModal
        isOpen={isOpen}
        onClose={handleClose}
        onPackAdded={(newConfig) => {
          if (selectedConfig) {
            setConfig((prevCards) =>
              prevCards.map((config) =>
                config.id === selectedConfig.id ? newConfig : config
              )
            );
          } else {
            setConfig((prevCards) => [...prevCards, newConfig]);
          }
        }}
        selectedConfig={selectedConfig}
      />
    </>
  );
};

export default ConfigPages;
