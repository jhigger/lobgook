import { FormSchemaType } from "../components/RecordForm";

export type RecordType = FormSchemaType & {
  id: number;
  createdAt: string;
};
