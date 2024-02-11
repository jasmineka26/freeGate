/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import client from "./services/client";

type ClientMethod = typeof client;
type ApiMethod = keyof ClientMethod;
type IData<K extends ApiMethod> = Awaited<ReturnType<ClientMethod[K]>>;

const useApi = <K extends ApiMethod>(method: K) => {
  const [data, setData] = useState<IData<K> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(
    (...params: Parameters<ClientMethod[K]>) => {
      setError(undefined);
      setLoading(true);
      (client[method] as any)(...params)
        .then((response: IData<K>) => {
          setData(response);
          setError(undefined);
          setLoading(false);
        })
        .catch((_error: unknown) => {
          const error = _error as AxiosError;
          const message = (error.response?.data as any)?.message;
          setError(message ?? error.message);
          setLoading(false);
          setData(undefined);
        });
    },
    [method]
  );

  return { request, loading, error, data, setData };
};

export default useApi;

export function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, timeout);
  });
}
