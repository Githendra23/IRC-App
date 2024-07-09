import {useState} from "react";

const Settings = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    return (
        <div className="text-[#495057] dark:text-[#e1e9f1] duration-100 p-5">
            <div className="duration-100 border-b-2 border-b-[#f0effc] dark:border-b-[#2b333b] pb-3 mb-3">
                <h1 className="text-xl font-bold pb-5">Settings</h1>

                <p className="text-center text-lg">{username}</p>
            </div>

            <div onClick={() => setIsActive(!isActive)}
                 className={`flex items-center justify-between dark:bg-[#36404a] p-3 select-none cursor-pointer ${isActive ? "rounded-t-md transition" : "rounded-md transition-all duration-100"}`}>
                <p className="">Personal Info</p>

                <svg className={`w-6 dark:stroke-[#e1e9f1] duration-200 ${isActive ? "rotate-180" : " rotate-0"}`}
                     viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g id="Arrow / Caret_Down_MD">
                            <path id="Vector" d="M16 10L12 14L8 10" strokeWidth="2"
                                  strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </g>
                </svg>

            </div>


            <div
                className={`overflow-hidden transition-all duration-300 ${isActive ? "visible h-full" : "invisible h-0"}`}>
                <div className="border-b border-x duration-100 dark:border-x-[#36404a] h-full dark:border-b-[#36404a] rounded-b-md">
                    <div className="flex flex-col justify-between h-full px-3 py-4">
                        <div className="relative">
                            <h4 className="dark:text-[#9aa1b9]">Name</h4>
                            <p className="text-md">{username}</p>

                            <button className="absolute w-auto flex right-0 top-0 p-2 text-sm dark:bg-[#36404a] rounded">
                                <svg className="fill-[#495057] h-5 dark:fill-[#e1e9f1] mr-1" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier"><title>Edit</title>
                                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="Edit">
                                                <rect id="Rectangle" fillRule="nonzero" x="0" y="0" width="24"
                                                      height="24"></rect>
                                                <line className="stroke-[#495057] dark:stroke-[#e1e9f1]" x1="20" y1="20" x2="4" y2="20" id="Path"
                                                      strokeWidth="2" strokeLinecap="round"></line>
                                                <path className="stroke-[#495057] dark:stroke-[#e1e9f1]"
                                                    d="M14.5858,4.41421 C15.3668,3.63316 16.6332,3.63316 17.4142,4.41421 L17.4142,4.41421 C18.1953,5.19526 18.1953,6.46159 17.4142,7.24264 L9.13096,15.5259 L6.10051,15.7279 L6.30254,12.6975 L14.5858,4.41421 Z"
                                                    id="Path" strokeWidth="2"
                                                    strokeLinecap="round"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Edit
                            </button>
                        </div>

                        <div>
                            <h4 className="dark:text-[#9aa1b9]">Email</h4>
                            <p className="text-m">{email}</p>
                        </div>

                        <div>
                            <h4 className="dark:text-[#9aa1b9]">Password</h4>
                            <p className="text-md">Change Password</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings;