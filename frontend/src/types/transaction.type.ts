import { TTimestamp } from "./common.type";
import { TProduct } from "./product.type";

export type TTransaction = TTimestamp & {
  id: string;
  productId: string;
  type: string;
  quantity: number;
  product: TProduct;
};
