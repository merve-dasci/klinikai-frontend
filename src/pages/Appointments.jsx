import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";

import { getAllPatientsList } from "../services/patientListService";
import { getAllUsers } from "../services/userService";
import AddAppointmentModal from "../components/layout/appointments/AddAppointmentModal";
import DeleteAppointmentModal from "../components/layout/appointments/DeleteAppointmentModal";
import EditAppointmentModal from "../components/layout/appointments/EditAppointmentModal";

import {
  getAppointmentsPaginated,
  createAppointment,
  deleteAppointment,
  updateAppointment,
} from "../services/appointmentService";
import toast from "react-hot-toast";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
   const fetchAppointments = async () => {
     setLoading(true);
     setErrorMessage("");

     try {
      const data = await getAppointmentsPaginated(
        currentPage - 1,
        itemsPerPage,
      );
      setAppointments(data.content);
      setTotalPages(data.totalPages);
     } catch (error) {
       console.error("Appointment fetch error:", error);
       setErrorMessage("Failed to load appointments.");
     } finally {
       setLoading(false);
     }
   };

   fetchAppointments();
 }, [currentPage]);

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        const patientData = await getAllPatientsList();
        const userData = await getAllUsers();
        console.log("PATIENT DATA:", patientData);
        console.log("USER DATA:", userData);

        setPatients(patientData);
        setDoctors(userData);
      } catch (error) {
        console.error("Select options fetch error:", error);
      }
    };

    fetchSelectOptions();
  }, []);

  const refreshAppointments = async () => {
  try {
   const data = await getAppointmentsPaginated(currentPage - 1, itemsPerPage);
   setAppointments(data.content);
   setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Refresh error:", error);
  }
};

const handleAddAppointment = async (data) => {
  try {
    await createAppointment({
      appointmentDate: data.appointmentDate,
      status: data.status,
      notes: data.notes,
      patientId: Number(data.patientId),
      doctorId: Number(data.doctorId),
    });

    toast.success("Appointment created successfully!");
 
    setIsAddModalOpen(false);
    setCurrentPage(1);
    await refreshAppointments();
  } catch (error) {
    toast.error("Failed to create appointment");
    console.error("Create appointment error:", error);
  }
};
const handleEditAppointmentSubmit = async (data) => {
  try {
    await updateAppointment(editingAppointment.id, {
      appointmentDate: data.appointmentDate,
      status: data.status,
      notes: data.notes,
      patientId: Number(data.patientId),
      doctorId: Number(data.doctorId),
    });

    toast.success("Appointment updated successfully!");
    setIsEditModalOpen(false);
    setEditingAppointment(null);
    await refreshAppointments();
  } catch (error) {
    toast.error("Failed to update appointment");
    console.error("Update appointment error:", error);
  }
};

const handleDeleteAppointment = async () => {
  try {
    await deleteAppointment(appointmentToDelete.id);
    toast.success("Appointment deleted successfully!");
    setIsDeleteModalOpen(false);
    setAppointmentToDelete(null);
    await refreshAppointments();
  } catch (error) {
    toast.error("Failed to delete appointment");
    console.error("Delete appointment error:", error);
  }
};

const filteredAppointments = appointments.filter((appointment) => {
  const search = searchTerm.toLowerCase();

  return (
    appointment.patientName?.toLowerCase().includes(search) ||
    appointment.doctorName?.toLowerCase().includes(search) ||
    appointment.status?.toLowerCase().includes(search) ||
    appointment.notes?.toLowerCase().includes(search)
  );
});

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
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search appointment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-[#eadfd8] bg-[#fffaf7] px-4 py-2 text-sm text-[#5c4a42] outline-none"
              />

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42]"
              >
                + Add Appointment
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 rounded-2xl border border-[#e7c9c9] bg-[#fff4f4] px-4 py-3 text-sm text-[#a06a6a]">
              {errorMessage}
            </div>
          )}

          <div className="overflow-x-auto">
            <div className="mb-4 flex items-center justify-between text-sm">
              <p>
                Page: <b>{currentPage}</b>
              </p>

              <p>
                Total Pages: <b>{totalPages}</b>
              </p>
            </div>
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
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-10 text-center">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
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
                        <button
                          onClick={() => {
                            setEditingAppointment(appointment);
                            setIsEditModalOpen(true);
                          }}
                          className="text-[#8c6f63] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setAppointmentToDelete(appointment);
                            setIsDeleteModalOpen(true);
                          }}
                          className="text-[#c97b7b] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="mt-6 flex items-center justify-between border-t border-[#f1e6df] pt-4">
              <p className="text-sm text-[#9a7f73]">
                Page {currentPage} of {totalPages || 1}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="rounded-xl border px-4 py-2 text-sm disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages || 1 }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`rounded-xl px-4 py-2 text-sm ${
                      currentPage === i + 1
                        ? "bg-[#f3e4df]"
                        : "border hover:bg-[#f7ede8]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl border px-4 py-2 text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddAppointmentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddAppointment}
          patients={patients}
          doctors={doctors}
        />
        <EditAppointmentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingAppointment(null);
          }}
          editingAppointment={editingAppointment}
          onSubmit={handleEditAppointmentSubmit}
          patients={patients}
          doctors={doctors}
        />
        <DeleteAppointmentModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setAppointmentToDelete(null);
          }}
          onConfirm={handleDeleteAppointment}
          appointment={appointmentToDelete}
        />
      </section>
    </DashboardLayout>
  );
}

export default Appointments;
