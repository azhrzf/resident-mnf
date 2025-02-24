import { SelectInput } from "@/api/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InputSelectProps {
  inputValue: string;
  inputName: string;
  labelName: string;
  handleInputTextChange: (value: string) => void;
  selectValue: SelectInput[];
  required?: boolean;
}

const InputSelect = ({
  inputValue,
  inputName,
  labelName,
  handleInputTextChange,
  selectValue,
  required,
}: InputSelectProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor="residentStatus">{labelName}</label>
      <Select
        value={inputValue}
        onValueChange={handleInputTextChange}
        name={inputName}
        required={required}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Pilih ${labelName}`} />
        </SelectTrigger>
        <SelectContent>
          {selectValue.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default InputSelect;
