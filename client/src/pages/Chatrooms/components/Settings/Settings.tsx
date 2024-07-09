import {useState} from "react";
import {PencilIcon} from "./icons";

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
                                <PencilIcon className="h-5 mr-1"/>
                                Edit
                            </button>
                        </div>

                        <div className="relative">
                            <h4 className="dark:text-[#9aa1b9]">Email</h4>
                            <p className="text-m">{email}</p>

                            <button
                                className="absolute w-auto flex right-0 top-0 p-2 text-sm dark:bg-[#36404a] rounded">
                                <PencilIcon className="h-5 mr-1"/>
                                Edit
                            </button>
                        </div>

                        <div className="relative">
                            <h4 className="dark:text-[#9aa1b9]">Password</h4>
                            <p className="text-md">Change Password</p>

                            <button
                                className="absolute w-auto flex right-0 top-0 p-2 text-sm dark:bg-[#36404a] rounded">
                                <PencilIcon className="h-5 mr-1"/>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Settings;