import express, { response } from "express";
import db from "../config/db"
import type { NewPost, Post } from "../types/postTypes";
import { authMiddleware } from "../middleware/middleware";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response ) => {
    const { post, post_title} = req.body as NewPost;
    const userId = req.user?.userId ?? null;

    if (!post) {
        return res.status(400).json({message: "Dont forget to post something!!"})
    }

    if (!userId) {
        return res.status(401).json({ error:"Missing userId from token"});
    }

    const result = await db.query<{id:number}> (
        "INSERT INTO posts (user_id, post, post_title) VALUES ($1, $2, $3) RETURNING id",
        [userId, post, post_title]
    );

    res.json({
        id: result.rows[0].id,
        user_id: userId,
        post_title,
        post,
    });
})

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.query(
      `SELECT posts.*, users.username
       FROM posts
       INNER JOIN users ON users.id = posts.user_id
       ORDER BY posts.created_at DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

export default router;