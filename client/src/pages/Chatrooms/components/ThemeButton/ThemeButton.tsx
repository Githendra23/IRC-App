import {useEffect, useState} from "react";
import darkImg from "./images/dark_mode.png";
import lightImg from "./images/light_mode.png";

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
            className="p-2 rounded text-black bg-blue-500 hover:bg-blue-700 dark:bg-[#004449] dark:text-[#09ebe3] mr-2"
            onClick={changeTheme}
        >
            <img
                width={25}
                height={25}
                src={darkTheme ? darkImg : lightImg}
                alt="dark/light mode"
            />
        </button>
    );
};

export default ThemeButton;
