import React, { useState } from "react";
import { useBooking } from "../../hooks/useBooking";
import Select from "../UI/Select";
import DateRangePicker from "./DateRangePicker";
import BoardTypeSelector from "./BoardTypeSelector";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Toast from "../UI/Toast";
import type { BoardType } from "../../types";

const BookingForm: React.FC = () => {
  const { state, dispatch, countries, boardTypes, submitBooking } =
    useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "error" | "success",
  });

  const showModal = (
    title: string,
    message: string,
    type: "info" | "warning" | "error" | "success" = "info"
  ) => {
    setModalContent({ title, message, type });
    setIsModalOpen(true);
  };

  const showToast = () => {
    setIsToastOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submitBooking()) {
      showModal(
        "Booking Submitted Successfully!",
        "Your booking has been submitted successfully. You can review the summary below.",
        "success"
      );
      showToast();
    } else {
      const missingFields = [];
      if (!state.citizenship) missingFields.push("Citizenship");
      if (!state.destination) missingFields.push("Destination Country");
      if (!state.startDate) missingFields.push("Start Date");
      if (state.numberOfDays <= 0) missingFields.push("Number of Days");
      if (!state.boardType) missingFields.push("Board Type");

      const daysWithoutHotels = state.dailySelections
        .filter((day) => !day.hotel)
        .map((day) => day.day);

      let errorMessage = "Please complete the following:\n\n";

      if (missingFields.length > 0) {
        errorMessage += `• Required fields: ${missingFields.join(", ")}\n`;
      }

      if (daysWithoutHotels.length > 0) {
        errorMessage += `• Select hotels for days: ${daysWithoutHotels.join(
          ", "
        )}`;
      }

      showModal("Validation Error", errorMessage, "error");
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Booking Configuration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Citizenship *"
              value={state.citizenship}
              options={countries}
              onChange={(value) =>
                dispatch({ type: "SET_CITIZENSHIP", payload: value })
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
            />

            <Select
              label="Destination Country *"
              value={state.destination}
              options={countries}
              onChange={(value) =>
                dispatch({ type: "SET_DESTINATION", payload: value })
              }
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
            />
          </div>

          <DateRangePicker
            startDate={state.startDate}
            numberOfDays={state.numberOfDays}
            onStartDateChange={(date) =>
              dispatch({ type: "SET_START_DATE", payload: date })
            }
            onNumberOfDaysChange={(days) =>
              dispatch({ type: "SET_NUMBER_OF_DAYS", payload: days })
            }
          />

          <BoardTypeSelector
            boardTypes={boardTypes as BoardType[]}
            selectedBoardType={state.boardType}
            onBoardTypeChange={(boardType) =>
              dispatch({ type: "SET_BOARD_TYPE", payload: boardType })
            }
          />

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={
                !state.citizenship ||
                !state.destination ||
                !state.startDate ||
                state.numberOfDays <= 0 ||
                !state.boardType
              }
            >
              Review Booking
            </Button>
          </div>
        </form>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
        type={modalContent.type}
      >
        <div className="whitespace-pre-line">{modalContent.message}</div>
      </Modal>

      <Toast
        isOpen={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        message="Booking submitted successfully!"
        type="success"
        duration={5000}
      />
    </>
  );
};

export default BookingForm;
