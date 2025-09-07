import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import { TAdmin } from "@/types/admin.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdmins,
  updateAdmin,
} from "../admin.service";

export const useGetAdmins = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TApiResponse<TAdmin[]>>>
) => {
  return useQuery<TApiResponse<TAdmin[]>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-admin", params],
    queryFn: () => getAdmins(params),
  });
};

export const useGetAdmin = (
  id: string,
  opt?: Partial<QueryObserverOptions<TAdmin>>
) => {
  return useQuery<TAdmin, ApiServiceErr>({
    ...opt,
    queryKey: ["get-admin", id],
    queryFn: () => getAdmin(id),
  });
};

export const useCreateAdmin = (opt?: Partial<MutOpt<TApiResponse<TAdmin>>>) => {
  return useMutation<TApiResponse<TAdmin>, ApiServiceErr, unknown>({
    mutationKey: ["create-admin"],
    mutationFn: async (payload) => {
      const res = await createAdmin(payload);

      return res;
    },
    ...opt,
  });
};

export const useUpdateAdmin = (opt?: Partial<MutOpt<TApiResponse<TAdmin>>>) => {
  return useMutation<
    TApiResponse<TAdmin>,
    ApiServiceErr,
    { id: string; payload: unknown }
  >({
    mutationKey: ["update-admin"],
    mutationFn: async ({ id, payload }) => {
      const res = await updateAdmin(id, payload);

      return res;
    },
    ...opt,
  });
};

export const useDeleteAdmin = (opt?: Partial<MutOpt<TApiResponse<TAdmin>>>) => {
  return useMutation<TApiResponse<TAdmin>, ApiServiceErr, string>({
    ...opt,
    mutationKey: ["delete-admin"],
    mutationFn: async (id) => {
      const res = await deleteAdmin(id);

      return res;
    },
  });
};
