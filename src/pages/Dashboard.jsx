import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../services/dashboardService";
import { getAllAiResults } from "../services/aiResultService";
import StatCard from "../components/dashboard/StatCard";
import { DashboardSkeleton } from "../components/ui/Skeleton";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [recentAiResults, setRecentAiResults] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAiResults = async () => {
      try {
        const data = await getAllAiResults();
        setRecentAiResults(data.slice(-3).reverse());
      } catch (error) {
        console.error("AI results fetch error:", error);
      }
    };

    fetchSummary();
    fetchAiResults();
  }, []);

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-[#5c4a42]">Dashboard</h1>
          <p className="mt-2 text-sm text-[#9a7f73]">
            Monitor clinic activity, appointments, visits, notes and AI
            insights.
          </p>
          <p className="text-xs text-[#9a7f73] mt-1">
            Last updated: {lastUpdated?.toLocaleString("tr-TR")}
          </p>
        </div>

        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          </div>

          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
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
                            <td className="px-4 py-3">
                              {appointment.patientName}
                            </td>
                            <td className="px-4 py-3">
                              {appointment.doctorName}
                            </td>
                            <td className="px-4 py-3">
                              {new Date(
                                appointment.appointmentDate,
                              ).toLocaleString("tr-TR")}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                  appointment.status === "PENDING"
                                    ? "bg-[#fff3cd] text-[#8a6d3b]"
                                    : appointment.status === "COMPLETED"
                                      ? "bg-[#e6f4ea] text-[#2e7d32]"
                                      : "bg-[#fdecea] text-[#b23b3b]"
                                }`}
                              >
                                {appointment.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-[#5c4a42]">
                  Recent Notes
                </h2>

                {summary.recentNotes?.length === 0 ? (
                  <p className="text-sm text-[#9a7f73]">No notes yet</p>
                ) : (
                  <div className="space-y-3">
                    {summary.recentNotes.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#f1e6df] p-3"
                      >
                        <p className="text-sm font-medium text-[#5c4a42]">
                          {item.patientName}
                        </p>
                        <p className="text-xs text-[#9a7f73]">
                          {item.doctorName}
                        </p>
                        <p className="mt-2 text-sm text-[#7b655c] line-clamp-2">
                          {item.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-[#5c4a42]">
                  AI Insights
                </h2>

                {recentAiResults.length === 0 ? (
                  <p className="text-sm text-[#9a7f73]">No AI insights yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentAiResults.map((ai) => (
                      <div
                        key={ai.id}
                        className="rounded-xl border border-[#f1e6df] p-3"
                      >
                        <p className="text-xs font-medium text-[#9a7f73]">
                          Summary
                        </p>
                        <p className="mt-1 text-sm text-[#5c4a42] line-clamp-2">
                          {ai.summary}
                        </p>
                        {ai.suggestedAction && (
                          <>
                            <p className="mt-2 text-xs font-medium text-[#9a7f73]">
                              Suggested Action
                            </p>
                            <p className="mt-1 text-sm text-[#7b655c] line-clamp-2">
                              {ai.suggestedAction}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          </>
        )}
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;
