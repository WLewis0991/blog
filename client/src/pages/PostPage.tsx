import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/auth";
import type { Post } from "../types/postTypes";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get<Post>(`/api/posts/${id}`);
        setPost(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-ink-subtle">Loading...</p>;
  if (!post) return <p className="text-red-400">Post not found</p>;

  return (
    <div className="min-h-dvh bg-bg-void text-ink-primary px-6 py-20 ">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-serif text-ink-secondary">
          {post.post_title}
        </h1>

        <p className="mt-6 text-ink-subtle whitespace-pre-line">
          {post.post}
        </p>

        {/* Comments section placeholder */}
        <div className="mt-10 border-t border-edge-faint pt-6">
        <h2 className="text-lg text-ink-secondary">Comments</h2>

        {isLoggedIn ? (
            <div className="mt-4 flex flex-col gap-3">

            <textarea
                placeholder="Join the conversation..."
                className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
            />

            <button className="self-end px-4 py-2 rounded-md bg-accent-horizon text-ink-primary hover:bg-accent-dusk transition-colors">
                Submit
            </button>

            </div>
        ) : (
            <p className="text-ink-faint text-sm mt-2">
            Sign in to join the conversation.
            </p>
        )}
        </div>

      </div>
    </div>
  );
}