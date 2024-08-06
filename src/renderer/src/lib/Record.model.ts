import { RxCollection, RxDatabase, RxDocument } from "rxdb";
import { FormSchemaType } from "../components/RecordForm";

export type RecordUUID = string;

export type RecordDocType = FormSchemaType & {
  uuid: RecordUUID;
  createdAt: string;
  updatedAt: string;
};

export type RecordDocument = RxDocument<RecordDocType>;

// and then merge all our types
export type RecordCollection = RxCollection<RecordDocType>;

export type MyDatabaseCollections = {
  records: RecordCollection;
};

export type MyDatabase = RxDatabase<MyDatabaseCollections>;
