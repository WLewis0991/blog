import { JwtPayload } from "jsonwebtoken";

interface Register{
    username: string;
    password: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthUser extends JwtPayload {
  id: string;
  email: string;
}



export type {Register, User, AuthUser};
export type Login = Register;