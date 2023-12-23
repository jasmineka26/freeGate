import IconType from "../../../models/IconType";

interface Props {
  children: string;
  icon: IconType;
}

const AsideButton = ({ children, icon: Icon }: Props) => {
  return (
    <div className="flex flex-col m-4">
      <div className="flex flex-col">
        <div>
          <button
            className={`middle none font-sans font-bold center transition-all disabled:opacity-50 
            disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr
         from-blue-600 to-blue-400 text-white shadow-md shadow-blue-500/20 hover:shadow-lg
          hover:shadow-blue-500/40 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize`}
            type="button"
          >
            <Icon className="w-5 h-5 text-inherit" />
            <div className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
              {children}
            </div>
          </button>
        </div>
      </div>
      {/* <ul className="mb-4 flex flex-col gap-1">
        <li className="mx-3.5 mt-4 mb-2">
          <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">
            auth pages
          </p>
        </li>
        <li>
          <a className="" href="#">
            <button
              className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-inherit"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                sign in
              </p>
            </button>
          </a>
        </li>
        <li>
          <a className="" href="#">
            <button
              className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5 text-inherit"
              >
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
              </svg>
              <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                sign up
              </p>
            </button>
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default AsideButton;
