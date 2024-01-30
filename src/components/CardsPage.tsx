import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Card from "../models/Card";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";
import CreateCardModal from "./CreateCardModal";

const CardsPage = () => {
  const { data: admins } = useFetch(client.getAdminUsers, "admins");
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
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

  const renderItem = (card: Card, index = 0) => {
    const owner = admins.find((a) => a.id === card.owner_id);
    return (
      <>
        <td
          scope="row"
          className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-gray-400"
        >
          {index + 1}
        </td>
        <td
          className="px-6 py-4 hover:text-blue-700 hover:font-bold"
          onClick={() => {
            setSelectedCard(card);
            setIsOpen(true);
          }}
        >
          {card.title}
        </td>
        <td className="px-6 py-4">{card.card_number}</td>
        <td className="px-6 py-4">{card.card_owner_name}</td>
        <td className="px-6 py-4">{owner?.username}</td>
      </>
    );
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCard(null);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search buttonTitle="+Add cards" onAddClick={handleOpen} />
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
        admins={admins}
        isOpen={isOpen}
        onClose={handleClose}
        onCardAdded={(newCard) => {
          if (selectedCard) {
            setCards((prevCards) =>
              prevCards.map((card) =>
                card.id === selectedCard.id ? newCard : card
              )
            );
          } else {
            setCards((prevCards) => [...prevCards, newCard]);
          }
        }}
        selectedCard={selectedCard}
      />
    </>
  );
};

export default CardsPage;
