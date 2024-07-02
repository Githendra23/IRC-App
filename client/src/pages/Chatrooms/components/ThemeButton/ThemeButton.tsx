import {useEffect, useState} from "react";
import MoonIcon from "./icons/MoonIcon.tsx";
import SunIcon from "./icons/SunIcon.tsx";

const ThemeButton = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            const localTheme = localStorage.getItem("theme");

            if (localTheme) {
                if (localTheme === "dark")
                    document.documentElement.classList.add("dark");
                else document.documentElement.classList.remove("dark");

                setDarkTheme(localTheme === "dark");
            }

            setMounted(true);
        }
    }, []);

    function changeTheme() {
        localStorage.setItem("theme", `${!darkTheme ? "dark" : "light"}`);

        setDarkTheme(document.documentElement.classList.toggle("dark"));
    }

    return (
        <button
            className="relative p-4 hover:bg-[#f7f7ff] hover:dark:bg-lightGray rounded-md group"
            onClick={changeTheme}
        >
            <div
                className={`transition-opacity duration-300 ${
                    darkTheme ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
            >
                <SunIcon className="h-auto w-6" color="#929cb8"/>
            </div>
            <div
                className={`absolute top-1/2 -translate-y-1/2 transition-opacity duration-300 ${
                    darkTheme ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            >
                <MoonIcon className="h-auto w-6" color="#929cb8"/>
            </div>
        </button>
    );
};

export default ThemeButton;
