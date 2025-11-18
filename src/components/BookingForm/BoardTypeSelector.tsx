import React from "react";
import type { BoardType } from "../../types";
import RadioGroup from "../UI/RadioGroup";

interface BoardTypeSelectorProps {
  boardTypes: BoardType[];
  selectedBoardType: BoardType | null;
  onBoardTypeChange: (boardType: BoardType) => void;
}

const BoardTypeSelector: React.FC<BoardTypeSelectorProps> = ({
  boardTypes,
  selectedBoardType,
  onBoardTypeChange,
}) => {
  const radioOptions = boardTypes.map((boardType) => ({
    value: boardType.code,
    label: boardType.name,
    description:
      boardType.code === "FB"
        ? "Breakfast, Lunch & Dinner included"
        : boardType.code === "HB"
        ? "Breakfast & one meal included"
        : "No meals included",
  }));

  return (
    <RadioGroup
      label="Board Type *"
      name="boardType"
      options={radioOptions}
      value={selectedBoardType?.code || ""}
      onChange={(value) => {
        const boardType = boardTypes.find((bt) => bt.code === value);
        if (boardType) {
          onBoardTypeChange(boardType);
        }
      }}
    />
  );
};

export default BoardTypeSelector;
