import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { LogIn } from "../types/logIn";
import { login } from "../api/auth";

export default function SignIn() {
  const [user, setUser] = useState<LogIn>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { username, password } = user;

    if (!username || !password) return;

    setError("");

    try {
      const data = await login(username, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-void px-4">
      <div className="w-full max-w-sm rounded-xl border border-edge-faint bg-bg-deep p-6 shadow-lg shadow-black/40">

        <h1
          className="text-ink-primary font-serif leading-none select-none"
          style={{
            fontSize: "clamp(2rem, 4vw, 2.6rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Log In
        </h1>

        <p className="mt-2 text-ink-subtle text-sm">
          Welcome back!
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
            onChange={handleNameChange}
            value={user.username}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
            onChange={handlePasswordChange}
            value={user.password}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="mt-2 w-full rounded-md bg-accent-horizon py-2 text-ink-primary font-medium hover:bg-accent-dusk transition-colors"
          >
            Sign In
          </button>

        </form>

        <p className="mt-5 text-center text-xs text-ink-faint">
          No account yet?{" "}
          <Link to="/register" className="text-ink-muted">
            Sign up here.
          </Link>
        </p>
      </div>
    </div>
  );
}