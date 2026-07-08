"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Replace, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { escapeRegExp, getMatchIndices } from "@/lib/find-replace";

type UseFindReplaceOptions = {
  content: string;
  onContentChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  open: boolean;
  showReplace: boolean;
  initialFind?: string;
};

export function useFindReplace({
  content,
  onContentChange,
  textareaRef,
  open,
  showReplace,
  initialFind = "",
}: UseFindReplaceOptions) {
  const [findText, setFindText] = useState(initialFind);
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(0);

  const matchIndices = useMemo(
    () => getMatchIndices(content, findText, caseSensitive),
    [content, findText, caseSensitive]
  );

  useEffect(() => {
    if (!open) return;
    setFindText(initialFind);
    setCurrentMatch(0);
  }, [open, initialFind]);

  useEffect(() => {
    if (matchIndices.length === 0) {
      setCurrentMatch(0);
      return;
    }
    setCurrentMatch((prev) => Math.min(prev, matchIndices.length - 1));
  }, [matchIndices]);

  const goToMatch = useCallback(
    (direction: 1 | -1) => {
      if (matchIndices.length === 0) return;
      setCurrentMatch((prev) => {
        const next = prev + direction;
        if (next < 0) return matchIndices.length - 1;
        if (next >= matchIndices.length) return 0;
        return next;
      });
      textareaRef.current?.focus();
    },
    [matchIndices.length, textareaRef]
  );

  const handleReplace = useCallback(() => {
    if (!findText || matchIndices.length === 0) return;

    const start = matchIndices[currentMatch];
    const end = start + findText.length;
    const nextContent = content.slice(0, start) + replaceText + content.slice(end);

    onContentChange(nextContent);

    const nextIndices = getMatchIndices(nextContent, findText, caseSensitive);
    if (nextIndices.length === 0) {
      setCurrentMatch(0);
      return;
    }

    setCurrentMatch((prev) => Math.min(prev, nextIndices.length - 1));
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [
    caseSensitive,
    content,
    currentMatch,
    findText,
    matchIndices,
    onContentChange,
    replaceText,
    textareaRef,
  ]);

  const handleReplaceAll = useCallback(() => {
    if (!findText) return;
    const flags = caseSensitive ? "g" : "gi";
    const pattern = new RegExp(escapeRegExp(findText), flags);
    onContentChange(content.replace(pattern, replaceText));
    setCurrentMatch(0);
  }, [caseSensitive, content, findText, onContentChange, replaceText]);

  return {
    findText,
    setFindText,
    replaceText,
    setReplaceText,
    caseSensitive,
    setCaseSensitive,
    currentMatch,
    setCurrentMatch,
    matchIndices,
    goToMatch,
    handleReplace,
    handleReplaceAll,
    showReplace,
  };
}

type FindReplaceBarProps = ReturnType<typeof useFindReplace> & {
  open: boolean;
  onClose: () => void;
  onShowReplace?: () => void;
};

export function FindReplaceBar({
  open,
  findText,
  setFindText,
  replaceText,
  setReplaceText,
  caseSensitive,
  setCaseSensitive,
  currentMatch,
  setCurrentMatch,
  matchIndices,
  goToMatch,
  handleReplace,
  handleReplaceAll,
  showReplace,
  onClose,
  onShowReplace,
}: FindReplaceBarProps) {
  const findInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const input = showReplace ? replaceInputRef.current : findInputRef.current;
    input?.focus();
    input?.select();
  }, [open, showReplace]);

  const handleFindKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToMatch(e.shiftKey ? -1 : 1);
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  const handleReplaceKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleReplaceAll();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!open) return null;

  const statusText =
    findText.length === 0
      ? ""
      : matchIndices.length === 0
        ? "No matches"
        : showReplace
          ? `Replacing match ${currentMatch + 1} of ${matchIndices.length}`
          : `${currentMatch + 1} of ${matchIndices.length}`;

  return (
    <div className="shrink-0 mb-4 rounded-lg border border-border bg-muted/40 p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex min-w-[180px] flex-1 items-center gap-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={findInputRef}
            value={findText}
            onChange={(e) => {
              setFindText(e.target.value);
              setCurrentMatch(0);
            }}
            onKeyDown={handleFindKeyDown}
            placeholder="Find..."
            className="h-8 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          />
        </div>

        {showReplace && (
          <div className="flex min-w-[180px] flex-1 items-center gap-2">
            <Replace className="size-4 shrink-0 text-muted-foreground" />
            <input
              ref={replaceInputRef}
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              onKeyDown={handleReplaceKeyDown}
              placeholder="Replace with..."
              className="h-8 w-full min-w-0 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            />
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => goToMatch(-1)}
            disabled={!findText || matchIndices.length === 0}
            title="Previous match (Shift+Enter)"
          >
            <ChevronUp />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={() => goToMatch(1)}
            disabled={!findText || matchIndices.length === 0}
            title="Next match (Enter)"
          >
            <ChevronDown />
          </Button>

          {showReplace && (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReplace}
                disabled={!findText || matchIndices.length === 0}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReplaceAll}
                disabled={!findText || matchIndices.length === 0}
              >
                All
              </Button>
            </>
          )}

          {!showReplace && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onShowReplace}
              title="Find and replace (⌘H)"
              className="hidden sm:inline-flex"
            >
              Replace
            </Button>
          )}

          <Button
            type="button"
            variant={caseSensitive ? "secondary" : "outline"}
            size="sm"
            onClick={() => setCaseSensitive((value) => !value)}
            title="Match case"
            className="px-2 font-mono text-xs"
          >
            Aa
          </Button>

          <Button type="button" variant="ghost" size="icon-sm" onClick={onClose} title="Close (Esc)">
            <X />
          </Button>
        </div>
      </div>

      {statusText && (
        <p
          className={cn(
            "mt-2 text-xs",
            matchIndices.length === 0 ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {statusText}
        </p>
      )}

      {findText && matchIndices.length > 0 && (
        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-sm bg-yellow-300/55 dark:bg-yellow-400/30" />
            Other matches
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-5 rounded-sm bg-primary/45 ring-2 ring-primary/80" />
            Active match
          </span>
        </div>
      )}
    </div>
  );
}

export function useFindReplaceShortcut(
  enabled: boolean,
  onOpen: (options: { showReplace: boolean; initialFind?: string }) => void,
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;
      if (!isMod) return;

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        const textarea = textareaRef.current;
        const selection =
          textarea && textarea.selectionStart !== textarea.selectionEnd
            ? textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
            : undefined;
        onOpen({ showReplace: false, initialFind: selection });
      }

      if (e.key.toLowerCase() === "h") {
        e.preventDefault();
        const textarea = textareaRef.current;
        const selection =
          textarea && textarea.selectionStart !== textarea.selectionEnd
            ? textarea.value.slice(textarea.selectionStart, textarea.selectionEnd)
            : undefined;
        onOpen({ showReplace: true, initialFind: selection });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onOpen, textareaRef]);
}
