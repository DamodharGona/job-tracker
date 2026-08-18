import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

function DatePicker({ value, onChange }) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            data-empty={!value}
            className="h-auto w-full justify-between pl-10 py-2.5 border-neutral-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-neutral-900 dark:text-zinc-100 hover:bg-neutral-50 dark:hover:bg-zinc-850"
          />
        }
      >
        <span className={!value ? "text-muted-foreground" : ""}>
          {value ? format(value, "dd MMM yyyy") : "Pick a date"}
        </span>

        <ChevronDownIcon className="h-4 w-4" />
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          defaultMonth={value}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DatePicker;
