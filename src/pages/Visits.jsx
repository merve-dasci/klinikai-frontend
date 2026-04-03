import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllVisits, deleteVisit, createVisit } from "../services/visitService";
import DeleteVisitModal from "../components/layout/visits/DeleteVisitModal";
import AddVisitModal from "../components/layout/visits/AddVisitModal";

import { getAllPatientsList } from "../services/patientListService";
import { getAllUsers } from "../services/userService";
import { getAllAppointments } from "../services/appointmentService";

function Visits() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);

    const [isAddOpen, setIsAddOpen] = useState(false);

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
      const fetchVisits = async () => {
        try {
          const response = await getAllVisits();
          setVisits(response);
        } catch (error) {
          console.error("Visit fetch error:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVisits();
    }, []);

    useEffect(() => {
      const fetchSelectOptions = async () => {
        try {
          const patientData = await getAllPatientsList();
          const userData = await getAllUsers();
          const appointmentData = await getAllAppointments();

          setPatients(patientData);
          setDoctors(userData);
          setAppointments(appointmentData);
        } catch (error) {
          console.error("Visit select options fetch error:", error);
        }
      };

      fetchSelectOptions();
    }, []);

    const handleDeleteVisit = async () => {
      try {
        await deleteVisit(selectedVisit.id);
        setVisits((prev) =>
          prev.filter((visit) => visit.id !== selectedVisit.id),
        );
        setIsDeleteOpen(false);
        setSelectedVisit(null);
      } catch (error) {
        console.error("Delete visit error:", error);
      }
    };

    const handleAddVisit = async (formData) => {
      try {
        const response = await createVisit({
          ...formData,
          patientId: Number(formData.patientId),
          doctorId: Number(formData.doctorId),
          appointmentId: Number(formData.appointmentId),
        });

        setVisits((prev) => [...prev, response]);

        setIsAddOpen(false);
      } catch (error) {
        console.error("Create visit error:", error);
      }
    };
  return (
  <DashboardLayout>
    <section className="space-y-6">
      <div className="rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#5c4a42]">Visits</h1>

          <button
            onClick={() => setIsAddOpen(true)}
            className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd]"
          >
            Add Visit
          </button>
        </div>

        <p className="mt-2 text-sm text-[#9a7f73]">
          View and manage patient visits.
        </p>
      </div>

      <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#5c4a42]">Visit List</h2>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <p>
            Total Visits: <b>{visits.length}</b>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#eee3dc] text-[#9a7f73]">
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Doctor</th>
                <th className="px-4 py-3 font-medium">Visit Date</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center">
                    Loading visits...
                  </td>
                </tr>
              ) : visits.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center">
                    No visits found
                  </td>
                </tr>
              ) : (
                visits.map((visit) => (
                  <tr
                    key={visit.id}
                    className="border-b border-[#f1e6df] hover:bg-[#fdf8f6]"
                  >
                    <td className="px-4 py-3">{visit.patientName}</td>
                    <td className="px-4 py-3">{visit.doctorName}</td>
                    <td className="px-4 py-3">
                      {new Date(visit.visitDate).toLocaleString("tr-TR")}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button className="text-[#7b655c] hover:underline">
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVisit(visit);
                          setIsDeleteOpen(true);
                        }}
                        className="text-[#d08b8b] hover:underline"
                      >
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

      <AddVisitModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={handleAddVisit}
        patients={patients}
        doctors={doctors}
        appointments={appointments}
      />

      <DeleteVisitModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteVisit}
        visit={selectedVisit}
      />
    </section>
  </DashboardLayout>
);
}

export default Visits;
