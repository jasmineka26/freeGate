/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Config from "../models/Config";
import useApi from "../useApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPackAdded: (config: Config) => void;
  selectedConfig: Config | null;
}
const CreateConfigModal = ({
  isOpen,
  onClose,
  onPackAdded,
  selectedConfig,
}: Props) => {
  const [settings, setSettings] = useState<string[]>([]);
  const [newSetting, setNewSetting] = useState<string>("");

  const {
    request: UpdateConfig,
    loading: updateConfigLoading,
    error: updateConfigError,
  } = useApi("UpdateConfig");

  const {
    request: addConfig,
    loading: addConfigLoading,
    error: addConfigError,
  } = useApi("addConfig");

  const settingsObj: object | undefined = useMemo(
    () => (selectedConfig ? JSON.parse(selectedConfig.settings) : undefined),
    [selectedConfig]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const address = formData.get("address")!.toString();
    const sni = formData.get("sni")!.toString();
    const title = formData.get("title")!.toString();
    const user_title = formData.get("user_title")!.toString();

    const settingsMap: Record<string, string> = {};

    for (const s of settings) {
      const value = formData.get(s)?.toString() ?? "";
      settingsMap[s] = value;
    }
    let config;
    if (selectedConfig) {
      const id = selectedConfig.id;
      config = await UpdateConfig(
        title,
        user_title,
        settingsMap,
        address,
        sni,
        id
      );

      if (config.succeed) {
        const newConfig = config.data;
        onPackAdded(newConfig);
        toast.success("Config Updated");
        onClose();
      } else {
        toast.error(updateConfigError);
      }
    } else {
      config = await addConfig(title, user_title, address, sni, settingsMap);

      if (config.succeed) {
        const newConfig = config.data;
        onPackAdded(newConfig);
        toast.success("Config Created");
        onClose();
      } else {
        toast.error(addConfigError);
      }
    }
  };

  const handleAddSetting = () => {
    if (newSetting !== "") {
      setSettings((prevSettings) => [...prevSettings, newSetting]);
      setNewSetting("");
    }
  };

  const handleRemoveSetting = (index: number) => {
    setSettings((prevSettings) => {
      const newSettings = [...prevSettings];
      newSettings.splice(index, 1);
      return newSettings;
    });
  };

  useEffect(() => {
    const keys = settingsObj ? Object.keys(settingsObj) : [];
    setSettings(keys);
  }, [settingsObj]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className="w-[30%] h-[70%] bg-slate-800 rounded-xl flex flex-col pt-5 gap-9 overflow-auto"
        >
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center"
            onSubmit={handleSubmit}
          >
            <FormControl className="flex flex-col w-full gap-5 text-white justify-center items-center ">
              <FormLabel>
                {selectedConfig
                  ? `${selectedConfig.title} ویــرایــش کانفیگ`
                  : "ثـبـت کانفیگ جــدیـــد"}
              </FormLabel>
              <Input
                dir="rtl"
                name="title"
                placeholder="عنــــــوان"
                defaultValue={selectedConfig?.title}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <Input
                dir="rtl"
                name="user_title"
                defaultValue={selectedConfig?.user_title}
                placeholder="عنـــوان نمــایشــی"
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <Input
                dir="rtl"
                name="address"
                placeholder="آدرس"
                defaultValue={selectedConfig?.address}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              <Input
                dir="rtl"
                name="sni"
                placeholder="Sni"
                defaultValue={selectedConfig?.sni}
                className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
              />
              {settings.map((settingKey, index) => (
                <div
                  key={index}
                  className="w-[90%] flex flex-row gap-4 justify-center items-center"
                >
                  <Input
                    dir="rtl"
                    name={settingKey}
                    placeholder={settingKey}
                    defaultValue={
                      settingsObj ? (settingsObj as any)[settingKey] : undefined
                    }
                    className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                  />
                  <button
                    className="flex justify-center bg-red-700 h-8 w-8 rounded-full items-center text-center"
                    onClick={() => handleRemoveSetting(index)}
                  >
                    -
                  </button>
                </div>
              ))}
              <div className="w-[90%] flex flex-row gap-4 justify-center items-center ">
                <Input
                  dir="rtl"
                  placeholder="کلید مورد نظر را ووارد کنید."
                  value={newSetting}
                  onChange={(e) => setNewSetting(e.target.value)}
                  className="w-[90%] h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                />
                <button
                  className="flex justify-center bg-blue-700 h-8 w-8 rounded-full items-center text-center"
                  onClick={handleAddSetting}
                  disabled={newSetting.trim() === ""}
                >
                  +
                </button>
              </div>
            </FormControl>

            <ModalFooter className="flex gap-5 text-white justify-center items-center">
              <Button
                className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
                type="submit"
              >
                {updateConfigLoading || addConfigLoading ? (
                  <Spinner width={"15px"} height={"15px"} />
                ) : (
                  "save"
                )}
              </Button>
              {!(updateConfigLoading || addConfigLoading) && (
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

export default CreateConfigModal;
