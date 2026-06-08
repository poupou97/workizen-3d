import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        plaza: "#F5F0E6",
        mint: "#B8F2D0",
        coral: "#FF8E72",
        sky: "#8EC5FF",
        violet: "#A994FF"
      },
      boxShadow: {
        panel: "0 24px 80px rgba(23, 32, 42, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
