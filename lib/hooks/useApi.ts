// hooks/useApi.js
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// const methodMap = {
//   post: api.post,
//   put: api.put,
//   patch: api.patch,
//   delete: api.delete,
//   get: api.get,
// }

export const useApi = <TData = unknown>(
  key: string,
  url: string,
  options?: Omit<UseQueryOptions<TData, AxiosError>, "queryKey" | "queryFn">
): UseQueryResult<TData, AxiosError> => {
  return useQuery<TData, AxiosError>({
    queryKey: [key],
    queryFn: () => api.get<TData>(url).then((res) => res.data),
    ...options,
  });
};

export const useApiMutation = (url: string, method = "POST") => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      url: string;
      body?: Record<string, any>;
      params?: unknown;
    }) => {
      const { url, body, params } = data;
      if (method.toLowerCase() === "get") {
        return api.get(url, { params }).then((res) => res.data);
      }
      return api[method.toLowerCase() as "post" | "put" | "patch" | "delete"](
        url,
        body
      ).then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
