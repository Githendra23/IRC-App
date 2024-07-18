import React, {useEffect, useRef, useState} from "react";

interface Props {
    children?: React.ReactNode;
}

const ProfileButton: React.FC<Props> = ({children}) => {
    const username = localStorage.getItem("username");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (ref.current && !ref.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <button onClick={() => setIsOpen(true)}
                className="relative flex items-center justify-center rounded-full h-8 w-8 bg-red-400">
            {username !== null && username[0].toUpperCase()}

            <div ref={wrapperRef} className={`absolute bottom-0 left-[3.75rem] bg-white shadow border border-[#f0eff5] dark:border-[#36404a] dark:bg-[#313a43] dark:shadow-none rounded-md py-2
                transition-all duration-200 ${isOpen ? "scale-100 visible" : "scale-0 invisible"}`}>
                {children}
            </div>
        </button>
    );
}

export default ProfileButton;