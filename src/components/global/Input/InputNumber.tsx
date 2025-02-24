import { Input } from "@/components/ui/input";

interface InputTextProps {
  inputValue: number;
  inputName: string;
  labelName: string;
  handleInputTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

const InputText = ({
  inputValue,
  inputName,
  labelName,
  handleInputTextChange,
  required,
  disabled = false
}: InputTextProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor={inputName}>{labelName}</label>
      <Input
        name={inputName}
        type="number"
        placeholder={labelName}
        value={inputValue}
        onChange={handleInputTextChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default InputText;
