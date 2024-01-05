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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
}
const CreateCategoryModal = ({ isOpen, onClose, onCategoryAdded }: Props) => {
  const [value, setValue] = useState("");
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleAddCategory = async () => {
    const category = await client.addCategory(value);
    onCategoryAdded(category);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className="w-[30%] h-[30%] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9"
        >
          <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
            <FormLabel>ایجـــــــــاد دستــــــه بنــــــدی</FormLabel>
            <Input
              dir="rtl"
              ref={initialRef}
              placeholder="عنــــــوان"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-[0%] h-10 rounded-lg px-3 bg-transparent bg-slate-700 py-2 shadow-lg"
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
  );
};

export default CreateCategoryModal;
