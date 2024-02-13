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
  Select,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "../models/Card";
import User from "../models/User";
import useApi from "../useApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCardAdded: (card: Card) => void;
  admins: User[];
  selectedCard: Card | null;
}
const CreateCardModal = ({
  isOpen,
  onClose,
  onCardAdded,
  admins,
  selectedCard,
}: Props) => {
  const [title, setTitle] = useState(selectedCard?.title || "");
  const [cardNumber, setCardNumber] = useState(selectedCard?.card_number || "");
  const [cardOwnerName, setCardOwnerName] = useState(
    selectedCard?.card_owner_name || ""
  );
  const [selectedAdmin, setAdmin] = useState<number>(
    selectedCard?.owner_id || (admins.length > 0 ? admins[0].id : 0)
  );

  const {
    request: UpdateCard,
    loading: updateCardLoading,
    error: updateCardError,
  } = useApi("UpdateCard");

  const {
    request: addCard,
    loading: addCardLoading,
    error: addCardError,
  } = useApi("addCard");

  const handleAddCard = async () => {
    let card;
    try {
      if (selectedCard) {
        const id = selectedCard.id;
        card = await UpdateCard(title, cardNumber, cardOwnerName, id);

        if (card.succeed) {
          const newCard = card.data;
          onCardAdded(newCard);
          toast.success("Card Updated");
          onClose();
        } else {
          toast.error(updateCardError);
        }
      } else {
        card = await addCard(title, cardNumber, cardOwnerName, selectedAdmin);

        if (card.succeed) {
          const newCard = card.data;
          onCardAdded(newCard);
          toast.success("Card Updated");
          onClose();
        } else {
          toast.error(addCardError);
        }
      }
    } catch (error) {
      console.error("Error updating/adding Cards:", error);
    }
    onClose();
  };

  useEffect(() => {
    if (selectedCard) {
      setTitle(selectedCard.title || "");
      setCardNumber(selectedCard.card_number || "");
      setCardOwnerName(selectedCard.card_owner_name || "");
      setAdmin(selectedCard.owner_id || (admins.length > 0 ? admins[0].id : 0));
    } else {
      setTitle("");
      setCardNumber("");
      setCardOwnerName("");
      setAdmin(admins.length > 0 ? admins[0].id : 0);
    }
  }, [admins, selectedCard]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className="w-[30%] h-[60%] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9"
        >
          <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
            <FormLabel>
              {selectedCard
                ? ` ویــرایش کارت ${selectedCard.title}`
                : "ثـبـت بستــه جــدیـــد"}
            </FormLabel>
            <Input
              dir="rtl"
              placeholder="عنــــــوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
            />
            <Input
              dir="rtl"
              placeholder="شمـــاره کــارت"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
            />
            <Input
              dir="rtl"
              placeholder="نـــــام"
              value={cardOwnerName}
              onChange={(e) => setCardOwnerName(e.target.value)}
              className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
            />

            <Select
              dir="rtl"
              icon={<></>}
              className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
              placeholder="انتخاب کنید"
              value={selectedAdmin}
              onChange={(e) => setAdmin(Number(e.target.value))}
            >
              {admins.map((admin) => (
                <option
                  key={admin.id}
                  value={admin.id}
                  className="bg-slate-800 h-12"
                >
                  {admin.username}
                </option>
              ))}
            </Select>
          </FormControl>

          <ModalFooter className="flex gap-5 text-white justify-center items-center">
            <Button
              className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
              type="submit"
              onClick={handleAddCard}
              disabled={updateCardLoading || addCardLoading}
            >
              {updateCardLoading || addCardLoading ? (
                <Spinner width={"15px"} height={"15px"} />
              ) : (
                "Save"
              )}
            </Button>
            {!(updateCardLoading || addCardLoading) && (
              <Button
                onClick={onClose}
                type="button"
                className="bg-red-700 hover:bg-red-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
              >
                Cancel
              </Button>
            )}
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
