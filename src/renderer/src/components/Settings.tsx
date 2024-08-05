import { records } from "~/lib/fakeData";
import useDatabase from "../hooks/useDatabase";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Settings = () => {
  const { database } = useDatabase();

  const handleSeed = async () => {
    records.forEach((record) => database.addRecord(record));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSeed}>Seed Database</Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
