import { TCategory } from "./category.type";
import { TTimestamp } from "./common.type";
import { TTransaction } from "./transaction.type";

export type TProduct = TTimestamp & {
  id: string;
  name: string;
  description: string;
  image: string;
  categoryId: string;
  stock: number;
  category: TCategory;
  transactions: Array<TTransaction>;
};
