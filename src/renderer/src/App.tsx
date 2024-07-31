import { Minus, Plus } from "lucide-react";
import electronLogo from "./assets/electron.svg";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

function App(): JSX.Element {
  const [count, setCount] = useState(0);

  const increment = () =>
    setCount((count) => {
      toast("Add", {
        description: "Increased by 1",
      });
      return count + 1;
    });

  const decrement = () =>
    setCount((count) => {
      toast("Subtract", {
        description: "Decreased by 1",
      });
      return count - 1;
    });

  return (
    <main className="dark flex min-h-screen w-screen flex-col items-center justify-center gap-4 bg-zinc-950">
      <h1 className="text-4xl text-white">Hello, World!</h1>
      <img src={electronLogo} alt="logo" className="size-40 animate-spin" />
      <div className="flex items-center gap-8">
        <Button size="icon" onClick={decrement}>
          <Minus />
        </Button>
        <span className="pb-2 text-7xl text-white">{count}</span>
        <Button size="icon" onClick={increment}>
          <Plus />
        </Button>
      </div>
    </main>
  );
}

export default App;
