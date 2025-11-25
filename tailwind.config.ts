import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Inter', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontSize: {
        'display-large': ['7rem', { lineHeight: '0.9', letterSpacing: '-0.04em', fontWeight: '400' }],
        'display': ['5.5rem', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '400' }],
        'display-medium': ['4rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'title-large': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '400' }],
        'title': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-large': ['1.375rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.005em', fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
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
        // NESS PRO Brand Colors
        charcoal: "hsl(var(--charcoal))",
        pearl: "hsl(var(--pearl))",
        graphite: "hsl(var(--graphite))",
        silver: "hsl(var(--silver))",
        platinum: "hsl(var(--platinum))",
        whisper: "hsl(var(--whisper))",
        // Energy colors  
        energy: {
          DEFAULT: "hsl(var(--energy-core))",
          bright: "hsl(var(--energy-bright))",
          dark: "hsl(var(--energy-core))",
          light: "hsl(var(--energy-subtle))",
          glow: "hsl(var(--energy-glow))",
        },
        // Brand gradient colors
        "brand-glow": "hsl(var(--brand-glow))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "var(--radius-lg)",
        "2xl": "var(--radius-xl)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px) scale(0.98)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)"
          }
        },
        "premium-float": {
          "0%, 100%": {
            transform: "translateY(0px)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        "slide-down": {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0"
          },
          "50%": {
            opacity: "1"
          },
          "100%": {
            transform: "translateY(100%)",
            opacity: "0"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "fade-up": "fade-in-up 0.8s ease-out forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "premium-float": "premium-float 6s ease-in-out infinite",
        "slide-down": "slide-down 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
