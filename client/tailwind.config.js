/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                'public-sans': ['Public Sans', 'sans-serif'],
            },
            colors: {
                lightGray: '#3e4a56',
            },
            animation: {
                'spin-slow': 'spin 1s ease-in-out',
            },
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-webkit-dark": {
                    "&::-webkit-scrollbar": {
                        width: "6px",
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "50px",
                        backgroundColor: "#646e76",
                        transition: "100ms",
                    },
                    "&::-webkit-scrollbar-track": {
                        borderRadius: "50px",
                        transition: "100ms",
                    }
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: "6px",
                        height: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        borderRadius: "50px",
                        backgroundColor: "#d0d6db",
                        transition: "100ms",
                    },
                    "&::-webkit-scrollbar-track": {
                        borderRadius: "50px",
                        transition: "100ms",
                    }
                },
            };

            addUtilities(newUtilities, ["responsive", "hover"]);
        }
    ],
    darkMode: 'class',
}

