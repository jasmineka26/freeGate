interface Props {
  buttonName: string;
  handleClicked: () => void;
}

const AddButton = ({ buttonName, handleClicked }: Props) => {
  return (
    <div>
      <button
        onClick={handleClicked}
        className="bg-blue-700 hover:bg-blue-800 text-white font-normal text-sm py-2 px-1 rounded-lg h-10 w-24"
      >
        {buttonName}
      </button>
    </div>
  );
};

export default AddButton;
