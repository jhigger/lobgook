import { CellContext, ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import { RecordDocType } from "~/renderer/lib/Record.model";
import { cn, formatISODateString } from "~/renderer/lib/utils";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

const BooleanCell = ({ getValue }: CellContext<RecordDocType, unknown>) => {
  const value = getValue() as boolean;
  return (
    <div className="text-white">
      {value ? (
        <CircleCheck className="rounded-full bg-green-500" />
      ) : (
        <CircleX className="rounded-full bg-red-500" />
      )}
    </div>
  );
};

export const columns: ColumnDef<RecordDocType>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return formatISODateString(date);
    },
    filterFn: (row, columnId, value) => {
      const date = row.getValue(columnId) as RecordDocType["createdAt"];
      const [start, end] = value; // value => two date input values
      //If one filter defined and date is null filter it
      if ((start || end) && !date) return false;
      if (start && !end) {
        return new Date(date).getTime() >= start.getTime();
      } else if (!start && end) {
        return new Date(date).getTime() <= end.getTime();
      } else if (start && end) {
        return (
          new Date(date).getTime() >= start.getTime() &&
          new Date(date).getTime() <= end.getTime()
        );
      } else return true;
    },
  },
  // {
  //   accessorFn: (row) => `${row.firstName} ${row.middleName}  ${row.lastName}`,
  //   id: "fullName",
  //   header: "Full Name",
  //   cell: (info) => info.getValue(),
  //   filterFn: "fuzzy", //using our custom fuzzy filter function
  //   // filterFn: fuzzyFilter, //or just define with the function
  //   sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
  // },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "middleName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Middle Name" />
    ),
  },
  {
    accessorKey: "applicationType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Type" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="capitalize">{value}</span>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "applicationNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Number" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <Badge>{value}</Badge>;
    },
  },
  {
    accessorKey: "contactNumber",
    header: "Contact Number",
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ getValue }) => {
      const value = getValue() as RecordDocType["gender"];

      return (
        <Badge
          variant="secondary"
          className={cn(
            "bg-opacity-50 capitalize",
            value === "male" ? "bg-blue-500" : "bg-pink-500",
          )}
        >
          {value}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "sk",
    header: "SK",
    cell: ({ getValue }) => {
      const value = getValue() as RecordDocType["sk"];
      if (value !== "no") return value;
      return <CircleMinus className="rounded-full bg-secondary" />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "indigenousPeople",
    header: "Indigenous",
    cell: BooleanCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "seniorCitizen",
    header: "Senior",
    cell: BooleanCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "personWithDisability",
    header: "PWD",
    cell: BooleanCell,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
