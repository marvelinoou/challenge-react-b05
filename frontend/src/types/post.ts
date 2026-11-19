// src/types/post.ts
// Bentuk data mengikuti response API Express + Prisma dari Modul 4

export interface Author {
  id: number;
  name: string | null;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  views: number;
  authorId: number;
  createdAt: string;
  author: Author;
}

// Data yang dikirim saat POST /api/posts
export interface NewPost {
  title: string;
  content: string;
  authorId: number;
}

// Format response dari helper sendSuccess() di Modul 4
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  metadata?: Record<string, unknown>;
}
