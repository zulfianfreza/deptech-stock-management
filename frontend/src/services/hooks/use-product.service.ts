import { ApiServiceErr, MutOpt, TApiResponse } from "@/types/api.type";
import { TProduct } from "@/types/product.type";
import {
  QueryObserverOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../product.service";

export const useGetProducts = (
  params?: unknown,
  opt?: Partial<QueryObserverOptions<TApiResponse<TProduct[]>>>
) => {
  return useQuery<TApiResponse<TProduct[]>, ApiServiceErr>({
    ...opt,
    queryKey: ["get-product", params],
    queryFn: () => getProducts(params),
  });
};

export const useGetProduct = (
  id: string,
  opt?: Partial<QueryObserverOptions<TProduct>>
) => {
  return useQuery<TProduct, ApiServiceErr>({
    ...opt,
    queryKey: ["get-product", id],
    queryFn: () => getProduct(id),
  });
};

export const useCreateProduct = (
  opt?: Partial<MutOpt<TApiResponse<TProduct>>>
) => {
  return useMutation<TApiResponse<TProduct>, ApiServiceErr, unknown>({
    mutationKey: ["create-product"],
    mutationFn: async (payload) => {
      const res = await createProduct(payload);

      return res;
    },
    ...opt,
  });
};

export const useUpdateProduct = (
  opt?: Partial<MutOpt<TApiResponse<TProduct>>>
) => {
  return useMutation<
    TApiResponse<TProduct>,
    ApiServiceErr,
    { id: string; payload: unknown }
  >({
    mutationKey: ["update-product"],
    mutationFn: async ({ id, payload }) => {
      const res = await updateProduct(id, payload);

      return res;
    },
    ...opt,
  });
};

export const useDeleteProduct = (
  opt?: Partial<MutOpt<TApiResponse<TProduct>>>
) => {
  return useMutation<TApiResponse<TProduct>, ApiServiceErr, string>({
    ...opt,
    mutationKey: ["delete-product"],
    mutationFn: async (id) => {
      const res = await deleteProduct(id);

      return res;
    },
  });
};
