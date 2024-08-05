import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { records as fakeRecords } from "~/lib/fakeData";
import useDatabase from "../hooks/useDatabase";
import Loader from "./Loader";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
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
    toast.success("Seeded database with fake data");
  };

  const handleDelete = async () => {
    records.forEach((record) => database.deleteRecord(record.uuid));
    toast.success("Deleted all records");
  };

  const handleStripedTable = () => {
    setStripedTable((prev) => !prev);
    toast.info(`Striped table rows ${!stripedTable ? "enabled" : "disabled"}`);
  };

  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage and set preferences.</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between gap-4">
            <Label>Striped table rows</Label>
            <Switch checked={stripedTable} onClick={handleStripedTable} />
          </div>
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
  );
};

export default Settings;
