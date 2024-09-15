import useAuth from "@/features/auth/hooks/use-auth";
import Aside from "@/features/ui/aside";
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
      <Aside />
      <Header />
      <main className="overflow-y-scroll max-h-full m-4 sm:mx-20">
        <Outlet />
      </main>
    </div>
  );
}
