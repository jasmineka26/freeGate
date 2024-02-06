import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import * as moment from "jalali-moment";
import Payment from "../models/payments";
import Table from "./Table";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPayments: Payment[] | [];
}

const PaymentsHistory = ({ isOpen, onClose, selectedPayments }: Props) => {
  const headerItems = () => (
    <>
      <th scope="col" className="px-6 py-3">
        ردیف
      </th>
      <th scope="col" className="px-6 py-3">
        کاربر
      </th>
      <th scope="col" className="px-6 py-3">
        هزینه سرویس
      </th>
      <th scope="col" className="px-6 py-3">
        کارت مقصد
      </th>
      <th scope="col" className="px-6 py-3">
        تاریخ
      </th>
      <th scope="col" className="px-6 py-3">
        وضعیت
      </th>
      <th scope="col" className="px-6 py-3">
        شماره پیگیری
      </th>
    </>
  );

  const renderItem = (selectedPayments: Payment, index: number) => (
    <>
      <td className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
        {index + 1}
      </td>
      <td className="px-6 py-4">{selectedPayments.user.name}</td>
      <td className="px-6 py-4  hover:text-blue-700 hover:font-bold">
        {selectedPayments.paid}
      </td>
      <td className="px-6 py-4">{selectedPayments.dest_card.title}</td>
      <td className="px-6 py-4">
        {moment(selectedPayments.created_at).locale("fa").format("YYYY/M/D")}
      </td>
      <td className="px-6 py-4">
        {selectedPayments.user.current_subscription.is_active
          ? "عدم تایید"
          : "تایید شده"}
      </td>
      <td className="px-6 py-4">{selectedPayments.id}</td>
    </>
  );

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
          className={`w-[60%] h-[40%] rounded-xl flex flex-col items-center overflow-auto p-5`}
        >
          {selectedPayments.length > 0 ? (
            <Table
              headerItems={headerItems}
              identifier={(payments) => payments.id}
              items={selectedPayments}
              renderItem={renderItem}
              loading={false}
              error=""
            />
          ) : (
            <div className=" w-[80%] h-[80%] flex flex-col items-center justify-center">
              <div
                className={`w-full h-full rounded-xl flex flex-col items-center justify-center overflow-auto p-5 bg-gray-300 text-gray-700`}
              >
                No Payment
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onClose}
            type="button"
            className="bg-red-700 hover:bg-red-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentsHistory;
