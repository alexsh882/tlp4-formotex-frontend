import useAuth from "@/features/auth/hooks/use-auth";
import Aside from "@/features/ui/aside";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated && !loading) {
    console.log("en Main", { isAuthenticated, loading });

    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full w-full font-thin">
      <Aside />
      <Outlet />
    </div>
  );
}
