// src/components/NoteCard.tsx
import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <h3>{note.title}</h3>
        <span className="badge">{note.category}</span>
      </div>
      {note.content && <p>{note.content}</p>}
      <button className="danger" onClick={() => onDelete(note.id)}>
        Hapus
      </button>
    </article>
  );
}
