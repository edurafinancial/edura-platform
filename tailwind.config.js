/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Edura brand palette
        navy: {
          DEFAULT: "#1B2A4A",
          50: "#F2F4F8",
          100: "#DDE2EC",
          200: "#B8C2D6",
          300: "#8895B4",
          400: "#54648C",
          500: "#33436B",
          600: "#1B2A4A",
          700: "#15213A",
          800: "#0F192B",
          900: "#0A111D",
        },
        teal: {
          DEFAULT: "#2A9D8F",
          50: "#EFF9F7",
          100: "#D3F0EB",
          200: "#A5E0D7",
          300: "#6FCBBE",
          400: "#41B2A3",
          500: "#2A9D8F",
          600: "#217E73",
          700: "#1A6259",
          800: "#134741",
          900: "#0D302C",
        },
        gold: {
          DEFAULT: "#E9C46A",
          50: "#FDF8EC",
          100: "#FAEECF",
          200: "#F4DFA6",
          300: "#E9C46A",
          400: "#DDAE41",
          500: "#C7942A",
          600: "#A17520",
          700: "#7B591A",
          800: "#553D13",
          900: "#33250C",
        },
        cream: "#FAFAF7",

        // shadcn/ui semantic tokens (driven by CSS variables in index.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          border: "hsl(var(--sidebar-border))",
        },
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
