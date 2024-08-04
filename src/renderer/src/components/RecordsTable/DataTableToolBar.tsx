import { Table } from "@tanstack/react-table";
import { Ban, Search } from "lucide-react";
import { RecordType } from "~/renderer/lib/types";
import DebouncedInput from "../DebouncedInput";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./DataTableViewOptions";
import DatePicker from "./DatePicker";

const applicationType: {
  label: string;
  value: RecordType["applicationType"];
}[] = [
  { label: "Registration", value: "registration" },
  { label: "Reactivation", value: "reactivation" },
  { label: "Correction of Entries", value: "correction of entries" },
  {
    label: "Reactivation with Correction",
    value: "reactivation with correction",
  },
  { label: "Transfer Incoming", value: "transfer incoming" },
  { label: "Transfer Within", value: "transfer within" },
  { label: "Transfer with Reactivation", value: "transfer with reactivation" },
  {
    label: "Transfer with Reactivation and Correction",
    value: "transfer with reactivation and correction",
  },
  { label: "Post to Local", value: "post to Local" },
];

const genders: { label: string; value: RecordType["gender"] }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const sk: { label: string; value: RecordType["sk"] }[] = [
  { label: "15-17", value: "15 to 17" },
  { label: "18-30", value: "18 to 30" },
  { label: "No", value: "no" },
];

const indigenousPeople: {
  label: string;
  value: RecordType["indigenousPeople"];
}[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const seniorCitizen: { label: string; value: RecordType["seniorCitizen"] }[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const personWithDisability: {
  label: string;
  value: RecordType["personWithDisability"];
}[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

type ToolBarProps<TData> = {
  table: Table<TData>;
};

const DataTableToolBar = <TData extends RecordType>({
  table,
}: ToolBarProps<TData>) => {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="flex justify-between gap-2">
        <div className="relative w-full">
          <Label htmlFor="search">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
          </Label>
          <DebouncedInput
            id="search"
            type="search"
            placeholder="Search..."
            value={table.getState().globalFilter}
            onChange={(value) => table.setGlobalFilter(String(value))}
            className="h-8 max-w-sm pl-8"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex w-full flex-wrap items-center gap-2">
        <DatePicker table={table} />
        {table.getColumn("applicationType") && (
          <DataTableFacetedFilter
            column={table.getColumn("applicationType")}
            title="Application Type"
            options={applicationType}
          />
        )}
        {table.getColumn("gender") && (
          <DataTableFacetedFilter
            column={table.getColumn("gender")}
            title="Gender"
            options={genders}
          />
        )}
        {table.getColumn("sk") && (
          <DataTableFacetedFilter
            column={table.getColumn("sk")}
            title="SK"
            options={sk}
          />
        )}
        {table.getColumn("indigenousPeople") && (
          <DataTableFacetedFilter
            column={table.getColumn("indigenousPeople")}
            title="Indigenous People"
            options={indigenousPeople}
          />
        )}
        {table.getColumn("seniorCitizen") && (
          <DataTableFacetedFilter
            column={table.getColumn("seniorCitizen")}
            title="Senior Citizen"
            options={seniorCitizen}
          />
        )}
        {table.getColumn("personWithDisability") && (
          <DataTableFacetedFilter
            column={table.getColumn("personWithDisability")}
            title="PWD"
            options={personWithDisability}
          />
        )}
        {table.getState().columnFilters.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="h-8 border-dashed"
            onClick={() => table.resetColumnFilters()}
          >
            <Ban className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default DataTableToolBar;
