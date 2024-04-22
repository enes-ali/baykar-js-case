import OptionInput from "./OptionInput";

interface QuestionProps {
  question: string;
  options: string[];
  disabled?: boolean;
  usersAnswer?: number;
}

export default function Question({ question, options, disabled, usersAnswer }: QuestionProps) {
  return (
    <section className="pt-4 pb-6 h-full">
      <p className="mb-3">{question}</p>

      {options.map((option, index) => (
        <OptionInput
          id={option}
          name={"options"}
          key={index}
          index={index}
          label={option}
          disabled={disabled}
          checked={usersAnswer === index}
        />
      ))}
    </section>
  );
}
