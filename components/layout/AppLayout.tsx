import { Suspense } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Suspense fallback={<aside className="w-56 shrink-0 border-r border-border bg-muted/30 animate-pulse" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 min-w-0 overflow-auto border-l border-border">
          {children}
        </main>
      </div>
    </div>
  );
}