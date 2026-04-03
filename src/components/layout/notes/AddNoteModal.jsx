import { useEffect } from "react";
import { useForm } from "react-hook-form";

function AddNoteModal({ isOpen, onClose, onSubmit, visits }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
      visitId: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        content: "",
        visitId: "",
      });
    }
  }, [isOpen, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#5c4a42]">Add Note</h2>

          <button
            onClick={onClose}
            className="text-sm text-[#9a7f73] hover:text-[#5c4a42]"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">
              Visit
            </label>

            <select
              {...register("visitId")}
              className="w-full rounded-xl border border-[#eadfd8] px-4 py-2 text-sm"
            >
              <option value="">Select visit</option>

              {visits?.map((visit) => (
                <option key={visit.id} value={visit.id}>
                  {visit.patientName} - {visit.doctorName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#7b655c]">
              Note
            </label>

            <textarea
              {...register("content")}
              rows="4"
              className="w-full rounded-xl border border-[#eadfd8] px-4 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-4 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteModal;
