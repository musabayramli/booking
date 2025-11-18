import { useBookingContext } from "../context/BookingContext";

export function useBooking() {
  const context = useBookingContext();

  const validateForm = () => {
    const {
      citizenship,
      startDate,
      numberOfDays,
      destination,
      boardType,
      dailySelections,
    } = context.state;

    if (
      !citizenship ||
      !startDate ||
      numberOfDays <= 0 ||
      !destination ||
      !boardType
    ) {
      return false;
    }

    return dailySelections.every((day) => day.hotel !== null);
  };

  const submitBooking = () => {
    if (validateForm()) {
      context.dispatch({ type: "SUBMIT_BOOKING" });
      return true;
    }
    return false;
  };

  return {
    ...context,
    validateForm,
    submitBooking,
  };
}
