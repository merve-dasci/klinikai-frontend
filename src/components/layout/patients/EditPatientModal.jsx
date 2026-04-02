import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../../../schemas/patientSchema";
import FormField from "../../ui/FormField";



function EditPatientModal({
  isOpen,
  onClose,
  editingPatient,
  onSubmit,
}) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      tcNo: "",
      birthDate: "",
    },
  });

  useEffect(() => {
    if (editingPatient) {
      reset({
        firstName: editingPatient.firstName || "",
        lastName: editingPatient.lastName || "",
        email: editingPatient.email || "",
        phone: editingPatient.phone || "",
        tcNo: editingPatient.tcNo || "",
        birthDate: editingPatient.birthDate || "",
      });
    }
  }, [editingPatient, reset]);
  if (!isOpen || !editingPatient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#5c4a42]">Edit Patient</h2>

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
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />

              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Last Name
              </label>
              <input
                type="text"
               
               {...register("lastName")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Email
              </label>
              <input
                type="email"
                
               {...register("email")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Phone
              </label>
              <input
                type="text"
                {...register("phone")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                TC No
              </label>
              <input
                type="text"
               {...register("tcNo")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
              {errors.tcNo && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.tcNo.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[#7b655c]">
                Birth Date
              </label>
              <input
                type="date"
                {...register("birthDate")}
                className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
              />
              {errors.birthDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.birthDate.message}
                </p>
              )}
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPatientModal;
