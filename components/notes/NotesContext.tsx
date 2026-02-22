"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Note } from "@/lib/constants";
import * as notesStorage from "@/lib/notes.storage";

type NotesContextValue = {
  notes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  createNote: () => void;
  updateNote: (id: string, updates: Partial<Pick<Note, "title" | "content">>) => void;
  deleteNote: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | null>(null);

function loadNotes(): Note[] {
  return notesStorage.getNotes();
}

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteIdState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNotes(loadNotes());
    setHydrated(true);
  }, []);

  const setSelectedNoteId = useCallback((id: string | null) => {
    setSelectedNoteIdState(id);
  }, []);

  const createNote = useCallback(() => {
    const newNote = notesStorage.createNote();
    setNotes(loadNotes());
    setSelectedNoteIdState(newNote.id);
  }, []);

  const updateNote = useCallback(
    (id: string, updates: Partial<Pick<Note, "title" | "content">>) => {
      notesStorage.updateNote(id, updates);
      setNotes(loadNotes());
    },
    []
  );

  const deleteNote = useCallback((id: string) => {
    notesStorage.deleteNote(id);
    const nextNotes = loadNotes();
    setNotes(nextNotes);
    setSelectedNoteIdState((prev) =>
      prev === id ? nextNotes[0]?.id ?? null : prev
    );
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes: hydrated ? notes : [],
        selectedNoteId,
        setSelectedNoteId,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
}
