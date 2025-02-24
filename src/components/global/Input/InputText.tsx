import { Input } from "@/components/ui/input";

interface InputTextProps {
  inputValue: string;
  inputName: string;
  labelName: string;
  handleInputTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputText = ({
  inputValue,
  inputName,
  labelName,
  handleInputTextChange,
  required,
}: InputTextProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor={inputName}>{labelName}</label>
      <Input
        name={inputName}
        type="text"
        placeholder={labelName}
        value={inputValue}
        onChange={handleInputTextChange}
        required={required}
      />
    </div>
  );
};

export default InputText;
