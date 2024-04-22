import classNames from "classnames";
import type { PropsWithChildren } from "react";

interface OptionLetterProps {
  answerResult?: "correct" | "incorrect" | "actual";
}

export default function OptionLetter({
  children,
  answerResult,
}: PropsWithChildren<OptionLetterProps>) {
  return (
    <span
      className={classNames(
        "rounded-full h-6 w-6 border-2 border-black grid text-sm",
        "place-content-center peer-checked:bg-black peer-checked:text-white",
        { "bg-[#34d30c] text-white": answerResult === "correct" },
        { "bg-[#d30c0c] text-white": answerResult === "incorrect" },
        { "border-[#34d30c] text-[#34d30c]": answerResult === "actual" },
      )}
    >
      {children}
    </span>
  );
}
