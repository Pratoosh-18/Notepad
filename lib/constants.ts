export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export function getNoteById(notes: Note[], id: string | null): Note | undefined {
  if (!id) return undefined;
  return notes.find((note) => note.id === id);
}
