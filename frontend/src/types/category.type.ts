import { TTimestamp } from "./common.type";

export type TCategory = TTimestamp & {
  id: string;
  name: string;
  description: string;
};
