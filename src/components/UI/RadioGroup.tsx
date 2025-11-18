import React from "react";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="space-y-3">
        {options.map((option) => (
          <div
            key={option.value}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
              value === option.value
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => onChange(option.value)}
          >
            <div className="flex items-start">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-0.5"
              />
              <div className="ml-3 flex-1">
                <label className="block text-sm font-medium text-gray-700 cursor-pointer">
                  {option.label}
                </label>
                {option.description && (
                  <p className="mt-1 text-xs text-gray-500">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
