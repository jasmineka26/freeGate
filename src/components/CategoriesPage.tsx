import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import Category from "../models/Category";
import client from "../services/client";
import Search from "./Search";
import Table from "./Table";

const CategoriesPage = () => {
  const {
    data: categories,
    setData: setCategories,
    error,
    loading,
  } = useFetch(client.getCategories, "categories");
  const OverlayOne = () => (
    <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [value, setValue] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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

  const clickedAddCategory = async () => {
    setOverlay(<OverlayOne />);
    onOpen();
  };

  const handleAddCategory = async () => {
    const category = await client.addCategory(value);
    setCategories([...categories, category]);
    onClose();
  };

  return (
    <>
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
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="md"
      >
        {overlay}
        <ModalContent className="flex justify-center items-center w-screen h-screen">
          <ModalBody
            pb={6}
            className="w-[30%] h-[30%] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9"
          >
            <FormControl className="flex flex-col gap-5 text-white justify-center items-center ">
              <FormLabel>ایجـــــــــاد دستــــــه بنــــــدی</FormLabel>
              <Input
                dir="rtl"
                ref={initialRef}
                placeholder="عنــــــوان"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-96 h-10 rounded-lg px-3 bg-transparent bg-slate-700 py-2 shadow-lg"
              />
            </FormControl>

            <ModalFooter className="flex gap-5 text-white justify-center items-center">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
                onClick={handleAddCategory}
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                className="bg-red-700 hover:bg-red-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoriesPage;
