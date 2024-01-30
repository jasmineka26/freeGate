import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Category from "../models/Category";
import client from "../services/client";
import CreateCategoryModal from "./CreateCategoryModal";
import Search from "./Search";
import Table from "./Table";

const CategoriesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
      <td
        className="px-6 py-4 hover:text-blue-700 hover:font-bold"
        onClick={() => {
          setSelectedCategory(categories);
          setIsOpen(true);
        }}
      >
        {categories.title}
      </td>
    </>
  );

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
        <Search onAddClick={handleOpen} buttonTitle="+Add Cate" />
        <Table
          items={categories}
          identifier={(category) => category.id}
          headerItems={headerItems}
          renderItem={renderItem}
          loading={loading}
          error={error}
        />
      </div>
      <CreateCategoryModal
        isOpen={isOpen}
        onClose={handleClose}
        onCategoryAdded={(newCategory) => {
          if (selectedCategory) {
            setCategories((prevCategories) =>
              prevCategories.map((card) =>
                card.id === selectedCategory.id ? newCategory : card
              )
            );
          } else {
            setCategories((prevCards) => [...prevCards, newCategory]);
          }
        }}
        selectedCategory={selectedCategory}
      />
    </>
  );
};

export default CategoriesPage;
