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
import { useEffect, useState } from "react";
import Category from "../models/Category";
import client from "../services/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCategoryAdded: (category: Category) => void;
  selectedCategory: Category | null;
}
const CreateCategoryModal = ({
  isOpen,
  onClose,
  onCategoryAdded,
  selectedCategory,
}: Props) => {
  const [categoryName, setCategoryName] = useState(
    selectedCategory?.title || ""
  );

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.title || "");
    } else {
      setCategoryName("");
    }
  }, [selectedCategory]);

  const handleAddCategory = async () => {
    let category;
    try {
      if (selectedCategory) {
        const id = selectedCategory.id;
        category = await client.UpdateCatecory(categoryName, id);
      } else {
        category = await client.addCategory(categoryName);
      }
      onCategoryAdded(category);
    } catch (error) {
      console.error("Error updating/adding Category:", error);
    }
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
            <FormLabel>
              {selectedCategory
                ? `${selectedCategory.title} ویــرایش دسته بندی`
                : "ثـبـت دسته بندی جــدیـــد"}
            </FormLabel>
            <Input
              dir="rtl"
              placeholder="عنــــــوان"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
