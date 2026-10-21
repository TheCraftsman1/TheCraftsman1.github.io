/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./index.tsx",
        "./App.tsx",
        "./types.ts",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./utils/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'accent': '#6366f1',
                'accent-light': '#818cf8',
                'accent-dark': '#4f46e5',
                'accent-subtle': '#eef2ff',
                'secondary': '#0ea5e9',
                'secondary-light': '#38bdf8',
                'surface': '#ffffff',
                'surface-alt': '#f8fafc',
                'surface-raised': '#f1f5f9',
            },
            fontFamily: {
                orbitron: ['Inter', 'sans-serif'],
                exo: ['Inter', 'sans-serif'],
                sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
                mono: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
