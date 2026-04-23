import express from "express";
import { supabase } from "../config/supabaseClient";
import type { NewPost } from "../types/postTypes";
import { authMiddleware } from "../middleware/middleware";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { post, post_title } = req.body as NewPost;
  const userId = req.user?.userId ?? null;

  if (!post) {
    return res.status(400).json({ message: "Dont forget to post something!!" });
  }

  if (!userId) {
    return res.status(401).json({ error: "Missing userId from token" });
  }

  const { data, error } = await supabase
    .schema("blog")
    .from("posts")
    .insert({ user_id: userId, post, post_title })
    .select("id")
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    id: data.id,
    user_id: userId,
    post_title,
    post,
  });
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .schema("blog")
      .from("posts")
      .select(`*, users(username)`)
      .order("created_at", { ascending: false });


    if (error) {
      console.error("Supabase error:", error) 
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("blog")
      .from("posts")
      .select(`*, users(username)`)
      .eq("id", id)
      .single();

    if (error) return res.status(404).json({ error: "Post not found" });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

export default router;