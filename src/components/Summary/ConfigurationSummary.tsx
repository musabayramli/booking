// src/components/Summary/ConfigurationSummary.tsx
import React from "react";
import { useBooking } from "../../hooks/useBooking";

const ConfigurationSummary: React.FC = () => {
  const { state } = useBooking();

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Configuration Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Citizenship</div>
          <div className="text-lg font-semibold text-gray-900">
            {state.citizenship?.name || "Not selected"}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Destination</div>
          <div className="text-lg font-semibold text-gray-900">
            {state.destination?.name || "Not selected"}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Dates</div>
          <div className="text-lg font-semibold text-gray-900">
            {state.startDate} ({state.numberOfDays} days)
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm font-medium text-gray-500">Board Type</div>
          <div className="text-lg font-semibold text-gray-900">
            {state.boardType?.name || "Not selected"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationSummary;
