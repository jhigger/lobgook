import { Table } from "@tanstack/react-table";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { RecordDocType } from "~/renderer/lib/Record.model";
import { cn } from "~/renderer/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DatePickerProps<TData> = React.HTMLAttributes<HTMLDivElement> & {
  table: Table<TData>;
};

const DatePicker = <TData extends RecordDocType>({
  className,
  table,
}: DatePickerProps<TData>) => {
  const createdAtColumn = table.getColumn("createdAt");
  const baseDate = new Date();
  baseDate.setMonth(baseDate.getMonth() - 1);

  const [date, setDate] = React.useState<DateRange | undefined>();

  useEffect(() => {
    if (date) {
      createdAtColumn?.setFilterValue([date?.from, date?.to]);
    }
  }, [date]);

  useEffect(() => {
    if (!createdAtColumn?.getIsFiltered()) {
      setDate(undefined);
    }
  }, [createdAtColumn?.getIsFiltered()]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-8 min-w-60 justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={baseDate}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
