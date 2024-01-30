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
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import opacity from "react-element-popper/animations/opacity";
import transition from "react-element-popper/animations/transition";
import client from "../services/client";
import User from "../models/User";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: User | null;
}
const CreateSubscription = ({ isOpen, onClose, selectedUser }: Props) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const traffic = Number(formData.get("traffic"));
    const date = formData.get("date")!.toString();
    let newSub;
    selectedUser
      ? (newSub = await client.addSubscription(traffic, date, selectedUser.id))
      : (newSub = "");
    console.log(newSub);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent
        className="flex flex-col justify-center items-center w-screen h-screen"
        dir="rtl"
      >
        <ModalBody
          pb={6}
          className="w-[30%] h-[50%] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9"
        >
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center "
            onSubmit={handleSubmit}
          >
            <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
              <FormLabel>ویــرایــش اشتــراک</FormLabel>
              <div className="flex flex-col gap-5 w-[80%]">
                <Input
                  className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                  type="number"
                  placeholder="حجـــــم"
                  name="traffic"
                />
                <DatePicker
                  style={{
                    width: "100%",
                    height: "50px",
                    padding: "0 10px 0px 10px",
                    color: "gray",
                    backgroundColor: " rgb(15 23 42)",
                    border: "0px",
                  }}
                  className="bg-dark rounded-lg px-3 py-2 shadow-lg"
                  calendar={persian}
                  locale={persian_fa}
                  name="date"
                  format="HH:mm - YYYY/MM/DD"
                  animations={[
                    opacity(),
                    transition({ from: 35, duration: 800 }),
                  ]}
                  plugins={[
                    <TimePicker hideSeconds />,
                    <Toolbar position="bottom" sort={["close", "today"]} />,
                  ]}
                />
              </div>
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

export default CreateSubscription;
