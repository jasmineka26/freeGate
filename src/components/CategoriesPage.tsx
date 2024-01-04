import useFetch from "../hooks/useFetch";
import Category from "../models/Categories";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const CategoriesPage = () => {
  const {
    data: categories,
    error,
    loading,
  } = useFetch(client.getCategories, "categories");

  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        عنوان
      </th>
    </>
  );

  const renderItem = (categories: Category) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {categories.id}
      </td>
      <td className="px-6 py-4">{categories.title}</td>
    </>
  );

  const clickedAddCategory = async () => {
    console.log(categories);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <Search onClicked={clickedAddCategory} buttonTitle="+Add Cate" />
      <Table
        items={categories}
        identifier={(category) => category.id}
        headerItems={headerItems}
        renderItem={renderItem}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CategoriesPage;
