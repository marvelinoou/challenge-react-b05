// src/components/PostForm.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../services/postService";
import type { Author, NewPost } from "../types/post";

interface PostFormProps {
  onSubmit: (newPost: NewPost) => Promise<void>;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [users, setUsers] = useState<Author[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ambil daftar user sekali saat mount, untuk pilihan penulis (authorId wajib di Modul 4)
  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        if (data.length > 0) setAuthorId(String(data[0].id));
      })
      .catch(() => setUsers([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authorId) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({ title: title.trim(), content: content.trim(), authorId: Number(authorId) });
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Tambah Post</h2>

      <label htmlFor="post-title">Judul</label>
      <input
        id="post-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul post"
        required
      />

      <label htmlFor="post-content">Isi</label>
      <textarea
        id="post-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Isi post..."
        rows={3}
      />

      <label htmlFor="post-author">Penulis</label>
      <select
        id="post-author"
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
        required
      >
        {users.length === 0 && <option value="">Belum ada user</option>}
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name ?? user.email}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={isSubmitting || !authorId}>
        {isSubmitting ? "Menyimpan..." : "Kirim"}
      </button>
    </form>
  );
}
