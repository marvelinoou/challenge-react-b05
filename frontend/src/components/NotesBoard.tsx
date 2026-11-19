// src/components/NotesBoard.tsx
// Tahap 1: Papan Catatan Lokal (state + komponen + localStorage)
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { NOTE_CATEGORIES, type Note } from "../types/note";
import { NoteCard } from "./NoteCard";
import { NoteForm } from "./NoteForm";

export function NotesBoard() {
  // State utama disimpan di sini (Parent), lalu dikirim ke Child lewat props
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  // Tambah item secara immutable (jangan pakai push)
  const handleAdd = (note: Note) => {
    setNotes([note, ...notes]);
  };

  // Hapus item secara immutable dengan .filter()
  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Pencarian berdasarkan judul (+ filter kategori) memakai .filter()
  const filteredNotes = notes.filter((note) => {
    const matchTitle = note.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "Semua" || note.category === categoryFilter;
    return matchTitle && matchCategory;
  });

  return (
    <section className="layout">
      <NoteForm onAdd={handleAdd} />

      <div>
        <div className="toolbar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul catatan..."
          />
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="Semua">Semua kategori</option>
            {NOTE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <p className="muted">
          Menampilkan {filteredNotes.length} dari {notes.length} catatan
        </p>

        {notes.length === 0 ? (
          <p className="info">Belum ada catatan. Tambahkan lewat form di samping.</p>
        ) : filteredNotes.length === 0 ? (
          <p className="info">Tidak ada catatan yang cocok.</p>
        ) : (
          <div className="grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
