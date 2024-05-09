/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/lib/**/*.js",
        "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",

    ],
    theme: {
        extend: {},
    },
    plugins: [require("flowbite/plugin")],
};
