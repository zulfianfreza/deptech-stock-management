import axiosInstance from "@/lib/axios-instance";
import { TApiResponse } from "@/types/api.type";
import { TTransaction } from "@/types/transaction.type";

export const getTransactions = async (params?: unknown) => {
  const { data } = await axiosInstance.get<TApiResponse<TTransaction[]>>(
    "/transaction",
    {
      params,
    }
  );

  return data;
};

export const getTransaction = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TTransaction>>(
    `/transaction/${id}`
  );

  return data.data;
};

export const createTransaction = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TTransaction>>(
    `/transaction`,
    payload
  );

  return data;
};

export const updateTransaction = async (id: string, payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TTransaction>>(
    `/transaction/${id}`,
    payload
  );

  return data;
};

export const deleteTransaction = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TTransaction>>(
    `/transaction/${id}`
  );

  return data;
};
