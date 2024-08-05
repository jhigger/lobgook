import { createRxDatabase, RxJsonSchema } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { BehaviorSubject } from "rxjs";
import { MyDatabase, RecordDocType, RecordUUID } from "~/lib/Record.model";
// Good article that talk about ts typing and rxdb: https://rxdb.info/tutorials/typescript.html

let database: MyDatabase;

export type DBType = {
  setup: () => Promise<void>;
  addRecord: (record: RecordDocType) => Promise<void>;
  updateRecord: (record: RecordDocType) => Promise<void>;
  deleteRecord: (uuid: RecordUUID) => Promise<void>;
  observableRecords: () => BehaviorSubject<RecordDocType[]>;
  hasSetup: () => boolean;
  checkApplicationNumberExists: (applicationNumber: string) => Promise<boolean>;
};

const recordsSchema: RxJsonSchema<RecordDocType> = {
  version: 0,
  primaryKey: "uuid",
  type: "object",
  properties: {
    uuid: {
      type: "string",
      maxLength: 100,
    },
    lastName: {
      type: "string",
      maxLength: 100,
    },
    firstName: {
      type: "string",
      maxLength: 100,
    },
    middleName: {
      type: "string",
      maxLength: 100,
    },
    applicationType: {
      type: "string",
      maxLength: 100,
    },
    applicationNumber: {
      type: "string",
      maxLength: 100,
    },
    contactNumber: {
      type: "string",
      maxLength: 100,
    },
    gender: {
      type: "string",
      maxLength: 100,
    },
    sk: {
      type: "string",
      maxLength: 100,
    },
    indigenousPeople: {
      type: "boolean",
    },
    seniorCitizen: {
      type: "boolean",
    },
    personWithDisability: {
      type: "boolean",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
  },
  required: [
    "uuid",
    "lastName",
    "firstName",
    "middleName",
    "applicationType",
    "applicationNumber",
    "contactNumber",
    "gender",
    "sk",
    "indigenousPeople",
    "seniorCitizen",
    "personWithDisability",
  ],
};

export const db = (): DBType => {
  return {
    setup: async () => {
      if (!database) {
        console.log("Creating database connection");
        database = await createRxDatabase({
          name: "records",
          storage: getRxStorageDexie(),
          multiInstance: false,
          ignoreDuplicate: true,
        });

        await database.addCollections({
          records: {
            schema: recordsSchema,
          },
        });
      }
    },
    addRecord: async (record: RecordDocType) => {
      await database.records.insert(record);
    },
    updateRecord: async (record: RecordDocType) => {
      const storedRecord = await database.records
        .findOne({ selector: { uuid: record.uuid } })
        .exec();
      storedRecord?.modify((recordData: RecordDocType) => {
        recordData = record;
        return recordData;
      });
    },
    deleteRecord: async (uuid: RecordUUID) => {
      const storedRecord = await database.records
        .findOne({ selector: { uuid: uuid } })
        .exec();
      storedRecord?.remove();
    },
    observableRecords: () => {
      const recordsSubject = new BehaviorSubject<RecordDocType[]>([]);
      database.records.find().$.subscribe((records) => {
        recordsSubject.next(records);
      });
      return recordsSubject;
    },
    hasSetup: () => database !== undefined,
    checkApplicationNumberExists: async (applicationNumber: string) => {
      const exists = await database.records
        .findOne({ selector: { applicationNumber } })
        .exec()
        .then((record) => (record ? true : false));
      return exists;
    },
  };
};
