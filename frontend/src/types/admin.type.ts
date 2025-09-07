import { TTimestamp } from "./common.type";

export type TAdmin = TTimestamp & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
};
