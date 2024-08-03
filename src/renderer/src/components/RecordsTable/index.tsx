import { records } from "~/lib/fakeData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const RecordsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Records</CardTitle>
        <CardDescription>List of all records</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={records} />
      </CardContent>
    </Card>
  );
};

export default RecordsTable;
