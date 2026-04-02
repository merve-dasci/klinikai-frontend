import { NavLink } from "react-router-dom";




function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5c4a42]">
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-[#eee3dc] bg-[#fffaf7] p-6">
          <div className="mb-10">
            <h2 className="text-xl font-semibold tracking-wide text-[#5c4a42]">
              KlinikAI
            </h2>
            <p className="mt-1 text-sm text-[#9a7f73]">
              Clinic Management Panel
            </p>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-[#f3e4df] text-[#5c4a42]"
                    : "text-[#7b655c] hover:bg-[#f7ede8]"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/patients"
         className={({ isActive }) =>
    `block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
      isActive
        ? "bg-[#f3e4df] text-[#5c4a42]"
        : "text-[#7b655c] hover:bg-[#f7ede8]"
    }`
  }
>
              Patients
            </NavLink>

            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-[#f3e4df] text-[#5c4a42]"
                    : "text-[#7b655c] hover:bg-[#f7ede8]"
                }`
              }
            >
              Appointments
            </NavLink>

            <button className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#7b655c] transition hover:bg-[#f7ede8]">
              Visits
            </button>

            <button className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#7b655c] transition hover:bg-[#f7ede8]">
              AI Notes
            </button>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-[#eee3dc] bg-[#fffaf7]">
            <div className="px-6 py-4">
              <h1 className="text-xl font-semibold text-[#5c4a42]">
                KlinikAI Panel
              </h1>
            </div>
          </header>

          <main className="px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
