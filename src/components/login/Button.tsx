interface Props {
  content: string;
}

const Button = ({ content }: Props) => {
  return (
    <button
      className={`w-60 bg-gradient-to-r from-[#14163c] via-[#03217b] to-[#14163c] text-white uppercase tracking-wide 
     h-12 border-none rounded-full cursor-pointer`}
    >
      {content}
    </button>
  );
};

export default Button;
