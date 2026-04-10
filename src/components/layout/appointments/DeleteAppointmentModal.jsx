import Modal from "../../ui/Modal";

function DeleteAppointmentModal({ isOpen, onClose, onConfirm, appointment }) {
  if (!appointment) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Appointment" maxWidth="max-w-md">
      <p className="mt-1 text-sm text-[#7b655c]">
        Are you sure you want to delete this appointment for{" "}
        <span className="font-semibold text-[#5c4a42]">
          {appointment.patientName}
        </span>
        ?
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onClose} className="rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#7b655c] hover:bg-[#f7ede8]">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} className="rounded-xl bg-[#d8a5a5] px-4 py-2 text-sm font-medium text-white hover:bg-[#c88f8f]">
          Delete
        </button>
      </div>
    </Modal>
  );
}

export default DeleteAppointmentModal;
