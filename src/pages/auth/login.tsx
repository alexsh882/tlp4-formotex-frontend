import signInBg from "@/assets/img/sign-in-bg.png";
// import { Logo } from "@/components/svg/logo";
import SignIn from "@/features/auth/components/login";
import useAuth from "@/features/auth/hooks/use-auth";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth();
  if (isAuthenticated && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <main className="h-screen p-10 md:px-8 md:py-4 xl:p-0 flex items-center justify-center">
      <div className="h-full border rounded-lg flex mx-auto my-auto lg:px-0 w-full lg:max-w-6xl xl:max-w-max overflow-hidden shadow-md">
        <section className="h-full w-full flex-shrink-1 hidden md:flex md:items-center xl:p-24">
          <img src={signInBg} className="object-contain" />
        </section>
        <section className="flex flex-col justify-center gap-3 p-4 py-2 text-lg xl:w-2/3 md:px-10 w-full max-h-min">
          <Link to="/" className="flex items-center max-w-4xl">
            {/* <Logo className="h-24 aspect-square" /> */}
            <h1 className="font-sans-accent text-7xl text-primary">FormoteX</h1>
          </Link>
          <SignIn />
        </section>
      </div>
    </main>
  );
}
