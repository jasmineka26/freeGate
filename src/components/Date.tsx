import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import transition from "react-element-popper/animations/transition";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

interface IProps {
  onDatePicked: (startDate: Date, endDate: Date) => void;
}
const Date: React.FC<IProps> = ({ onDatePicked }) => {
  const [startDate, setStartDate] = useState<DateObject | DateObject[] | null>(
    new DateObject()
  );
  const [endDate, setEndDate] = useState<DateObject | DateObject[] | null>(
    new DateObject()
  );

  const handleCreate = async () => {
    onDatePicked(
      (startDate as DateObject).toDate(),
      (endDate as DateObject).toDate()
    );
  };

  return (
    <div className="flex p-4 rounded-xl items-center justify-between bg-white shadow-lg ">
      <div>
        <span className="mx-4 text-gray-500">از</span>
        <DatePicker
          style={{
            height: "40px",
            padding: "0 10px 0px 10px",
            color: "gray",
          }}
          className="bg-dark"
          placeholder="Select date start"
          name="start"
          calendar={persian}
          locale={persian_fa}
          format="HH:mm - YYYY/MM/DD"
          animations={[opacity(), transition({ from: 35, duration: 800 })]}
          value={startDate}
          onChange={setStartDate}
          plugins={[
            <TimePicker hideSeconds />,
            <Toolbar position="bottom" sort={["deselect", "close", "today"]} />,
          ]}
        />
        <span className="mx-4 text-gray-500">تـــــــــا</span>
        <DatePicker
          style={{ height: "40px", padding: "0 10px 0px 10px", color: "gray" }}
          className="bg-dark"
          placeholder="Select date end"
          name="end"
          calendar={persian}
          locale={persian_fa}
          format="HH:mm - YYYY/MM/DD"
          animations={[opacity(), transition({ from: 35, duration: 800 })]}
          value={endDate}
          onChange={setEndDate}
          plugins={[
            <TimePicker hideSeconds />,
            <Toolbar position="bottom" sort={["deselect", "close", "today"]} />,
          ]}
        />
      </div>
      <div>
        <button
          onClick={handleCreate}
          className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
        >
          ایــجــــــــاد
        </button>
      </div>
    </div>
  );
};

export default Date;
