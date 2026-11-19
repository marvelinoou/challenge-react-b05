// src/components/PostCard.tsx
import type { Post } from "../types/post";

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function PostCard({ post, onDelete, isDeleting }: PostCardProps) {
  return (
    <article className="card">
      <div className="card-header">
        <h3>{post.title}</h3>
        <span className="badge">{post.published ? "Terbit" : "Draft"}</span>
      </div>
      {post.content && <p>{post.content}</p>}
      <p className="muted">
        Penulis: {post.author?.name ?? "Anonim"} • {post.views} kali dilihat
      </p>
      <button className="danger" onClick={() => onDelete(post.id)} disabled={isDeleting}>
        {isDeleting ? "Menghapus..." : "Hapus"}
      </button>
    </article>
  );
}
