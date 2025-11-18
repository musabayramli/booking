import type { BookingState, DailySelection } from "../types";

export const priceCalculator = {
  calculateDayTotal(daySelection: DailySelection): number {
    let total = 0;

    if (daySelection.hotel) {
      total += daySelection.hotel.price;
    }

    if (daySelection.lunch) {
      total += daySelection.lunch.price;
    }

    if (daySelection.dinner) {
      total += daySelection.dinner.price;
    }

    return total;
  },

  calculateTotal(state: BookingState): number {
    return state.dailySelections.reduce((total, daySelection) => {
      return total + this.calculateDayTotal(daySelection);
    }, 0);
  },

  getBreakdown(state: BookingState): { day: number; total: number }[] {
    return state.dailySelections.map((daySelection) => ({
      day: daySelection.day,
      total: this.calculateDayTotal(daySelection),
    }));
  },
};
