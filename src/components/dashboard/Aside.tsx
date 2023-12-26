import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  FunnelIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import AsideButton from "./aside/AsideButton";
import Header from "./aside/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Aside = () => {
  const menuItem = [
    { icon: HomeIcon, name: "داشبــورد" },
    { icon: UserIcon, name: "کاربــران" },
    { icon: BanknotesIcon, name: "پرداخت ها" },
    { icon: ChartPieIcon, name: "گـزارشـات" },
    { icon: AdjustmentsHorizontalIcon, name: "کـانفیــگ" },
    { icon: FunnelIcon, name: "دسته بندی" },
    { icon: CreditCardIcon, name: "کارت ها" },
    { icon: ClipboardDocumentCheckIcon, name: "بسته ها" },
  ];

  const [selectedButton, setSelectedButton] = useState<string | null>(
    "داشبــورد"
  );
  const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/dashboard", {
  //     replace: true,
  //   });
  // });

  const handleButtonClick = (itemName: string) => {
    setSelectedButton(itemName);
    navigate(itemName === "کاربــران" ? "/users" : "/dashboard", {
      replace: true,
    });
  };

  // const handleButtonClick = (itemName: string) => {
  //   setSelectedButton(itemName === selectedButton ? null : itemName);
  //   itemName === "کاربــران"
  //     ? navigate("/users", { replace: true })
  //     : navigate("/dashboard", { replace: true });
  // };

  return (
    <aside
      className={`bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80  inset-0 z-50 my-4 mr-4 h-[calc(100vh-32px)]
     w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div className="relative border-b border-white/20">
        <Header />
      </div>
      {menuItem.map((item) => (
        <AsideButton
          key={item.name}
          icon={item.icon}
          color={selectedButton === item.name ? "blue" : "#1e293b"}
          onClick={() => handleButtonClick(item.name)}
        >
          {item.name}
        </AsideButton>
      ))}
    </aside>
  );
};

export default Aside;
