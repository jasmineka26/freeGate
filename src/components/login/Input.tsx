interface Props {
  type: string;
  placeholder: string;
}

const Input = ({ type, placeholder }: Props) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`font-sans bg-opacity-15 bg-white backdrop-blur-md shadow-md rounded-full w-[80%] h-12 px-4 text-[#46f1fd] focus:ring
       placeholder-[#ece5ff] `}
    />
  );
};

export default Input;
