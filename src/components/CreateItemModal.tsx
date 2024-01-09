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

interface ItemProps {
  label: string;
  placeholder: string;
  type: string;
}

export interface Props<T> {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, string>) => Promise<T>;
  items: ItemProps[];
}
const CreateItemModal = <T,>({
  isOpen,
  onClose,
  onSubmit,
  items,
}: Props<T>) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  const handleInputChange = (value: string, index: number) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [items[index].label]: value,
    }));
  };

  const handleAddItems = () => {
    onSubmit(formValues);
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
            {items.map((item, index) => (
              <div key={index}>
                <FormLabel>{item.label}</FormLabel>
                <Input
                  dir="rtl"
                  placeholder={item.placeholder}
                  value={formValues[item.label] || ""}
                  onChange={(e) => handleInputChange(e.target.value, index)}
                  type={item.type}
                  className="w-[90%] h-10 rounded-lg px-3 bg-transparent bg-slate-700 py-2 shadow-lg"
                />
              </div>
            ))}
          </FormControl>

          <ModalFooter className="flex gap-5 text-white justify-center items-center">
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
              onClick={handleAddItems}
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

export default CreateItemModal;
