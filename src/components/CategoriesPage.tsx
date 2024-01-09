import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Category from "../models/Category";
import client from "../services/client";
import CreateItemModal from "./CreateCategoryModal";
import Search from "./Search";
import Table from "./Table";

const CategoriesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: categories,
    setData: setCategories,
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

  const renderItem = (categories: Category, index: number) => (
    <>
      <td
        scope="row"
        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
      >
        {index + 1}
      </td>
      <td className="px-6 py-4">{categories.title}</td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (
    data: Record<string, string>
  ): Promise<Category> => {
    try {
      const category = await client.addCategory(data.title);
      setCategories((prevCategories) => [...prevCategories, category]);
      return category;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search onClicked={handleOpen} buttonTitle="+Add Cate" />
        <Table
          items={categories}
          identifier={(category) => category.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreateItemModal<Category>
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        items={[{ label: "Title", placeholder: "Enter title", type: "text" }]}
      />
    </>
  );
};

export default CategoriesPage;
