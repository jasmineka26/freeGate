import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Packes from "../models/packes";
import client from "../services/client";
import CreatePackModal from "./CreatePackModal";
import Search from "./Search";
import Table from "./Table";

const PackesPages = () => {
  const [selectedPack, setSelectedPack] = useState<Packes | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: category } = useFetch(client.getCategories, "categories");
  const {
    data: packes,
    setData: setPack,
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

  const renderItem = (pack: Packes, index: number = 1) => (
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
          setSelectedPack(pack);
          setIsOpen(true);
        }}
      >
        {pack.title}
      </td>
      <td className="px-6 py-4">{pack.server_category?.title}</td>
      <td className="px-6 py-4">{pack.duration}</td>
      <td className="px-6 py-4">{pack.traffic}</td>
      <td className="px-6 py-4">{pack.price}</td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedPack(null);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search buttonTitle="+Add Pack" onAddClick={handleOpen} />
        <Table
          items={packes}
          identifier={(pack) => pack.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreatePackModal
        categoreis={category}
        isOpen={isOpen}
        onClose={handleClose}
        onPackAdded={(newPack) => {
          if (selectedPack) {
            setPack((prevPackes) =>
              prevPackes.map((pack) =>
                pack.id === selectedPack.id ? newPack : pack
              )
            );
          } else {
            setPack((prevPackes) => [...prevPackes, newPack]);
          }
        }}
        selectedPack={selectedPack}
      />
    </>
  );
};

export default PackesPages;
