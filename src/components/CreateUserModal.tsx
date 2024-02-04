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
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Card from "../models/Card";
import Inbound, { XrayAccount } from "../models/Inbound";
import Server from "../models/Server";
import User, { Role } from "../models/User";
import client from "../services/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
  onUserUpdated: (user: User) => void;
  cards: Card[];
  selectedUser: User | null;
  selectedInbounds: Inbound[] | undefined;
  users: User[];
  servers: Server[];
}
const CreateUserModal = ({
  isOpen,
  onClose,
  onUserAdded,
  onUserUpdated,
  cards,
  selectedUser,
  selectedInbounds,
  users,
  servers,
}: Props) => {
  const isUpdateDilaog = !!selectedUser;

  const [selectedServerId, setSelectedServerId] = useState<number | undefined>(
    selectedUser?.server_id
  );

  const [selectedServerInbounds, setSelectedServerInbounds] = useState<
    Inbound[] | undefined
  >(selectedInbounds);

  const selectedServer = useMemo(
    () => servers.find((s) => s.id === selectedServerId),
    [selectedServerId, servers]
  );

  useEffect(() => {
    setSelectedServerId(selectedUser?.server_id);
  }, [selectedUser?.server_id]);

  useEffect(() => {
    if (isUpdateDilaog && selectedInbounds) {
      setSelectedServerInbounds(selectedInbounds);
    }
  }, [selectedInbounds]);

  const handleChangeServer = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const serverId = Number(e.currentTarget.value);
    setSelectedServerId(serverId);
    setSelectedServerInbounds(undefined);
    const inbounds = await client.getInboundsByServerId(serverId);
    setSelectedServerInbounds(inbounds);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")!.toString();
    const username = formData.get("userName")!.toString();
    const password = formData.get("password")!.toString();
    const payment_card_id = Number(formData.get("cardTitle"));
    const os = formData.get("os")!.toString();
    const role_id = Number(formData.get("role"));
    const referer_id = Number(formData.get("refer"));
    const server_id = Number(formData.get("server"));

    if (isUpdateDilaog) {
      const xrayAccountIds = selectedUser.xrayAccounts
        ? selectedUser.xrayAccounts.map((i) => i.id)
        : [];
      const changedUser = await client.UpdateUser(
        selectedUser.id,
        name,
        os,
        password,
        payment_card_id,
        referer_id,
        role_id,
        server_id,
        username,
        xrayAccountIds
      );
      console.log(changedUser);
      onUserUpdated(changedUser);
      toast.success(`User ${changedUser.name} Updated`);
      // onClose();
    } else {
      const newUser = await client.addUser({
        name,
        username,
        password,
        os: os as "android" | "ios",
        role_id,
        payment_card_id,
        server_id,
        referer_id: referer_id ? referer_id : null,
        xrayAccounts: [],
        current_subscription_id: null,
      });
      onUserAdded(newUser);
    }
  };

  const handleAddXrayAccount = async (inbound: Inbound) => {
    const xray = await client.addXray(inbound.id, selectedUser!.id);
    const newXray: XrayAccount = {
      id: xray.id,
      is_active: false,
      uid: selectedUser!.id,
      xray_username: xray.username,
    };

    setSelectedServerInbounds((inbounds) => {
      const newInbounds = [...inbounds!];
      const found = newInbounds.find((i) => i.id === inbound.id);
      found!.XrayAccounts = [...found!.XrayAccounts, newXray];
      return newInbounds;
    });

    // setSelectedServerInbounds((inbounds) => {
    //   return inbounds!.map((i) =>
    //     i.id !== inbound.id
    //       ? i
    //       : { ...i, XrayAccounts: [...i.XrayAccounts, newXray] }
    //   );
    // });

    toast.success(xray.message);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isOpen && (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      )}
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className={`w-[35%] h-[80%] bg-slate-800 rounded-xl flex flex-col items-center gap-9 overflow-auto pt-5`}
        >
          <form
            className="flex flex-col w-full gap-5 text-white justify-center items-center "
            onSubmit={handleSubmit}
          >
            <FormControl
              className="flex flex-col w-full gap-5 text-white justify-center items-center "
              dir="rtl"
            >
              <FormLabel>
                {selectedUser
                  ? `${selectedUser.name} ویــرایــش کـاربـر`
                  : "ثـبـت کـاربـر جــدیـــد"}
              </FormLabel>
              <div
                className="flex flex-row w-[90%] justify-center gap-3"
                dir="rtl"
              >
                <div className="flex flex-col w-[30%] justify-center items-center gap-3">
                  <Input
                    className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                    defaultValue={selectedUser?.name}
                    name="name"
                    placeholder="نـــام"
                  />
                  <Input
                    className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                    defaultValue={selectedUser?.password}
                    name="password"
                    placeholder="رمــز"
                  />
                  <Select
                    icon={<></>}
                    className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                    defaultValue={selectedUser?.os}
                    name="os"
                    placeholder="دستگاه"
                  >
                    <option>android</option>
                    <option>ios</option>
                  </Select>
                </div>
                <div className="flex flex-col w-[70%] justify-center items-center gap-3">
                  <Input
                    className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                    defaultValue={selectedUser?.username}
                    name="userName"
                    placeholder="نـام کـاربـری"
                  />
                  <Select
                    icon={<></>}
                    className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                    name="cardTitle"
                    defaultValue={selectedUser?.payment_card?.id}
                    placeholder="کـارت را انتخاب کنید"
                  >
                    {cards.map((card) => (
                      <option key={card.id} value={card.id}>
                        {card.title}
                      </option>
                    ))}
                  </Select>
                  <div className="flex flex-row w-full gap-3">
                    <Select
                      icon={<></>}
                      className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                      defaultValue={selectedUser?.role_id}
                      name="role"
                      placeholder="سمت"
                    >
                      <option value={Role.User}>کاربرعادی</option>
                      <option value={Role.Admin}>مدیر</option>
                    </Select>
                    <Select
                      icon={<></>}
                      className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                      name="refer"
                      defaultValue={selectedUser?.referer_id ?? undefined}
                      placeholder="کاربر معرف"
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[90%] justify-center items-center gap-3">
                <Select
                  icon={<></>}
                  className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                  name="server"
                  onChange={handleChangeServer}
                  value={selectedServerId}
                  placeholder="انتخاب کنید"
                >
                  {servers.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.title}
                    </option>
                  ))}
                </Select>
                {selectedServer && isUpdateDilaog && (
                  <div className="w-full flex flex-col gap-4 justify-center items-center ">
                    {selectedServerInbounds?.map((inbound) => (
                      <div
                        className="flex flex-row gap-3 w-full items-center justify-center"
                        key={inbound.id}
                      >
                        <div className="w-full flex-col justify-center">
                          <span className="pr-3">{inbound.title}</span>
                          <div className="flex flex-row items-center gap-3">
                            <Select
                              icon={<></>}
                              dir="rtl"
                              placeholder="انتــخــاب نشــده"
                              className="w-full h-12 rounded-lg px-3 bg-slate-900 py-2 shadow-lg"
                            >
                              {inbound.XrayAccounts.map(
                                (a) =>
                                  (a.uid === null ||
                                    a.uid === selectedUser.id) && (
                                    <option key={a.id} value={a.id}>
                                      {a.xray_username}
                                    </option>
                                  )
                              )}
                            </Select>
                            <button
                              className="flex justify-center bg-blue-700 h-8 w-8 rounded-full items-center text-center"
                              onClick={() => handleAddXrayAccount(inbound)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

export default CreateUserModal;
