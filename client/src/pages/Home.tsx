import { useState, useEffect } from "react";
import type { Post } from "../types/postTypes";
import { api } from "../api/auth";
import { PostCard } from "../components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await api.get<Post[]>("/api/posts");
      setPosts(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center pt-20">
      {loading && <p className="status">Loading posts...</p>}

      {error && <p className="status error">Error: {error}</p>}

      {!loading && posts.length === 0 && (
        <p className="status">No posts yet. Be the first!</p>
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}