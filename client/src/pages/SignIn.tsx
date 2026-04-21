import { Link } from "react-router-dom"

export default function SignIn(){

    return (<>
<div className="flex min-h-dvh items-center justify-center bg-bg-void px-4">
  <div className="w-full max-w-sm rounded-xl border border-edge-faint bg-bg-deep p-6 shadow-lg shadow-black/40">
    
    {/* Title */}
    <h1
      className="text-ink-primary font-serif select-none leading-none"
      style={{
        fontSize: "clamp(2rem, 4vw, 2.6rem)",
        letterSpacing: "-0.02em",
      }}
    >
      Sign In
    </h1>

    <p className="mt-2 text-ink-subtle text-sm">
      Welcome back!
    </p>

    <div className="mt-6 flex flex-col gap-4">
      
      <input
        type="text"
        placeholder="Username"
        className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full rounded-md bg-bg-surface border border-edge-base px-3 py-2 text-ink-primary placeholder:text-ink-faint outline-none focus:border-accent-dusk focus:ring-1 focus:ring-accent-glow"
      />

      <button className="mt-2 w-full rounded-md bg-accent-horizon py-2 text-ink-primary font-medium hover:bg-accent-dusk transition-colors">
        Sign In
      </button>

    </div>

    <p className="mt-5 text-center text-xs text-ink-faint">
      No account yet? <Link to="/register" className="text-ink-muted" >Sign up here.</Link>
    </p>
  </div>
</div>
    </>)
}