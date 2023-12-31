import useFetch from "../hooks/useFetch";
import Card from "../models/Card";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const CardsPage = () => {
  const { data: cards, error, loading } = useFetch(client.getCards, "cards");

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

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search buttonTitle="+Add config" />
      <Table
        items={cards}
        identifier={(card) => card.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CardsPage;
