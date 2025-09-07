import axiosInstance from "@/lib/axios-instance";
import { TApiResponse } from "@/types/api.type";
import { TAdmin } from "@/types/admin.type";

export const getAdmins = async (params?: unknown) => {
  const { data } = await axiosInstance.get<TApiResponse<TAdmin[]>>("/admin", {
    params,
  });

  return data;
};

export const getAdmin = async (id: string) => {
  const { data } = await axiosInstance.get<TApiResponse<TAdmin>>(
    `/admin/${id}`
  );

  return data.data;
};

export const createAdmin = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TAdmin>>(
    `/admin`,
    payload
  );

  return data;
};

export const updateAdmin = async (id: string, payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TAdmin>>(
    `/admin/${id}`,
    payload
  );

  return data;
};

export const deleteAdmin = async (id: string) => {
  const { data } = await axiosInstance.delete<TApiResponse<TAdmin>>(
    `/admin/${id}`
  );

  return data;
};
