import React, {useState} from "react";

type PopupWindowProps = {
    buttonText: string;
    children: React.ReactNode;
};

const PopupWindow = ({buttonText, children}: PopupWindowProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button
                className="flex mt-1 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-3xl"
                onClick={togglePopup}
            >
                {buttonText}
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl">
                        <div className="flex flex-col items-center justify-center">
                            {children}

                            <button
                                className="mt-4 bg-red-500 hover:bg-red-700 py-2 px-4 rounded-xl text-white"
                                onClick={togglePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PopupWindow;
