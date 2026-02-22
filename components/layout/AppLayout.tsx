import Header from "./Header";
import Sidebar from "./Sidebar";
import { NotesProvider } from "@/components/notes/NotesContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <NotesProvider>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="flex flex-1 min-h-0">
          <Sidebar />
          <main className="flex-1 min-w-0 flex flex-col min-h-0 border-l border-border overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </NotesProvider>
  );
}