import {useEffect, useState} from "react";
import {getSocket, disconnect, isConnected} from "../socket.ts";
import Input from "./components/Input";
import {toast} from "react-toastify";
import ChatBody from "./components/ChatBody.tsx";
import ActiveUser from "./components/ActiveUser.tsx";
import Channel from "./components/Channel";
import ThemeButton from "./components/ThemeButton";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SideBar from "./components/SideBar";
import SideButton from "./components/SideButton";
import FriendIcon from "./icons/FriendIcon.tsx";
import ChatIcon from "./icons/ChatIcon.tsx";
import GroupChatIcon from "./icons/GroupChatIcon.tsx";
import SettingsIcon from "./icons/SettingsIcon.tsx";

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
    const [messages, setMessages] = useState<Data[]>([]);
    const navigate = useNavigate();
    const socket = getSocket();
    const [activeButton, setActiveButton] = useState<string | null>(null);

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
        <div className="scrollbar-thin dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3] font-[sans-serif] h-screen flex flex-col">
            {connected && (
                <div className="flex h-full">
                    <SideBar className="flex flex-col justify-between items-center py-4 px-2 h-screen bg-white dark:bg-[#36404a]">
                        <div className="w-8"><img className="h-auto w-auto" src={'/assets/logo_.png'} alt="logo"/></div>
                        <div className="grid grid-cols-1 gap-y-1">
                            <SideButton
                                text="Friends"
                                icon={<FriendIcon className="h-auto w-6" color={activeButton === "Friends" ? "#5e5dc3" : "#929cb8"} />}
                                isActive={activeButton === "Friends"}
                                onClick={() => handleButtonClick("Friends")}
                            />

                            <SideButton
                                text="Rooms"
                                icon={<ChatIcon className="h-auto w-6"
                                                color={activeButton === "Rooms" ? "#5e5dc3" : "#929cb8"}/>}
                                isActive={activeButton === "Rooms"}
                                onClick={() => handleButtonClick("Rooms")}
                            />

                            <SideButton
                                text="Group Chats"
                                icon={<GroupChatIcon className="h-auto w-6"
                                                     color={activeButton === "Group Chats" ? "#5e5dc3" : "#929cb8"}/>}
                                isActive={activeButton === "Group Chats"}
                                onClick={() => handleButtonClick("Group Chats")}
                            />

                            <SideButton
                                text="Settings"
                                icon={<SettingsIcon className="h-auto w-6"
                                                    color={activeButton === "Settings" ? "#5e5dc3" : "#929cb8"}/>}
                                isActive={activeButton === "Settings"}
                                onClick={() => handleButtonClick("Settings")}
                            >
                                <div
                                    className={`fixed z-10 h-screen top-0 left-0 w-screen bg-white transition-transform duration-300 ease-in-out ${
                                        activeButton === "Settings" ? "translate-x-0 visible" : "-translate-x-full invisible"
                                    }`} onClick={() => handleButtonClick("")}>sdf
                                </div>
                            </SideButton>
                        </div>

                        <div className="grid grid-cols-1 gap-y-4 justify-items-center items-center">
                            <ThemeButton/>
                            <p className="flex items-center justify-center rounded-full h-8 w-8 bg-red-400">s</p>
                        </div>
                    </SideBar>

                    <div className="flex-grow text-black border-x-[#f3f4fa] border-x-2 dark:text-[#09ebe3] bg-[#f5f7fb] dark:bg-[#03252b]">
                        {activeButton !== "Friends" ? (
                            <Channel
                                selectedChannel={selectedChannel}
                                setSelectedChannel={setSelectedChannel}
                            />
                        ) : (
                            <div>sdf</div>
                        )}
                    </div>

                    <div
                        className="flex flex-col justify-between w-3/5 h-full px-2 text-black dark:text-[#09ebe3] dark:bg-[#05323a] bg-white">
                        <div className="flex justify-between items-center py-[0.85rem]">
                            <h1 className="text-3xl font-bold text-black dark:text-[#09ebe3]">
                                {username}
                            </h1>
                            <div className="flex items-center">
                                <button
                                    className="p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                                    onClick={logOut}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        <ChatBody
                            selectedChannel={selectedChannel}
                            setSelectedChannel={setSelectedChannel}
                            messages={messages}
                            setMessages={setMessages}
                        />

                        <div className="w-full py-2">
                            <Input selectedChannel={selectedChannel}/>
                        </div>
                    </div>

                    <div className="w-1/6 text-black dark:text-[#09ebe3] dark:bg-[#03252b] bg-white">
                        <ActiveUser/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;
