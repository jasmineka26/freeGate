import {
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  ChartPieIcon,
  ClipboardDocumentCheckIcon,
  CreditCardIcon,
  FunnelIcon,
  HomeIcon,
  ServerIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AsideButton from "./aside/AsideButton";
import Header from "./aside/Header";

const Aside = () => {
  const menuItem = [
    { icon: HomeIcon, name: "داشبــورد", url: "/dashboard" },
    { icon: UserIcon, name: "کاربــران", url: "/users" },
    { icon: BanknotesIcon, name: "پرداخت ها", url: "/payments" },
    { icon: ChartPieIcon, name: "گـزارشـات", url: "/report" },
    { icon: ServerIcon, name: "ســـرور", url: "/servers" },
    { icon: AdjustmentsHorizontalIcon, name: "کـانفیــگ", url: "/configs" },
    { icon: FunnelIcon, name: "دسته بندی", url: "/categories" },
    { icon: CreditCardIcon, name: "کارت ها", url: "/cards" },
    { icon: ClipboardDocumentCheckIcon, name: "بسته ها", url: "/packages" },
  ];

  const { pathname } = useLocation();
  const [selectedButton, setSelectedButton] = useState<string | null>(pathname);
  const navigate = useNavigate();

  const handleButtonClick = (itemURL: string) => {
    setSelectedButton(itemURL);
    const selectedItem = menuItem.find((item) => item.url === itemURL);
    if (selectedItem) {
      navigate(selectedItem.url, { replace: true });
    }
  };

  return (
    <div className="flex justify-center items-center p-5 h-full">
      <aside
        className={`bg-gradient-to-br from-gray-800 to-gray-900 overflow-auto
     w-72 h-full rounded-xl dark:bg-white`}
      >
        <div className="relative border-b border-white/20">
          <Header />
        </div>
        {menuItem.map((item) => (
          <AsideButton
            key={item.name}
            icon={item.icon}
            color={selectedButton === item.url ? "blue" : "#1e293b"}
            onClick={() => handleButtonClick(item.url)}
          >
            {item.name}
          </AsideButton>
        ))}
      </aside>
    </div>
  );
};

export default Aside;
