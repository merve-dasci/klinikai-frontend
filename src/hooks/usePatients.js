import { useEffect, useState } from "react";
import { getPatientsPaginated } from "../services/patientService";

export function usePatients(currentPage, itemsPerPage, searchTerm) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchPatients = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await getPatientsPaginated(
        currentPage - 1,
        itemsPerPage,
        searchTerm
      );

      setPatients(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Patient fetch error:", error);
      setErrorMessage("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [currentPage, searchTerm]);

  

  return {
    patients,
    loading,
    errorMessage,
    totalPages,
    fetchPatients,
  };
}
