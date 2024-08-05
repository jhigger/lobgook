import { useEffect, useState } from "react";
import { RecordDocType } from "~/lib/Record.model";
import { db } from "../lib/db";

const useDatabase = () => {
  const database = db();
  const [records, setRecords] = useState<RecordDocType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const connect = () =>
      database
        .setup()
        .then(async () => {
          database.observableRecords().subscribe((allRecords) => {
            setRecords(allRecords.map((t: any) => ({ ...t._data })));
            setLoading(false);
          });
        })
        .catch(() => console.log("Connecting to database"));
    const scheduleReconnect = () =>
      setTimeout(() => {
        if (database.hasSetup()) {
          connect();
        } else {
          database.setup().then(async () => {
            console.log("Connected");
          });
          scheduleReconnect();
        }
      }, 1000);
    scheduleReconnect();
  }, []);

  return {
    database,
    records,
    loading,
  };
};

export default useDatabase;
