// src/services/postService.ts
// Semua fungsi fetch ke backend Modul 4 dikumpulkan di sini
import type { ApiResponse, Author, NewPost, Post } from "../types/post";

const API_URL = "http://localhost:3000/api";

// Helper: kirim request, cek res.ok, lalu kembalikan field `data`
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    // fetch() hanya gagal (reject) kalau server tidak bisa dihubungi / diblokir CORS
    throw new Error("Tidak bisa terhubung ke server. Pastikan backend sudah dinyalakan.");
  }

  const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

  if (!res.ok) {
    throw new Error(json?.message ?? `Request gagal (status ${res.status})`);
  }

  return json!.data;
}

// GET /api/posts?search=...
export function getPosts(search: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return request<Post[]>(`/posts${query}`);
}

// POST /api/posts
export function createPost(newPost: NewPost) {
  return request<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
  });
}

// DELETE /api/posts/:id
export function deletePost(id: number) {
  return request<undefined>(`/posts/${id}`, { method: "DELETE" });
}

// GET /api/users (dipakai untuk memilih penulis/authorId di form)
export function getUsers() {
  return request<Author[]>("/users");
}
