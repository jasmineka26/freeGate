import { useEffect } from "react";
import useApi from "./useApi";

const Test = () => {
  const {
    request: getCategories,
    loading,
    error,
    data,
  } = useApi("getCategories");

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="h-screen w-screen text-white bg-slate-900 p-4">
      <button
        className="w-32 h-12 rounded bg-green-700"
        // onClick={loading ? undefined : getCategories}
      >
        {loading ? "Loading..." : "Send Request"}
      </button>
      {error ? (
        <div className="flex ring mt-8 p-2 text-xs text-red-500 gap-4">
          {error}
          <button className="p-3 bg-green-700" onClick={() => getCategories()}>
            try
          </button>
        </div>
      ) : (
        <div className="ring mt-8 p-2 text-xs">{JSON.stringify(data)}</div>
      )}
    </div>
  );
};

export default Test;
