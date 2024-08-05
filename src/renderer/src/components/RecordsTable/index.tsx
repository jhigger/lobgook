import useDatabase from "~/renderer/hooks/useDatabase";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const RecordsTable = () => {
  const { records, loading } = useDatabase();

  return <DataTable columns={columns} data={records} loading={loading} />;
};

export default RecordsTable;
