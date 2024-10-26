import { plugin } from "postcss";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "8xl": "1920px",
    },
    colors: {
      white: {
        0: "#ffffff",
        opacity: {
          12: "rgba(255,255,255,0.12)",
          25: "rgba(255,255,255,0.25)",
          37: "rgba(255,255,255,0.37)",
          50: "rgba(255,255,255,0.5)",
          62: "rgba(255,255,255,0.62)",
          75: "rgba(255,255,255,0.75)",
          87: "rgba(255,255,255,0.87)",
        },
      },
      black: {
        0: "#000000",
        opacity: {
          12: "rgba(0,0,0,0.12)",
          25: "rgba(0,0,0,0.25)",
          37: "rgba(0,0,0,0.37)",
          50: "rgba(0,0,0,0.5)",
          62: "rgba(0,0,0,0.62)",
          75: "rgba(0,0,0,0.75)",
          87: "rgba(0,0,0,0.87)",
          100: "rgba(0,0,0,1)",
        },
      },
      gray: {
        minus: {
          58: "rgba(249,249,250,1.0)",
          54: "rgba(237,238,239,1.0)",
          50: "rgba(225,227,229,1.0)",
          45: "rgba(209,211,213,1.0)",
          40: "rgba(195,197,199,1.0)",
          30: "rgba(176,177,178,1.0)",
          20: "rgba(154,155,157,1.0)",
          10: "rgba(132,134,136,1.0)",
        },
        0: "rgba(116,118,119,1.0)",
        plus: {
          10: "rgba(100,101,103,1.0)",
          20: "rgba(84,85,87,1.0)",
          30: "rgba(68,69,70,1.0)",
          40: "rgba(54,55,56,1.0)",
          45: "rgba(42,42,43,1.0)",
          50: "rgba(32,33,34,1.0)",
          54: "rgba(19,20,20,1.0)",
          58: "rgba(6,7,7,1.0)",
        },
      },
      yellow: {
        minus: {
          58: "#fffed5",
          54: "#fffead",
          50: "#fffd71",
          45: "#fffc00",
          40: "#ffeb01",
          30: "#ffd201",
          20: "#edb701",
          10: "#c59301",
        },
        0: "#9e6f00",
        plus: {
          10: "#7e5901",
          20: "#6f4e01",
          30: "#5b4101",
          40: "#463301",
          45: "#3c2801",
          50: "#2d1e01",
          54: "#201a04",
          58: "#161304",
        },
      },
      red: {
        minus: {
          58: "#fff7f8",
          54: "#fbe4ec",
          50: "#ffd6dd",
          45: "#ffc2cc",
          40: "#ffadbb",
          30: "#ff8fa2",
          20: "#f96c84",
          10: "#ed4964",
        },
        0: "#dc2e4b",
        plus: {
          10: "#c3343e",
          20: "#a81a32",
          30: "#8b0e23",
          40: "#6e0c1d",
          45: "#5f0716",
          50: "#48040f",
          54: "#2b0209",
          58: "#0e0103",
        },
      },
      orange: {
        minus: {
          58: "#fff8f4",
          54: "#fee9df",
          50: "#fddac9",
          45: "#fdccb4",
          40: "#ffb18a",
          30: "#ff966a",
          20: "#ff6d24",
          10: "#ef5001",
        },
        0: "#d03c01",
        plus: {
          10: "#bc3001",
          20: "#a22901",
          30: "#832201",
          40: "#6a1b01",
          45: "#561501",
          50: "#460f01",
          54: "#2a0901",
          58: "#0e0300",
        },
      },
      green: {
        minus: {
          58: "#f1fbf7",
          54: "#d6f4e8",
          50: "#baedd8",
          45: "#92e3c1",
          40: "#6ed8ac",
          30: "#39ca8e",
          20: "#2ead78",
          10: "#1a9964",
        },
        0: "#018850",
        plus: {
          10: "#007544",
          20: "#006139",
          30: "#015130",
          40: "#014126",
          45: "#01321e",
          50: "#012818",
          54: "#01180e",
          58: "#000805",
        },
      },
      blue: {
        minus: {
          58: "#f2fbff",
          54: "#d7f2ff",
          50: "#bde9ff",
          45: "#99ddff",
          40: "#7bceff",
          30: "#33bbff",
          20: "#0fadff",
          10: "#0894fa",
        },
        0: "#0175e9",
        plus: {
          10: "#0163c6",
          20: "#0154a7",
          30: "#014283",
          40: "#01366a",
          45: "#012b56",
          50: "#012041",
          54: "#011327",
          58: "#00060d",
        },
      },
      indigo: {
        minus: {
          58: "#f8f9fc",
          54: "#ebeef7",
          50: "#dee2f2",
          45: "#ccd2eb",
          40: "#b9c3e9",
          30: "#a4b0e0",
          20: "#8999d7",
          10: "#6f83ce",
        },
        0: "#5c71c7",
        plus: {
          10: "#4f61ab",
          20: "#42518f",
          30: "#364272",
          40: "#2a345a",
          45: "#222a49",
          50: "#1c2136",
          54: "#111420",
          58: "#06070b",
        },
      },
      purple: {
        minus: {
          58: "#fbf8fd",
          54: "#f4e9fa",
          50: "#ecdaf6",
          45: "#e3cbf1",
          40: "#d8b7eb",
          30: "#cb9fe5",
          20: "#bc83dd",
          10: "#af6cd5",
        },
        0: "#a05dcd",
        plus: {
          10: "#8b47b3",
          20: "#743d94",
          30: "#5b2f74",
          40: "#4a265f",
          45: "#3c1f4c",
          50: "#2d1939",
          54: "#1b0f22",
          58: "#09050b",
        },
      },
      pink: {
        minus: {
          58: "#fdf8fb",
          54: "#f9e9f2",
          50: "#f5dbe9",
          45: "#f0c7dd",
          40: "#ebb2d0",
          30: "#e59ac2",
          20: "#dc7aae",
          10: "#d55d9d",
        },
        0: "#cc3e89",
        plus: {
          10: "#b53077",
          20: "#9d2063",
          30: "#850f4e",
          40: "#690c3e",
          45: "#550c33",
          50: "#440828",
          54: "#290518",
          58: "#0e0208",
        },
      },
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      width: {
        1200: "75rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
