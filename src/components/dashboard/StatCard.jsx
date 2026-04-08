function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${color}`}>
      <p className="text-sm text-[#9a7f73]">{title}</p>
      <h2 className="text-2xl font-semibold text-[#5c4a42]">{value}</h2>
    </div>
  );
}

export default StatCard;
