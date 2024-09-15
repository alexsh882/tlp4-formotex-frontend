import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { useTheme } from "../hooks/use-theme";
import { AvailableThemes } from "../../const/available-themes";

export function ModeToggle() {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {AvailableThemes.map((theme) => {
          if (activeTheme === theme) {
            return null;
          }

          return (
            <DropdownMenuItem key={theme} onClick={() => setTheme(theme)}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
