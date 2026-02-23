"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNotes } from "@/components/notes/NotesContext";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function Sidebar() {
  const { notes, selectedNoteId, setSelectedNoteId, createNote, updateNote, deleteNote } =
    useNotes();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingNoteId) {
      const note = notes.find((n) => n.id === editingNoteId);
      setDraftTitle(note ? note.title : "");
      inputRef.current?.focus();
    }
  }, [editingNoteId, notes]);

  const startRename = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    setEditingNoteId(noteId);
  };

  const saveRename = () => {
    if (!editingNoteId) return;
    const trimmed = draftTitle.trim();
    updateNote(editingNoteId, { title: trimmed || "Untitled" });
    setEditingNoteId(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    noteId: string
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveRename();
    }
    if (e.key === "Escape") {
      setEditingNoteId(null);
      setDraftTitle("");
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    setNoteToDeleteId(noteId);
  };

  const handleConfirmDelete = () => {
    if (noteToDeleteId) {
      deleteNote(noteToDeleteId);
      setNoteToDeleteId(null);
    }
  };

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30 overflow-y-auto">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-2">
            Notes
          </h2>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 h-8 w-8"
            onClick={createNote}
            title="New note"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <nav className="flex flex-col p-2 gap-0.5 flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <p className="px-3 py-2 text-sm text-muted-foreground">
            No notes yet. Click + to create one.
          </p>
        ) : (
          notes.map((note) => {
            const isActive = selectedNoteId === note.id;
            const isEditing = editingNoteId === note.id;

            return (
              <div
                key={note.id}
                className={cn(
                  "group flex items-center gap-1 rounded-md pr-1",
                  "hover:bg-muted",
                  isActive && "bg-muted"
                )}
              >
                {isEditing ? (
                  <input
                    ref={inputRef}
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    onBlur={saveRename}
                    onKeyDown={(e) => handleKeyDown(e, note.id)}
                    className="flex-1 min-w-0 rounded-md px-3 py-2 text-sm font-medium bg-background border border-input outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Untitled"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedNoteId(note.id)}
                      className={cn(
                        "flex-1 min-w-0 text-left rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className="block truncate">
                        {note.title.trim() || "Untitled"}
                      </span>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => handleDeleteClick(e, note.id)}
                      title="Delete note"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                      onClick={(e) => startRename(e, note.id)}
                      title="Rename note"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                  </>
                )}
              </div>
            );
          })
        )}
      </nav>
      <ConfirmDialog
        open={noteToDeleteId !== null}
        onOpenChange={(open) => !open && setNoteToDeleteId(null)}
        title="Delete note?"
        description="This note will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </aside>
  );
}
