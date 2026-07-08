"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { useNotes } from "./NotesContext";
import { getNoteById } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import HighlightedEditor from "./HighlightedEditor";
import { FindReplaceBar, useFindReplace, useFindReplaceShortcut } from "./FindReplace";

const SAVE_DEBOUNCE_MS = 400;

export default function Notes() {
  const { notes, selectedNoteId, updateNote } = useNotes();
  const note = getNoteById(notes, selectedNoteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const titleDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [findOpen, setFindOpen] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [initialFind, setInitialFind] = useState("");

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

  const handleContentChange = useCallback(
    (value: string, persistImmediately = false) => {
      setContent(value);
      if (contentDebounceRef.current) clearTimeout(contentDebounceRef.current);
      if (persistImmediately) {
        persistContent(value);
        return;
      }
      contentDebounceRef.current = setTimeout(() => persistContent(value), SAVE_DEBOUNCE_MS);
    },
    [persistContent]
  );

  const openFindReplace = useCallback(
    ({ showReplace: withReplace, initialFind: findValue }: { showReplace: boolean; initialFind?: string }) => {
      setShowReplace(withReplace);
      setInitialFind(findValue ?? "");
      setFindOpen(true);
    },
    []
  );

  const closeFindReplace = useCallback(() => {
    setFindOpen(false);
    textareaRef.current?.focus();
  }, []);

  useFindReplaceShortcut(!!note, openFindReplace, textareaRef);

  const findReplace = useFindReplace({
    content,
    onContentChange: (value) => handleContentChange(value, true),
    textareaRef,
    open: findOpen,
    showReplace,
    initialFind,
  });

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
        <header className="shrink-0 mb-4 flex items-start gap-2">
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="min-w-0 flex-1 text-2xl font-semibold tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 placeholder:text-muted-foreground"
            placeholder="Title..."
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => openFindReplace({ showReplace: false })}
            title="Find (⌘F)"
            className="shrink-0 text-muted-foreground"
          >
            <Search />
          </Button>
        </header>

        <FindReplaceBar
          {...findReplace}
          open={findOpen}
          onClose={closeFindReplace}
          onShowReplace={() => setShowReplace(true)}
        />

        <HighlightedEditor
          content={content}
          onChange={handleContentChange}
          textareaRef={textareaRef}
          findText={findOpen ? findReplace.findText : ""}
          currentMatch={findReplace.currentMatch}
          caseSensitive={findReplace.caseSensitive}
        />
      </article>
    </div>
  );
}
