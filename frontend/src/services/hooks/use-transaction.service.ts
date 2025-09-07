import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import { TTransaction } from "@/types/transaction.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  getTransactions,
  updateTransaction,
} from "../transaction.service";

export const useGetTransactions = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TApiResponse<TTransaction[]>>>
) => {
  return useQuery<TApiResponse<TTransaction[]>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-transaction", params],
    queryFn: () => getTransactions(params),
  });
};

export const useGetTransaction = (
  id: string,
  opt?: Partial<QueryObserverOptions<TTransaction>>
) => {
  return useQuery<TTransaction, ApiServiceErr>({
    ...opt,
    queryKey: ["get-transaction", id],
    queryFn: () => getTransaction(id),
  });
};

export const useCreateTransaction = (
  opt?: Partial<MutOpt<TApiResponse<TTransaction>>>
) => {
  return useMutation<TApiResponse<TTransaction>, ApiServiceErr, unknown>({
    mutationKey: ["create-transaction"],
    mutationFn: async (payload) => {
      const res = await createTransaction(payload);

      return res;
    },
    ...opt,
  });
};

export const useUpdateTransaction = (
  opt?: Partial<MutOpt<TApiResponse<TTransaction>>>
) => {
  return useMutation<
    TApiResponse<TTransaction>,
    ApiServiceErr,
    { id: string; payload: unknown }
  >({
    mutationKey: ["update-transaction"],
    mutationFn: async ({ id, payload }) => {
      const res = await updateTransaction(id, payload);

      return res;
    },
    ...opt,
  });
};

export const useDeleteTransaction = (
  opt?: Partial<MutOpt<TApiResponse<TTransaction>>>
) => {
  return useMutation<TApiResponse<TTransaction>, ApiServiceErr, string>({
    ...opt,
    mutationKey: ["delete-transaction"],
    mutationFn: async (id) => {
      const res = await deleteTransaction(id);

      return res;
    },
  });
};
