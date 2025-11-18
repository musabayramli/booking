import React from "react";
import type { DailySelection, BoardType, Hotel, MealOptions } from "../../types";
import { useBooking } from "../../hooks/useBooking";
import { priceCalculator } from "../../utils/priceCalculator";

interface DayRowProps {
  daySelection: DailySelection;
  hotels: Hotel[];
  meals: MealOptions;
  boardType: BoardType | null;
}

const DayRow: React.FC<DayRowProps> = ({
  daySelection,
  hotels,
  meals,
  boardType,
}) => {
  const { dispatch } = useBooking();

  const handleHotelChange = (hotelId: number) => {
    const hotel = hotels.find((h) => h.id === hotelId) || null;
    dispatch({
      type: "UPDATE_DAILY_SELECTION",
      payload: { day: daySelection.day, updates: { hotel } },
    });
  };

  const handleLunchChange = (mealId: number) => {
    const lunch = meals.lunch.find((m) => m.id === mealId) || null;
    const updates: Partial<DailySelection> = { lunch };

    if (boardType?.code === "HB" && lunch) {
      updates.dinner = null;
    }

    dispatch({
      type: "UPDATE_DAILY_SELECTION",
      payload: { day: daySelection.day, updates },
    });
  };

  const handleDinnerChange = (mealId: number) => {
    const dinner = meals.dinner.find((m) => m.id === mealId) || null;
    const updates: Partial<DailySelection> = { dinner };

    if (boardType?.code === "HB" && dinner) {
      updates.lunch = null;
    }

    dispatch({
      type: "UPDATE_DAILY_SELECTION",
      payload: { day: daySelection.day, updates },
    });
  };

  const isLunchDisabled = boardType?.code === "NB";
  const isDinnerDisabled = boardType?.code === "NB";

  const shouldDisableLunch =
    boardType?.code === "HB" && daySelection.dinner !== null;
  const shouldDisableDinner =
    boardType?.code === "HB" && daySelection.lunch !== null;

  const dayTotal = priceCalculator.calculateDayTotal(daySelection);

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          Day {daySelection.day}
        </div>
        <div className="text-sm text-gray-500">{daySelection.date}</div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={daySelection.hotel?.id || ""}
          onChange={(e) => handleHotelChange(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} (${hotel.price})
            </option>
          ))}
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={daySelection.lunch?.id || ""}
          onChange={(e) => handleLunchChange(Number(e.target.value))}
          disabled={isLunchDisabled || shouldDisableLunch}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isLunchDisabled || shouldDisableLunch
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300"
          }`}
        >
          <option value="">Select lunch</option>
          {meals.lunch.map((meal) => (
            <option key={meal.id} value={meal.id}>
              {meal.name} (${meal.price})
            </option>
          ))}
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <select
          value={daySelection.dinner?.id || ""}
          onChange={(e) => handleDinnerChange(Number(e.target.value))}
          disabled={isDinnerDisabled || shouldDisableDinner}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            isDinnerDisabled || shouldDisableDinner
              ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-gray-300"
          }`}
        >
          <option value="">Select dinner</option>
          {meals.dinner.map((meal) => (
            <option key={meal.id} value={meal.id}>
              {meal.name} (${meal.price})
            </option>
          ))}
        </select>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-gray-900">${dayTotal}</div>
      </td>
    </tr>
  );
};

export default DayRow;
