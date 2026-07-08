"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { buildHighlightSegments } from "@/lib/find-replace";
import { cn } from "@/lib/utils";

const EDITOR_CLASSES =
  "w-full prose prose-sm dark:prose-invert max-w-none text-foreground font-medium whitespace-pre-wrap break-words";

type HighlightedEditorProps = {
  content: string;
  onChange: (value: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  findText: string;
  currentMatch: number;
  caseSensitive: boolean;
  placeholder?: string;
};

export default function HighlightedEditor({
  content,
  onChange,
  textareaRef,
  findText,
  currentMatch,
  caseSensitive,
  placeholder = "Start writing...",
}: HighlightedEditorProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const highlightsActive = findText.length > 0;

  const segments = useMemo(
    () => buildHighlightSegments(content, findText, caseSensitive, currentMatch),
    [content, findText, caseSensitive, currentMatch]
  );

  const syncScroll = useCallback(() => {
    const textarea = textareaRef.current;
    const backdrop = backdropRef.current;
    if (!textarea || !backdrop) return;
    backdrop.scrollTop = textarea.scrollTop;
    backdrop.scrollLeft = textarea.scrollLeft;
  }, [textareaRef]);

  const scrollToCurrentMatch = useCallback(() => {
    const textarea = textareaRef.current;
    const backdrop = backdropRef.current;
    if (!textarea || !backdrop || !highlightsActive) return;

    const currentMark = backdrop.querySelector<HTMLElement>('[data-current-match="true"]');
    if (!currentMark) return;

    const backdropTop = backdrop.getBoundingClientRect().top;
    const markTop = currentMark.getBoundingClientRect().top;
    const offset = markTop - backdropTop + backdrop.scrollTop;
    textarea.scrollTop = Math.max(0, offset - textarea.clientHeight / 3);
    backdrop.scrollTop = textarea.scrollTop;
  }, [highlightsActive, textareaRef]);

  useEffect(() => {
    scrollToCurrentMatch();
  }, [currentMatch, findText, content, scrollToCurrentMatch]);

  return (
    <div className="relative flex-1 min-h-0 w-full">
      {highlightsActive && (
        <div
          ref={backdropRef}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 overflow-auto p-0",
            EDITOR_CLASSES
          )}
        >
          <div className="min-h-full">
            {segments.map((segment, index) => {
              if (segment.kind === "text") {
                return <span key={index}>{segment.text}</span>;
              }

              return (
                <mark
                  key={index}
                  data-current-match={segment.kind === "current" ? "true" : undefined}
                  className={cn(
                    "rounded-sm px-0 text-foreground",
                    segment.kind === "current"
                      ? "bg-primary/45 ring-2 ring-primary/80 ring-offset-1 ring-offset-background dark:bg-primary/55"
                      : "bg-yellow-300/55 dark:bg-yellow-400/30"
                  )}
                >
                  {segment.text}
                </mark>
              );
            })}
            {content.endsWith("\n") ? <br /> : null}
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
        className={cn(
          "absolute inset-0 min-h-0 resize-none overflow-auto border-none bg-transparent p-0 outline-none focus:ring-0 placeholder:text-muted-foreground",
          EDITOR_CLASSES,
          highlightsActive && "text-transparent caret-foreground selection:bg-primary/20"
        )}
        placeholder={placeholder}
        spellCheck={false}
      />
    </div>
  );
}
