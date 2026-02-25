"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useNotes } from "./NotesContext";
import { getNoteById } from "@/lib/constants";

const SAVE_DEBOUNCE_MS = 400;

export default function Notes() {
  const { notes, selectedNoteId, updateNote } = useNotes();
  const note = getNoteById(notes, selectedNoteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note?.id, note?.title, note?.content]);

  const persistTitle = useCallback(
    (value: string) => {
      if (selectedNoteId) updateNote(selectedNoteId, { title: value });
    },
    [selectedNoteId, updateNote]
  );

  const persistContent = useCallback(
    (value: string) => {
      if (selectedNoteId) updateNote(selectedNoteId, { content: value });
    },
    [selectedNoteId, updateNote]
  );

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (titleDebounceRef.current) clearTimeout(titleDebounceRef.current);
    titleDebounceRef.current = setTimeout(() => persistTitle(value), SAVE_DEBOUNCE_MS);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    if (contentDebounceRef.current) clearTimeout(contentDebounceRef.current);
    contentDebounceRef.current = setTimeout(() => persistContent(value), SAVE_DEBOUNCE_MS);
  };

  if (!note) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="text-center text-muted-foreground max-w-sm">
          <p className="font-medium text-foreground mb-1">No note selected</p>
          <p className="text-sm">
            Select a note from the sidebar or create a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-w-0 h-full">
      <article className="flex flex-col flex-1 min-h-0 w-full p-6 overflow-hidden">
        <header className="shrink-0 mb-4">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full text-2xl font-semibold tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-muted-foreground"
            placeholder="Title..."
          />
        </header>
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 min-h-0 w-full prose prose-sm dark:prose-invert max-w-none text-foreground bg-transparent border-none outline-none focus:ring-0 p-0 resize-none overflow-auto placeholder:text-muted-foreground font-medium"
          placeholder="Start writing..."
          style={{ whiteSpace: "pre-wrap" }}
        />
      </article>
    </div>
  );
}
