import { api } from "@/features/common/api";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "@/features/common/use-storage";
import { createContext, useCallback, useEffect } from "react";

import { SignInParams, signIn as signInService } from "../services/auth";

import { getUserProfile } from "@/features/profile/services/profile";
import { TUser } from "@/features/users/interfaces/user";
// import { AxiosError } from "axios";

type AuthContextType = {
  signIn: (user: SignInParams) => Promise<void>;
  signOut: () => void;
} & {
  user: TUser | null;
  token: string | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value: token, setItem: setToken } = useLocalStorage("token");

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  const getUser = useCallback(async () => {
    if (!token) return null;
    const user = await getUserProfile({ token });

    return user;
  }, [token]);

  const {
    data: user,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useQuery<TUser | null>({
    queryKey: ["user", token],
    queryFn: getUser,
    enabled: !!token,
  });

  const isAdmin = user?.user_role.name === "Admin";

  const signIn = async (fields: SignInParams) => {
    const response = await signInService(fields);
    setToken(response.data.token);
  };

  useEffect(() => {
    if (!token) {
      delete api.defaults.headers.Authorization;
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    refetchUser();
  }, [token]);

  const signOut = () => {
    setToken(null);
  };

  const loading = userLoading;

  const isAuthenticated = !!token && !!user && !loading;

  return (
    <AuthContext.Provider
      value={
        {
          user,
          token,
          isAdmin,
          signIn,
          signOut,
          loading,
          isAuthenticated,
        } as AuthContextType
      }
    >
      {children}
    </AuthContext.Provider>
  );
}
