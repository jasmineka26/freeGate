import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import Card from "../models/Card";
import User from "../models/User";
import Payment from "../models/payments";
import FileUpload from "./FileUploaded";
import Packes from "../models/packes";
import client from "../services/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPaymentAdded: (payment: Payment) => void;
  cards: Card[];
  users: User[];
  packes: Packes[];
}

const CreateManualPayment = ({
  isOpen,
  onClose,
  onPaymentAdded,
  cards,
  users,
  packes,
}: Props) => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  );
  const [selectedPackId, setSelectedPackId] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const admin_desc = formData.get("admin_desc");
      const paid = formData.get("paid");
      const payment_card_id = formData.get("payment_card_id");
      const package_id = formData.get("package_id");
      // const receipt = formData.get("receipt");

      const payment = await client.addManualPeyment(
        selectedUserId || 0,
        admin_desc,
        paid,
        payment_card_id,
        package_id
      );
      onPaymentAdded(payment);
      onClose();
    } catch (error) {
      console.error("Error adding manual payment:", error);
    }

    onClose();
  };

  const selectedUser = useMemo(
    () => users.find((u) => u.id === selectedUserId),
    [selectedUserId, users]
  );
  const selectedPack = useMemo(
    () => packes.find((p) => p.id === selectedPackId),
    [selectedPackId, packes]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className={`w-[30%] ${
            selectedUserId ? "h-[90%]" : "h-[30%]"
          } bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9`}
        >
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center "
            onSubmit={handleSubmit}
          >
            <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
              {/* <FormLabel> ثـبـت بستــه جــدیـــد</FormLabel> */}
              <Select
                dir="rtl"
                icon={<></>}
                name="admin_desc"
                placeholder="نام کاربر را انتخاب کنید"
                value={selectedUserId ?? ""}
                onChange={(e) => setSelectedUserId(Number(e.target.value))}
                className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
              </Select>
              {selectedUser && (
                <>
                  <Select
                    dir="rtl"
                    key={selectedUserId}
                    name="payment_card_id"
                    icon={<></>}
                    defaultValue={
                      cards.find((c) => c.id === selectedUser.payment_card?.id)
                        ?.id
                    }
                    className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
                  >
                    {cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.title}
                      </option>
                    ))}
                  </Select>
                  <Select
                    dir="rtl"
                    icon={<></>}
                    name="package_id"
                    value={selectedPackId ?? ""}
                    onChange={(e) => setSelectedPackId(Number(e.target.value))}
                    className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
                  >
                    {packes.map((pack) => (
                      <option key={pack.id} value={pack.id}>
                        {pack.title}
                      </option>
                    ))}
                  </Select>
                  <Select
                    dir="rtl"
                    icon={<></>}
                    key={selectedPackId}
                    name="paid"
                    defaultValue={
                      packes.find((p) => p.id === selectedPack?.id)?.id
                    }
                    className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
                  >
                    {packes.map((pack) => (
                      <option key={pack.id} value={pack.id}>
                        {pack.price}
                      </option>
                    ))}
                  </Select>
                  <Input
                    dir="rtl"
                    name="traffic"
                    placeholder="توضیحات"
                    className="w-[90%] h-28 rounded-lg px-4 ml-3 bg-slate-900 py-2 shadow-lg outline-none focus:ring-1 ring-blue-700"
                  />
                  <FileUpload />
                </>
              )}
            </FormControl>

            <ModalFooter className="flex gap-5 text-white justify-center items-center">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
                type="submit"
              >
                Save
              </Button>
              <Button
                onClick={onClose}
                type="button"
                className="bg-red-700 hover:bg-red-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateManualPayment;
