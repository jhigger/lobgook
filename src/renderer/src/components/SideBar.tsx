import {
  Logs,
  Moon,
  Settings2,
  Signature,
  SquareTerminal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Link, useMatch } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type CustomNavLinkType = {
  to: string;
  icon: React.ReactNode;
  tooltip: string;
};

const CustomNavLink = ({ to, icon, tooltip }: CustomNavLinkType) => {
  const isActive = useMatch({ path: to });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "rounded-lg",
            isActive && "bg-foreground text-background",
          )}
          asChild
        >
          <Link to={to}>{icon}</Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={5}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

const SideBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <aside className="inset-y fixed left-0 z-20 flex h-full flex-col border-r bg-background shadow">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Signature className="size-5" />
        </Button>
      </div>

      <nav className="grid gap-2 p-2">
        <CustomNavLink
          to="/"
          icon={<SquareTerminal className="size-5" />}
          tooltip="Add Record"
        />

        <CustomNavLink
          to="/records"
          icon={<Logs className="size-5" />}
          tooltip="View Records"
        />

        <CustomNavLink
          to="/settings"
          icon={<Settings2 className="size-5" />}
          tooltip="Settings"
        />
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
