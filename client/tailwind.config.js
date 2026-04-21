/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"], // make sure jsx is included if needed
  theme: {
    extend: {
      colors: {
        // keep your existing colors if any, then add this:

        bg: {
          void: "#070a11",
          deep: "#0b1020",
          surface: "#111827",
          elevated: "#1a2436",
          muted: "#1f2d40",
        },

        ink: {
          primary: "#e8f0fa",
          secondary: "#c8daf0",
          muted: "#7fa3cc",
          subtle: "#5a7290",
          faint: "#3d4f66",
        },

        accent: {
          star: "#a8c4e8",
          glow: "#5a8cc2",
          dusk: "#3d6080",
          horizon: "#2a4a6b",
        },

        edge: {
          faint: "#1e3048",
          base: "#2a3d55",
          strong: "#3a4a5e",
          glow: "#0e2040",
        },
      },

      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        body: ["Crimson Pro", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      letterSpacing: {
        eyebrow: "0.35em",
        button: "0.28em",
        label: "0.18em",
      },
    },
  },
  plugins: [],
};