import { Image } from "@chakra-ui/react";
import { useState } from "react";
import loadingGif from "../assets/cactus-pavilion.gif";
import Button from "./login/Button";
import Input from "./login/Input";
import client from "../services/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const printUserInfo = () => {
    client
      .post("/Login", { username, password })
      .then((res) => {
        toast.success("خوش آمدید", { icon: "🌵" });
        setUsername("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setPassword("");
        setUsername("");
      });
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
      />

      <div
        className={`flex items-center flex-col justify-center h-[590px] w-[460px] bg-opacity-15
     bg-white backdrop-blur-md shadow-lg rounded-lg text-white uppercase tracking-wider gap-8`}
      >
        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            <Image className="w-28 h-40" src={loadingGif} />
          </div>
          <div>
            <h2>Welcome to Cactus</h2>
            <h1 className="bg-gradient-to-r from-[#14163c] via-[#03217b] to-[#14163c] w-[100%] h-1 " />
          </div>
        </div>

        <div className="flex flex-col justify-around items-center h-32 w-full ">
          <Input
            type="text"
            placeholder="نام کاربری"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="رمز ورود"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <Button content="Log In" onClick={printUserInfo} />
        </div>
      </div>
    </>
  );
};

export default Login;
