import Header from "./components/Header";
import RecordForm from "./components/RecordForm";
import SideBar from "./components/SideBar";

function App(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col bg-muted/50 pl-[56px]">
      <SideBar />
      <Header />
      <div className="flex h-screen flex-col overflow-y-auto p-8">
        <main className="container mx-auto flex h-max flex-col items-center justify-center gap-4 rounded-lg bg-background p-8 shadow">
          <RecordForm />
        </main>
      </div>
    </div>
  );
}

export default App;
