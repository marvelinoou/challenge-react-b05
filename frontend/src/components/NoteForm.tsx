// src/components/NoteForm.tsx
import { useState } from "react";
import { NOTE_CATEGORIES, type Note, type NoteCategory } from "../types/note";

interface NoteFormProps {
  onAdd: (note: Note) => void;
}

// Controlled form: setiap input dikendalikan useState lewat value + onChange
export function NoteForm({ onAdd }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<NoteCategory>("Kuliah");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah browser reload

    if (!title.trim()) return;

    onAdd({
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      category,
    });

    // Kosongkan form setelah submit
    setTitle("");
    setContent("");
    setCategory("Kuliah");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Tambah Catatan</h2>

      <label htmlFor="note-title">Judul</label>
      <input
        id="note-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul catatan"
        required
      />

      <label htmlFor="note-content">Isi</label>
      <textarea
        id="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Tulis isi catatan..."
        rows={3}
      />

      <label htmlFor="note-category">Kategori</label>
      <select
        id="note-category"
        value={category}
        onChange={(e) => setCategory(e.target.value as NoteCategory)}
      >
        {NOTE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit">Simpan</button>
    </form>
  );
}
