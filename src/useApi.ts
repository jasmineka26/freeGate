/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import client from "./services/client";

type ClientMethod = typeof client;
type ApiMethod = keyof ClientMethod;
type IData<K extends ApiMethod> = Awaited<ReturnType<ClientMethod[K]>>;

interface ApiResult<T> {
  succeed: boolean;
  data: T | undefined;
  error: string | undefined;
}

const useApi = <K extends ApiMethod>(method: K) => {
  const [data, setData] = useState<IData<K> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(
    async (
      ...params: Parameters<ClientMethod[K]>
    ): Promise<ApiResult<IData<K>>> => {
      setError(undefined);
      setLoading(true);
      try {
        const response = await (client[method] as any)(...params);
        setData(response);
        setError(undefined);
        setLoading(false);
        return { succeed: true, data: response, error: undefined };
      } catch (_error) {
        const error = _error as AxiosError;
        const message = (error.response?.data as any)?.message;
        setError(message ?? error.message);
        setLoading(false);
        setData(undefined);
        return {
          succeed: false,
          data: undefined,
          error: message ?? error.message,
        };
      }
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
