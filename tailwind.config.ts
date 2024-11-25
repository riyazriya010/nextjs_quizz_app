// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;



// import type { Config } from "tailwindcss";

// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       animation: {
//         float: "float 3s infinite",
//       },
//       keyframes: {
//         float: {
//           "0%, 100%": { transform: "translateY(-5px)" },
//           "50%": { transform: "translateY(5px)" },
//         },
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;







import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        float: "float 3s infinite", // Existing float animation
        gradient: "gradient 6s ease infinite", // New gradient animation
        spin: "spin 1.5s linear infinite", // New spin animation
        "spin-reverse": "spin-reverse 2s linear infinite", // New spin-reverse animation
        pulse: "pulse 1.5s infinite", // New pulse animation
        "float-reverse": "float-reverse 4s ease-in-out infinite", // New reverse float animation
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-5px)" },
          "50%": { transform: "translateY(5px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        pulse: {
          "0%": { opacity: "0.5" },  // opacity as a string
          "50%": { opacity: "1" },    // opacity as a string
          "100%": { opacity: "0.5" }, // opacity as a string
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(15px)" },
        },
      },
      
    },
  },
  plugins: [],
} satisfies Config;
