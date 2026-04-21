
import type { Post } from "../types/postTypes";
import { Link } from "react-router-dom";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/post/${post.id}`} className="w-7/12">
      <article className="p-5 rounded-lg border border-edge-faint bg-bg-deep hover:bg-bg-surface transition-colors cursor-pointer w-full">

        <h2 className="text-xl font-serif text-ink-secondary">
          {post.post_title}
        </h2>


        <p className="mt-3 text-ink-subtle">
          {post.post}
        </p>

      </article>
    </Link>
  );
}