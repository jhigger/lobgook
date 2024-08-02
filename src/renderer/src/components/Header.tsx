import { Maximize, Minimize, Minus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

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
        <Button variant="outline" size="icon" onClick={handleMinimize}>
          <Minus className="size-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleMaximize}>
          {isMaximized ? (
            <Minimize className="size-5" />
          ) : (
            <Maximize className="size-5" />
          )}
        </Button>
        <Button variant="outline" size="icon" onClick={handleQuit}>
          <X className="size-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
