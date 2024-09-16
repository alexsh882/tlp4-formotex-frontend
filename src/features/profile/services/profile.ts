import { api } from "@/features/common/api";
import { TUser } from "@/features/users/interfaces/user";

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
