import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/auth";
import type { Post } from "../types/postTypes";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

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
          <p className="text-ink-faint text-sm mt-2">
            Comments coming soon...
          </p>
        </div>

      </div>
    </div>
  );
}