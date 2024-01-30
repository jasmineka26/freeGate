import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import AddButton from "./AddButton";

interface Props {
  onSearchChange?: (searchWord: string) => void;
  buttonTitle: string;
  onAddClick: () => void;
}

const Search = ({
  onSearchChange,
  buttonTitle,
  onAddClick: onClicked,
}: Props) => {
  return (
    <div className="flex flex-row p-4 rounded-xl items-center justify-between bg-white shadow-lg">
      <div>
        <AddButton handleClicked={onClicked} buttonName={buttonTitle} />
      </div>
      {onSearchChange && (
        <div className="flex flex-row w-full text-gray-600 justify-end items-center">
          <div className="flex p-2 bg-blue-700 h-10 items-center justify-center rounded-r-lg">
            <MagnifyingGlassIcon className="w-4 h-4 text-white" />
          </div>
          <input
            className="border-2 border-r-0 border-gray-300 bg-white h-10 p-4 w-72 rounded-l-lg text-sm"
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => {
              onSearchChange(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
