export type NoteStatus = "active" | "completed";

export interface Note {
  id: string;
  title: string;
  content: string;
  status: NoteStatus;
  createdAt: string;
  updatedAt: string;
}

export const MOCK_NOTES: Note[] = [
  {
    id: "1",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "3",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "4",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "5",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
  {
    id: "6",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "7",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "8",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "9",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "10",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
  {
    id: "11",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "12",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "13",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "14",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "15",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
  {
    id: "16",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "17",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "18",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "19",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "20",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
  {
    id: "21",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "22",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "23",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "4",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "5",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
  {
    id: "1",
    title: "Welcome to Notepad",
    content:
      "This is your first note. You can select items from the sidebar to view their content here.\n\nTry clicking different notes in the sidebar to see how the main content updates.",
    status: "active",
    createdAt: "2025-02-20T10:00:00Z",
    updatedAt: "2025-02-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Project ideas",
    content:
      "- Build a task manager\n- Learn Next.js App Router\n- Add dark mode support\n- Export notes to Markdown",
    status: "active",
    createdAt: "2025-02-21T14:30:00Z",
    updatedAt: "2025-02-21T14:30:00Z",
  },
  {
    id: "25",
    title: "Meeting notes",
    content:
      "**Team sync – Feb 22**\n\n- Reviewed Q1 goals\n- Discussed new sidebar layout\n- Next: finalize constants and mock data",
    status: "active",
    createdAt: "2025-02-22T09:15:00Z",
    updatedAt: "2025-02-22T09:15:00Z",
  },
  {
    id: "24",
    title: "Completed: Setup",
    content: "Initial project setup is done. Dependencies installed, layout and theme configured.",
    status: "completed",
    createdAt: "2025-02-19T08:00:00Z",
    updatedAt: "2025-02-20T11:00:00Z",
  },
  {
    id: "26",
    title: "Quick reminder",
    content: "Don't forget to commit the constants file and sidebar integration.",
    status: "active",
    createdAt: "2025-02-22T12:00:00Z",
    updatedAt: "2025-02-22T12:00:00Z",
  },
];

export function getNoteById(id: string | null): Note | undefined {
  if (!id) return undefined;
  return MOCK_NOTES.find((note) => note.id === id);
}
