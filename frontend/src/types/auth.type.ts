import { TAdmin } from "./admin.type";

export type TAuthLoginResponse = {
  admin: TAdmin;
  access_token: string;
};
