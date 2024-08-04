import { CellContext, ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import { RecordType } from "~/renderer/lib/types";
import { cn, formatISODateString } from "~/renderer/lib/utils";
import { Badge } from "../ui/badge";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

const BooleanCell = ({ getValue }: CellContext<RecordType, unknown>) => {
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

export const columns: ColumnDef<RecordType>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return formatISODateString(date);
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
    header: "Application Type",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <span className="capitalize">{value}</span>;
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
      const value = getValue() as RecordType["gender"];

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
      const value = getValue() as RecordType["sk"];
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
