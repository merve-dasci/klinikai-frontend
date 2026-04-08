import DashboardLayout from "../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getAllNotes } from "../services/noteService";
import { createAiResult } from "../services/aiResultService";
import { getAllAiResults } from "../services/aiResultService";
import toast from "react-hot-toast";
import AddNoteModal from "../components/layout/notes/AddNoteModal";
import { getAllVisits } from "../services/visitService";
import { createNote } from "../services/noteService";
import { deleteNote } from "../services/noteService";
import { deleteAiResult } from "../services/aiResultService";
import { getAiResultsByNoteId } from "../services/aiResultService";
import DeleteNoteModal from "../components/layout/notes/DeleteNoteModal";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiResults, setAiResults] = useState({});
  const [loadingAi, setLoadingAi] = useState({});

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [visits, setVisits] = useState([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getAllNotes();
        setNotes(response);
      } catch (error) {
        console.error("Notes fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await getAllVisits();
        setVisits(response);
      } catch (error) {
        console.error("Visits fetch error:", error);
      }
    };

    fetchVisits();
  }, []);

  useEffect(() => {
    const fetchAiResults = async () => {
      try {
        const data = await getAllAiResults();

        const mapped = {};
        data.forEach((ai) => {
          mapped[ai.noteId] = ai;
        });

        setAiResults(mapped);
      } catch (error) {
        console.error("AI results fetch error:", error);
      }
    };

    fetchAiResults();
  }, []);

const handleAnalyze = async (note) => {
    if (aiResults[note.id]) return;
  try {
    setLoadingAi((prev) => ({
      ...prev,
      [note.id]: true,
    }));

    const response = await createAiResult({
      summary: "Patient note analyzed.",
      simplifiedExplanation:
        "Patient is recovering and current condition looks stable.",
      suggestedAction: "Continue routine follow-up.",
      noteId: note.id,
    });

    setAiResults((prev) => ({
      ...prev,
      [note.id]: response,
    }));
    toast.success("AI analysis completed");
  } catch (error) {
    console.error("AI analyze error:", error);
    toast.error("AI analysis failed");
  } finally {
    setLoadingAi((prev) => ({
      ...prev,
      [note.id]: false,
    }));
  }
};

const handleAddNote = async (formData) => {
  try {
    const response = await createNote({
      content: formData.content,
      visitId: Number(formData.visitId),
    });

   setNotes((prev) => [response, ...prev]);
   toast.success("Note created successfully");
    setIsAddOpen(false);
    
  } catch (error) {
   
    console.error("Create note error:", error);
    toast.error("Failed to create note");
  }
};

const handleDeleteNote = async (id) => {
  try {
    const relatedAiResults = await getAiResultsByNoteId(id);

    for (const aiResult of relatedAiResults) {
      await deleteAiResult(aiResult.id);
    }

    await deleteNote(id);

    setNotes((prev) => prev.filter((note) => note.id !== id));

    setAiResults((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    toast.success("Note deleted");
  } catch (error) {
    console.error("Delete note error:", error);
    toast.error("Delete failed");
  }
};
  return (
    <DashboardLayout>
      <section className="space-y-6">
        <div className="rounded-3xl border border-[#eee3dc] bg-[#fffaf7] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#5c4a42]">Notes</h1>

            <button
              onClick={() => setIsAddOpen(true)}
              className="rounded-xl bg-[#e8d5cf] px-4 py-2 text-sm font-medium text-[#5c4a42] hover:bg-[#dbc4bd]"
            >
              Add Note
            </button>
          </div>
          {loading ? <p>Loading...</p> : <p>Total Notes: {notes.length}</p>}
          <p className="mt-2 text-sm text-[#9a7f73]">
            Manage visit notes and AI analysis.
          </p>
        </div>

        <div className="rounded-3xl border border-[#eee3dc] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#5c4a42]">Note List</h2>
          </div>

          <div className="mb-4 text-sm">
            <p>
              Total Notes: <b>{notes.length}</b>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#eee3dc] text-[#9a7f73]">
                  <th className="px-4 py-3 font-medium">Patient</th>
                  <th className="px-4 py-3 font-medium">Doctor</th>
                  <th className="px-4 py-3 font-medium">Note</th>
                  <th className="px-4 py-3 font-medium">Created At</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-6 text-center">
                      Loading notes...
                    </td>
                  </tr>
                ) : notes.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-10 text-center">
                      No notes found
                    </td>
                  </tr>
                ) : (
                  notes.map((note) => (
                    <tr
                      key={note.id}
                      className="border-b border-[#f1e6df] hover:bg-[#fdf8f6]"
                    >
                      <td className="px-4 py-3">{note.patientName}</td>
                      <td className="px-4 py-3">{note.doctorName}</td>
                      <td className="px-4 py-3">{note.content}</td>
                      <td className="px-4 py-3">
                        {new Date(note.createdAt).toLocaleString("tr-TR")}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleAnalyze(note)}
                          disabled={!!aiResults[note.id] || loadingAi[note.id]}
                          className={`hover:underline ${
                            aiResults[note.id]
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-[#7b655c]"
                          }`}
                        >
                          {loadingAi[note.id]
                            ? "Analyzing..."
                            : aiResults[note.id]
                              ? "Analyzed"
                              : "AI Analyze"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNote(note);
                            setIsDeleteOpen(true);
                          }}
                          className="text-[#d08b8b] hover:underline ml-2"
                        >
                          Delete
                        </button>
                        {aiResults[note.id] && (
                          <div className="mt-3 rounded-2xl border border-[#eee3dc] bg-[#fdf8f6] p-4 text-xs text-[#5c4a42] shadow-sm">
                            <p className="mb-1">
                              <span className="font-semibold">Summary:</span>{" "}
                              {aiResults[note.id].summary}
                            </p>

                            <p className="mb-1">
                              <span className="font-semibold">
                                Explanation:
                              </span>{" "}
                              {aiResults[note.id].simplifiedExplanation}
                            </p>

                            <p>
                              <span className="font-semibold">Action:</span>{" "}
                              {aiResults[note.id].suggestedAction}
                            </p>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <AddNoteModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onSubmit={handleAddNote}
          visits={visits}
        />
        <DeleteNoteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={() => handleDeleteNote(selectedNote.id)}
          note={selectedNote}
        />
      </section>
    </DashboardLayout>
  );
}

export default Notes;
