import OptionLetter from "./OptionLetter";


interface OptionInputProps {
  label: string;
  id: string;
  name: string;
  index: number;
  checked: boolean;
  disabled?: boolean;
}

export default function OptionInput({
  label,
  id,
  name,
  index,
  disabled,
  checked
}: OptionInputProps) {
  const indexToLetter = ["A", "B", "C", "D"];

  return (
    <div className={disabled ? "pointer-events-none opacity-50" : ""}>
      <label
        htmlFor={id}
        className="cursor-pointer flex gap-2 py-2 items-center"
      >
        <input
          checked={checked}
          disabled={disabled}
          value={String(index)}
          id={id}
          type="radio"
          name={name}
          className="hidden peer"
        />

        <OptionLetter>{indexToLetter[index]}</OptionLetter>

        <span>{label}</span>
      </label>
    </div>
  );
}
