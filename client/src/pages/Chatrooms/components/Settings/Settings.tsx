import {useState} from "react";
import EditOption from "./components/EditOption";

const Settings = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const username = localStorage.getItem("username") || "";
    const [newUsername, setNewUsername] = useState<string>(username);
    const email = localStorage.getItem("email") || "";
    const [newEmail, setNewEmail] = useState<string>(email);
    const numCharPassword = parseInt(localStorage.getItem("password") || "0") || 0;
    const [newPassword, setNewPassword] = useState<string>("");

    return (
        <div className="text-[#495057] dark:text-[#e1e9f1] duration-100 p-5">
            <div className="duration-100 border-b-[1px] border-b-[#f0effc] dark:border-b-[#2b333b] pb-3 mb-3">
                <h1 className="text-xl font-bold pb-5">Settings</h1>

                <p className="text-center text-lg">{username}</p>
            </div>

            <div onClick={() => setIsActive(!isActive)}
                 className={`flex items-center justify-between duration-100 ${!isActive && "border-b"} border-x border-t dark:border-x dark:border-t dark:border-[#36404a] dark:bg-[#36404a] p-3 select-none cursor-pointer
                            ${isActive ? "rounded-t-md transition" : "rounded-md transition-all"}`}>
                <p className="text-sm text-[#495057] font-semibold dark:text-[#e1e9f1]">Personal Info</p>

                <svg className={`w-6 stroke-[#495057] dark:stroke-[#e1e9f1] duration-200 ${isActive ? "rotate-180" : " rotate-0"}`}
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
                <div className="border-b border-x duration-100 dark:border-x-[#36404a] bg-white dark:bg-[#303841] h-full dark:border-b-[#36404a] rounded-b-md">
                    <div className="flex flex-col justify-between h-full px-3 py-4">
                        <EditOption title="Username" content={username} value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    onSubmit={(e) => {
                                    e.preventDefault();
                                }
                        }/>

                        <EditOption title="Email" content={email} value={newEmail} onChange={(e) => setNewEmail(e.target.value)}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }
                        }/>

                        <EditOption title="Password" content={'*'.repeat(numCharPassword)} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                    }
                        }/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;