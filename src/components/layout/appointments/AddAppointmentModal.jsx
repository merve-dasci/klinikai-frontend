import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { appointmentSchema } from "../../../schemas/appointmentSchema";
import FormField from "../ui/FormField";
import Modal from "../../ui/Modal";

function AddAppointmentModal({ isOpen, onClose, onSubmit, patients, doctors }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: standardSchemaResolver(appointmentSchema),
    defaultValues: {
      appointmentDate: "",
      status: "",
      notes: "",
      patientId: "",
      doctorId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ appointmentDate: "", status: "", notes: "", patientId: "", doctorId: "" });
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Appointment" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Appointment Date" name="appointmentDate" type="datetime-local" register={register} error={errors.appointmentDate} />

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">Status</label>
            <select {...register("status")} className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]">
              <option value="">Select status</option>
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status.message}</p>}
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
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#7b655c]">Notes</label>
          <textarea {...register("notes")} rows="3" className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#7b655c] hover:bg-[#f7ede8]">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd] disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save Appointment"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddAppointmentModal;
