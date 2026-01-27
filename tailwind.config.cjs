/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'neon-lime': '#CCFF00',
                'neon-cyan': '#00F0FF',
                'carbon-black': '#050505',
                'carbon-gray': '#121212',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                exo: ['Exo 2', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
