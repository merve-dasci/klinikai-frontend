import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";


function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `block w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
      isActive
        ? "bg-[#f3e4df] text-[#5c4a42]"
        : "text-[#7b655c] hover:bg-[#f7ede8]"
    }`;

  const sidebarContent = (
    <>
      <div className="mb-10">
        <h2 className="text-xl font-semibold tracking-wide text-[#5c4a42]">
          KlinikAI
        </h2>
        <p className="mt-1 text-sm text-[#9a7f73]">
          Clinic Management Panel
        </p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/patients" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
          Patients
        </NavLink>
        <NavLink to="/appointments" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
          Appointments
        </NavLink>
        <NavLink to="/visits" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
          Visits
        </NavLink>
        <NavLink to="/notes" className={navLinkClass} onClick={() => setSidebarOpen(false)}>
          AI Notes
        </NavLink>
      </nav>

      <div className="mt-auto border-t border-[#eee3dc] pt-4">
        {user && (
          <div className="mb-3 px-2">
            <p className="text-sm font-medium text-[#5c4a42] truncate">
              {user.username}
            </p>
            <p className="text-xs text-[#9a7f73] truncate">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-[#f3e4df] px-2 py-0.5 text-xs font-medium text-[#5c4a42]">
              {user.role}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-[#c97b7b] transition hover:bg-[#fdecea]"
        >
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#f8f5f2] text-[#5c4a42]">
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r border-[#eee3dc] bg-[#fffaf7] p-6">
          {sidebarContent}
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#eee3dc] bg-[#fffaf7] p-6 transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>

        <div className="flex-1">
          <header className="border-b border-[#eee3dc] bg-[#fffaf7]">
            <div className="flex items-center gap-3 px-6 py-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-[#5c4a42] hover:bg-[#f3e4df] lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
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
