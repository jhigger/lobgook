import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import RecordForm from "./components/RecordForm";
import RecordsTable from "./components/RecordsTable";
import SideBar from "./components/SideBar";

function App(): JSX.Element {
  return (
    <div className="flex h-screen w-full flex-col bg-muted/50 pl-[56px]">
      <SideBar />
      <Header />
      <main className="flex h-screen flex-col gap-8 overflow-y-auto p-8">
        <MainLayout>
          <RecordForm />
        </MainLayout>
        <MainLayout>
          <RecordsTable />
        </MainLayout>
      </main>
    </div>
  );
}

export default App;
