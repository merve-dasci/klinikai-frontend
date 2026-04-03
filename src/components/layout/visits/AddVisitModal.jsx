import { useEffect } from "react";
import { useForm } from "react-hook-form";

function AddVisitModal({
  isOpen,
  onClose,
  onSubmit,
  patients,
  doctors,
  appointments,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      visitDate: "",
      patientId: "",
      doctorId: "",
      appointmentId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        visitDate: "",
        patientId: "",
        doctorId: "",
        appointmentId: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#5c4a42]">Add Visit</h2>

          <button
            onClick={onClose}
            className="text-sm text-[#9a7f73] hover:text-[#5c4a42]"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Visit Date
              </label>
              <input
                type="datetime-local"
                {...register("visitDate")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
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
                  ?.filter((doctor) => doctor.roleName === "DOCTOR")
                  .map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.username}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Appointment
              </label>
              <select
                {...register("appointmentId")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              >
                <option value="">Select appointment</option>
                {appointments?.map((appointment) => (
                  <option key={appointment.id} value={appointment.id}>
                    {appointment.patientName} - {appointment.doctorName}
                  </option>
                ))}
              </select>
            </div>
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
              Save Visit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVisitModal;
