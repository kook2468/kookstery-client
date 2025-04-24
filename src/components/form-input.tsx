interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: string | null;
  disabled?: boolean;
}

export default function FormInput({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  isRequired = false,
  error = null,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="my-3 tracking-tight">
      <label>
        {label}
        {isRequired && <abbr />}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        className={`w-full border border-input p-3 my-2 ${
          error && "border border-danger"
        }`}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
        disabled={disabled}
      />
      {error && <div className="text-danger text-xs pt-1">{error}</div>}
    </div>
  );
}
