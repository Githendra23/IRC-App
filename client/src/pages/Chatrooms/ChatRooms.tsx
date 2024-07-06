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
import ProfileButton from "./components/ProfileButton/ProfileButton.tsx";

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
                        }
                        else {
                            setConnected(false);
                            logOut();
                        }
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message);
                        setConnected(false);
                        logOut();
                    });
            }
            else {
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
        <div className="scrollbar-thin transition-colors duration-100 dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3] font-inter h-screen flex flex-col">
            {connected && (
                <div className="flex h-full">
                    <SideBar
                        className="flex flex-col justify-between items-center z-10 py-4 px-2 h-screen bg-white transition-colors duration-100 dark:bg-[#36404a]">
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
                                icon={<ChatIcon className="h-auto w-6"
                                                color={activeButton === "Rooms" ? "#5e5dc3" : "#929cb8"}/>}
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
                                text="Settings"
                                isActive={activeButton === "Settings"}
                                icon={<SettingsIcon className="h-auto w-6"
                                                    color={activeButton === "Settings" ? "#5e5dc3" : "#929cb8"}/>}
                                onClick={() => handleButtonClick("Settings")}
                            >
                            </SideButton>
                        </div>

                        <div className="grid grid-cols-1 gap-y-4 justify-items-center items-center">
                            <ThemeButton/>

                            <ProfileButton>
                                <div className="flex flex-col my-1.5 gap-y-2">
                                    <button className="text-sm bg-red-600 p-2 rounded">LogOut</button>
                                </div>
                            </ProfileButton>
                        </div>
                    </SideBar>

                    <div
                        className={`h-screen top-0 left-0 w-screen bg-white fixed ${
                            activeButton === "Settings" ? "translate-x-0" : "-translate-x-full"
                        } ease-in-out duration-500`}
                        onClick={() => handleButtonClick("")}
                    ></div>

                    <div
                        className="w-96 text-black border-x-[#f3f4fa] transition-colors duration-100 dark:border-x-[#323c46] border-x-2 dark:text-[#09ebe3] bg-[#f5f7fb] dark:bg-[#303841]">
                        {activeButton !== "Friends" ? (
                            <Channel
                                selectedChannel={selectedChannel}
                                setSelectedChannel={setSelectedChannel}
                                channels={channels}
                                setChannels={setChannels}
                            />
                        ) : (
                            <div>sdf</div>
                        )}
                    </div>

                    <div
                        className="flex flex-grow flex-col justify-between w-3/5 h-full text-black transition-colors duration-100 dark:bg-[#262e35] bg-white">
                        <div className="flex justify-between items-center py-[0.85rem] border-b-2 border-b-[#fbfafc] dark:border-b-[#2b333b]">
                            <h1 className="text-3xl font-bold text-[#495057] dark:text-[#e1e9f1]">
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

                        <div className="w-full transition-colors duration-100 p-5 border-t-2 border-t-[#f0effc] dark:border-t-[#2b333b]">
                            <Input selectedChannel={selectedChannel}/>
                        </div>
                    </div>

                    <div className={`w-1/6 text-black transition-colors duration-100 dark:text-[#09ebe3] bg-[#f5f7fb] dark:bg-[#303841]  ${selectedChannel ? "block" : "hidden"}`}>
                        <ActiveUser/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;