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
          onClose={reservation.closeReservationModal}
          day={reservation.reservationModal.day}
          date={reservation.reservationModal.date}
          timeSlots={reservation.reservationModal.timeSlots}
          selectedSlotIds={reservation.selectedSlotIds}
          handleSlotChange={reservation.handleSlotChange}
          reservationType={reservation.reservationType}
          setReservationType={reservation.setReservationType}
          description={reservation.description}
          setDescription={reservation.setDescription}
          file={reservation.file}
          handleFileChange={reservation.handleFileChange}
          formErrors={reservation.formErrors}
          reservationTypes={reservation.reservationTypes}
          validateForm={reservation.validateForm}
          showConfirmation={reservation.showConfirmation}
          setShowConfirmation={reservation.setShowConfirmation}
          handleConfirmReservation={reservation.handleConfirmReservation}
          reservationSuccess={reservation.reservationSuccess}
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
