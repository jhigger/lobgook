import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { RecordType } from "~/renderer/lib/types";
import DebouncedInput from "../DebouncedInput";
import { Label } from "../ui/label";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./DataTableViewOptions";

const genders: { label: string; value: RecordType["gender"] }[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const sk: { label: string; value: RecordType["sk"] }[] = [
  { label: "15-17", value: "15 to 17" },
  { label: "18-30", value: "18 to 30" },
  { label: "no", value: "no" },
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

interface ToolBarProps<TData> {
  table: Table<TData>;
}

const ToolBar = <TData extends RecordType>({ table }: ToolBarProps<TData>) => {
  return (
    <div className="flex items-center gap-2 pt-4">
      <div className="relative">
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
      <div className="ml-auto">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};

export default ToolBar;
