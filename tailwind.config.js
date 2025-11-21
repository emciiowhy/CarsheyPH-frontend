// frontend/tailwind.config.js
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "system-ui",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },

      /* ------------------------------------------------------------------
       *  UPDATED COLOR SYSTEM (Stripe / Linear / Apple inspired)
       *  Adds missing tokens to fix errors without breaking your setup
       * ------------------------------------------------------------------*/
      colors: {
        /* Neutral Foundation */
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        surface: "hsl(var(--surface))",
        surface2: "hsl(var(--surface-2))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",

        /* ----- Added Surface Steps (Required for your buttons) ----- */
        "surface-100": "hsl(var(--surface-100))",
        "surface-200": "hsl(var(--surface-200))",
        "surface-300": "hsl(var(--surface-300))",

        /* ----- BRAND SYSTEM ----- */
        brand: {
          DEFAULT: "hsl(var(--brand))",
          hover: "hsl(var(--brand-hover))",
          foreground: "hsl(var(--brand-foreground))",
        },

        /* ACCENT */
        accent: {
          DEFAULT: "hsl(var(--accent))",
          hover: "hsl(var(--accent-hover))",
        },

        /* PRIMARY (Stripe-like main CTA system) */
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",

        /* CTA (used in your new design system) */
        cta: {
          DEFAULT: "hsl(var(--cta))",
          hover: "hsl(var(--cta-hover))",
        },
      },

      /* Radius System (Preserved) */
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "14px",
        lg: "18px",
        xl: "24px",
      },

      /* Shadow Tokens (Preserved) */
      boxShadow: {
        soft: "0 4px 16px rgba(0,0,0,0.06)",
        medium: "0 8px 28px rgba(0,0,0,0.08)",
        strong: "0 12px 48px rgba(0,0,0,0.12)",
      },
    },
  },

  plugins: [],
};
