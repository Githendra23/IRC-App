import {useEffect, useState} from "react";
import {getSocket, disconnect, isConnected} from "../socket.ts";
import Input from "./components/Input";
import {toast} from "react-toastify";
import ChatBody from "./components/Chatbody/ChatBody.tsx";
import ActiveUser from "./components/ActiveUser.tsx";
import Channel from "./components/Channel";
import ThemeButton from "./components/ThemeButton";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SideBar from "./components/SideBar";
import SideButton from "./components/SideButton";
import {ChatIcon, FriendIcon, GroupChatIcon, SettingsIcon} from "./icons";
import ProfileButton from "./components/ProfileButton/ProfileButton.tsx";
import Settings from "./components/Settings";

interface Data {
    sender?: string;
    receiver?: string | null;
    message: string;
    createdAt: string;
    channel: string;
}

const ChatRooms = () => {
    const [connected, setConnected] = useState(isConnected());
    const username = localStorage.getItem("username");
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
    const [channels, setChannels] = useState<string[]>([]);
    const [messages, setMessages] = useState<Data[]>([]);
    const navigate = useNavigate();
    const socket = getSocket();
    const [activeButton, setActiveButton] = useState<string | null>("Friends");

    const handleButtonClick = (buttonText: string) => {
        if (activeButton !== buttonText) {
            setActiveButton(buttonText);
        }
    };

    useEffect(() => {
        if (!isConnected() || !connected) {
            logOut();
        }

        socket.on("connect", () => {
            console.log("Connected to server:", socket.id);
        });
    }, []);

    useEffect(() => {
        const checkConnect = async () => {
            if (username) {
                axios.post("http://localhost:8080/api/verifyToken", {username}, {withCredentials: true})
                    .then((res) => {
                        if ("username" in res.data && res.data.username === username) {
                            setConnected(true);
                        } else {
                            setConnected(false);
                            logOut();
                        }
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message);
                        setConnected(false);
                        logOut();
                    });
            } else {
                setConnected(false);
                logOut();
            }
        };

        checkConnect();
    });

    const logOut = () => {
        const expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = `jwt_${username}=; ${expires};`;

        toast.success("Logged out");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        setConnected(isConnected());
        disconnect();
        navigate("/login");
    };

    return (
        <div
            className="transition-colors duration-200 dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3] font-inter h-screen flex flex-col">
            {connected && (
                <div className="flex h-full">
                    <SideBar
                        className="flex flex-col shadow justify-between items-center py-4 px-2 h-screen bg-white transition-colors duration-200 dark:bg-[#36404a]">
                        <div className="w-8"><img className="h-auto w-auto" src={'/assets/logo_.png'} alt="logo"/></div>

                        <div className="grid grid-cols-1 gap-y-1">
                            <SideButton
                                text="Friends"
                                isActive={activeButton === "Friends"}
                                icon={<FriendIcon className="h-auto w-6"
                                                  color={activeButton === "Friends" ? "#5e5dc3" : "#929cb8"}/>}
                                onClick={() => handleButtonClick("Friends")}
                            />

                            <SideButton
                                text="Rooms"
                                isActive={activeButton === "Rooms"}
                                icon={<ChatIcon className={`h-auto w-6 ${activeButton === "Rooms" ? "stroke-[#5e5dc3]" : "stroke-[#929cb8]"}`}/>}
                                onClick={() => handleButtonClick("Rooms")}
                            />

                            <SideButton
                                text="Group Chats"
                                isActive={activeButton === "Group Chats"}
                                icon={<GroupChatIcon className="h-auto w-6"
                                                     color={activeButton === "Group Chats" ? "#5e5dc3" : "#929cb8"}/>}
                                onClick={() => handleButtonClick("Group Chats")}
                            />

                            <SideButton
                                className="group"
                                text="Settings"
                                isActive={activeButton === "Settings"}
                                icon={<SettingsIcon className="h-auto w-6 group-hover:animate-spin-slow"
                                                    color={activeButton === "Settings" ? "#5e5dc3" : "#929cb8"}/>}
                                onClick={() => handleButtonClick("Settings")}
                            >
                            </SideButton>
                        </div>

                        <div className="grid grid-cols-1 gap-y-4 justify-items-center items-center">
                            <ThemeButton/>

                            <ProfileButton>
                                <div className="flex flex-col my-1.5 gap-y-2">
                                    <button className="text-sm bg-red-600 p-2 rounded" onClick={logOut}>LogOut</button>
                                </div>
                            </ProfileButton>
                        </div>
                    </SideBar>

                    <div
                        className="flex flex-col min-w-[20%] text-black transition-colors duration-200 dark:text-[#09ebe3] bg-[#f5f7fb] dark:bg-[#303841]">
                        {activeButton === "Rooms" && (
                            <>
                                <Channel
                                    selectedChannel={selectedChannel}
                                    setSelectedChannel={setSelectedChannel}
                                    channels={channels}
                                    setChannels={setChannels}/>
                            </>
                        )}

                        {activeButton === "Settings" && (
                            <Settings/>
                        )}

                        {activeButton === "Group Chats" && (
                            <>
                                <div></div>
                            </>
                        )}

                        {activeButton === "Friends" && (
                            <>
                                <div></div>
                            </>
                        )}
                    </div>

                    <div
                        className="flex flex-grow flex-col shadow justify-between w-3/5 h-screen text-black transition-colors duration-200 dark:bg-[#262e35] bg-white">
                        <div
                            className={`${selectedChannel ? "block" : "hidden"} flex justify-between duration-200 items-center border-b border-b-[#f0effc] dark:border-b-[#36404a]`}>
                            <h4 className="text-xl font-bold text-[#495057] dark:text-[#e1e9f1] p-5 duration-200">
                                {selectedChannel}
                            </h4>
                        </div>

                        <ChatBody
                            selectedChannel={selectedChannel}
                            setSelectedChannel={setSelectedChannel}
                            messages={messages}
                            setMessages={setMessages}
                        />

                        <div
                            className={`${selectedChannel ? "block" : "hidden"} w-full transition-colors duration-200 p-5 border-t border-t-[#f0effc] dark:border-t-[#36404a]`}>
                            <Input selectedChannel={selectedChannel}/>
                        </div>
                    </div>

                    <div
                        className={`flex flex-col w-1/6 h-screen text-black transition-colors duration-200 dark:text-[#09ebe3] bg-[#f5f7fb] dark:bg-[#303841] ${activeButton !== "Friends" ? "block" : "hidden"}`}>
                        <h4 className="text-xl font-bold text-[#495057] border-b-[1px] border-b-[#f0effc] dark:border-b-[#36404a] mb-6 dark:text-[#e1e9f1] p-5 duration-200">
                            Active Now
                        </h4>

                        <ActiveUser/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;