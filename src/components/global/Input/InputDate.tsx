import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface InputDateProps {
  date: string;
  dateName: string;
  labelName: string;
  handleDateChange: (date: Date | undefined, dateName: string) => void;
  required?: boolean;
}

const InputDate = ({
  date,
  dateName,
  labelName,
  handleDateChange,
  required,
}: InputDateProps) => {
  const convertDate = new Date(date);

  return (
    <div className="space-y-3">
      <label className="block" htmlFor={dateName}>
        {labelName}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={convertDate}
            onSelect={(date) => handleDateChange(date, dateName)}
            initialFocus
            required={required}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InputDate;
