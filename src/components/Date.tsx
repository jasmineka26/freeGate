import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import opacity from "react-element-popper/animations/opacity";
import transition from "react-element-popper/animations/transition";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Toolbar from "react-multi-date-picker/plugins/toolbar";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

const Date = () => {
  return (
    <div className="flex p-4 rounded-xl items-center justify-center bg-white shadow-lg">
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
        plugins={[
          <TimePicker hideSeconds />,
          <Toolbar position="bottom" sort={["deselect", "close", "today"]} />,
        ]}
      />
    </div>
  );
};

export default Date;
