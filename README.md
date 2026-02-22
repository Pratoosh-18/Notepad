### Folder structure

```
notes-app/
│
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   │
│   ├── notes/                   # Notes routes
│   │   ├── page.tsx             # Notes list page
│   │   └── components/          # Route-specific components
│   │       ├── NoteList.tsx
│   │       └── NoteEditor.tsx
│   │
│   └── settings/                # Future scalability
│       └── page.tsx
│
├── components/                  # Shared reusable components
│   ├── ui/                      # shadcn components (auto-generated)
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── AppLayout.tsx
│   │
│   ├── notes/                   # Domain-based components
│   │   ├── NoteCard.tsx
│   │   ├── NoteToolbar.tsx
│   │   └── EmptyState.tsx
│
├── hooks/                       # Custom React hooks
│   ├── useNotes.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── lib/                         # Utilities & core logic
│   ├── storage/
│   │   └── notes.storage.ts     # LocalStorage logic
│   │
│   ├── utils.ts                 # cn(), helpers
│   └── constants.ts
│
├── store/                       # State management (if needed)
│   └── notes.store.ts           # Zustand (recommended)
│
├── types/                       # Global TypeScript types
│   └── note.ts
│
├── styles/
│   └── editor.css
│
└── public/
```

