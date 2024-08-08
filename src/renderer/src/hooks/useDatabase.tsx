import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { RecordDocType } from "~/lib/Record.model";
import { db } from "../lib/db";

const useDatabase = () => {
  const database = db();
  const [records, setRecords] = useState<RecordDocType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Subscription;

    const connect = () =>
      database
        .setup()
        .then(() => {
          subscription = database
            .observableRecords()
            .subscribe((allRecords) => {
              setRecords(
                allRecords.map((record, i) => {
                  if (allRecords.length - 1 === i) {
                    setLoading(false);
                  }
                  return record;
                }),
              );
            });
        })
        .catch(() => console.log("Connecting to database"))
        .finally(() => setLoading(false));

    const scheduleReconnect = () =>
      setTimeout(async () => {
        if (database.hasSetup()) {
          await connect();
        } else {
          await database
            .setup()
            .then(async () => {
              console.log("Connected");
            })
            .finally(() => setLoading(false));
          scheduleReconnect();
        }
      }, 1000);

    scheduleReconnect();

    return () => subscription?.unsubscribe();
  }, []);

  return {
    database,
    records,
    loading,
  };
};

export default useDatabase;
