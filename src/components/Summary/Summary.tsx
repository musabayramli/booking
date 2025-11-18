import React from "react";
import { useBooking } from "../../hooks/useBooking";
import ConfigurationSummary from "./ConfigurationSummary";
import DailySelections from "./DailySelections";
import PriceCalculation from "./PriceCalculation";
import Button from "../UI/Button";

const Summary: React.FC = () => {
  const { dispatch } = useBooking();

  const handleReset = () => {
    dispatch({ type: "RESET_BOOKING" });
  };

  return (
    <div className="space-y-6" id="booking-summary">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Booking Summary
          </h2>
          <Button variant="secondary" onClick={handleReset}>
            New Booking
          </Button>
        </div>

        <div className="space-y-6">
          <ConfigurationSummary />
          <DailySelections />
          <PriceCalculation />
        </div>
      </div>
    </div>
  );
};

export default Summary;
