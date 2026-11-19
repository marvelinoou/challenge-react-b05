// src/App.tsx
import { useState } from "react";
import { NotesBoard } from "./components/NotesBoard";
import { PostList } from "./components/PostList";

type Tab = "notes" | "posts";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("notes");

  return (
    <main className="container">
      <header>
        <h1>Challenge Praktikum Modul 5</h1>
        <nav className="tabs">
          <button
            className={activeTab === "notes" ? "active" : ""}
            onClick={() => setActiveTab("notes")}
          >
            Tahap 1: Catatan Lokal
          </button>
          <button
            className={activeTab === "posts" ? "active" : ""}
            onClick={() => setActiveTab("posts")}
          >
            Tahap 2: Posts (API)
          </button>
        </nav>
      </header>

      {activeTab === "notes" ? <NotesBoard /> : <PostList />}
    </main>
  );
}
