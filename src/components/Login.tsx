import { Image } from "@chakra-ui/react";
import Button from "./login/Button";
import Input from "./login/Input";
import loadingGif from "../assets/cactus-pavilion.gif";

const Login = () => {
  return (
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
        <Input type="text" placeholder="نام کاربری" />
        <Input type="password" placeholder="رمز ورود" />
      </div>

      <div className="flex items-center justify-center w-full">
        <Button content="Sign Up" />
      </div>
    </div>
  );
};

export default Login;
