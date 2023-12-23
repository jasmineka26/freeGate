interface Props {
  content: string;
  onClick: () => void;
}

const Button = ({ content, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-60 bg-gradient-to-r from-[#14163c] via-[#03217b] to-[#14163c] text-white text-xl tracking-wide 
     h-12 border-none rounded-full cursor-pointer`}
    >
      {content}
    </button>
  );
};

export default Button;
