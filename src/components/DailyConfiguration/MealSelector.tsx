import React from "react";
import type { Meal } from "../../types";

interface MealSelectorProps {
  meals: Meal[];
  value: Meal | null;
  onChange: (meal: Meal | null) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MealSelector: React.FC<MealSelectorProps> = ({
  meals,
  value,
  onChange,
  disabled = false,
  placeholder = "Select meal",
}) => {
  return (
    <select
      value={value?.id || ""}
      onChange={(e) => {
        const meal = meals.find((m) => m.id === Number(e.target.value)) || null;
        onChange(meal);
      }}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        disabled
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
          : "border-gray-300"
      }`}
    >
      <option value="">{placeholder}</option>
      {meals.map((meal) => (
        <option key={meal.id} value={meal.id}>
          {meal.name} (${meal.price})
        </option>
      ))}
    </select>
  );
};

export default MealSelector;
