import { records } from "~/lib/fakeData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const RecordsTable = () => {
  return <DataTable columns={columns} data={records} />;
};

export default RecordsTable;
