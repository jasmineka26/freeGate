import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import AddButton from "./AddButton";

interface Props {
  handleClick: any;
}

const Search = ({ handleClick }: Props) => {
  const [searchWord, setSearchWord] = useState("");

  return (
    <div className="flex flex-row p-4 rounded-xl items-center justify-between bg-white shadow-lg">
      <div className="">
        <div className=" relative w-full text-gray-600 justify-center items-center">
          <input
            className="border-2 border-gray-300 bg-white h-10 p-4 w-72 pr-4 rounded-lg text-sm"
            type="search"
            name="search"
            placeholder="Search"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <button
            type="submit"
            className="absolute left-0 mt-4 ml-4"
            onClick={() => handleClick(searchWord)}
          >
            <MagnifyingGlassIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <AddButton />
      </div>
    </div>
  );
};

export default Search;
