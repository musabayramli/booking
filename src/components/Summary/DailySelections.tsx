import React from "react";
import { useBooking } from "../../hooks/useBooking";
import { priceCalculator } from "../../utils/priceCalculator";

const DailySelections: React.FC = () => {
  const { state } = useBooking();

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Daily Selections
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Day
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hotel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lunch
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dinner
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {state.dailySelections.map((daySelection) => (
              <tr key={daySelection.day}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    Day {daySelection.day}
                  </div>
                  <div className="text-sm text-gray-500">
                    {daySelection.date}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {daySelection.hotel?.name || "Not selected"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {daySelection.hotel ? `$${daySelection.hotel.price}` : ""}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {daySelection.lunch?.name || "-"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {daySelection.lunch ? `$${daySelection.lunch.price}` : ""}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {daySelection.dinner?.name || "-"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {daySelection.dinner ? `$${daySelection.dinner.price}` : ""}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    ${priceCalculator.calculateDayTotal(daySelection)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailySelections;
