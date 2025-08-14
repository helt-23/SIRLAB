// src/pages/labSchedulePage/LabScheduleView.jsx
import { Breadcrumb } from "../../components";
import LabInfoCard from "./components/LabInfoCard";
import ScheduleControls from "./scheduleManage";
import ReservationModal from "../requestReservationPage/reservationModal";
import { AbbreviationPanel, LabDetailModal, ScheduleTable } from "./components";
import "./app.css";

export default function LabScheduleView({
  labDetails,
  showDetail,
  setShowDetail,
  currentShift,
  setCurrentShift,
  currentWeek,
  setCurrentWeek,
  diasSemana,
  horariosUnicos,
  horarios,
  onCellClick,
  reservation,
}) {
  return (
    <div className="lab-schedule">
      <main className="main-content">
        <Breadcrumb />
        <div className="schedule-container">
          <LabInfoCard
            labDetails={labDetails}
            setShowDetail={setShowDetail}
            showDetail={showDetail}
          />

          <ScheduleControls
            currentShift={currentShift}
            setCurrentShift={setCurrentShift}
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
          />

          <ScheduleTable
            diasSemana={diasSemana}
            horariosUnicos={horariosUnicos}
            horarios={horarios}
            onCellClick={onCellClick}
            currentShift={currentShift}
            currentWeek={currentWeek}
          />

          <AbbreviationPanel />
        </div>

        <ReservationModal
          isOpen={reservation.isModalOpen}
          onClose={reservation.closeModal}
          selectedDay={reservation.selectedDay}
          selectedDate={reservation.selectedDate}
          availableSlots={reservation.availableSlots}
          selectedSlot={reservation.selectedSlot}
          reservationDetails={reservation.reservationDetails}
          isSuccess={reservation.isSuccess}
          onSlotSelect={reservation.handleSlotSelect}
          onInputChange={reservation.handleInputChange}
          onFileChange={reservation.handleFileChange}
          onSubmit={reservation.submitReservation}
        />

        <LabDetailModal
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
          labDetails={labDetails}
        />
      </main>
    </div>
  );
}
