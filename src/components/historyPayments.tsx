import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import Table from "./Table";
import Payment from "../models/payments";

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
      <td className="px-6 py-4 text-xl">{selectedPayments.created_at}</td>
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
      <ModalContent className="flex flex-col justify-center items-center w-screen h-screen">
        <ModalBody
          pb={6}
          className={`w-[80%] h-[40%] bg-slate-800 rounded-xl flex flex-col items-center gap-9 overflow-auto pt-5`}
        >
          <Table
            headerItems={headerItems}
            identifier={(payments) => payments.id}
            items={selectedPayments}
            renderItem={renderItem}
            loading={false}
            error=""
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PaymentsHistory;
