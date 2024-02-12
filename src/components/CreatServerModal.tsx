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
import { toast } from "react-toastify";
import Category from "../models/Category";
import Server from "../models/Server";
import useApi from "../useApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onServerAdded: (server: Server) => void;
  categoreis: Category[];
  selectedServer: Server | null;
}
const CreateServerModal = ({
  isOpen,
  onClose,
  onServerAdded,
  categoreis,
  selectedServer,
}: Props) => {
  const {
    request: addServer,
    loading: addServerLoading,
    error: addServerError,
  } = useApi("addServer");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")!.toString();
    const address = formData.get("address")!.toString();
    const xui_port = Number(formData.get("xui_port"));
    const xui_user = formData.get("xui_user")!.toString();
    const xui_pass = formData.get("xui_pass")!.toString();
    const server_category_id = Number(formData.get("category"));

    const newServerResult = await addServer(
      title,
      address,
      xui_port,
      xui_user,
      xui_pass,
      server_category_id
    );

    if (newServerResult.succeed) {
      const newServer = newServerResult.data;
      onServerAdded(newServer);
      toast.success("Server Created");
      onClose();
    } else {
      toast.error(addServerError);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className="w-[30%] h-[70%] bg-slate-800 rounded-xl flex flex-col justify-center items-center gap-9"
        >
          {addServerLoading && <Spinner width={"15px"} height={"15px"} />}
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center "
            onSubmit={handleSubmit}
          >
            <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
              <FormLabel> ثـبـت بستــه جــدیـــد</FormLabel>
              <Input
                dir="rtl"
                name="title"
                placeholder="عنــــــوان"
                defaultValue={selectedServer?.title}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <div className="flex justify-between w-[90%] gap-5" dir="rtl">
                <Input
                  dir="rtl"
                  name="address"
                  placeholder="آدرس"
                  defaultValue={selectedServer?.address}
                  className="w-[50%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                />
                <Input
                  dir="rtl"
                  name="xui_user"
                  placeholder="نــام کاربــری پنل"
                  defaultValue={selectedServer?.xui_user}
                  className="w-[50%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                />
              </div>
              <div className="flex justify-between w-[90%] gap-5">
                <Input
                  dir="rtl"
                  name="xui_pass"
                  placeholder="گذرواژه پنــل"
                  defaultValue={selectedServer?.xui_pass}
                  className="w-[50%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                />
                <Input
                  dir="rtl"
                  name="xui_port"
                  placeholder="پـورت پنــل"
                  defaultValue={selectedServer?.xui_port}
                  className="w-[50%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                />
              </div>

              <Select
                dir="rtl"
                name="category"
                icon={<></>}
                placeholder=" دستــه بندی"
                defaultValue={selectedServer?.server_category_id}
                className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
              >
                {categoreis.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Select>
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

export default CreateServerModal;
