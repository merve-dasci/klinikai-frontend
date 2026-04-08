function DeleteNoteModal({ isOpen, onClose, onConfirm, note }) {
  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-[#5c4a42]">Delete Note</h2>

        <p className="mt-3 text-sm text-[#7b655c]">
          Are you sure you want to delete this note?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-[#eadfd8] px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-[#d8a5a5] px-4 py-2 text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteNoteModal;
