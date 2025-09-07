import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import { TCategory } from "@/types/category.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../category.service";

export const useGetCategories = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TApiResponse<TCategory[]>>>
) => {
  return useQuery<TApiResponse<TCategory[]>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-category", params],
    queryFn: () => getCategories(params),
  });
};

export const useGetCategory = (
  id: string,
  opt?: Partial<QueryObserverOptions<TCategory>>
) => {
  return useQuery<TCategory, ApiServiceErr>({
    ...opt,
    queryKey: ["get-category", id],
    queryFn: () => getCategory(id),
  });
};

export const useCreateCategory = (
  opt?: Partial<MutOpt<TApiResponse<TCategory>>>
) => {
  return useMutation<TApiResponse<TCategory>, ApiServiceErr, unknown>({
    mutationKey: ["create-category"],
    mutationFn: async (payload) => {
      const res = await createCategory(payload);

      return res;
    },
    ...opt,
  });
};

export const useUpdateCategory = (
  opt?: Partial<MutOpt<TApiResponse<TCategory>>>
) => {
  return useMutation<
    TApiResponse<TCategory>,
    ApiServiceErr,
    { id: string; payload: unknown }
  >({
    mutationKey: ["update-category"],
    mutationFn: async ({ id, payload }) => {
      const res = await updateCategory(id, payload);

      return res;
    },
    ...opt,
  });
};

export const useDeleteCategory = (
  opt?: Partial<MutOpt<TApiResponse<TCategory>>>
) => {
  return useMutation<TApiResponse<TCategory>, ApiServiceErr, string>({
    ...opt,
    mutationKey: ["delete-category"],
    mutationFn: async (id) => {
      const res = await deleteCategory(id);

      return res;
    },
  });
};
