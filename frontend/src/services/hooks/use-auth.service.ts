import { TAdmin } from "@/types/admin.type";
import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import { TAuthLoginResponse } from "@/types/auth.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  authGetMe,
  authLogin,
  authUpdatePassword,
  authUpdateProfile,
} from "../auth.service";

export const useAuthLogin = (
  opt?: MutOpt<TApiResponse<TAuthLoginResponse>>
) => {
  return useMutation<TApiResponse<TAuthLoginResponse>, ApiServiceErr, unknown>({
    mutationKey: ["auth-login"],
    mutationFn: authLogin,
    ...opt,
  });
};

export const useAuthUpdateProfile = (opt?: MutOpt<TApiResponse<TAdmin>>) => {
  return useMutation<TApiResponse<TAdmin>, ApiServiceErr, unknown>({
    mutationKey: ["auth-update-profile"],
    mutationFn: authUpdateProfile,
    ...opt,
  });
};

export const useAuthUpdatePassword = (opt?: MutOpt<TApiResponse<TAdmin>>) => {
  return useMutation<TApiResponse<TAdmin>, ApiServiceErr, unknown>({
    mutationKey: ["auth-update-password"],
    mutationFn: authUpdatePassword,
    ...opt,
  });
};

export const useAuthGetMe = (
  opt?: Partial<QueryObserverOptions<TApiResponse<TAdmin>>>
) => {
  return useQuery<TApiResponse<TAdmin>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-me"],
    queryFn: authGetMe,
  });
};
