import React, {useEffect, useRef} from "react";

type PopupWindowProps = {
    className: string;
    onClickChannelButton: () => void;
    title: string;
    textButton: string;
    children: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const PopupWindow: React.FC<PopupWindowProps> = ({isOpen, setIsOpen, className, title, textButton, children, onClickChannelButton}) => {
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
        <div className={className}>
            <div className={`${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} duration-500 fixed flex items-center justify-center inset-0 z-20`}>
                <div className={`fixed bg-black ${isOpen ? "opacity-50" : "opacity-0"} transition-opacity duration-300 inset-0 z-20`}/>

                <div ref={wrapperRef} className={`bg-white ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"} transition-all duration-500 z-30 dark:bg-[#272c3b] rounded-md  border border-white dark:border-[#36404a]`}>
                    <div>
                        <div className="flex justify-between items-center border-b rounded-t-md border-[#f0eff5] dark:border-[#36404a] p-4">
                            <h3 className="text-[#495057] dark:text-[#e1e9f1] font-semibold">{title}</h3>
                            <svg className="fill-[#495057] hover:fill-black h-auto dark:fill-[#6b6e78] dark:hover:fill-[#e1e9f1] w-6 hover:cursor-pointer" onClick={() => setIsOpen(false)} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                                    ></path>
                                </g>
                            </svg>
                        </div>

                        <div className="flex flex-col px-4 py-6">{children}</div>

                        <div className="flex p-4 items-center justify-end gap-x-4 border-t border-[#f0eff5] dark:border-[#36404a]">
                            <p
                                className="text-sm text-[#7269ef] hover:text-[#6159cb] hover:cursor-pointer hover:underline hover:underline-offset-2 duration-200"
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </p>

                            <button onClick={onClickChannelButton} className="bg-[#7269ef] hover:bg-[#6159cb] text-sm text-white py-2 px-4 rounded duration-200">
                                {textButton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupWindow;
