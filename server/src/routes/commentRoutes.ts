import express from "express";
import db from "../config/db";
import type { NewComment } from "../types/commentTypes";
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

export default router;