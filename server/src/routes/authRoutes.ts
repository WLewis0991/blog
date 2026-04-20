import express, { Request, Response } from "express";
import db from "../config/db"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { Register, Login, User } from "../types/authTypes";

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET) {
    throw new Error("JWT_SECRET variable not set")
}

//Register users with hashed password
router.post("/register", async ( req: Request<{}, {}, Register >, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Username and password are require"});
    }

    try{
        const hashedPassword = bcrypt.hashSync(password, 10);
        const insertedUserResult = await db.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, hashedPassword]
        );

        const userId = insertedUserResult.rows[0]?.id;
        if (!userId) {
            throw new Error("Failed to create user");
        }

        const token = jwt.sign(
            {userId},
            JWT_SECRET,
            { expiresIn: "24h"}
        );

        return res.status(201).json({token});
    } catch (err) {
        if (err instanceof Error) {
            console.error("[auth/register]", err.message)
        }
        return res.status(500).json({message: "Internal server error"});
    }
})

router.post("/login", async (req: Request<{}, {}, Login>, res: Response) =>{
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "Username and password required"})
    }

    try{
        const userResult = await db.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
        const user = userResult.rows[0] as User | undefined;

        if (!user) {
            return res.status(401).json({message: "User not found"})
        }

        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: "Invalid password"})
        }

        const token = jwt.sign(
            { userId: user.id },
            JWT_SECRET,
            { expiresIn: "24h" }
        );
        return res.json({token});
    } catch (err) {
        if (err instanceof Error){
            console.error("[auth/login]", err.message);
        }
        return res.status(500).json({message: "Internal server error"})
    }
});

export default router;