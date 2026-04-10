import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { noteSchema } from "../../../schemas/noteSchema";
import Modal from "../../ui/Modal";

function AddNoteModal({ isOpen, onClose, onSubmit, visits }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: standardSchemaResolver(noteSchema),
    defaultValues: {
      content: "",
      visitId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ content: "", visitId: "" });
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Note" maxWidth="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#7b655c]">Visit</label>
          <select
            {...register("visitId")}
            className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
          >
            <option value="">Select visit</option>
            {visits?.map((visit) => (
              <option key={visit.id} value={visit.id}>
                {visit.patientName} - {visit.doctorName}
              </option>
            ))}
          </select>
          {errors.visitId && <p className="mt-1 text-xs text-red-500">{errors.visitId.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#7b655c]">Note</label>
          <textarea
            {...register("content")}
            rows="4"
            className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
          />
          {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#7b655c] hover:bg-[#f7ede8]">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting} className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd] disabled:opacity-50">
            {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddNoteModal;
