
import { BookingProvider } from "./context/BookingContext";
import BookingForm from "./components/BookingForm/BookingForm";
import DailyConfiguration from "./components/DailyConfiguration/DailyConfiguration";
import Summary from "./components/Summary/Summary";
import { useBooking } from "./hooks/useBooking";

function AppContent() {
  const { state } = useBooking();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hotel Booking System
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Book your perfect stay with customized meal plans
          </p>
        </div>

        <div className="space-y-8">
          <BookingForm />

          {state.destination && state.boardType && state.numberOfDays > 0 && (
            <DailyConfiguration />
          )}

          {state.isSubmitted && <Summary />}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}

export default App;
