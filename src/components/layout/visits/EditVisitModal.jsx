import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { visitSchema } from "../../../schemas/visitSchema";
import Modal from "../../ui/Modal";

function EditVisitModal({ isOpen, onClose, editingVisit, onSubmit, patients, doctors, appointments }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: standardSchemaResolver(visitSchema),
    defaultValues: {
      visitDate: "",
      patientId: "",
      doctorId: "",
      appointmentId: "",
    },
  });

  useEffect(() => {
    if (editingVisit) {
      reset({
        visitDate: editingVisit.visitDate
          ? editingVisit.visitDate.slice(0, 16)
          : "",
        patientId: editingVisit.patientId ? String(editingVisit.patientId) : "",
        doctorId: editingVisit.doctorId ? String(editingVisit.doctorId) : "",
        appointmentId: editingVisit.appointmentId ? String(editingVisit.appointmentId) : "",
      });
    }
  }, [editingVisit, reset]);

  if (!editingVisit) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Visit" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">Visit Date</label>
            <input type="datetime-local" {...register("visitDate")} className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]" />
            {errors.visitDate && <p className="mt-1 text-xs text-red-500">{errors.visitDate.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">Patient</label>
            <select {...register("patientId")} className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]">
              <option value="">Select patient</option>
              {patients?.map((p) => (
                <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
              ))}
            </select>
            {errors.patientId && <p className="mt-1 text-xs text-red-500">{errors.patientId.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">Doctor</label>
            <select {...register("doctorId")} className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]">
              <option value="">Select doctor</option>
              {doctors?.filter((d) => d.roleName === "DOCTOR").map((d) => (
                <option key={d.id} value={d.id}>{d.username}</option>
              ))}
            </select>
            {errors.doctorId && <p className="mt-1 text-xs text-red-500">{errors.doctorId.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">Appointment</label>
            <select {...register("appointmentId")} className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]">
              <option value="">Select appointment</option>
              {appointments?.map((a) => (
                <option key={a.id} value={a.id}>{a.patientName} - {a.doctorName}</option>
              ))}
            </select>
            {errors.appointmentId && <p className="mt-1 text-xs text-red-500">{errors.appointmentId.message}</p>}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#7b655c] hover:bg-[#f7ede8]">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd] disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditVisitModal;
