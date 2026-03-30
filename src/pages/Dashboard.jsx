import { useNavigate } from "react-router-dom";

function Dashboard(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
return (
  <div className="min-h-screen bg-slate-100">
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-800">KlinikAI</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
        <p className="mt-2 text-slate-600">
          Klinik yönetim paneline hoş geldin.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Patients</h3>
          <p className="mt-2 text-sm text-slate-500">
            Hasta listesini görüntüle ve yönet.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Appointments</h3>
          <p className="mt-2 text-sm text-slate-500">
            Randevuları takip et ve düzenle.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">Visits</h3>
          <p className="mt-2 text-sm text-slate-500">
            Muayene kayıtlarını görüntüle.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800">AI Notes</h3>
          <p className="mt-2 text-sm text-slate-500">
            AI analizlerini ve notları incele.
          </p>
        </div>
      </div>
    </main>
  </div>
);

}
export default Dashboard;