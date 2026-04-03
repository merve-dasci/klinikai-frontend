import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { appointmentSchema } from "../../../schemas/appointmentSchema";
import FormField from "../ui/FormField";

function EditAppointmentModal({
  isOpen,
  onClose,
  editingAppointment,
  onSubmit,
  patients,
  doctors,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    if (editingAppointment) {
      reset({
        appointmentDate: editingAppointment.appointmentDate
          ? editingAppointment.appointmentDate.slice(0, 16)
          : "",
        status: editingAppointment.status || "",
        notes: editingAppointment.notes || "",
        patientId: editingAppointment.patientId
          ? String(editingAppointment.patientId)
          : "",
        doctorId: editingAppointment.doctorId
          ? String(editingAppointment.doctorId)
          : "",
      });
    }
  }, [editingAppointment, reset]);

  if (!isOpen || !editingAppointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#5c4a42]">
            Edit Appointment
          </h2>

          <button
            onClick={onClose}
            className="text-sm text-[#9a7f73] hover:text-[#5c4a42]"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Appointment Date"
              name="appointmentDate"
              type="datetime-local"
              register={register}
              error={errors.appointmentDate}
            />

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              >
                <option value="">Select status</option>
                <option value="PENDING">PENDING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Patient
              </label>
              <select
                {...register("patientId")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              >
                <option value="">Select patient</option>
                {patients?.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.firstName} {patient.lastName}
                  </option>
                ))}
              </select>
              {errors.patientId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.patientId.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Doctor
              </label>
              <select
                {...register("doctorId")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              >
                <option value="">Select doctor</option>
                {doctors
                  .filter((doctor) => doctor.roleName === "DOCTOR")
                  .map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.username}
                    </option>
                  ))}
              </select>
              {errors.doctorId && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.doctorId.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">
              Notes
            </label>
            <textarea
              {...register("notes")}
              rows="3"
              className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#7b655c] hover:bg-[#f7ede8]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAppointmentModal;
