import axiosInstance from "@/lib/axios-instance";
import { TAdmin } from "@/types/admin.type";
import { TApiResponse } from "@/types/api.type";
import { TAuthLoginResponse } from "@/types/auth.type";

export const authLogin = async (payload: unknown) => {
  const { data } = await axiosInstance.post<TApiResponse<TAuthLoginResponse>>(
    "/auth/login",
    payload
  );

  return data;
};

export const authGetMe = async () => {
  const { data } = await axiosInstance.get<TApiResponse<TAdmin>>("/auth/me");

  return data;
};

export const authUpdateProfile = async (payload: unknown) => {
  const { data } = await axiosInstance.patch<TApiResponse<TAdmin>>(
    "/auth/update-profile",
    payload
  );

  return data;
};

export const authUpdatePassword = async (payload: unknown) => {
  const { data } = await axiosInstance.put<TApiResponse<TAdmin>>(
    "/auth/update-password",
    payload
  );

  return data;
};
