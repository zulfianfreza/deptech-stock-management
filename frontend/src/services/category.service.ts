import axiosInstance from "@/lib/axios-instance";
import { TApiResponse } from "@/types/api.type";
import { TCategory } from "@/types/category.type";

export const getCategories = async (params?: unknown) => {
  const { data } = await axiosInstance.get<TApiResponse<TCategory[]>>(
    "/category",
    {
      params,
    }
  );

  return data;
};

export const getCategory = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TCategory>>(
    `/category/${id}`
  );

  return data.data;
};

export const createCategory = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TCategory>>(
    `/category`,
    payload
  );

  return data;
};

export const updateCategory = async (id: string, payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TCategory>>(
    `/category/${id}`,
    payload
  );

  return data;
};

export const deleteCategory = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TCategory>>(
    `/category/${id}`
  );

  return data;
};
