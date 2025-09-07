import axiosInstance from "@/lib/axios-instance";
import { TApiResponse } from "@/types/api.type";
import { TProduct } from "@/types/product.type";

export const getProducts = async (params?: unknown) => {
  const { data } = await axiosInstance.get<TApiResponse<TProduct[]>>(
    "/product",
    {
      params,
    }
  );

  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TProduct>>(
    `/product/${id}`
  );

  return data.data;
};

export const createProduct = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TProduct>>(
    `/product`,
    payload
  );

  return data;
};

export const updateProduct = async (id: string, payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TProduct>>(
    `/product/${id}`,
    payload
  );

  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TProduct>>(
    `/product/${id}`
  );

  return data;
};
