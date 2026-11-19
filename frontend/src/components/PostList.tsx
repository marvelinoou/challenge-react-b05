// src/components/PostList.tsx
// Tahap 2: Integrasi REST API Modul 4 (GET, POST, DELETE + search ke backend)
import { useEffect, useState } from "react";
import { createPost, deletePost, getPosts } from "../services/postService";
import type { NewPost, Post } from "../types/post";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";

export function PostList() {
  // Pola standar fetch: data, isLoading, error
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // (Bonus) Fetch ulang setiap kali `search` berubah -> GET /api/posts?search=...
  useEffect(() => {
    let ignore = false; // cegah hasil fetch lama menimpa hasil terbaru

    // Tunggu user berhenti mengetik 400ms supaya tidak spam request
    const timer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPosts(search);
        if (!ignore) setPosts(data);
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }, 400);

    // Cleanup: batalkan timer & abaikan response lama
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [search, reloadKey]);

  // POST: tambahkan post baru ke state tanpa refresh halaman
  const handleCreate = async (newPost: NewPost) => {
    const created = await createPost(newPost);
    setPosts((prev) => [created, ...prev]);
  };

  // DELETE: hapus dari state setelah server berhasil menghapus
  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Gagal menghapus post");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="layout">
      <PostForm onSubmit={handleCreate} />

      <div>
        <div className="toolbar">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul post (dikirim ke backend)..."
          />
        </div>

        {isLoading ? (
          <p className="info">Memuat posts...</p>
        ) : error ? (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={() => setReloadKey((k) => k + 1)}>Coba lagi</button>
          </div>
        ) : posts.length === 0 ? (
          <p className="info">{search ? "Tidak ada post yang cocok." : "Belum ada post."}</p>
        ) : (
          <div className="grid">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDelete}
                isDeleting={deletingId === post.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
