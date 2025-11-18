import React from "react";
import { useBooking } from "../../hooks/useBooking";
import DayRow from "./DayRow";

const DailyConfiguration: React.FC = () => {
  const { state, hotels, meals } = useBooking();

  if (!state.destination) return null;

  const destinationHotels =
    hotels[state.destination.name as keyof typeof hotels] || [];
  const destinationMeals = meals[state.destination.name as keyof typeof meals];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Daily Configuration
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day & Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lunch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dinner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {state.dailySelections.map((daySelection) => (
              <DayRow
                key={daySelection.day}
                daySelection={daySelection}
                hotels={destinationHotels}
                meals={destinationMeals}
                boardType={state.boardType}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyConfiguration;
