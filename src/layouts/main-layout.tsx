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
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <Outlet />
      </main>
    </div>
  );
}
