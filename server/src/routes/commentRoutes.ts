import express from "express";
import { supabase } from "../config/supabaseClient";
import type { NewComment, Comment } from "../types/commentTypes";
import { authMiddleware } from "../middleware/middleware";
import { Request, Response } from "express";

const router = express.Router();

router.post("/:postId/comments", authMiddleware, async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { comment } = req.body as NewComment;
  const userId = req.user?.userId ?? null;

  if (!comment) {
    return res.status(400).json({ message: "Dont forget to leave a comment!" });
  }

  if (!userId) {
    return res.status(401).json({ error: "Missing userId from token" });
  }

  try {
    const { data, error } = await supabase
      .schema("blog")
      .from("comments")
      .insert({ post_id: postId, user_id: userId, comment })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

router.get("/:postId/comments", async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId as string);

  if (!postId) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const { data, error } = await supabase
      .schema("blog")
      .from("comments")
      .select(`*, users(username)`)
      .eq("post_id", postId)
      .order("created_at", { ascending: false })
      .returns<Comment[]>();

    if (error) return res.status(500).json({ error: error.message });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

export default router;