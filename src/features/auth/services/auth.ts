import { api } from "@/features/common/api";
import { TUser } from "../interfaces/user";

export type SignInParams = {
  username: string;
  password: string;
};
export type SignInResponse = {
  token: string;
  user: TUser;
};

export async function signIn(params: SignInParams) {
  const response = await api.post<SignInResponse>("api/auth/login", {
    username: params.username,
    password: params.password,
  });

  return response;
}
