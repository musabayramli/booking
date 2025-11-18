import React from "react";
import { useBooking } from "../../hooks/useBooking";
import { priceCalculator } from "../../utils/priceCalculator";

const PriceCalculation: React.FC = () => {
  const { state } = useBooking();
  const total = priceCalculator.calculateTotal(state);
  const breakdown = priceCalculator.getBreakdown(state);

  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Price Calculation
      </h3>

      <div className="space-y-3">
        {breakdown.map((day) => (
          <div key={day.day} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Day {day.day}</span>
            <span className="text-sm font-medium text-gray-900">
              ${day.total}
            </span>
          </div>
        ))}

        <div className="border-t border-blue-200 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              Grand Total
            </span>
            <span className="text-2xl font-bold text-blue-600">${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculation;
