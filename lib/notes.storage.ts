import type { Note } from "./constants";

const STORAGE_KEY = "notepad-notes";

function safeParse(json: string): Note[] {
  try {
    const data = JSON.parse(json);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (n): n is Note =>
        n &&
        typeof n.id === "string" &&
        typeof n.title === "string" &&
        typeof n.content === "string" &&
        typeof n.createdAt === "string" &&
        typeof n.updatedAt === "string"
    );
  } catch {
    return [];
  }
}

export function getNotes(): Note[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? safeParse(raw) : [];
}

export function saveNotes(notes: Note[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function generateId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function now(): string {
  return new Date().toISOString();
}

export function createNote(): Note {
  const notes = getNotes();
  const newNote: Note = {
    id: generateId(),
    title: "Untitled",
    content: "",
    createdAt: now(),
    updatedAt: now(),
  };
  notes.unshift(newNote);
  saveNotes(notes);
  return newNote;
}

export function updateNote(
  id: string,
  updates: Partial<Pick<Note, "title" | "content">>
): void {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return;
  notes[index] = {
    ...notes[index],
    ...updates,
    updatedAt: now(),
  };
  saveNotes(notes);
}

export function deleteNote(id: string): void {
  const notes = getNotes().filter((n) => n.id !== id);
  saveNotes(notes);
}
