import { useEffect, useState } from "react";
import Card from "../models/Card";
import AddButton from "./AddButton";
import client from "../services/client";

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .getCards()
      .then((res) => {
        setCards(res);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching cards data");
        console.error("Error fetching cards data:", error);
        setError("Error fetching cards data");
      });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <div className="flex flex-row p-4 rounded-xl items-center justify-between bg-white shadow-lg">
        <div className="flex flex-row w-full text-gray-600 justify-end items-center">
          <AddButton buttonName="+Add Card" />
        </div>
      </div>
      <div className="flex rounded-xl overflow-hidden shadow-xl">
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead>
              <tr className=" bg-slate-800 text-gray-400 text-center">
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
              </tr>
            </thead>
            <tbody className="text-center">
              {cards.map((card, index) => (
                <tr
                  key={card.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b`}
                >
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cards;
