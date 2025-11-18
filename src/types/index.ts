export interface Country {
  id: number;
  name: string;
}

export interface Hotel {
  id: number;
  name: string;
  price: number;
}

export interface BoardType {
  code: "FB" | "HB" | "NB";
  name: string;
}

export interface Meal {
  id: number;
  name: string;
  price: number;
}

export interface MealOptions {
  dinner: Meal[];
  lunch: Meal[];
}

export interface DailySelection {
  day: number;
  date: string;
  hotel: Hotel | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

export interface BookingState {
  citizenship: Country | null;
  startDate: string;
  numberOfDays: number;
  destination: Country | null;
  boardType: BoardType | null;
  dailySelections: DailySelection[];
  isSubmitted: boolean;
}
