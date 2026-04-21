import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { LogIn } from "../types/logIn";
import { register } from "../api/auth"; // adjust path

export default function Register() {
  const [user, setUser] = useState<LogIn>({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.username || !user.password) return;

    setError("");

    try {
      const data = await register(user.username, user.password); // axios call

      if (data?.token) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-void px-4">
      <div className="w-full max-w-sm rounded-xl border border-edge-faint bg-bg-deep p-6 shadow-lg shadow-black/40">

        <h1 className="text-ink-primary font-serif text-[2.3rem] leading-none">
          Create Account
        </h1>

        <p className="mt-2 text-ink-subtle text-sm">
          Join the system.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-accent-horizon py-2 text-ink-primary font-medium hover:bg-accent-dusk transition-colors"
          >
            Register
          </button>

        </form>

        <p className="mt-5 text-center text-xs text-ink-faint">
          Already have an account?{" "}
          <Link to="/login" className="text-ink-muted">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}