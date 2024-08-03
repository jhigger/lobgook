import { CellContext, ColumnDef } from "@tanstack/react-table";
import {
  CircleCheck,
  CircleMinus,
  CircleX,
  MoreHorizontal,
} from "lucide-react";
import { RecordType } from "~/renderer/lib/types";
import { cn, formatISODateString } from "~/renderer/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    header: "Date",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return formatISODateString(date);
    },
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
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
    header: "Application Number",
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
    header: "Gender",
    cell: ({ getValue }) => {
      const value = getValue() as string;
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
  },
  {
    accessorKey: "sk",
    header: "SK",
    cell: ({ getValue }) => {
      const value = getValue() as RecordType["sk"];
      if (value !== "no") return value;
      return <CircleMinus className="rounded-full bg-secondary" />;
    },
  },
  {
    accessorKey: "indigenousPeople",
    header: "Indigenous",
    cell: BooleanCell,
  },
  {
    accessorKey: "seniorCitizen",
    header: "Senior",
    cell: BooleanCell,
  },
  {
    accessorKey: "personWithDisability",
    header: "PWD",
    cell: BooleanCell,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(record.applicationNumber))
              }
            >
              Copy application number
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
