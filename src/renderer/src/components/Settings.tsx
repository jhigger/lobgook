import { FileDown, FileUp } from "lucide-react";
import { ChangeEvent } from "react";
import { RxDumpDatabase } from "rxdb";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { records as fakeRecords } from "~/lib/fakeData";
import useDatabase from "../hooks/useDatabase";
import { MyDatabaseCollections } from "../lib/Record.model";
import { cn } from "../lib/utils";
import Loader from "./Loader";
import { Button, buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";

const Settings = () => {
  const { database, records, loading } = useDatabase();
  const [stripedTable, setStripedTable] = useLocalStorage(
    "striped-table",
    false,
  );
  const [devMode, setDevMode] = useLocalStorage("dev-mode", false);

  const handleSeed = async () => {
    fakeRecords.forEach((record) => database.addRecord(record));
    toast.success("Seeded database with fake data", { richColors: true });
  };

  const handleDelete = async () => {
    records.forEach((record) => database.deleteRecord(record.uuid));
    toast.success("Deleted all records", { richColors: true });
  };

  const handleStripedTable = () => {
    setStripedTable((prev) => !prev);
    toast.info(`Striped table rows ${!stripedTable ? "enabled" : "disabled"}`, {
      richColors: true,
    });
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const content = e.target?.result as string;
          const parsedData = JSON.parse(
            content,
          ) as RxDumpDatabase<MyDatabaseCollections>;
          database.importJSON(parsedData);
          toast.success("Successfully imported records", { richColors: true });
        } catch (err) {
          toast.error("Invalid JSON format", { richColors: true });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = async () => {
    const myData = await database.exportJSON();
    const fileName = "lobgook-" + Date.now();
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    link.title = "Export";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Manage and set preferences.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-4">
              <Label>Striped table rows</Label>
              <Switch checked={stripedTable} onClick={handleStripedTable} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data</CardTitle>
          <CardDescription>Import and export data.</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Input
              type="file"
              id="import"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
            <Label
              htmlFor="import"
              className={cn(buttonVariants(), "flex h-8 items-center")}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Import JSON file
            </Label>
            <Button size="sm" className="h-8" onClick={handleExport}>
              <FileUp className="mr-2 h-4 w-4" />
              Export data to JSON
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Developer Settings</CardTitle>
          <CardDescription>Only for developers. Do not use!</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            <div className="flex justify-between gap-4">
              <Label>Enable dev mode</Label>
              <Switch
                checked={devMode}
                onClick={() => setDevMode((prev) => !prev)}
              />
            </div>
            {devMode && (
              <>
                <Separator />
                <Label className="text-center">✨ Dev Mode ✨</Label>
                <div className="flex flex-col gap-4 rounded-md border p-4">
                  <div className="flex flex-col gap-2">
                    <Label>Seed the database with fake data</Label>
                    <Button
                      onClick={handleSeed}
                      disabled={loading || records.length > 0}
                    >
                      {loading ? (
                        <Loader />
                      ) : records.length > 0 ? (
                        "Already seeded"
                      ) : (
                        "Seed"
                      )}
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Reset the database</Label>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={loading || records.length <= 0}
                    >
                      {loading ? (
                        <Loader />
                      ) : records.length <= 0 ? (
                        "Already empty"
                      ) : (
                        "Reset"
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
