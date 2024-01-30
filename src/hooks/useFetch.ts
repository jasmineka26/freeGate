import { useState, useEffect } from "react";

const useFetch = <T>(fetchData: () => Promise<T[]>, errorTitle?: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
        setLoading(false);
        setError(undefined);
      })
      .catch(() => {
        setError(`Error fetching ${errorTitle ?? ""} data`);
      });
  }, [fetchData, errorTitle]);

  return { data, error, loading, setData };
};

export default useFetch;
