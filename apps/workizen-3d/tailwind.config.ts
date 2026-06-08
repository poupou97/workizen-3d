import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        workizen: {
          blue: "#2563EB",
          ai: "#22C55E",
          knowledge: "#F59E0B",
          opportunity: "#FB7185",
          compute: "#06B6D4",
          team: "#8B5CF6",
          plaza: "#F4D7A1",
          ink: "#0F172A"
        }
      },
      boxShadow: {
        panel: "0 24px 80px rgba(15, 23, 42, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
