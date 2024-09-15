import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/shadcn/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Package2, PanelLeft, Search } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
// import { Logo } from "@/components/svg/logo";
import useAuth from "../auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Input } from "@/components/shadcn/ui/input";
import { TABS } from "./const/tabs";
import { ModeToggle } from "./theme/components/toggle-button";

export default function Header() {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent title="D" side="left" className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <PageLinks />
          </SheetContent>
        </Sheet>
        {/* <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb> */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Todavía no tiene funcionalidad..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
          />
        </div>
        <LoginLinks />
        <ModeToggle />
      </header>
    </div>
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
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <Link
        to={"/"}
        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
      >
        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
        <span className="sr-only">FormoTex</span>
      </Link>
      {TABS.map((tab) => {
        return (
          <Link
            key={tab.href}
            to={tab.href}
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </Link>
        );
      })}

      {/* <Link
                href="#"
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Settings
              </Link> */}
    </nav>
  );
}
