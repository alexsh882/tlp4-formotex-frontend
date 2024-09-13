import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { ListCheck } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
// import { Logo } from "@/components/svg/logo";
import Offcanvas from "./offcanvas";
import useAuth from "../auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";

const TABS = [
  { label: "Inventario", href: "/inventory", icon: ListCheck },
  // { label: "Contacto", href: "/contact", icon: Contact },
];

export default function Header() {
  return (
    <header className="flex flex-wrap items-center justify-between border border-slate-200 px-2 md:px-4 py-2 text-4xl">
      <Link
        className="flex gap-2 text-[2.5rem] items-center text-blue-600 flex-1 justify-center lg:justify-start"
        to="/"
      >
        {/* <Logo className="w-[60px] h-[60px]" /> */}
        <h1 className="font-sans-accent text-center">
          FormoteX
          <span className="sr-only">Gestión de inventario</span>
        </h1>
      </Link>
      <Offcanvas>
        <NavigationMenu className="w-full flex flex-col justify-center h-full px-8 max-w-none">
          <div className="w-full h-full py-10">
            <ul className="list-none">
              <PageLinks />
            </ul>
          </div>
          <div className="mt-auto w-full h-fit py-10">
            <ul className="list-none flex flex-col gap-4">
              <LoginLinks />
            </ul>
          </div>
        </NavigationMenu>
      </Offcanvas>
      <div className="hidden md:flex md:items-stretch content-center justify-items-center md:justify-center w-full lg:w-auto">
        <NavigationMenu className="flex gap-6 h-100 items-center justify-center h-full list-none">
          <ul className="flex gap-2 items-center">
            <PageLinks />
            <LoginLinks />
          </ul>
        </NavigationMenu>
      </div>
    </header>
  );
}

function LoginLinks() {
  const { isAuthenticated, loading, signOut, user } = useAuth();
  return (
    <>
      {isAuthenticated && !loading && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">{user?.names}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Opciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={signOut}>Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!isAuthenticated && !loading && (
        <NavigationMenuItem
          key={"/sign-in"}
          className="w-full flex items-center"
        >
          <NavLink to={"/sign-in"}>
            <NavigationMenuLink
              className={`${cn(
                navigationMenuTriggerStyle(),
                "bg-blue-500 text-white hover:bg-blue-600 hover:text-white w-full md:w-max text-lg h-auto"
              )}`}
            >
              Iniciar sesión
            </NavigationMenuLink>
          </NavLink>
        </NavigationMenuItem>
      )}
    </>
  );
}

function PageLinks() {
  const activeLink = TABS.find((tab) => tab.href === window.location.pathname);
  return (
    <>
      {TABS.map((tab) => {
        const className = cn({
          "bg-blue-600 text-slate-100": activeLink === tab,
          "text-gray-800": activeLink !== tab,
        });
        return (
          <NavigationMenuItem key={tab.href}>
            <NavLink to={tab.href}>
              <NavigationMenuLink
                className={`${cn(
                  navigationMenuTriggerStyle(),
                  className,
                  "w-full h-full md:w-max text-lg flex gap-2 items-center"
                )}`}
              >
                {<tab.icon />}
                {tab.label}
              </NavigationMenuLink>
            </NavLink>
          </NavigationMenuItem>
        );
      })}
    </>
  );
}
