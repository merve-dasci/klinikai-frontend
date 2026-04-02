function FormField({ label, name, type = "text", register, error }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-[#7b655c]">
        {label}
      </label>

      <input
        type={type}
        {...register(name)}
        className="w-full rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default FormField;
