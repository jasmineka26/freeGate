import React from "react";

interface IProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
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
    <div className="flex flex-col h-screen bg-gray-200 gap-5 overflow-auto rounded-xl">
      <div className="flex shadow-xl">
        <div className="w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead>
              <tr className="bg-slate-800 text-gray-400 text-center">
                {headerItems()}
              </tr>
            </thead>
            <tbody className="text-center tex">
              {items.map((item, index) => (
                <tr
                  key={identifier(item)}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } border-b`}
                >
                  {renderItem(item, index)}
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
