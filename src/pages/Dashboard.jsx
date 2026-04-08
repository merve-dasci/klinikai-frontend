import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import StatCard from "../components/dashboard/StatCard";

function Dashboard() {

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Patients"
            value={summary.totalPatients}
            color="bg-[#fdf8f6]"
          />
          <StatCard
            title="Appointments"
            value={summary.totalAppointments}
            color="bg-[#f7ede8]"
          />
          <StatCard
            title="Visits"
            value={summary.totalVisits}
            color="bg-[#f3e4df]"
          />
          <StatCard
            title="Notes"
            value={summary.totalNotes}
            color="bg-[#fdf3f0]"
          />
          <StatCard
            title="AI Results"
            value={summary.totalAiResults}
            color="bg-[#f9ece8]"
          />
          <StatCard
            title="Pending"
            value={summary.pendingAppointments}
            color="bg-[#fff3cd]"
          />
          <StatCard
            title="Completed"
            value={summary.completedAppointments}
            color="bg-[#e6f4ea]"
          />
          <StatCard
            title="Cancelled"
            value={summary.cancelledAppointments}
            color="bg-[#fdecea]"
          />
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#5c4a42]">
                Recent Appointments
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#eee3dc] text-[#9a7f73]">
                    <th className="px-4 py-3 font-medium">Patient</th>
                    <th className="px-4 py-3 font-medium">Doctor</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {summary.recentAppointments?.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-10 text-center">
                        No recent appointments
                      </td>
                    </tr>
                  ) : (
                    summary.recentAppointments?.map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-b border-[#f1e6df] hover:bg-[#fdf8f6]"
                      >
                        <td className="px-4 py-3">{appointment.patientName}</td>
                        <td className="px-4 py-3">{appointment.doctorName}</td>
                        <td className="px-4 py-3">
                          {new Date(appointment.appointmentDate).toLocaleString(
                            "tr-TR",
                          )}
                        </td>
                        <td className="px-4 py-3">{appointment.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
