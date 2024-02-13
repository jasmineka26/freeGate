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
import Packes from "../models/packes";
import useApi from "../useApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPackAdded: (pack: Packes) => void;
  categoreis: Category[];
  selectedPack: Packes | null;
}
const CreatePackModal = ({
  isOpen,
  onClose,
  onPackAdded,
  categoreis,
  selectedPack,
}: Props) => {
  const {
    request: UpdatePack,
    loading: updatePackLoading,
    error: updatePackError,
  } = useApi("UpdatePack");
  const {
    request: addPackage,
    loading: addPackLoading,
    error: addPackError,
  } = useApi("addPackage");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")!.toString();
    const traffic = Number(formData.get("traffic"));
    const duration = Number(formData.get("duration"));
    const price = Number(formData.get("price"));
    const server_category_id = Number(formData.get("category"));

    let pack;

    try {
      if (selectedPack) {
        const id = selectedPack.id;

        pack = await UpdatePack(
          duration,
          price,
          server_category_id,
          title,
          traffic,
          id
        );
      } else {
        pack = await addPackage(
          title,
          duration,
          traffic,
          price,
          server_category_id
        );
      }

      if (pack.succeed) {
        const newPack = pack.data;
        onPackAdded(newPack);
        toast.success("New Package added");
        onClose();
      } else {
        toast.error(addPackError);
      }
    } catch (error) {
      toast.error(addPackError || updatePackError);
    }

    onClose();
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
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center "
            onSubmit={handleSubmit}
          >
            <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
              <FormLabel>
                {selectedPack
                  ? `${selectedPack.title} ویــرایــش بستــه`
                  : "ثـبـت بستــه جــدیـــد"}
              </FormLabel>
              <Input
                dir="rtl"
                name="title"
                placeholder="عنــــــوان"
                defaultValue={selectedPack?.title}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <Select
                dir="rtl"
                name="category"
                icon={<></>}
                defaultValue={selectedPack?.server_category?.title}
                className="w-[90%] h-12 rounded-lg px-4 ml-6 bg-slate-900 py-2 shadow-lg "
                placeholder="انتخاب کنید"
              >
                {categoreis.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Select>
              <Input
                dir="rtl"
                name="traffic"
                placeholder="حجـــم"
                type="number"
                defaultValue={selectedPack?.traffic}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <Input
                dir="rtl"
                name="duration"
                placeholder="مــدت زمـــان"
                type="number"
                defaultValue={selectedPack?.duration}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />

              <Input
                dir="rtl"
                name="price"
                placeholder="قیــمت"
                type="number"
                defaultValue={selectedPack?.price}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
            </FormControl>

            <ModalFooter className="flex gap-5 text-white justify-center items-center">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
                type="submit"
                disabled={updatePackLoading || addPackLoading}
              >
                {updatePackLoading || addPackLoading ? (
                  <Spinner width={"15px"} height={"15px"} />
                ) : (
                  "Save"
                )}
              </Button>
              {!(updatePackLoading || addPackLoading) && (
                <Button
                  onClick={onClose}
                  type="button"
                  className="bg-red-700 hover:bg-red-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
                >
                  Cancel
                </Button>
              )}
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePackModal;
