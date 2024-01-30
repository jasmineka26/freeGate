import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loadingGif from "../assets/cactus-pavilion.gif";
import backGroundImage from "../assets/background.jpg";
import client from "../services/client";
import Button from "./login/Button";
import Input from "./login/Input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const printUserInfo = () => {
    client
      .login(username, password)
      .then(() => {
        toast.success("خوش آمدید", { icon: "🌵" });
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
        setPassword("");
        setUsername("");
      });
  };

  return (
    <>
      <Image
        src={backGroundImage}
        className="absolute w-screen h-screen bg-cover"
      />
      <div className="flex w-screen h-screen justify-center items-center">
        <div
          className={`flex items-center flex-col justify-center h-[590px] w-[460px]
          bg-opacity-15 bg-white backdrop-blur-md shadow-lg rounded-xl text-white
          uppercase tracking-wider gap-8
         login
     `}
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

          <div className="flex items-center justify-center w-[60%]">
            <Button content="Log In" onClick={printUserInfo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
