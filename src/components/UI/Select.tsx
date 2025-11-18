interface SelectProps<T> {
  label: string;
  value: T | null;
  options: T[];
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  placeholder?: string;
}

function Select<T>({
  label,
  value,
  options,
  onChange,
  getOptionLabel,
  getOptionValue,
  disabled = false,
  loading = false,
  error,
  className = "",
  placeholder,
}: SelectProps<T>) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value ? getOptionValue(value) : ""}
          onChange={(e) => {
            const selectedOption = options.find(
              (opt) => getOptionValue(opt).toString() === e.target.value
            );
            if (selectedOption) {
              onChange(selectedOption);
            }
          }}
          disabled={disabled || loading}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            disabled || loading
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300"
          }`}
        >
          <option value="">
            {loading
              ? "Loading..."
              : placeholder || `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={getOptionValue(option)} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </option>
          ))}
        </select>
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default Select;
