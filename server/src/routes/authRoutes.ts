import express, { Request, Response } from "express";
import { supabase } from "../config/supabaseClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Register, Login, User } from "../types/authTypes";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET variable not set");
}

router.post("/register", async (req: Request<{}, {}, Register>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const { data, error } = await supabase
      .schema("blog")
      .from("users")
      .insert({ username, password: hashedPassword })
      .select("id")
      .single();

    if (error) throw new Error(error.message);

    const token = jwt.sign({ userId: data.id }, JWT_SECRET, { expiresIn: "24h" });

    return res.status(201).json({ token });
  } catch (err) {
    if (err instanceof Error) console.error("[auth/register]", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req: Request<{}, {}, Login>, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  try {
    const { data, error } = await supabase
      .schema("blog")
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !data) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = data as User;

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });

    return res.json({ token });
  } catch (err) {
    if (err instanceof Error) console.error("[auth/login]", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;