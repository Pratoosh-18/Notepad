import { getNoteById } from "@/lib/constants";

interface HomeProps {
  searchParams: Promise<{ note?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const noteId = params?.note ?? null;
  const note = getNoteById(noteId);

  return (
    <div className="flex flex-col h-full">
      {note ? (
        <article className="p-6 max-w-3xl">
          <header className="mb-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              {note.title}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {new Date(note.updatedAt).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })}
              {note.status === "completed" && (
                <span className="ml-2 rounded bg-muted px-1.5 py-0.5 text-xs">
                  Completed
                </span>
              )}
            </p>
          </header>
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground whitespace-pre-wrap">
            {note.content}
          </div>
        </article>
      ) : (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="text-center text-muted-foreground max-w-sm">
            <p className="font-medium text-foreground mb-1">No note selected</p>
            <p className="text-sm">
              Choose a note from the sidebar to view its content here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
