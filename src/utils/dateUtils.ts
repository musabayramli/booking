import { format, addDays } from "date-fns";
import type { DailySelection } from "../types";

export const dateUtils = {
  generateDailySelections(
    startDate: string,
    numberOfDays: number
  ): DailySelection[] {
    if (!startDate || numberOfDays <= 0) {
      return [];
    }

    try {
      const selections: DailySelection[] = [];
      const start = new Date(startDate);

      for (let i = 0; i < numberOfDays; i++) {
        const currentDate = addDays(start, i);
        selections.push({
          day: i + 1,
          date: format(currentDate, "MMM dd, yyyy"),
          hotel: null,
          lunch: null,
          dinner: null,
        });
      }

      return selections;
    } catch (error) {
      console.error("Error generating daily selections:", error);
      return [];
    }
  },

  formatDate(date: string): string {
    try {
      return format(new Date(date), "MMM dd, yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return date;
    }
  },
};
