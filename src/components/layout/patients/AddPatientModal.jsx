import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { patientSchema } from "../../../schemas/patientSchema";
import FormField from "../../ui/FormField";

function AddPatientModal({ isOpen, onClose, onSubmit }) {
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
    if (isOpen) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        tcNo: "",
        birthDate: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#5c4a42]">Add Patient</h2>

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
              label="First Name"
              name="firstName"
              register={register}
              error={errors.firstName}
            />
            <FormField
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName}
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <FormField
              label="Phone"
              name="phone"
              register={register}
              error={errors.phone}
            />

            <FormField
              label="TC No"
              name="tcNo"
              register={register}
              error={errors.tcNo}
            />

            <FormField
              label="Birth Date"
              name="birthDate"
              type="date"
              register={register}
              error={errors.birthDate}
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
              Save Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientModal;
