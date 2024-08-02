import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      {theme === "dark" ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Moon />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          <Sun />
        </Button>
      )}
    </div>
  );
};

export default ThemeChanger;
