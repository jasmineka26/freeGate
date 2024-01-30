interface Props {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, value, onChange }: Props) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={`font-sans bg-opacity-10 bg-white backdrop-blur-md shadow-md rounded-full w-[85%] h-12 px-4 text-white focus:ring
       placeholder-[#ece5ff] `}
    />
  );
};

export default Input;
