// src/types/note.ts

// Pilihan kategori dibuat tetap supaya bisa dipakai di <select> dan filter
export const NOTE_CATEGORIES = ["Kuliah", "Pribadi", "Kerja", "Lainnya"] as const;

export type NoteCategory = (typeof NOTE_CATEGORIES)[number];

export interface Note {
  id: number;
  title: string;
  content: string;
  category: NoteCategory;
}
