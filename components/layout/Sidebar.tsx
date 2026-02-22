"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { MOCK_NOTES } from "@/lib/constants";

export default function Sidebar() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("note");

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-muted/30 overflow-y-auto">
      <div className="p-3 border-b border-border">
        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider px-2">
          Notes
        </h2>
      </div>
      <nav className="flex flex-col p-2 gap-0.5">
        {MOCK_NOTES.map((note) => {
          const isActive = selectedId === note.id;
          return (
            <Link
              key={note.id}
              href={`/?note=${note.id}`}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <span className="block truncate">{note.title}</span>
              {note.status === "completed" && (
                <span className="text-xs text-muted-foreground/80">Done</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
