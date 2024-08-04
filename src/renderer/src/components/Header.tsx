import { Maximize, Minimize, Minus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMinimize = () => {
    window.api.minimize();
  };

  const handleMaximize = () => {
    if (isMaximized) {
      window.api.unmaximize();
    } else {
      window.api.maximize();
    }
    setIsMaximized((val) => !val);
  };

  const handleQuit = () => {
    window.api.quit();
  };

  return (
    <header className="drag sticky top-0 z-10 flex h-[57px] shrink-0 items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">LOBGOOK</h1>
      <div className="no-drag ml-auto flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              <Minus className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            Minimize
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label={isMaximized ? "Restore" : "Maximize"}
              onClick={handleMaximize}
            >
              {isMaximized ? (
                <Minimize className="size-5" />
              ) : (
                <Maximize className="size-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            {isMaximized ? "Restore" : "Maximize"}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Quit"
              onClick={handleQuit}
              className="hover:bg-destructive hover:text-white"
            >
              <X className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={5}>
            Quit
          </TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
