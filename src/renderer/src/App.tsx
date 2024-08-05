import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import SideBar from "./components/SideBar";
import useDatabase from "./hooks/useDatabase";

function App(): JSX.Element {
  const { loading } = useDatabase();

  return (
    <div className="flex h-screen w-full flex-col bg-muted/50 pl-[56px]">
      <SideBar />
      <Header />
      <main className="flex h-screen flex-col gap-8 overflow-y-auto p-8">
        {loading ? <Loader /> : <Outlet />}
      </main>
    </div>
  );
}

export default App;
