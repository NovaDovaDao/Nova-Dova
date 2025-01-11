import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#0a0014",
          darker: "#050007",
          blue: "#4B6BFF",
          purple: "#9C6BFF",
          accent: "#00fff9",
        },
      },
      animation: {
        "neon-pulse": "neon-pulse 2s infinite",
        "neon-glow": "neon-glow 3s infinite",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "neon-glow": {
          "0%, 100%": {
            "text-shadow":
              "0 0 7px rgba(75,107,255,0.3), 0 0 10px rgba(156,107,255,0.3)",
          },
          "50%": {
            "text-shadow":
              "0 0 14px rgba(75,107,255,0.5), 0 0 20px rgba(156,107,255,0.5)",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
