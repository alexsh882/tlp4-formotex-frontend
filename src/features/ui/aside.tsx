import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, useResolvedPath } from "react-router-dom";
import { TABS } from "./const/tabs";

export default function Aside() {
  const { pathname } = useResolvedPath(window.location.pathname);

  const activeLink = TABS.find((tab) => tab.href === pathname);

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          {TABS.map((tab) => {
            const className = cn({
              "bg-primary text-primary-foreground transition-colors md:h-8 md:w-8":
                activeLink === tab,
              "text-muted-foreground transition-colors hover:text-foreground":
                activeLink !== tab,
            });

            return (
              <Tooltip key={tab.href}>
                <TooltipTrigger asChild>
                  <Link
                    key={tab.href}
                    to={tab.href}
                    className={`${cn(
                      className,
                      "flex h-9 w-9 items-center justify-center md:h-8 md:w-8 rounded-lg"
                    )}`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="sr-only">{tab.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{tab.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
