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
} from "@chakra-ui/react";
import { useState } from "react";
import Category from "../models/Category";
import client from "../services/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
}
const CreateCategoryModal = ({ isOpen, onClose, onCategoryAdded }: Props) => {
  const [value, setValue] = useState("");

  const handleAddCategory = async () => {
    const category = await client.addCategory(value);
    onCategoryAdded(category);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              placeholder="عنــــــوان"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-[90%] h-10 rounded-lg px-3 bg-transparent bg-slate-700 py-2 shadow-lg"
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
