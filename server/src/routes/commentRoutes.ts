import express from "express";
import db from "../config/db";
import type { NewComment, Comment } from "../types/commentTypes";
import { authMiddleware } from "../middleware/middleware";
import { Request, Response } from "express";

const router = express.Router()

router.post("/:postId/comments", authMiddleware, async (req:Request, res:Response) => {
  const { postId } = req.params;
  const { comment } = req.body as NewComment;
  const userId = req.user?.userId ?? null;

  if (!comment) {
    return res.status(400).json({message: "Dont forget to leave a comment!"})
  }

  if (!userId) {
    return res.status(401).json({error:"Missing userId from token"});
  }

  try {
    const result = await db.query(
      `INSERT INTO comments (post_id, user_id, comment)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [postId, userId, comment]
    );

    res.status(201).json(result.rows[0]);
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
    const result = await db.query<Comment>(
      `SELECT comments.*, users.username 
       FROM comments 
       INNER JOIN users ON users.id = comments.user_id 
       WHERE comments.post_id = $1
       ORDER BY comments.created_at DESC`,
      [postId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

export default router;