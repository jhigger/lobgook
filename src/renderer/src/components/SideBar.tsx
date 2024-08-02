import {
  Logs,
  Moon,
  Settings2,
  Signature,
  SquareTerminal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const SideBar = () => {
  const { theme, setTheme } = useTheme();

  const route = "input";

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r bg-background shadow">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Signature className="size-5" />
        </Button>
      </div>
      <nav className="grid gap-2 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-lg",
                route === "input" && "bg-foreground text-background",
              )}
              aria-label="Input"
            >
              <SquareTerminal className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Input
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Logs"
            >
              <Logs className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            View Logbook
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="Settings"
            >
              <Settings2 className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Settings
          </TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Theme Changer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Moon className="size-5" />
              ) : (
                <Sun className="size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Change Theme
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default SideBar;
