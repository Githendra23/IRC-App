import React, {useEffect, useRef, Dispatch, SetStateAction} from "react";
import {toast} from "react-toastify";
import {getSocket} from "../../socket.ts";
import axios from "axios";

interface Data {
    sender?: string;
    receiver?: string | null;
    message: string;
    createdAt: string;
    channel: string;
}

interface Props {
    selectedChannel: string | null;
    setSelectedChannel: (channel: string | null) => void;
    messages: Data[];
    setMessages: Dispatch<SetStateAction<Data[]>>;
    className?: string;
}

const ChatBody: React.FC<Props> = ({className, selectedChannel, setSelectedChannel, messages, setMessages}) => {
    const socket = getSocket();
    const username = localStorage.getItem("username");
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on("message", (data: Data) => {
            setMessages((prevMessages: Data[]) => [...prevMessages, data]);
        });

        socket.on("leaveChannel", (channelName: string) => {
            setMessages((prevMessages: Data[]) => {
                if (prevMessages.length > 0 && prevMessages[0].channel === channelName) {
                    setSelectedChannel(null);
                    return [];
                } else {
                    return prevMessages;
                }
            });
        });

        socket.on("serverResponse", (message) => {
            toast.success(message);
        });

        socket.on("showCommands", (message) => {
            toast.info(message);
        });

        return () => {
            socket.off("message");
            socket.off("serverResponse");
            socket.off("showCommands");
            socket.off("leaveChannel");
        };
    }, [socket, setMessages, setSelectedChannel]);

    useEffect(() => {
        if (selectedChannel) {
            fetchMessages();
        }
    }, [selectedChannel]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    async function fetchMessages() {
        axios.get(`http://localhost:8080/api/message/${selectedChannel}/${username}`, {withCredentials: true})
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => {
                toast.error(err);
            });
    }

    function formatTime(timestamp: string) {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    }

    return (
        <div className={`${className} flex-grow overflow-y-auto scrollbar-thin bg-neutral-200 text-black dark:text-[#09ebe3] dark:bg-[#043a44] border border-black`}>
            {!selectedChannel ? (
                <div className="flex justify-center items-center h-full">
                    <h1 className="text-3xl mx-2 text-center font-bold text-black dark:text-[#09ebe3]">
                        Select a channel to start chatting
                    </h1>
                </div>
            ) : (
                <>
                    {messages.map((data, index) =>
                        selectedChannel === data.channel && (
                            data.sender !== username ? (
                                <div key={index} className="w-[70%] flex flex-col mt-4 mb-2">
                                    <label className="ml-5 text-sm mb-[3px]">
                                        {data.sender}
                                    </label>
                                    <div className="flex flex-wrap">
                                        <p className={`text-lg overflow-hidden break-words border my-1 ml-3 px-5 py-3 mt-[-2px] ${data.receiver ? "italic" : "not-italic"} border-[#0a2b03] rounded-[30px] bg-[#2f941a] text-white`}>
                                            {data.message}
                                        </p>
                                    </div>
                                    <label className="ml-5 mt[-2px] text-sm">
                                        {formatTime(data.createdAt)}
                                    </label>
                                </div>
                            ) : (
                                <div key={index} className="flex justify-end mt-4 mb-2">
                                    <div className="w-[70%] justify-end">
                                        <div className="flex flex-wrap justify-end">
                                            <p className="text-lg overflow-hidden break-words border my-2 mr-3 px-5 py-3 border-[#03252b] rounded-[30px] bg-[#1356bb] text-white">
                                                {data.message}
                                            </p>
                                        </div>
                                        <div className="flex justify-end mr-5 mt[-2px] ml-6">
                                            <label className="text-sm">
                                                {formatTime(data.createdAt)}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    )}
                    <div ref={chatEndRef}/>
                </>
            )}
        </div>
    );
};

export default ChatBody;