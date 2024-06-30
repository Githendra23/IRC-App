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
            className="p-4 hover:bg-lightGray rounded-md group relative"
            onClick={changeTheme}
        >
            {darkTheme ? <MoonIcon className="h-auto w-6" color="#929cb8"/> : <SunIcon className="h-auto w-6" color="#929cb8"/>}
        </button>
    );
};

export default ThemeButton;
