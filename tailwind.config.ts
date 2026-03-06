import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#F7F9FC", // Extremely clean, premium light slate-gray
          surface: "#FFFFFF",
          elevated: "#FFFFFF",
          overlay: "rgba(0, 0, 0, 0.15)", // Stronger backdrop blur tint
        },
        border: {
          default: "rgba(0, 0, 0, 0.08)", // Translucent, premium borders that adapt
          subtle: "rgba(0, 0, 0, 0.04)",
          hover: "rgba(0, 0, 0, 0.12)",
        },
        text: {
          primary: "#111827", // Gray 900
          secondary: "#4B5563", // Gray 600
          tertiary: "#9CA3AF", // Gray 400
          disabled: "#D1D5DB", // Gray 300
        },
        accent: {
          blue: "#0070F3",   // Vivid Vercel-like Blue
          indigo: "#6366F1", // Indigo 500
          green: "#10B981",  // Emerald 500
          rose: "#F43F5E",   // Rose 500
          yellow: "#F59E0B"  // Amber 500
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        // Ultra-soft, diffuse shadows since borders are removed
        soft: "0 4px 20px rgba(0, 0, 0, 0.03)",
        elevated: "0 10px 40px rgba(0, 0, 0, 0.06)",
        floating: "0 20px 60px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "count-up": "count-up 1s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
