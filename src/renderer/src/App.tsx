import RecordForm from "./components/RecordForm";
import ThemeChanger from "./components/ThemeChanger";
import { Button } from "./components/ui/button";

function App(): JSX.Element {
  const quit = () => {
    window.api.quit();
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-center bg-background">
      <section className="container mx-auto flex flex-col items-center justify-center gap-4">
        <ThemeChanger />
        <RecordForm />
        <Button variant="destructive" size="lg" onClick={quit}>
          Exit
        </Button>
      </section>
    </main>
  );
}

export default App;
