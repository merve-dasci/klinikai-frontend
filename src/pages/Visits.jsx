import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState, useMemo } from "react";
import { getAllVisits, deleteVisit, createVisit, updateVisit } from "../services/visitService";
import DeleteVisitModal from "../components/layout/visits/DeleteVisitModal";
import AddVisitModal from "../components/layout/visits/AddVisitModal";
import EditVisitModal from "../components/layout/visits/EditVisitModal";
import { TableRowSkeleton } from "../components/ui/Skeleton";
import Pagination from "../components/ui/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import toast from "react-hot-toast";

import { getAllPatientsList } from "../services/patientListService";
import { getAllUsers } from "../services/userService";
import { getAllAppointments } from "../services/appointmentService";

function Visits() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState(null);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingVisit, setEditingVisit] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const filteredVisits = useMemo(() => {
      if (!debouncedSearch) return visits;
      const term = debouncedSearch.toLowerCase();
      return visits.filter(
        (v) =>
          v.patientName?.toLowerCase().includes(term) ||
          v.doctorName?.toLowerCase().includes(term),
      );
    }, [visits, debouncedSearch]);

    const totalPages = Math.ceil(filteredVisits.length / pageSize);
    const paginatedVisits = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return filteredVisits.slice(start, start + pageSize);
    }, [filteredVisits, currentPage]);

    useEffect(() => {
      setCurrentPage(1);
    }, [debouncedSearch]);

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
        toast.success("Visit deleted successfully");
      } catch (error) {
        console.error("Delete visit error:", error);
        toast.error("Failed to delete visit");
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
        toast.success("Visit created successfully");
        setIsAddOpen(false);
      } catch (error) {
        console.error("Create visit error:", error);
        toast.error("Failed to create visit");
      }
    };

    const handleEditVisit = async (formData) => {
      try {
        const response = await updateVisit(editingVisit.id, {
          ...formData,
          patientId: Number(formData.patientId),
          doctorId: Number(formData.doctorId),
          appointmentId: Number(formData.appointmentId),
        });

        setVisits((prev) =>
          prev.map((v) => (v.id === editingVisit.id ? response : v)),
        );
        toast.success("Visit updated successfully");
        setIsEditOpen(false);
        setEditingVisit(null);
      } catch (error) {
        console.error("Update visit error:", error);
        toast.error("Failed to update visit");
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
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 rounded-xl border border-[#eadfd8] bg-white px-4 py-2 text-sm text-[#5c4a42] outline-none focus:border-[#d8beb3]"
          />
        </div>

        <div className="mb-4 flex items-center justify-between text-sm">
          <p>
            Total Visits: <b>{filteredVisits.length}</b>
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
                <TableRowSkeleton cols={4} />
              ) : paginatedVisits.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center">
                    No visits found
                  </td>
                </tr>
              ) : (
                paginatedVisits.map((visit) => (
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
                      <button
                        onClick={() => {
                          setEditingVisit(visit);
                          setIsEditOpen(true);
                        }}
                        className="text-[#7b655c] hover:underline"
                      >
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
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

      <EditVisitModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingVisit(null);
        }}
        editingVisit={editingVisit}
        onSubmit={handleEditVisit}
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
