import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/auth";
import type { Post } from "../types/postTypes";
import LoadingSpinner from "../components/LoadingSpinner";

type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  username: string;
  comment: string;
  created_at: string;
};

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get<Post>(`/api/posts/${id}`),
          api.get<Comment[]>(`/api/posts/${id}/comments`)
        ]);

        setPost(postRes.data);
        setComments(commentRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await api.post(
        `/api/posts/${id}/comments`,
        { comment: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  if (loading) return <div className="pt-4"> <LoadingSpinner /> <p>Loading...</p> </div>;
  if (!post) return <p className="text-red-400">Post not found</p>;

  return (
    <div className="min-h-dvh bg-bg-void text-ink-primary px-6 py-20">
      <div className="max-w-2xl mx-auto">

        {/* Post */}
        <h1 className="text-3xl font-serif text-ink-secondary">
          {post.post_title}
        </h1>

        <p className="mt-6 text-ink-subtle whitespace-pre-line">
          {post.post}
        </p>

        {/* Comments */}
        <div className="mt-10 border-t border-edge-faint pt-6">

          <h2 className="text-lg text-ink-secondary">
            Comments
          </h2>

          {/* Input */}
          {isLoggedIn ? (
            <div className="mt-4 flex flex-col gap-3">

              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the conversation..."
                className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
              />

              <button
                onClick={handleSubmitComment}
                className="self-end px-4 py-2 rounded-md bg-accent-horizon text-ink-primary hover:bg-accent-dusk transition-colors"
              >
                Submit
              </button>

            </div>
          ) : (
            <p className="text-ink-faint text-sm mt-2">
              Sign in to join the conversation.
            </p>
          )}

          {/* Comment list */}
          <div className="mt-6 space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-md border border-edge-faint bg-bg-deep"
              >
                <p className="text-ink-secondary text-sm">
                  {c.username}
                </p>

                <p className="text-ink-subtle mt-1">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}