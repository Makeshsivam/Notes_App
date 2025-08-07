import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

interface Note {
  id: string;
  text: string;
  createdAt: Date;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date(),
        };
      });
      setNotes(notesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this note?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Try again.");
    }
  };

  if (loading)
    return <div className="text-center text-gray-500 mt-8">Loading notes...</div>;

  if (notes.length === 0)
    return <div className="text-center text-gray-500 mt-8">No notes found.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Your Notes</h2>
      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all flex justify-between items-start"
          >
            <div>
              <p className="text-gray-800">{note.text}</p>
              <span className="text-xs text-gray-400">
                {note.createdAt.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => handleDelete(note.id)}
              className="text-red-500 hover:text-red-700 text-sm ml-4"
              title="Delete note"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
