interface Register{
    username: string;
    password: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}


export type {Register, User};
export type Login = Register;