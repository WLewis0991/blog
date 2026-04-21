import type { Post } from "../types/postTypes";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="text-ink-secondary ">
      <h2>{post.post_title}</h2>
      <p>{post.post}</p>
    </div>
  );
}