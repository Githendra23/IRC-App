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
                axios.post("http://localhost:8080/api/verifyToken", {}, {withCredentials: true})
                    .then((res) => {
                        if ("username" in res.data && res.data.username === username) {
                            setConnected(true);
                        } else {
                            setConnected(false);
                            logOut();
                        }
                    })
                    .catch((err) => {
                        toast.error(err.data.message);
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
        <div className="scrollbar-thin dark:scrollbar-track-[#09ebe42a] dark:scrollbar-thumb-[#09ebe3]">
            {connected && (
                <div className="flex bg-black h-screen">
                    <div className="w-1/5 m-2 text-black dark:text-[#09ebe3] dark:bg-[#03252b] bg-white rounded">
                        <Channel
                            selectedChannel={selectedChannel}
                            setSelectedChannel={setSelectedChannel}
                        />
                    </div>

                    <div
                        className="w-3/5 my-2 flex flex-col text-black dark:text-[#09ebe3] dark:bg-[#05323a] bg-white rounded justify-center items-start">
                        <div className="flex justify-between w-full px-2 pt-2">
                            <h1 className="text-3xl font-bold text-black dark:text-[#09ebe3]">
                                {username}
                            </h1>

                            <div className="flex items-center">
                                <ThemeButton/>

                                <button
                                    className="p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                                    onClick={logOut}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        <div className="mt-2 flex flex-col w-full">
                            <ChatBody
                                selectedChannel={selectedChannel}
                                setSelectedChannel={setSelectedChannel}
                                messages={messages}
                                setMessages={setMessages}
                            />
                            <div className="mt-2 p-2">
                                <Input selectedChannel={selectedChannel}/>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/5 m-2 text-black dark:text-[#09ebe3] dark:bg-[#03252b] bg-white rounded">
                        <ActiveUser/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRooms;
