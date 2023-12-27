import { useEffect, useState } from "react";
import client from "../services/client";
import Config from "../models/Config";
import AddButton from "./users/AddButton";

const Configs = () => {
  const [configs, setConfigs] = useState<Config[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .getConfigs()
      .then((res) => {
        setConfigs(res);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching configs data");
        console.error("Error fetching cards data:", error);
        setError("Error fetching configs data");
      });
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen bg-gray-200 p-5 gap-5">
      <div className="flex flex-row p-4 rounded-xl items-center justify-between bg-white shadow-lg">
        <div className="flex flex-row w-full text-gray-600 justify-end items-center">
          <AddButton buttonName="+Add Config" />
        </div>
      </div>
      <div className="flex rounded-xl overflow-hidden shadow-xl">
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead>
              <tr className=" bg-slate-800 text-gray-400 text-center">
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>
                <th scope="col" className="px-6 py-3">
                  عنوان
                </th>
                <th scope="col" className="px-6 py-3">
                  عنوان نمایشی
                </th>
                <th scope="col" className="px-6 py-3">
                  آدرس
                </th>
                <th scope="col" className="px-6 py-3">
                  SNI
                </th>
                <th scope="col" className="px-6 py-3">
                  سایر تنظیمات
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {configs.map((config, index) => (
                <tr
                  key={config.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b`}
                >
                  <td
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">{config.title}</td>
                  <td className="px-6 py-4">{config.user_title}</td>
                  <td className="px-6 py-4">{config.address}</td>
                  <td className="px-6 py-4">{config.sni}</td>
                  <td className="px-6 py-4">{config.settings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Configs;
