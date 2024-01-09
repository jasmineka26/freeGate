import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "../models/Card";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";
import CreateCardModal from "./CreateCardModal";

const CardsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: cards,
    setData: setCards,
    error,
    loading,
  } = useFetch(client.getCards, "cards");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان
      </th>
      <th scope="col" className="px-6 py-3">
        شماره کارت
      </th>
      <th scope="col" className="px-6 py-3">
        نام صاحب کارت
      </th>
      <th scope="col" className="px-6 py-3">
        مدیر کارت
      </th>
    </>
  );

  const renderItem = (card: Card) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {card.id}
      </td>
      <td className="px-6 py-4">{card.title}</td>
      <td className="px-6 py-4">{card.card_number}</td>
      <td className="px-6 py-4">{card.card_owner_name}</td>
      <td className="px-6 py-4">{card.owner_id}</td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search buttonTitle="+Add config" onClicked={handleOpen} />
        <Table
          items={cards}
          identifier={(card) => card.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreateCardModal
        isOpen={isOpen}
        onClose={handleClose}
        onCategoryAdded={(card) => setCards([...cards, card])}
      />
    </>
  );
};

export default CardsPage;
