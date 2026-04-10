import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { patientSchema } from "../../../schemas/patientSchema";
import FormField from "../ui/FormField";
import Modal from "../../ui/Modal";

function EditPatientModal({ isOpen, onClose, editingPatient, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: standardSchemaResolver(patientSchema),
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

  if (!editingPatient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Patient">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="First Name" name="firstName" register={register} error={errors.firstName} />
          <FormField label="Last Name" name="lastName" register={register} error={errors.lastName} />
          <FormField label="Email" name="email" type="email" register={register} error={errors.email} />
          <FormField label="Phone" name="phone" register={register} error={errors.phone} />
          <FormField label="TC No" name="tcNo" register={register} error={errors.tcNo} />
          <FormField label="Birth Date" name="birthDate" type="date" register={register} error={errors.birthDate} />
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

export default EditPatientModal;
