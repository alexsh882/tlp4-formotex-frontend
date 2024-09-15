import { TUser } from "@/features/auth/interfaces/user";
import { api } from "@/features/common/api";

type UserProfileParams = {
  token: string;
};

export async function getUserProfile(params: UserProfileParams) {
  const response = await api.get<TUser>("api/auth/profile", {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  });

  return response.data;
}
