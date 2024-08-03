import { records } from "~/lib/fakeData";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const RecordsTable = () => {
  return (
    <div className="-m-8 overflow-y-hidden rounded-lg">
      <DataTable columns={columns} data={records} />
    </div>
  );
};

export default RecordsTable;
