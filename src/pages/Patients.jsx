import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import AddPatientModal from "../components/layout/patients/AddPatientModal";
import EditPatientModal from "../components/layout/patients/EditPatientModal";
import DeletePatientModal from "../components/layout/patients/DeletePatientModal";
import {
  createPatient,
  updatePatient,
  deletePatient,
} from "../services/patientService";
import toast from "react-hot-toast";
import { usePatients } from "../hooks/usePatients";

function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [editingPatient, setEditingPatient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
 

  const itemsPerPage = 5;

  const { patients, loading, errorMessage, totalPages, fetchPatients } =
    usePatients(currentPage, itemsPerPage, searchTerm);



  const handleAddPatient = async (data) => {
    try {
      await createPatient(data);

      toast.success("Patient added successfully!");

      setIsAddModalOpen(false);
      setCurrentPage(1);
      await fetchPatients();
    } catch (error) {
      toast.error("Failed to create patient");
      console.error("Create patient error:", error);
    }
  };

  

  const handleEditPatientSubmit = async (data) => {
    try {
      await updatePatient(editingPatient.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        tcNo: data.tcNo,
        birthDate: data.birthDate,
        phone: data.phone,
        email: data.email,
      });

      toast.success("Patient updated successfully!");
      setIsEditModalOpen(false);
      setEditingPatient(null);
      await fetchPatients();
    } catch (error) {
      toast.error("Failed to update patient");
      console.error("Update patient error:", error);
    }
  };
  const handleDeletePatient = async () => {
    try {
      await deletePatient(patientToDelete.id);

      toast.success("Patient deleted successfully!");
      setIsDeleteModalOpen(false);
      setPatientToDelete(null);
      await fetchPatients();
    } catch (error) {
      toast.error("Failed to delete patient");
      console.error("Delete patient error:", error);
    }
  };

 

  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-[#5c4a42]">Patients</h1>
          <p className="mt-2 text-sm text-[#9a7f73]">
            View, search and manage patient records.
          </p>
        </div>

        <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold text-[#5c4a42]">
              Patient List
            </h2>

            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="text"
                placeholder="Search patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-xl border border-[#eadfd8] bg-[#fffaf7] px-4 py-2 text-sm text-[#5c4a42] outline-none"
              />

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42]"
              >
                + Add Patient
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between text-sm">
            <p>
              Page: <b>{currentPage}</b>
            </p>

            <p>
              Total Pages: <b>{totalPages}</b>
            </p>
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
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center">
                      Loading patients...
                    </td>
                  </tr>
                ) : patients.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-10 text-center">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  patients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-b border-[#f1e6df] hover:bg-[#fdf8f6]"
                    >
                      <td className="px-4 py-3">
                        {patient.firstName} {patient.lastName}
                      </td>
                      <td className="px-4 py-3">{patient.email}</td>
                      <td className="px-4 py-3">{patient.phone}</td>
                      <td className="space-x-2 px-4 py-3">
                        <button
                          onClick={() => {
                            setEditingPatient(patient);
                            setIsEditModalOpen(true);
                          }}
                          className="text-[#8c6f63] hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setPatientToDelete(patient);
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
          </div>

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

        <AddPatientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddPatient}
        />

        <EditPatientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          editingPatient={editingPatient}
          onSubmit={handleEditPatientSubmit}
        />

        <DeletePatientModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setPatientToDelete(null);
          }}
          onConfirm={handleDeletePatient}
          patient={patientToDelete}
        />
      </section>
    </DashboardLayout>
  );
}

export default Patients;
