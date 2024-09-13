import useAuth from "@/features/auth/hooks/use-auth";
import Header from "@/features/ui/header";
import { Navigate, Outlet } from "react-router-dom";

export default function MainLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated && !loading) {
    console.log("en Main", { isAuthenticated, loading });

    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full w-full font-thin">
      <Header />
      <Outlet />
    </div>
  );
}
