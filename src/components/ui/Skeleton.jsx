function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-[#eee3dc]/60 ${className}`}
    />
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
      <Skeleton className="mb-3 h-4 w-20" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

function TableRowSkeleton({ cols = 4 }) {
  return (
    <>
      {[...Array(5)].map((_, rowIdx) => (
        <tr key={rowIdx} className="border-b border-[#f1e6df]">
          {[...Array(cols)].map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-4">
              <Skeleton className="h-4 w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function CardSkeleton({ lines = 3 }) {
  return (
    <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm space-y-4">
      <Skeleton className="h-5 w-40" />
      {[...Array(lines)].map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
        />
      ))}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <CardSkeleton lines={6} />
        </div>
        <div className="space-y-4">
          <CardSkeleton lines={4} />
          <CardSkeleton lines={3} />
        </div>
      </div>
    </div>
  );
}

export { Skeleton, StatCardSkeleton, TableRowSkeleton, CardSkeleton, DashboardSkeleton };
