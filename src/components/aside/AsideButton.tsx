import IconType from "../../models/IconType";

interface Props {
  children: string;
  icon: IconType;
  color: string;
  onClick: () => void;
}

const AsideButton = ({ children, icon: Icon, color, onClick }: Props) => {
  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col">
        <div>
          <button
            className={`middle none font-sans font-bold center transition-all 
           disabled:pointer-events-none text-xs py-3 rounded-lg hover:shadow-lg  text-white shadow-md
          hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize
          `}
            style={{ backgroundColor: color }}
            type="button"
            onClick={onClick}
          >
            <Icon className="w-5 h-5 text-inherit" />
            <div className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
              {children}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsideButton;
