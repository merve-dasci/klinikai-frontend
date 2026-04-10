function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-between border-t border-[#f1e6df] pt-4">
      <p className="text-sm text-[#9a7f73]">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-xl border border-[#eadfd8] px-4 py-2 text-sm text-[#7b655c] transition hover:bg-[#f7ede8] disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              currentPage === i + 1
                ? "bg-[#f3e4df] font-medium text-[#5c4a42]"
                : "border border-[#eadfd8] text-[#7b655c] hover:bg-[#f7ede8]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="rounded-xl border border-[#eadfd8] px-4 py-2 text-sm text-[#7b655c] transition hover:bg-[#f7ede8] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
