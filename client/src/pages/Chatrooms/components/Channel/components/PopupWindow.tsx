import React, {useState} from "react";

type PopupWindowProps = {
    className: string;
    buttonText: string;
    onClickChannelButton: () => void;
    title: string;
    textButton: string;
    children: React.ReactNode;
};

const PopupWindow: React.FC<PopupWindowProps> = ({className, title, textButton, buttonText, children, onClickChannelButton}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={className}>
            <button
                className="flex mt-1 bg-[#7269ef] hover:bg-[#6159cb] text-white py-2 px-4 rounded-3xl"
                onClick={() => setIsOpen(true)}
            >
                {buttonText}
            </button>

            {isOpen && (
                <div className="fixed flex items-center justify-center inset-0 z-20">
                    <div className="fixed bg-black opacity-50 inset-0 z-20"/>

                    <div className="bg-[#ffffff] opacity-100 z-30 dark:bg-gray-800 rounded-md">
                        <div>
                            <div className="flex justify-between items-center border-b rounded-t-md border-[#f0eff5] p-4">
                                <h3 className="text-[#495057] font-semibold">{title}</h3>
                                <svg className="fill-[#495057] hover:fill-black h-auto w-6" onClick={() => setIsOpen(false)} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
                                        ></path>
                                    </g>
                                </svg>
                            </div>

                            <div className="flex flex-col p-4">{children}</div>

                            <div className="flex p-4 items-center justify-end gap-x-4 border-t border-[#f0eff5]">
                                <p
                                    className="text-sm text-[#7269ef] hover:cursor-pointer hover:underline hover:underline-offset-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </p>

                                <button onClick={onClickChannelButton} className="bg-[#7269ef] text-sm text-white p-2 rounded">
                                    {textButton}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PopupWindow;
