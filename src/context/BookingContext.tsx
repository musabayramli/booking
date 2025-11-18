import { createContext, useContext, useReducer, type ReactNode } from "react";
import type {
  BookingState,
  DailySelection,
  Country,
  BoardType,
} from "../types";
import { hotels, boardTypes, meals, countries } from "../data/mockData";
import { dateUtils } from "../utils/dateUtils";

interface BookingContextType {
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
  hotels: typeof hotels;
  boardTypes: typeof boardTypes;
  meals: typeof meals;
  countries: typeof countries;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type BookingAction =
  | { type: "SET_CITIZENSHIP"; payload: Country | null }
  | { type: "SET_START_DATE"; payload: string }
  | { type: "SET_NUMBER_OF_DAYS"; payload: number }
  | { type: "SET_DESTINATION"; payload: Country | null }
  | { type: "SET_BOARD_TYPE"; payload: BoardType | null }
  | {
      type: "UPDATE_DAILY_SELECTION";
      payload: { day: number; updates: Partial<DailySelection> };
    }
  | { type: "SUBMIT_BOOKING" }
  | { type: "RESET_BOOKING" };

const initialState: BookingState = {
  citizenship: null,
  startDate: "",
  numberOfDays: 0,
  destination: null,
  boardType: null,
  dailySelections: [],
  isSubmitted: false,
};

function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case "SET_CITIZENSHIP":
      return { ...state, citizenship: action.payload };

    case "SET_START_DATE":
      try {
        const newSelections =
          state.numberOfDays > 0
            ? dateUtils.generateDailySelections(
                action.payload,
                state.numberOfDays
              )
            : [];
        return {
          ...state,
          startDate: action.payload,
          dailySelections: newSelections,
        };
      } catch (error) {
        console.error("Error setting start date:", error);
        return state;
      }

    case "SET_NUMBER_OF_DAYS":
      try {
        const dailySelections = state.startDate
          ? dateUtils.generateDailySelections(state.startDate, action.payload)
          : [];
        return { ...state, numberOfDays: action.payload, dailySelections };
      } catch (error) {
        console.error("Error setting number of days:", error);
        return state;
      }

    case "SET_DESTINATION":
      return {
        ...state,
        destination: action.payload,
        dailySelections: state.dailySelections.map((selection) => ({
          ...selection,
          hotel: null,
          lunch: null,
          dinner: null,
        })),
      };

    case "SET_BOARD_TYPE":
      return {
        ...state,
        boardType: action.payload,
        dailySelections: state.dailySelections.map((selection) => ({
          ...selection,
          lunch: null,
          dinner: null,
        })),
      };

    case "UPDATE_DAILY_SELECTION":
      return {
        ...state,
        dailySelections: state.dailySelections.map((selection) =>
          selection.day === action.payload.day
            ? { ...selection, ...action.payload.updates }
            : selection
        ),
      };

    case "SUBMIT_BOOKING":
      return { ...state, isSubmitted: true };

    case "RESET_BOOKING":
      return initialState;

    default:
      return state;
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider
      value={{ state, dispatch, hotels, boardTypes, meals, countries }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
}
