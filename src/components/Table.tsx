import React from "react";

interface IProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  headerItems: () => React.ReactNode;
  identifier: (item: T) => string | number;
  loading: boolean;
  error: string | undefined;
}

const Table = <T,>({
  items,
  renderItem,
  headerItems,
  identifier,
  loading,
  error,
}: IProps<T>) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200 p-5 gap-5">
      <div className="flex rounded-xl overflow-hidden shadow-xl">
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead>
              <tr className="bg-slate-800 text-gray-400 text-center">
                {headerItems()}
              </tr>
            </thead>
            <tbody className="text-center">
              {items.map((item, index) => (
                <tr
                  key={identifier(item)} // Assuming index is a suitable key
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b`}
                >
                  {/* ... Render item rows ... */}
                  {renderItem(item)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
