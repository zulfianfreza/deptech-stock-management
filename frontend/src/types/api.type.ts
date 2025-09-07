import { UseMutationOptions } from "@tanstack/react-query";

export type TApiResponse<D> = {
  success: boolean;
  message: string;
  data: D;
};

export type TExpressApiResponse<T> = {
  message: string;
  success: boolean;
  data: T;
};

export type MutOpt<Response, TVariables = unknown> = UseMutationOptions<
  Response,
  ApiServiceErr,
  TVariables,
  unknown
>;

export type ApiServiceErr = any;

export type TUploadFileReponse = {
  url: string;
  original_filename: string;
  generated_filename: string;
};
