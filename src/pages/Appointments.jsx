import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getAllAppointments } from "../services/appointmentService";
import { getAllPatientsList } from "../services/patientListService";
import { getAllUsers } from "../services/userService";
import AddAppointmentModal from "../components/layout/appointments/AddAppointmentModal";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await getAllAppointments();
        const data = response?.data ?? response ?? [];
        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Appointment fetch error:", error);
        setErrorMessage("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        const patientResponse = await getAllPatientsList();
        const userResponse = await getAllUsers();

        const pData = patientResponse?.data ?? patientResponse ?? [];
        const dData = userResponse?.data ?? userResponse ?? [];
        setPatients(Array.isArray(pData) ? pData : []);
        setDoctors(Array.isArray(dData) ? dData : []);
      } catch (error) {
        console.error("Select options fetch error:", error);
      }
    };

    fetchSelectOptions();
  }, []);

  const handleAddAppointment = async (data) => {
    console.log("APPOINTMENT FORM DATA:", data);
  };

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-[#5c4a42]">
            Appointments
          </h1>
          <p className="mt-2 text-sm text-[#9a7f73]">
            View, schedule and manage appointments.
          </p>
        </div>

        <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#5c4a42]">
              Appointment List
            </h2>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42]"
            >
              + Add Appointment
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-2xl border border-[#e7c9c9] bg-[#fff4f4] px-4 py-3 text-sm text-[#a06a6a]">
              {errorMessage}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#eee3dc] text-[#9a7f73]">
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center">
                      Loading appointments...
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-10 text-center">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-[#f1e6df] hover:bg-[#fdf8f6]"
                    >
                      <td className="px-4 py-3">{appointment.patientName}</td>
                      <td className="px-4 py-3">{appointment.doctorName}</td>
                      <td className="px-4 py-3">
                        {new Date(appointment.appointmentDate).toLocaleString(
                          "tr-TR",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>
                      <td className="px-4 py-3">{appointment.status}</td>
                      <td className="space-x-2 px-4 py-3">
                        <button className="text-[#8c6f63] hover:underline">
                          Edit
                        </button>
                        <button className="text-[#c97b7b] hover:underline">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <AddAppointmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAppointment}
          patients={patients}
          doctors={doctors}
        />
      </section>
    </DashboardLayout>
  );
}

export default Appointments;
