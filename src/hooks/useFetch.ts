import { useState, useEffect } from "react";

const useFetch = <T>(fetchData: () => Promise<T[]>, title: string) => {
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
      .catch((error) => {
        setError(`Error fetching ${title} data`);
      });
  }, [fetchData, title]);

  return { data, error, loading };
};

export default useFetch;
