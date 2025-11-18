import React from "react";

interface DateRangePickerProps {
  startDate: string;
  numberOfDays: number;
  onStartDateChange: (date: string) => void;
  onNumberOfDaysChange: (days: number) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  numberOfDays,
  onStartDateChange,
  onNumberOfDaysChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start Date *
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Days *
        </label>
        <select
          value={numberOfDays}
          onChange={(e) => onNumberOfDaysChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value={0}>Select days</option>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((days) => (
            <option key={days} value={days}>
              {days} {days === 1 ? "day" : "days"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangePicker;
